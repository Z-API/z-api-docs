import React from 'react';
import HighlightBox, { HighlightBoxProps } from './HighlightBox';
import styles from './ParameterTableDisplay.module.css';

export interface Parameter {
  /**
   * Nome do parâmetro
   */
  name: string;
  /**
   * Tipo do parâmetro
   */
  type: string;
  /**
   * Se é obrigatório
   */
  required: boolean;
  /**
   * Descrição do parâmetro
   */
  description: string;
  /**
   * Exemplo de valor (opcional)
   */
  example?: string;
  /**
   * Valor padrão (opcional)
   */
  default?: string;
}

export interface ParameterTableDisplayProps extends Omit<HighlightBoxProps, 'variant' | 'icon' | 'children'> {
  /**
   * Array de parâmetros para exibir
   */
  parameters: Parameter[];
  /**
   * Título da tabela
   */
  title?: string;
  /**
   * Se deve destacar campos obrigatórios
   * @default true
   */
  highlightRequired?: boolean;
}

/**
 * Componente especializado para exibir tabelas de parâmetros de forma destacada
 * 
 * @example
 * ```tsx
 * <ParameterTableDisplay
 *   parameters={[
 *     { name: 'phone', type: 'string', required: true, description: 'Número do destinatário' },
 *     { name: 'message', type: 'string', required: true, description: 'Conteúdo da mensagem' }
 *   ]}
 *   title="Parâmetros do Body"
 * />
 * ```
 */
export default function ParameterTableDisplay({
  parameters,
  title,
  highlightRequired = true,
  instructionText,
  ...props
}: ParameterTableDisplayProps): React.JSX.Element {
  return (
    <HighlightBox
      variant="parameter"
      icon="Settings"
      instructionText={instructionText || title || 'Parâmetros'}
      copyable={false}
      {...props}
    >
      <div className={styles.tableWrapper}>
        <table className={styles.parameterTable}>
          <thead>
            <tr>
              <th>Campo</th>
              <th>Tipo</th>
              <th>Obrigatório</th>
              <th>Descrição</th>
              {parameters.some(p => p.example || p.default) && <th>Exemplo/Padrão</th>}
            </tr>
          </thead>
          <tbody>
            {parameters.map((param, index) => (
              <tr key={index} className={param.required && highlightRequired ? styles.required : ''}>
                <td>
                  <code>{param.name}</code>
                </td>
                <td>
                  <span className={styles.type}>{param.type}</span>
                </td>
                <td>
                  {param.required ? (
                    <span className={styles.requiredBadge}>Sim</span>
                  ) : (
                    <span className={styles.optionalBadge}>Não</span>
                  )}
                </td>
                <td>{param.description}</td>
                {(param.example || param.default) && (
                  <td>
                    {param.example && (
                      <code className={styles.example}>{param.example}</code>
                    )}
                    {param.default && (
                      <span className={styles.default}>Padrão: <code>{param.default}</code></span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </HighlightBox>
  );
}
