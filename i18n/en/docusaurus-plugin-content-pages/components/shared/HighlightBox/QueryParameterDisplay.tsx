import React from 'react';
import HighlightBox, { HighlightBoxProps } from './HighlightBox';

export interface QueryParameterDisplayProps extends Omit<HighlightBoxProps, 'variant' | 'icon'> {
  /**
   * Query parameters (com ou sem ?)
   */
  params: string;
}

/**
 * Componente especializado para exibir query parameters
 * 
 * @example
 * ```tsx
 * <QueryParameterDisplay 
 *   params="?page=1&limit=10"
 *   instructionText="Parâmetros de query"
 * />
 * ```
 */
export default function QueryParameterDisplay({
  params,
  instructionText,
  ...props
}: QueryParameterDisplayProps): React.JSX.Element {
  // Garantir que comece com ?
  const displayParams = params.startsWith('?') ? params : `?${params}`;

  return (
    <HighlightBox
      variant="query"
      icon="Search"
      instructionText={instructionText}
      {...props}
    >
      {displayParams}
    </HighlightBox>
  );
}
