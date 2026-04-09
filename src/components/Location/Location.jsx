import React from 'react';
import styles from './Location.module.css';

const Location = () => {
  const practiceAddress = "12 Voew Street, Harrismith, Free State, SA 2000";
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(practiceAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className={styles.location}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Visit Our Practice</h2>
          <p className={styles.sectionSubtitle}>
            Conveniently located in Johannesburg with easy access and parking available
          </p>
        </div>

        <div className={styles.locationContent}>
          <div className={styles.locationInfo}>
            <h3 className={styles.practiceName}>Dr. Vilakazi Surgery Center</h3>

            <div className={styles.address}>
              <h4 className={styles.addressTitle}>Address</h4>
              <p className={styles.addressText}>
                12 Voew Street<br />
                Harrismith, Free State, SA 2000
              </p>
            </div>

            <div className={styles.contactInfo}>
              <h4 className={styles.contactTitle}>Contact Information</h4>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <div>
                  <a href="tel:+5551234567" className={styles.contactLink}>
                    (555) 123-4567
                  </a>
                  <div className={styles.contactText}>Main Office</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <div>
                  <a href="mailto:info@drvilakazisurgery.co.za" className={styles.contactLink}>
                    info@drvilakazisurgery.co.za
                  </a>
                  <div className={styles.contactText}>Email Inquiries</div>
                </div>
              </div>
            </div>

            <div className={styles.hoursInfo}>
              <h4 className={styles.hoursTitle}>Office Hours</h4>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>🕒</span>
                <div className={styles.contactText}>
                  Monday - Friday: 8:00 AM - 5:00 PM<br />
                  Saturday: 9:00 AM - 1:00 PM<br />
                  Sunday: Closed
                </div>
              </div>
            </div>

            <div className={styles.emergencyInfo}>
              <div className={styles.emergencyTitle}>
                🚨 Emergency Services
              </div>
              <div className={styles.emergencyText}>
                Available 24/7 for urgent surgical needs
              </div>
            </div>
          </div>

          <div className={styles.mapContainer}>
            <iframe
              src={mapUrl}
              className={styles.mapIframe}
              title="Dr. Vilakazi Surgery Center Location"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className={styles.mapFallback}>
              <p className={styles.mapFallbackText}>
                Map loading disabled. Please enable to see location.
              </p>
              <a
                href={`https://maps.google.com/maps?q=${encodeURIComponent(practiceAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.directionsButton}
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;