import type { Meta, StoryObj } from "@storybook/react";
import DeveloperHub from "./index";

const meta: Meta<typeof DeveloperHub> = {
  title: "Sections/DeveloperHub",
  component: DeveloperHub,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Seção 'Central do Desenvolvedor'. Exibe cards com links para documentação principal e guia de introdução. Usa o componente CardSection compartilhado.",
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
  },
};

export default meta;
type Story = StoryObj<typeof DeveloperHub>;

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

export const HybridTheme: Story = {
  args: {
    theme: "hybrid",
  },
};
