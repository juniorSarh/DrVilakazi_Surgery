import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Dr. Vilakazi Surgery</h3>
            <p>
              Providing comprehensive general surgery services with compassion and excellence.
              Your health and well-being are our top priorities.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h3>Contact Information</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <div>
                  123 Medical Plaza, Suite 100<br />
                  Johannesburg, SA 2000
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <div>
                  <a href="tel:+5551234567">(555) 123-4567</a>
                  <br />
                  <a href="tel:+5551234568">Emergency: (555) 123-4568</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <div>
                  <a href="mailto:info@drvilakazisurgery.co.za">
                    info@drvilakazisurgery.co.za
                  </a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>🕒</span>
                <div>
                  Mon-Fri: 8AM-5PM<br />
                  {/* Emergency: 24/7 Available */}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <div className={styles.quickLinks}>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/doctors">Doctors</Link></li>
              </ul>
              <ul>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/emergency">Emergency</Link></li>
                <li><Link to="/appointments">Appointments</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>
            © {currentYear} Dr. Vilakazi Surgery. All rights reserved. |
            <Link to="/privacy"> Privacy Policy</Link> |
            <Link to="/terms"> Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;