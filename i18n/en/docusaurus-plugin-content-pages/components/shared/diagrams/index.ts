// Componentes
export { InteractiveFlowDiagram } from './InteractiveFlowDiagram';
export { AnimatedFlow } from './AnimatedFlow';
export { ScrollRevealDiagram } from './ScrollRevealDiagram';
export { DiagramToggle } from './DiagramToggle';
export { DiagramZoomControls } from './DiagramZoomControls';

// Tipos de Domínio (Fluxo)
export type {
  FlowEdgeType,
  FlowNodeType,
  FlowNode,
  FlowEdge,
  FlowStep,
} from './types/flow.types';

// Tipos de Apresentação (Diagrama)
export type {
  InteractiveFlowDiagramProps,
  ScrollRevealDiagramProps,
  AnimatedFlowProps,
  ReactFlowNode,
  ReactFlowEdge,
} from './types/diagram.types';

// Utilitários
export { getEdgeColor, getNodeColor, defaultNodeColors } from './utils/flowColors';

