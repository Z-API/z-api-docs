/**
 * ZApiFeatureImagesWithHook - Componente Presentacional usando Hook
 * 
 * Demonstra a abordagem moderna do padrão Container/Presentational:
 * - Hook gerencia lógica de dados (useZApiFeatureImages)
 * - Componente gerencia apenas apresentação
 * 
 * Segue o padrão Container/Presentational conforme:
 * https://www.patterns.dev/react/presentational-container-pattern/
 * 
 * Esta é a abordagem recomendada para React 18+.
 */

import ZApiFeatureImages from './ZApiFeatureImages';
import { useZApiFeatureImages } from './useZApiFeatureImages';
import type { ReactNode } from 'react';

/**
 * Componente Presentacional usando Hook
 * 
 * Este componente:
 * - Usa hook para obter dados (lógica separada)
 * - Foca apenas na apresentação
 * - Mantém separação de concerns sem Container Component
 * 
 * @returns Componente React renderizado
 * 
 * @example
 * ```tsx
 * // Uso básico (imagens estáticas)
 * <ZApiFeatureImagesWithHook />
 * 
 * // Com fetch de dados
 * <ZApiFeatureImagesWithHook 
 *   dataUrl="/api/feature-images"
 *   enableFetch={true}
 * />
 * ```
 */
export default function ZApiFeatureImagesWithHook(): ReactNode {
  // Hook gerencia lógica de dados (separado da apresentação)
  const { images, isLoading, error } = useZApiFeatureImages();

  // Componente apenas renderiza (apresentação)
  return (
    <ZApiFeatureImages
      images={images}
      isLoading={isLoading}
      error={error}
      title="Features da Z-API"
    />
  );
}
