/**
 * useLocalStorage - Hook para localStorage
 * 
 * Hook reutilizável para sincronizar estado com localStorage.
 * Útil para persistir preferências do usuário, dados de sessão, etc.
 * 
 * @example
 * ```tsx
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * 
 * return (
 *   <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
 *     Tema: {theme}
 *   </button>
 * );
 * ```
 */

import { useCallback, useEffect, useState } from 'react';

/**
 * Hook para sincronizar estado com localStorage
 * 
 * @param key - Chave do localStorage
 * @param initialValue - Valor inicial (se não existir no localStorage)
 * @returns [valor, setValue, remove]
 * 
 * @example
 * ```tsx
 * // Uso básico
 * const [user, setUser] = useLocalStorage<User>('user', null);
 * 
 * // Com parser customizado
 * const [settings, setSettings] = useLocalStorage<Settings>(
 *   'settings',
 *   defaultSettings,
 *   {
 *     parser: JSON.parse,
 *     stringifier: JSON.stringify
 *   }
 * );
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    /** Função para parsear valor do localStorage */
    parser?: (value: string) => T;
    /** Função para serializar valor para localStorage */
    stringifier?: (value: T) => string;
  }
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const { parser = JSON.parse, stringifier = JSON.stringify } = options || {};

  // Função para ler do localStorage
  const readValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      return parser(item);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, parser]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Função para setar valor
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, stringifier(valueToStore));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue, stringifier]
  );

  // Função para remover do localStorage
  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Sincronizar quando key mudar ou quando localStorage mudar (outra aba)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(parser(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, parser]);

  return [storedValue, setValue, remove];
}
