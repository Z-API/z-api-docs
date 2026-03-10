/**
 * Exemplo de uso de HOCs no ProductCard
 * 
 * Este arquivo demonstra como aplicar HOCs seguindo o padrão do patterns.dev
 * https://www.patterns.dev/react/hoc-pattern/
 * 
 * NOTA: Este é um arquivo de exemplo. Para uso real, considere se Hooks
 * não seriam mais apropriados conforme recomendações do React 18+.
 */

import { withRipple, withErrorBoundary } from '@site/src/hocs';
import { useRippleEffect } from '@site/src/hooks/useRippleEffect';
import type { ProductCardProps } from '@site/src/components/ProductCard';
import clsx from 'clsx';
// Nota: styles seria importado do componente real
// import styles from '@site/src/components/ProductCard/styles.module.css';

/**
 * Versão original do ProductCard (sem HOCs)
 * Esta é a implementação atual que usa hooks diretamente
 */
function ProductCardOriginal({
  // icon: Icon,
  title,
  description,
  // link,
  // linkLabel,
  className,
}: ProductCardProps) {
  // Lógica de ripple usando hook diretamente
  const [ripples, handleRippleClick] = useRippleEffect();

  // Nota: styles seria importado do componente real
  // Por enquanto, usando classes inline para exemplo
  const cardStyles = { padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' };
  const rippleStyles = { position: 'absolute' as const, borderRadius: '50%', background: 'rgba(0,0,0,0.1)' };

  return (
    <article 
      className={clsx(className)}
      style={cardStyles}
      onClick={handleRippleClick}
      role="article"
      aria-label={`${title} - ${description}`}>
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            ...rippleStyles,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
          aria-hidden="true"
        />
      ))}
      {/* Resto do componente... */}
    </article>
  );
}

/**
 * Versão usando HOC withRipple
 * 
 * Vantagens:
 * - Lógica de ripple encapsulada
 * - Componente original mais limpo
 * - Reutilização fácil em outros componentes
 * 
 * Desvantagens:
 * - Adiciona uma camada de wrapping
 * - Pode dificultar debugging no React DevTools
 */
// Exemplo de HOC - não usado diretamente, apenas para demonstração
// @ts-expect-error - Exemplo de código, não usado
const ProductCardWithRippleHOC = withRipple(ProductCardOriginal, {
  duration: 600,
  rippleClassName: 'product-card-ripple'
});

/**
 * Versão com múltiplos HOCs compostos
 * 
 * Demonstra composição de HOCs conforme padrão do patterns.dev
 */
// Exemplo de HOC composto - não usado diretamente, apenas para demonstração
// @ts-expect-error - Exemplo de código, não usado
const ProductCardWithHOCs = withErrorBoundary(
  withRipple(ProductCardOriginal, {
    duration: 600
  }),
  {
    onError: (_error, _errorInfo) => {
      // console.error('Erro no ProductCard:', error);
      // Enviar para serviço de logging
    },
    fallback: <div>Erro ao carregar card</div>
  }
);

/**
 * RECOMENDAÇÃO: Em React 18+, prefira Hooks sobre HOCs
 * 
 * A versão atual usando useRippleEffect diretamente é preferível porque:
 * - Menos nesting (sem wrapper hell)
 * - Melhor debugging no React DevTools
 * - Mais flexível para customização
 * - Alinhado com recomendações do React moderno
 * 
 * Use HOCs apenas quando:
 * - A mesma lógica não customizada precisa ser usada por MUITOS componentes
 * - O componente pode funcionar standalone, sem a lógica adicional
 */
