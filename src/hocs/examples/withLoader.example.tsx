/**
 * Exemplo de uso do HOC withLoader
 * 
 * Demonstra como usar withLoader para adicionar estado de carregamento
 * seguindo o padrão do patterns.dev
 * https://www.patterns.dev/react/hoc-pattern/
 * 
 * Este exemplo usa imagens reais do projeto Z-API.
 */

import { withLoader } from '@site/src/hocs';

/**
 * Componente que exibe imagens de features da Z-API
 * Recebe dados via prop 'data'
 */
function ZApiFeatureImages({ data }: { data: { images: string[] } }) {
  return (
    <div>
      {data.images.map((image, index) => (
        <img key={index} src={image} alt={`Feature Z-API ${index + 1}`} />
      ))}
    </div>
  );
}

/**
 * Aplicar HOC withLoader ao componente ZApiFeatureImages
 * 
 * O HOC:
 * 1. Faz fetch da URL fornecida
 * 2. Exibe loading enquanto carrega
 * 3. Passa dados para o componente quando pronto
 * 4. Exibe erro se algo der errado
 */
export const ZApiFeatureImagesWithLoader = withLoader(
  ZApiFeatureImages,
  {
    url: '/api/feature-images',
    loadingText: 'Carregando imagens de features...',
    loadingSize: 'md',
    loadingVariant: 'spinner'
  }
);

/**
 * Uso do componente:
 * 
 * ```tsx
 * <ZApiFeatureImagesWithLoader />
 * ```
 * 
 * O componente automaticamente:
 * - Mostra "Carregando imagens de features..." enquanto faz fetch
 * - Renderiza ZApiFeatureImages com os dados quando pronto
 * - Mostra erro se a requisição falhar
 */

/**
 * Exemplo com função customizada de fetch
 */
export const ZApiFeatureImagesWithCustomFetch = withLoader(
  ZApiFeatureImages,
  {
    fetchFn: async () => {
      // Exemplo: buscar imagens de features da Z-API
      const res = await fetch('/api/z-api-features');
      if (!res.ok) {
        throw new Error('Falha ao carregar imagens');
      }
      const data = await res.json();
      return { images: data.images || [] };
    },
    loadingText: 'Buscando features da Z-API...'
  }
);

/**
 * Exemplo com componente de loading customizado
 */
function CustomLoading({ text }: { text?: string }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div className="spinner" />
      <p>{text || 'Carregando...'}</p>
    </div>
  );
}

export const ZApiFeatureImagesWithCustomLoading = withLoader(
  ZApiFeatureImages,
  {
    url: '/api/feature-images',
    LoadingComponent: CustomLoading,
    loadingText: 'Carregando imagens de features da Z-API...'
  }
);
