import AnimatedIcon from "@site/src/components/shared/Icon/AnimatedIcon";
import Loading from "@site/src/components/shared/Loading";
import { useHomepageFeatures } from "../patterns/container-presentational";
import { useActiveBreakpoint } from "@site/src/hooks/useActiveBreakpoint";
import type { FeatureItem, Theme } from "@site/src/types";
import {
  createAccessibleVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "@site/src/utils/animations";
import { FEATURE_ICON_SIZE } from "@site/src/utils/iconSizes";
import Heading from "@theme/Heading";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { memo, type CSSProperties, type ReactNode } from "react";

import styles from "./styles.module.css";

// Data moved to useHomepageFeatures hook
// Following Container/Presentational pattern

/**
 * Props for Feature component
 */
type FeatureProps = FeatureItem & {
  /** Icon from lucide-react */
  icon: typeof Zap;
  /** Design system theme (default: 'classic') */
  theme?: Theme;
};

/**
 * Feature component – Individual feature/benefit card.
 *
 * Renders a card with an icon, title and description of a platform benefit.
 *
 * @param props - Feature component props
 * @param props.title - Feature title
 * @param props.description - Feature description (string or ReactNode)
 * @param props.icon - Lucide-react icon
 * @param props.theme - Design system theme (default: 'classic')
 * @returns React component for the feature card
 */
const Feature = memo(
  ({ title, description, icon, theme = "classic" }: FeatureProps) => {
    const itemVariants = createAccessibleVariants(staggerItemVariants);

    return (
      <motion.div
        className={clsx(styles.featureItem, "stagger-item")}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
      >
        <article
          className={clsx("card", styles.featureCard)}
          data-theme={theme}
        >
          <div className={clsx("text--center", "padding-horiz--md", styles.featureContent)}>
            <div className={styles.featureIcon}>
              <AnimatedIcon
                icon={icon}
                size={FEATURE_ICON_SIZE}
                animation="hover"
              />
            </div>
            <Heading as="h3" className={styles.featureTitle}>
              {title}
            </Heading>
            <p className={styles.featureDescription}>{description}</p>
          </div>
        </article>
      </motion.div>
    );
  }
);

/**
 * Props for HomepageFeatures component
 */
type HomepageFeaturesProps = {
  /** Design system theme (default: 'classic') */
  theme?: Theme;
  /** URL for data fetching (optional) */
  dataUrl?: string;
  /** Whether to fetch data */
  enableFetch?: boolean;
};

/**
 * HomepageFeatures component – Features/benefits section (Presentational).
 *
 * Presentational component that displays cards highlighting the main benefits.
 * Uses a custom hook (useHomepageFeatures) to manage data logic,
 * following the Container/Presentational pattern.
 *
 * Uses responsive grid (3 columns desktop, 2 tablet, 1 mobile).
 *
 * @param props - HomepageFeatures component props
 * @param props.theme - Design system theme (default: 'classic')
 * @param props.dataUrl - URL for data fetching (optional)
 * @param props.enableFetch - Whether to fetch data (default: false)
 * @returns React component for HomepageFeatures section
 *
 * @example
 * ```tsx
 * // Basic usage (static data)
 * <HomepageFeatures />
 * 
 * // With data fetching
 * <HomepageFeatures 
 *   dataUrl="/api/homepage-features"
 *   enableFetch={true}
 * />
 * ```
 */
export default function HomepageFeatures({
  theme = "classic",
  dataUrl,
  enableFetch = false,
}: HomepageFeaturesProps = {}): ReactNode {
  // Hook manages data logic (separated from presentation)
  const { features, isLoading, error } = useHomepageFeatures({
    url: dataUrl,
    enableFetch,
  });

  const containerVariants = createAccessibleVariants(staggerContainerVariants);
  const breakpoint = useActiveBreakpoint();

  const gridColumns = breakpoint.isMobile ? 1 : breakpoint.isTablet ? 2 : 3;
  const gridGap = breakpoint.isMobile
    ? "var(--spacing-md)"
    : breakpoint.isTablet
      ? "var(--spacing-lg)"
      : "var(--spacing-xl)";
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
    gap: gridGap,
  };

  // Show loading
  if (isLoading) {
    return (
      <section
        className={styles.features}
        data-theme={theme}
        aria-label="Z-API Platform Benefits"
        aria-busy="true">
        <div className="container">
          <Loading text="Loading features..." />
        </div>
      </section>
    );
  }

  // Show error
  if (error) {
    return (
      <section
        className={styles.features}
        data-theme={theme}
        aria-label="Z-API Platform Benefits"
      >
        <div className="container">
          <div role="alert" aria-live="assertive">
            <p>Error loading features: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  // Render presentational component
  return (
    <section
      className={styles.features}
      data-theme={theme}
      data-breakpoint={breakpoint.name}
      aria-label="Z-API Platform Benefits"
      aria-labelledby="features-title">
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" id="features-title" className={styles.featuresTitle}>
            Why choose Z-API?
          </Heading>
          <p className={styles.featuresSubtitle} id="features-subtitle">
            With Z-API you get less complexity, 100% national support,
            and plug‑and‑play integration. Start with hands‑on practice and test our API
            without writing code.
          </p>
        </div>
        <motion.div
          className={styles.featuresGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: true, margin: "-100px" }}
          style={gridStyle}
          role="list"
          aria-label="List of benefits">
          {features.map((props) => (
            <Feature key={props.title} {...props} theme={theme} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}