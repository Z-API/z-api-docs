import type { Meta, StoryObj } from "@storybook/react";
import Loading from "./index";

const meta: Meta<typeof Loading> = {
  title: "Components/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente Loading para exibir estados de carregamento. Suporta múltiplas variantes: spinner, dots, pulse e skeleton.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamanho do spinner",
    },
    variant: {
      control: "select",
      options: ["spinner", "dots", "pulse", "skeleton"],
      description: "Variante do loading",
    },
    text: {
      control: "text",
      description: "Texto opcional abaixo do spinner",
    },
    fullscreen: {
      control: "boolean",
      description: "Se deve ocupar toda a tela",
    },
    isLoading: {
      control: "boolean",
      description: "Se está carregando (para skeleton)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Spinner: Story = {
  args: {
    variant: "spinner",
    size: "md",
  },
};

export const Dots: Story = {
  args: {
    variant: "dots",
    size: "md",
  },
};

export const Pulse: Story = {
  args: {
    variant: "pulse",
    size: "md",
  },
};

export const Skeleton: Story = {
  args: {
    variant: "skeleton",
    isLoading: true,
  },
};

export const WithText: Story = {
  args: {
    variant: "spinner",
    size: "md",
    text: "Carregando...",
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        alignItems: "center",
      }}
    >
      <div>
        <p style={{ marginBottom: "8px", textAlign: "center" }}>Small</p>
        <Loading variant="spinner" size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: "8px", textAlign: "center" }}>Medium</p>
        <Loading variant="spinner" size="md" />
      </div>
      <div>
        <p style={{ marginBottom: "8px", textAlign: "center" }}>Large</p>
        <Loading variant="spinner" size="lg" />
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "32px",
        maxWidth: "600px",
      }}
    >
      <div>
        <p style={{ marginBottom: "8px", textAlign: "center" }}>Spinner</p>
        <Loading variant="spinner" />
      </div>
      <div>
        <p style={{ marginBottom: "8px", textAlign: "center" }}>Dots</p>
        <Loading variant="dots" />
      </div>
      <div>
        <p style={{ marginBottom: "8px", textAlign: "center" }}>Pulse</p>
        <Loading variant="pulse" />
      </div>
      <div>
        <p style={{ marginBottom: "8px", textAlign: "center" }}>Skeleton</p>
        <Loading variant="skeleton" isLoading={true} />
      </div>
    </div>
  ),
};

export const SkeletonWithContent: Story = {
  render: () => (
    <Loading variant="skeleton" isLoading={false}>
      <div
        style={{
          padding: "16px",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
        }}
      >
        <h3>Conteúdo Carregado</h3>
        <p>Este conteúdo é exibido quando isLoading é false.</p>
      </div>
    </Loading>
  ),
};
