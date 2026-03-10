import { getIcon } from '@site/src/theme/icons/lucide';
import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import React from 'react';
import styles from './styles.module.css';

type Snippet = {
  label: 'HTTP' | 'cURL' | 'JavaScript' | 'Python' | string;
  language: string;
  code: string;
  icon?: string;
};

export type CodeExampleProps = {
  title?: string;
  description?: string;
  snippets: Snippet[];
  defaultTab?: string;
};

const labelIconFallback: Record<string, string> = {
  HTTP: 'Send',
  'cURL': 'Terminal', // not in map, fallback below will ignore if missing
  JavaScript: 'Code', // not in map, fallback below will ignore if missing
  Python: 'Cpu',
};

function LabelWithIcon({ label, icon }: { label: string; icon?: string }) {
  const LucideIcon =
    getIcon(icon ?? labelIconFallback[label] ?? '') ??
    null;
  return (
    <span className={styles.tabLabel}>
      {LucideIcon ? <LucideIcon className={styles.tabIcon} aria-hidden="true" /> : null}
      <span>{label}</span>
    </span>
  );
}

export const CodeExample: React.FC<CodeExampleProps> = ({
  title,
  description,
  snippets,
  defaultTab,
}) => {
  if (!snippets || snippets.length === 0) return null;
  const defaultValue = defaultTab ?? snippets[0]?.label ?? 'Example';

  return (
    <section className={styles.wrapper} aria-label={title ?? 'Exemplo de código'}>
      {(title || description) && (
        <header className={styles.header}>
          {title ? <h3 className={styles.title}>{title}</h3> : null}
          {description ? <p className={styles.description}>{description}</p> : null}
        </header>
      )}
      <Tabs defaultValue={defaultValue}>
        {snippets.map(({ label, language, code, icon }) => (
          <TabItem key={label} value={label} label={<LabelWithIcon label={label} icon={icon} />}>
            <CodeBlock language={language} title={label} showLineNumbers>
              {code.trim()}
            </CodeBlock>
          </TabItem>
        ))}
      </Tabs>
    </section>
  );
};

export default CodeExample;

