import React from 'react';
import styles from './DesignSystem.module.css';

export interface ColorItem {
  name: string;
  value: string;
  description?: string;
}

export interface ColorPaletteProps {
  theme: 'classic' | 'zapi' | 'hybrid';
  colors: ColorItem[];
}

/**
 * Componente para exibir paleta de cores
 */
export const ColorPalette: React.FC<ColorPaletteProps> = ({ theme, colors }) => (
  <div className={styles.colorPalette} data-theme={theme}>
    <h3 className={styles.paletteTitle}>{theme.toUpperCase()} Colors</h3>
    <div className={styles.colorGrid}>
      {colors.map((color) => (
        <div key={color.name} className={styles.colorItem}>
          <div 
            className={styles.colorSwatch} 
            style={{ backgroundColor: color.value }}
            title={color.value}
            aria-label={`Color swatch: ${color.name} - ${color.value}`}
          />
          <div className={styles.colorInfo}>
            <div className={styles.colorName}>{color.name}</div>
            <div className={styles.colorValue}>{color.value}</div>
            {color.description && (
              <div className={styles.colorDescription}>{color.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export interface GradientItem {
  name: string;
  value: string;
  description?: string;
}

export interface GradientShowcaseProps {
  theme: 'classic' | 'zapi' | 'hybrid';
  gradients: GradientItem[];
}

/**
 * Componente para exibir gradientes
 */
export const GradientShowcase: React.FC<GradientShowcaseProps> = ({ theme, gradients }) => (
  <div className={styles.gradientShowcase} data-theme={theme}>
    <h3 className={styles.paletteTitle}>{theme.toUpperCase()} Gradients</h3>
    <div className={styles.gradientGrid}>
      {gradients.map((gradient) => (
        <div key={gradient.name} className={styles.gradientItem}>
          <div 
            className={styles.gradientSwatch}
            style={{ background: gradient.value }}
            aria-label={`Gradient: ${gradient.name}`}
          />
          <div className={styles.colorInfo}>
            <div className={styles.colorName}>{gradient.name}</div>
            {gradient.description && (
              <div className={styles.colorDescription}>{gradient.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

