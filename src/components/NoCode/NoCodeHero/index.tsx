import Link from '@docusaurus/Link';
import AnimatedButtonLink from '@site/src/components/shared/Button/AnimatedButtonLink';
import { useActiveBreakpoint } from '@site/src/hooks/useActiveBreakpoint';
import type { Theme } from '@site/src/types';
import {
  createAccessibleVariants,
  fadeUpVariants,
} from '@site/src/utils/animations';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Zap } from 'lucide-react';
import { type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Conteúdo estático da seção Hero No Code
 */
const NO_CODE_HERO_CONTENT = {
  label: 'Sem Código',
  title: 'Automações WhatsApp sem escrever código',
  subtitle: 'Você não precisa ser programador para criar automações poderosas. Aprenda conceitos técnicos de forma simples e descubra como usar a Z-API mesmo sem conhecimento de programação.',
  ctaPrimary: {
    label: 'Ver Glossário',
    to: '#glossario',
    icon: BookOpen,
  },
  ctaSecondary: {
    label: 'Guias Visuais',
    to: '#guias',
    icon: Lightbulb,
  },
} as const;

/**
 * Props do componente NoCodeHero
 */
type NoCodeHeroProps = {
  /** Tema do design system (padrão: 'official') */
  theme?: Theme;
};

/**
 * Componente NoCodeHero - Hero section da página No Code.
 *
 * Exibe título, subtítulo e CTAs para a página No Code.
 * Usa tema oficial do Z-API com animações suaves.
 *
 * @param props - Props do componente NoCodeHero
 * @param props.theme - Tema do design system (padrão: 'official')
 * @returns Componente React da seção Hero No Code
 */
export default function NoCodeHero({
  theme = 'official',
}: NoCodeHeroProps): ReactNode {
  const breakpoint = useActiveBreakpoint();
  const isMobile = breakpoint.isMobile;

  const variants = createAccessibleVariants(fadeUpVariants);

  return (
    <section
      className={clsx(styles.hero, styles[theme])}
      data-theme={theme}
      aria-label="Hero No Code">
      <div className={styles.heroContainer}>
        <motion.div
          className={styles.heroContent}
          variants={variants}
          initial="hidden"
          animate="visible">
          {NO_CODE_HERO_CONTENT.label && (
            <motion.div
              className={styles.heroLabel}
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}>
              <Zap size={16} aria-hidden="true" />
              <span className="caption">{NO_CODE_HERO_CONTENT.label}</span>
            </motion.div>
          )}

          <motion.h1
            className={clsx(styles.heroTitle, 'display')}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}>
            {NO_CODE_HERO_CONTENT.title}
          </motion.h1>

          <motion.p
            className={clsx(styles.heroSubtitle, 'text-large')}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}>
            {NO_CODE_HERO_CONTENT.subtitle}
          </motion.p>

          <motion.div
            className={styles.heroButtons}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}>
            <Link
              to={NO_CODE_HERO_CONTENT.ctaPrimary.to}
              className={styles.ctaLink}>
              <AnimatedButtonLink
                variant="primary"
                size={isMobile ? 'sm' : 'md'}
                icon={NO_CODE_HERO_CONTENT.ctaPrimary.icon}
                iconPosition="left">
                {NO_CODE_HERO_CONTENT.ctaPrimary.label}
              </AnimatedButtonLink>
            </Link>
            <Link
              to={NO_CODE_HERO_CONTENT.ctaSecondary.to}
              className={styles.ctaLink}>
              <AnimatedButtonLink
                variant="outline"
                size={isMobile ? 'sm' : 'md'}
                icon={NO_CODE_HERO_CONTENT.ctaSecondary.icon}
                iconPosition="left">
                {NO_CODE_HERO_CONTENT.ctaSecondary.label}
              </AnimatedButtonLink>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

