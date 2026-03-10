/**
 * useLearningResources - Custom Hook (Abordagem Moderna)
 * 
 * Responsabilidade: Lógica de dados do LearningResources
 * - Gerencia dados dos cards
 * - Pode fazer fetch de dados no futuro
 * - Retorna dados prontos para uso
 * 
 * Segue o padrão Container/Presentational conforme:
 * https://www.patterns.dev/react/presentational-container-pattern/
 * 
 * Esta é a abordagem recomendada para React 18+.
 */

import { useEffect, useMemo, useState } from 'react';
import type { CardItem } from '@site/src/types';
import { BookOpen, GraduationCap, Trophy } from 'lucide-react';

/**
 * Opções de configuração do hook useLearningResources
 */
type UseLearningResourcesOptions = {
  /** URL para fetch de dados (opcional) */
  url?: string;
  /** Função customizada para fetch de dados (opcional) */
  fetchFn?: () => Promise<CardItem[]>;
  /** Se deve fazer fetch de dados */
  enableFetch?: boolean;
};

/**
 * Retorno do hook useLearningResources
 */
type UseLearningResourcesReturn = {
  /** Array de cards de recursos de aprendizado */
  cards: CardItem[];
  /** Se está carregando */
  isLoading: boolean;
  /** Erro ocorrido */
  error: Error | null;
  /** Função para recarregar dados */
  refetch: () => void;
};

/**
 * Dados padrão (fallback quando não há fetch)
 */
const DEFAULT_CARDS: CardItem[] = [
  {
    title: 'Comunidade Z-API no Discord',
    description:
      'Troque insights técnicos com desenvolvedores experientes, receba alertas de updates importantes e participe de revisões de código guiadas por tech writers especializados. Conecte-se com a comunidade.',
    link: 'https://discord.gg/zapi-oficial',
    icon: BookOpen,
  },
  {
    title: 'Artigos do Blog',
    description:
      'Explore artigos didáticos sobre instâncias, mensagens, webhooks, segurança e automação. Aprenda conceitos fundamentais através de analogias simples e guias práticos passo a passo.',
    link: '/blog',
    icon: Trophy,
  },
  {
    title: 'Tutoriais e Guias',
    description:
      'Aprenda a usar a Z-API de forma eficiente com tutoriais passo a passo detalhados e exemplos práticos que você pode aplicar imediatamente em seus projetos. Do básico ao avançado.',
    link: '/docs/intro',
    icon: GraduationCap,
  },
];

/**
 * Custom Hook - useLearningResources
 * 
 * Gerencia a lógica de dados do LearningResources.
 * Separa a lógica de dados da apresentação.
 * 
 * Suporta fetch de dados opcional via URL ou função customizada.
 * 
 * @param options - Opções de configuração do hook
 * @param options.url - URL para fetch de dados
 * @param options.fetchFn - Função customizada para fetch
 * @param options.enableFetch - Se deve fazer fetch (padrão: false)
 * @returns Objeto com cards, isLoading, error e refetch
 * 
 * @example
 * ```tsx
 * // Uso básico (dados estáticos)
 * function LearningResources() {
 *   const { cards, isLoading } = useLearningResources();
 *   if (isLoading) return <Loading />;
 *   return <CardSection cards={cards} />;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Com fetch de dados
 * function LearningResources() {
 *   const { cards, isLoading, error } = useLearningResources({
 *     url: '/api/learning-resources',
 *     enableFetch: true
 *   });
 *   if (isLoading) return <Loading />;
 *   if (error) return <Error message={error.message} />;
 *   return <CardSection cards={cards} />;
 * }
 * ```
 */
export function useLearningResources(
  options: UseLearningResourcesOptions = {}
): UseLearningResourcesReturn {
  const { url, fetchFn, enableFetch = false } = options;

  const [cards, setCards] = useState<CardItem[]>(DEFAULT_CARDS);
  const [isLoading, setIsLoading] = useState(enableFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!enableFetch) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      let result: CardItem[];

      if (fetchFn) {
        result = await fetchFn();
      } else if (url) {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        // Verificar Content-Type antes de fazer parse JSON
        const contentType = res.headers.get('content-type');
        
        // Verificar se a resposta é HTML (geralmente indica 404 ou erro)
        if (contentType && contentType.includes('text/html')) {
          const text = await res.text();
          throw new Error(
            `useLearningResources: Recebeu HTML em vez de JSON. Status: ${res.status}. ` +
            `Isso geralmente indica que o endpoint não existe (404). ` +
            `Primeiros caracteres: ${text.substring(0, 100)}`
          );
        }
        
        if (contentType && contentType.includes('application/json')) {
          result = await res.json();
        } else {
          // Se não for JSON, tentar fazer parse mesmo assim (pode ser texto JSON sem header)
          const text = await res.text();
          
          // Verificar se começa com HTML (indicador de erro 404)
          if (text.trim().toLowerCase().startsWith('<!doctype') || text.trim().toLowerCase().startsWith('<html')) {
            throw new Error(
              `useLearningResources: Recebeu HTML em vez de JSON. Status: ${res.status}. ` +
              `Isso geralmente indica que o endpoint não existe (404). ` +
              `Primeiros caracteres: ${text.substring(0, 100)}`
            );
          }
          
          try {
            result = JSON.parse(text);
          } catch (parseError) {
            throw new Error(
              `useLearningResources: Resposta não é JSON válido. Content-Type: ${contentType || 'não especificado'}. ` +
              `Primeiros caracteres: ${text.substring(0, 50)}`
            );
          }
        }
      } else {
        throw new Error('useLearningResources: url ou fetchFn deve ser fornecido quando enableFetch=true');
      }

      setCards(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      // Em caso de erro, usar dados padrão
      setCards(DEFAULT_CARDS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, enableFetch]); // fetchFn não incluído para evitar re-renders desnecessários

  // Dados estáticos (quando não há fetch)
  const staticCards = useMemo(() => DEFAULT_CARDS, []);

  return {
    cards: enableFetch ? cards : staticCards,
    isLoading,
    error,
    refetch: fetchData,
  };
}
