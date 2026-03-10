/**
 * Hook useScrollReveal - Animações de scroll reveal
 * 
 * Hook customizado para gerenciar animações de elementos que aparecem ao scroll.
 * Respeita prefers-reduced-motion e otimiza performance.
 */

import { useEffect, useRef, useState } from 'react';

/**
 * Opções do hook useScrollReveal
 */
type UseScrollRevealOptions = {
  /** Threshold de visibilidade (0-1, padrão: 0.1) */
  threshold?: number;
  /** Margem do root (padrão: '0px') */
  rootMargin?: string;
  /** Se deve animar apenas uma vez (padrão: true) */
  once?: boolean;
  /** Callback quando elemento entra na viewport */
  onReveal?: () => void;
  /** Se deve desabilitar animação (respeita prefers-reduced-motion) */
  disabled?: boolean;
};

/**
 * Hook useScrollReveal - Gerencia animações de scroll reveal
 * 
 * @param options - Opções do hook
 * @returns Ref para o elemento e estado de visibilidade
 * 
 * @example
 * ```tsx
 * const { ref, isVisible } = useScrollReveal({
 *   threshold: 0.2,
 *   once: true,
 * });
 * 
 * return (
 *   <div ref={ref} className={isVisible ? 'visible' : 'hidden'}>
 *     Conteúdo que aparece ao scroll
 *   </div>
 * );
 * ```
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true,
    onReveal,
    disabled = false,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Verificar se animações devem ser desabilitadas
    if (disabled) {
      setIsVisible(true);
      return;
    }

    // Verificar prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Se já foi revelado e once=true, não observar novamente
    if (hasRevealed && once) {
      return;
    }

    const element = elementRef.current;
    if (!element) {
      return;
    }

    // Criar IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasRevealed(true);
            onReveal?.();

            // Se once=true, parar de observar após revelar
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            // Se once=false, esconder quando sair da viewport
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, onReveal, disabled, hasRevealed]);

  return {
    ref: elementRef,
    isVisible,
    hasRevealed,
  };
}
