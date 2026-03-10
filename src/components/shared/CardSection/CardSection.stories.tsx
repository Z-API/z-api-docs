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
          "Componente genérico que exibe uma seção com título, subtítulo opcional e uma grid de cards. Usado para evitar duplicação de código entre DeveloperHub e LearningResources.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Título da seção",
    },
    subtitle: {
      control: "text",
      description: "Subtítulo/descrição da seção (opcional)",
    },
    linkText: {
      control: "text",
      description: "Text do link dos cards",
    },
    theme: {
      control: "select",
      options: ["classic", "zapi", "hybrid", "official"],
      description: "Tema do design system",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardSection>;

const sampleCards: CardItem[] = [
  {
    title: "Visão geral da Plataforma Z-API",
    description: "Saiba mais sobre a Plataforma Z-API hospedada pela equipe.",
    link: "/docs/intro",
    icon: BookOpen,
  },
  {
    title: "Guia de introdução",
    description:
      "Documentação para ajudar você a configurar seu ambiente, testar, desenvolver e integrar a Plataforma Z-API à sua pilha.",
    link: "/docs/quick-start/introducao",
    icon: Rocket,
  },
];

const learningCards: CardItem[] = [
  {
    title: "Comunidade Z-API no Discord",
    description:
      "Troque insights técnicos com devs, receba alertas de updates e participe de revisões guiadas por tech writers.",
    link: "https://discord.gg/zapi-oficial",
    icon: BookOpen,
  },
  {
    title: "Casos de sucesso",
    description: "Confira histórias de sucesso da Plataforma Z-API.",
    link: "/blog",
    icon: Trophy,
  },
  {
    title: "Tutoriais e Guias",
    description:
      "Aprenda a usar a Z-API com tutoriais passo a passo e exemplos práticos.",
    link: "/docs/intro",
    icon: GraduationCap,
  },
];

export const Default: Story = {
  args: {
    title: "Central do Desenvolvedor",
    subtitle:
      "Documentação, treinamento e recursos para ajudar você a aproveitar ao máximo a Plataforma Z-API",
    cards: sampleCards,
    linkText: "Saiba mais →",
    theme: "classic",
    "aria-label": "Central do Desenvolvedor",
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Recursos de aprendizado",
    subtitle: "Explore tutoriais, casos de sucesso e a comunidade Z-API",
    cards: learningCards,
    linkText: "Acessar →",
    theme: "classic",
    "aria-label": "Recursos de aprendizado",
  },
};

export const WithoutSubtitle: Story = {
  args: {
    title: "Documentação",
    cards: sampleCards,
    linkText: "Ler mais →",
    theme: "classic",
  },
};

export const OfficialTheme: Story = {
  args: {
    title: "Central do Desenvolvedor",
    subtitle:
      "Documentação, treinamento e recursos para ajudar você a aproveitar ao máximo a Plataforma Z-API",
    cards: sampleCards,
    linkText: "Saiba mais →",
    theme: "official",
  },
};

export const ZAPITheme: Story = {
  args: {
    title: "Central do Desenvolvedor",
    subtitle:
      "Documentação, treinamento e recursos para ajudar você a aproveitar ao máximo a Plataforma Z-API",
    cards: sampleCards,
    linkText: "Saiba mais →",
    theme: "zapi",
  },
};
