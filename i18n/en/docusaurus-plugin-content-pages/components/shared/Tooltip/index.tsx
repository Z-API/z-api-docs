import { useReducedMotion } from '@site/src/hooks/useReducedMotion';
import clsx from 'clsx';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Posições disponíveis para o tooltip
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Props do componente Tooltip
 */
type TooltipProps = {
  /** Conteúdo do tooltip */
  content: ReactNode;
  /** Elemento que aciona o tooltip */
  children: ReactNode;
  /** Posição do tooltip (top, bottom, left, right) */
  position?: TooltipPosition;
  /** Delay antes de mostrar (ms) */
  delay?: number;
  /** Se o tooltip está desabilitado */
  disabled?: boolean;
  /** Classe CSS adicional */
  className?: string;
  /** Se deve mostrar sempre (não apenas no hover) */
  alwaysVisible?: boolean;
};

/**
 * Componente Tooltip - Exibe informações adicionais ao passar o mouse.
 * 
 * Tooltip acessível que aparece ao passar o mouse sobre um elemento.
 * Suporta múltiplas posições e é totalmente acessível via teclado.
 * 
 * @param props - Props do componente Tooltip
 * @param props.content - Conteúdo do tooltip
 * @param props.children - Elemento que aciona o tooltip
 * @param props.position - Posição do tooltip (padrão: 'top')
 * @param props.delay - Delay antes de mostrar (padrão: 200ms)
 * @param props.disabled - Se o tooltip está desabilitado
 * @param props.className - Classe CSS adicional
 * @param props.alwaysVisible - Se deve mostrar sempre
 * @returns Componente React renderizado
 * 
 * @example
 * ```tsx
 * // Tooltip simples
 * <Tooltip content="Informação adicional">
 *   <button>Hover me</button>
 * </Tooltip>
 * 
 * // Tooltip com posição customizada
 * <Tooltip content="Tooltip à direita" position="right">
 *   <span>Hover me</span>
 * </Tooltip>
 * 
 * // Tooltip sempre visível
 * <Tooltip content="Sempre visível" alwaysVisible>
 *   <div>Conteúdo</div>
 * </Tooltip>
 * ```
 */
export default function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  disabled = false,
  className,
  alwaysVisible = false,
}: TooltipProps): ReactNode {
  const [isVisible, setIsVisible] = useState(alwaysVisible);
  const [tooltipId] = useState(() => `tooltip-${Math.random().toString(36).substr(2, 9)}`);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (disabled || alwaysVisible) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (alwaysVisible) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setIsVisible(false);
  };

  // Cleanup timeout ao desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Usar hook customizado para prefers-reduced-motion
  const reducedMotion = useReducedMotion();

  return (
    <div
      ref={containerRef}
      className={clsx(styles.tooltipContainer, className)}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}>
      {children}
      {(isVisible || alwaysVisible) && !disabled && (
        <div
          id={tooltipId}
          role="tooltip"
          className={clsx(
            styles.tooltip,
            styles[position],
            reducedMotion && styles.noAnimation
          )}
          aria-hidden={alwaysVisible ? 'false' : undefined}>
          <div className={styles.tooltipContent}>{content}</div>
          <div className={clsx(styles.tooltipArrow, styles[`arrow${position.charAt(0).toUpperCase() + position.slice(1)}`])} />
        </div>
      )}
    </div>
  );
}

