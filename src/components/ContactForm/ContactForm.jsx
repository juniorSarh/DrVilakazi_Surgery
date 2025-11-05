import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    } else {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.preferredDate = 'Please select a future date';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      message: ''
    });
    setErrors({});
    setSubmitStatus('');
  };

  return (
    <section className={styles.contactForm}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Get in Touch</h2>
          <p className={styles.sectionSubtitle}>
            Schedule a consultation or ask us any questions about our surgical services
          </p>
        </div>

        <div className={styles.formContent}>
          <div className={styles.formContainer}>
            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                Thank you for your message! We'll get back to you within 24 hours.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={styles.errorMessageGlobal}>
                Sorry, there was an error sending your message. Please try again or call us directly.
              </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Full Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`${styles.formInput} ${errors.name ? styles.error : ''}`}
                  placeholder="John Doe"
                  required
                />
                {errors.name && (
                  <span className={`${styles.errorMessage} ${styles.show}`}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email Address <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
                    placeholder="john@example.com"
                    required
                  />
                  {errors.email && (
                    <span className={`${styles.errorMessage} ${styles.show}`}>
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>
                    Phone Number <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${errors.phone ? styles.error : ''}`}
                    placeholder="(555) 123-4567"
                    required
                  />
                  {errors.phone && (
                    <span className={`${styles.errorMessage} ${styles.show}`}>
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="preferredDate" className={styles.formLabel}>
                  Preferred Consultation Date <span className={styles.required}>*</span>
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  className={`${styles.formInput} ${errors.preferredDate ? styles.error : ''}`}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                {errors.preferredDate && (
                  <span className={`${styles.errorMessage} ${styles.show}`}>
                    {errors.preferredDate}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>
                  Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`${styles.formTextarea} ${errors.message ? styles.error : ''}`}
                  placeholder="Please describe your surgical needs or questions..."
                  rows={5}
                  required
                />
                {errors.message && (
                  <span className={`${styles.errorMessage} ${styles.show}`}>
                    {errors.message}
                  </span>
                )}
              </div>

              <div className={styles.formActions}>
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  loading={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="large"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </div>

          <div className={styles.contactInfo}>
            <h3 className={styles.infoTitle}>Contact Information</h3>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📞</span>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Phone</div>
                <div className={styles.infoText}>
                  <a href="tel:+5551234567" className={styles.infoLink}>
                    (555) 123-4567
                  </a>
                  <br />
                  Emergency:
                  <a href="tel:+5551234568" className={styles.infoLink}>
                    (555) 123-4568
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📧</span>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Email</div>
                <div className={styles.infoText}>
                  <a href="mailto:info@drvilakazisurgery.co.za" className={styles.infoLink}>
                    info@drvilakazisurgery.co.za
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Address</div>
                <div className={styles.infoText}>
                  123 Medical Plaza, Suite 100<br />
                  Johannesburg, SA 2000
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🕒</span>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Office Hours</div>
                <div className={styles.infoText}>
                  Monday - Friday: 8:00 AM - 5:00 PM<br />
                  Saturday: 9:00 AM - 1:00 PM<br />
                  Emergency: 24/7 Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;