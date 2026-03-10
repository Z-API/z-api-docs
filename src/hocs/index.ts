/**
 * Higher Order Components (HOCs) para o projeto Z-API Central
 * 
 * Segue o padrão HOC do React conforme https://www.patterns.dev/react/hoc-pattern/
 * 
 * HOCs permitem reutilizar lógica de componentes sem duplicação de código.
 * Cada HOC encapsula uma funcionalidade específica que pode ser aplicada
 * a múltiplos componentes.
 * 
 * @module hocs
 */

export { withRipple, type WithRippleOptions } from './withRipple';
export { withLoader, type WithLoaderProps, type WithLoaderOptions } from './withLoader';
export { withErrorBoundary, type WithErrorBoundaryOptions } from './withErrorBoundary';

/**
 * Exemplo de composição de múltiplos HOCs:
 * 
 * ```tsx
 * const MyComponent = withErrorBoundary(
 *   withLoader(
 *     withRipple(OriginalComponent, { duration: 800 }),
 *     { url: '/api/data', loadingText: 'Carregando...' }
 *   ),
 *   { onError: (error) => console.error(error) }
 * );
 * ```
 * 
 * Nota: Em React moderno (18+), Hooks são geralmente preferidos sobre HOCs
 * para reutilização de lógica, pois reduzem nesting e melhoram debugging.
 * Use HOCs quando:
 * - A mesma lógica não customizada precisa ser usada por muitos componentes
 * - O componente pode funcionar standalone, sem a lógica adicional
 */
