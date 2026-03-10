# Diagramas - Estrutura de Tipos

**Versão**: 2.0.0  
**Última Atualização**: 2025-01-30

---

## Visão Geral

Este diretório contém componentes de diagramas seguindo o princípio de **Separation of Concerns**, separando claramente:

- **Tipos de Domínio (Fluxo)**: Lógica de negócio sobre fluxos
- **Tipos de Apresentação (Diagrama)**: Como renderizar os diagramas
- **Utilitários**: Funções auxiliares (cores, transformações, etc.)

---

## Estrutura de Arquivos

```
diagrams/
├── types/
│   ├── flow.types.ts      # Tipos de domínio (fluxo)
│   └── diagram.types.ts   # Tipos de apresentação (diagrama)
├── utils/
│   └── flowColors.ts      # Utilitários de cores
├── InteractiveFlowDiagram.tsx
├── AnimatedFlow.tsx
├── ScrollRevealDiagram.tsx
├── DiagramToggle.tsx
└── index.ts               # Exports centralizados
```

---

## Tipos de Domínio (Fluxo)

**Arquivo**: `types/flow.types.ts`

Contém os tipos relacionados à **lógica de negócio** de fluxos, independente de como serão renderizados:

### Tipos Principais

- `FlowEdgeType`: Tipo semântico de edge (`success`, `warning`, `error`, `info`, `neutral`, `secondary`, `default`)
- `FlowNodeType`: Tipo de nó (`input`, `default`, `output`)
- `FlowNode`: Interface para um nó em um fluxo
- `FlowEdge`: Interface para uma conexão entre nós
- `FlowStep`: Interface para uma etapa em um fluxo animado

### Exemplo

```typescript
import type { FlowNode, FlowEdge } from '@site/src/components/shared/diagrams';

const nodes: FlowNode[] = [
  { id: '1', label: 'Início', type: 'input' },
  { id: '2', label: 'Processo', type: 'default' },
  { id: '3', label: 'Fim', type: 'output' },
];

const edges: FlowEdge[] = [
  { from: '1', to: '2', type: 'default' },
  { from: '2', to: '3', type: 'success' },
];
```

---

## Tipos de Apresentação (Diagrama)

**Arquivo**: `types/diagram.types.ts`

Contém os tipos relacionados à **apresentação/visualização** de diagramas, específicos para cada biblioteca:

### Tipos Principais

- `InteractiveFlowDiagramProps`: Props do componente React Flow
- `ScrollRevealDiagramProps`: Props do componente Mermaid wrapper
- `AnimatedFlowProps`: Props do componente de fluxo animado
- `ReactFlowNode`: Tipo para nós do React Flow
- `ReactFlowEdge`: Tipo para edges do React Flow

### Exemplo

```typescript
import type { InteractiveFlowDiagramProps } from '@site/src/components/shared/diagrams';

const props: InteractiveFlowDiagramProps = {
  height: 500,
  showControls: true,
};
```

---

## Utilitários

**Arquivo**: `utils/flowColors.ts`

Contém funções utilitárias para mapear tipos de fluxo (domínio) para cores CSS (apresentação):

### Funções Principais

- `getEdgeColor(edgeType)`: Mapeia tipo de edge para cor CSS
- `getNodeColor(nodeType)`: Mapeia tipo de nó para cor CSS
- `defaultNodeColors`: Objeto com cores padrão para nós

### Exemplo

```typescript
import { getEdgeColor } from '@site/src/components/shared/diagrams';

const color = getEdgeColor('success'); // Retorna: 'var(--diagram-line-success, #10B981)'
```

---

## Componentes

### InteractiveFlowDiagram

Diagrama interativo usando React Flow. Aceita tipos de domínio (`FlowNode`, `FlowEdge`) e os transforma em tipos de apresentação (`Node`, `Edge` do React Flow).

```tsx
import { InteractiveFlowDiagram } from '@site/src/components/shared/diagrams';
import type { FlowNode, FlowEdge } from '@site/src/components/shared/diagrams';

<InteractiveFlowDiagram
  nodes={nodes}
  edges={edges}
  height={500}
  showControls={true}
/>
```

### AnimatedFlow

Fluxo animado de etapas. Aceita tipos de domínio (`FlowStep`) e renderiza com animações.

```tsx
import { AnimatedFlow } from '@site/src/components/shared/diagrams';
import type { FlowStep } from '@site/src/components/shared/diagrams';

<AnimatedFlow
  steps={steps}
  direction="horizontal"
  autoPlay={true}
/>
```

### ScrollRevealDiagram

Wrapper para diagramas Mermaid com animação de scroll reveal.

```tsx
import { ScrollRevealDiagram } from '@site/src/components/shared/diagrams';

<ScrollRevealDiagram delay={0.2} direction="up">
  <div className="mermaid">
    graph LR
      A[Início] --> B[Fim]
  </div>
</ScrollRevealDiagram>
```

---

## Princípios de Design

### Separation of Concerns

- **Domínio**: Tipos de fluxo descrevem **o que** é um fluxo, edge, node, step
- **Apresentação**: Tipos de diagrama descrevem **como** renderizar

### Single Responsibility

- Cada arquivo tem uma responsabilidade única
- Tipos de domínio não conhecem detalhes de apresentação
- Utilitários são reutilizáveis e testáveis

### Open/Closed Principle

- Fácil adicionar novos tipos de fluxo sem modificar componentes
- Fácil adicionar novos componentes de diagrama sem modificar tipos de domínio

---

## Migração de Código Antigo

Se você estava usando os tipos diretamente dos componentes, atualize para usar os tipos exportados:

### Antes

```typescript
import { InteractiveFlowDiagram } from './diagrams';
// Tipos estavam dentro do componente
```

### Depois

```typescript
import { 
  InteractiveFlowDiagram,
  type FlowNode,
  type FlowEdge,
  type FlowEdgeType,
} from './diagrams';
```

---

## Referências

- [DIAGRAM_COLORS.md](./DIAGRAM_COLORS.md) - Padrão de cores semânticas
- [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

---

**Versão**: 2.0.0  
**Última Atualização**: 2025-01-30
