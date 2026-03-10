import CardSection from "@site/src/components/shared/CardSection";
import Loading from "@site/src/components/shared/Loading";
import { useLearningResources } from "@site/src/components/patterns/container-presentational";
import type { Theme } from "@site/src/types";
import { CARD_LINK_TEXTS } from "@site/src/utils/cardConstants";
import type { ReactNode } from "react";

/**
 * Props do componente LearningResources
 */
type LearningResourcesProps = {
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
  /** URL para fetch de dados (opcional) */
  dataUrl?: string;
  /** Se deve fazer fetch de dados */
  enableFetch?: boolean;
};

/**
 * Componente LearningResources - Seção "Recursos de aprendizado" (Presentational).
 *
 * Componente presentacional que exibe cards com links para recursos de aprendizado.
 * Usa hook customizado (useLearningResources) para gerenciar lógica de dados,
 * seguindo o padrão Container/Presentational.
 *
 * @param props - Props do componente LearningResources
 * @param props.theme - Tema do design system (padrão: 'classic')
 * @param props.dataUrl - URL para fetch de dados (opcional)
 * @param props.enableFetch - Se deve fazer fetch de dados (padrão: false)
 * @returns Componente React da seção LearningResources
 *
 * @example
 * ```tsx
 * // Uso básico (dados estáticos)
 * <LearningResources />
 * 
 * // Com fetch de dados
 * <LearningResources 
 *   dataUrl="/api/learning-resources"
 *   enableFetch={true}
 * />
 * ```
 */
export default function LearningResources({
  theme = "classic",
  dataUrl,
  enableFetch = false,
}: LearningResourcesProps = {}): ReactNode {
  // Hook gerencia lógica de dados (separado da apresentação)
  const { cards, isLoading, error } = useLearningResources({
    url: dataUrl,
    enableFetch,
  });

  // Mostrar loading
  if (isLoading) {
    return (
      <section data-theme={theme} aria-label="Recursos de aprendizado">
        <div className="container">
          <Loading text="Carregando recursos..." />
        </div>
      </section>
    );
  }

  // Mostrar erro
  if (error) {
    return (
      <section data-theme={theme} aria-label="Recursos de aprendizado">
        <div className="container">
          <div role="alert" aria-live="assertive">
            <p>Erro ao carregar recursos: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  // Validação: verificar se cards não está vazio
  if (!cards || cards.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn("LearningResources: cards está vazio");
    }
    return null;
  }

  // Renderizar componente presentacional
  return (
    <CardSection
      title="Recursos de aprendizado"
      cards={cards}
      linkText={CARD_LINK_TEXTS.ACCESS}
      theme={theme}
      aria-label="Recursos de aprendizado"
    />
  );
}
