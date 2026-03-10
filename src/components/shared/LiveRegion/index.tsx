import { useEffect, useRef, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Níveis de politeness para aria-live
 */
export type LiveRegionPoliteness = 'polite' | 'assertive' | 'off';

/**
 * Props do componente LiveRegion
 */
type LiveRegionProps = {
  /** Mensagem a ser anunciada */
  message: string | null;
  /** Nível de politeness (polite, assertive, off) */
  politeness?: LiveRegionPoliteness;
  /** Se deve limpar mensagem após um tempo */
  clearAfter?: number;
  /** Classe CSS adicional */
  className?: string;
};

/**
 * Componente LiveRegion - Região ARIA Live para screen readers.
 * 
 * Componente acessível que anuncia mudanças dinâmicas para screen readers.
 * Útil para notificações, mensagens de sucesso/erro, atualizações de status, etc.
 * 
 * @param props - Props do componente LiveRegion
 * @param props.message - Mensagem a ser anunciada
 * @param props.politeness - Nível de politeness (padrão: 'polite')
 * @param props.clearAfter - Tempo em ms para limpar mensagem (opcional)
 * @param props.className - Classe CSS adicional
 * @returns Componente React renderizado
 * 
 * @example
 * ```tsx
 * // Mensagem simples
 * <LiveRegion message="Item adicionado ao carrinho" />
 * 
 * // Mensagem assertiva (interrompe)
 * <LiveRegion 
 *   message="Erro ao salvar!" 
 *   politeness="assertive" 
 * />
 * 
 * // Mensagem que desaparece após 3 segundos
 * <LiveRegion 
 *   message="Salvo com sucesso!" 
 *   clearAfter={3000} 
 * />
 * ```
 */
export default function LiveRegion({
  message,
  politeness = 'polite',
  clearAfter,
  className,
}: LiveRegionProps): ReactNode {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousMessageRef = useRef<string | null>(null);

  useEffect(() => {
    // Limpar timeout anterior se existir
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Se há mensagem e é diferente da anterior
    if (message && message !== previousMessageRef.current) {
      previousMessageRef.current = message;

      // Se clearAfter foi especificado, limpar após o tempo
      if (clearAfter && clearAfter > 0) {
        timeoutRef.current = setTimeout(() => {
          previousMessageRef.current = null;
        }, clearAfter);
      }
    } else if (!message) {
      previousMessageRef.current = null;
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message, clearAfter]);

  // Não renderizar se não há mensagem
  if (!message) {
    return null;
  }

  return (
    <div
      className={className}
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      aria-relevant="additions text">
      <span className={styles.srOnly}>{message}</span>
    </div>
  );
}

/**
 * Classe utilitária para elementos visíveis apenas para screen readers
 */
export const srOnly = styles.srOnly;

