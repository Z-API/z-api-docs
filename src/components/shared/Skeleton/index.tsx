/**
 * Componente Skeleton - Loading state com skeleton screen
 * 
 * Fornece feedback visual durante carregamento usando skeleton screens.
 * Melhora percepção de performance e UX.
 */

import clsx from 'clsx';
import { type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Props do componente Skeleton
 */
type SkeletonProps = {
  /** Largura do skeleton (ex: '100%', '200px', '50%') */
  width?: string | number;
  /** Altura do skeleton (ex: '20px', '1em', 24) */
  height?: string | number;
  /** Variante do skeleton */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  /** Número de linhas (para variant='text') */
  lines?: number;
  /** Classe CSS adicional */
  className?: string;
  /** Se deve animar (padrão: true) */
  animated?: boolean;
};

/**
 * Componente Skeleton - Loading state com skeleton screen
 * 
 * @param props - Props do componente Skeleton
 * @returns Componente React do skeleton
 * 
 * @example
 * ```tsx
 * // Skeleton de texto
 * <Skeleton variant="text" lines={3} />
 * 
 * // Skeleton circular (avatar)
 * <Skeleton variant="circular" width={48} height={48} />
 * 
 * // Skeleton retangular
 * <Skeleton variant="rectangular" width="100%" height={200} />
 * ```
 */
export default function Skeleton({
  width,
  height,
  variant = 'text',
  lines = 1,
  className,
  animated = true,
}: SkeletonProps): ReactNode {
  const style: React.CSSProperties = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={clsx(styles.skeletonContainer, className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={clsx(
              styles.skeleton,
              styles.skeletonText,
              animated && styles.animated,
              className
            )}
            style={{
              ...style,
              width: index === lines - 1 ? '80%' : '100%', // Última linha menor
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        styles.skeleton,
        styles[`skeleton${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
        animated && styles.animated,
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
}

/**
 * SkeletonCard - Skeleton para cards
 */
type SkeletonCardProps = {
  /** Se deve mostrar avatar */
  showAvatar?: boolean;
  /** Número de linhas de texto */
  lines?: number;
  /** Classe CSS adicional */
  className?: string;
};

export function SkeletonCard({ showAvatar = false, lines = 3, className }: SkeletonCardProps): ReactNode {
  return (
    <div className={clsx(styles.skeletonCard, className)}>
      {showAvatar && (
        <Skeleton variant="circular" width={48} height={48} className={styles.skeletonAvatar} />
      )}
      <div className={styles.skeletonCardContent}>
        <Skeleton variant="text" width="60%" height="1.5em" className={styles.skeletonTitle} />
        <Skeleton variant="text" lines={lines} />
      </div>
    </div>
  );
}
