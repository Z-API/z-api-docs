import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import HighlightBox, { HighlightBoxProps } from './HighlightBox';

export interface ResponseBodyDisplayProps extends Omit<HighlightBoxProps, 'variant' | 'icon'> {
  /**
   * Conteúdo JSON da resposta (string ou objeto)
   */
  response: string | object;
  /**
   * Código de status HTTP (opcional)
   */
  statusCode?: number;
  /**
   * Se deve formatar o JSON automaticamente
   * @default true
   */
  format?: boolean;
}

/**
 * Componente especializado para exibir response body (JSON)
 * 
 * @example
 * ```tsx
 * <ResponseBodyDisplay 
 *   response={{ messageId: "3EB0C767F26A", status: "queued" }}
 *   statusCode={200}
 *   instructionText="Resposta da API"
 * />
 * ```
 */
export default function ResponseBodyDisplay({
  response,
  statusCode,
  format = true,
  instructionText,
  ...props
}: ResponseBodyDisplayProps): React.JSX.Element {
  // Converter objeto para string JSON formatada
  let displayResponse: string;
  let copyResponse: string;

  if (typeof response === 'object') {
    try {
      displayResponse = format 
        ? JSON.stringify(response, null, 2)
        : JSON.stringify(response);
      copyResponse = JSON.stringify(response);
    } catch {
      displayResponse = String(response);
      copyResponse = String(response);
    }
  } else {
    // Se já é string, tentar formatar se for JSON válido
    try {
      const parsed = JSON.parse(response);
      displayResponse = format 
        ? JSON.stringify(parsed, null, 2)
        : response;
      copyResponse = response;
    } catch {
      displayResponse = response;
      copyResponse = response;
    }
  }

  const statusText = statusCode 
    ? `${statusCode} ${getStatusText(statusCode)} - ` 
    : '';

  return (
    <HighlightBox
      variant="code"
      icon="FileCode"
      instructionText={instructionText || `${statusText}Resposta da API (JSON)`}
      copyText={copyResponse}
      copyable={false} // CodeBlock já tem botão de copiar
      {...props}
    >
      <CodeBlock language="json" showLineNumbers={false}>
        {displayResponse}
      </CodeBlock>
    </HighlightBox>
  );
}

/**
 * Retorna texto descritivo para código de status HTTP
 */
function getStatusText(code: number): string {
  const statusTexts: Record<number, string> = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
  };
  return statusTexts[code] || 'Status';
}
