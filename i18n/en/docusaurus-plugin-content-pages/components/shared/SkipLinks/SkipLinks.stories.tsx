import type { Meta, StoryObj } from "@storybook/react";
import SkipLinks from "./index";

const meta: Meta<typeof SkipLinks> = {
  title: "Components/SkipLinks",
  component: SkipLinks,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Componente SkipLinks para links de navegação rápida. Permite usuários de teclado e screen readers pular para seções principais da página. Os links aparecem apenas quando recebem foco via teclado (Tab).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    links: {
      control: "object",
      description: "Links customizados (opcional)",
    },
    className: {
      control: "text",
      description: "Classe CSS adicional",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkipLinks>;

const customLinks = [
  { targetId: "main-content", label: "Ir para conteúdo principal", order: 1 },
  { targetId: "navigation", label: "Ir para navegação", order: 2 },
  { targetId: "sidebar", label: "Ir para sidebar", order: 3 },
  { targetId: "footer", label: "Ir para rodapé", order: 4 },
];

export const Default: Story = {
  args: {},
  render: () => (
    <div>
      <SkipLinks />
      <div style={{ padding: "2rem" }}>
        <h2>Como usar SkipLinks</h2>
        <ol>
          <li>Pressione Tab para ver os links de skip aparecerem</li>
          <li>Use as setas para navegar entre os links</li>
          <li>Pressione Enter para ir para a seção</li>
        </ol>
        <div
          id="main-content"
          style={{ marginTop: "2rem", padding: "2rem", background: "#f5f5f5" }}
        >
          <h3>Conteúdo Principal</h3>
          <p>Esta é a seção principal da página.</p>
        </div>
        <div
          id="main-navigation"
          style={{ marginTop: "2rem", padding: "2rem", background: "#f0f0f0" }}
        >
          <h3>Navegação Principal</h3>
          <p>Esta é a seção de navegação.</p>
        </div>
      </div>
    </div>
  ),
};

export const CustomLinks: Story = {
  args: {
    links: customLinks,
  },
  render: (args) => (
    <div>
      <SkipLinks {...args} />
      <div style={{ padding: "2rem" }}>
        <h2>SkipLinks Customizados</h2>
        <p>
          Este exemplo usa links customizados para diferentes seções da página.
        </p>
        <div
          id="main-content"
          style={{ marginTop: "2rem", padding: "2rem", background: "#f5f5f5" }}
        >
          <h3>Conteúdo Principal</h3>
        </div>
        <div
          id="navigation"
          style={{ marginTop: "2rem", padding: "2rem", background: "#f0f0f0" }}
        >
          <h3>Navegação</h3>
        </div>
        <div
          id="sidebar"
          style={{ marginTop: "2rem", padding: "2rem", background: "#e5e5e5" }}
        >
          <h3>Sidebar</h3>
        </div>
        <div
          id="footer"
          style={{ marginTop: "2rem", padding: "2rem", background: "#ddd" }}
        >
          <h3>Rodapé</h3>
        </div>
      </div>
    </div>
  ),
};

export const AccessibleDemo: Story = {
  args: {},
  render: () => (
    <div>
      <SkipLinks />
      <header
        id="main-navigation"
        style={{ padding: "1rem", background: "#25D366", color: "white" }}
      >
        <h1>Site Demo com SkipLinks</h1>
      </header>
      <main
        id="main-content"
        style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}
      >
        <h2>Conteúdo Principal</h2>
        <p>
          Pressione <strong>Tab</strong> ao carregar esta página para ver os
          links de skip aparecerem no topo.
        </p>
        <p>
          Os SkipLinks são essenciais para acessibilidade, permitindo que
          usuários de teclado e screen readers naveguem rapidamente para seções
          importantes da página.
        </p>
      </main>
      <footer
        id="footer"
        style={{
          padding: "2rem",
          background: "#1a1a1a",
          color: "white",
          marginTop: "4rem",
        }}
      >
        <p>© 2025 Z-API Central. Todos os direitos reservados.</p>
      </footer>
    </div>
  ),
};
