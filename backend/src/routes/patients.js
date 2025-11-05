import express from 'express';
import { body, validationResult } from 'express-validator';
import { runQuery, runGet, runRun } from '../config/database.js';

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

// Create new patient
router.post('/', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required')
], handleValidationErrors, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      medicalAid,
      medicalAidNumber,
      allergies,
      medications,
      medicalHistory
    } = req.body;

    // Check if patient already exists
    const existingPatient = await runGet('SELECT id FROM patients WHERE email = ?', [email]);

    if (existingPatient) {
      return res.status(409).json({
        success: false,
        error: 'Patient with this email already exists'
      });
    }

    // Create new patient
    const result = await runRun(`
      INSERT INTO patients (
        first_name, last_name, email, phone, date_of_birth,
        medical_aid, medical_aid_number, allergies, medications, medical_history
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth || null,
      medicalAid || null,
      medicalAidNumber || null,
      allergies || null,
      medications || null,
      medicalHistory || null
    ]);

    const patientId = result.id;

    // Return created patient
    const patient = await runGet('SELECT * FROM patients WHERE id = ?', [patientId]);

    res.status(201).json({
      success: true,
      data: patient,
      message: 'Patient created successfully'
    });
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create patient'
    });
  }
});

// Get patient by email
router.get('/email/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const patient = await runGet('SELECT * FROM patients WHERE email = ?', [email]);

    if (!patient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found'
      });
    }

    res.json({
      success: true,
      data: patient
    });
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch patient'
    });
  }
});

// Update patient information
router.put('/:id', [
  body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().notEmpty().withMessage('Phone number cannot be empty')
], handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if patient exists
    const existingPatient = await runGet('SELECT id FROM patients WHERE id = ?', [id]);

    if (!existingPatient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found'
      });
    }

    // If email is being updated, check if it's already used by another patient
    if (updates.email) {
      const emailCheck = await runGet('SELECT id FROM patients WHERE email = ? AND id != ?', [updates.email, id]);
      if (emailCheck) {
        return res.status(409).json({
          success: false,
          error: 'Email is already used by another patient'
        });
      }
    }

    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];

    const fieldMap = {
      firstName: 'first_name',
      lastName: 'last_name',
      email: 'email',
      phone: 'phone',
      dateOfBirth: 'date_of_birth',
      medicalAid: 'medical_aid',
      medicalAidNumber: 'medical_aid_number',
      allergies: 'allergies',
      medications: 'medications',
      medicalHistory: 'medical_history'
    };

    Object.keys(updates).forEach(key => {
      if (fieldMap[key]) {
        updateFields.push(`${fieldMap[key]} = ?`);
        updateValues.push(updates[key]);
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid fields to update'
      });
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(id);

    await runRun(`
      UPDATE patients SET ${updateFields.join(', ')} WHERE id = ?
    `, updateValues);

    // Get updated patient
    const updatedPatient = await runGet('SELECT * FROM patients WHERE id = ?', [id]);

    res.json({
      success: true,
      data: updatedPatient,
      message: 'Patient updated successfully'
    });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update patient'
    });
  }
});

export default router;