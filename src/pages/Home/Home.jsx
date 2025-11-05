import React from 'react';
import Hero from '../../components/Hero/Hero';
import EmergencyAlert from '../../components/EmergencyAlert/EmergencyAlert';
import Services from '../../components/Services/Services';
import Location from '../../components/Location/Location';
import ContactForm from '../../components/ContactForm/ContactForm';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <main className={styles.mainContent}>
        <Hero />
        <EmergencyAlert />
        <Services />
        <div className={styles.alternatingSection}>
          <Location />
        </div>
        <ContactForm />
      </main>
    </div>
  );
};

export default Home;