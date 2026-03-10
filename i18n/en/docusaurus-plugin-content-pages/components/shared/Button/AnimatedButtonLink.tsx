import AnimatedIcon, { type AnimatedIconSize } from '@site/src/components/shared/Icon/AnimatedIcon';
import { createAccessibleVariants, hoverVariants } from '@site/src/utils/animations';
import { getButtonIconSize } from '@site/src/utils/iconSizes';
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
 * Props do componente AnimatedButtonLink
 * Versão do AnimatedButton que renderiza como <a> para uso dentro de Links
 */
export type AnimatedButtonLinkProps = {
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
  /** 
   * Tamanho do ícone (opcional)
   * Se não fornecido, usa tamanho proporcional ao botão:
   * - sm button → sm icon (16px)
   * - md button → md icon (20px)
   * - lg button → lg icon (24px)
   */
  iconSize?: AnimatedIconSize;
  /** Classe CSS adicional */
  className?: string;
  /** Props adicionais do motion.span */
  motionProps?: Omit<HTMLMotionProps<'span'>, 'children'>;
};

/**
 * Componente AnimatedButtonLink - Versão do AnimatedButton que renderiza como link.
 * 
 * Usado quando o botão precisa estar dentro de um Link do Docusaurus.
 * Renderiza como <a> ao invés de <button> para evitar HTML inválido.
 * 
 * @param props - Props do componente AnimatedButtonLink
 * @returns Componente React renderizado como <a>
 */
export default function AnimatedButtonLink({
  children,
  variant = 'primary',
  size = 'md',
  icon: IconComponent,
  iconPosition = 'left',
  iconSize, // Opcional: se não fornecido, usa tamanho proporcional ao botão
  className,
  motionProps,
}: AnimatedButtonLinkProps): ReactNode {
  const variants = createAccessibleVariants(hoverVariants);

  const buttonClasses = clsx(
    styles.button,
    styles[variant],
    styles[size],
    className
  );

  // Se iconSize não foi fornecido, usar tamanho proporcional ao botão
  const finalIconSize: AnimatedIconSize = iconSize || getButtonIconSize(size);

  const iconElement = IconComponent ? (
    <AnimatedIcon
      icon={IconComponent}
      size={finalIconSize}
      animation="none"
      className={clsx(styles.icon, styles[`icon-${iconPosition}`])}
    />
  ) : null;

  return (
    <motion.span
      className={buttonClasses}
      variants={variants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      {...motionProps}>
      {iconPosition === 'left' && iconElement}
      <span className={styles.content}>{children}</span>
      {iconPosition === 'right' && iconElement}
    </motion.span>
  );
}

