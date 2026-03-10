import type { Variants } from 'framer-motion';

/**
 * Verifica se o usuário prefere movimento reduzido
 * Respeita a preferência de acessibilidade prefers-reduced-motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Configuração padrão de transição para animações suaves
 */
export const defaultTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

/**
 * Transição rápida para micro-interações
 */
export const fastTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
  mass: 0.5,
};

/**
 * Transição suave para animações mais lentas
 */
export const smoothTransition = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 25,
  mass: 1,
};

/**
 * Variantes de animação: Fade
 * Fade in/out simples
 */
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    transition: fastTransition,
  },
};

/**
 * Variantes de animação: Fade Up
 * Fade in com movimento vertical
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: fastTransition,
  },
};

/**
 * Variantes de animação: Fade Down
 * Fade in com movimento vertical para baixo
 */
export const fadeDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: fastTransition,
  },
};

/**
 * Variantes de animação: Slide
 * Slide horizontal
 */
export const slideVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: fastTransition,
  },
};

/**
 * Variantes de animação: Scale
 * Scale in/out
 */
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: fastTransition,
  },
};

/**
 * Variantes de animação: Bounce
 * Bounce in com efeito elástico
 */
export const bounceVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
      mass: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.3,
    transition: fastTransition,
  },
};

/**
 * Variantes de hover para micro-interações
 */
export const hoverVariants: Variants = {
  rest: {
    scale: 1,
    transition: fastTransition,
  },
  hover: {
    scale: 1.05,
    transition: fastTransition,
  },
  tap: {
    scale: 0.95,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
};

/**
 * Variantes de hover com elevação (para cards)
 * Otimizado: inclui scale sutil para melhor feedback visual
 * GPU-accelerated: usa transform (y, scale) para performance
 */
export const hoverElevationVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: fastTransition,
  },
  hover: {
    y: -6,
    scale: 1.01,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    transition: {
      ...fastTransition,
      // Sincronizar timing com animações de ícone
      duration: 0.2,
    },
  },
  tap: {
    y: -2,
    scale: 0.99,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
};

/**
 * Variantes de rotação para ícones
 */
export const rotateVariants: Variants = {
  rest: {
    rotate: 0,
    transition: fastTransition,
  },
  hover: {
    rotate: 15,
    transition: fastTransition,
  },
  tap: {
    rotate: -15,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
};

/**
 * Variantes de pulso para indicadores de loading
 */
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Variantes de shake para feedback de erro
 */
export const shakeVariants: Variants = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

/**
 * Variantes de stagger para listas
 * Use com staggerChildren no container
 */
export const staggerContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

/**
 * Variantes para itens em lista com stagger
 */
export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: fastTransition,
  },
};

/**
 * Cria variantes customizadas respeitando prefers-reduced-motion
 * @param variants - Variantes de animação
 * @returns Variantes ajustadas ou desabilitadas
 */
export const createAccessibleVariants = <T extends Variants>(variants: T): T => {
  if (prefersReducedMotion()) {
    // Retorna variantes simplificadas (apenas opacity)
    const simplified: Variants = {};
    Object.keys(variants).forEach((key) => {
      const variant = variants[key];
      if (typeof variant === 'object' && variant !== null && !Array.isArray(variant)) {
        simplified[key] = {
          opacity: 'opacity' in variant ? variant.opacity : 1,
          transition: fastTransition,
        };
      } else {
        simplified[key] = {
          opacity: 1,
          transition: fastTransition,
        };
      }
    });
    return simplified as T;
  }
  return variants;
};

