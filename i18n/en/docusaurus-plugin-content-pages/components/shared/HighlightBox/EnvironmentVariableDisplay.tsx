import React from 'react';
import HighlightBox, { HighlightBoxProps } from './HighlightBox';

export interface EnvironmentVariableDisplayProps extends Omit<HighlightBoxProps, 'variant' | 'icon'> {
  /**
   * Nome da variável de ambiente
   */
  variable: string;
  /**
   * Se deve incluir o prefixo process.env (ou equivalente)
   * @default true
   */
  includePrefix?: boolean;
  /**
   * Prefixo customizado (ex: "process.env", "os.getenv", etc.)
   * @default "process.env"
   */
  prefix?: string;
}

/**
 * Componente especializado para exibir variáveis de ambiente
 * 
 * @example
 * ```tsx
 * <EnvironmentVariableDisplay 
 *   variable="ZAPI_INSTANCE_ID"
 *   instructionText="Configure no seu .env"
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <EnvironmentVariableDisplay 
 *   variable="ZAPI_CLIENT_TOKEN"
 *   prefix="os.getenv"
 *   includePrefix={true}
 * />
 * ```
 */
export default function EnvironmentVariableDisplay({
  variable,
  includePrefix = true,
  prefix = 'process.env',
  instructionText,
  ...props
}: EnvironmentVariableDisplayProps): React.JSX.Element {
  const displayText = includePrefix ? `${prefix}.${variable}` : variable;
  const copyText = includePrefix ? `${prefix}.${variable}` : variable;

  return (
    <HighlightBox
      variant="env"
      icon="Terminal"
      instructionText={instructionText}
      copyText={copyText}
      {...props}
    >
      {displayText}
    </HighlightBox>
  );
}
