import type { Meta, StoryObj } from "@storybook/react";
import HeroSection from "./index";

const meta: Meta<typeof HeroSection> = {
  title: "Sections/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Seção principal da homepage com título, subtítulo e CTAs. Inspirado no WhatsApp Business Developer Hub.",
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
    size: {
      control: "select",
      options: ["compact", "default", "expanded"],
      description: "Tamanho visual do hero",
    },
    layout: {
      control: "select",
      options: ["left", "center", "split"],
      description: "Layout de alinhamento do conteúdo",
    },
    ctaStyle: {
      control: "select",
      options: ["pill", "rounded", "square"],
      description: "Estilo dos botões principais",
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

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

export const Compact: Story = {
  args: {
    theme: "classic",
    size: "compact",
  },
};

export const Expanded: Story = {
  args: {
    theme: "classic",
    size: "expanded",
  },
};

export const CenterLayout: Story = {
  args: {
    theme: "classic",
    layout: "center",
  },
};

export const PillButtons: Story = {
  args: {
    theme: "classic",
    ctaStyle: "pill",
  },
};

export const RoundedButtons: Story = {
  args: {
    theme: "classic",
    ctaStyle: "rounded",
  },
};
