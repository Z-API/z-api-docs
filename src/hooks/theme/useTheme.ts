/**
 * Hook useTheme - Gerenciamento de tema
 * 
 * Hook customizado para gerenciar tema do design system.
 * Suporta persistência em localStorage e sincronização entre abas.
 */

import { useEffect, useState } from 'react';
import type { Theme } from '@site/src/types';

/**
 * Opções do hook useTheme
 */
type UseThemeOptions = {
  /** Tema inicial (padrão: 'classic') */
  initialTheme?: Theme;
  /** Chave para localStorage (padrão: 'zapi-theme') */
  storageKey?: string;
  /** Se deve persistir em localStorage (padrão: true) */
  persist?: boolean;
};

/**
 * Hook useTheme - Gerencia tema do design system
 * 
 * @param options - Opções do hook
 * @returns Tema atual e função para alterar tema
 * 
 * @example
 * ```tsx
 * const { theme, setTheme } = useTheme();
 * 
 * return (
 *   <div data-theme={theme}>
 *     <button onClick={() => setTheme('zapi')}>Mudar tema</button>
 *   </div>
 * );
 * ```
 */
export function useTheme(options: UseThemeOptions = {}) {
  const {
    initialTheme = 'classic',
    storageKey = 'zapi-theme',
    persist = true,
  } = options;

  // Estado do tema
  const [theme, setThemeState] = useState<Theme>(() => {
    // Tentar carregar do localStorage
    if (persist && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored && ['classic', 'zapi', 'hybrid', 'official'].includes(stored)) {
          return stored as Theme;
        }
      } catch (error) {
        console.warn('Failed to load theme from localStorage:', error);
      }
    }
    return initialTheme;
  });

  // Função para alterar tema
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);

    // Persistir em localStorage
    if (persist && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
    }
  };

  // Sincronizar entre abas (storage event)
  useEffect(() => {
    if (!persist || typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        if (['classic', 'zapi', 'hybrid', 'official'].includes(e.newValue)) {
          setThemeState(e.newValue as Theme);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [storageKey, persist]);

  return {
    theme,
    setTheme,
  };
}
