import type { Meta, StoryObj } from "@storybook/react";
import PostCTA from "./index";

const meta: Meta<typeof PostCTA> = {
  title: "Components/PostCTA",
  component: PostCTA,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Componente PostCTA para exibir links recomendados no final de posts do blog. Renderiza cards clicáveis organizados em grid responsivo.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Título da seção",
    },
    links: {
      control: "object",
      description: "Array de links recomendados",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostCTA>;

const sampleLinks = [
  { label: "Documentação da API", href: "/docs/intro", external: false },
  {
    label: "Guia de Início Rápido",
    href: "/docs/quick-start/introducao",
    external: false,
  },
  { label: "Webhooks", href: "/docs/webhooks/introducao", external: false },
];

const externalLinks = [
  {
    label: "WhatsApp Business",
    href: "https://www.whatsapp.com/business/",
    external: true,
  },
  { label: "Z-API Dashboard", href: "https://z-api.io", external: true },
  { label: "GitHub", href: "https://github.com/z-api", external: true },
];

export const Default: Story = {
  args: {
    title: "Leituras recomendadas",
    links: sampleLinks,
  },
};

export const CustomTitle: Story = {
  args: {
    title: "Continue explorando",
    links: sampleLinks,
  },
};

export const ExternalLinks: Story = {
  args: {
    title: "Recursos externos",
    links: externalLinks,
  },
};

export const MixedLinks: Story = {
  args: {
    title: "Próximos passos",
    links: [
      ...sampleLinks,
      { label: "Blog Z-API", href: "/blog", external: false },
      {
        label: "Comunidade Discord",
        href: "https://discord.gg/zapi",
        external: true,
      },
    ],
  },
};

export const SingleLink: Story = {
  args: {
    title: "Saiba mais",
    links: [
      { label: "Documentação completa", href: "/docs/intro", external: false },
    ],
  },
};

export const ManyLinks: Story = {
  args: {
    title: "Todos os recursos",
    links: [
      { label: "Documentação", href: "/docs/intro", external: false },
      {
        label: "Quick Start",
        href: "/docs/quick-start/introducao",
        external: false,
      },
      { label: "Webhooks", href: "/docs/webhooks/introducao", external: false },
      { label: "Messages", href: "/docs/messages/introducao", external: false },
      { label: "Groups", href: "/docs/groups/introducao", external: false },
      { label: "Contacts", href: "/docs/contacts/introducao", external: false },
    ],
  },
};
