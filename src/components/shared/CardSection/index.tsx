import Card from '@site/src/components/shared/Card';
import { useIntersectionObserver } from '@site/src/hooks/useIntersectionObserver';
import type { CardItem, Theme } from '@site/src/types';
import { CARD_LINK_TEXTS } from '@site/src/utils/cardConstants';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Props do componente CardSection
 */
type CardSectionProps = {
  /** Título da seção */
  title: string;
  /** Subtítulo/descrição da seção */
  subtitle?: string;
  /** Lista de cards a serem exibidos */
  cards: CardItem[];
  /** Texto do link dos cards (padrão: 'Acessar') */
  linkText?: string;
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
  /** Aria label para acessibilidade */
  'aria-label'?: string;
  /** Classe CSS adicional */
  className?: string;
};

/**
 * Componente CardSection - Seção genérica de cards reutilizável.
 * 
 * Componente genérico que exibe uma seção com título, subtítulo opcional
 * e uma grid de cards. Usado para evitar duplicação de código entre
 * DeveloperHub e LearningResources.
 * 
 * @param props - Props do componente CardSection
 * @param props.title - Título da seção
 * @param props.subtitle - Subtítulo/descrição da seção (opcional)
 * @param props.cards - Lista de cards a serem exibidos
 * @param props.linkText - Texto do link dos cards (padrão: 'Acessar')
 * @param props.theme - Tema do design system (padrão: 'classic')
 * @param props['aria-label'] - Aria label para acessibilidade
 * @param props.className - Classe CSS adicional
 * @returns Componente React da seção de cards
 * 
 * @example
 * ```tsx
 * <CardSection
 *   title="Central do Desenvolvedor"
 *   subtitle="Documentação e recursos"
 *   cards={hubCards}
 *   linkText="Saiba mais"
 *   aria-label="Central do Desenvolvedor"
 * />
 * ```
 */
export default function CardSection({
  title,
  subtitle,
  cards,
  linkText = CARD_LINK_TEXTS.ACCESS,
  theme = 'classic',
  'aria-label': ariaLabel,
  className,
}: CardSectionProps): ReactNode {
  const [sectionRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
  });

  return (
    <section
      ref={sectionRef}
      className={clsx(styles.cardSection, className)}
      data-theme={theme}
      aria-label={ariaLabel || title}>
      <div className="container">
        {subtitle ? (
          <div className={clsx(styles.header, isIntersecting && styles.visible)}>
            <Heading as="h2" className={styles.title}>
              {title}
            </Heading>
            <p className={clsx(styles.subtitle, 'text-large')}>{subtitle}</p>
          </div>
        ) : (
          <Heading
            as="h2"
            className={clsx(styles.title, styles.titleOnly, isIntersecting && styles.visible)}>
            {title}
          </Heading>
        )}
        <div className={styles.cardsGrid}>
          {cards.map((card, index) => (
            <div
              key={card.link}
              className={clsx('stagger-item', isIntersecting && styles.visible)}
              style={{ animationDelay: `${index * 100}ms` }}>
              <Card card={card} linkText={linkText} theme={theme} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

