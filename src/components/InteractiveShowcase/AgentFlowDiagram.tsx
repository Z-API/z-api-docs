import {
    Background,
    Connection,
    Controls,
    Edge,
    MiniMap,
    Node,
    ReactFlow,
    addEdge,
    useEdgesState,
    useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { ReactElement } from 'react';
import { useCallback } from 'react';
import styles from './styles.module.css';

const initialNodes: Node[] = [
  {
    id: 'docs',
    position: { x: 0, y: 80 },
    data: { label: 'Documentação Z-API' },
    style: {
      background: 'linear-gradient(135deg, #d9fbe5, #b2ffd6)',
      border: '1px solid #12b76a',
      borderRadius: 16,
      fontWeight: 600,
      padding: 12,
      color: 'var(--text-primary)',
      /* Texto escuro para contraste sobre fundo claro */
    },
  },
  {
    id: 'agent',
    position: { x: 250, y: 0 },
    data: { label: 'Agent Runner' },
    style: {
      background: 'linear-gradient(135deg, #dbebff, #b6d4ff)',
      border: '1px solid #1d4ed8',
      borderRadius: 16,
      fontWeight: 600,
      padding: 12,
      color: 'var(--text-primary)',
      /* Texto escuro para contraste sobre fundo claro */
    },
  },
  {
    id: 'tools',
    position: { x: 250, y: 160 },
    data: { label: 'Ferramentas' },
    style: {
      background: 'linear-gradient(135deg, #fff3dc, #ffe2b5)',
      border: '1px solid #f97316',
      borderRadius: 16,
      fontWeight: 600,
      padding: 12,
      color: 'var(--text-primary)',
      /* Texto escuro para contraste sobre fundo claro */
    },
  },
  {
    id: 'api',
    position: { x: 500, y: 80 },
    data: { label: 'API Z-API' },
    style: {
      background: 'linear-gradient(135deg, #fce1f3, #ffb8e6)',
      border: '1px solid #db2777',
      borderRadius: 16,
      fontWeight: 600,
      padding: 12,
      color: 'var(--text-primary)',
      /* Texto escuro para contraste sobre fundo claro */
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'docs-agent',
    source: 'docs',
    target: 'agent',
    animated: true,
    label: 'Contexto',
    style: { strokeWidth: 2 },
  },
  {
    id: 'agent-tools',
    source: 'agent',
    target: 'tools',
    animated: true,
    label: 'Ações',
    style: { strokeWidth: 2 },
  },
  {
    id: 'tools-api',
    source: 'tools',
    target: 'api',
    animated: true,
    label: 'Requisições',
    style: { strokeWidth: 2 },
  },
  {
    id: 'api-agent',
    source: 'api',
    target: 'agent',
    animated: true,
    label: 'Observações',
    style: { strokeWidth: 2 },
  },
];

/**
 * Visualiza o padrão ReAct usando @xyflow/react (React Flow).
 * Ajuda a explicar como agentes combinam documentação, ferramentas
 * e chamadas HTTP em um único diagrama interativo.
 * 
 * Performance Notes:
 * - Atualmente usa 4 nós estáticos (performance adequada)
 * - Se o número de nós aumentar significativamente (>20), considerar:
 *   1. Virtualization usando `react-window` ou similar
 *   2. `onlyRenderVisibleElements={true}` prop no ReactFlow
 *   3. Lazy loading de dados do diagrama
 * - Para muitos nós dinâmicos, considerar `useMemo` para nodes/edges
 */
export const AgentFlowDiagram = (): ReactElement => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((currentEdges) =>
        addEdge(
          {
            ...connection,
            animated: true,
            style: { strokeWidth: 2 },
            label: 'Custom',
          },
          currentEdges,
        ),
      );
    },
    [setEdges],
  );

  return (
    <section 
      className={styles.showcaseCard}
      aria-label="Diagrama de fluxo interativo do agente Z-API">
      <p className={`${styles.showcaseTitle} text--success`}><strong>Fluxo Interativo</strong></p>
      <p className={styles.showcaseDescription}>
        Arraste nós, aproxime com scroll e conecte etapas para demonstrar como um agente consulta
        docs, executa ferramentas e envia eventos para a API Z-API.
      </p>

      <div 
        className={styles.flowCanvas}
        role="application"
        aria-label="Canvas interativo para manipulação de diagrama de fluxo"
        tabIndex={0}
        onKeyDown={(e) => {
          // Suporte a navegação por teclado será gerenciado pelo ReactFlow
          if (e.key === 'Escape') {
            e.currentTarget.blur();
          }
        }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          proOptions={{ hideAttribution: true }}
          minZoom={0.1}
          maxZoom={2}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          // Performance: Para muitos nós, considerar:
          // - onlyRenderVisibleElements={true} (renderiza apenas nós visíveis)
        >
          <MiniMap pannable zoomable />
          <Controls showZoom showFitView showInteractive />
          <Background gap={20} color="#e4e7ec" />
        </ReactFlow>
      </div>
    </section>
  );
};


