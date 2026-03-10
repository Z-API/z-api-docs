import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

/**
 * Tipos compartilhados para componentes da homepage
 */

/**
 * Link item que pode ser interno (to) ou externo (href)
 * Usa discriminated union para garantir type safety
 */
export type InternalLink = {
  to: string;
  href?: never;
};

export type ExternalLink = {
  to?: never;
  href: string;
};

export type LinkItem = {
  label: string;
} & (InternalLink | ExternalLink);

/**
 * Card item genérico para seções de cards
 */
export type CardItem = {
  title: string;
  description: string;
  link: string;
  /** Ícone do lucide-react (opcional) */
  icon?: LucideIcon;
};

/**
 * Feature item para seção de features
 */
export type FeatureItem = {
  title: string;
  description: string | ReactNode;
};

/**
 * Resource category para recursos de desenvolvedores
 */
export type ResourceCategory = {
  title: string;
  items: LinkItem[];
};

/**
 * Estados visuais para componentes
 */
export type ComponentState = 'default' | 'loading' | 'success' | 'error' | 'disabled';

/**
 * Variantes de badge
 */
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Tamanhos padronizados
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Temas disponíveis do design system híbrido
 */
export type Theme = 'classic' | 'zapi' | 'hybrid' | 'official';

