import type { Meta, StoryObj } from "@storybook/react";
import DeveloperResources from "./index";

const meta: Meta<typeof DeveloperResources> = {
  title: "Sections/DeveloperResources",
  component: DeveloperResources,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Seção de recursos para desenvolvedores. Inspirado no WhatsApp Business Developer Hub. Renderiza cards com ícone, descrição e CTA em verde-escuro (sempre em negrito).",
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
type Story = StoryObj<typeof DeveloperResources>;

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
