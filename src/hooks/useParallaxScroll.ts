import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Opções para o hook useParallaxScroll
 */
type UseParallaxScrollOptions = {
  /** Se deve desabilitar o parallax (útil para prefers-reduced-motion) */
  disabled?: boolean;
  /** Se deve desabilitar quando elemento não está visível */
  disableWhenInvisible?: boolean;
  /** Threshold mínimo de scroll para atualizar (em pixels, padrão: 1) */
  scrollThreshold?: number;
  /** Velocidade do parallax (0-1, padrão: 0.3) */
  speed?: number;
  /** Offset máximo em pixels (padrão: 20) */
  maxOffset?: number;
  /** Ref do elemento a ser observado (opcional, se não fornecido cria um interno) */
  elementRef?: RefObject<HTMLElement | null>;
};

/**
 * Hook customizado para parallax scroll otimizado.
 * 
 * Usa IntersectionObserver para desabilitar quando elemento não está visível,
 * requestAnimationFrame para performance, e throttling para reduzir re-renders.
 * 
 * @param options - Opções de configuração do parallax
 * @param options.elementRef - Ref do elemento a ser observado (deve ser conectado ao elemento no JSX)
 * @returns Tuple com [scrollY, isVisible]
 * 
 * @example
 * ```tsx
 * const sectionRef = useParallaxRef();
 * const [scrollY, isVisible] = useParallaxScroll({
 *   elementRef: sectionRef,
 *   disabled: false,
 *   disableWhenInvisible: true,
 *   speed: 0.3,
 *   maxOffset: 20
 * });
 * 
 * return <section ref={sectionRef}>...</section>;
 * ```
 */
export function useParallaxScroll(
  options: UseParallaxScrollOptions = {}
): [number, boolean] {
  const {
    disabled = false,
    disableWhenInvisible = true,
    scrollThreshold = 1,
    speed = 0.3,
    maxOffset = 20,
    elementRef: externalRef,
  } = options;

  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  // Usar ref externo se fornecido, senão criar um interno (para compatibilidade)
  const internalRef = useRef<HTMLElement>(null);
  const elementRef = externalRef || internalRef;
  const rafIdRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Throttle mais agressivo: atualizar no máximo a cada 16ms (60fps)
  const throttleDelayRef = useRef(16);
  // Ref para isVisible para evitar dependência circular no useEffect
  const isVisibleRef = useRef(true);

  // Atualizar ref quando isVisible mudar (evita dependência circular)
  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    // Se desabilitado, não fazer nada
    if (disabled) {
      setScrollY(0);
      setIsVisible(false);
      isVisibleRef.current = false;
      return;
    }

    // IntersectionObserver é configurado em um useEffect separado abaixo
    // para garantir que o elemento esteja conectado ao DOM

    // Handler de scroll otimizado com requestAnimationFrame e throttling agressivo
    let lastUpdateTime = 0;
    const handleScroll = () => {
      const now = performance.now();
      const timeSinceLastUpdate = now - lastUpdateTime;

      // Throttling: apenas atualizar se passou tempo suficiente (16ms = 60fps)
      if (timeSinceLastUpdate < throttleDelayRef.current) {
        return;
      }

      // Cancelar RAF anterior se ainda estiver pendente
      if (rafIdRef.current !== null) {
        return;
      }

      rafIdRef.current = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        const scrollDelta = Math.abs(scrollPosition - lastScrollYRef.current);

        // Apenas atualizar se scroll mudou significativamente E elemento está visível
        // Usar ref ao invés de isVisible diretamente para evitar re-renders
        if (scrollDelta >= scrollThreshold && isVisibleRef.current) {
          // Limitar scrollY ao máximo necessário (performance)
          const clampedScrollY = Math.min(scrollPosition, maxOffset / speed);
          setScrollY(clampedScrollY);
          lastScrollYRef.current = scrollPosition;
          lastUpdateTime = now;
        }

        rafIdRef.current = null;
      });
    };

    // Adicionar listener de scroll com passive para melhor performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Chamar uma vez para inicializar
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [disabled, scrollThreshold, speed, maxOffset]);

  // Ref para armazenar o IntersectionObserver (para cleanup adequado)
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  // useEffect separado para configurar IntersectionObserver quando o elemento for conectado
  useEffect(() => {
    if (disabled || !disableWhenInvisible) {
      // Se desabilitado, desconectar observer existente
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
        intersectionObserverRef.current = null;
      }
      return;
    }

    const supportsIntersectionObserver =
      typeof window !== 'undefined' && 'IntersectionObserver' in window;

    if (!supportsIntersectionObserver) return;

    // Função para configurar o observer
    const setupObserver = () => {
      if (elementRef.current && !intersectionObserverRef.current) {
        intersectionObserverRef.current = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry) {
              setIsVisible(entry.isIntersecting);
              if (!entry.isIntersecting) {
                setScrollY(0);
              }
            }
          },
          {
            threshold: 0,
            rootMargin: '50px',
          }
        );

        intersectionObserverRef.current.observe(elementRef.current);
      }
    };

    // Tentar configurar imediatamente
    setupObserver();

    // Se ainda não estiver disponível, aguardar alguns frames
    let timeoutId: NodeJS.Timeout | null = null;
    if (!elementRef.current) {
      timeoutId = setTimeout(() => {
        setupObserver();
      }, 100);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
        intersectionObserverRef.current = null;
      }
    };
  }, [disabled, disableWhenInvisible, elementRef]);

  return [scrollY, isVisible];
}

/**
 * Hook para obter referência do elemento para parallax
 * 
 * @returns RefObject para o elemento que terá parallax aplicado
 */
export function useParallaxRef() {
  return useRef<HTMLElement>(null);
}

