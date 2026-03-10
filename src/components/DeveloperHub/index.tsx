import CardSection from '@site/src/components/shared/CardSection';
import Loading from '@site/src/components/shared/Loading';
import { useDeveloperHub } from '@site/src/components/patterns/container-presentational';
import type { Theme } from '@site/src/types';
import { CARD_LINK_TEXTS } from '@site/src/utils/cardConstants';
import type { ReactNode } from 'react';

/**
 * Props do componente DeveloperHub
 */
type DeveloperHubProps = {
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
  /** URL para fetch de dados (opcional) */
  dataUrl?: string;
  /** Se deve fazer fetch de dados */
  enableFetch?: boolean;
};

/**
 * Componente DeveloperHub - Seção "Central do Desenvolvedor" (Presentational).
 * 
 * Componente presentacional que exibe cards com links para documentação.
 * Usa hook customizado (useDeveloperHub) para gerenciar lógica de dados,
 * seguindo o padrão Container/Presentational.
 * 
 * @param props - Props do componente DeveloperHub
 * @param props.theme - Tema do design system (padrão: 'classic')
 * @param props.dataUrl - URL para fetch de dados (opcional)
 * @param props.enableFetch - Se deve fazer fetch de dados (padrão: false)
 * @returns Componente React da seção DeveloperHub
 * 
 * @example
 * ```tsx
 * // Uso básico (dados estáticos)
 * <DeveloperHub />
 * 
 * // Com fetch de dados
 * <DeveloperHub 
 *   dataUrl="/api/developer-hub-cards"
 *   enableFetch={true}
 * />
 * ```
 */
export default function DeveloperHub({ 
  theme = 'classic',
  dataUrl,
  enableFetch = false,
}: DeveloperHubProps = {}): ReactNode {
  // Hook gerencia lógica de dados (separado da apresentação)
  const { cards, isLoading, error } = useDeveloperHub({
    url: dataUrl,
    enableFetch,
  });

  // Mostrar loading
  if (isLoading) {
    return (
      <section 
        data-theme={theme} 
        aria-label="Central do Desenvolvedor"
        aria-busy="true">
        <div className="container">
          <Loading text="Carregando recursos..." />
        </div>
      </section>
    );
  }

  // Mostrar erro
  if (error) {
    return (
      <section 
        data-theme={theme} 
        aria-label="Central do Desenvolvedor">
        <div className="container">
          <div role="alert" aria-live="assertive" aria-atomic="true">
            <p>Erro ao carregar recursos: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  // Renderizar componente presentacional
  return (
    <CardSection
      title="Central do Desenvolvedor"
      subtitle="Documentação, treinamento e recursos para ajudar você a aproveitar ao máximo a Plataforma Z-API"
      cards={cards}
      linkText={CARD_LINK_TEXTS.LEARN_MORE}
      theme={theme}
      aria-label="Central do Desenvolvedor"
      aria-labelledby="developer-hub-title"
    />
  );
}

