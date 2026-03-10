import type { Meta, StoryObj } from '@storybook/react';
import styles from './DesignSystem.module.css';

/**
 * Componente para exibir paleta de cores
 */
const ColorPalette = ({ 
  theme, 
  colors 
}: { 
  theme: 'classic' | 'zapi' | 'hybrid'; 
  colors: Array<{ name: string; value: string; description?: string }> 
}) => (
  <div className={styles.colorPalette} data-theme={theme}>
    <h3 className={styles.paletteTitle}>{theme.toUpperCase()} Colors</h3>
    <div className={styles.colorGrid}>
      {colors.map((color) => (
        <div key={color.name} className={styles.colorItem}>
          <div 
            className={styles.colorSwatch} 
            style={{ backgroundColor: color.value }}
            title={color.value}
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

/**
 * Componente para exibir gradientes
 */
const GradientShowcase = ({ 
  theme, 
  gradients 
}: { 
  theme: 'classic' | 'zapi' | 'hybrid'; 
  gradients: Array<{ name: string; value: string; description?: string }> 
}) => (
  <div className={styles.gradientShowcase} data-theme={theme}>
    <h3 className={styles.paletteTitle}>{theme.toUpperCase()} Gradients</h3>
    <div className={styles.gradientGrid}>
      {gradients.map((gradient) => (
        <div key={gradient.name} className={styles.gradientItem}>
          <div 
            className={styles.gradientSwatch} 
            style={{ background: gradient.value }}
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

const meta: Meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Paleta de cores do design system híbrido Z-API. Compare as cores de cada tema lado a lado.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Cores Classic (Z-API Classic)
 */
const classicColors = [
  { name: 'Z-API Green', value: '#25D366', description: 'Cor primária' },
  { name: 'Z-API Teal', value: '#128C7E', description: 'Cor secundária' },
  { name: 'Dark Teal', value: '#075E54', description: 'Cor escura' },
  { name: 'Light Green', value: '#DCF8C6', description: 'Cor clara' },
  { name: 'Accent Blue', value: '#34B7F1', description: 'Cor de destaque' },
];

/**
 * Cores Z-API
 */
const zapiColors = [
  { name: 'Z-API Primary', value: '#0066FF', description: 'Azul primário' },
  { name: 'Z-API Primary Dark', value: '#0052CC', description: 'Azul escuro' },
  { name: 'Z-API Primary Light', value: '#3385FF', description: 'Azul claro' },
  { name: 'Z-API Secondary', value: '#00D4AA', description: 'Verde-água' },
  { name: 'Z-API Accent', value: '#FF6B35', description: 'Laranja' },
];

/**
 * Gradientes Classic
 */
const classicGradients = [
  { 
    name: 'Hero Gradient', 
    value: 'linear-gradient(135deg, #25D366 0%, #128C7E 50%, #075E54 100%)',
    description: 'Gradiente para hero sections'
  },
  { 
    name: 'Card Gradient', 
    value: 'linear-gradient(90deg, #25D366, #128C7E)',
    description: 'Gradiente para cards'
  },
];

/**
 * Gradientes Z-API
 */
const zapiGradients = [
  { 
    name: 'Z-API Hero', 
    value: 'linear-gradient(135deg, #0066FF 0%, #0052CC 50%, #00D4AA 100%)',
    description: 'Gradiente hero Z-API'
  },
  { 
    name: 'Z-API Primary', 
    value: 'linear-gradient(135deg, #0066FF 0%, #00D4AA 100%)',
    description: 'Gradiente primário'
  },
];

/**
 * Gradientes Híbridos
 */
const hybridGradients = [
  { 
    name: 'Hybrid Hero', 
    value: 'linear-gradient(135deg, #25D366 0%, #0066FF 50%, #00D4AA 100%)',
    description: 'Combina Classic e Z-API'
  },
  { 
    name: 'Hybrid Card', 
    value: 'linear-gradient(90deg, #25D366, #0066FF)',
    description: 'Gradiente híbrido para cards'
  },
];

export const ColorsComparison: Story = {
  render: () => (
    <div className={styles.comparisonContainer}>
      <ColorPalette theme="classic" colors={classicColors} />
      <ColorPalette theme="zapi" colors={zapiColors} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparação lado a lado das paletas de cores Classic e Z-API.',
      },
    },
  },
};

export const GradientsShowcase: Story = {
  render: () => (
    <div className={styles.comparisonContainer}>
      <GradientShowcase theme="classic" gradients={classicGradients} />
      <GradientShowcase theme="zapi" gradients={zapiGradients} />
      <GradientShowcase theme="hybrid" gradients={hybridGradients} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase de gradientes de todos os temas disponíveis.',
      },
    },
  },
};

export const ClassicColors: Story = {
  render: () => <ColorPalette theme="classic" colors={classicColors} />,
};

export const ZAPIColors: Story = {
  render: () => <ColorPalette theme="zapi" colors={zapiColors} />,
};

