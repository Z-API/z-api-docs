import type { Meta, StoryObj } from "@storybook/react";
import CardLink from "./index";

const meta: Meta<typeof CardLink> = {
  title: "Components/CardLink",
  component: CardLink,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Card link simples com título e descrição opcional. Usado para links diretos em grids ou listas.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Título do link",
    },
    description: {
      control: "text",
      description: "Descrição do link (opcional)",
    },
    href: {
      control: "text",
      description: "URL de destino",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardLink>;

export const Default: Story = {
  args: {
    title: "Documentação",
    description: "Acesse a documentação completa da Z-API",
    href: "/docs/intro",
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "Blog",
    href: "/blog",
  },
};

export const ExternalLink: Story = {
  args: {
    title: "GitHub",
    description: "Repositório oficial da Z-API no GitHub",
    href: "https://github.com/z-api",
  },
};

export const MultipleLinks: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "16px",
        maxWidth: "600px",
      }}
    >
      <CardLink
        title="Documentação"
        description="Acesse a documentação completa"
        href="/Z-API-Central-Dev/docs/intro"
      />
      <CardLink
        title="Quick Start"
        description="Comece rapidamente"
        href="/Z-API-Central-Dev/docs/quick-start/introducao"
      />
      <CardLink
        title="API Reference"
        description="Referência completa da API"
        href="/Z-API-Central-Dev/docs/api-reference"
      />
      <CardLink
        title="Exemplos"
        description="Exemplos práticos de uso"
        href="/Z-API-Central-Dev/docs/examples"
      />
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
