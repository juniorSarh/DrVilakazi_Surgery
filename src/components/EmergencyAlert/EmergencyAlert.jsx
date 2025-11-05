import React from 'react';
import styles from './EmergencyAlert.module.css';

const EmergencyAlert = () => {
  return (
    <div className={styles.emergencyAlert}>
      <div className={styles.emergencyContent}>
        <div className={styles.emergencyIcon}>🚨</div>
        <h2 className={styles.emergencyTitle}>Emergency Surgery Services</h2>
        <a
          href="tel:+5551234568"
          className={styles.emergencyPhone}
        >
          24/7 Emergency: (555) 123-4568
        </a>
        <p className={styles.emergencyDescription}>
          For urgent surgical needs, call our emergency line immediately
        </p>
        <a href="tel:+5551234568" className={styles.emergencyButton}>
          Call Emergency Line
        </a>
      </div>
    </div>
  );
};

export default EmergencyAlert;