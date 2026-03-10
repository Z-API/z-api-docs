import React from 'react';
import HighlightBox, { HighlightBoxProps } from './HighlightBox';

export interface IdDisplayProps extends Omit<HighlightBoxProps, 'variant' | 'icon'> {
  /**
   * ID a ser exibido
   */
  id: string;
  /**
   * Tipo do ID (para personalização visual)
   */
  idType?: 'instance' | 'message' | 'reference' | 'order' | 'group' | 'contact' | 'generic';
}

/**
 * Componente especializado para exibir IDs
 * 
 * @example
 * ```tsx
 * <IdDisplay 
 *   id="3C01A3..."
 *   idType="instance"
 *   instructionText="ID da instância"
 * />
 * ```
 */
export default function IdDisplay({
  id,
  idType = 'generic',
  instructionText,
  ...props
}: IdDisplayProps): React.JSX.Element {
  return (
    <HighlightBox
      variant="id"
      icon="Hash"
      instructionText={instructionText}
      {...props}
    >
      {id}
    </HighlightBox>
  );
}
