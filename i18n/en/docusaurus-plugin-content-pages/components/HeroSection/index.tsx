import Link from '@docusaurus/Link';
import AnimatedButtonLink from '@site/src/components/shared/Button/AnimatedButtonLink';
import { useActiveBreakpoint } from '@site/src/hooks/useActiveBreakpoint';
import type { Theme } from '@site/src/types';
import clsx from 'clsx';
import { Globe, Play, Rocket, Users } from 'lucide-react';
import { type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Type for hero statistics
 */
type HeroStat = {
  value: string;
  label: string;
  icon?: typeof Users;
};

/**
 * Static content for the Hero section
 * Inspired by WhatsApp Business Developer Hub
 * Updated with information from the official Z-API website
 */
const HERO_CONTENT = {
  label: 'Developer Hub', // Small text above the title
  title: 'Connect your system to Z-API, the most stable WhatsApp API in Brazil',
  subtitle: 'If you develop software, Z-API is the solution for integrating customer service, notifications, and automations via WhatsApp with national technical support, clear documentation, and a true partnership.',
  stats: [
    { value: '+60,000', label: 'customers', icon: Users },
    { value: '79', label: 'countries', icon: Globe },
    { value: '24/7', label: 'national support', icon: Rocket },
  ] as HeroStat[],
  ctaPrimary: { label: 'Start for free', to: '/docs/quick-start/introducao', icon: Rocket },
  ctaSecondary: { label: 'View documentation', to: '/docs/intro', icon: Play },
} as const;

/**
 * Props for HeroSection component
 */
type HeroSectionSize = 'compact' | 'default' | 'expanded';
type HeroSectionLayout = 'left' | 'center' | 'split';
type HeroSectionCTAStyle = 'pill' | 'rounded' | 'square';

type HeroSectionProps = {
  /** Design system theme (default: 'classic') */
  theme?: Theme;
  /** Visual size of the hero (compact, default, expanded). Default varies by breakpoint. */
  size?: HeroSectionSize;
  /** Content alignment layout (left, center, split). */
  layout?: HeroSectionLayout;
  /** Style of the main buttons (pill, rounded, square). */
  ctaStyle?: HeroSectionCTAStyle;
};

const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

/**
 * HeroSection component – Main homepage section.
 *
 * Displays the main title, subtitle and two CTAs (Call-to-Action).
 * Uses Z-API green gradient to highlight the section.
 *
 * @param props - Component props
 * @param props.theme - Design system theme (default: 'classic')
 * @param props.size - Visual size (compact, default, expanded). Default responsive.
 * @param props.layout - Content layout (left, center, split).
 * @param props.ctaStyle - Button style (pill, rounded, square).
 * @returns React component for the Hero section
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
          {/* Label above title - Developer Hub */}
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
              aria-label={`${HERO_CONTENT.ctaPrimary.label} - Start using Z-API`}>
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
              aria-label={`${HERO_CONTENT.ctaSecondary.label} - Access documentation`}>
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
          {/* Z-API statistics - Improved semantic structure with <dl> */}
          <dl
            className={styles.heroStats}
            aria-label="Z-API statistics">
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

// Also export HeroSection Compound Pattern
export { default as HeroSectionCompound } from './HeroSectionCompound';