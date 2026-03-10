import { useEffect, useState } from 'react';

/**
 * Lightweight hook that mirrors the CSS media query
 * `prefers-reduced-motion` so components can gracefully
 * disable heavy animations when necessary.
 */
export const usePrefersReducedMotion = (): boolean => {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduce(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setShouldReduce(event.matches);
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return shouldReduce;
};


