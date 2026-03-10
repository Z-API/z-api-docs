/**
 * useZApiFeatureImages - Custom Hook (Abordagem Moderna Recomendada)
 * 
 * Responsabilidade: Lógica de dados (separada da apresentação)
 * - Gerencia estado de dados
 * - Faz fetch de dados (opcional)
 * - Retorna dados, loading e error
 * 
 * Segue o padrão Container/Presentational conforme:
 * https://www.patterns.dev/react/presentational-container-pattern/
 * 
 * NOTA: Esta é a abordagem moderna recomendada para React 18+.
 * Hooks são preferidos sobre Container Components porque:
 * - Evitam componentes de classe
 * - Reduzem nesting
 * - Melhoram debugging no React DevTools
 */

import { useEffect, useMemo, useState } from 'react';

/**
 * Opções de configuração do hook useZApiFeatureImages
 */
type UseZApiFeatureImagesOptions = {
  /** URL para fetch de dados (opcional) */
  url?: string;
  /** Função customizada para fetch de dados (opcional) */
  fetchFn?: () => Promise<string[]>;
  /** Se deve fazer fetch de dados */
  enableFetch?: boolean;
};

/**
 * Retorno do hook useZApiFeatureImages
 */
type UseZApiFeatureImagesReturn = {
  /** Array de URLs de imagens de features da Z-API */
  images: string[];
  /** Se está carregando */
  isLoading: boolean;
  /** Erro ocorrido */
  error: Error | null;
  /** Função para recarregar dados */
  refetch: () => void;
};

/**
 * Imagens padrão do projeto Z-API (Status features)
 * Estas são imagens reais do projeto em static/img/
 */
const DEFAULT_IMAGES: string[] = [
  '/img/Status1.jpeg',
  '/img/Status2.jpeg',
  '/img/Status3.jpeg',
  '/img/Status4.jpeg',
  '/img/Status6.jpeg',
];

/**
 * Custom Hook - useZApiFeatureImages
 * 
 * Gerencia a lógica de dados de imagens de features da Z-API.
 * Separa a lógica de dados da apresentação.
 * 
 * Por padrão, retorna imagens estáticas do projeto.
 * Pode fazer fetch de dados se enableFetch=true e url/fetchFn fornecidos.
 * 
 * @param options - Opções de configuração do hook
 * @param options.url - URL para fetch de dados
 * @param options.fetchFn - Função customizada para fetch
 * @param options.enableFetch - Se deve fazer fetch (padrão: false)
 * @returns Objeto com images, isLoading, error e refetch
 * 
 * @example
 * ```tsx
 * // Uso básico (imagens estáticas do projeto)
 * function ZApiFeatureImages() {
 *   const { images, isLoading, error } = useZApiFeatureImages();
 *   
 *   if (isLoading) return <Loading />;
 *   if (error) return <Error message={error.message} />;
 *   
 *   return images.map((img, i) => <img key={i} src={img} alt="Feature" />);
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Com fetch de dados
 * function ZApiFeatureImages() {
 *   const { images, isLoading, error } = useZApiFeatureImages({
 *     url: '/api/feature-images',
 *     enableFetch: true
 *   });
 *   
 *   if (isLoading) return <Loading />;
 *   if (error) return <Error message={error.message} />;
 *   
 *   return images.map((img, i) => <img key={i} src={img} alt="Feature" />);
 * }
 * ```
 */
export function useZApiFeatureImages(
  options: UseZApiFeatureImagesOptions = {}
): UseZApiFeatureImagesReturn {
  const { url, fetchFn, enableFetch = false } = options;

  const [images, setImages] = useState<string[]>(DEFAULT_IMAGES);
  const [isLoading, setIsLoading] = useState(enableFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!enableFetch) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      let result: string[];

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
            `useZApiFeatureImages: Recebeu HTML em vez de JSON. Status: ${res.status}. ` +
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
              `useZApiFeatureImages: Recebeu HTML em vez de JSON. Status: ${res.status}. ` +
              `Isso geralmente indica que o endpoint não existe (404). ` +
              `Primeiros caracteres: ${text.substring(0, 100)}`
            );
          }
          
          try {
            result = JSON.parse(text);
          } catch (parseError) {
            throw new Error(
              `useZApiFeatureImages: Resposta não é JSON válido. Content-Type: ${contentType || 'não especificado'}. ` +
              `Primeiros caracteres: ${text.substring(0, 50)}`
            );
          }
        }
      } else {
        throw new Error('useZApiFeatureImages: url ou fetchFn deve ser fornecido quando enableFetch=true');
      }

      setImages(result);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro desconhecido')
      );
      // Em caso de erro, usar imagens padrão
      setImages(DEFAULT_IMAGES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, enableFetch]); // fetchFn não incluído para evitar re-renders desnecessários

  // Dados estáticos (quando não há fetch)
  const staticImages = useMemo(() => DEFAULT_IMAGES, []);

  return {
    images: enableFetch ? images : staticImages,
    isLoading,
    error,
    refetch: fetchData,
  };
}
