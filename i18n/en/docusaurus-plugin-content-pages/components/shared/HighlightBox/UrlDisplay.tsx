import React from 'react';
import HighlightBox, { HighlightBoxProps } from './HighlightBox';

export interface UrlDisplayProps extends Omit<HighlightBoxProps, 'variant' | 'icon'> {
  /**
   * URL completa a ser exibida
   */
  url: string;
}

/**
 * Componente especializado para exibir URLs
 * 
 * @example
 * ```tsx
 * <UrlDisplay 
 *   url="https://api.z-api.io/instances/{instanceId}/status"
 *   instructionText="URL base da API"
 * />
 * ```
 */
export default function UrlDisplay({
  url,
  instructionText,
  ...props
}: UrlDisplayProps): React.JSX.Element {
  return (
    <HighlightBox
      variant="url"
      icon="Globe"
      instructionText={instructionText}
      {...props}
    >
      {url}
    </HighlightBox>
  );
}
