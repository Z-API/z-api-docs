/**
 * useHomepageFeatures - Custom Hook (Abordagem Moderna)
 * 
 * Responsabilidade: Lógica de dados do HomepageFeatures
 * - Gerencia dados das features
 * - Pode fazer fetch de dados no futuro
 * - Retorna dados prontos para uso
 * 
 * Segue o padrão Container/Presentational conforme:
 * https://www.patterns.dev/react/presentational-container-pattern/
 */

import { useEffect, useMemo, useState } from 'react';
import type { FeatureItem } from '@site/src/types';
import { Rocket, Shield, Zap } from 'lucide-react';

/**
 * Tipo de feature com ícone
 */
type FeatureWithIcon = FeatureItem & {
  icon: typeof Zap;
};

/**
 * Opções de configuração do hook useHomepageFeatures
 */
type UseHomepageFeaturesOptions = {
  /** URL para fetch de dados (opcional) */
  url?: string;
  /** Função customizada para fetch de dados (opcional) */
  fetchFn?: () => Promise<FeatureWithIcon[]>;
  /** Se deve fazer fetch de dados */
  enableFetch?: boolean;
};

/**
 * Retorno do hook useHomepageFeatures
 */
type UseHomepageFeaturesReturn = {
  /** Array de features */
  features: FeatureWithIcon[];
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
const DEFAULT_FEATURES: FeatureWithIcon[] = [
  {
    title: 'Automatize fluxos de atendimento',
    description: (
      <>
        Chatbots customizáveis e APIs REST para criar experiências interativas
        sem upgrades ou manutenção. Integre com qualquer stack: CRMs, ERPs,
        plataformas web, mobile, gateways ou arquiteturas próprias.
      </>
    ),
    icon: Zap,
  },
  {
    title: 'Teste sem código com Swagger',
    description: (
      <>
        Use o Swagger para testar nossa API sem precisar escrever código.
        Ideal para validar rotas, parâmetros e respostas em tempo real.
        Faça seus primeiros testes diretamente via Postman.
      </>
    ),
    icon: Rocket,
  },
  {
    title: 'Escalabilidade e suporte',
    description: (
      <>
        Gerencie múltiplas instâncias em paralelo com autenticação robusta
        e escalabilidade horizontal. Suporte nacional 24/7, documentação
        clara e parceria de verdade.
      </>
    ),
    icon: Shield,
  },
];

/**
 * Custom Hook - useHomepageFeatures
 * 
 * Gerencia a lógica de dados das features da homepage.
 * Separa a lógica de dados da apresentação.
 * 
 * Suporta fetch de dados opcional via URL ou função customizada.
 * 
 * @param options - Opções de configuração do hook
 * @param options.url - URL para fetch de dados
 * @param options.fetchFn - Função customizada para fetch
 * @param options.enableFetch - Se deve fazer fetch (padrão: false)
 * @returns Objeto com features, isLoading, error e refetch
 * 
 * @example
 * ```tsx
 * // Uso básico (dados estáticos)
 * function HomepageFeatures() {
 *   const { features, isLoading } = useHomepageFeatures();
 *   if (isLoading) return <Loading />;
 *   return features.map(feature => <Feature key={feature.title} {...feature} />);
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Com fetch de dados
 * function HomepageFeatures() {
 *   const { features, isLoading, error } = useHomepageFeatures({
 *     url: '/api/homepage-features',
 *     enableFetch: true
 *   });
 *   if (isLoading) return <Loading />;
 *   if (error) return <Error message={error.message} />;
 *   return features.map(feature => <Feature key={feature.title} {...feature} />);
 * }
 * ```
 */
export function useHomepageFeatures(
  options: UseHomepageFeaturesOptions = {}
): UseHomepageFeaturesReturn {
  const { url, fetchFn, enableFetch = false } = options;

  const [features, setFeatures] = useState<FeatureWithIcon[]>(DEFAULT_FEATURES);
  const [isLoading, setIsLoading] = useState(enableFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!enableFetch) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      let result: FeatureWithIcon[];

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
            `useHomepageFeatures: Recebeu HTML em vez de JSON. Status: ${res.status}. ` +
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
              `useHomepageFeatures: Recebeu HTML em vez de JSON. Status: ${res.status}. ` +
              `Isso geralmente indica que o endpoint não existe (404). ` +
              `Primeiros caracteres: ${text.substring(0, 100)}`
            );
          }
          
          try {
            result = JSON.parse(text);
          } catch (parseError) {
            throw new Error(
              `useHomepageFeatures: Resposta não é JSON válido. Content-Type: ${contentType || 'não especificado'}. ` +
              `Primeiros caracteres: ${text.substring(0, 50)}`
            );
          }
        }
      } else {
        throw new Error('useHomepageFeatures: url ou fetchFn deve ser fornecido quando enableFetch=true');
      }

      setFeatures(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      // Em caso de erro, usar dados padrão
      setFeatures(DEFAULT_FEATURES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, enableFetch]); // fetchFn não incluído para evitar re-renders desnecessários

  // Dados estáticos (quando não há fetch)
  const staticFeatures = useMemo(() => DEFAULT_FEATURES, []);

  return {
    features: enableFetch ? features : staticFeatures,
    isLoading,
    error,
    refetch: fetchData,
  };
}
