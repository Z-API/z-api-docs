import { ReactFlow, Node, Edge, Background, Controls, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import styles from './InteractiveFlowDiagram.module.css';
import type { FlowNode, FlowEdge } from './types/flow.types';
import type { InteractiveFlowDiagramProps } from './types/diagram.types';
import { getEdgeColor, getNodeColor } from './utils/flowColors';

/**
 * Props completas do InteractiveFlowDiagram
 * Combina props de apresentação com dados de domínio
 */
interface InteractiveFlowDiagramFullProps extends InteractiveFlowDiagramProps {
  /** Nós do fluxo (domínio) */
  nodes: FlowNode[];
  /** Edges do fluxo (domínio) */
  edges: FlowEdge[];
}

export function InteractiveFlowDiagram({
  nodes,
  edges,
  height = 400,
  showControls = true,
}: InteractiveFlowDiagramFullProps) {
  const reactFlowNodes: Node[] = nodes.map((node, index) => ({
    id: node.id,
    type: node.type || 'default',
    data: {
      label: (
        <div className={styles.nodeContent}>
          {node.icon && <node.icon size={20} className={styles.nodeIcon} />}
          <div className={styles.nodeText}>
            <span className={styles.nodeLabel}>{node.label}</span>
            {node.description && (
              <small className={styles.nodeDescription}>{node.description}</small>
            )}
          </div>
        </div>
      ),
    },
    position: {
      x: index * 200,
      y: 0,
    },
    style: {
      background: node.color || getNodeColor(node.type),
      color: 'var(--text-inverse)',
      /* Usa variável CSS para adaptação ao tema */
      border: `2px solid rgba(255, 255, 255, 0.3)`,
      borderRadius: '12px',
      padding: '12px 16px',
      minWidth: '140px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      fontWeight: 600,
    },
  }));

  const reactFlowEdges: Edge[] = edges.map((edge: FlowEdge) => {
    // Extrair tipo do edge ou usar 'default'
    const edgeType = edge.type || 'default';
    const edgeColor = getEdgeColor(edgeType);
    
    return {
      id: `e${edge.from}-${edge.to}`,
      source: edge.from,
      target: edge.to,
      ...(edge.label && { label: edge.label }),
      animated: true,
      style: { stroke: edgeColor, strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: edgeColor,
      },
    };
  });

  return (
    <div className={styles.container} style={{ height: `${height}px` }}>
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        fitView
        attributionPosition="bottom-left"
        className={styles.reactFlow}
        minZoom={0.1}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background />
        {showControls && <Controls showZoom showFitView showInteractive />}
      </ReactFlow>
    </div>
  );
}

