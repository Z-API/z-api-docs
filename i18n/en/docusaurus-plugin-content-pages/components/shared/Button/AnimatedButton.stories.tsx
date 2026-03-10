import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, Check, Download, Loader, X, Zap } from 'lucide-react';
import AnimatedButton from './AnimatedButton';

const meta: Meta<typeof AnimatedButton> = {
  title: 'Components/Shared/AnimatedButton',
  component: AnimatedButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Botão animado com framer-motion e suporte a ícones SVG do lucide-react. Inclui micro-interações suaves e estados visuais (hover, active, loading, disabled).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Variante do botão',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do botão',
    },
    disabled: {
      control: 'boolean',
      description: 'Se o botão está desabilitado',
    },
    loading: {
      control: 'boolean',
      description: 'Se o botão está em estado de loading',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Se o botão ocupa toda a largura disponível',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedButton>;

/**
 * Botão primário básico
 */
export const Primary: Story = {
  args: {
    children: 'Clique aqui',
    variant: 'primary',
    onClick: () => {
      console.warn('Botão clicado!');
    },
  },
};

/**
 * Botão com ícone à esquerda
 */
export const WithIconLeft: Story = {
  args: {
    children: 'Ativar',
    icon: Zap,
    iconPosition: 'left',
    variant: 'primary',
  },
};

/**
 * Botão com ícone à direita
 */
export const WithIconRight: Story = {
  args: {
    children: 'Continuar',
    icon: ArrowRight,
    iconPosition: 'right',
    variant: 'primary',
  },
};

/**
 * Botão em estado de loading
 */
export const Loading: Story = {
  args: {
    children: 'Carregando...',
    icon: Loader,
    loading: true,
    disabled: true,
    variant: 'primary',
  },
};

/**
 * Botão desabilitado
 */
export const Disabled: Story = {
  args: {
    children: 'Desabilitado',
    disabled: true,
    variant: 'primary',
  },
};

/**
 * Todas as variantes
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '200px' }}>
      <AnimatedButton variant="primary">Primary</AnimatedButton>
      <AnimatedButton variant="secondary">Secondary</AnimatedButton>
      <AnimatedButton variant="outline">Outline</AnimatedButton>
      <AnimatedButton variant="ghost">Ghost</AnimatedButton>
      <AnimatedButton variant="danger">Danger</AnimatedButton>
    </div>
  ),
};

/**
 * Diferentes tamanhos
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <AnimatedButton size="sm" variant="primary">
        Small
      </AnimatedButton>
      <AnimatedButton size="md" variant="primary">
        Medium
      </AnimatedButton>
      <AnimatedButton size="lg" variant="primary">
        Large
      </AnimatedButton>
    </div>
  ),
};

/**
 * Botão com largura total
 */
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <AnimatedButton fullWidth variant="primary" icon={Download}>
        Download Completo
      </AnimatedButton>
    </div>
  ),
};

/**
 * Botões com diferentes ícones
 */
export const WithDifferentIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '200px' }}>
      <AnimatedButton variant="primary" icon={Check} iconPosition="left">
        Confirmar
      </AnimatedButton>
      <AnimatedButton variant="outline" icon={X} iconPosition="left">
        Cancelar
      </AnimatedButton>
      <AnimatedButton variant="ghost" icon={Download} iconPosition="right">
        Baixar
      </AnimatedButton>
      <AnimatedButton variant="secondary" icon={Zap} iconPosition="right">
        Ativar
      </AnimatedButton>
    </div>
  ),
};

