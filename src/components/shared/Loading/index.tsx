import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Tamanhos disponíveis para o spinner
 */
export type LoadingSize = 'sm' | 'md' | 'lg';

/**
 * Variantes disponíveis para o spinner
 */
export type LoadingVariant = 'spinner' | 'dots' | 'pulse' | 'skeleton';

/**
 * Props do componente Loading
 */
type LoadingProps = {
  /** Tamanho do spinner (sm, md, lg) */
  size?: LoadingSize;
  /** Variante do loading (spinner, dots, pulse, skeleton) */
  variant?: LoadingVariant;
  /** Texto opcional exibido abaixo do spinner */
  text?: string;
  /** Se deve ocupar toda a tela (fullscreen) */
  fullscreen?: boolean;
  /** Classe CSS adicional */
  className?: string;
  /** Se está carregando (para skeleton) */
  isLoading?: boolean;
  /** Conteúdo a ser exibido quando não está carregando (para skeleton) */
  children?: ReactNode;
};

/**
 * Componente Loading - Spinner e estados de carregamento.
 * 
 * Suporta múltiplas variantes:
 * - spinner: Spinner circular animado
 * - dots: Três pontos animados
 * - pulse: Pulsação circular
 * - skeleton: Skeleton loader para conteúdo
 * 
 * @param props - Props do componente Loading
 * @param props.size - Tamanho do spinner (padrão: 'md')
 * @param props.variant - Variante do loading (padrão: 'spinner')
 * @param props.text - Texto opcional abaixo do spinner
 * @param props.fullscreen - Se deve ocupar toda a tela
 * @param props.className - Classe CSS adicional
 * @param props.isLoading - Se está carregando (para skeleton)
 * @param props.children - Conteúdo quando não está carregando (para skeleton)
 * @returns Componente React renderizado
 * 
 * @example
 * ```tsx
 * // Spinner simples
 * <Loading />
 * 
 * // Spinner com texto
 * <Loading text="Carregando..." />
 * 
 * // Spinner fullscreen
 * <Loading fullscreen text="Carregando página..." />
 * 
 * // Skeleton loader
 * <Loading variant="skeleton" isLoading={loading}>
 *   <div>Conteúdo carregado</div>
 * </Loading>
 * ```
 */
export default function Loading({
  size = 'md',
  variant = 'spinner',
  text,
  fullscreen = false,
  className,
  isLoading = true,
  children,
}: LoadingProps): ReactNode {
  // Skeleton variant mostra conteúdo ou skeleton
  if (variant === 'skeleton') {
    if (!isLoading && children) {
      return <>{children}</>;
    }
    
    return (
      <div className={clsx(styles.skeletonContainer, className)}>
        <div className={styles.skeletonCard}>
          <div className={clsx(styles.skeleton, styles.skeletonTitle)} />
          <div className={clsx(styles.skeleton, styles.skeletonText)} />
          <div className={clsx(styles.skeleton, styles.skeletonText)} />
          <div className={clsx(styles.skeleton, styles.skeletonText)} style={{ width: '60%' }} />
        </div>
      </div>
    );
  }

  const containerClasses = clsx(
    styles.loadingContainer,
    fullscreen && styles.fullscreen,
    className
  );

  return (
    <div className={containerClasses} role="status" aria-live="polite" aria-label={text || 'Carregando'}>
      <div className={clsx(styles.loader, styles[variant], styles[size])}>
        {variant === 'spinner' && (
          <div className={styles.spinner}>
            <div className={styles.spinnerCircle} />
          </div>
        )}
        {variant === 'dots' && (
          <div className={styles.dots}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        )}
        {variant === 'pulse' && (
          <div className={styles.pulse}>
            <div className={styles.pulseCircle} />
          </div>
        )}
      </div>
      {text && <p className={styles.loadingText}>{text}</p>}
    </div>
  );
}

