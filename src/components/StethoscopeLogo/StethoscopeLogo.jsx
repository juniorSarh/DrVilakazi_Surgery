import React from 'react';
import styles from './StethoscopeLogo.module.css';

const StethoscopeLogo = ({ width = 40, height = 40, className = '' }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 100" 
      className={`${styles.logo} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stethoscope tubing - main red color */}
      <path 
        d="M30 25 C30 15, 40 10, 50 10 C60 10, 70 15, 70 25 L70 45 C70 65, 55 80, 40 80 C25 80, 10 65, 10 45 L10 35"
        stroke="#dc2626" 
        strokeWidth="3" 
        fill="none"
      />
      
      {/* Ear pieces - silver/gray */}
      <circle cx="25" cy="25" r="4" fill="#9ca3af" />
      <circle cx="75" cy="25" r="4" fill="#9ca3af" />
      
      {/* Chest piece - red and silver */}
      <circle cx="40" cy="80" r="8" fill="#dc2626" />
      <circle cx="40" cy="80" r="5" fill="#9ca3af" />
      
      {/* Diaphragm detail */}
      <circle cx="40" cy="80" r="2" fill="#6b7280" />
      
      {/* Tubing connections */}
      <line x1="25" y1="25" x2="30" y2="25" stroke="#dc2626" strokeWidth="2" />
      <line x1="75" y1="25" x2="70" y2="25" stroke="#dc2626" strokeWidth="2" />
      
      {/* Small ECG line detail */}
      <polyline 
        points="15,50 20,50 22,45 24,55 26,40 28,60 30,50 35,50" 
        stroke="#dc2626" 
        strokeWidth="1.5" 
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
};

export default StethoscopeLogo;
