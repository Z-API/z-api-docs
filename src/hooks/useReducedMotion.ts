import { useEffect, useState } from 'react';

/**
 * Hook customizado para verificar preferência de movimento reduzido.
 * 
 * Detecta se o usuário prefere movimento reduzido através da media query
 * `prefers-reduced-motion: reduce` e atualiza automaticamente quando a
 * preferência muda.
 * 
 * Útil para desabilitar animações quando o usuário prefere movimento reduzido,
 * melhorando acessibilidade e experiência do usuário.
 * 
 * @returns `true` se o usuário prefere movimento reduzido, `false` caso contrário
 * 
 * @example
 * ```tsx
 * const reducedMotion = useReducedMotion();
 * 
 * return (
 *   <motion.div
 *     animate={reducedMotion ? {} : { scale: 1.1 }}
 *   >
 *     Content
 *   </motion.div>
 * );
 * ```
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Verificar se está no cliente (SSR)
    if (typeof window === 'undefined') {
      return;
    }

    // Verificar se o navegador suporta matchMedia
    if (!('matchMedia' in window)) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Definir estado inicial
    setReducedMotion(mediaQuery.matches);

    // Handler para mudanças na preferência
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    // Adicionar listener (suporta addEventListener em navegadores modernos)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback para navegadores antigos
      mediaQuery.addListener(handleChange);
    }

    // Cleanup: remover listener
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback para navegadores antigos
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return reducedMotion;
}

