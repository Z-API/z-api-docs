import { ComponentType, ReactNode } from 'react';
import ErrorBoundary from '@site/src/components/shared/ErrorBoundary';

/**
 * Opções de configuração para o HOC withErrorBoundary
 */
export type WithErrorBoundaryOptions = {
  /** Callback quando erro ocorre */
  onError?: (error: Error, errorInfo: { componentStack: string }) => void;
  /** Fallback customizado a ser renderizado em caso de erro */
  fallback?: ReactNode;
};

/**
 * Higher Order Component que adiciona Error Boundary a qualquer componente.
 * 
 * Segue o padrão HOC do React conforme https://www.patterns.dev/react/hoc-pattern/
 * 
 * O HOC envolve o componente com um Error Boundary, capturando erros
 * durante renderização, lifecycle methods, e construtores.
 * 
 * @param Component - Componente a ser envolvido
 * @param options - Opções de configuração do error boundary
 * @returns Componente envolvido com error boundary
 * 
 * @example
 * ```tsx
 * // Componente que pode lançar erro
 * function MyComponent({ data }: { data: unknown }) {
 *   if (!data) throw new Error('Data is required');
 *   return <div>{data}</div>;
 * }
 * 
 * // Aplicar HOC
 * const MyComponentWithErrorBoundary = withErrorBoundary(MyComponent);
 * 
 * // Usar componente
 * <MyComponentWithErrorBoundary data={someData} />
 * ```
 * 
 * @example
 * ```tsx
 * // Com callback customizado
 * const MyComponentWithErrorBoundary = withErrorBoundary(MyComponent, {
 *   onError: (error, errorInfo) => {
 *     console.error('Erro capturado:', error);
 *     // Enviar para serviço de logging
 *   },
 *   fallback: <div>Erro ao carregar componente</div>
 * });
 * ```
 */
export function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
): ComponentType<P> {
  const { onError, fallback } = options;

  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary onError={onError} fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
