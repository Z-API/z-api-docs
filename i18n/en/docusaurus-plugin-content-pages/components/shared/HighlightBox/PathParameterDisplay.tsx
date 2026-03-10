import React, { useState, useCallback } from 'react';
import { FileCode, Copy, Check } from 'lucide-react';
import clsx from 'clsx';
import styles from './HighlightBox.module.css';

export interface PathParameterDisplayProps {
  /**
   * Path parameter (com ou sem {})
   */
  param: string;
  /**
   * Texto instrucional opcional acima do conteúdo
   */
  instructionText?: string;
  /**
   * Se o componente deve ser copiável
   * @default true
   */
  copyable?: boolean;
  /**
   * Classe CSS adicional
   */
  className?: string;
}

/**
 * Componente simplificado para exibir path parameters
 * Versão compacta com menos HTML e animações
 *
 * @example
 * ```tsx
 * <PathParameterDisplay
 *   param="{instanceId}"
 *   instructionText="ID da sua instância"
 * />
 * ```
 */
export default function PathParameterDisplay({
  param,
  instructionText,
  copyable = true,
  className,
}: PathParameterDisplayProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  // Garantir que esteja entre {}
  const displayParam = param.startsWith('{') && param.endsWith('}')
    ? param
    : `{${param}}`;

  const handleCopy = useCallback(async () => {
    if (!copyable) return;

    try {
      await navigator.clipboard.writeText(displayParam);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  }, [copyable, displayParam]);

  return (
    <div className={clsx(styles.container, styles['path-param'], className)}>
      {instructionText && (
        <p className={styles.instructionText}>{instructionText}</p>
      )}
      <div className={styles.contentContainer}>
        <FileCode className={styles.icon} size={16} />
        <span className={styles.content}>{displayParam}</span>
        {copyable && (
          <button
            className={styles.copyButton}
            onClick={handleCopy}
            aria-label="Copiar"
            type="button"
          >
            {copied ? (
              <Check className={styles.copyIcon} size={14} />
            ) : (
              <Copy className={styles.copyIcon} size={14} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
