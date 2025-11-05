import React, { useState, useEffect } from 'react';
import Button from '../UI/Button/Button';
import styles from './AppointmentBooking.module.css';

const AppointmentBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form data
  const [formData, setFormData] = useState({
    patient: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      medicalAid: '',
      medicalAidNumber: '',
      allergies: '',
      medications: '',
      medicalHistory: ''
    },
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: '',
    reasonForVisit: '',
    isNewPatient: true,
    notes: ''
  });

  // Available data
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const API_BASE_URL = 'http://localhost:3001/api';

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (formData.doctorId && formData.appointmentDate) {
      fetchAvailableSlots();
    }
  }, [formData.doctorId, formData.appointmentDate]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/doctors`);
      const data = await response.json();

      if (data.success) {
        setDoctors(data.data);
      } else {
        setError('Failed to load doctors');
      }
    } catch (error) {
      setError('Error connecting to server');
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async () => {
    if (!formData.doctorId || !formData.appointmentDate) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/doctors/${formData.doctorId}/availability?date=${formData.appointmentDate}`
      );
      const data = await response.json();

      if (data.success) {
        setAvailableSlots(data.data.availableSlots || []);
      } else {
        setError('Failed to load available slots');
      }
    } catch (error) {
      setError('Error loading available slots');
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setError('');
  };

  const handleDoctorSelect = (doctor) => {
    setFormData(prev => ({
      ...prev,
      doctorId: doctor.id.toString()
    }));
    setSelectedDoctor(doctor);
    setAvailableSlots([]);
  };

  const handleTimeSlotSelect = (time) => {
    setFormData(prev => ({
      ...prev,
      appointmentTime: time
    }));
  };

  const handleAppointmentTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      appointmentType: type,
      isNewPatient: type === 'consultation'
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.patient.firstName || !formData.patient.lastName ||
            !formData.patient.email || !formData.patient.phone) {
          setError('Please fill in all required patient information');
          return false;
        }
        if (!formData.patient.email.includes('@')) {
          setError('Please enter a valid email address');
          return false;
        }
        break;

      case 2:
        if (!formData.doctorId) {
          setError('Please select a doctor');
          return false;
        }
        break;

      case 3:
        if (!formData.appointmentDate || !formData.appointmentTime) {
          setError('Please select a date and time for your appointment');
          return false;
        }
        break;

      case 4:
        if (!formData.appointmentType || !formData.reasonForVisit) {
          setError('Please select appointment type and provide reason for visit');
          return false;
        }
        break;

      default:
        return true;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
      setError('');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(4)) return;

    try {
      setLoading(true);
      setError('');

      const appointmentData = {
        patient: formData.patient,
        doctorId: parseInt(formData.doctorId),
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        appointmentType: formData.appointmentType,
        reasonForVisit: formData.reasonForVisit,
        isNewPatient: formData.isNewPatient,
        notes: formData.notes
      };

      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Appointment booked successfully! You will receive a confirmation email shortly.');
        setCurrentStep(5);
      } else {
        setError(data.error || 'Failed to book appointment');
      }
    } catch (error) {
      setError('Error booking appointment. Please try again.');
      console.error('Error booking appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPatientInfo();
      case 2:
        return renderDoctorSelection();
      case 3:
        return renderDateTimeSelection();
      case 4:
        return renderAppointmentDetails();
      case 5:
        return renderConfirmation();
      default:
        return null;
    }
  };

  const renderPatientInfo = () => (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>👤</span>
        Patient Information
      </h2>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            First Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={styles.formInput}
            value={formData.patient.firstName}
            onChange={(e) => handleInputChange('patient', 'firstName', e.target.value)}
            placeholder="John"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Last Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={styles.formInput}
            value={formData.patient.lastName}
            onChange={(e) => handleInputChange('patient', 'lastName', e.target.value)}
            placeholder="Doe"
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Email <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            className={styles.formInput}
            value={formData.patient.email}
            onChange={(e) => handleInputChange('patient', 'email', e.target.value)}
            placeholder="john@example.com"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Phone <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            className={styles.formInput}
            value={formData.patient.phone}
            onChange={(e) => handleInputChange('patient', 'phone', e.target.value)}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Date of Birth</label>
        <input
          type="date"
          className={styles.formInput}
          value={formData.patient.dateOfBirth}
          onChange={(e) => handleInputChange('patient', 'dateOfBirth', e.target.value)}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Medical Aid</label>
          <input
            type="text"
            className={styles.formInput}
            value={formData.patient.medicalAid}
            onChange={(e) => handleInputChange('patient', 'medicalAid', e.target.value)}
            placeholder="Discovery Health"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Medical Aid Number</label>
          <input
            type="text"
            className={styles.formInput}
            value={formData.patient.medicalAidNumber}
            onChange={(e) => handleInputChange('patient', 'medicalAidNumber', e.target.value)}
            placeholder="123456789"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Allergies</label>
        <textarea
          className={styles.formTextarea}
          value={formData.patient.allergies}
          onChange={(e) => handleInputChange('patient', 'allergies', e.target.value)}
          placeholder="Please list any known allergies..."
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Current Medications</label>
        <textarea
          className={styles.formTextarea}
          value={formData.patient.medications}
          onChange={(e) => handleInputChange('patient', 'medications', e.target.value)}
          placeholder="Please list current medications..."
        />
      </div>
    </div>
  );

  const renderDoctorSelection = () => (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>👨‍⚕️</span>
        Select Doctor
      </h2>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          Loading doctors...
        </div>
      ) : (
        <div className={styles.doctorSelection}>
          {doctors.map(doctor => (
            <div
              key={doctor.id}
              className={`${styles.doctorCard} ${
                selectedDoctor?.id === doctor.id ? styles.selected : ''
              }`}
              onClick={() => handleDoctorSelect(doctor)}
            >
              <div className={styles.doctorName}>{doctor.name}</div>
              <div className={styles.doctorSpecialty}>{doctor.specialty}</div>
            </div>
          ))}
        </div>
      )}

      {selectedDoctor && (
        <div className={styles.previewSection}>
          <div className={styles.previewTitle}>Selected Doctor</div>
          <div className={styles.previewDetails}>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Name:</span>
              <span className={styles.previewValue}>{selectedDoctor.name}</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Specialty:</span>
              <span className={styles.previewValue}>{selectedDoctor.specialty}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderDateTimeSelection = () => (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>📅</span>
        Select Date & Time
      </h2>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Appointment Date <span className={styles.required}>*</span>
        </label>
        <input
          type="date"
          className={styles.formInput}
          value={formData.appointmentDate}
          onChange={(e) => handleInputChange('', 'appointmentDate', e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      {formData.appointmentDate && (
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Available Times <span className={styles.required}>*</span>
          </label>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              Loading available times...
            </div>
          ) : availableSlots.length > 0 ? (
            <div className={styles.timeSlotGrid}>
              {availableSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`${styles.timeSlot} ${
                    formData.appointmentTime === slot.time ? styles.selected : ''
                  }`}
                  onClick={() => handleTimeSlotSelect(slot.time)}
                >
                  {slot.time12}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.errorMessage}>
              No available time slots for the selected date. Please choose another date.
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderAppointmentDetails = () => (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>📋</span>
        Appointment Details
      </h2>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Appointment Type <span className={styles.required}>*</span>
        </label>
        <div className={styles.appointmentTypes}>
          <div
            className={`${styles.appointmentType} ${
              formData.appointmentType === 'consultation' ? styles.selected : ''
            }`}
            onClick={() => handleAppointmentTypeSelect('consultation')}
          >
            <div className={styles.typeIcon}>🏥</div>
            <div className={styles.typeName}>Consultation</div>
            <div className={styles.typeDescription}>Initial visit or new issue</div>
          </div>
          <div
            className={`${styles.appointmentType} ${
              formData.appointmentType === 'follow-up' ? styles.selected : ''
            }`}
            onClick={() => handleAppointmentTypeSelect('follow-up')}
          >
            <div className={styles.typeIcon}>🔄</div>
            <div className={styles.typeName}>Follow-up</div>
            <div className={styles.typeDescription}>Return visit</div>
          </div>
          <div
            className={`${styles.appointmentType} ${
              formData.appointmentType === 'procedure' ? styles.selected : ''
            }`}
            onClick={() => handleAppointmentTypeSelect('procedure')}
          >
            <div className={styles.typeIcon}>⚕️</div>
            <div className={styles.typeName}>Procedure</div>
            <div className={styles.typeDescription}>Scheduled procedure</div>
          </div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Reason for Visit <span className={styles.required}>*</span>
        </label>
        <textarea
          className={styles.formTextarea}
          value={formData.reasonForVisit}
          onChange={(e) => handleInputChange('', 'reasonForVisit', e.target.value)}
          placeholder="Please describe why you need this appointment..."
          rows={4}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Additional Notes</label>
        <textarea
          className={styles.formTextarea}
          value={formData.notes}
          onChange={(e) => handleInputChange('', 'notes', e.target.value)}
          placeholder="Any additional information you'd like to share..."
          rows={3}
        />
      </div>

      <div className={styles.previewSection}>
        <div className={styles.previewTitle}>Appointment Summary</div>
        <div className={styles.previewDetails}>
          <div className={styles.previewRow}>
            <span className={styles.previewLabel}>Patient:</span>
            <span className={styles.previewValue}>
              {formData.patient.firstName} {formData.patient.lastName}
            </span>
          </div>
          <div className={styles.previewRow}>
            <span className={styles.previewLabel}>Doctor:</span>
            <span className={styles.previewValue}>{selectedDoctor?.name}</span>
          </div>
          <div className={styles.previewRow}>
            <span className={styles.previewLabel}>Date:</span>
            <span className={styles.previewValue}>{formData.appointmentDate}</span>
          </div>
          <div className={styles.previewRow}>
            <span className={styles.previewLabel}>Time:</span>
            <span className={styles.previewValue}>{formData.appointmentTime}</span>
          </div>
          <div className={styles.previewRow}>
            <span className={styles.previewLabel}>Type:</span>
            <span className={styles.previewValue}>{formData.appointmentType}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className={styles.formSection}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h2 className={styles.sectionTitle} style={{ justifyContent: 'center' }}>
          Appointment Booked Successfully!
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
          Your appointment has been confirmed. A confirmation email has been sent to {formData.patient.email}.
        </p>

        <div className={styles.previewSection}>
          <div className={styles.previewTitle}>Appointment Details</div>
          <div className={styles.previewDetails}>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Confirmation:</span>
              <span className={styles.previewValue}>Booked</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Patient:</span>
              <span className={styles.previewValue}>
                {formData.patient.firstName} {formData.patient.lastName}
              </span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Doctor:</span>
              <span className={styles.previewValue}>{selectedDoctor?.name}</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Date:</span>
              <span className={styles.previewValue}>{formData.appointmentDate}</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Time:</span>
              <span className={styles.previewValue}>{formData.appointmentTime}</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Type:</span>
              <span className={styles.previewValue}>{formData.appointmentType}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <p style={{ marginBottom: '1rem' }}>
            Please arrive 15 minutes before your appointment time.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            If you need to cancel or reschedule, please call us at least 24 hours in advance.
          </p>
          <p>
            <strong>Phone:</strong> (555) 123-4567 | <strong>Emergency:</strong> (555) 123-4568
          </p>
        </div>

        <Button variant="primary" size="large" onClick={() => window.location.href = '/'}>
          Return to Homepage
        </Button>
      </div>
    </div>
  );

  return (
    <div className={styles.appointmentBooking}>
      <div className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Book Your Appointment</h1>
          <p className={styles.heroSubtitle}>
            Schedule your consultation with our expert surgical team
          </p>
        </div>
      </div>

      <div className={styles.bookingContainer}>
        <div className={styles.bookingSteps}>
          <div className={`${styles.step} ${currentStep >= 1 ? styles.completed : ''} ${currentStep === 1 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepTitle}>Patient Info</div>
            <div className={styles.stepDescription}>Your contact information</div>
          </div>
          <div className={`${styles.step} ${currentStep >= 2 ? styles.completed : ''} ${currentStep === 2 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepTitle}>Select Doctor</div>
            <div className={styles.stepDescription}>Choose your surgeon</div>
          </div>
          <div className={`${styles.step} ${currentStep >= 3 ? styles.completed : ''} ${currentStep === 3 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepTitle}>Date & Time</div>
            <div className={styles.stepDescription}>Schedule your visit</div>
          </div>
          <div className={`${styles.step} ${currentStep >= 4 ? styles.completed : ''} ${currentStep === 4 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepTitle}>Details</div>
            <div className={styles.stepDescription}>Visit information</div>
          </div>
          <div className={`${styles.step} ${currentStep === 5 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>5</div>
            <div className={styles.stepTitle}>Confirmation</div>
            <div className={styles.stepDescription}>Appointment booked</div>
          </div>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {success && (
          <div className={styles.successMessage}>
            {success}
          </div>
        )}

        <div className={styles.bookingForm}>
          {renderStepContent()}
        </div>

        {currentStep < 5 && (
          <div className={styles.formActions}>
            {currentStep > 1 && (
              <Button variant="secondary" onClick={prevStep} disabled={loading}>
                Previous
              </Button>
            )}
            {currentStep < 4 ? (
              <Button variant="primary" onClick={nextStep} disabled={loading}>
                Next
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit} disabled={loading} loading={loading}>
                Book Appointment
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
