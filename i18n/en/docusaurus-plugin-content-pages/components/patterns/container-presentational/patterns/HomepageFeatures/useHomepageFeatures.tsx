/**
 * useHomepageFeatures - Custom Hook (Modern Approach)
 * 
 * Responsibility: Data logic for HomepageFeatures
 * - Manages feature data
 * - Can fetch data in the future
 * - Returns data ready for use
 * 
 * Follows the Container/Presentational pattern as per:
 * https://www.patterns.dev/react/presentational-container-pattern/
 */

import { useEffect, useMemo, useState } from 'react';
import type { FeatureItem } from '@site/src/types';
import { Rocket, Shield, Zap } from 'lucide-react';

/**
 * Feature type with icon
 */
type FeatureWithIcon = FeatureItem & {
  icon: typeof Zap;
};

/**
 * Configuration options for useHomepageFeatures hook
 */
type UseHomepageFeaturesOptions = {
  /** URL for data fetching (optional) */
  url?: string;
  /** Custom function for data fetching (optional) */
  fetchFn?: () => Promise<FeatureWithIcon[]>;
  /** Whether to fetch data */
  enableFetch?: boolean;
};

/**
 * Return type of useHomepageFeatures hook
 */
type UseHomepageFeaturesReturn = {
  /** Array of features */
  features: FeatureWithIcon[];
  /** Whether data is loading */
  isLoading: boolean;
  /** Error that occurred */
  error: Error | null;
  /** Function to reload data */
  refetch: () => void;
};

/**
 * Default data (fallback when no fetch is performed)
 */
const DEFAULT_FEATURES: FeatureWithIcon[] = [
  {
    title: 'Automate customer service flows',
    description: (
      <>
        Customizable chatbots and REST APIs to create interactive experiences
        without upgrades or maintenance. Integrate with any stack: CRMs, ERPs,
        web platforms, mobile, gateways, or proprietary architectures.
      </>
    ),
    icon: Zap,
  },
  {
    title: 'Test without code using Swagger',
    description: (
      <>
        Use Swagger to test our API without writing code.
        Ideal for validating routes, parameters, and responses in real time.
        Run your first tests directly via Postman.
      </>
    ),
    icon: Rocket,
  },
  {
    title: 'Scalability and support',
    description: (
      <>
        Manage multiple instances in parallel with robust authentication
        and horizontal scalability. 24/7 national support, clear documentation,
        and a true partnership.
      </>
    ),
    icon: Shield,
  },
];

/**
 * Custom Hook - useHomepageFeatures
 * 
 * Manages the data logic for homepage features.
 * Separates data logic from presentation.
 * 
 * Supports optional data fetching via URL or custom function.
 * 
 * @param options - Hook configuration options
 * @param options.url - URL for data fetching
 * @param options.fetchFn - Custom function for fetching
 * @param options.enableFetch - Whether to fetch (default: false)
 * @returns Object with features, isLoading, error, and refetch
 * 
 * @example
 * ```tsx
 * // Basic usage (static data)
 * function HomepageFeatures() {
 *   const { features, isLoading } = useHomepageFeatures();
 *   if (isLoading) return <Loading />;
 *   return features.map(feature => <Feature key={feature.title} {...feature} />);
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // With data fetching
 * function HomepageFeatures() {
 *   const { features, isLoading, error } = useHomepageFeatures({
 *     url: '/api/homepage-features',
 *     enableFetch: true
 *   });
 *   if (isLoading) return <Loading />;
 *   if (error) return <Error message={error.message} />;
 *   return features.map(feature => <Feature key={feature.title} {...feature} />);
 * }
 * ```
 */
export function useHomepageFeatures(
  options: UseHomepageFeaturesOptions = {}
): UseHomepageFeaturesReturn {
  const { url, fetchFn, enableFetch = false } = options;

  const [features, setFeatures] = useState<FeatureWithIcon[]>(DEFAULT_FEATURES);
  const [isLoading, setIsLoading] = useState(enableFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!enableFetch) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      let result: FeatureWithIcon[];

      if (fetchFn) {
        result = await fetchFn();
      } else if (url) {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        // Check Content-Type before parsing JSON
        const contentType = res.headers.get('content-type');
        
        // Check if response is HTML (usually indicates 404 or error)
        if (contentType && contentType.includes('text/html')) {
          const text = await res.text();
          throw new Error(
            `useHomepageFeatures: Received HTML instead of JSON. Status: ${res.status}. ` +
            `This usually means the endpoint does not exist (404). ` +
            `First characters: ${text.substring(0, 100)}`
          );
        }
        
        if (contentType && contentType.includes('application/json')) {
          result = await res.json();
        } else {
          // If not JSON, try to parse anyway (might be JSON text without header)
          const text = await res.text();
          
          // Check if it starts with HTML (404 error indicator)
          if (text.trim().toLowerCase().startsWith('<!doctype') || text.trim().toLowerCase().startsWith('<html')) {
            throw new Error(
              `useHomepageFeatures: Received HTML instead of JSON. Status: ${res.status}. ` +
              `This usually means the endpoint does not exist (404). ` +
              `First characters: ${text.substring(0, 100)}`
            );
          }
          
          try {
            result = JSON.parse(text);
          } catch (parseError) {
            throw new Error(
              `useHomepageFeatures: Response is not valid JSON. Content-Type: ${contentType || 'not specified'}. ` +
              `First characters: ${text.substring(0, 50)}`
            );
          }
        }
      } else {
        throw new Error('useHomepageFeatures: url or fetchFn must be provided when enableFetch=true');
      }

      setFeatures(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      // In case of error, fall back to default data
      setFeatures(DEFAULT_FEATURES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, enableFetch]); // fetchFn not included to avoid unnecessary re-renders

  // Static data (when no fetch is used)
  const staticFeatures = useMemo(() => DEFAULT_FEATURES, []);

  return {
    features: enableFetch ? features : staticFeatures,
    isLoading,
    error,
    refetch: fetchData,
  };
}