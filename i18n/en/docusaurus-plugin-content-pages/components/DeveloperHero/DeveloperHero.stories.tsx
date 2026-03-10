import type { Meta, StoryObj } from "@storybook/react";
import { Book, Code2, MessageSquare, Rocket, ShieldCheck } from "lucide-react";
import { DeveloperHero } from "./index";

const meta: Meta<typeof DeveloperHero> = {
  title: "Sections/DeveloperHero",
  component: DeveloperHero,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Hero inspirado no WhatsApp Business Developer Hub. Componente principal da homepage com título, subtítulo, CTAs e estatísticas. Suporta múltiplos temas e animações com Framer Motion.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: "select",
      options: ["classic", "zapi", "hybrid", "official"],
      description: "Tema do design system",
    },
    title: {
      control: "text",
      description: "Título principal",
    },
    subtitle: {
      control: "text",
      description: "Subtítulo/descrição",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeveloperHero>;

export const Default: Story = {
  args: {
    theme: "classic",
  },
};

export const OfficialTheme: Story = {
  args: {
    theme: "official",
  },
};

export const ZAPITheme: Story = {
  args: {
    theme: "zapi",
  },
};

export const CustomTitle: Story = {
  args: {
    theme: "official",
    title: "Transforme conversas em resultados",
    subtitle:
      "Integre WhatsApp na sua aplicação e alcance seus clientes de forma eficiente.",
  },
};

export const CustomCTAs: Story = {
  args: {
    theme: "official",
    primaryCta: {
      label: "Começar agora",
      to: "/docs/quick-start/introducao",
    },
    secondaryCta: {
      label: "Ver documentação",
      to: "/docs/intro",
    },
  },
};

export const CustomStats: Story = {
  args: {
    theme: "official",
    stats: [
      { icon: Code2, label: "SDKs Disponíveis", value: "10+" },
      { icon: Rocket, label: "Tempo de Integração", value: "< 15min" },
      { icon: ShieldCheck, label: "Uptime", value: "99.95%" },
      { icon: MessageSquare, label: "Mensagens/Dia", value: "1M+" },
    ],
  },
};

export const MinimalStats: Story = {
  args: {
    theme: "official",
    stats: [
      { icon: Book, label: "Documentação", value: "200+ páginas" },
      { icon: ShieldCheck, label: "SLA garantido", value: "99.95%" },
    ],
  },
};
