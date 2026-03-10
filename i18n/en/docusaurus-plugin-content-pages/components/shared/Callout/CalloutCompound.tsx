/**
 * Callout Compound Component - Implementação do Compound Pattern
 * 
 * Segue o padrão Compound Components conforme patterns.dev:
 * https://www.patterns.dev/react/compound-pattern/
 * 
 * Permite composição flexível de componentes Callout usando sub-componentes:
 * - Callout.Icon
 * - Callout.Title
 * - Callout.Body
 * 
 * Mantém compatibilidade com a API existente (Callout com title e variant)
 */

import clsx from 'clsx';
import React, { createContext, useContext } from 'react';
import styles from './styles.module.css';

type CalloutVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Context para compartilhar variant entre sub-componentes
 */
type CalloutContextType = {
  variant: CalloutVariant;
};

const CalloutContext = createContext<CalloutContextType | null>(null);

// Context hook - usado internamente pelos sub-componentes
// @ts-expect-error - Hook é usado pelos sub-componentes via contexto
function useCalloutContext() {
  const context = useContext(CalloutContext);
  if (!context) {
    throw new Error('Callout sub-components must be used within Callout component');
  }
  return context;
}

/**
 * Props do componente Callout (Compound)
 */
type CalloutCompoundProps = {
  /** Conteúdo do callout (sub-componentes) */
  children: React.ReactNode;
  /** Variante do callout (padrão: 'info') */
  variant?: CalloutVariant;
  /** Classe CSS adicional */
  className?: string;
};

/**
 * Componente Callout principal (Compound Pattern)
 * 
 * @example
 * ```tsx
 * import { Info } from 'lucide-react';
 * 
 * <Callout variant="info">
 *   <Callout.Icon><Info size={20} /></Callout.Icon>
 *   <Callout.Title>Informação</Callout.Title>
 *   <Callout.Body>
 *     Esta é uma mensagem informativa usando Compound Pattern.
 *   </Callout.Body>
 * </Callout>
 * ```
 */
function CalloutCompound({
  children,
  variant = 'info',
  className,
}: CalloutCompoundProps) {
  const contextValue: CalloutContextType = { variant };

  return (
    <CalloutContext.Provider value={contextValue}>
      <div className={clsx(styles.callout, styles[variant], className)}>
        {children}
      </div>
    </CalloutContext.Provider>
  );
}

/**
 * Callout.Icon - Ícone do callout
 */
function CalloutIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx(styles.calloutIcon, className)}>{children}</div>;
}

/**
 * Callout.Title - Título do callout
 */
function CalloutTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx(styles.title, className)}>{children}</div>;
}

/**
 * Callout.Body - Corpo do callout
 */
function CalloutBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx(styles.calloutBody, className)}>{children}</div>;
}

// Compor componentes no objeto Callout
CalloutCompound.Icon = CalloutIcon;
CalloutCompound.Title = CalloutTitle;
CalloutCompound.Body = CalloutBody;

export default CalloutCompound;
