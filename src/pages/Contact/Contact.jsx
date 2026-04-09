import React from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const practiceAddress = "12 Voew Street, Harrismith, Free State, SA 2000";
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(practiceAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(practiceAddress)}`;

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
                <div className={styles.contactText}>
                  <a href="tel:+5551234567" className={styles.contactLink}>
                    (555) 123-4567
                  </a>
                  <p className={styles.contactDescription}>Main office line for appointments and inquiries</p>
                </div>
              </div>
            </div>

            <div className={styles.contactMethod}>
              <span className={styles.contactIcon}>📧</span>
              <div className={styles.contactDetails}>
                <div className={styles.contactLabel}>Email</div>
                <div className={styles.contactText}>
                  <a href="mailto:info@drvilakazisurgery.co.za" className={styles.contactLink}>
                    info@drvilakazisurgery.co.za
                  </a>
                  <p className={styles.contactDescription}>General inquiries and appointment requests</p>
                </div>
              </div>
            </div>

            <div className={styles.contactMethod}>
              <span className={styles.contactIcon}>📍</span>
              <div className={styles.contactDetails}>
                <div className={styles.contactLabel}>Address</div>
                <div className={styles.contactText}>
                  <p>123 Medical Plaza, Suite 100</p>
                  <p>Johannesburg, SA 2000</p>
                  <p>South Africa</p>
                </div>
              </div>
            </div>

            <div className={styles.contactMethod}>
              <span className={styles.contactIcon}>🕒</span>
              <div className={styles.contactDetails}>
                <div className={styles.contactLabel}>Office Hours</div>
                <div className={styles.contactText}>
                  <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                  <p>Sunday: Closed</p>
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
          </div>

          <div className={styles.mapContainer}>
            <div className={styles.mapWrapper}>
              <iframe
                title="Practice Location"
                src={mapUrl}
                className={styles.mapIframe}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className={styles.directionsButtons}>
              <a 
                href={directionsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.directionsButton}
              >
                Get Directions
              </a>
              <a 
                href="tel:+5551234567" 
                className={`${styles.directionsButton} ${styles.callButton}`}
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;