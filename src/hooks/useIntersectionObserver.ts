import { useEffect, useRef, useState, type RefObject } from 'react';
import { getOptimalRootMargin, getOptimalThreshold } from './useIntersectionObserver/utils';

/**
 * Opções para o hook useIntersectionObserver
 */
type UseIntersectionObserverOptions = {
  /** Threshold para disparar a observação (0-1) ou 'auto' para cálculo automático */
  threshold?: number | 'auto';
  /** Root margin para ajustar a área de detecção ou 'auto' para cálculo automático */
  rootMargin?: string | 'auto';
  /** Se deve disparar apenas uma vez */
  triggerOnce?: boolean;
  /** Se deve desabilitar a observação (útil para prefers-reduced-motion) */
  disabled?: boolean;
};

/**
 * Hook customizado para Intersection Observer.
 * 
 * Detecta quando um elemento entra na viewport e dispara animações.
 * Otimizado para performance com cleanup automático e suporte a prefers-reduced-motion.
 * 
 * Funções utilitárias foram extraídas para `utils.ts` para melhor organização.
 * 
 * @param options - Opções de configuração do Intersection Observer
 * @returns Tuple com [ref, isIntersecting]
 * 
 * @example
 * ```tsx
 * const [ref, isIntersecting] = useIntersectionObserver({
 *   threshold: 0.1,
 *   triggerOnce: true
 * });
 * 
 * return <div ref={ref} className={isIntersecting ? 'animate' : ''}>Content</div>;
 * ```
 */

/**
 * Retorno do hook useIntersectionObserver
 */
type UseIntersectionObserverReturn = [RefObject<HTMLElement>, boolean];

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const {
    threshold: thresholdOption = 0.1,
    rootMargin: rootMarginOption = '0px',
    triggerOnce = true,
    disabled = false,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Verificar se deve desabilitar (prefers-reduced-motion)
    if (disabled) {
      // Se desabilitado, marcar como visível imediatamente
      setIsIntersecting(true);
      return;
    }

    // Verificar se o navegador suporta Intersection Observer
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback: marcar como visível imediatamente em navegadores antigos
      setIsIntersecting(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Calcular threshold e rootMargin otimizados
    const threshold = thresholdOption === 'auto' 
      ? getOptimalThreshold(element)
      : thresholdOption;
    
    const rootMargin = rootMarginOption === 'auto'
      ? getOptimalRootMargin()
      : rootMarginOption;

    // Debounce para múltiplas entradas (evitar re-renders desnecessários)
    let debounceTimeout: NodeJS.Timeout;

    // Criar Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        // Verificar se entry existe
        if (!entry) return;
        
        // Debounce para evitar múltiplas atualizações rápidas
        // Aumentado para 50ms para melhor performance em animações
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            
            // Se triggerOnce, desconectar após primeira detecção
            if (triggerOnce) {
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            setIsIntersecting(false);
          }
        }, 50); // 50ms debounce (otimizado para animações)
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Observar elemento
    observer.observe(element);

    // Cleanup: desconectar observer quando componente desmontar
    return () => {
      clearTimeout(debounceTimeout);
      observer.disconnect();
    };
  }, [thresholdOption, rootMarginOption, triggerOnce, disabled]);

  // Type assertion segura: ref será atribuído a um elemento HTMLElement válido
  return [elementRef as RefObject<HTMLElement>, isIntersecting];
}

