import type { Meta, StoryObj } from "@storybook/react";
import { ImageWithFallback } from "./index";

const meta: Meta<typeof ImageWithFallback> = {
  title: "Components/ImageWithFallback",
  component: ImageWithFallback,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de imagem resiliente com fallback automático. Útil para cards que consomem assets externos (Unsplash, CDN, etc.). Quando a imagem falha ao carregar, exibe automaticamente uma imagem de fallback.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "URL da imagem principal",
    },
    alt: {
      control: "text",
      description: "Texto alternativo da imagem",
    },
    fallbackSrc: {
      control: "text",
      description: "URL da imagem de fallback (padrão: /img/z-api-logo.webp)",
    },
    className: {
      control: "text",
      description: "Classe CSS adicional",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageWithFallback>;

export const Default: Story = {
  args: {
    src: "https://via.placeholder.com/400x300/25D366/FFFFFF?text=Z-API",
    alt: "Imagem de exemplo da Z-API",
  },
};

export const WithFallback: Story = {
  args: {
    src: "https://imagem-inexistente.com/imagem.jpg",
    alt: "Imagem que falhará e mostrará fallback",
    fallbackSrc: "/img/z-api-logo.webp",
  },
};

export const CustomSize: Story = {
  args: {
    src: "https://via.placeholder.com/800x600/25D366/FFFFFF?text=Z-API+Large",
    alt: "Imagem grande de exemplo",
    className: "custom-size",
  },
  render: (args) => (
    <div style={{ width: "400px", height: "300px" }}>
      <ImageWithFallback
        {...args}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  ),
};

export const CardImage: Story = {
  args: {
    src: "https://via.placeholder.com/600x400/25D366/FFFFFF?text=Card+Image",
    alt: "Imagem de card",
  },
  render: (args) => (
    <div
      style={{
        width: "300px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <ImageWithFallback
        {...args}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "16px" }}>
        <h3 style={{ margin: "0 0 8px 0" }}>Título do Card</h3>
        <p style={{ margin: 0, color: "#666" }}>
          Descrição do card com imagem resiliente.
        </p>
      </div>
    </div>
  ),
};

export const BrokenImage: Story = {
  args: {
    src: "https://broken-image-url.example.com/image.jpg",
    alt: "Imagem quebrada (mostrará fallback)",
    fallbackSrc: "/img/z-api-logo.webp",
  },
  render: (args) => (
    <div
      style={{ width: "300px", border: "1px solid #e0e0e0", padding: "16px" }}
    >
      <p style={{ marginBottom: "16px" }}>
        Esta imagem falhará ao carregar e mostrará o fallback automaticamente:
      </p>
      <ImageWithFallback
        {...args}
        style={{ width: "100%", maxWidth: "200px" }}
      />
    </div>
  ),
};
