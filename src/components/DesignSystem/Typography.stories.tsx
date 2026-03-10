import type { Meta, StoryObj } from '@storybook/react';
import styles from './Typography.module.css';

/**
 * Componente para exibir escala tipográfica
 */
const TypographyScale = ({ 
  theme 
}: { 
  theme: 'classic' | 'zapi' | 'hybrid' 
}) => {
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
const FontWeights = ({ 
  theme 
}: { 
  theme: 'classic' | 'zapi' | 'hybrid' 
}) => {
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

const meta: Meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sistema tipográfico do design system híbrido. Compare escalas e pesos de fonte entre temas.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TypographyComparison: Story = {
  render: () => (
    <div className={styles.comparisonContainer}>
      <TypographyScale theme="classic" />
      <TypographyScale theme="zapi" />
    </div>
  ),
};

export const FontWeightsComparison: Story = {
  render: () => (
    <div className={styles.comparisonContainer}>
      <FontWeights theme="classic" />
      <FontWeights theme="zapi" />
    </div>
  ),
};

export const ClassicTypography: Story = {
  render: () => <TypographyScale theme="classic" />,
};

export const ZAPITypography: Story = {
  render: () => <TypographyScale theme="zapi" />,
};

