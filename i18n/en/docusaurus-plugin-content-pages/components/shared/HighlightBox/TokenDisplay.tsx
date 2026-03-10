import React from 'react';
import HighlightBox, { HighlightBoxProps } from './HighlightBox';

export interface TokenDisplayProps extends Omit<HighlightBoxProps, 'variant' | 'icon'> {
  /**
   * Token a ser exibido
   */
  token: string;
  /**
   * Tipo do token (opcional, para personalização)
   */
  tokenType?: 'client' | 'instance' | 'api';
}

/**
 * Componente especializado para exibir tokens
 * 
 * @example
 * ```tsx
 * <TokenDisplay 
 *   token="Client-Token"
 *   instructionText="Use este token no header"
 * />
 * ```
 */
export default function TokenDisplay({
  token,
  tokenType = 'client',
  instructionText,
  ...props
}: TokenDisplayProps): React.JSX.Element {
  return (
    <HighlightBox
      variant="token"
      icon="Key"
      instructionText={instructionText}
      {...props}
    >
      {token}
    </HighlightBox>
  );
}
