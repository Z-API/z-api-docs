import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

import type { ReactNode } from 'react';

/**
 * Variantes disponíveis para o badge
 */
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Tamanhos disponíveis para o badge
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Props do componente Badge
 */
type BadgeProps = {
  /** Texto ou conteúdo do badge */
  children: ReactNode;
  /** Variante do badge (primary, secondary, success, warning, error, info) */
  variant?: BadgeVariant;
  /** Tamanho do badge (sm, md, lg) */
  size?: BadgeSize;
  /** Se o badge é removível (mostra botão X) */
  removable?: boolean;
  /** Callback quando badge é removido */
  onRemove?: () => void;
  /** Classe CSS adicional */
  className?: string;
  /** Se o badge está desabilitado */
  disabled?: boolean;
  /** Ícone opcional (string ou ReactNode) */
  icon?: ReactNode;
};

/**
 * Componente Badge - Exibe tags, labels e indicadores.
 * 
 * Usado para destacar informações, status, categorias, etc.
 * Suporta múltiplas variantes de cor e tamanhos diferentes.
 * 
 * @param props - Props do componente Badge
 * @param props.children - Texto ou conteúdo do badge
 * @param props.variant - Variante do badge (padrão: 'primary')
 * @param props.size - Tamanho do badge (padrão: 'md')
 * @param props.removable - Se o badge é removível
 * @param props.onRemove - Callback quando badge é removido
 * @param props.className - Classe CSS adicional
 * @param props.disabled - Se o badge está desabilitado
 * @param props.icon - Ícone opcional
 * @returns Componente React renderizado
 * 
 * @example
 * ```tsx
 * // Badge simples
 * <Badge>Novo</Badge>
 * 
 * // Badge com variante
 * <Badge variant="success">Ativo</Badge>
 * 
 * // Badge removível
 * <Badge removable onRemove={() => {}}>
 *   Filtro
 * </Badge>
 * 
 * // Badge com ícone
 * <Badge icon={<Icon name="star" />}>Destaque</Badge>
 * ```
 */
export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  removable = false,
  onRemove,
  className,
  disabled = false,
  icon,
}: BadgeProps): ReactNode {
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onRemove && !disabled) {
      onRemove();
    }
  };

  return (
    <span
      className={clsx(
        styles.badge,
        styles[variant],
        styles[size],
        removable && styles.removable,
        disabled && styles.disabled,
        className
      )}
      role={removable ? 'button' : undefined}
      tabIndex={removable && !disabled ? 0 : undefined}
      aria-label={removable ? `Remover ${children}` : undefined}>
      {icon && <span className={styles.badgeIcon}>{icon}</span>}
      <span className={styles.badgeText}>{children}</span>
      {removable && (
        <button
          type="button"
          className={styles.removeButton}
          onClick={handleRemove}
          disabled={disabled}
          aria-label={`Remover ${children}`}
          tabIndex={-1}>
          <span aria-hidden="true">×</span>
        </button>
      )}
    </span>
  );
}

