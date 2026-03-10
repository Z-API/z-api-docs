import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

type CalloutVariant = 'info' | 'success' | 'warning' | 'error';

export type CalloutProps = {
  title?: string;
  variant?: CalloutVariant;
  children: React.ReactNode;
};

export function Callout({ title, variant = 'info', children }: CalloutProps) {
  return (
    <div className={clsx(styles.callout, styles[variant])}>
      {title ? <div className={styles.title}>{title}</div> : null}
      <div>{children}</div>
    </div>
  );
}

// Exportar também Callout Compound Pattern
export { default as CalloutCompound } from './CalloutCompound';

export default Callout;


