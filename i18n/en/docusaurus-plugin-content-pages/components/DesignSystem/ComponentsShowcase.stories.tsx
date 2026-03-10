import type { CardItem } from '@site/src/types';
import type { Meta, StoryObj } from '@storybook/react';
import styles from './ComponentsShowcase.module.css';

/**
 * Card de exemplo para showcase
 */
const exampleCard: CardItem = {
  title: 'Documentação Completa',
  description: 'Explore todas as funcionalidades do Z-API com exemplos práticos e guias detalhados.',
  link: '/docs/intro',
};

const meta: Meta = {
  title: 'Design System/Components Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Showcase completo de componentes com suporte a múltiplos temas. Veja como os componentes se adaptam a cada identidade visual.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Showcase de Cards com diferentes temas
 */
export const CardsShowcase: Story = {
  render: () => (
    <div className={styles.showcaseContainer}>
      <div className={styles.showcaseSection} data-theme="classic">
        <h3 className={styles.sectionTitle}>Classic Theme</h3>
        <div className={styles.cardsGrid}>
          <div className="card">
            <h4 className={styles.cardTitle}>{exampleCard.title}</h4>
            <p className={styles.cardDescription}>{exampleCard.description}</p>
            <a href={exampleCard.link} className={styles.cardLink}>
              Saiba mais →
            </a>
          </div>
          <div className="card">
            <h4 className={styles.cardTitle}>{exampleCard.title}</h4>
            <p className={styles.cardDescription}>{exampleCard.description}</p>
            <a href={exampleCard.link} className={styles.cardLink}>
              Saiba mais →
            </a>
          </div>
          <div className="card">
            <h4 className={styles.cardTitle}>{exampleCard.title}</h4>
            <p className={styles.cardDescription}>{exampleCard.description}</p>
            <a href={exampleCard.link} className={styles.cardLink}>
              Saiba mais →
            </a>
          </div>
        </div>
      </div>

      <div className={styles.showcaseSection} data-theme="zapi">
        <h3 className={styles.sectionTitle}>Z-API Theme</h3>
        <div className={styles.cardsGrid}>
          <div className="zapi-card">
            <h4 className={styles.cardTitle}>{exampleCard.title}</h4>
            <p className={styles.cardDescription}>{exampleCard.description}</p>
            <a href={exampleCard.link} className={styles.cardLink}>
              Saiba mais →
            </a>
          </div>
          <div className="zapi-card">
            <h4 className={styles.cardTitle}>{exampleCard.title}</h4>
            <p className={styles.cardDescription}>{exampleCard.description}</p>
            <a href={exampleCard.link} className={styles.cardLink}>
              Saiba mais →
            </a>
          </div>
          <div className="zapi-card">
            <h4 className={styles.cardTitle}>{exampleCard.title}</h4>
            <p className={styles.cardDescription}>{exampleCard.description}</p>
            <a href={exampleCard.link} className={styles.cardLink}>
              Saiba mais →
            </a>
          </div>
        </div>
      </div>

      <div className={styles.showcaseSection} data-theme="hybrid">
        <h3 className={styles.sectionTitle}>Hybrid Theme</h3>
        <div className={styles.cardsGrid}>
          <div className="hybrid-card">
            <h4 className={styles.cardTitle}>{exampleCard.title}</h4>
            <p className={styles.cardDescription}>{exampleCard.description}</p>
            <a href={exampleCard.link} className={styles.cardLink}>
              Saiba mais →
            </a>
          </div>
          <div className="hybrid-card">
            <h4 className={styles.cardTitle}>{exampleCard.title}</h4>
            <p className={styles.cardDescription}>{exampleCard.description}</p>
            <a href={exampleCard.link} className={styles.cardLink}>
              Saiba mais →
            </a>
          </div>
          <div className="hybrid-card">
            <h4 className={styles.cardTitle}>{exampleCard.title}</h4>
            <p className={styles.cardDescription}>{exampleCard.description}</p>
            <a href={exampleCard.link} className={styles.cardLink}>
              Saiba mais →
            </a>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Showcase de Botões
 */
export const ButtonsShowcase: Story = {
  render: () => (
    <div className={styles.showcaseContainer}>
      <div className={styles.showcaseSection} data-theme="classic">
        <h3 className={styles.sectionTitle}>Classic Buttons</h3>
        <div className={styles.buttonsGrid}>
          <button className="button button--primary button--lg">Primary Button</button>
          <button className="button button--secondary button--lg">Secondary Button</button>
        </div>
      </div>

      <div className={styles.showcaseSection} data-theme="zapi">
        <h3 className={styles.sectionTitle}>Z-API Buttons</h3>
        <div className={styles.buttonsGrid}>
          <button className="zapi-button--primary">Primary Button</button>
          <button className="zapi-button--secondary">Secondary Button</button>
        </div>
      </div>
    </div>
  ),
};

/**
 * Showcase de Animações
 */
export const AnimationsShowcase: Story = {
  render: () => (
    <div className={styles.showcaseContainer}>
      <div className={styles.showcaseSection}>
        <h3 className={styles.sectionTitle}>Classic Animations</h3>
        <div className={styles.animationsGrid}>
          <div className="animate-fade-in">Fade In</div>
          <div className="animate-fade-in-up">Fade In Up</div>
          <div className="animate-scale-in">Scale In</div>
        </div>
      </div>

      <div className={styles.showcaseSection} data-theme="zapi">
        <h3 className={styles.sectionTitle}>Z-API Animations</h3>
        <div className={styles.animationsGrid}>
          <div className="animate-zapi-fade-in">Z-API Fade In</div>
          <div className="animate-zapi-slide-in-up">Z-API Slide In Up</div>
          <div className="animate-zapi-scale-in">Z-API Scale In</div>
        </div>
      </div>

      <div className={styles.showcaseSection} data-theme="hybrid">
        <h3 className={styles.sectionTitle}>Hybrid Animations</h3>
        <div className={styles.animationsGrid}>
          <div className="animate-hybrid-pulse">Hybrid Pulse</div>
          <div className="animate-hybrid-glow-pulse">Hybrid Glow Pulse</div>
        </div>
      </div>
    </div>
  ),
};

