import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Expert Surgical Care You Can Trust
          </h1>
          <p className={styles.heroSubtitle}>
            Providing comprehensive general surgery services with compassion and excellence
          </p>
          <div className={styles.heroButtons}>
            <Link to="/contact">
              <Button
                variant="outline"
                size="large"
                className={styles.heroButton}
              >
                Book Consultation
              </Button>
            </Link>
            <Link to="/services">
              <Button
                variant="secondary"
                size="large"
                className={styles.heroButton}
              >
                Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;