/**
 * Exports para padrão Container/Presentational
 * 
 * Segue o padrão conforme:
 * https://www.patterns.dev/react/presentational-container-pattern/
 */

// Exemplos (usando imagens reais do projeto Z-API)
export * from './examples/ZApiFeatureImages';

// Hooks customizados (abordagem moderna recomendada)
export { useDeveloperHub } from './patterns/DeveloperHub/useDeveloperHub';
export { useHomepageFeatures } from './patterns/HomepageFeatures/useHomepageFeatures';
export { useLearningResources } from './patterns/LearningResources/useLearningResources';

// Containers (abordagem clássica)
export { default as DeveloperHubContainer } from './patterns/DeveloperHub/DeveloperHubContainer';
