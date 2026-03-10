import Link from '@docusaurus/Link';
import AnimatedIcon from '@site/src/components/shared/Icon/AnimatedIcon';
import { useActiveBreakpoint } from '@site/src/hooks/useActiveBreakpoint';
import type { Theme } from '@site/src/types';
import {
    createAccessibleVariants,
    staggerContainerVariants,
    staggerItemVariants,
} from '@site/src/utils/animations';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    CreditCard,
    Image as ImageIcon,
    MousePointerClick,
} from 'lucide-react';
import { memo, type CSSProperties, type ReactNode } from 'react';

import styles from './styles.module.css';

/**
 * Exclusive Z-API features
 * Based on analysis of the official website
 */
const EXCLUSIVE_FEATURES = [
  {
    title: 'Carousel messages',
    description:
      'Interactive content with images and clickable buttons. Ideal for catalogs, products, plans and tutorials.',
    icon: ImageIcon,
    link: '/docs/messages/catalogo',
  },
  {
    title: 'Clicked button status',
    description:
      'Track which button the user tapped in an interactive message. Turn each click into a trigger within your funnel.',
    icon: MousePointerClick,
    link: '/docs/messages/botoes',
  },
  {
    title: 'Payment notifications',
    description:
      'Automatic messages with payment status of orders or services. Notify in real‑time when payment is approved, declined or pending.',
    icon: CreditCard,
    link: '/docs/webhooks/introducao',
  },
] as const;

/**
 * Props for ExclusiveFeature component
 */
type ExclusiveFeatureProps = {
  title: string;
  description: string;
  icon: typeof ImageIcon;
  link: string;
  theme?: Theme;
};

/**
 * ExclusiveFeature component – Individual exclusive feature card.
 *
 * Renders a card with icon, title, description and link to documentation.
 *
 * @param props - ExclusiveFeature component props
 * @returns React component for the exclusive feature card
 */
const ExclusiveFeature = memo(
  ({
    title,
    description,
    icon,
    link,
    theme = 'classic',
  }: ExclusiveFeatureProps) => {
    const itemVariants = createAccessibleVariants(staggerItemVariants);

    return (
      <motion.div
        className={clsx(styles.featureItem, 'stagger-item')}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
      >
        <Link to={link} className={styles.featureLink}>
          <article
            className={clsx('card', styles.featureCard)}
            data-theme={theme}
          >
            <div className={styles.featureCardInner}>
              <div className={styles.featureIcon}>
                <AnimatedIcon
                  icon={icon}
                  size="lg"
                  animation="hover"
                />
              </div>
              <div className={styles.featureBody}>
                <Heading as="h3" className={styles.featureTitle}>
                  {title}
                </Heading>
                <p className={styles.featureDescription}>{description}</p>
                <div className={styles.featureCta}>
                  <strong className="text--success">
                    Explore feature
                    <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                  </strong>
                </div>
              </div>
            </div>
          </article>
        </Link>
      </motion.div>
    );
  }
);

ExclusiveFeature.displayName = 'ExclusiveFeature';

/**
 * Props for ExclusiveFeatures component
 */
type ExclusiveFeaturesProps = {
  /** Design system theme (default: 'classic') */
  theme?: Theme;
};

/**
 * ExclusiveFeatures component – Exclusive features section.
 *
 * Displays three cards highlighting Z-API exclusive features:
 * - Carousel messages
 * - Clicked button status
 * - Payment notifications via WhatsApp
 *
 * Uses responsive grid (3 columns desktop, 2 tablet, 1 mobile).
 *
 * @param props - ExclusiveFeatures component props
 * @param props.theme - Design system theme (default: 'classic')
 * @returns React component for the ExclusiveFeatures section
 *
 * @example
 * ```tsx
 * <ExclusiveFeatures />
 * <ExclusiveFeatures theme="official" />
 * ```
 */
export default function ExclusiveFeatures({
  theme = 'classic',
}: ExclusiveFeaturesProps = {}): ReactNode {
  const containerVariants = createAccessibleVariants(staggerContainerVariants);
  const breakpoint = useActiveBreakpoint();

  const gridColumns = breakpoint.isMobile ? 1 : breakpoint.isTablet ? 2 : 3;
  const gridGap = breakpoint.isMobile
    ? 'var(--spacing-lg)' /* 24px on mobile */
    : breakpoint.isTablet
      ? 'var(--spacing-xl)' /* 32px on tablet */
      : '40px'; /* 40px on desktop – more generous */
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
    gap: gridGap,
  };

  return (
    <section
      className={styles.exclusiveFeatures}
      data-theme={theme}
      data-breakpoint={breakpoint.name}
      aria-label="Z-API Exclusive Features"
    >
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            What only Z-API offers
          </Heading>
          <p className={styles.featuresSubtitle}>
            Discover the exclusive features that only our tool can provide.
            Take advantage and be amazed!
          </p>
        </div>
        <motion.div
          className={styles.featuresGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: true, margin: '-100px' }}
          style={gridStyle}
        >
          {EXCLUSIVE_FEATURES.map((props) => (
            <ExclusiveFeature key={props.title} {...props} theme={theme} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}