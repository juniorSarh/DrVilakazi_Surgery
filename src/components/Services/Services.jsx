import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import styles from './Services.module.css';

const Services = () => {
  const services = [
    {
      icon: '🏥',
      title: 'General Surgery',
      description: 'Comprehensive surgical procedures for various conditions using advanced techniques and modern equipment.',
      link: '/services#general-surgery'
    },
    {
      icon: '🔬',
      title: 'Minimally Invasive',
      description: 'Advanced laparoscopic and robotic surgery techniques for faster recovery and less scarring.',
      link: '/services#minimally-invasive'
    },
    {
      icon: '🚑',
      title: 'Emergency Surgery',
      description: '24/7 emergency surgical care when you need it most with experienced trauma surgeons.',
      link: '/services#emergency-surgery'
    }
  ];

  return (
    <section className={styles.services}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Surgical Services</h2>
          <p className={styles.sectionSubtitle}>
            We offer a comprehensive range of surgical services using the latest techniques and technologies
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <Link to={service.link} className={styles.serviceButton}>
                Learn More
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <h3 className={styles.ctaTitle}>Need Surgical Care?</h3>
          <p className={styles.ctaDescription}>
            Our experienced team is here to provide you with the highest quality surgical care
          </p>
          <Link to="/contact">
            <Button variant="primary" size="large">
              Book Consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;