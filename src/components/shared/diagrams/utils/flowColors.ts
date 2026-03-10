/**
 * Utilitários de Cores para Fluxos
 * 
 * Este arquivo contém funções utilitárias para mapear tipos de fluxo
 * (domínio) para cores CSS (apresentação).
 * 
 * Princípio: Separation of Concerns
 * - Lógica de cores separada dos tipos de domínio
 * - Facilita manutenção e customização de cores
 */

import type { FlowEdgeType, FlowNodeType } from '../types/flow.types';

/**
 * Mapeia tipos de edge para cores semânticas CSS
 * 
 * @param edgeType - Tipo semântico do edge (success, warning, error, etc.)
 * @returns Variável CSS correspondente ao tipo
 */
export function getEdgeColor(edgeType?: FlowEdgeType): string {
  const colorMap: Record<FlowEdgeType, string> = {
    success: 'var(--diagram-line-success, #10B981)',
    warning: 'var(--diagram-line-warning, #F59E0B)',
    error: 'var(--diagram-line-error, #EF4444)',
    info: 'var(--diagram-line-info, #3B82F6)',
    neutral: 'var(--diagram-line-neutral, #6B7280)',
    secondary: 'var(--diagram-line-secondary, #06B6D4)',
    default: 'var(--diagram-line-primary, #4a90e2)',
  };
  
  const type: FlowEdgeType = (edgeType || 'default') as FlowEdgeType;
  return colorMap[type] || colorMap.default;
}

/**
 * Cores padrão para nós do diagrama
 * Usa variáveis CSS para suporte a temas
 */
export const defaultNodeColors: Record<FlowNodeType, string> = {
  input: '#e1f5ff',
  default: 'var(--diagram-line-primary, #4a90e2)',
  output: 'var(--diagram-line-success, #10B981)',
};

/**
 * Obtém a cor padrão para um tipo de nó
 * 
 * @param nodeType - Tipo do nó (input, default, output)
 * @returns Variável CSS ou cor hexadecimal correspondente ao tipo
 */
export function getNodeColor(nodeType?: FlowNodeType): string {
  const type: FlowNodeType = (nodeType || 'default') as FlowNodeType;
  return defaultNodeColors[type] || defaultNodeColors.default;
}
