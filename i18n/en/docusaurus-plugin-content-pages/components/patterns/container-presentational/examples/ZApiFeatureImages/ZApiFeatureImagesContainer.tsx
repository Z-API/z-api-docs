/**
 * ZApiFeatureImagesContainer - Componente Container (Abordagem Clássica)
 * 
 * Responsabilidade: O quê de dados é exibido
 * - Gerencia estado e lógica de aplicação
 * - Faz fetch de dados
 * - Passa dados para componente presentacional
 * 
 * Segue o padrão Container/Presentational conforme:
 * https://www.patterns.dev/react/presentational-container-pattern/
 * 
 * NOTA: Esta é a abordagem clássica usando class components.
 * Para React 18+, prefira usar Hooks (ver useZApiFeatureImages.ts).
 */

import { Component } from 'react';
import ZApiFeatureImages from './ZApiFeatureImages';
import type { ReactNode } from 'react';

/**
 * Estado do componente Container
 */
type ZApiFeatureImagesContainerState = {
  images: string[];
  isLoading: boolean;
  error: Error | null;
};

/**
 * Imagens padrão do projeto Z-API
 */
const DEFAULT_IMAGES: string[] = [
  '/img/Status1.jpeg',
  '/img/Status2.jpeg',
  '/img/Status3.jpeg',
  '/img/Status4.jpeg',
  '/img/Status6.jpeg',
];

/**
 * Componente Container - ZApiFeatureImagesContainer
 * 
 * Este componente gerencia a lógica de aplicação:
 * - Faz fetch de dados (opcional)
 * - Gerencia estado de loading e erro
 * - Passa dados para o componente presentacional ZApiFeatureImages
 * 
 * Por padrão, usa imagens estáticas do projeto.
 * 
 * @example
 * ```tsx
 * // Uso básico (imagens estáticas)
 * <ZApiFeatureImagesContainer />
 * ```
 */
export default class ZApiFeatureImagesContainer extends Component<
  {},
  ZApiFeatureImagesContainerState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      images: DEFAULT_IMAGES,
      isLoading: false,
      error: null,
    };
  }

  override componentDidMount(): void {
    // Por padrão, usa imagens estáticas
    // Para fazer fetch, descomente e configure:
    // this.fetchImages();
  }

  async fetchImages(url?: string): Promise<void> {
    if (!url) {
      // Usar imagens padrão se não houver URL
      return;
    }

    try {
      this.setState({ isLoading: true, error: null });

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
          `ZApiFeatureImagesContainer: Recebeu HTML em vez de JSON. Status: ${res.status}. ` +
          `Isso geralmente indica que o endpoint não existe (404). ` +
          `Primeiros caracteres: ${text.substring(0, 100)}`
        );
      }
      
      let data: string[];
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        // Se não for JSON, tentar fazer parse mesmo assim (pode ser texto JSON sem header)
        const text = await res.text();
        
        // Verificar se começa com HTML (indicador de erro 404)
        if (text.trim().toLowerCase().startsWith('<!doctype') || text.trim().toLowerCase().startsWith('<html')) {
          throw new Error(
            `ZApiFeatureImagesContainer: Recebeu HTML em vez de JSON. Status: ${res.status}. ` +
            `Isso geralmente indica que o endpoint não existe (404). ` +
            `Primeiros caracteres: ${text.substring(0, 100)}`
          );
        }
        
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          throw new Error(
            `ZApiFeatureImagesContainer: Resposta não é JSON válido. Content-Type: ${contentType || 'não especificado'}. ` +
            `Primeiros caracteres: ${text.substring(0, 50)}`
          );
        }
      }
      this.setState({ images: data, isLoading: false });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error : new Error('Erro desconhecido'),
        isLoading: false,
        images: DEFAULT_IMAGES, // Fallback para imagens padrão
      });
    }
  }

  override render(): ReactNode {
    return (
      <ZApiFeatureImages
        images={this.state.images}
        isLoading={this.state.isLoading}
        error={this.state.error}
        title="Features da Z-API"
      />
    );
  }
}
