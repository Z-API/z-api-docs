/**
 * Card Compound Component - Implementação do Compound Pattern
 * 
 * Segue o padrão Compound Components conforme patterns.dev:
 * https://www.patterns.dev/react/compound-pattern/
 * 
 * Permite composição flexível de componentes Card usando sub-componentes:
 * - Card.Header
 * - Card.Icon
 * - Card.Body
 * - Card.Title
 * - Card.Description
 * - Card.Footer
 * - Card.Link
 * 
 * Mantém compatibilidade com a API existente (Card com CardItem)
 */

import Link from '@docusaurus/Link';
import AnimatedIcon from '@site/src/components/shared/Icon/AnimatedIcon';
import { useRippleEffect } from '@site/src/hooks/useRippleEffect';
import type { Theme } from '@site/src/types';
import { createAccessibleVariants, hoverElevationVariants } from '@site/src/utils/animations';
import { CARD_ICON_SIZE } from '@site/src/utils/iconSizes';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { createContext, useContext, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './styles.module.css';

/**
 * Context para compartilhar estado entre sub-componentes do Card
 */
type CardContextType = {
  theme: Theme;
  hasRipple: boolean;
  handleRippleClick: (e: React.MouseEvent<HTMLElement>) => void;
  ripples: Array<{ id: string; x: number; y: number; size: number }>;
};

const CardContext = createContext<CardContextType | null>(null);

// Context hook - usado internamente pelos sub-componentes
// @ts-expect-error - Hook é usado pelos sub-componentes via contexto
function useCardContext() {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('Card sub-components must be used within Card component');
  }
  return context;
}

/**
 * Props do componente Card (Compound)
 */
type CardCompoundProps = {
  /** Conteúdo do card (sub-componentes) */
  children: ReactNode;
  /** Classe CSS adicional */
  className?: string;
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
  /** Link de destino (opcional, se fornecido, card é clicável) */
  to?: string;
  /** Se deve mostrar ripple effect (padrão: true) */
  hasRipple?: boolean;
  /** Handler de click (opcional) */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Aria label para acessibilidade */
  'aria-label'?: string;
};

/**
 * Componente Card principal (Compound Pattern)
 * 
 * @example
 * ```tsx
 * <Card to="/docs/intro" theme="classic">
 *   <Card.Header>
 *     <Card.Icon icon={<BookIcon />} />
 *     <Card.Title>Título do Card</Card.Title>
 *   </Card.Header>
 *   <Card.Body>
 *     <Card.Description>Descrição do card</Card.Description>
 *   </Card.Body>
 *   <Card.Footer>
 *     <Card.Link>Acessar →</Card.Link>
 *   </Card.Footer>
 * </Card>
 * ```
 */
function CardCompound({
  children,
  className,
  theme = 'classic',
  to,
  hasRipple = true,
  onClick,
  'aria-label': ariaLabel,
}: CardCompoundProps) {
  const [ripples, handleRippleClick] = useRippleEffect({ disabled: !hasRipple });

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (hasRipple) {
      handleRippleClick(e);
    }
    onClick?.(e);
  };

  const variants = createAccessibleVariants(hoverElevationVariants);

  const contextValue: CardContextType = {
    theme,
    hasRipple,
    handleRippleClick,
    ripples,
  };

  // Renderizar ripples
  const rippleElements = hasRipple && ripples.map((ripple) => (
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
  ));

  const cardClassName = clsx('card', hasRipple && 'has-ripple', styles.card, className);
  const cardProps = {
    className: cardClassName,
    'data-theme': theme,
    'aria-label': ariaLabel,
    onClick: handleClick,
  };

  const cardContent = (
    <>
      {rippleElements}
      {children}
    </>
  );

  const wrapperContent = to ? (
    <Link to={to} {...cardProps}>
      {cardContent}
    </Link>
  ) : (
    <div {...cardProps}>
      {cardContent}
    </div>
  );

  return (
    <CardContext.Provider value={contextValue}>
      <motion.div
        variants={variants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        className={styles.cardWrapper}>
        {wrapperContent}
      </motion.div>
    </CardContext.Provider>
  );
}

/**
 * Card.Header - Header do card
 */
function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx(styles.cardHeader, className)}>{children}</div>;
}

/**
 * Card.Icon - Ícone do card
 */
function CardIcon({ icon, className }: { icon: ReactNode; className?: string }) {
  // AnimatedIcon espera LucideIcon, mas aceitamos ReactNode para flexibilidade
  // Se for um componente LucideIcon, renderiza com AnimatedIcon
  // Caso contrário, renderiza diretamente
  // Verificar se é um componente LucideIcon (função que retorna JSX)
  const isLucideIconComponent = typeof icon === 'function' && !('prototype' in icon);
  
  return (
    <div className={clsx(styles.cardIcon, className)}>
      {isLucideIconComponent ? (
        <AnimatedIcon icon={icon as LucideIcon} size={CARD_ICON_SIZE} animation="hover" />
      ) : (
        <div className={styles.iconWrapper}>{icon}</div>
      )}
    </div>
  );
}

/**
 * Card.Body - Corpo do card
 */
function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx(styles.cardBody, className)}>{children}</div>;
}

/**
 * Card.Title - Título do card
 */
function CardTitle({ children, as = 'h3', className }: { children: ReactNode; as?: 'h2' | 'h3' | 'h4'; className?: string }) {
  return (
    <Heading as={as} className={clsx(styles.cardTitle, className)}>
      {children}
    </Heading>
  );
}

/**
 * Card.Description - Descrição do card
 * 
 * Usa <div> ao invés de <p> para evitar erro de hidratação quando
 * conteúdo MDX gera automaticamente tags <p> dentro do componente
 */
function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx(styles.cardDescription, 'text-large', className)}>{children}</div>;
}

/**
 * Card.Footer - Footer do card
 */
function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx(styles.cardFooter, className)}>{children}</div>;
}

/**
 * Card.Link - Link do card
 */
function CardLink({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={clsx(styles.cardLink, className)}>{children}</span>;
}

// Compor componentes no objeto Card
CardCompound.Header = CardHeader;
CardCompound.Icon = CardIcon;
CardCompound.Body = CardBody;
CardCompound.Title = CardTitle;
CardCompound.Description = CardDescription;
CardCompound.Footer = CardFooter;
CardCompound.Link = CardLink;

export default CardCompound;
