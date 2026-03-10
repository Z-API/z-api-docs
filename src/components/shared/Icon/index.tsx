import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Tamanhos disponíveis para ícones
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props do componente Icon
 */
type IconProps = {
  /** Nome do ícone ou componente SVG */
  name?: string;
  /** Componente SVG customizado */
  svg?: ReactNode;
  /** Tamanho do ícone (xs, sm, md, lg, xl) */
  size?: IconSize;
  /** Classe CSS adicional */
  className?: string;
  /** Cor do ícone (CSS color value) */
  color?: string;
  /** Se o ícone está desabilitado */
  disabled?: boolean;
  /** Se o ícone é clicável */
  clickable?: boolean;
  /** Callback quando ícone é clicado */
  onClick?: () => void;
  /** Aria label para acessibilidade */
  'aria-label'?: string;
};

/**
 * Componente Icon - Wrapper para ícones SVG.
 * 
 * Componente wrapper para ícones que pode ser usado com qualquer
 * biblioteca de ícones (React Icons, Heroicons, etc.) ou SVGs customizados.
 * 
 * @param props - Props do componente Icon
 * @param props.name - Nome do ícone (para uso futuro com icon library)
 * @param props.svg - Componente SVG customizado
 * @param props.size - Tamanho do ícone (padrão: 'md')
 * @param props.className - Classe CSS adicional
 * @param props.color - Cor do ícone
 * @param props.disabled - Se o ícone está desabilitado
 * @param props.clickable - Se o ícone é clicável
 * @param props.onClick - Callback quando ícone é clicado
 * @param props['aria-label'] - Aria label para acessibilidade
 * @returns Componente React renderizado
 * 
 * @example
 * ```tsx
 * // Ícone com SVG customizado
 * <Icon svg={<svg>...</svg>} size="lg" />
 * 
 * // Ícone clicável
 * <Icon 
 *   svg={<CloseIcon />} 
 *   clickable 
 *   onClick={() => {}}
 *   aria-label="Fechar"
 * />
 * 
 * // Ícone com cor customizada
 * <Icon svg={<StarIcon />} color="gold" size="xl" />
 * ```
 */
export default function Icon({
  name,
  svg,
  size = 'md',
  className,
  color,
  disabled = false,
  clickable = false,
  onClick,
  'aria-label': ariaLabel,
}: IconProps): ReactNode {
  if (!svg && !name) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('Icon component requires either "svg" or "name" prop');
    }
    return null;
  }

  const handleClick = () => {
    if (!disabled && clickable && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  };

  const iconClasses = clsx(
    styles.icon,
    styles[size],
    clickable && styles.clickable,
    disabled && styles.disabled,
    className
  );

  const iconStyle = color ? { color } : undefined;

  // Se SVG foi fornecido, renderizar diretamente
  if (svg) {
    return (
      <span
        className={iconClasses}
        style={iconStyle}
        role={clickable ? 'button' : 'img'}
        tabIndex={clickable && !disabled ? 0 : undefined}
        onClick={clickable ? handleClick : undefined}
        onKeyDown={clickable ? handleKeyDown : undefined}
        aria-label={ariaLabel || (clickable ? 'Ícone clicável' : undefined)}
        aria-disabled={disabled}>
        {svg}
      </span>
    );
  }

  // Placeholder para quando icon library for implementada
  return (
    <span
      className={iconClasses}
      style={iconStyle}
      role="img"
      aria-label={ariaLabel || name || 'Ícone'}>
      {/* Placeholder - será substituído quando icon library for adicionada */}
      <span className={styles.placeholder}>Icon</span>
    </span>
  );
}

