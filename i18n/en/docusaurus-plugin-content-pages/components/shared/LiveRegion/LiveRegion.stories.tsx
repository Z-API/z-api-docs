import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import LiveRegion from "./index";

const meta: Meta<typeof LiveRegion> = {
  title: "Components/LiveRegion",
  component: LiveRegion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente LiveRegion para anunciar mudanças dinâmicas para screen readers. Útil para notificações, mensagens de sucesso/erro, atualizações de status, etc. O componente é invisível visualmente, mas anuncia mudanças para assistentes de voz.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "text",
      description: "Mensagem a ser anunciada",
    },
    politeness: {
      control: "select",
      options: ["polite", "assertive", "off"],
      description: "Nível de politeness (polite, assertive, off)",
    },
    clearAfter: {
      control: "number",
      description: "Tempo em ms para limpar mensagem (opcional)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiveRegion>;

export const Default: Story = {
  args: {
    message: "Item adicionado ao carrinho",
    politeness: "polite",
  },
};

export const Assertive: Story = {
  args: {
    message: "Erro ao salvar! Por favor, tente novamente.",
    politeness: "assertive",
  },
};

export const AutoClear: Story = {
  args: {
    message: "Salvo com sucesso!",
    politeness: "polite",
    clearAfter: 3000,
  },
  render: (args) => {
    const [message, setMessage] = useState<string | null>(args.message || null);

    return (
      <div style={{ textAlign: "center" }}>
        <LiveRegion {...args} message={message} />
        <p>Esta mensagem será limpa automaticamente após 3 segundos.</p>
        <button onClick={() => setMessage("Mensagem atualizada!")}>
          Atualizar mensagem
        </button>
      </div>
    );
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [message, setMessage] = useState<string | null>(null);
    const [politeness, setPoliteness] = useState<
      "polite" | "assertive" | "off"
    >("polite");

    return (
      <div style={{ padding: "2rem", maxWidth: "600px" }}>
        <h2>Demo Interativo de LiveRegion</h2>
        <p>
          Este componente é invisível visualmente, mas anuncia mudanças para
          screen readers. Teste com um leitor de tela para ver o comportamento.
        </p>

        <div style={{ marginTop: "2rem" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Nível de Politeness:
            <select
              value={politeness}
              onChange={(e) =>
                setPoliteness(e.target.value as typeof politeness)
              }
              style={{ marginLeft: "8px" }}
            >
              <option value="polite">Polite (não interrompe)</option>
              <option value="assertive">Assertive (interrompe)</option>
              <option value="off">Off (desabilitado)</option>
            </select>
          </label>
        </div>

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <button onClick={() => setMessage("Operação concluída com sucesso!")}>
            Mensagem de Sucesso
          </button>
          <button onClick={() => setMessage("Erro: operação falhou!")}>
            Mensagem de Erro
          </button>
          <button onClick={() => setMessage("Carregando...")}>
            Mensagem de Carregamento
          </button>
          <button onClick={() => setMessage(null)}>Limpar</button>
        </div>

        <LiveRegion message={message} politeness={politeness} />

        {message && (
          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              background: "#f5f5f5",
              borderRadius: "4px",
            }}
          >
            <strong>Mensagem atual (invisível visualmente):</strong>
            <p>{message}</p>
            <small>Use um screen reader para ouvir o anúncio.</small>
          </div>
        )}
      </div>
    );
  },
};

export const SuccessMessage: Story = {
  args: {
    message: "Formulário enviado com sucesso!",
    politeness: "polite",
  },
};

export const ErrorMessage: Story = {
  args: {
    message: "Erro ao processar solicitação. Tente novamente.",
    politeness: "assertive",
  },
};
