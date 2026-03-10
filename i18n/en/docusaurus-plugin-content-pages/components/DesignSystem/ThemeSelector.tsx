import React, { useState } from 'react';
import styles from './ThemeSelector.module.css';

export interface ThemeSelectorProps {
  themes?: Array<'classic' | 'zapi' | 'hybrid'>;
}

/**
 * Componente ThemeSelector para demonstrar troca de temas
 */
export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  themes = ['classic', 'zapi', 'hybrid'] 
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
        <div className={styles.selectorButtons} role="tablist" aria-label="Seletor de tema">
          {themes.map((theme) => (
            <button
              key={theme}
              className={`${styles.themeButton} ${selectedTheme === theme ? styles.active : ''}`}
              onClick={() => setSelectedTheme(theme)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedTheme(theme);
                }
              }}
              aria-selected={selectedTheme === theme}
              aria-label={`Selecionar tema ${themeLabels[theme]}`}
              role="tab"
            >
              {themeLabels[theme]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.themePreview}>
        <div className={styles.previewCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon} aria-hidden="true" />
            <div>
              <h4 className={styles.cardTitle}>Card Example</h4>
              <p className={styles.cardSubtitle}>Demonstração de tema {themeLabels[selectedTheme]}</p>
            </div>
          </div>
          <p className={styles.cardDescription}>
            Este card demonstra como os componentes se adaptam ao tema selecionado.
            As cores, sombras e espaçamentos mudam dinamicamente.
          </p>
          <button className={styles.cardButton} aria-label="Ação primária">
            Ação Primária
          </button>
        </div>

        <div className={styles.colorPalette} role="list" aria-label="Paleta de cores do tema">
          <div className={styles.paletteItem} role="listitem">
            <div 
              className={styles.paletteSwatch}
              style={{ 
                backgroundColor: selectedTheme === 'classic' 
                  ? 'var(--zapi-green)' 
                  : selectedTheme === 'zapi'
                  ? 'var(--zapi-primary)'
                  : 'var(--zapi-green)'
              }}
              aria-label="Cor primária"
            />
            <span>Primary</span>
          </div>
          <div className={styles.paletteItem} role="listitem">
            <div 
              className={styles.paletteSwatch}
              style={{ 
                backgroundColor: selectedTheme === 'classic' 
                  ? 'var(--zapi-teal)' 
                  : selectedTheme === 'zapi'
                  ? 'var(--zapi-secondary)'
                  : 'var(--zapi-primary)'
              }}
              aria-label="Cor secundária"
            />
            <span>Secondary</span>
          </div>
        </div>
      </div>
    </div>
  );
};

