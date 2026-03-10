/**
 * Hook useHeroContent - Gerencia conteúdo e lógica do HeroSection
 * 
 * Segue o padrão Container/Presentational:
 * - Separa lógica de dados da apresentação
 * - Permite reutilização em diferentes contextos
 * - Facilita testes e manutenção
 */

import { Globe, Play, Rocket, Users } from 'lucide-react';
import { useMemo } from 'react';

/**
 * Tipo para estatísticas do hero
 */
export type HeroStat = {
  value: string;
  label: string;
  icon?: typeof Users;
};

/**
 * Tipo para CTA do hero
 */
export type HeroCTA = {
  label: string;
  to: string;
  icon?: typeof Rocket;
  primary?: boolean;
};

/**
 * Tipo para conteúdo do hero
 */
export type HeroContent = {
  label: string;
  title: string;
  subtitle: string;
  stats: HeroStat[];
  ctaPrimary: HeroCTA;
  ctaSecondary: HeroCTA;
};

/**
 * Opções do hook useHeroContent
 */
type UseHeroContentOptions = {
  /** URL para fetch de dados (opcional) */
  dataUrl?: string;
  /** Se deve fazer fetch de dados */
  enableFetch?: boolean;
  /** Customizar conteúdo (opcional) */
  customContent?: Partial<HeroContent>;
};

/**
 * Hook useHeroContent - Gerencia conteúdo do HeroSection
 * 
 * @param options - Opções do hook
 * @returns Conteúdo do hero e estado de loading/error
 * 
 * @example
 * ```tsx
 * const { content, isLoading, error } = useHeroContent();
 * 
 * if (isLoading) return <Loading />;
 * if (error) return <Error message={error.message} />;
 * 
 * return <HeroSection content={content} />;
 * ```
 */
export function useHeroContent(options: UseHeroContentOptions = {}) {
  const { dataUrl, enableFetch = false, customContent } = options;

  // Conteúdo padrão estático
  const defaultContent: HeroContent = {
    label: 'Central do Desenvolvedor',
    title: 'Conecte seu sistema ao Z-API, a API WhatsApp mais estável do Brasil',
    subtitle: 'Se você desenvolve software, Z-API é a solução para integrar atendimento, notificações e automações via WhatsApp com suporte técnico nacional, documentação clara e parceria de verdade.',
    stats: [
      { value: '+60.000', label: 'clientes', icon: Users },
      { value: '79', label: 'países', icon: Globe },
      { value: '24/7', label: 'suporte nacional', icon: Rocket },
    ],
    ctaPrimary: { 
      label: 'Começar grátis', 
      to: '/docs/quick-start/introducao', 
      icon: Rocket,
      primary: true,
    },
    ctaSecondary: { 
      label: 'Ver documentação', 
      to: '/docs/intro', 
      icon: Play,
      primary: false,
    },
  };

  // Merge com conteúdo customizado
  const content = useMemo(() => {
    if (!customContent) {
      return defaultContent;
    }
    return {
      ...defaultContent,
      ...customContent,
      stats: customContent.stats || defaultContent.stats,
      ctaPrimary: { ...defaultContent.ctaPrimary, ...customContent.ctaPrimary },
      ctaSecondary: { ...defaultContent.ctaSecondary, ...customContent.ctaSecondary },
    };
  }, [customContent]);

  // TODO: Implementar fetch quando enableFetch for true
  // Por enquanto, sempre retorna conteúdo estático
  const isLoading = enableFetch && !!dataUrl ? false : false; // Placeholder
  const error = null; // Placeholder

  return {
    content,
    isLoading,
    error: error as Error | null,
  };
}
