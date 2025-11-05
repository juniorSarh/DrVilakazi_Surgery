import express from 'express';
import { body, validationResult } from 'express-validator';
import { runQuery, runGet } from '../config/database.js';

const router = express.Router();

// Get all active doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await runQuery(`
      SELECT
        d.*,
        GROUP_CONCAT(
          JSON_OBJECT(
            'day_of_week', ds.day_of_week,
            'start_time', ds.start_time,
            'end_time', ds.end_time,
            'is_available', ds.is_available
          )
        ) as schedules
      FROM doctors d
      LEFT JOIN doctor_schedules ds ON d.id = ds.doctor_id
      WHERE d.is_active = 1
      GROUP BY d.id
      ORDER BY d.name
    `);

    // Parse schedules JSON for each doctor
    const formattedDoctors = doctors.map(doctor => ({
      ...doctor,
      schedules: doctor.schedules ? JSON.parse(`[${doctor.schedules}]`) : []
    }));

    res.json({
      success: true,
      data: formattedDoctors,
      count: formattedDoctors.length
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch doctors'
    });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await runGet(`
      SELECT
        d.*,
        GROUP_CONCAT(
          JSON_OBJECT(
            'day_of_week', ds.day_of_week,
            'start_time', ds.start_time,
            'end_time', ds.end_time,
            'is_available', ds.is_available
          )
        ) as schedules
      FROM doctors d
      LEFT JOIN doctor_schedules ds ON d.id = ds.doctor_id
      WHERE d.id = ? AND d.is_active = 1
      GROUP BY d.id
    `, [id]);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        error: 'Doctor not found'
      });
    }

    // Parse schedules JSON
    const formattedDoctor = {
      ...doctor,
      schedules: doctor.schedules ? JSON.parse(`[${doctor.schedules}]`) : []
    };

    res.json({
      success: true,
      data: formattedDoctor
    });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch doctor'
    });
  }
});

// Get doctor availability for a specific date
router.get('/:id/availability', async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        error: 'Date parameter is required (YYYY-MM-DD format)'
      });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format. Use YYYY-MM-DD'
      });
    }

    // Get day of week (0-6, Sunday-Saturday)
    const appointmentDate = new Date(date);
    const dayOfWeek = appointmentDate.getDay();

    // Get doctor's schedule for this day
    const schedule = await runGet(`
      SELECT * FROM doctor_schedules
      WHERE doctor_id = ? AND day_of_week = ? AND is_available = 1
    `, [id, dayOfWeek]);

    if (!schedule) {
      return res.json({
        success: true,
        data: {
          date,
          isAvailable: false,
          availableSlots: [],
          message: 'Doctor is not available on this day'
        }
      });
    }

    // Get existing appointments for this date
    const existingAppointments = await runQuery(`
      SELECT appointment_time, duration_minutes
      FROM appointments
      WHERE doctor_id = ? AND appointment_date = ?
      AND status NOT IN ('cancelled', 'no-show')
      ORDER BY appointment_time
    `, [id, date]);

    // Generate available time slots
    const availableSlots = generateAvailableSlots(
      schedule.start_time,
      schedule.end_time,
      schedule.duration_minutes || 30,
      existingAppointments
    );

    res.json({
      success: true,
      data: {
        date,
        dayOfWeek,
        isAvailable: true,
        schedule: {
          startTime: schedule.start_time,
          endTime: schedule.end_time,
          duration: schedule.duration_minutes || 30
        },
        availableSlots,
        existingAppointments: existingAppointments.length
      }
    });
  } catch (error) {
    console.error('Error fetching doctor availability:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch doctor availability'
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