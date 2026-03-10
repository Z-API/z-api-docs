/**
 * useToggle - Hook para estado boolean toggle
 * 
 * Hook reutilizável para gerenciar estado boolean com função toggle.
 * Útil para modais, accordions, switches, etc.
 * 
 * @example
 * ```tsx
 * const [isOpen, toggle, open, close] = useToggle(false);
 * 
 * return (
 *   <button onClick={toggle}>
 *     {isOpen ? 'Fechar' : 'Abrir'}
 *   </button>
 * );
 * ```
 */

import { useCallback, useState } from 'react';

export type UseToggleReturn = [
  /** Estado atual (boolean) */
  boolean,
  /** Função para alternar estado */
  () => void,
  /** Função para definir como true */
  () => void,
  /** Função para definir como false */
  () => void,
];

/**
 * Hook para gerenciar estado boolean com toggle
 * 
 * @param initialValue - Valor inicial (padrão: false)
 * @returns [valor, toggle, setTrue, setFalse]
 * 
 * @example
 * ```tsx
 * // Uso básico
 * const [isOpen, toggle] = useToggle();
 * 
 * // Com valor inicial
 * const [isEnabled, toggle, enable, disable] = useToggle(true);
 * 
 * return (
 *   <>
 *     <button onClick={toggle}>Toggle</button>
 *     <button onClick={enable}>Enable</button>
 *     <button onClick={disable}>Disable</button>
 *     <p>Estado: {isEnabled ? 'Ativo' : 'Inativo'}</p>
 *   </>
 * );
 * ```
 */
export function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setTrue, setFalse];
}
