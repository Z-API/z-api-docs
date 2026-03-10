import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "./index";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente Tooltip para exibir informações adicionais ao passar o mouse. Suporta múltiplas posições e é totalmente acessível via teclado.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "text",
      description: "Conteúdo do tooltip",
    },
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Posição do tooltip",
    },
    delay: {
      control: "number",
      description: "Delay antes de mostrar (ms)",
    },
    disabled: {
      control: "boolean",
      description: "Se o tooltip está desabilitado",
    },
    alwaysVisible: {
      control: "boolean",
      description: "Se deve mostrar sempre",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "Informação adicional",
    children: <button type="button">Hover me</button>,
  },
};

export const Top: Story = {
  args: {
    content: "Tooltip no topo",
    position: "top",
    children: <button type="button">Hover me</button>,
  },
};

export const Bottom: Story = {
  args: {
    content: "Tooltip embaixo",
    position: "bottom",
    children: <button type="button">Hover me</button>,
  },
};

export const Left: Story = {
  args: {
    content: "Tooltip à esquerda",
    position: "left",
    children: <button type="button">Hover me</button>,
  },
};

export const Right: Story = {
  args: {
    content: "Tooltip à direita",
    position: "right",
    children: <button type="button">Hover me</button>,
  },
};

export const AlwaysVisible: Story = {
  args: {
    content: "Este tooltip está sempre visível",
    alwaysVisible: true,
    children: <button type="button">Sempre visível</button>,
  },
};

export const Disabled: Story = {
  args: {
    content: "Este tooltip não aparecerá",
    disabled: true,
    children: <button type="button">Disabled</button>,
  },
};

export const WithDelay: Story = {
  args: {
    content: "Tooltip com delay de 1 segundo",
    delay: 1000,
    children: <button type="button">Hover me (delay)</button>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <div>
        <strong>Informação Importante</strong>
        <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
          Este é um tooltip com conteúdo rico, incluindo formatação.
        </p>
      </div>
    ),
    children: <button type="button">Tooltip rico</button>,
  },
};

export const AllPositions: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "48px",
        padding: "64px",
        maxWidth: "800px",
      }}
    >
      <div />
      <Tooltip content="Top" position="top">
        <button type="button" style={{ width: "100px", height: "40px" }}>
          Top
        </button>
      </Tooltip>
      <div />
      <Tooltip content="Left" position="left">
        <button type="button" style={{ width: "100px", height: "40px" }}>
          Left
        </button>
      </Tooltip>
      <div />
      <Tooltip content="Right" position="right">
        <button type="button" style={{ width: "100px", height: "40px" }}>
          Right
        </button>
      </Tooltip>
      <div />
      <Tooltip content="Bottom" position="bottom">
        <button type="button" style={{ width: "100px", height: "40px" }}>
          Bottom
        </button>
      </Tooltip>
      <div />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};
