/**
 * Hooks Customizados do Projeto
 * 
 * Exporta todos os hooks customizados organizados por categoria:
 * - Data: useFetch, useLocalStorage
 * - Forms: useForm
 * - UI: useToggle, useDebounce
 * - Existentes: useRippleEffect, useActiveBreakpoint, etc.
 */

// Data Hooks
export * from './data';

// Form Hooks
export * from './forms';

// UI Hooks
export * from './ui';

// Hooks existentes
export { useRippleEffect } from './useRippleEffect';
export { useParallaxScroll, useParallaxRef } from './useParallaxScroll';
export { useIntersectionObserver } from './useIntersectionObserver';
export { useActiveBreakpoint } from './useActiveBreakpoint';
export { useReducedMotion } from './useReducedMotion';
export { usePrefersReducedMotion } from './usePrefersReducedMotion';
