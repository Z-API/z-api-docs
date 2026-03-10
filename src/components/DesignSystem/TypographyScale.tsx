import React from 'react';
import styles from './Typography.module.css';

export interface TypographyScaleProps {
  theme: 'classic' | 'zapi' | 'hybrid';
}

/**
 * Componente para exibir escala tipográfica
 */
export const TypographyScale: React.FC<TypographyScaleProps> = ({ theme }) => {
  const fontSizes = [
    { name: 'XS', size: '0.75rem', line: '12px' },
    { name: 'SM', size: '0.875rem', line: '14px' },
    { name: 'Base', size: '1rem', line: '16px' },
    { name: 'LG', size: '1.125rem', line: '18px' },
    { name: 'XL', size: '1.25rem', line: '20px' },
    { name: '2XL', size: '1.5rem', line: '24px' },
    { name: '3XL', size: '2rem', line: '32px' },
    { name: '4XL', size: '2.5rem', line: '40px' },
    { name: '5XL', size: '3rem', line: '48px' },
  ];

  return (
    <div className={styles.typographyScale} data-theme={theme}>
      <h3 className={styles.scaleTitle}>{theme.toUpperCase()} Typography Scale</h3>
      <div className={styles.scaleGrid}>
        {fontSizes.map((item) => (
          <div key={item.name} className={styles.scaleItem}>
            <div className={styles.scaleLabel}>{item.name}</div>
            <div 
              className={styles.scaleText}
              style={{ 
                fontSize: item.size,
                fontFamily: theme === 'zapi' ? 'var(--zapi-font-family-base)' : 'var(--font-family-base)'
              }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
            <div className={styles.scaleInfo}>
              <span>{item.size}</span>
              <span>{item.line}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Componente para exibir pesos de fonte
 */
export const FontWeights: React.FC<TypographyScaleProps> = ({ theme }) => {
  const weights = [
    { name: 'Light', weight: '300' },
    { name: 'Normal', weight: '400' },
    { name: 'Medium', weight: '500' },
    { name: 'Semibold', weight: '600' },
    { name: 'Bold', weight: '700' },
  ];

  return (
    <div className={styles.fontWeights} data-theme={theme}>
      <h3 className={styles.scaleTitle}>{theme.toUpperCase()} Font Weights</h3>
      <div className={styles.weightsGrid}>
        {weights.map((item) => (
          <div key={item.name} className={styles.weightItem}>
            <div className={styles.weightLabel}>{item.name}</div>
            <div 
              className={styles.weightText}
              style={{ 
                fontWeight: item.weight,
                fontFamily: theme === 'zapi' ? 'var(--zapi-font-family-base)' : 'var(--font-family-base)'
              }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
            <div className={styles.weightValue}>{item.weight}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

