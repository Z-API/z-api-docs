/**
 * useDeveloperHub - Custom Hook (Abordagem Moderna)
 * 
 * Responsabilidade: Lógica de dados do DeveloperHub
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
import { BookOpen, Rocket } from 'lucide-react';

/**
 * Opções de configuração do hook useDeveloperHub
 */
type UseDeveloperHubOptions = {
  /** URL para fetch de dados (opcional) */
  url?: string;
  /** Função customizada para fetch de dados (opcional) */
  fetchFn?: () => Promise<CardItem[]>;
  /** Se deve fazer fetch de dados */
  enableFetch?: boolean;
};

/**
 * Retorno do hook useDeveloperHub
 */
type UseDeveloperHubReturn = {
  /** Array de cards do DeveloperHub */
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
    title: 'Visão geral da Plataforma Z-API',
    description:
      'Conheça em detalhes a Plataforma Z-API hospedada pela equipe. Entenda nossa arquitetura, recursos disponíveis e como podemos ajudar você a escalar seus projetos com confiança e segurança.',
    link: '/docs/intro',
    icon: BookOpen,
  },
  {
    title: 'Guia de introdução',
    description:
      'Documentação completa para ajudar você a configurar seu ambiente de desenvolvimento, testar suas integrações, desenvolver aplicações robustas e integrar a Plataforma Z-API à sua pilha tecnológica de forma eficiente.',
    link: '/docs/quick-start/introducao',
    icon: Rocket,
  },
  {
    title: 'Artigos Explicativos do Blog',
    description:
      'Aprenda conceitos fundamentais através de artigos didáticos: instâncias, mensagens, webhooks, segurança e automação. Explicações simples com analogias do dia a dia para automatizadores.',
    link: '/blog',
    icon: BookOpen,
  },
];

/**
 * Custom Hook - useDeveloperHub
 * 
 * Gerencia a lógica de dados do DeveloperHub.
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
 * function DeveloperHub() {
 *   const { cards, isLoading } = useDeveloperHub();
 *   if (isLoading) return <Loading />;
 *   return <CardSection cards={cards} />;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Com fetch de dados
 * function DeveloperHub() {
 *   const { cards, isLoading, error } = useDeveloperHub({
 *     url: '/api/developer-hub-cards',
 *     enableFetch: true
 *   });
 *   if (isLoading) return <Loading />;
 *   if (error) return <Error message={error.message} />;
 *   return <CardSection cards={cards} />;
 * }
 * ```
 */
export function useDeveloperHub(
  options: UseDeveloperHubOptions = {}
): UseDeveloperHubReturn {
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
            `useDeveloperHub: Recebeu HTML em vez de JSON. Status: ${res.status}. ` +
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
              `useDeveloperHub: Recebeu HTML em vez de JSON. Status: ${res.status}. ` +
              `Isso geralmente indica que o endpoint não existe (404). ` +
              `Primeiros caracteres: ${text.substring(0, 100)}`
            );
          }
          
          try {
            result = JSON.parse(text);
          } catch (parseError) {
            throw new Error(
              `useDeveloperHub: Resposta não é JSON válido. Content-Type: ${contentType || 'não especificado'}. ` +
              `Primeiros caracteres: ${text.substring(0, 50)}`
            );
          }
        }
      } else {
        throw new Error('useDeveloperHub: url ou fetchFn deve ser fornecido quando enableFetch=true');
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
