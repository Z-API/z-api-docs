import { useEffect, useMemo, useState } from 'react';
import { BREAKPOINT_LIMITS } from '@site/src/config/breakpoints';

export type BreakpointName = 'mobile' | 'tablet' | 'desktop' | 'wide';

export type BreakpointInfo = {
  /** Nome do breakpoint ativo */
  name: BreakpointName;
  /** Largura atual do viewport */
  width: number;
  /** Altura atual do viewport */
  height: number;
  /** Flags auxiliares para lógica condicional */
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
};

const DEFAULT_BREAKPOINT: BreakpointInfo = {
  name: 'desktop',
  width: 1280,
  height: 720,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isWide: false,
};

const getBreakpointName = (width: number): BreakpointName => {
  if (width < BREAKPOINT_LIMITS.mobile) {
    return 'mobile';
  }
  if (width < BREAKPOINT_LIMITS.tablet) {
    return 'tablet';
  }
  if (width < BREAKPOINT_LIMITS.desktop) {
    return 'desktop';
  }
  return 'wide';
};

const getBreakpointInfo = (): BreakpointInfo => {
  if (typeof window === 'undefined') {
    return DEFAULT_BREAKPOINT;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const name = getBreakpointName(width);

  return {
    name,
    width,
    height,
    isMobile: name === 'mobile',
    isTablet: name === 'tablet',
    isDesktop: name === 'desktop',
    isWide: name === 'wide',
  };
};

/**
 * Hook inspirado no padrão useActiveBreakpoint do Figma Sites.
 * Retorna informações do breakpoint atual para permitir ajustes responsivos em tempo real.
 */
export function useActiveBreakpoint(): BreakpointInfo {
  const [breakpoint, setBreakpoint] = useState<BreakpointInfo>(() => getBreakpointInfo());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let animationFrameId: number | null = null;

    const handleResize = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = window.requestAnimationFrame(() => {
        setBreakpoint(getBreakpointInfo());
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Memoriza resultado para evitar re-renderizações desnecessárias
  return useMemo(() => breakpoint, [breakpoint]);
}


