import { getIcon } from '@site/src/theme/icons/lucide';
import type { LucideIcon } from 'lucide-react';

type IconTokenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type MdxIconProps = {
  /** Nome do ícone, deve bater com o usado em `sidebars.ts` (ex: "Rocket", "MessageSquare") */
  name: string;
  /**
   * Tamanho do ícone.
   * - Token: `xs` | `sm` | `md` | `lg` | `xl` (12–32px, alinhado ao design system)
   * - Ou um valor numérico em pixels.
   */
  size?: IconTokenSize | number;
  /** Classe CSS extra para customização em páginas MDX */
  className?: string;
  /** Rótulo acessível; se não for passado, o ícone será `aria-hidden` */
  'aria-label'?: string;
};

const SIZE_MAP: Record<IconTokenSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

/**
 * Componente `Icon` para uso em MDX.
 *
 * Delegamos para `getIcon` (mesmo mapa usado no sidebar), garantindo que
 * os nomes de ícones em MDX e em `sidebars.ts` permaneçam consistentes.
 *
 * Exemplos em MDX:
 *
 * ```mdx
 * <Icon name="Rocket" size="lg" />
 * <Icon name="MessageSquare" />
 * <Icon name="Shield" size={28} aria-label="Segurança" />
 * ```
 */
export function Icon({ name, size = 'md', className, 'aria-label': ariaLabel }: MdxIconProps) {
  const LucideIcon = getIcon(name) as LucideIcon | null;

  if (!LucideIcon) {
    if (process.env.NODE_ENV !== 'production') {
      // Ajuda durante dev a detectar ícones não mapeados em `lucide.ts`
      // eslint-disable-next-line no-console
      console.warn(`MdxIcon: ícone "${name}" não encontrado em src/theme/icons/lucide.ts`);
    }
    return null;
  }

  const resolvedSize =
    typeof size === 'number'
      ? size
      : SIZE_MAP[size] ?? SIZE_MAP.md;

  return (
    <LucideIcon
      className={className}
      size={resolvedSize}
      aria-label={ariaLabel ?? undefined}
      aria-hidden={ariaLabel ? undefined : true}
    />
  );
}

// Export default para compatibilidade com imports antigos
export default Icon;


