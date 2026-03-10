import { ComponentType } from 'react';
import { useRippleEffect } from '@site/src/hooks/useRippleEffect';
import clsx from 'clsx';
import styles from './withRipple.module.css';

/**
 * Opções de configuração para o HOC withRipple
 */
export type WithRippleOptions = {
  /** Duração da animação em ms (padrão: 600) */
  duration?: number;
  /** Se deve desabilitar o ripple */
  disabled?: boolean;
  /** Classe CSS customizada para ripples */
  rippleClassName?: string;
};

/**
 * Higher Order Component que adiciona efeito ripple a qualquer componente.
 * 
 * Segue o padrão HOC do React conforme https://www.patterns.dev/react/hoc-pattern/
 * 
 * O HOC encapsula a lógica de ripple effect, permitindo reutilização
 * em múltiplos componentes sem duplicação de código.
 * 
 * @param Component - Componente a ser envolvido
 * @param options - Opções de configuração do ripple
 * @returns Componente envolvido com funcionalidade de ripple
 * 
 * @example
 * ```tsx
 * // Componente original
 * function MyCard({ title }: { title: string }) {
 *   return <div>{title}</div>;
 * }
 * 
 * // Aplicar HOC
 * const CardWithRipple = withRipple(MyCard);
 * 
 * // Usar componente
 * <CardWithRipple title="Meu Card" />
 * ```
 * 
 * @example
 * ```tsx
 * // Com opções customizadas
 * const CardWithRipple = withRipple(MyCard, {
 *   duration: 800,
 *   rippleClassName: 'custom-ripple'
 * });
 * ```
 */
export function withRipple<P extends object>(
  Component: ComponentType<P>,
  options: WithRippleOptions = {}
): ComponentType<P> {
  const { duration, disabled, rippleClassName } = options;

  return function WithRippleComponent(props: P) {
    const [ripples, handleRippleClick] = useRippleEffect({ duration, disabled });

    return (
      <div 
        className={clsx(styles.rippleContainer, rippleClassName)}
        onClick={handleRippleClick}>
        {/* Renderizar ripples */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className={styles.ripple}
            style={{
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
            }}
            aria-hidden="true"
          />
        ))}
        {/* Renderizar componente original com props */}
        <Component {...props} />
      </div>
    );
  };
}
