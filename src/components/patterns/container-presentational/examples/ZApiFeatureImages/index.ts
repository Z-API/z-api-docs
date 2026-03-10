/**
 * Exports para o exemplo ZApiFeatureImages do padrão Container/Presentational
 * 
 * Este exemplo demonstra o padrão usando imagens reais do projeto Z-API.
 */

// Presentational Component
export { default as ZApiFeatureImages } from './ZApiFeatureImages';

// Container Component (clássico - class component)
export { default as ZApiFeatureImagesContainer } from './ZApiFeatureImagesContainer';

// Custom Hook (moderno - recomendado)
export { useZApiFeatureImages } from './useZApiFeatureImages';

// Componente Presentacional usando Hook (moderno - recomendado)
export { default as ZApiFeatureImagesWithHook } from './ZApiFeatureImagesWithHook';
