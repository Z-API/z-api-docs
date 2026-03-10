import type { CardItem } from "@site/src/types";
import type { Meta, StoryObj } from "@storybook/react";
import { BookOpen, GraduationCap, Rocket, Trophy } from "lucide-react";
import CardSection from "./index";

const meta: Meta<typeof CardSection> = {
  title: "Components/CardSection",
  component: CardSection,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Generic component that displays a section with a title, optional subtitle, and a grid of cards. Used to avoid code duplication between DeveloperHub and LearningResources.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Section title",
    },
    subtitle: {
      control: "text",
      description: "Section subtitle/description (optional)",
    },
    linkText: {
      control: "text",
      description: "Link text for the cards",
    },
    theme: {
      control: "select",
      options: ["classic", "zapi", "hybrid", "official"],
      description: "Design system theme",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardSection>;

const sampleCards: CardItem[] = [
  {
    title: "Z-API Platform Overview",
    description: "Learn more about the Z-API Platform hosted by the team.",
    link: "/docs/intro",
    icon: BookOpen,
  },
  {
    title: "Quick Start Guide",
    description:
      "Documentation to help you set up your environment, test, develop, and integrate the Z-API Platform into your stack.",
    link: "/docs/quick-start/introducao",
    icon: Rocket,
  },
];

const learningCards: CardItem[] = [
  {
    title: "Z-API Discord Community",
    description:
      "Exchange technical insights with developers, receive update alerts, and participate in reviews guided by tech writers.",
    link: "https://discord.gg/zapi-oficial",
    icon: BookOpen,
  },
  {
    title: "Success Stories",
    description: "Check out success stories from the Z-API Platform.",
    link: "/blog",
    icon: Trophy,
  },
  {
    title: "Tutorials and Guides",
    description:
      "Learn how to use Z-API with step‑by‑step tutorials and practical examples.",
    link: "/docs/intro",
    icon: GraduationCap,
  },
];

export const Default: Story = {
  args: {
    title: "Developer Hub",
    subtitle:
      "Documentation, training, and resources to help you get the most out of the Z-API Platform",
    cards: sampleCards,
    linkText: "Learn more →",
    theme: "classic",
    "aria-label": "Developer Hub",
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Learning Resources",
    subtitle: "Explore tutorials, success stories, and the Z-API community",
    cards: learningCards,
    linkText: "Access →",
    theme: "classic",
    "aria-label": "Learning Resources",
  },
};

export const WithoutSubtitle: Story = {
  args: {
    title: "Documentation",
    cards: sampleCards,
    linkText: "Read more →",
    theme: "classic",
  },
};

export const OfficialTheme: Story = {
  args: {
    title: "Developer Hub",
    subtitle:
      "Documentation, training, and resources to help you get the most out of the Z-API Platform",
    cards: sampleCards,
    linkText: "Learn more →",
    theme: "official",
  },
};

export const ZAPITheme: Story = {
  args: {
    title: "Developer Hub",
    subtitle:
      "Documentation, training, and resources to help you get the most out of the Z-API Platform",
    cards: sampleCards,
    linkText: "Learn more →",
    theme: "zapi",
  },
};