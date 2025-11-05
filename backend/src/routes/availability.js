import express from 'express';
import { runQuery, runGet } from '../config/database.js';
import moment from 'moment';

const router = express.Router();

// Get availability for multiple doctors for a date range
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, doctorId } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'Start date and end date are required (YYYY-MM-DD format)'
      });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format. Use YYYY-MM-DD'
      });
    }

    const start = moment(startDate);
    const end = moment(endDate);

    if (!start.isValid() || !end.isValid()) {
      return res.status(400).json({
        success: false,
        error: 'Invalid dates'
      });
    }

    if (start.isAfter(end)) {
      return res.status(400).json({
        success: false,
        error: 'Start date must be before or equal to end date'
      });
    }

    // Limit date range to 30 days
    const daysDiff = end.diff(start, 'days');
    if (daysDiff > 30) {
      return res.status(400).json({
        success: false,
        error: 'Date range cannot exceed 30 days'
      });
    }

    // Build query for doctors
    let doctorQuery = 'SELECT * FROM doctors WHERE is_active = 1';
    const doctorParams = [];

    if (doctorId) {
      doctorQuery += ' AND id = ?';
      doctorParams.push(doctorId);
    }

    const doctors = await runQuery(doctorQuery, doctorParams);

    // Get availability for each doctor for each date
    const availability = [];

    for (const doctor of doctors) {
      const doctorAvailability = {
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        dates: []
      };

      let current = start.clone();
      while (current.isSameOrBefore(end)) {
        const dateStr = current.format('YYYY-MM-DD');
        const dayOfWeek = current.day(); // 0-6 (Sunday-Saturday)

        // Get doctor's schedule for this day
        const schedule = await runGet(`
          SELECT * FROM doctor_schedules
          WHERE doctor_id = ? AND day_of_week = ? AND is_available = 1
        `, [doctor.id, dayOfWeek]);

        if (schedule) {
          // Check for exceptions
          const exception = await runGet(`
            SELECT * FROM appointment_exceptions
            WHERE doctor_id = ? AND exception_date = ?
          `, [doctor.id, dateStr]);

          if (exception && !exception.is_available) {
            doctorAvailability.dates.push({
              date: dateStr,
              isAvailable: false,
              reason: exception.reason || 'Doctor not available',
              availableSlots: []
            });
          } else {
            // Get existing appointments
            const existingAppointments = await runQuery(`
              SELECT appointment_time, duration_minutes, status
              FROM appointments
              WHERE doctor_id = ? AND appointment_date = ?
              AND status NOT IN ('cancelled', 'no-show')
              ORDER BY appointment_time
            `, [doctor.id, dateStr]);

            // Generate available slots
            const availableSlots = generateAvailableSlots(
              schedule.start_time,
              schedule.end_time,
              schedule.duration_minutes || 30,
              existingAppointments
            );

            doctorAvailability.dates.push({
              date: dateStr,
              dayOfWeek,
              isAvailable: true,
              schedule: {
                startTime: schedule.start_time,
                endTime: schedule.end_time,
                duration: schedule.duration_minutes || 30
              },
              availableSlots,
              existingAppointments: existingAppointments.length
            });
          }
        } else {
          doctorAvailability.dates.push({
            date: dateStr,
            isAvailable: false,
            reason: 'Doctor not scheduled on this day',
            availableSlots: []
          });
        }

        current.add(1, 'day');
      }

      availability.push(doctorAvailability);
    }

    res.json({
      success: true,
      data: availability,
      dateRange: {
        start: startDate,
        end: endDate,
        days: daysDiff + 1
      }
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch availability'
    });
  }
});

// Get today's availability for all doctors
router.get('/today', async (req, res) => {
  try {
    const today = moment().format('YYYY-MM-DD');
    const todayAvailability = await runQuery(`
      SELECT
        d.id,
        d.name,
        d.specialty,
        ds.start_time,
        ds.end_time,
        ds.duration_minutes,
        COUNT(a.id) as booked_appointments
      FROM doctors d
      LEFT JOIN doctor_schedules ds ON d.id = ds.doctor_id
        AND ds.day_of_week = strftime('%w', 'now', 'localtime')
        AND ds.is_available = 1
      LEFT JOIN appointments a ON d.id = a.doctor_id
        AND a.appointment_date = date('now', 'localtime')
        AND a.status NOT IN ('cancelled', 'no-show')
      WHERE d.is_active = 1
      GROUP BY d.id, ds.start_time, ds.end_time, ds.duration_minutes
      ORDER BY d.name
    `);

    const formattedAvailability = todayAvailability.map(doctor => ({
      ...doctor,
      isAvailable: doctor.start_time && doctor.end_time,
      date: today,
      availableSlots: doctor.start_time && doctor.end_time ?
        generateAvailableSlots(
          doctor.start_time,
          doctor.end_time,
          doctor.duration_minutes || 30,
          [] // Would need to fetch actual appointments for real availability
        ) : []
    }));

    res.json({
      success: true,
      data: formattedAvailability,
      date: today
    });
  } catch (error) {
    console.error('Error fetching today\'s availability:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch today\'s availability'
    });
  }
});

// Helper function to generate available time slots
function generateAvailableSlots(startTime, endTime, duration, existingAppointments) {
  const slots = [];
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  const slotDuration = duration || 30;

  // Convert existing appointments to minutes
  const blockedTimes = existingAppointments.map(apt => ({
    start: timeToMinutes(apt.appointment_time),
    end: timeToMinutes(apt.appointment_time) + (apt.duration_minutes || duration)
  }));

  // Generate slots
  for (let time = start; time + slotDuration <= end; time += slotDuration) {
    const slotEnd = time + slotDuration;

    // Check if slot conflicts with existing appointments
    const hasConflict = blockedTimes.some(blocked =>
      (time < blocked.end && slotEnd > blocked.start)
    );

    if (!hasConflict) {
      slots.push({
        time: minutesToTime(time),
        time24: minutesToTime(time),
        time12: formatTime12(minutesToTime(time)),
        available: true
      });
    }
  }

  return slots;
}

// Helper functions for time conversion
function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

function formatTime12(time) {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export default router;