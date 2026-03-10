import type { Meta, StoryObj } from "@storybook/react";
import HomepageFeatures from "./index";

const meta: Meta<typeof HomepageFeatures> = {
  title: "Sections/HomepageFeatures",
  component: HomepageFeatures,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Seção de features/benefícios da plataforma Z-API. Exibe três cards destacando os principais benefícios.",
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
type Story = StoryObj<typeof HomepageFeatures>;

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
