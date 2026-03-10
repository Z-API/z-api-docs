import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import styles from './ThemeSelector.module.css';

/**
 * Componente ThemeSelector para demonstrar troca de temas
 */
const ThemeSelector = ({ 
  themes = ['classic', 'zapi', 'hybrid'] 
}: { 
  themes?: Array<'classic' | 'zapi' | 'hybrid'> 
}) => {
  const [selectedTheme, setSelectedTheme] = useState<'classic' | 'zapi' | 'hybrid'>('classic');

  const themeLabels = {
    classic: 'Classic',
    zapi: 'Z-API',
    hybrid: 'Híbrido',
  };

  return (
    <div className={styles.themeSelectorContainer} data-theme={selectedTheme}>
      <div className={styles.selectorHeader}>
        <h3 className={styles.selectorTitle}>Selecione um Tema</h3>
        <div className={styles.selectorButtons}>
          {themes.map((theme) => (
            <button
              key={theme}
              className={`${styles.themeButton} ${selectedTheme === theme ? styles.active : ''}`}
              onClick={() => setSelectedTheme(theme)}
              aria-pressed={selectedTheme === theme}
            >
              {themeLabels[theme]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.themePreview}>
        <div className={styles.previewCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon} />
            <div>
              <h4 className={styles.cardTitle}>Card Example</h4>
              <p className={styles.cardSubtitle}>Demonstração de tema {themeLabels[selectedTheme]}</p>
            </div>
          </div>
          <p className={styles.cardDescription}>
            Este card demonstra como os componentes se adaptam ao tema selecionado.
            As cores, sombras e espaçamentos mudam dinamicamente.
          </p>
          <button className={styles.cardButton}>
            Ação Primária
          </button>
        </div>

        <div className={styles.colorPalette}>
          <div className={styles.paletteItem}>
            <div 
              className={styles.paletteSwatch}
              style={{ 
                backgroundColor: selectedTheme === 'classic' 
                  ? 'var(--zapi-green)' 
                  : selectedTheme === 'zapi'
                  ? 'var(--zapi-primary)'
                  : 'var(--zapi-green)'
              }}
            />
            <span>Primary</span>
          </div>
          <div className={styles.paletteItem}>
            <div 
              className={styles.paletteSwatch}
              style={{ 
                backgroundColor: selectedTheme === 'classic' 
                  ? 'var(--zapi-teal)' 
                  : selectedTheme === 'zapi'
                  ? 'var(--zapi-secondary)'
                  : 'var(--zapi-primary)'
              }}
            />
            <span>Secondary</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof ThemeSelector> = {
  title: 'Design System/Theme Selector',
  component: ThemeSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Seletor interativo de temas. Experimente trocar entre Classic, Z-API e Híbrido para ver as diferenças visuais.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeSelector>;

export const Default: Story = {
  render: () => <ThemeSelector />,
};

export const AllThemes: Story = {
  render: () => <ThemeSelector themes={['classic', 'zapi', 'hybrid']} />,
};

export const ClassicOnly: Story = {
  render: () => <ThemeSelector themes={['classic']} />,
};

export const ZAPIOnly: Story = {
  render: () => <ThemeSelector themes={['zapi']} />,
};

