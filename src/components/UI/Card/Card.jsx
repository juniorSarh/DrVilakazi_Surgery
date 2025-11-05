import React from 'react';
import styles from './Card.module.css';

const Card = ({
  children,
  image,
  title,
  description,
  icon,
  variant = 'default',
  className = '',
  onClick
}) => {
  const cardClass = [
    styles.card,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClass} onClick={onClick}>
      {image && (
        <img
          src={image}
          alt={title || 'Card image'}
          className={styles.cardImage}
        />
      )}

      <div className={styles.cardContent}>
        {icon && !image && <div className={styles.cardIcon}>{icon}</div>}

        {title && <h3 className={styles.cardTitle}>{title}</h3>}

        {description && <p className={styles.cardDescription}>{description}</p>}

        {children && (
          <div className={styles.cardFooter}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;