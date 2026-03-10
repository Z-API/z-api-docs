import AnimatedIcon, { type AnimatedIconSize } from '@site/src/components/shared/Icon/AnimatedIcon';
import { createAccessibleVariants, hoverVariants } from '@site/src/utils/animations';
import clsx from 'clsx';
import { motion, type HTMLMotionProps } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Variantes de botão disponíveis
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Tamanhos disponíveis para botões
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props do componente AnimatedButton
 */
export type AnimatedButtonProps = {
  /** Conteúdo do botão (texto ou ReactNode) */
  children: ReactNode;
  /** Variante do botão (padrão: 'primary') */
  variant?: ButtonVariant;
  /** Tamanho do botão (padrão: 'md') */
  size?: ButtonSize;
  /** Ícone do lucide-react (opcional) */
  icon?: LucideIcon;
  /** Posição do ícone (padrão: 'left') */
  iconPosition?: 'left' | 'right';
  /** Tamanho do ícone (padrão: 'md') */
  iconSize?: AnimatedIconSize;
  /** Se o botão está desabilitado */
  disabled?: boolean;
  /** Se o botão está em estado de loading */
  loading?: boolean;
  /** Se o botão ocupa toda a largura disponível */
  fullWidth?: boolean;
  /** Classe CSS adicional */
  className?: string;
  /** Callback quando botão é clicado */
  onClick?: () => void;
  /** Tipo do botão (padrão: 'button') */
  type?: 'button' | 'submit' | 'reset';
  /** Aria label para acessibilidade */
  'aria-label'?: string;
  /** Props adicionais do motion.button */
  motionProps?: Omit<HTMLMotionProps<'button'>, 'children' | 'onClick' | 'type' | 'disabled'>;
};

/**
 * Componente AnimatedButton - Botão animado com framer-motion e suporte a ícones SVG.
 * 
 * Botão com micro-interações suaves, suporte a ícones do lucide-react,
 * e estados visuais (hover, active, loading, disabled).
 * Respeita prefers-reduced-motion para acessibilidade.
 * 
 * @param props - Props do componente AnimatedButton
 * @param props.children - Conteúdo do botão
 * @param props.variant - Variante do botão (padrão: 'primary')
 * @param props.size - Tamanho do botão (padrão: 'md')
 * @param props.icon - Ícone do lucide-react (opcional)
 * @param props.iconPosition - Posição do ícone (padrão: 'left')
 * @param props.iconSize - Tamanho do ícone (padrão: 'md')
 * @param props.disabled - Se o botão está desabilitado
 * @param props.loading - Se o botão está em estado de loading
 * @param props.fullWidth - Se o botão ocupa toda a largura
 * @param props.className - Classe CSS adicional
 * @param props.onClick - Callback quando botão é clicado
 * @param props.type - Tipo do botão (padrão: 'button')
 * @param props['aria-label'] - Aria label para acessibilidade
 * @param props.motionProps - Props adicionais do motion.button
 * @returns Componente React renderizado
 * 
 * @example
 * ```tsx
 * import { Zap, ArrowRight } from 'lucide-react';
 * 
 * // Botão primário simples
 * <AnimatedButton onClick={() => {}}>
 *   Clique aqui
 * </AnimatedButton>
 * 
 * // Botão com ícone à esquerda
 * <AnimatedButton 
 *   icon={Zap} 
 *   variant="primary"
 *   onClick={() => {}}
 * >
 *   Ativar
 * </AnimatedButton>
 * 
 * // Botão com ícone à direita e loading
 * <AnimatedButton 
 *   icon={ArrowRight} 
 *   iconPosition="right"
 *   loading
 *   disabled
 * >
 *   Enviar
 * </AnimatedButton>
 * ```
 */
export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  icon: IconComponent,
  iconPosition = 'left',
  iconSize = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  motionProps,
}: AnimatedButtonProps): ReactNode {
  const variants = createAccessibleVariants(hoverVariants);
  const isDisabled = disabled || loading;

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  const buttonClasses = clsx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    loading && styles.loading,
    className
  );

  const iconElement = IconComponent ? (
    <AnimatedIcon
      icon={IconComponent}
      size={iconSize}
      animation={loading ? 'pulse' : 'none'}
      className={clsx(styles.icon, styles[`icon-${iconPosition}`])}
      disabled={isDisabled}
    />
  ) : null;

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading}
      variants={variants}
      initial="rest"
      whileHover={!isDisabled ? 'hover' : undefined}
      whileTap={!isDisabled ? 'tap' : undefined}
      {...motionProps}>
      {iconPosition === 'left' && iconElement}
      <span className={styles.content}>{children}</span>
      {iconPosition === 'right' && iconElement}
      {loading && (
        <span className={styles.loadingSpinner} aria-hidden="true">
          <span className={styles.spinner} />
        </span>
      )}
    </motion.button>
  );
}

