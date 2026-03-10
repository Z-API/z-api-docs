import Link from '@docusaurus/Link';
import AnimatedButtonLink from '@site/src/components/shared/Button/AnimatedButtonLink';
import { useActiveBreakpoint } from '@site/src/hooks/useActiveBreakpoint';
import type { Theme } from '@site/src/types';
import clsx from 'clsx';
import { Globe, Play, Rocket, Users } from 'lucide-react';
import { type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Tipo para estatísticas do hero
 */
type HeroStat = {
  value: string;
  label: string;
  icon?: typeof Users;
};

/**
 * Conteúdo estático da seção Hero
 * Inspirado no WhatsApp Business Developer Hub
 * Atualizado com informações do site oficial Z-API
 */
const HERO_CONTENT = {
  label: 'Central do Desenvolvedor', // Texto pequeno acima do título
  title: 'Conecte seu sistema ao Z-API, a API WhatsApp mais estável do Brasil',
  subtitle: 'Se você desenvolve software, Z-API é a solução para integrar atendimento, notificações e automações via WhatsApp com suporte técnico nacional, documentação clara e parceria de verdade.',
  stats: [
    { value: '+60.000', label: 'clientes', icon: Users },
    { value: '79', label: 'países', icon: Globe },
    { value: '24/7', label: 'suporte nacional', icon: Rocket },
  ] as HeroStat[],
  ctaPrimary: { label: 'Começar grátis', to: '/docs/quick-start/introducao', icon: Rocket },
  ctaSecondary: { label: 'Ver documentação', to: '/docs/intro', icon: Play },
} as const;

/**
 * Props do componente HeroSection
 */
type HeroSectionSize = 'compact' | 'default' | 'expanded';
type HeroSectionLayout = 'left' | 'center' | 'split';
type HeroSectionCTAStyle = 'pill' | 'rounded' | 'square';

type HeroSectionProps = {
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
  /** Tamanho visual do hero (compact, default, expanded). Default varia com breakpoint. */
  size?: HeroSectionSize;
  /** Layout de alinhamento do conteúdo (left, center, split). */
  layout?: HeroSectionLayout;
  /** Estilo dos botões principais (pill, rounded, square). */
  ctaStyle?: HeroSectionCTAStyle;
};

const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Componente HeroSection - Seção principal da homepage.
 * 
 * Exibe o título principal, subtítulo e dois CTAs (Call-to-Action).
 * Usa gradiente verde do Z-API para destacar a seção.
 * 
 * @param props - Props do componente HeroSection
 * @param props.theme - Tema do design system (padrão: 'classic')
 * @param props.size - Tamanho visual (compact, default, expanded). Default responsivo.
 * @param props.layout - Layout do conteúdo (left, center, split).
 * @param props.ctaStyle - Estilo dos botões (pill, rounded, square).
 * @returns Componente React da seção Hero
 * 
 * @example
 * ```tsx
 * <HeroSection />
 * <HeroSection theme="zapi" />
 * <HeroSection theme="hybrid" />
 * ```
 */
export default function HeroSection({
  theme = 'classic',
  size,
  layout = 'left',
  ctaStyle = 'pill',
}: HeroSectionProps = {}): ReactNode {
  const breakpoint = useActiveBreakpoint();
  const responsiveSize: HeroSectionSize = breakpoint.isMobile ? 'compact' : breakpoint.isTablet ? 'default' : 'expanded';
  const resolvedSize = size ?? responsiveSize;
  const resolvedLayout = layout;
  const resolvedCTAStyle = ctaStyle;

  return (
    <section 
      className={clsx(
        styles.heroSection,
        styles[`size${capitalize(resolvedSize)}`],
        styles[`layout${capitalize(resolvedLayout)}`]
      )} 
      role="banner"
      aria-labelledby="hero-title"
      data-theme={theme}
      data-breakpoint={breakpoint.name}>
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroContentWrapper}>
          {/* Label acima do título - Central do Desenvolvedor */}
          <div className={styles.heroLabel}>
            <span className={clsx(styles.heroLabelText, 'caption')}>{HERO_CONTENT.label}</span>
          </div>
          <h1
            id="hero-title"
            className={clsx(styles.heroTitle, 'display')}>
            {HERO_CONTENT.title}
          </h1>
          <div className={styles.heroSubtitleWrapper}>
            <p className={clsx(styles.heroSubtitle, 'text-large')}>
              {HERO_CONTENT.subtitle}
            </p>
          </div>
          <div
            className={clsx(
              styles.buttons,
              breakpoint.isMobile && styles.buttonsStacked,
              styles[`layoutButtons${capitalize(resolvedLayout)}`]
            )}>
            <Link
              to={HERO_CONTENT.ctaPrimary.to}
              className={styles.ctaLink}
              aria-label={`${HERO_CONTENT.ctaPrimary.label} - Começar a usar Z-API`}>
              <AnimatedButtonLink
                variant="ghost"
                size="lg"
                className={clsx(
                  styles.ctaButton,
                  styles.heroButtonPrimary,
                  styles[`ctaStyle${capitalize(resolvedCTAStyle)}`]
                )}>
                {HERO_CONTENT.ctaPrimary.label}
              </AnimatedButtonLink>
            </Link>
            <Link
              to={HERO_CONTENT.ctaSecondary.to}
              className={styles.ctaLink}
              aria-label={`${HERO_CONTENT.ctaSecondary.label} - Acessar documentação`}>
              <AnimatedButtonLink
                variant="ghost"
                size="lg"
                className={clsx(
                  styles.ctaButton,
                  styles.heroButtonSecondary,
                  styles[`ctaStyle${capitalize(resolvedCTAStyle)}`]
                )}>
                {HERO_CONTENT.ctaSecondary.label}
              </AnimatedButtonLink>
            </Link>
          </div>
          {/* Estatísticas do Z-API - Estrutura semântica melhorada com <dl> */}
          <dl
            className={styles.heroStats}
            aria-label="Estatísticas do Z-API">
            {HERO_CONTENT.stats.map((stat) => {
              const Icon = stat.icon || Users;
              return (
                <div
                  key={stat.label}
                  className={styles.heroStatItem}>
                  <dt className={clsx(styles.heroStatLabel, 'caption')}>
                    <Icon
                      size={18}
                      aria-hidden="true"
                      className={styles.heroStatIcon}
                    />
                    {stat.label}
                  </dt>
                  <dd className={styles.heroStatValue}>
                    {stat.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}

// Exportar também HeroSection Compound Pattern
export { default as HeroSectionCompound } from './HeroSectionCompound';
