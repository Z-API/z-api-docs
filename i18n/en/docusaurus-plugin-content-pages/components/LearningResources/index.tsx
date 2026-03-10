import CardSection from "@site/src/components/shared/CardSection";
import Loading from "@site/src/components/shared/Loading";
import { useLearningResources } from '../patterns/container-presentational/useLearningResources';
import type { Theme } from "@site/src/types";
import { CARD_LINK_TEXTS } from "@site/src/utils/cardConstants";
import type { ReactNode } from "react";

/**
 * Props for LearningResources component
 */
type LearningResourcesProps = {
  /** Design system theme (default: 'classic') */
  theme?: Theme;
  /** URL for data fetching (optional) */
  dataUrl?: string;
  /** Whether to fetch data */
  enableFetch?: boolean;
};

/**
 * LearningResources component – "Learning Resources" section (Presentational).
 *
 * Presentational component that displays cards with links to learning resources.
 * Uses a custom hook (useLearningResources) to manage data logic,
 * following the Container/Presentational pattern.
 *
 * @param props - LearningResources component props
 * @param props.theme - Design system theme (default: 'classic')
 * @param props.dataUrl - URL for data fetching (optional)
 * @param props.enableFetch - Whether to fetch data (default: false)
 * @returns React component for the LearningResources section
 *
 * @example
 * ```tsx
 * // Basic usage (static data)
 * <LearningResources />
 * 
 * // With data fetching
 * <LearningResources 
 *   dataUrl="/api/learning-resources"
 *   enableFetch={true}
 * />
 * ```
 */
export default function LearningResources({
  theme = "classic",
  dataUrl,
  enableFetch = false,
}: LearningResourcesProps = {}): ReactNode {
  // Hook manages data logic (separated from presentation)
  const { cards, isLoading, error } = useLearningResources({
    url: dataUrl,
    enableFetch,
  });

  // Show loading
  if (isLoading) {
    return (
      <section data-theme={theme} aria-label="Learning resources">
        <div className="container">
          <Loading text="Loading resources..." />
        </div>
      </section>
    );
  }

  // Show error
  if (error) {
    return (
      <section data-theme={theme} aria-label="Learning resources">
        <div className="container">
          <div role="alert" aria-live="assertive">
            <p>Error loading resources: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  // Validation: check if cards is empty
  if (!cards || cards.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn("LearningResources: cards array is empty");
    }
    return null;
  }

  // Render presentational component
  return (
    <CardSection
      title="Learning resources"
      cards={cards}
      linkText={CARD_LINK_TEXTS.ACCESS}
      theme={theme}
      aria-label="Learning resources"
    />
  );
}