/**
 * useLearningResources - Custom Hook (Modern Approach)
 * 
 * Responsibility: Data logic for LearningResources
 * - Manages card data
 * - Can fetch data in the future
 * - Returns data ready for use
 * 
 * Follows the Container/Presentational pattern as per:
 * https://www.patterns.dev/react/presentational-container-pattern/
 * 
 * This is the recommended approach for React 18+.
 */

import { useEffect, useMemo, useState } from 'react';
import type { CardItem } from '@site/src/types';
import { BookOpen, GraduationCap, Trophy } from 'lucide-react';

/**
 * Configuration options for useLearningResources hook
 */
type UseLearningResourcesOptions = {
  /** URL for data fetching (optional) */
  url?: string;
  /** Custom function for data fetching (optional) */
  fetchFn?: () => Promise<CardItem[]>;
  /** Whether to fetch data */
  enableFetch?: boolean;
};

/**
 * Return type of useLearningResources hook
 */
type UseLearningResourcesReturn = {
  /** Array of learning resource cards */
  cards: CardItem[];
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
const DEFAULT_CARDS: CardItem[] = [
  {
    title: 'Z-API Discord Community',
    description:
      'Exchange technical insights with experienced developers, receive important update alerts, and participate in code reviews guided by specialized tech writers. Connect with the community.',
    link: 'https://discord.gg/zapi-oficial',
    icon: BookOpen,
  },
  {
    title: 'Blog Articles',
    description:
      'Explore didactic articles about instances, messages, webhooks, security, and automation. Learn fundamental concepts through simple analogies and practical step‑by‑step guides.',
    link: '/blog',
    icon: Trophy,
  },
  {
    title: 'Tutorials and Guides',
    description:
      'Learn how to use Z-API efficiently with detailed step‑by‑step tutorials and practical examples you can apply immediately in your projects. From basics to advanced.',
    link: '/docs/intro',
    icon: GraduationCap,
  },
];

/**
 * Custom Hook - useLearningResources
 * 
 * Manages the data logic for LearningResources.
 * Separates data logic from presentation.
 * 
 * Supports optional data fetching via URL or custom function.
 * 
 * @param options - Hook configuration options
 * @param options.url - URL for data fetching
 * @param options.fetchFn - Custom function for fetching
 * @param options.enableFetch - Whether to fetch (default: false)
 * @returns Object with cards, isLoading, error, and refetch
 * 
 * @example
 * ```tsx
 * // Basic usage (static data)
 * function LearningResources() {
 *   const { cards, isLoading } = useLearningResources();
 *   if (isLoading) return <Loading />;
 *   return <CardSection cards={cards} />;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // With data fetching
 * function LearningResources() {
 *   const { cards, isLoading, error } = useLearningResources({
 *     url: '/api/learning-resources',
 *     enableFetch: true
 *   });
 *   if (isLoading) return <Loading />;
 *   if (error) return <Error message={error.message} />;
 *   return <CardSection cards={cards} />;
 * }
 * ```
 */
export function useLearningResources(
  options: UseLearningResourcesOptions = {}
): UseLearningResourcesReturn {
  const { url, fetchFn, enableFetch = false } = options;

  const [cards, setCards] = useState<CardItem[]>(DEFAULT_CARDS);
  const [isLoading, setIsLoading] = useState(enableFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!enableFetch) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      let result: CardItem[];

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
            `useLearningResources: Received HTML instead of JSON. Status: ${res.status}. ` +
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
              `useLearningResources: Received HTML instead of JSON. Status: ${res.status}. ` +
              `This usually means the endpoint does not exist (404). ` +
              `First characters: ${text.substring(0, 100)}`
            );
          }
          
          try {
            result = JSON.parse(text);
          } catch (parseError) {
            throw new Error(
              `useLearningResources: Response is not valid JSON. Content-Type: ${contentType || 'not specified'}. ` +
              `First characters: ${text.substring(0, 50)}`
            );
          }
        }
      } else {
        throw new Error('useLearningResources: url or fetchFn must be provided when enableFetch=true');
      }

      setCards(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      // In case of error, fall back to default data
      setCards(DEFAULT_CARDS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, enableFetch]); // fetchFn not included to avoid unnecessary re-renders

  // Static data (when no fetch is used)
  const staticCards = useMemo(() => DEFAULT_CARDS, []);

  return {
    cards: enableFetch ? cards : staticCards,
    isLoading,
    error,
    refetch: fetchData,
  };
}