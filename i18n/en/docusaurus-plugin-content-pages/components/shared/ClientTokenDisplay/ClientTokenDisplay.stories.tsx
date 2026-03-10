import type { Meta, StoryObj } from '@storybook/react';
import ClientTokenDisplay from './ClientTokenDisplay';

const meta: Meta<typeof ClientTokenDisplay> = {
  title: 'Components/ClientTokenDisplay',
  component: ClientTokenDisplay,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente interativo e visualmente atraente para exibir o Client-Token com funcionalidade de cópia e animações suaves.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    instructionText: {
      control: 'text',
      description: 'Texto instrucional exibido acima do token',
    },
    tokenText: {
      control: 'text',
      description: 'Texto do token a ser exibido',
    },
    interactive: {
      control: 'boolean',
      description: 'Se o componente deve ser interativo (copiável)',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'highlighted'],
      description: 'Variante visual do componente',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClientTokenDisplay>;

export const Default: Story = {
  args: {
    instructionText: 'Verifique se está usando o token correto no header',
    tokenText: 'Client - Token',
    interactive: true,
    variant: 'default',
  },
};

export const Compact: Story = {
  args: {
    instructionText: 'Token necessário no header',
    tokenText: 'Client - Token',
    interactive: true,
    variant: 'compact',
  },
};

export const Highlighted: Story = {
  args: {
    instructionText: '⚠️ Verifique se está usando o token correto no header',
    tokenText: 'Client - Token',
    interactive: true,
    variant: 'highlighted',
  },
};

export const NonInteractive: Story = {
  args: {
    instructionText: 'Token exibido apenas para visualização',
    tokenText: 'Client - Token',
    interactive: false,
    variant: 'default',
  },
};

export const CustomText: Story = {
  args: {
    instructionText: 'Use este token para autenticar suas requisições',
    tokenText: 'Client-Token-Authentication-Key',
    interactive: true,
    variant: 'default',
  },
};

export const LongToken: Story = {
  args: {
    instructionText: 'Token longo para demonstração',
    tokenText: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    interactive: true,
    variant: 'default',
  },
};
