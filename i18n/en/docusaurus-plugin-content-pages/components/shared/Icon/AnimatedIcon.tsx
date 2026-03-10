import { useIntersectionObserver } from '@site/src/hooks/useIntersectionObserver';
import { createAccessibleVariants, hoverVariants, rotateVariants } from '@site/src/utils/animations';
import clsx from 'clsx';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Tipos de animação disponíveis para ícones
 */
export type IconAnimationType = 'none' | 'hover' | 'rotate' | 'pulse' | 'bounce';

/**
 * Tamanhos disponíveis para ícones
 */
export type AnimatedIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props do componente AnimatedIcon
 */
export type AnimatedIconProps = {
  /** Componente de ícone do lucide-react */
  icon: LucideIcon;
  /** Tamanho do ícone (padrão: 'md') */
  size?: AnimatedIconSize;
  /** Tipo de animação (padrão: 'hover') */
  animation?: IconAnimationType;
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
  /** Props adicionais do motion.div */
  motionProps?: Omit<HTMLMotionProps<'div'>, 'children' | 'onClick'>;
};

/**
 * Mapeamento de tamanhos para valores numéricos (em pixels)
 */
const sizeMap: Record<AnimatedIconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

/**
 * Variantes de animação por tipo
 */
const getAnimationVariants = (type: IconAnimationType): Variants => {
  switch (type) {
    case 'hover':
      return hoverVariants;
    case 'rotate':
      return rotateVariants;
    case 'pulse':
      return {
        animate: {
          scale: [1, 1.1, 1],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        },
      };
    case 'bounce':
      return {
        animate: {
          y: [0, -8, 0],
          transition: {
            duration: 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        },
      };
    case 'none':
    default:
      return {};
  }
};

/**
 * Componente AnimatedIcon - Ícone SVG animado com framer-motion e lucide-react.
 * 
 * Combina lucide-react para ícones SVG com framer-motion para animações suaves.
 * Respeita prefers-reduced-motion para acessibilidade.
 * 
 * @param props - Props do componente AnimatedIcon
 * @param props.icon - Componente de ícone do lucide-react
 * @param props.size - Tamanho do ícone (padrão: 'md')
 * @param props.animation - Tipo de animação (padrão: 'hover')
 * @param props.className - Classe CSS adicional
 * @param props.color - Cor do ícone
 * @param props.disabled - Se o ícone está desabilitado
 * @param props.clickable - Se o ícone é clicável
 * @param props.onClick - Callback quando ícone é clicado
 * @param props['aria-label'] - Aria label para acessibilidade
 * @param props.motionProps - Props adicionais do motion.div
 * @returns Componente React renderizado
 * 
 * @example
 * ```tsx
 * import { Zap } from 'lucide-react';
 * 
 * // Ícone com animação de hover
 * <AnimatedIcon icon={Zap} size="lg" animation="hover" />
 * 
 * // Ícone clicável com rotação
 * <AnimatedIcon 
 *   icon={Zap} 
 *   size="md" 
 *   animation="rotate"
 *   clickable
 *   onClick={() => {}}
 *   aria-label="Ativar"
 * />
 * 
 * // Ícone com pulso (loading)
 * <AnimatedIcon icon={Zap} animation="pulse" color="blue" />
 * ```
 */
export default function AnimatedIcon({
  icon: IconComponent,
  size = 'md',
  animation = 'hover',
  className,
  color,
  disabled = false,
  clickable = false,
  onClick,
  'aria-label': ariaLabel,
  motionProps,
}: AnimatedIconProps): ReactNode {
  const iconSize = sizeMap[size];
  const variants = createAccessibleVariants(getAnimationVariants(animation));

  // Usar IntersectionObserver para pausar animações infinitas quando não visíveis
  const isInfiniteAnimation = animation === 'pulse' || animation === 'bounce';
  const [iconRefRaw, isIntersecting] = useIntersectionObserver({
    threshold: 0,
    rootMargin: '50px',
    triggerOnce: false, // Observar continuamente para pausar/retomar
    disabled: !isInfiniteAnimation, // Apenas observar se for animação infinita
  });
  // Type cast seguro: HTMLElement é compatível com HTMLDivElement
  const iconRef = iconRefRaw as React.RefObject<HTMLDivElement>;

  const handleClick = () => {
    if (!disabled && clickable && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (clickable && !disabled && (e.key === 'Enter' || e.key === ' ')) {
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

  // Se animation é 'none', usar div normal ao invés de motion.div
  if (animation === 'none' && !clickable) {
    return (
      <span
        className={iconClasses}
        style={iconStyle}
        role="img"
        aria-label={ariaLabel || 'Ícone'}>
        <IconComponent size={iconSize} />
      </span>
    );
  }

  // Para animações infinitas, pausar quando não visível
  const shouldAnimate = isInfiniteAnimation && isIntersecting ? 'animate' : 'rest';

  return (
    <motion.div
      ref={iconRef}
      className={iconClasses}
      style={iconStyle}
      role={clickable ? 'button' : 'img'}
      tabIndex={clickable && !disabled ? 0 : undefined}
      onClick={clickable ? handleClick : undefined}
      onKeyDown={clickable ? handleKeyDown : undefined}
      aria-label={ariaLabel || (clickable ? 'Ícone clicável' : 'Ícone')}
      aria-disabled={disabled}
      variants={variants}
      initial="rest"
      whileHover={animation === 'hover' || animation === 'rotate' ? 'hover' : undefined}
      whileTap={clickable && (animation === 'hover' || animation === 'rotate') ? 'tap' : undefined}
      animate={shouldAnimate}
      {...motionProps}>
      <IconComponent size={iconSize} />
    </motion.div>
  );
}

