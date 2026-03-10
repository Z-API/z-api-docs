import type { Meta, StoryObj } from "@storybook/react";
import LearningResources from "./index";

const meta: Meta<typeof LearningResources> = {
  title: "Sections/LearningResources",
  component: LearningResources,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Seção 'Recursos de aprendizado'. Exibe cards com links para blog, casos de sucesso e tutoriais. Usa o componente CardSection compartilhado.",
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
type Story = StoryObj<typeof LearningResources>;

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
