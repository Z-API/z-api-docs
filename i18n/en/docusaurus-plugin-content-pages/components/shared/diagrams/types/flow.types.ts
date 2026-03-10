/**
 * Tipos de Domínio - Fluxo
 * 
 * Este arquivo contém os tipos relacionados à lógica de negócio de fluxos,
 * independente da implementação de apresentação (diagrama).
 * 
 * Princípio: Separation of Concerns
 * - Tipos de fluxo descrevem o DOMÍNIO (o que é um fluxo, edge, node, step)
 * - Tipos de diagrama descrevem a APRESENTAÇÃO (como renderizar)
 */

import type { LucideIcon } from 'lucide-react';

/**
 * Tipo semântico de edge/fluxo
 * Representa o significado do fluxo, não sua aparência visual
 */
export type FlowEdgeType = 
  | 'success'    // Fluxo de sucesso, confirmação, caminho válido
  | 'warning'   // Fluxo de aviso, condição, decisão
  | 'error'     // Fluxo de erro, falha, rejeição
  | 'info'      // Fluxo informativo, dados
  | 'neutral'    // Fluxo neutro, sem significado especial
  | 'secondary' // Fluxo secundário, alternativo
  | 'default';  // Fluxo padrão, principal

/**
 * Tipo de nó em um fluxo
 * Representa o papel do nó no fluxo, não sua aparência
 */
export type FlowNodeType = 
  | 'input'   // Nó de entrada (início do fluxo)
  | 'default' // Nó padrão (processamento)
  | 'output'; // Nó de saída (fim do fluxo)

/**
 * Interface para um nó em um fluxo
 * Define a estrutura de dados de um nó, independente de como será renderizado
 */
export interface FlowNode {
  /** Identificador único do nó */
  id: string;
  /** Rótulo/texto do nó */
  label: string;
  /** Ícone opcional (apenas para referência, renderização é responsabilidade do diagrama) */
  icon?: LucideIcon;
  /** Tipo do nó (input, default, output) */
  type?: FlowNodeType;
  /** Cor customizada (opcional, override da cor padrão do tipo) */
  color?: string;
  /** Descrição adicional do nó */
  description?: string;
}

/**
 * Interface para uma conexão/edge em um fluxo
 * Define a estrutura de dados de uma conexão entre nós
 */
export interface FlowEdge {
  /** ID do nó de origem */
  from: string;
  /** ID do nó de destino */
  to: string;
  /** Rótulo opcional da conexão */
  label?: string;
  /** Tipo semântico da conexão (success, warning, error, etc.) */
  type?: FlowEdgeType;
}

/**
 * Interface para uma etapa em um fluxo animado
 * Define a estrutura de dados de uma etapa em um fluxo sequencial
 */
export interface FlowStep {
  /** Ícone da etapa */
  icon: LucideIcon;
  /** Rótulo da etapa */
  label: string;
  /** Descrição opcional da etapa */
  description?: string;
  /** Delay de animação opcional (em segundos) */
  delay?: number;
  /** Cor customizada (opcional, override da cor padrão) */
  color?: string;
}
