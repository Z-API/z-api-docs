import React from 'react';
import { CardLink } from '../CardLink';
import styles from './styles.module.css';

export interface PostCTAProps {
  title?: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}

export function PostCTA({ title = 'Leituras recomendadas', links }: PostCTAProps): React.JSX.Element {
  return (
    <section className={styles.section} aria-labelledby="post-cta-heading">
      <div className={styles.container}>
        <h2 id="post-cta-heading" className={styles.title}>{title}</h2>
        <div className={styles.grid}>
          {links.map((l) => (
            <CardLink
              key={l.href}
              href={l.href}
              title={l.label}
              description={l.external ? 'Externo' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PostCTA;

