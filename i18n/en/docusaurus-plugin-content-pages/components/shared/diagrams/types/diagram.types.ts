/**
 * Tipos de Apresentação - Diagrama
 * 
 * Este arquivo contém os tipos relacionados à apresentação/visualização
 * de diagramas, específicos para cada biblioteca de renderização.
 * 
 * Princípio: Separation of Concerns
 * - Tipos de diagrama descrevem a APRESENTAÇÃO (como renderizar)
 * - Tipos de fluxo descrevem o DOMÍNIO (o que é um fluxo)
 */

import type { Node, Edge } from '@xyflow/react';

/**
 * Props para InteractiveFlowDiagram (React Flow)
 * Define as propriedades específicas do componente de diagrama interativo
 */
export interface InteractiveFlowDiagramProps {
  /** Altura do diagrama em pixels */
  height?: number;
  /** Se deve mostrar controles de zoom/pan */
  showControls?: boolean;
}

/**
 * Props para ScrollRevealDiagram (Mermaid wrapper)
 * Define as propriedades específicas do componente de diagrama com scroll reveal
 */
export interface ScrollRevealDiagramProps {
  /** Conteúdo do diagrama (geralmente código Mermaid) */
  children: React.ReactNode;
  /** Delay de animação em segundos */
  delay?: number;
  /** Direção da animação de entrada */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Se deve mostrar controles de zoom */
  showZoomControls?: boolean;
  /** Zoom inicial do diagrama (padrão: 1.0 = 100%) */
  initialZoom?: number;
}

/**
 * Props para AnimatedFlow
 * Define as propriedades específicas do componente de fluxo animado
 */
export interface AnimatedFlowProps {
  /** Direção do fluxo (horizontal ou vertical) */
  direction?: 'horizontal' | 'vertical';
  /** Se deve animar automaticamente */
  autoPlay?: boolean;
}

/**
 * Tipo para nós do React Flow
 * Extensão do tipo Node do React Flow com dados customizados
 */
export type ReactFlowNode = Node;

/**
 * Tipo para edges do React Flow
 * Extensão do tipo Edge do React Flow
 */
export type ReactFlowEdge = Edge;
