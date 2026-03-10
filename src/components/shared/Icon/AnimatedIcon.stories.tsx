import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, Check, Heart, Loader, Star, X, Zap } from 'lucide-react';
import AnimatedIcon from './AnimatedIcon';

const meta: Meta<typeof AnimatedIcon> = {
  title: 'Components/Shared/AnimatedIcon',
  component: AnimatedIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de ícone SVG animado que combina lucide-react com framer-motion. Suporta diferentes tipos de animação e respeita prefers-reduced-motion para acessibilidade.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: 'Componente de ícone do lucide-react',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamanho do ícone',
    },
    animation: {
      control: 'select',
      options: ['none', 'hover', 'rotate', 'pulse', 'bounce'],
      description: 'Tipo de animação',
    },
    color: {
      control: 'color',
      description: 'Cor do ícone (CSS color value)',
    },
    disabled: {
      control: 'boolean',
      description: 'Se o ícone está desabilitado',
    },
    clickable: {
      control: 'boolean',
      description: 'Se o ícone é clicável',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedIcon>;

/**
 * Ícone básico sem animação
 */
export const Default: Story = {
  args: {
    icon: Zap,
    size: 'md',
    animation: 'none',
  },
};

/**
 * Ícone com animação de hover (padrão)
 */
export const Hover: Story = {
  args: {
    icon: Heart,
    size: 'lg',
    animation: 'hover',
  },
};

/**
 * Ícone com animação de rotação
 */
export const Rotate: Story = {
  args: {
    icon: Star,
    size: 'lg',
    animation: 'rotate',
    clickable: true,
  },
};

/**
 * Ícone com animação de pulso (útil para loading)
 */
export const Pulse: Story = {
  args: {
    icon: Loader,
    size: 'lg',
    animation: 'pulse',
    color: 'var(--ifm-color-primary)',
  },
};

/**
 * Ícone com animação de bounce
 */
export const Bounce: Story = {
  args: {
    icon: ArrowRight,
    size: 'lg',
    animation: 'bounce',
  },
};

/**
 * Ícone clicável
 */
export const Clickable: Story = {
  args: {
    icon: Check,
    size: 'lg',
    animation: 'hover',
    clickable: true,
    onClick: () => {
      console.warn('Ícone clicado!');
    },
    'aria-label': 'Confirmar',
  },
};

/**
 * Ícone desabilitado
 */
export const Disabled: Story = {
  args: {
    icon: X,
    size: 'lg',
    animation: 'hover',
    disabled: true,
  },
};

/**
 * Diferentes tamanhos
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <AnimatedIcon icon={Zap} size="xs" animation="hover" />
      <AnimatedIcon icon={Zap} size="sm" animation="hover" />
      <AnimatedIcon icon={Zap} size="md" animation="hover" />
      <AnimatedIcon icon={Zap} size="lg" animation="hover" />
      <AnimatedIcon icon={Zap} size="xl" animation="hover" />
    </div>
  ),
};

/**
 * Diferentes cores
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <AnimatedIcon icon={Heart} size="lg" animation="hover" color="red" />
      <AnimatedIcon icon={Star} size="lg" animation="hover" color="gold" />
      <AnimatedIcon icon={Zap} size="lg" animation="hover" color="blue" />
      <AnimatedIcon icon={Check} size="lg" animation="hover" color="green" />
    </div>
  ),
};

/**
 * Todos os tipos de animação
 */
export const AllAnimations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <AnimatedIcon icon={Zap} size="lg" animation="none" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>None</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AnimatedIcon icon={Zap} size="lg" animation="hover" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Hover</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AnimatedIcon icon={Zap} size="lg" animation="rotate" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Rotate</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AnimatedIcon icon={Zap} size="lg" animation="pulse" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Pulse</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AnimatedIcon icon={Zap} size="lg" animation="bounce" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Bounce</p>
      </div>
    </div>
  ),
};

