import type { Meta, StoryObj } from "@storybook/react";
import Subscribe from "./index";

const meta: Meta<typeof Subscribe> = {
  title: "Components/Subscribe",
  component: Subscribe,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Componente Subscribe para formulário de assinatura do blog. Integra com serviço externo (Mailchimp, ConvertKit, etc.) sem backend próprio. Por padrão, usa um link externo para o formulário de assinatura.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    serviceUrl: {
      control: "text",
      description: "URL do serviço externo de assinatura",
    },
    placeholder: {
      control: "text",
      description: "Placeholder do campo de email",
    },
    buttonText: {
      control: "text",
      description: "Texto do botão",
    },
    title: {
      control: "text",
      description: "Título da seção",
    },
    description: {
      control: "text",
      description: "Descrição da seção",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Subscribe>;

export const Default: Story = {
  args: {
    serviceUrl: "https://business.whatsapp.com/blog",
    placeholder: "Seu email",
    buttonText: "Assinar",
    title: "Receba as últimas novidades do Z-API Central",
    description:
      "Inscreva-se para receber nossos últimos guias, insights e inspiração para fazer mais com conversas.",
  },
};

export const CustomTitle: Story = {
  args: {
    title: "Fique por dentro das novidades",
    description: "Receba atualizações semanais em sua caixa de entrada.",
    placeholder: "Digite seu email",
    buttonText: "Inscrever-se",
  },
};

export const Minimal: Story = {
  args: {
    title: "Newsletter",
    description: undefined,
    placeholder: "Email",
    buttonText: "Subscribe",
  },
};

export const LongDescription: Story = {
  args: {
    title: "Junte-se à comunidade Z-API",
    description:
      "Receba insights exclusivos, tutoriais práticos, casos de uso reais e as últimas atualizações da plataforma Z-API diretamente em sua caixa de entrada. Sem spam, apenas conteúdo de valor para ajudar você a criar experiências incríveis no WhatsApp.",
    placeholder: "Seu melhor email",
    buttonText: "Quero receber",
  },
};
