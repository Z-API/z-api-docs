import type { Meta, StoryObj } from "@storybook/react";
import Callout from "./index";

const meta: Meta<typeof Callout> = {
  title: "Components/Callout",
  component: Callout,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Componente Callout para exibir mensagens informativas, de sucesso, aviso ou erro. Usado para destacar informações importantes na documentação.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Título do callout (opcional)",
    },
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
      description: "Variante do callout",
    },
    children: {
      control: "text",
      description: "Conteúdo do callout",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Info: Story = {
  args: {
    variant: "info",
    children: "Esta é uma mensagem informativa.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Operação realizada com sucesso!",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Atenção: Esta ação requer atenção.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Erro: Algo deu errado.",
  },
};

export const WithTitle: Story = {
  args: {
    variant: "info",
    title: "Informação Importante",
    children: "Este é um callout com título e conteúdo.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Callout variant="info" title="Informação">
        Esta é uma mensagem informativa com título.
      </Callout>
      <Callout variant="success" title="Sucesso">
        Operação realizada com sucesso!
      </Callout>
      <Callout variant="warning" title="Atenção">
        Atenção: Esta ação requer atenção.
      </Callout>
      <Callout variant="error" title="Erro">
        Erro: Algo deu errado.
      </Callout>
    </div>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Callout variant="info">
        Esta é uma mensagem informativa sem título.
      </Callout>
      <Callout variant="success">Operação realizada com sucesso!</Callout>
      <Callout variant="warning">Atenção: Esta ação requer atenção.</Callout>
      <Callout variant="error">Erro: Algo deu errado.</Callout>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    variant: "info",
    title: "Documentação Completa",
    children:
      "Esta é uma mensagem de callout com conteúdo longo. Ela demonstra como o componente se comporta quando há muito texto para exibir. O componente deve manter a formatação adequada e ser fácil de ler mesmo com conteúdo extenso.",
  },
};
