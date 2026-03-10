import React from 'react';
import HighlightBox, { HighlightBoxProps } from './HighlightBox';

export interface EndpointDisplayProps extends Omit<HighlightBoxProps, 'variant' | 'icon'> {
  /**
   * Método HTTP (GET, POST, PUT, DELETE, etc.)
   */
  method?: string;
  /**
   * Endpoint path
   */
  endpoint: string;
}

/**
 * Componente especializado para exibir endpoints HTTP
 * 
 * @example
 * ```tsx
 * <EndpointDisplay 
 *   method="POST"
 *   endpoint="/instances/{instanceId}/token/{token}/send-text"
 *   instructionText="Endpoint para enviar mensagem de texto"
 * />
 * ```
 */
export default function EndpointDisplay({
  method = 'GET',
  endpoint,
  instructionText,
  ...props
}: EndpointDisplayProps): React.JSX.Element {
  const fullEndpoint = method ? `${method.toUpperCase()} ${endpoint}` : endpoint;

  return (
    <HighlightBox
      variant="endpoint"
      icon="Link2"
      instructionText={instructionText}
      {...props}
    >
      {fullEndpoint}
    </HighlightBox>
  );
}
