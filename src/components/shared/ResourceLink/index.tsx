import Link from '@docusaurus/Link';
import AnimatedIcon from '@site/src/components/shared/Icon/AnimatedIcon';
import type { LinkItem } from '@site/src/types';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { memo, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Props do componente ResourceLink
 */
type ResourceLinkProps = {
  /** Item de link (interno ou externo) */
  item: LinkItem;
  /** Classe CSS adicional para customização */
  className?: string;
};

/**
 * Componente ResourceLink reutilizável que renderiza links internos ou externos.
 * 
 * Este componente usa discriminated unions para garantir type safety:
 * - Se `item.to` existe, renderiza um Link interno do Docusaurus
 * - Se `item.href` existe, renderiza um <a> externo com target="_blank"
 * 
 * @param props - Props do componente ResourceLink
 * @param props.item - Item de link com label e to/href
 * @param props.className - Classe CSS opcional
 * @returns Componente Link ou <a> renderizado, ou null se nenhum link válido
 * 
 * @example
 * ```tsx
 * // Link interno
 * <ResourceLink item={{ label: 'Documentação', to: '/docs/intro' }} />
 * 
 * // Link externo
 * <ResourceLink item={{ label: 'GitHub', href: 'https://github.com' }} />
 * ```
 */
const ResourceLink = memo(function ResourceLink({
  item,
  className,
}: ResourceLinkProps): ReactNode {
  // Validação: garantir que pelo menos um link existe
  if (!item.to && !item.href) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'ResourceLink: Item deve ter pelo menos uma propriedade "to" ou "href"',
        item
      );
    }
    return null;
  }

  if (item.to) {
    return (
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
        <Link
          to={item.to}
          className={clsx(styles.resourceLink, className)}
          aria-label={item.label}>
          <span className={styles.linkContent}>
            {item.label}
            <AnimatedIcon
              icon={ArrowRight}
              size="sm"
              animation="hover"
              className={styles.linkIcon}
            />
          </span>
        </Link>
      </motion.div>
    );
  }

  if (item.href) {
    return (
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(styles.resourceLink, className)}
          aria-label={`${item.label} (abre em nova aba)`}>
          <span className={styles.linkContent}>
            {item.label}
            <AnimatedIcon
              icon={ExternalLink}
              size="sm"
              animation="hover"
              className={styles.linkIcon}
            />
          </span>
        </a>
      </motion.div>
    );
  }

  return null;
});

export default ResourceLink;

