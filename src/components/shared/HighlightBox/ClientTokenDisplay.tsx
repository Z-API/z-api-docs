import React from 'react';
import HighlightBox, { HighlightBoxProps } from './HighlightBox';

export interface ClientTokenDisplayProps extends Omit<HighlightBoxProps, 'variant' | 'icon' | 'children'> {
  /**
   * Texto do token a ser exibido
   * @default "Client - Token"
   */
  tokenText?: string;
  /**
   * Variante visual do componente (compatibilidade com versão antiga)
   * @default "default"
   */
  variant?: 'default' | 'compact' | 'highlighted';
  /**
   * Se o componente deve ser interativo (copiável)
   * @default true
   */
  interactive?: boolean;
}

/**
 * Componente especializado para exibir o Client-Token
 * 
 * Agora parte do módulo global HighlightBox, mantendo compatibilidade com a API anterior.
 * 
 * @example
 * ```tsx
 * <ClientTokenDisplay />
 * ```
 * 
 * @example
 * ```tsx
 * <ClientTokenDisplay 
 *   instructionText="Use este token no header da requisição"
 *   variant="highlighted"
 * />
 * ```
 */
export default function ClientTokenDisplay({
  instructionText = 'Verifique se está usando o token correto no header',
  tokenText = 'Client - Token',
  interactive = true,
  variant = 'default',
  className,
  ...props
}: ClientTokenDisplayProps): React.JSX.Element {
  // Mapear variantes antigas para novas
  const highlightVariant = variant === 'highlighted' ? 'highlighted' : variant === 'compact' ? 'compact' : 'token';

  return (
    <HighlightBox
      variant={highlightVariant}
      icon="Key"
      instructionText={instructionText}
      copyable={interactive}
      copyText={tokenText}
      className={className}
      {...props}
    >
      {tokenText}
    </HighlightBox>
  );
}
