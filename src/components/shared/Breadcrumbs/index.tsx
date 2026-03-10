/**
 * Componente Breadcrumbs - Navegação hierárquica
 * 
 * Fornece navegação hierárquica para melhorar orientação do usuário.
 * Melhora UX e SEO.
 */

import Link from '@docusaurus/Link';
import { ChevronRight, Home } from 'lucide-react';
import { memo, type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * Item do breadcrumb
 */
export type BreadcrumbItem = {
  /** Texto do item */
  label: string;
  /** URL do item (opcional, se não fornecido, não é clicável) */
  to?: string;
  /** Se é o item atual (padrão: false) */
  isCurrent?: boolean;
};

/**
 * Props do componente Breadcrumbs
 */
type BreadcrumbsProps = {
  /** Itens do breadcrumb */
  items: BreadcrumbItem[];
  /** Classe CSS adicional */
  className?: string;
  /** Se deve mostrar ícone home (padrão: true) */
  showHome?: boolean;
  /** URL do home (padrão: '/') */
  homeUrl?: string;
  /** Aria label (padrão: 'Breadcrumb navigation') */
  'aria-label'?: string;
};

/**
 * Componente Breadcrumbs - Navegação hierárquica
 * 
 * @param props - Props do componente Breadcrumbs
 * @returns Componente React do breadcrumb
 * 
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', to: '/' },
 *     { label: 'Documentação', to: '/docs' },
 *     { label: 'Quick Start', isCurrent: true },
 *   ]}
 * />
 * ```
 */
function Breadcrumbs({
  items,
  className,
  showHome = true,
  homeUrl = '/',
  'aria-label': ariaLabel = 'Breadcrumb navigation',
}: BreadcrumbsProps): ReactNode {
  // Adicionar home no início se showHome=true
  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: 'Home', to: homeUrl }, ...items]
    : items;

  return (
    <nav
      className={clsx(styles.breadcrumbs, className)}
      aria-label={ariaLabel}
      role="navigation">
      <ol className={styles.breadcrumbsList} itemScope itemType="https://schema.org/BreadcrumbList">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isCurrent = item.isCurrent || isLast;

          return (
            <li
              key={index}
              className={clsx(styles.breadcrumbsItem, isCurrent && styles.breadcrumbsItemCurrent)}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem">
              {item.to && !isCurrent ? (
                <Link
                  to={item.to}
                  className={styles.breadcrumbsLink}
                  itemProp="item">
                  {index === 0 && showHome && (
                    <Home size={16} aria-hidden="true" className={styles.breadcrumbsHomeIcon} />
                  )}
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span className={styles.breadcrumbsCurrent} aria-current="page" itemProp="name">
                  {index === 0 && showHome && (
                    <Home size={16} aria-hidden="true" className={styles.breadcrumbsHomeIcon} />
                  )}
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
              {!isLast && (
                <ChevronRight
                  size={16}
                  aria-hidden="true"
                  className={styles.breadcrumbsSeparator}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default memo(Breadcrumbs);
