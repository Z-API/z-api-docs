import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import HighlightBox, { HighlightBoxProps } from './HighlightBox';

export interface RequestBodyDisplayProps extends Omit<HighlightBoxProps, 'variant' | 'icon'> {
  /**
   * Conteúdo JSON do body (string ou objeto)
   */
  body: string | object;
  /**
   * Se deve formatar o JSON automaticamente
   * @default true
   */
  format?: boolean;
}

/**
 * Componente especializado para exibir request body (JSON)
 * 
 * @example
 * ```tsx
 * <RequestBodyDisplay 
 *   body={{ phone: "5511999999999", message: "Olá!" }}
 *   instructionText="Corpo da requisição"
 * />
 * ```
 */
export default function RequestBodyDisplay({
  body,
  format = true,
  instructionText,
  ...props
}: RequestBodyDisplayProps): React.JSX.Element {
  // Converter objeto para string JSON formatada
  let displayBody: string;
  let copyBody: string;

  if (typeof body === 'object') {
    try {
      displayBody = format 
        ? JSON.stringify(body, null, 2)
        : JSON.stringify(body);
      copyBody = JSON.stringify(body);
    } catch {
      displayBody = String(body);
      copyBody = String(body);
    }
  } else {
    // Se já é string, tentar formatar se for JSON válido
    try {
      const parsed = JSON.parse(body);
      displayBody = format 
        ? JSON.stringify(parsed, null, 2)
        : body;
      copyBody = body;
    } catch {
      displayBody = body;
      copyBody = body;
    }
  }

  return (
    <HighlightBox
      variant="code"
      icon="FileCode"
      instructionText={instructionText || 'Corpo da requisição (JSON)'}
      copyText={copyBody}
      copyable={false} // CodeBlock já tem botão de copiar
      {...props}
    >
      <CodeBlock language="json" showLineNumbers={false}>
        {displayBody}
      </CodeBlock>
    </HighlightBox>
  );
}
