import Link from '@docusaurus/Link';
import { useRippleEffect } from '@site/src/hooks/useRippleEffect';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { memo } from 'react';

import styles from './styles.module.css';

export interface ProductCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  linkLabel: string;
  className?: string;
}

/**
 * Card inspirado no WhatsApp Business Developer Hub.
 * Pode ser reutilizado em grids de produtos/APIs.
 * 
 * Inclui:
 * - Animações de entrada com stagger
 * - Ripple effect no clique
 * - Otimização de performance com will-change
 * - Suporte a prefers-reduced-motion
 * 
 * Memoizado para evitar re-renders desnecessários.
 */
export const ProductCard = memo(function ProductCard({
  icon: Icon,
  title,
  description,
  link,
  linkLabel,
  className,
}: ProductCardProps) {
  // Hook para ripple effect com suporte a prefers-reduced-motion
  const [ripples, handleRippleClick] = useRippleEffect();

  return (
    <article 
      className={clsx(styles.card, className)}
      onClick={handleRippleClick}
      role="article"
      aria-label={`${title} - ${description}`}>
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
      <div className={styles.header}>
        <div className={styles.iconBadge} aria-hidden="true">
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={clsx(styles.description, 'text-large')}>{description}</p>
      <Link 
        to={link} 
        className={styles.cta} 
        aria-label={`${linkLabel} - ${title}: ${description}`}>
        <strong className="text--success">
          {linkLabel}
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </strong>
      </Link>
    </article>
  );
});


