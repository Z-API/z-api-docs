import type { Meta, StoryObj } from "@storybook/react";
import { Cloud, MessageSquare, Smartphone } from "lucide-react";
import { ProductCard } from "./index";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Card inspirado no WhatsApp Business Developer Hub. Pode ser reutilizado em grids de produtos/APIs. Renderiza com ícone, título, descrição e CTA em verde-escuro (sempre em negrito).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      description: "Ícone do lucide-react",
    },
    title: {
      control: "text",
      description: "Título do card",
    },
    description: {
      control: "text",
      description: "Descrição do card",
    },
    link: {
      control: "text",
      description: "Link de destino",
    },
    linkLabel: {
      control: "text",
      description: "Texto do link (CTA)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    icon: MessageSquare,
    title: "WhatsApp Business API",
    description:
      "Envie e receba mensagens em escala. Integre a API do WhatsApp ao seu CRM ou plataforma de comunicação.",
    link: "/docs/messages/introducao",
    linkLabel: "Explorar API",
  },
};

export const CloudAPI: Story = {
  args: {
    icon: Cloud,
    title: "Cloud API",
    description:
      "Hospedagem gerenciada pela Meta. Comece a enviar mensagens rapidamente sem gerenciar sua própria infraestrutura.",
    link: "/docs/instance/introducao",
    linkLabel: "Começar com Cloud API",
  },
};

export const WhatsAppBusinessApp: Story = {
  args: {
    icon: Smartphone,
    title: "WhatsApp Business App",
    description:
      "Aplicativo gratuito para pequenas empresas se comunicarem com clientes de forma simples e pessoal.",
    link: "https://www.whatsapp.com/business/",
    linkLabel: "Baixar aplicativo",
  },
};

export const AllProducts: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "24px",
        maxWidth: "1200px",
      }}
    >
      <ProductCard
        icon={MessageSquare}
        title="WhatsApp Business API"
        description="Envie e receba mensagens em escala. Integre a API do WhatsApp ao seu CRM ou plataforma de comunicação."
        link="/docs/messages/introducao"
        linkLabel="Explorar API"
      />
      <ProductCard
        icon={Cloud}
        title="Cloud API"
        description="Hospedagem gerenciada pela Meta. Comece a enviar mensagens rapidamente sem gerenciar sua própria infraestrutura."
        link="/docs/instance/introducao"
        linkLabel="Começar com Cloud API"
      />
      <ProductCard
        icon={Smartphone}
        title="WhatsApp Business App"
        description="Aplicativo gratuito para pequenas empresas se comunicarem com clientes de forma simples e pessoal."
        link="https://www.whatsapp.com/business/"
        linkLabel="Baixar aplicativo"
      />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};
