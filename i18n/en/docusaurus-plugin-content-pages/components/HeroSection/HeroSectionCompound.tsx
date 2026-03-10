/**
 * HeroSection Compound Component - Implementação do Compound Pattern
 * 
 * Segue o padrão Compound Components conforme patterns.dev:
 * https://www.patterns.dev/react/compound-pattern/
 * 
 * Permite composição flexível do HeroSection usando sub-componentes:
 * - HeroSection.Label
 * - HeroSection.Title
 * - HeroSection.Subtitle
 * - HeroSection.CTAs
 * - HeroSection.CTA
 * - HeroSection.Stats
 * - HeroSection.Stat
 * - HeroSection.Terminal
 * 
 * Mantém compatibilidade com a API existente (HeroSection com props)
 */

import Link from '@docusaurus/Link';
import DraculaTerminal from '@site/src/components/DraculaTerminal';
import AnimatedButtonLink from '@site/src/components/shared/Button/AnimatedButtonLink';
import { useActiveBreakpoint } from '@site/src/hooks/useActiveBreakpoint';
import { useHeroContent, type HeroContent } from '@site/src/hooks/content/useHeroContent';
import type { Theme } from '@site/src/types';
import {
  createAccessibleVariants,
  fadeUpVariants,
} from '@site/src/utils/animations';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { createContext, useContext, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Tipo para tamanho do hero
 */
type HeroSectionSize = 'compact' | 'default' | 'expanded';

/**
 * Tipo para layout do hero
 */
type HeroSectionLayout = 'left' | 'center' | 'split';

/**
 * Tipo para estilo dos CTAs
 */
type HeroSectionCTAStyle = 'pill' | 'rounded' | 'square';

/**
 * Context para compartilhar estado entre sub-componentes do HeroSection
 */
type HeroSectionContextType = {
  theme: Theme;
  size: HeroSectionSize;
  layout: HeroSectionLayout;
  ctaStyle: HeroSectionCTAStyle;
  breakpoint: ReturnType<typeof useActiveBreakpoint>;
  shouldAnimate: boolean;
  content?: HeroContent;
};

const HeroSectionContext = createContext<HeroSectionContextType | null>(null);

function useHeroSectionContext() {
  const context = useContext(HeroSectionContext);
  if (!context) {
    throw new Error('HeroSection sub-components must be used within HeroSection component');
  }
  return context;
}

/**
 * Props do componente HeroSection (Compound)
 */
type HeroSectionCompoundProps = {
  /** Conteúdo do hero (sub-componentes) */
  children: ReactNode;
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
  /** Tamanho visual do hero (compact, default, expanded) */
  size?: HeroSectionSize;
  /** Layout de alinhamento do conteúdo (left, center, split) */
  layout?: HeroSectionLayout;
  /** Estilo dos botões principais (pill, rounded, square) */
  ctaStyle?: HeroSectionCTAStyle;
  /** Se deve animar (padrão: false para evitar opacity 0 no título) */
  shouldAnimate?: boolean;
  /** Classe CSS adicional */
  className?: string;
  /** Aria label para acessibilidade */
  'aria-label'?: string;
};

const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Componente HeroSection principal (Compound Pattern)
 * 
 * @example
 * ```tsx
 * <HeroSection theme="official" layout="left">
 *   <HeroSection.Label>Central do Desenvolvedor</HeroSection.Label>
 *   <HeroSection.Title>Conecte seu sistema ao Z-API</HeroSection.Title>
 *   <HeroSection.Subtitle>Se você desenvolve software...</HeroSection.Subtitle>
 *   <HeroSection.CTAs>
 *     <HeroSection.CTA primary to="/docs/quick-start/introducao">
 *       Começar grátis
 *     </HeroSection.CTA>
 *     <HeroSection.CTA to="/docs/intro">Ver documentação</HeroSection.CTA>
 *   </HeroSection.CTAs>
 *   <HeroSection.Stats>
 *     <HeroSection.Stat value="+60.000" label="clientes" />
 *   </HeroSection.Stats>
 *   <HeroSection.Terminal />
 * </HeroSection>
 * ```
 */
function HeroSectionCompound({
  children,
  theme = 'classic',
  size,
  layout = 'left',
  ctaStyle = 'pill',
  shouldAnimate = false,
  className,
  'aria-label': ariaLabel,
}: HeroSectionCompoundProps) {
  const breakpoint = useActiveBreakpoint();
  const responsiveSize: HeroSectionSize = breakpoint.isMobile ? 'compact' : breakpoint.isTablet ? 'default' : 'expanded';
  const resolvedSize = size ?? responsiveSize;
  const resolvedLayout = layout;
  const resolvedCTAStyle = ctaStyle;

  // Hook para conteúdo (opcional, pode ser usado pelos sub-componentes)
  const { content } = useHeroContent();

  const contextValue: HeroSectionContextType = {
    theme,
    size: resolvedSize,
    layout: resolvedLayout,
    ctaStyle: resolvedCTAStyle,
    breakpoint,
    shouldAnimate,
    content,
  };

  return (
    <HeroSectionContext.Provider value={contextValue}>
      <section
        className={clsx(
          styles.heroSection,
          styles[`size${capitalize(resolvedSize)}`],
          styles[`layout${capitalize(resolvedLayout)}`],
          className
        )}
        data-theme={theme}
        data-breakpoint={breakpoint.name}
        aria-label={ariaLabel || 'Hero section'}>
        <div className={clsx('container', styles.heroContainer)}>
          <div className={styles.heroContentWrapper}>
            {children}
          </div>
        </div>
      </section>
    </HeroSectionContext.Provider>
  );
}

/**
 * HeroSection.Label - Label acima do título
 */
function HeroSectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  const { shouldAnimate } = useHeroSectionContext();
  
  return (
    <motion.div
      className={clsx(styles.heroLabel, className)}
      variants={createAccessibleVariants(fadeUpVariants)}
      initial={shouldAnimate ? 'hidden' : false}
      animate={shouldAnimate ? 'visible' : undefined}
      transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}>
      <span className={clsx(styles.heroLabelText, 'caption')}>{children}</span>
    </motion.div>
  );
}

/**
 * HeroSection.Title - Título principal
 */
function HeroSectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  const { shouldAnimate } = useHeroSectionContext();
  
  return (
    <motion.h1
      className={clsx(styles.heroTitle, 'display', className)}
      variants={createAccessibleVariants(fadeUpVariants)}
      initial={shouldAnimate ? 'hidden' : false}
      animate={shouldAnimate ? 'visible' : undefined}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.h1>
  );
}

/**
 * HeroSection.Subtitle - Subtítulo
 */
function HeroSectionSubtitle({ children, className }: { children: ReactNode; className?: string }) {
  const { shouldAnimate } = useHeroSectionContext();
  
  return (
    <motion.div
      className={clsx(styles.heroSubtitleWrapper, className)}
      variants={createAccessibleVariants(fadeUpVariants)}
      initial={shouldAnimate ? 'hidden' : false}
      animate={shouldAnimate ? 'visible' : undefined}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}>
      <p className={clsx(styles.heroSubtitle, 'text-large')}>
        {children}
      </p>
    </motion.div>
  );
}

/**
 * HeroSection.CTAs - Container de botões de ação
 */
function HeroSectionCTAs({ children, className }: { children: ReactNode; className?: string }) {
  const { shouldAnimate, layout, breakpoint } = useHeroSectionContext();
  const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);
  
  return (
    <motion.div
      className={clsx(
        styles.buttons,
        breakpoint.isMobile && styles.buttonsStacked,
        styles[`layoutButtons${capitalize(layout)}`],
        className
      )}
      variants={createAccessibleVariants(fadeUpVariants)}
      initial={shouldAnimate ? 'hidden' : false}
      animate={shouldAnimate ? 'visible' : undefined}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

/**
 * HeroSection.CTA - Botão de ação individual
 */
type HeroSectionCTAProps = {
  children: ReactNode;
  to: string;
  primary?: boolean;
  className?: string;
  'aria-label'?: string;
};

function HeroSectionCTA({ 
  children, 
  to, 
  primary = false, 
  className,
  'aria-label': ariaLabel,
}: HeroSectionCTAProps) {
  const { ctaStyle } = useHeroSectionContext();
  const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);
  
  // Converter children para string para uso em aria-label
  const childrenText = typeof children === 'string' 
    ? children 
    : typeof children === 'number' 
    ? String(children)
    : 'Link';
  
  return (
    <Link
      to={to}
      className={styles.ctaLink}
      aria-label={ariaLabel || `${childrenText} - ${primary ? 'Ação principal' : 'Ação secundária'}`}>
      <AnimatedButtonLink
        variant="ghost"
        size="lg"
        className={clsx(
          styles.ctaButton,
          primary ? styles.heroButtonPrimary : styles.heroButtonSecondary,
          styles[`ctaStyle${capitalize(ctaStyle)}`],
          className
        )}>
        {children}
      </AnimatedButtonLink>
    </Link>
  );
}

/**
 * HeroSection.Stats - Container de estatísticas
 */
function HeroSectionStats({ children, className }: { children: ReactNode; className?: string }) {
  const { shouldAnimate } = useHeroSectionContext();
  
  return (
    <motion.div
      className={clsx(styles.heroStats, className)}
      variants={createAccessibleVariants(fadeUpVariants)}
      initial={shouldAnimate ? 'hidden' : false}
      animate={shouldAnimate ? 'visible' : undefined}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

/**
 * HeroSection.Stat - Estatística individual
 */
type HeroSectionStatProps = {
  value: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>;
  className?: string;
};

function HeroSectionStat({ value, label, icon: Icon, className }: HeroSectionStatProps) {
  return (
    <div className={clsx(styles.heroStatItem, className)}>
      {Icon && <Icon size={18} aria-hidden className={styles.heroStatIcon} />}
      <span className={styles.heroStatValue}>{value}</span>
      <span className={clsx(styles.heroStatLabel, 'caption')}>{label}</span>
    </div>
  );
}

/**
 * HeroSection.Terminal - Terminal animado
 */
function HeroSectionTerminal({ className }: { className?: string }) {
  const { shouldAnimate } = useHeroSectionContext();
  
  return (
    <motion.div
      className={clsx(styles.terminalContainer, className)}
      variants={createAccessibleVariants(fadeUpVariants)}
      initial={shouldAnimate ? 'hidden' : false}
      animate={shouldAnimate ? 'visible' : undefined}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}>
      <DraculaTerminal />
    </motion.div>
  );
}

// Compor componentes no objeto HeroSection
HeroSectionCompound.Label = HeroSectionLabel;
HeroSectionCompound.Title = HeroSectionTitle;
HeroSectionCompound.Subtitle = HeroSectionSubtitle;
HeroSectionCompound.CTAs = HeroSectionCTAs;
HeroSectionCompound.CTA = HeroSectionCTA;
HeroSectionCompound.Stats = HeroSectionStats;
HeroSectionCompound.Stat = HeroSectionStat;
HeroSectionCompound.Terminal = HeroSectionTerminal;

export default HeroSectionCompound;
