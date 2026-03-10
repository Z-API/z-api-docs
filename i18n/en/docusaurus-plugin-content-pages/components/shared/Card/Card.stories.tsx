import type { CardItem } from '@site/src/types';
import type { Meta, StoryObj } from '@storybook/react';
import Card from './index';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    card: {
      description: 'Dados do card (título, descrição, link)',
    },
    className: {
      description: 'Classe CSS adicional para customização',
      control: 'text',
    },
    linkText: {
      description: 'Text do link (padrão: "Saiba mais →")',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const defaultCard: CardItem = {
  title: 'Visão geral da Plataforma Z-API',
  description: 'Saiba mais sobre a Plataforma Z-API hospedada pela equipe.',
  link: '/docs/intro',
};

export const Default: Story = {
  args: {
    card: defaultCard,
  },
};

export const CustomLinkText: Story = {
  args: {
    card: defaultCard,
    linkText: 'Acessar →',
  },
};

export const LongDescription: Story = {
  args: {
    card: {
      title: 'Documentação Completa',
      description: 'Documentação completa e organizada de todas as funcionalidades da Z-API. Desde Quick Start até recursos avançados como WhatsApp Business e Communities.',
      link: '/docs/intro',
    },
  },
};

