import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import styles from './Doctors.module.css';

const Doctors = () => {
  const doctors = [
    {
      name: 'Dr. Thando Vilakazi',
      title: 'Medical Director & General Surgeon',
      bio: 'Dr. Vilakazi is a board-certified general surgeon with over 15 years of experience in general and minimally invasive surgery. She is known for her compassionate approach and excellent surgical outcomes.',
      credentials: [
        'M.B. BCh. - University of the Witwatersrand',
        'FCS(SA) - College of Surgeons of South Africa',
        'MMed(Surg) - University of Cape Town',
        'Advanced Laparoscopic Surgery Training - USA'
      ],
      specialties: ['Minimally Invasive Surgery', 'Emergency Surgery', 'Endocrine Surgery', 'Breast Surgery']
    },
    {
      name: 'Dr. James Chen',
      title: 'General & Colorectal Surgeon',
      bio: 'Dr. Chen brings extensive experience in colorectal surgery and advanced laparoscopic procedures. He has a special interest in minimally invasive colorectal cancer surgery.',
      credentials: [
        'M.B. BCh. - University of Pretoria',
        'FCS(SA) - College of Surgeons of South Africa',
        'Colorectal Surgery Fellowship - Canada',
        'Robotic Surgery Certification'
      ],
      specialties: ['Colorectal Surgery', 'Laparoscopic Surgery', 'Colon Cancer Surgery', 'Inflammatory Bowel Disease']
    },
    {
      name: 'Dr. Sarah Moyo',
      title: 'General & Breast Surgeon',
      bio: 'Dr. Moyo specializes in breast surgery and oncoplastic techniques. She is dedicated to providing comprehensive breast care with excellent cosmetic outcomes.',
      credentials: [
        'M.B. BCh. - University of KwaZulu-Natal',
        'FCS(SA) - College of Surgeons of South Africa',
        'Breast Surgery Fellowship - UK',
        'Oncoplastic Surgery Training'
      ],
      specialties: ['Breast Cancer Surgery', 'Oncoplastic Surgery', 'Sentinel Node Biopsy', 'Benign Breast Conditions']
    }
  ];

  const testimonials = [
    {
      text: 'Dr. Vilakazi performed my gallbladder surgery with incredible skill and care. The minimally invasive approach meant I was back to normal within a week.',
      author: 'Maria S.',
      date: '2 months ago'
    },
    {
      text: 'I was nervous about my colon surgery, but Dr. Chen explained everything clearly and the outcome was excellent. The follow-up care was outstanding.',
      author: 'John K.',
      date: '4 months ago'
    },
    {
      text: 'Dr. Moyo treated my breast cancer with such compassion and expertise. She saved my life while ensuring the best possible cosmetic result.',
      author: 'Thandi P.',
      date: '6 months ago'
    },
    {
      text: 'The entire surgical team at Dr. Vilakazi Surgery is exceptional. From the initial consultation to post-operative care, I felt safe and well-cared for.',
      author: 'Robert L.',
      date: '1 year ago'
    },
    {
      text: 'Emergency surgery can be terrifying, but Dr. Vilakazi and her team were calm, professional, and incredibly skilled. I\'m grateful for their quick response.',
      author: 'Patricia M.',
      date: '8 months ago'
    },
    {
      text: 'The care I received exceeded all expectations. Dr. Chen took time to answer all my questions and the surgical outcome was better than I hoped for.',
      author: 'Michael R.',
      date: '3 months ago'
    }
  ];

  return (
    <div className={styles.doctors}>
      <div className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Meet Our Surgical Team</h1>
          <p className={styles.heroSubtitle}>
            Experienced, compassionate surgeons dedicated to providing exceptional surgical care
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.doctorsGrid}>
          {doctors.map((doctor, index) => (
            <div key={index} className={styles.doctorCard}>
              <div className={styles.doctorImage}>
                👨‍⚕️
              </div>
              <div className={styles.doctorContent}>
                <h2 className={styles.doctorName}>{doctor.name}</h2>
                <h3 className={styles.doctorTitle}>{doctor.title}</h3>
                <p className={styles.doctorBio}>{doctor.bio}</p>

                <div className={styles.doctorCredentials}>
                  <h4 className={styles.credentialTitle}>Credentials & Training</h4>
                  <ul className={styles.credentialList}>
                    {doctor.credentials.map((credential, credIndex) => (
                      <li key={credIndex} className={styles.credentialItem}>
                        {credential}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.doctorCredentials}>
                  <h4 className={styles.credentialTitle}>Areas of Expertise</h4>
                  <ul className={styles.credentialList}>
                    {doctor.specialties.map((specialty, specIndex) => (
                      <li key={specIndex} className={styles.credentialItem}>
                        {specialty}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <h3 className={styles.ctaTitle}>Schedule a Consultation</h3>
          <p className={styles.ctaText}>
            Meet with one of our experienced surgeons to discuss your surgical needs and treatment options
          </p>
          <Link to="/contact">
            <Button variant="primary" size="large">
              Book Consultation
            </Button>
          </Link>
        </div>
      </div>

      {/* <div className={styles.testimonials}>
        <div className="container">
          <h2 className={styles.testimonialsTitle}>Patient Experiences</h2>
          <p className={styles.testimonialsSubtitle}>
            Hear from our patients about their surgical experiences and outcomes
          </p>

          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <p className={styles.testimonialText}>{testimonial.text}</p>
                <div className={styles.testimonialAuthor}>{testimonial.author}</div>
                <div className={styles.testimonialDate}>{testimonial.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Doctors;