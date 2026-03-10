import type { Meta, StoryObj } from '@storybook/react';
import {
    AgentFlowDiagram,
    AutoAnimateList,
    LottieAgentPulse,
    ShowcaseSection,
} from '.';

const meta: Meta<typeof AgentFlowDiagram> = {
  title: 'Interactive/Agent Playground',
  component: AgentFlowDiagram,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AgentFlowDiagram>;

export const FlowDiagram: Story = {
  name: 'Fluxo ReAct',
  render: () => <AgentFlowDiagram />,
};

export const MicroAnimations: StoryObj = {
  name: 'Microanimações ReAct',
  render: () => <AutoAnimateList />,
};

export const AgentPulse: StoryObj = {
  name: 'Estado do Agente',
  render: () => <LottieAgentPulse message="Webhook conectado com sucesso" />,
};

export const LazyShowcase: StoryObj = {
  name: 'Seção Lazy carregando demos',
  render: () => <ShowcaseSection />,
  parameters: {
    docs: {
      description: {
        story: 'Carrega os três componentes via React.lazy + Suspense.',
      },
    },
  },
};


