import type { Meta, StoryObj } from "@storybook/react";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import React from "react";
import Badge from "./index";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente Badge para exibir tags, labels e indicadores. Suporta múltiplas variantes de cor, tamanhos diferentes e pode ser removível.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Texto ou conteúdo do badge",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error", "info"],
      description: "Variante do badge",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamanho do badge",
    },
    removable: {
      control: "boolean",
      description: "Se o badge é removível",
    },
    disabled: {
      control: "boolean",
      description: "Se o badge está desabilitado",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "primary",
    size: "md",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Badge icon={<CheckCircle size={14} />} variant="success">
        Sucesso
      </Badge>
      <Badge icon={<AlertCircle size={14} />} variant="warning">
        Aviso
      </Badge>
      <Badge icon={<Info size={14} />} variant="info">
        Informação
      </Badge>
    </div>
  ),
};

export const Removable: Story = {
  args: {
    children: "Filtro",
    variant: "primary",
    removable: true,
    onRemove: () => {
      console.warn("Badge removido");
    },
  },
};

export const Disabled: Story = {
  args: {
    children: "Desabilitado",
    variant: "primary",
    disabled: true,
  },
};

export const AllVariantsRemovable: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Badge variant="primary" removable onRemove={() => {}}>
        Primary
      </Badge>
      <Badge variant="secondary" removable onRemove={() => {}}>
        Secondary
      </Badge>
      <Badge variant="success" removable onRemove={() => {}}>
        Success
      </Badge>
      <Badge variant="warning" removable onRemove={() => {}}>
        Warning
      </Badge>
      <Badge variant="error" removable onRemove={() => {}}>
        Error
      </Badge>
      <Badge variant="info" removable onRemove={() => {}}>
        Info
      </Badge>
    </div>
  ),
};
