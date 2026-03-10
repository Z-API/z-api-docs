/**
 * Componente Toast - Notificações temporárias
 * 
 * Fornece feedback visual para ações do usuário usando toasts.
 * Melhora UX com notificações não-intrusivas.
 */

import clsx from 'clsx';
import { X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Tipo de toast
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Props do componente Toast
 */
type ToastProps = {
  /** Mensagem do toast */
  message: string;
  /** Tipo do toast */
  type?: ToastType;
  /** Duração em ms (padrão: 5000, 0 = não fecha automaticamente) */
  duration?: number;
  /** Se pode fechar manualmente (padrão: true) */
  closable?: boolean;
  /** Callback quando toast é fechado */
  onClose?: () => void;
  /** Classe CSS adicional */
  className?: string;
  /** Ícone customizado (opcional) */
  icon?: ReactNode;
};

/**
 * Componente Toast - Notificação temporária
 * 
 * @param props - Props do componente Toast
 * @returns Componente React do toast
 * 
 * @example
 * ```tsx
 * <Toast 
 *   message="Link copiado com sucesso!" 
 *   type="success"
 *   duration={3000}
 *   onClose={() => {}}
 * />
 * ```
 */
export default function Toast({
  message,
  type = 'info',
  duration = 5000,
  closable = true,
  onClose,
  className,
  icon,
}: ToastProps): ReactNode | null {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={clsx(styles.toast, styles[`toast${type.charAt(0).toUpperCase() + type.slice(1)}`], className)}
      role="alert"
      aria-live="polite"
      aria-atomic="true">
      {icon && <div className={styles.toastIcon}>{icon}</div>}
      <div className={styles.toastMessage}>{message}</div>
      {closable && (
        <button
          className={styles.toastClose}
          onClick={handleClose}
          aria-label="Fechar notificação"
          type="button">
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

/**
 * ToastContainer - Container para múltiplos toasts
 */
type ToastContainerProps = {
  /** Toasts a serem exibidos */
  children: ReactNode;
  /** Posição do container */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  /** Classe CSS adicional */
  className?: string;
};

export function ToastContainer({ 
  children, 
  position = 'top-right',
  className,
}: ToastContainerProps): ReactNode {
  return (
    <div
      className={clsx(styles.toastContainer, styles[`toastContainer${position.charAt(0).toUpperCase() + position.slice(1).replace('-', '')}`], className)}
      role="region"
      aria-label="Notificações"
      aria-live="polite">
      {children}
    </div>
  );
}
