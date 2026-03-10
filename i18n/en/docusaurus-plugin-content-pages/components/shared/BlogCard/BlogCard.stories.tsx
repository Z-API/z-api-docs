import type { Meta, StoryObj } from "@storybook/react";
import BlogCard from "./index";

const meta: Meta<typeof BlogCard> = {
  title: "Components/BlogCard",
  component: BlogCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Card para exibir posts do blog. Suporta imagem de capa, título, resumo e meta informações.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Título do post",
    },
    href: {
      control: "text",
      description: "Link do post",
    },
    excerpt: {
      control: "text",
      description: "Resumo do post (opcional)",
    },
    coverImageUrl: {
      control: "text",
      description: "URL da imagem de capa (opcional)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BlogCard>;

export const Default: Story = {
  args: {
    title: "Introdução à Z-API",
    href: "/blog/introducao-z-api",
    excerpt: "Aprenda os conceitos básicos da Z-API e como começar a usar.",
  },
};

export const WithCoverImage: Story = {
  args: {
    title: "Guia Completo de Webhooks",
    href: "/blog/webhooks-completo",
    excerpt:
      "Aprenda a configurar e usar webhooks na Z-API para receber notificações em tempo real.",
    coverImageUrl: "/img/blog/webhooks.jpg",
  },
};

export const WithMeta: Story = {
  args: {
    title: "Melhores Práticas de Segurança",
    href: "/blog/seguranca",
    excerpt: "Dicas e práticas recomendadas para manter sua integração segura.",
    meta: (
      <div>
        <span>Por: João Silva</span> • <span>25 Jan 2025</span>
      </div>
    ),
  },
};

export const Minimal: Story = {
  args: {
    title: "Novo Tutorial Disponível",
    href: "/blog/tutorial",
  },
};
