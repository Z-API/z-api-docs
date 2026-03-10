import Link from '@docusaurus/Link';
import AnimatedIcon from '@site/src/components/shared/Icon/AnimatedIcon';
import { useRippleEffect } from '@site/src/hooks/useRippleEffect';
import type { CardItem, Theme } from '@site/src/types';
import { createAccessibleVariants, hoverElevationVariants } from '@site/src/utils/animations';
import { DEFAULT_CARD_LINK_TEXT } from '@site/src/utils/cardConstants';
import { CARD_ICON_SIZE } from '@site/src/utils/iconSizes';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { memo, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Props do componente Card
 */
type CardProps = {
  /** Dados do card a ser exibido */
  card: CardItem;
  /** Classe CSS adicional para customização */
  className?: string;
  /** Texto do link (padrão: usa DEFAULT_CARD_LINK_TEXT) */
  linkText?: string;
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
};

/**
 * Componente Card reutilizável para exibir cards clicáveis.
 * 
 * Este componente renderiza um card clicável com título, descrição e link.
 * Inclui efeito ripple no click e animações de hover melhoradas.
 * É usado em DeveloperHub e LearningResources para manter consistência visual.
 * 
 * @param props - Props do componente Card
 * @param props.card - Dados do card (título, descrição, link)
 * @param props.className - Classe CSS opcional para customização
 * @param props.linkText - Texto do link (padrão: DEFAULT_CARD_LINK_TEXT)
 * @returns Componente React renderizado
 * 
 * @example
 * ```tsx
 * <Card 
 *   card={{
 *     title: 'Título do Card',
 *     description: 'Descrição do card',
 *     link: '/docs/intro'
 *   }}
 *   linkText="Acessar →"
 * />
 * ```
 */
/**
 * Componente Card memoizado para evitar re-renders desnecessários
 * Re-renderiza apenas quando props mudam
 */
const Card = memo(function Card({ card, className, linkText = DEFAULT_CARD_LINK_TEXT, theme = 'classic' }: CardProps): ReactNode {
  // Hook customizado para ripple effect usando React state
  const [ripples, handleRippleClick] = useRippleEffect();

  const variants = createAccessibleVariants(hoverElevationVariants);

  return (
    <motion.div
      variants={variants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={styles.cardWrapper}>
      <Link
        to={card.link}
        className={clsx('card', 'has-ripple', styles.card, className)}
        data-theme={theme}
        aria-label={`${card.title} - ${card.description}`}
        onClick={handleRippleClick}>
        {/* Renderizar ripples usando React state */}
        {ripples.map((ripple) => (
          <span
            key={`ripple-${ripple.id}`}
            className={styles.ripple}
            style={{
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
            }}
          />
        ))}
        {card.icon && (
          <div className={styles.cardIcon}>
            <AnimatedIcon icon={card.icon} size={CARD_ICON_SIZE} animation="hover" />
          </div>
        )}
        <Heading as="h3" className={styles.cardTitle}>
          {card.title}
        </Heading>
        <p className={clsx(styles.cardDescription, 'text-large')}>{card.description}</p>
        <span className={styles.cardLink}>{linkText}</span>
      </Link>
    </motion.div>
  );
});

// Exportar também Card Compound Pattern
export { default as CardCompound } from './CardCompound';

export default Card;

