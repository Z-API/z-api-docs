import { ComponentType, useEffect, useState } from 'react';
import Loading from '@site/src/components/shared/Loading';
import type { LoadingSize, LoadingVariant } from '@site/src/components/shared/Loading';

/**
 * Props que o HOC withLoader adiciona ao componente
 */
export type WithLoaderProps = {
  /** Dados carregados (disponível após loading) */
  data?: unknown;
  /** Se está carregando */
  isLoading?: boolean;
  /** Erro ocorrido durante carregamento */
  error?: Error | null;
};

/**
 * Opções de configuração para o HOC withLoader
 */
export type WithLoaderOptions<T = unknown> = {
  /** URL para fetch de dados */
  url?: string;
  /** Função customizada para fetch de dados */
  fetchFn?: () => Promise<T>;
  /** Tamanho do spinner (padrão: 'md') */
  loadingSize?: LoadingSize;
  /** Variante do loading (padrão: 'spinner') */
  loadingVariant?: LoadingVariant;
  /** Texto do loading (padrão: 'Carregando...') */
  loadingText?: string;
  /** Se deve mostrar loading em fullscreen */
  fullscreen?: boolean;
  /** Componente customizado de loading */
  LoadingComponent?: ComponentType<{ size?: LoadingSize; variant?: LoadingVariant; text?: string; fullscreen?: boolean }>;
  /** Componente customizado de erro */
  ErrorComponent?: ComponentType<{ error: Error }>;
};

/**
 * Higher Order Component que adiciona estado de carregamento a qualquer componente.
 * 
 * Segue o padrão HOC do React conforme https://www.patterns.dev/react/hoc-pattern/
 * 
 * O HOC gerencia o estado de loading, faz fetch de dados (se URL fornecida),
 * e exibe loading/erro enquanto os dados são carregados.
 * 
 * @param Component - Componente a ser envolvido
 * @param options - Opções de configuração do loader
 * @returns Componente envolvido com funcionalidade de loading
 * 
 * @example
 * ```tsx
 * // Componente original
 * function ZApiFeatureImages({ data }: { data: { images: string[] } }) {
 *   return (
 *     <div>
 *       {data.images.map((img, i) => (
 *         <img key={i} src={img} alt={`Feature Z-API ${i + 1}`} />
 *       ))}
 *     </div>
 *   );
 * }
 * 
 * // Aplicar HOC com URL
 * const ZApiFeatureImagesWithLoader = withLoader(
 *   ZApiFeatureImages,
 *   {
 *     url: '/api/feature-images',
 *     loadingText: 'Carregando features...'
 *   }
 * );
 * 
 * // Usar componente
 * <ZApiFeatureImagesWithLoader />
 * ```
 * 
 * @example
 * ```tsx
 * // Com função customizada de fetch
 * const MyComponentWithLoader = withLoader(
 *   MyComponent,
 *   {
 *     fetchFn: async () => {
 *       const res = await fetch('/api/data');
 *       return res.json();
 *     }
 *   }
 * );
 * ```
 */
export function withLoader<P extends object, T = unknown>(
  Component: ComponentType<P & { data: T }>,
  options: WithLoaderOptions<T> = {}
): ComponentType<Omit<P, 'data'>> {
  const {
    url,
    fetchFn,
    loadingSize = 'md',
    loadingVariant = 'spinner',
    loadingText = 'Carregando...',
    fullscreen = false,
    LoadingComponent = Loading,
    ErrorComponent,
  } = options;

  return function WithLoaderComponent(props: Omit<P, 'data'>) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      async function loadData() {
        try {
          setIsLoading(true);
          setError(null);

          let result: T;

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
                `withLoader: Recebeu HTML em vez de JSON. Status: ${res.status}. ` +
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
                  `withLoader: Recebeu HTML em vez de JSON. Status: ${res.status}. ` +
                  `Isso geralmente indica que o endpoint não existe (404). ` +
                  `Primeiros caracteres: ${text.substring(0, 100)}`
                );
              }
              
              try {
                result = JSON.parse(text);
              } catch (parseError) {
                throw new Error(
                  `withLoader: Resposta não é JSON válido. Content-Type: ${contentType || 'não especificado'}. ` +
                  `Primeiros caracteres: ${text.substring(0, 50)}`
                );
              }
            }
          } else {
            throw new Error('withLoader: url ou fetchFn deve ser fornecido');
          }

          setData(result);
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Erro desconhecido'));
        } finally {
          setIsLoading(false);
        }
      }

      loadData();
    }, [url, fetchFn]);

    // Mostrar loading
    if (isLoading) {
      return (
        <LoadingComponent
          size={loadingSize}
          variant={loadingVariant}
          text={loadingText}
          fullscreen={fullscreen}
        />
      );
    }

    // Mostrar erro
    if (error) {
      if (ErrorComponent) {
        return <ErrorComponent error={error} />;
      }
      return (
        <div role="alert" aria-live="assertive">
          <p>Erro ao carregar dados: {error.message}</p>
        </div>
      );
    }

    // Renderizar componente com dados
    if (!data) {
      return null;
    }

    return <Component {...(props as P)} data={data} />;
  };
}
