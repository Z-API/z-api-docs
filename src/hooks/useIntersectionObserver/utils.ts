/**
 * Utilitários para useIntersectionObserver
 */

/**
 * Calcula threshold otimizado baseado no tamanho do elemento
 * 
 * @param element - Elemento HTML para calcular threshold
 * @returns Threshold otimizado (0-1)
 */
export function getOptimalThreshold(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const elementHeight = rect.height;

  // Para elementos pequenos (< 30% da viewport), usar threshold menor
  if (elementHeight < viewportHeight * 0.3) {
    return 0.05; // 5% visível
  }

  // Para elementos médios, usar threshold padrão
  if (elementHeight < viewportHeight * 0.7) {
    return 0.1; // 10% visível
  }

  // Para elementos grandes, usar threshold maior
  return 0.15; // 15% visível
}

/**
 * Calcula rootMargin otimizado baseado no viewport
 * 
 * @returns RootMargin otimizado como string CSS
 */
export function getOptimalRootMargin(): string {
  const viewportHeight = window.innerHeight;
  // Trigger 10% da viewport antes do elemento entrar (melhor UX)
  const margin = Math.round(viewportHeight * 0.1);
  return `0px 0px -${margin}px 0px`;
}

