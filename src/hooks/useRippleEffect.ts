import { useCallback, useState } from 'react';

/**
 * Posição e tamanho do ripple com ID único
 */
type RipplePosition = {
  id: string;
  x: number;
  y: number;
  size: number;
};

/**
 * Opções para o hook useRippleEffect
 */
type UseRippleEffectOptions = {
  /** Duração da animação em ms (padrão: 600) */
  duration?: number;
  /** Se deve desabilitar o ripple (útil para prefers-reduced-motion) */
  disabled?: boolean;
};

/**
 * Hook customizado para efeito ripple usando React state.
 * 
 * Retorna posição e tamanho do ripple, e função para criar ripple no click.
 * Usa React state ao invés de DOM manipulation direta.
 * 
 * @param options - Opções de configuração do ripple
 * @returns Tuple com [ripples, handleClick]
 * 
 * @example
 * ```tsx
 * const [ripples, handleClick] = useRippleEffect();
 * 
 * return (
 *   <div onClick={handleClick}>
 *     {ripples.map((ripple, i) => (
 *       <span key={i} style={{...}} />
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useRippleEffect(
  options: UseRippleEffectOptions = {}
): [RipplePosition[], (e: React.MouseEvent<HTMLElement>) => void] {
  const { duration = 600, disabled = false } = options;
  const [ripples, setRipples] = useState<RipplePosition[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;

      // Verificar se reduced motion está ativo
      if (typeof window !== 'undefined') {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      // Gerar ID único baseado em timestamp + random
      const id = `ripple-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Adicionar novo ripple com ID único
      const newRipple: RipplePosition = { id, x, y, size };
      setRipples((prev) => [...prev, newRipple]);

      // Remover após animação usando ID
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, duration);
    },
    [disabled, duration]
  );

  return [ripples, handleClick];
}

