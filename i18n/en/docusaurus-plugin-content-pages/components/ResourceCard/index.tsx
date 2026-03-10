import Badge from '@site/src/components/shared/Badge';
import { ImageWithFallback } from '@site/src/components/shared/ImageWithFallback';
import { useRippleEffect } from '@site/src/hooks/useRippleEffect';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import { memo } from 'react';

import styles from './styles.module.css';

export interface ResourceCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * ResourceCard com animações e microinterações.
 * 
 * Inclui:
 * - Animações de entrada com stagger
 * - Ripple effect no clique
 * - Otimização de performance com will-change
 * - Suporte a prefers-reduced-motion
 * 
 * Memoizado para evitar re-renders desnecessários.
 */
export const ResourceCard = memo(function ResourceCard({
  image,
  category,
  title,
  description,
  actionLabel = 'Ver recurso',
  onAction,
  className,
}: ResourceCardProps) {
  // Hook para ripple effect com suporte a prefers-reduced-motion
  const [ripples, handleRippleClick] = useRippleEffect();

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    handleRippleClick(e);
    onAction?.();
  };

  return (
    <article 
      className={clsx(styles.card, className)}
      onClick={handleCardClick}
      role="article"
      aria-label={`${category}: ${title} - ${description}`}>
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={styles.ripple}
          style={{
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
          aria-hidden="true"
        />
      ))}
      <div className={styles.imageWrapper}>
        <ImageWithFallback
          src={image}
          alt={`${category}: ${title} - ${description}`}
          className={styles.image}
          aspectRatio="16/9"
          loading="lazy"
          fetchPriority="low"
        />
        {/* Overlay da imagem no hover */}
        <div className={styles.imageOverlay} aria-hidden="true" />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.badgesContainer}>
          <Badge variant="success">{category}</Badge>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={clsx(styles.description, 'text-large')}>{description}</p>
        <button
          type="button"
          className={styles.cta}
          onClick={(e) => {
            e.stopPropagation();
            onAction?.();
          }}
          aria-label={`${actionLabel || 'Ver recurso'}: ${title} - ${description}`}>
          <strong className="text--success">
            {actionLabel}
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </strong>
        </button>
      </div>
    </article>
  );
});


