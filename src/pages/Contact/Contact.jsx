import React from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';
import styles from './Contact.module.css';

const Contact = () => {
  const practiceAddress = "123 Medical Plaza, Suite 100, Johannesburg, SA 2000";
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(practiceAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={styles.contact}>
      <div className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSubtitle}>
            Get in touch with our surgical team to schedule a consultation or ask any questions about our services
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <h2 className={styles.contactTitle}>Get in Touch</h2>

            <div className={styles.contactMethod}>
              <span className={styles.contactIcon}>📞</span>
              <div className={styles.contactDetails}>
                <div className={styles.contactLabel}>Phone</div>
                <div className={styles.contactInfo}>
                  <a href="tel:+5551234567" className={styles.contactLink}>
                    (555) 123-4567
                  </a>
                  <br />
                  Main office line for appointments and inquiries
                </div>
              </div>
            </div>

            <div className={styles.contactMethod}>
              <span className={styles.contactIcon}>📧</span>
              <div className={styles.contactDetails}>
                <div className={styles.contactLabel}>Email</div>
                <div className={styles.contactInfo}>
                  <a href="mailto:info@drvilakazisurgery.co.za" className={styles.contactLink}>
                    info@drvilakazisurgery.co.za
                  </a>
                  <br />
                  General inquiries and appointment requests
                </div>
              </div>
            </div>

            <div className={styles.contactMethod}>
              <span className={styles.contactIcon}>📍</span>
              <div className={styles.contactDetails}>
                <div className={styles.contactLabel}>Address</div>
                <div className={styles.contactInfo}>
                  123 Medical Plaza, Suite 100
                  <br />
                  Johannesburg, SA 2000
                  <br />
                  South Africa
                </div>
              </div>
            </div>

            <div className={styles.contactMethod}>
              <span className={styles.contactIcon}>🕒</span>
              <div className={styles.contactDetails}>
                <div className={styles.contactLabel}>Office Hours</div>
                <div className={styles.contactInfo}>
                  Monday - Friday: 8:00 AM - 5:00 PM
                  <br />
                  Saturday: 9:00 AM - 1:00 PM
                  <br />
                  Sunday: Closed
                </div>
              </div>
            </div>

            <div className={styles.emergencyContact}>
              <div className={styles.emergencyTitle}>
                🚨 Emergency Contact
              </div>
              <a href="tel:+5551234568" className={styles.emergencyPhone}>
                (555) 123-4568
              </a>
              <div className={styles.emergencyText}>
                Available 24/7 for urgent surgical emergencies
              </div>
            </div>

            <div className={styles.appointmentTypes}>
              <h3 className={styles.contactTitle}>Appointment Types</h3>

              <div className={styles.appointmentType}>
                <div className={styles.appointmentTypeTitle}>Initial Consultation</div>
                <div className={styles.appointmentTypeDescription}>
                  Comprehensive evaluation and discussion of your surgical needs, treatment options, and next steps.
                </div>
              </div>

              <div className={styles.appointmentType}>
                <div className={styles.appointmentTypeTitle}>Pre-operative Assessment</div>
                <div className={styles.appointmentTypeDescription}>
                  Medical evaluation and preparation for scheduled surgery, including tests and consent process.
                </div>
              </div>

              <div className={styles.appointmentType}>
                <div className={styles.appointmentTypeTitle}>Post-operative Follow-up</div>
                <div className={styles.appointmentTypeDescription}>
                  Recovery assessment, wound care, and discussion of results after your procedure.
                </div>
              </div>

              <div className={styles.appointmentType}>
                <div className={styles.appointmentTypeTitle}>Second Opinion</div>
                <div className={styles.appointmentTypeDescription}>
                  Independent assessment of your condition and recommended surgical approach.
                </div>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>

      <div className={styles.mapSection}>
        <div className="container">
          <h2 className={styles.mapTitle}>Visit Our Practice</h2>
          <p className={styles.mapSubtitle}>
            Conveniently located in Johannesburg with easy access and parking available
          </p>

          <div className={styles.mapContainer}>
            <iframe
              src={mapUrl}
              className={styles.mapIframe}
              title="Dr. Vilakazi Surgery Center Location"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className={styles.directionsButtons}>
            <a
              href={`https://maps.google.com/maps?q=${encodeURIComponent(practiceAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsButton}
            >
              Get Directions
            </a>
            <a href="tel:+5551234567" className={styles.directionsButton}>
              Call for Directions
            </a>
          </div>
        </div>
      </div>

      <div className={styles.faq}>
        <div className="container">
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>
                Do I need a referral to schedule an appointment?
              </div>
              <div className={styles.faqAnswer}>
                While referrals from other doctors are welcome, you don't need a referral to schedule a consultation with our surgical team.
              </div>
            </div>

            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>
                What should I bring to my first appointment?
              </div>
              <div className={styles.faqAnswer}>
                Please bring your ID, insurance card, list of medications, relevant medical records, and any imaging studies related to your condition.
              </div>
            </div>

            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>
                How long does a typical consultation last?
              </div>
              <div className={styles.faqAnswer}>
                Initial consultations typically last 30-45 minutes, allowing adequate time for evaluation, discussion, and treatment planning.
              </div>
            </div>

            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>
                What payment methods do you accept?
              </div>
              <div className={styles.faqAnswer}>
                We accept most medical aid schemes, cash, and credit card payments. Our office can help verify your insurance coverage before your visit.
              </div>
            </div>

            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>
                Can I cancel or reschedule my appointment?
              </div>
              <div className={styles.faqAnswer}>
                Yes, please provide at least 24 hours' notice for cancellations or rescheduling to avoid any cancellation fees.
              </div>
            </div>

            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>
                Is parking available at your facility?
              </div>
              <div className={styles.faqAnswer}>
                Yes, we have dedicated patient parking available at no additional cost. The entrance is accessible from Medical Plaza Drive.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;