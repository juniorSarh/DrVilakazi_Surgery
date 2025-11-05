import React from 'react';
import AppointmentBooking from '../../components/AppointmentBooking/AppointmentBooking';
import styles from './BookAppointment.module.css';

const BookAppointment = () => {
  return (
    <div className={styles.bookAppointment}>
      <main className={styles.mainContent}>
        <AppointmentBooking />
      </main>
    </div>
  );
};

export default BookAppointment;