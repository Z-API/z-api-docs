import MDXComponents from '@theme-original/MDXComponents';
import Badge from '../components/shared/Badge';
import { Callout } from '../components/shared/Callout';
import { CardLink } from '../components/shared/CardLink';
import Card from '../components/shared/Card';
import { CodeExample } from '../components/shared/CodeExample';
import { Icon } from '../components/shared/MdxIcon';
import ResourceLink from '../components/shared/ResourceLink';
import { DocumentationImage } from '../components/shared/DocumentationImage';
import {
  InteractiveFlowDiagram,
  AnimatedFlow,
  ScrollRevealDiagram,
  DiagramToggle,
} from '../components/shared/diagrams';

export default {
  // Reuse the default mapping
  ...MDXComponents,
  // Substituir img padrão por componente semântico
  // Isso converte automaticamente todas as imagens Markdown para <figure>
  img: DocumentationImage,
  // Custom shortcodes / components
  Callout,
  Badge,
  CardLink,
  Card,
  ResourceLink,
  CodeExample,
  // Ícones: usamos o mesmo componente para `Icon` e `MdxIcon`
  Icon,
  MdxIcon: Icon,
  // Componentes de diagramas interativos
  InteractiveFlowDiagram,
  AnimatedFlow,
  ScrollRevealDiagram,
  DiagramToggle,
} as const;
