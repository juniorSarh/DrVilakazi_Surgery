import express from 'express';
import { body, validationResult } from 'express-validator';
import { runQuery, runGet, runRun } from '../config/database.js';
import { sendAppointmentConfirmation } from '../services/emailService.js';

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Create new appointment
router.post('/', [
  body('patient.firstName').notEmpty().withMessage('First name is required'),
  body('patient.lastName').notEmpty().withMessage('Last name is required'),
  body('patient.email').isEmail().withMessage('Valid email is required'),
  body('patient.phone').notEmpty().withMessage('Phone number is required'),
  body('doctorId').isInt({ min: 1 }).withMessage('Valid doctor ID is required'),
  body('appointmentDate').isISO8601().withMessage('Valid appointment date is required'),
  body('appointmentTime').matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid time format required (HH:MM)'),
  body('appointmentType').isIn(['consultation', 'follow-up', 'procedure']).withMessage('Valid appointment type is required'),
  body('reasonForVisit').notEmpty().withMessage('Reason for visit is required'),
  body('isNewPatient').isBoolean().withMessage('Is new patient must be a boolean')
], handleValidationErrors, async (req, res) => {
  try {
    const {
      patient,
      doctorId,
      appointmentDate,
      appointmentTime,
      appointmentType,
      reasonForVisit,
      isNewPatient,
      notes
    } = req.body;

    // Check if doctor exists and is available
    const doctor = await runGet('SELECT * FROM doctors WHERE id = ? AND is_active = 1', [doctorId]);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        error: 'Doctor not found or not available'
      });
    }

    // Check if time slot is available
    const existingAppointment = await runGet(`
      SELECT id FROM appointments
      WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ?
      AND status NOT IN ('cancelled', 'no-show')
    `, [doctorId, appointmentDate, appointmentTime]);

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        error: 'This time slot is already booked'
      });
    }

    // Create or find patient
    let patientId;
    const existingPatient = await runGet('SELECT id FROM patients WHERE email = ?', [patient.email]);

    if (existingPatient) {
      patientId = existingPatient.id;
      // Update patient information
      await runRun(`
        UPDATE patients SET
          first_name = ?, last_name = ?, phone = ?,
          date_of_birth = ?, medical_aid = ?, medical_aid_number = ?,
          allergies = ?, medications = ?, medical_history = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [
        patient.firstName,
        patient.lastName,
        patient.phone,
        patient.dateOfBirth || null,
        patient.medicalAid || null,
        patient.medicalAidNumber || null,
        patient.allergies || null,
        patient.medications || null,
        patient.medicalHistory || null,
        patientId
      ]);
    } else {
      const patientResult = await runRun(`
        INSERT INTO patients (
          first_name, last_name, email, phone, date_of_birth,
          medical_aid, medical_aid_number, allergies, medications, medical_history
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        patient.firstName,
        patient.lastName,
        patient.email,
        patient.phone,
        patient.dateOfBirth || null,
        patient.medicalAid || null,
        patient.medicalAidNumber || null,
        patient.allergies || null,
        patient.medications || null,
        patient.medicalHistory || null
      ]);
      patientId = patientResult.id;
    }

    // Create appointment
    const appointmentResult = await runRun(`
      INSERT INTO appointments (
        patient_id, doctor_id, appointment_date, appointment_time,
        appointment_type, status, notes, reason_for_visit, is_new_patient
      ) VALUES (?, ?, ?, ?, ?, 'scheduled', ?, ?, ?)
    `, [
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      appointmentType,
      notes || null,
      reasonForVisit,
      isNewPatient
    ]);

    const appointmentId = appointmentResult.id;

    // Get full appointment details
    const appointment = await runGet(`
      SELECT
        a.*,
        p.first_name, p.last_name, p.email, p.phone,
        d.name as doctor_name, d.specialty
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.id = ?
    `, [appointmentId]);

    // Send confirmation email (async, don't wait for it)
    sendAppointmentConfirmation(appointment).catch(error => {
      console.error('Failed to send confirmation email:', error);
    });

    res.status(201).json({
      success: true,
      data: {
        appointmentId,
        patient: {
          id: patientId,
          name: `${patient.firstName} ${patient.lastName}`,
          email: patient.email,
          phone: patient.phone
        },
        doctor: {
          id: doctorId,
          name: doctor.name,
          specialty: doctor.specialty
        },
        appointment: {
          date: appointmentDate,
          time: appointmentTime,
          type: appointmentType,
          reason: reasonForVisit,
          status: 'scheduled'
        }
      },
      message: 'Appointment booked successfully'
    });

  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create appointment'
    });
  }
});

// Get appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await runGet(`
      SELECT
        a.*,
        p.first_name, p.last_name, p.email, p.phone,
        d.name as doctor_name, d.specialty, d.email as doctor_email
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.id = ?
    `, [id]);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch appointment'
    });
  }
});

// Get appointments by patient email
router.get('/patient/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const appointments = await runQuery(`
      SELECT
        a.*,
        d.name as doctor_name, d.specialty
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN doctors d ON a.doctor_id = d.id
      WHERE p.email = ?
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `, [email]);

    res.json({
      success: true,
      data: appointments,
      count: appointments.length
    });
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch appointments'
    });
  }
});

// Cancel appointment
router.patch('/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const appointment = await runGet('SELECT * FROM appointments WHERE id = ?', [id]);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        error: 'Appointment is already cancelled'
      });
    }

    if (appointment.status === 'completed') {
      return res.status(400).json({
        success: false,
        error: 'Cannot cancel completed appointment'
      });
    }

    await runRun(`
      UPDATE appointments
      SET status = 'cancelled', notes = COALESCE(notes, '') || ? || ' ',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [reason ? `Cancellation reason: ${reason}` : 'Cancelled by patient', id]);

    res.json({
      success: true,
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel appointment'
    });
  }
});

// Reschedule appointment
router.patch('/:id/reschedule', [
  body('newDate').isISO8601().withMessage('Valid new date is required'),
  body('newTime').matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid time format required (HH:MM)'),
  body('reason').optional().isString()
], handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const { newDate, newTime, reason } = req.body;

    const appointment = await runGet('SELECT * FROM appointments WHERE id = ?', [id]);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        error: 'Cannot reschedule cancelled appointment'
      });
    }

    if (appointment.status === 'completed') {
      return res.status(400).json({
        success: false,
        error: 'Cannot reschedule completed appointment'
      });
    }

    // Check if new time slot is available
    const existingAppointment = await runGet(`
      SELECT id FROM appointments
      WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ?
      AND status NOT IN ('cancelled', 'no-show')
      AND id != ?
    `, [appointment.doctor_id, newDate, newTime, id]);

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        error: 'New time slot is already booked'
      });
    }

    await runRun(`
      UPDATE appointments
      SET appointment_date = ?, appointment_time = ?,
        notes = COALESCE(notes, '') || ? || ' ',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      newDate,
      newTime,
      reason ? `Rescheduled: ${reason}` : 'Rescheduled by patient',
      id
    ]);

    res.json({
      success: true,
      message: 'Appointment rescheduled successfully',
      newAppointment: {
        date: newDate,
        time: newTime
      }
    });
  } catch (error) {
    console.error('Error rescheduling appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reschedule appointment'
    });
  }
});

export default router;