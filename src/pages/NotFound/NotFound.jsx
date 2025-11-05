import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundContent}>
        <div className={styles.errorImage}>🏥</div>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.errorTitle}>Page Not Found</h1>
        <p className={styles.errorDescription}>
          Oops! The page you're looking for doesn't exist or has been moved.
          Don't worry, our surgical team is still here to help you with your healthcare needs.
        </p>
        <div className={styles.errorActions}>
          <Link to="/">
            <Button variant="primary" size="large">
              Go to Homepage
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="secondary" size="large">
              Contact Us
            </Button>
          </Link>
        </div>

        <div className={styles.suggestions}>
          <h3 className={styles.suggestionsTitle}>You might be looking for:</h3>
          <ul className={styles.suggestionsList}>
            <li className={styles.suggestionItem}>
              <Link to="/services" className={styles.suggestionLink}>
                Our Surgical Services
              </Link>
            </li>
            <li className={styles.suggestionItem}>
              <Link to="/doctors" className={styles.suggestionLink}>
                Meet Our Surgical Team
              </Link>
            </li>
            <li className={styles.suggestionItem}>
              <Link to="/about" className={styles.suggestionLink}>
                About Our Practice
              </Link>
            </li>
            <li className={styles.suggestionItem}>
              <Link to="/blog" className={styles.suggestionLink}>
                Medical Insights & Education
              </Link>
            </li>
            <li className={styles.suggestionItem}>
              <Link to="/contact" className={styles.suggestionLink}>
                Book a Consultation
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;