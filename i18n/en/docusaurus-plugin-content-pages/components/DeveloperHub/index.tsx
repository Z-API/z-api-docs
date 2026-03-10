import CardSection from '@site/src/components/shared/CardSection';
import Loading from '@site/src/components/shared/Loading';
import { useDeveloperHub } from '../patterns/container-presentational';
import type { Theme } from '@site/src/types';
import { CARD_LINK_TEXTS } from '@site/src/utils/cardConstants';
import type { ReactNode } from 'react';

/**
 * Props for DeveloperHub component
 */
type DeveloperHubProps = {
  /** Design system theme (default: 'classic') */
  theme?: Theme;
  /** URL for data fetching (optional) */
  dataUrl?: string;
  /** Whether to fetch data */
  enableFetch?: boolean;
};

/**
 * DeveloperHub component – "Developer Hub" section (Presentational).
 * 
 * Presentational component that displays cards with links to documentation.
 * Uses a custom hook (useDeveloperHub) to manage data logic,
 * following the Container/Presentational pattern.
 * 
 * @param props - DeveloperHub component props
 * @param props.theme - Design system theme (default: 'classic')
 * @param props.dataUrl - URL for data fetching (optional)
 * @param props.enableFetch - Whether to fetch data (default: false)
 * @returns React component for the DeveloperHub section
 * 
 * @example
 * ```tsx
 * // Basic usage (static data)
 * <DeveloperHub />
 * 
 * // With data fetching
 * <DeveloperHub 
 *   dataUrl="/api/developer-hub-cards"
 *   enableFetch={true}
 * />
 * ```
 */
export default function DeveloperHub({ 
  theme = 'classic',
  dataUrl,
  enableFetch = false,
}: DeveloperHubProps = {}): ReactNode {
  // Hook manages data logic (separated from presentation)
  const { cards, isLoading, error } = useDeveloperHub({
    url: dataUrl,
    enableFetch,
  });

  // Show loading
  if (isLoading) {
    return (
      <section 
        data-theme={theme} 
        aria-label="Developer Hub"
        aria-busy="true">
        <div className="container">
          <Loading text="Loading resources..." />
        </div>
      </section>
    );
  }

  // Show error
  if (error) {
    return (
      <section 
        data-theme={theme} 
        aria-label="Developer Hub">
        <div className="container">
          <div role="alert" aria-live="assertive" aria-atomic="true">
            <p>Error loading resources: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  // Render presentational component
  return (
    <CardSection
      title="Developer Hub"
      subtitle="Documentation, training, and resources to help you get the most out of the Z-API Platform"
      cards={cards}
      linkText={CARD_LINK_TEXTS.LEARN_MORE}
      theme={theme}
      aria-label="Developer Hub"
      aria-labelledby="developer-hub-title"
    />
  );
}