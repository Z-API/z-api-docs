import type { Meta, StoryObj } from '@storybook/react';
import ResourceLink from './index';

const meta: Meta<typeof ResourceLink> = {
  title: 'Components/ResourceLink',
  component: ResourceLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    item: {
      description:
        'Item de link com label e destino (to para interno, href para externo)',
    },
    className: {
      description: 'Classe CSS adicional para customização',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResourceLink>;

export const Interno: Story = {
  name: 'Interno',
  args: {
    item: {
      label: 'Documentação (Intro)',
      to: '/docs/intro',
    },
  },
};

export const Externo: Story = {
  name: 'Externo',
  args: {
    item: {
      label: 'Docusaurus',
      href: 'https://docusaurus.io/docs',
    },
  },
};

export const Lista: Story = {
  name: 'Lista de Links',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ResourceLink item={{ label: 'Mensagens', to: '/docs/messages/introducao' }} />
      <ResourceLink item={{ label: 'Webhooks', to: '/docs/webhooks/introducao' }} />
      <ResourceLink item={{ label: 'Z-API Oficial', href: 'https://developer.z-api.io' }} />
    </div>
  ),
};


