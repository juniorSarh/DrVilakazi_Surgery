import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../UI/Button/Button';
import styles from './Navigation.module.css';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/book-appointment', label: 'Book Appointment' },
    { path: '/contact', label: 'Contact' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navigation}>
      <div className="container">
        <div className={styles.navContainer}>
          <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
            Dr. Vilakazi Surgery
          </Link>

          <ul className={styles.navMenu}>
            {navItems.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${
                    location.pathname === item.path ? styles.active : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className={styles.ctaButton}>
              <Link to="/contact">
                <Button variant="primary" size="small">
                  Book Consultation
                </Button>
              </Link>
            </li>
          </ul>

          <button
            className={styles.hamburger}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`${styles.mobileMenu} ${
          mobileMenuOpen ? styles.mobileMenuOpen : ''
        }`}>
          <ul className={styles.mobileNavMenu}>
            {navItems.map((item) => (
              <li key={item.path} className={styles.mobileNavItem}>
                <Link
                  to={item.path}
                  className={`${styles.mobileNavLink} ${
                    location.pathname === item.path ? styles.active : ''
                  }`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.mobileCta}>
            <Link to="/contact" onClick={closeMobileMenu}>
              <Button variant="primary" size="medium" fullWidth>
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;