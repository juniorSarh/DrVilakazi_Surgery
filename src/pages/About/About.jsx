import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import styles from './About.module.css';

const About = () => {
  const features = [
    {
      icon: '🏆',
      title: 'Excellence in Care',
      text: 'Committed to providing the highest quality surgical care with advanced techniques and compassionate service.'
    },
    {
      icon: '👥',
      title: 'Patient-Centered',
      text: 'Our approach focuses on your individual needs, ensuring personalized treatment plans and comprehensive support.'
    },
    {
      icon: '🔬',
      title: 'Advanced Technology',
      text: 'Utilizing state-of-the-art surgical equipment and minimally invasive techniques for better outcomes.'
    },
    {
      icon: '🎓',
      title: 'Expert Team',
      text: 'Led by Dr. Vilakazi with extensive training and experience in general and minimally invasive surgery.'
    },
    {
      icon: '🏥',
      title: 'Modern Facility',
      text: 'Equipped with the latest medical technology in a comfortable, professional environment for your care.'
    },
    {
      icon: '⚡',
      title: 'Emergency Ready',
      text: '24/7 emergency surgical services available when you need urgent medical attention.'
    }
  ];

  const timeline = [
    {
      year: '2010',
      title: 'Practice Founded',
      description: 'Dr. Vilakazi established the practice with a vision for exceptional surgical care in Johannesburg.'
    },
    {
      year: '2015',
      title: 'Facility Expansion',
      description: 'Expanded our surgical center with state-of-the-art operating rooms and recovery facilities.'
    },
    {
      year: '2018',
      title: 'Minimally Invasive Program',
      description: 'Launched advanced laparoscopic and robotic surgery programs for faster patient recovery.'
    },
    {
      year: '2020',
      title: 'Emergency Services Enhancement',
      description: 'Established 24/7 emergency surgical care unit to serve the community better.'
    },
    {
      year: '2023',
      title: 'Technology Integration',
      description: 'Implemented cutting-edge surgical technology and electronic health records for improved patient care.'
    }
  ];

  return (
    <div className={styles.about}>
      <div className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>About Dr. Vilakazi Surgery</h1>
          <p className={styles.heroSubtitle}>
            Excellence in surgical care delivered with compassion, integrity, and commitment to patient well-being
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.sectionText}>
              At Dr. Vilakazi Surgery, we are dedicated to providing exceptional surgical care that combines
              medical excellence with genuine compassion for our patients. Our mission is to improve lives through
              advanced surgical techniques, personalized treatment plans, and unwavering commitment to patient safety
              and comfort.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Why Choose Us</h2>
            <div className={styles.features}>
              {features.map((feature, index) => (
                <div key={index} className={styles.feature}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureText}>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Journey</h2>
            <div className={styles.timeline}>
              {timeline.map((item, index) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineDate}>{item.year}</div>
                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                    <p className={styles.timelineText}>{item.description}</p>
                  </div>
                  <div className={styles.timelineDot}></div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>Ready to Experience Exceptional Surgical Care?</h2>
            <p className={styles.ctaText}>
              Join the many patients who have trusted us with their surgical needs.
              Our team is here to provide you with the highest quality care in a comfortable, professional environment.
            </p>
            <Link to="/contact">
              <Button variant="primary" size="large">
                Schedule a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;