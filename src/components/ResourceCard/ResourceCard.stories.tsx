import type { Meta, StoryObj } from "@storybook/react";
import { ResourceCard } from "./index";

const meta: Meta<typeof ResourceCard> = {
  title: "Components/ResourceCard",
  component: ResourceCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Card para exibir recursos educacionais com imagem, categoria, título, descrição e CTA. Usa ImageWithFallback para imagens resilientes e Badge para categoria. CTA em verde-escuro sempre em negrito (conforme guideline de UI/UX).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    image: {
      control: "text",
      description: "URL da imagem do recurso",
    },
    category: {
      control: "text",
      description: "Categoria do recurso (exibida como Badge)",
    },
    title: {
      control: "text",
      description: "Título do recurso",
    },
    description: {
      control: "text",
      description: "Descrição do recurso",
    },
    actionLabel: {
      control: "text",
      description: "Texto do botão CTA",
    },
    onAction: {
      action: "clicked",
      description: "Handler de clique no CTA",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResourceCard>;

export const Default: Story = {
  args: {
    image: "https://via.placeholder.com/400x300/25D366/FFFFFF?text=Tutorial",
    category: "Tutorial",
    title: "Como enviar mensagens via Z-API",
    description:
      "Aprenda a integrar a Z-API em sua aplicação e começar a enviar mensagens em minutos.",
    actionLabel: "Ver tutorial",
    onAction: () => console.warn("CTA clicado"),
  },
};

export const BlogPost: Story = {
  args: {
    image: "https://via.placeholder.com/400x300/25D366/FFFFFF?text=Blog",
    category: "Blog",
    title: "5 dicas para melhorar seu atendimento no WhatsApp",
    description:
      "Descubra estratégias práticas para aumentar a satisfação do cliente e melhorar o tempo de resposta.",
    actionLabel: "Ler post",
  },
};

export const CaseStudy: Story = {
  args: {
    image:
      "https://via.placeholder.com/400x300/25D366/FFFFFF?text=Caso+de+Sucesso",
    category: "Caso de Sucesso",
    title: "Como a Empresa X aumentou conversões em 300%",
    description:
      "Veja como a integração com Z-API transformou o atendimento ao cliente e gerou resultados impressionantes.",
    actionLabel: "Ver caso",
  },
};

export const WithBrokenImage: Story = {
  args: {
    image: "https://imagem-inexistente.com/image.jpg",
    category: "Recurso",
    title: "Recurso com imagem quebrada",
    description:
      "Este card demonstra o comportamento do ImageWithFallback quando a imagem principal falha ao carregar.",
    actionLabel: "Acessar recurso",
  },
};

export const GridLayout: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "24px",
        maxWidth: "1200px",
      }}
    >
      <ResourceCard
        image="https://via.placeholder.com/400x300/25D366/FFFFFF?text=Tutorial"
        category="Tutorial"
        title="Tutorial 1"
        description="Descrição do tutorial 1"
        actionLabel="Ver tutorial"
      />
      <ResourceCard
        image="https://via.placeholder.com/400x300/25D366/FFFFFF?text=Blog"
        category="Blog"
        title="Post do Blog"
        description="Descrição do post do blog"
        actionLabel="Ler post"
      />
      <ResourceCard
        image="https://via.placeholder.com/400x300/25D366/FFFFFF?text=Caso"
        category="Caso de Sucesso"
        title="Caso de Sucesso"
        description="Descrição do caso de sucesso"
        actionLabel="Ver caso"
      />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "400px",
      }}
    >
      <ResourceCard
        image="https://via.placeholder.com/400x300/25D366/FFFFFF?text=Tutorial"
        category="Tutorial"
        title="Tutorial"
        description="Aprenda passo a passo"
        actionLabel="Começar"
      />
      <ResourceCard
        image="https://via.placeholder.com/400x300/25D366/FFFFFF?text=Guia"
        category="Guia"
        title="Guia Completo"
        description="Guia detalhado com todas as informações"
        actionLabel="Ler guia"
      />
      <ResourceCard
        image="https://via.placeholder.com/400x300/25D366/FFFFFF?text=Video"
        category="Vídeo"
        title="Vídeo Tutorial"
        description="Assista ao vídeo explicativo"
        actionLabel="Assistir"
      />
    </div>
  ),
};
