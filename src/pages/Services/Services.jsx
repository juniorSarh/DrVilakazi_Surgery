import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import styles from './Services.module.css';

const Services = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const services = [
    {
      id: 'general-surgery',
      icon: '🏥',
      title: 'General Surgery',
      description: 'Comprehensive surgical procedures covering a wide range of conditions including abdominal surgery, hernia repairs, gallbladder surgery, and thyroid procedures. Our approach combines traditional surgical excellence with modern techniques to ensure optimal outcomes.',
      features: [
        'Minimally invasive approaches when possible',
        'Advanced pain management protocols',
        'Comprehensive pre-operative evaluation',
        'Personalized recovery plans',
        'Follow-up care coordination'
      ]
    },
    {
      id: 'minimally-invasive',
      icon: '🔬',
      title: 'Minimally Invasive Surgery',
      description: 'State-of-the-art laparoscopic and robotic surgical procedures that result in smaller incisions, less pain, faster recovery, and reduced scarring. Perfect for many abdominal and gynecological procedures.',
      features: [
        'Laparoscopic cholecystectomy',
        'Appendectomy',
        'Hernia repairs',
        'Diagnostic laparoscopy',
        'Robotic-assisted procedures'
      ]
    },
    {
      id: 'emergency-surgery',
      icon: '🚑',
      title: 'Emergency Surgery',
      description: '24/7 emergency surgical services for acute conditions including trauma, appendicitis, bowel obstructions, and other urgent surgical needs. Our emergency team is always ready to provide immediate surgical care.',
      features: [
        '24/7 emergency response',
        'Trauma surgery capabilities',
        'Acute abdominal emergencies',
        'Emergency hernia repairs',
        'Rapid assessment and intervention'
      ]
    },
    {
      id: 'endocrine-surgery',
      icon: '⚕️',
      title: 'Endocrine Surgery',
      description: 'Specialized surgical treatment of endocrine disorders including thyroid, parathyroid, and adrenal gland conditions. Performed with precision to preserve function while treating pathology.',
      features: [
        'Thyroidectomy and lobectomy',
        'Parathyroid surgery',
        'Adrenal gland procedures',
        'Minimally invasive techniques',
        'Hormone function preservation'
      ]
    },
    {
      id: 'breast-surgery',
      icon: '🩺',
      title: 'Breast Surgery',
      description: 'Comprehensive breast surgery services including lumpectomies, mastectomies, and sentinel lymph node biopsies. Performed with sensitivity and attention to cosmetic outcomes.',
      features: [
        'Lumpectomy and breast conservation',
        'Mastectomy procedures',
        'Sentinel lymph node biopsy',
        'Breast reconstruction coordination',
        'Benign breast condition treatment'
      ]
    },
    {
      id: 'colon-rectal',
      icon: '🫃',
      title: 'Colon & Rectal Surgery',
      description: 'Advanced surgical treatment of colorectal conditions including cancer, inflammatory bowel disease, and benign disorders. Emphasizing function preservation and quality of life.',
      features: [
        'Colon cancer surgery',
        'Inflammatory bowel disease surgery',
        'Diverticulitis treatment',
        'Hemorrhoid procedures',
        'Anal fissure and fistula repair'
      ]
    }
  ];

  const preparationSteps = [
    {
      icon: '📋',
      text: 'Pre-operative assessment and medical clearance'
    },
    {
      icon: '🏥',
      text: 'Hospital admission and preparation'
    },
    {
      icon: '💉',
      text: 'Anesthesia consultation and planning'
    },
    {
      icon: '🍽️',
      text: 'Fasting and medication guidelines'
    },
    {
      icon: '👨‍⚕️',
      text: 'Surgical team briefing and safety checks'
    },
    {
      icon: '🏠',
      text: 'Post-operative care planning'
    }
  ];

  const faqs = [
    {
      question: 'How long does recovery typically take?',
      answer: 'Recovery time varies depending on the type of surgery. Minimally invasive procedures may require 1-2 weeks, while major surgeries may need 4-6 weeks. We provide personalized recovery timelines during your consultation.'
    },
    {
      question: 'What should I bring to the hospital?',
      answer: 'Bring comfortable clothing, personal toiletries, insurance information, list of medications, and any advance directives. Leave valuables at home. We provide a detailed checklist before your admission.'
    },
    {
      question: 'Do you accept my insurance?',
      answer: 'We accept most major insurance plans. Please contact our office to verify your specific coverage and any pre-authorization requirements before your procedure.'
    },
    {
      question: 'Can someone stay with me?',
      answer: 'Visiting hours are typically 9 AM - 9 PM. For pediatric patients or special circumstances, arrangements can be made. One family member may be present during pre-operative preparation.'
    },
    {
      question: 'What about pain management?',
      answer: 'We use advanced pain management protocols including regional anesthesia, patient-controlled analgesia, and non-narcotic options to ensure comfort while minimizing side effects.'
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className={styles.services}>
      <div className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Our Surgical Services</h1>
          <p className={styles.heroSubtitle}>
            Comprehensive surgical care using advanced techniques and compassionate treatment
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.serviceSection}>
          <h2 className={styles.sectionTitle}>Specialized Surgical Care</h2>
          <p className={styles.sectionSubtitle}>
            We offer a full range of surgical services using the latest techniques and technology
          </p>

          {services.map((service) => (
            <div key={service.id} className={styles.serviceDetail}>
              <div>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.serviceFeatures}>
                  {service.features.map((feature, index) => (
                    <li key={index} className={styles.serviceFeature}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.preparation}>
          <h3 className={styles.preparationTitle}>Preparing for Your Surgery</h3>
          <p>
            Proper preparation is essential for a successful surgical outcome. Our team will guide you through each step of the process.
          </p>
          <div className={styles.preparationList}>
            {preparationSteps.map((step, index) => (
              <div key={index} className={styles.preparationItem}>
                <span className={styles.preparationIcon}>{step.icon}</span>
                <span className={styles.preparationText}>{step.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.insurance}>
          <h3 className={styles.insuranceTitle}>Insurance & Payment Options</h3>
          <p className={styles.insuranceText}>
            We work with most major insurance providers to ensure you have access to the surgical care you need.
            Our team can help verify your coverage and explain your financial responsibility.
          </p>
          <div className={styles.insuranceProviders}>
            <span className={styles.insuranceBadge}>Medical Aid</span>
            <span className={styles.insuranceBadge}>Discovery Health</span>
            <span className={styles.insuranceBadge}>Momentum</span>
            <span className={styles.insuranceBadge}>Bonitas</span>
            <span className={styles.insuranceBadge}>Self-Pay Options</span>
          </div>
        </div>

        <div className={styles.faq}>
          <h3 className={styles.faqTitle}>Frequently Asked Questions</h3>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div
                className={styles.faqQuestion}
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <span>{expandedFaq === index ? '−' : '+'}</span>
              </div>
              {expandedFaq === index && (
                <div className={styles.faqAnswer}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <h3 className={styles.ctaTitle}>Ready to Discuss Your Surgical Needs?</h3>
          <p className={styles.ctaText}>
            Schedule a consultation to learn more about how we can help you with your surgical care needs.
          </p>
          <Link to="/contact">
            <Button variant="primary" size="large">
              Book Consultation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;