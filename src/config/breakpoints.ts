/**
 * Configuração Centralizada de Breakpoints
 * 
 * Este arquivo centraliza todas as definições de breakpoints usadas no projeto,
 * garantindo consistência entre CSS e TypeScript.
 * 
 * Baseado em:
 * - Design System Z-API
 * - Tailwind CSS breakpoints padrão
 * - Docusaurus breakpoints
 */

/**
 * Breakpoints em pixels
 * 
 * xs: 375px - Extra small devices (small mobile)
 * sm: 640px - Small devices (mobile landscape)
 * md: 768px - Medium devices (tablet portrait)
 * lg: 1024px - Large devices (tablet landscape / desktop)
 * xl: 1280px - Extra large devices (desktop wide)
 * 2xl: 1440px - 2X large devices (large desktop)
 * 3xl: 1920px - 3X large devices (ultra wide desktop)
 */
export const BREAKPOINTS = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
  '3xl': 1920,
} as const;

/**
 * Aliases semânticos para compatibilidade
 */
export const BREAKPOINT_ALIASES = {
  mobile: BREAKPOINTS.md,      // 768px
  tablet: BREAKPOINTS.lg,      // 1024px
  desktop: BREAKPOINTS.xl,     // 1280px
  'large-desktop': BREAKPOINTS['2xl'], // 1440px
} as const;

/**
 * Limites para categorização de breakpoints
 * Usado em useActiveBreakpoint hook
 * 
 * Breakpoints intermediários adicionados para melhor granularidade:
 * - mobile: < 768px
 * - tablet: 768px - 1024px
 * - desktop: 1024px - 1440px
 * - wide: > 1440px
 */
export const BREAKPOINT_LIMITS = {
  mobile: BREAKPOINTS.md,      // < 768px = mobile
  tablet: BREAKPOINTS.lg,      // 768px - 1024px = tablet
  desktop: BREAKPOINTS['2xl'], // 1024px - 1440px = desktop
  // > 1440px = wide
} as const;

/**
 * Breakpoints como strings para uso em CSS
 */
export const BREAKPOINTS_CSS = {
  xs: `${BREAKPOINTS.xs}px`,
  sm: `${BREAKPOINTS.sm}px`,
  md: `${BREAKPOINTS.md}px`,
  lg: `${BREAKPOINTS.lg}px`,
  xl: `${BREAKPOINTS.xl}px`,
  '2xl': `${BREAKPOINTS['2xl']}px`,
  '3xl': `${BREAKPOINTS['3xl']}px`,
} as const;

/**
 * Media queries como strings para uso em CSS
 */
export const MEDIA_QUERIES = {
  xs: `@media (min-width: ${BREAKPOINTS_CSS.xs})`,
  sm: `@media (min-width: ${BREAKPOINTS_CSS.sm})`,
  md: `@media (min-width: ${BREAKPOINTS_CSS.md})`,
  lg: `@media (min-width: ${BREAKPOINTS_CSS.lg})`,
  xl: `@media (min-width: ${BREAKPOINTS_CSS.xl})`,
  '2xl': `@media (min-width: ${BREAKPOINTS_CSS['2xl']})`,
  '3xl': `@media (min-width: ${BREAKPOINTS_CSS['3xl']})`,
  // Max-width queries
  'max-xs': `@media (max-width: ${BREAKPOINTS.xs - 1}px)`,
  'max-sm': `@media (max-width: ${BREAKPOINTS.sm - 1}px)`,
  'max-md': `@media (max-width: ${BREAKPOINTS.md - 1}px)`,
  'max-lg': `@media (max-width: ${BREAKPOINTS.lg - 1}px)`,
  'max-xl': `@media (max-width: ${BREAKPOINTS.xl - 1}px)`,
  'max-2xl': `@media (max-width: ${BREAKPOINTS['2xl'] - 1}px)`,
  'max-3xl': `@media (max-width: ${BREAKPOINTS['3xl'] - 1}px)`,
} as const;

/**
 * Helper para verificar se viewport está em breakpoint específico
 */
export function isBreakpoint(breakpoint: keyof typeof BREAKPOINTS): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.innerWidth >= BREAKPOINTS[breakpoint];
}

/**
 * Helper para obter breakpoint atual
 */
export function getCurrentBreakpoint(): keyof typeof BREAKPOINTS {
  if (typeof window === 'undefined') {
    return 'lg';
  }
  
  const width = window.innerWidth;
  
  if (width >= BREAKPOINTS['3xl']) return '3xl';
  if (width >= BREAKPOINTS['2xl']) return '2xl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  return 'xs';
}

