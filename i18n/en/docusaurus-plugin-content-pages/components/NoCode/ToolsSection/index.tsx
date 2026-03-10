import Link from '@docusaurus/Link';
import AnimatedIcon from '@site/src/components/shared/Icon/AnimatedIcon';
import { useRippleEffect } from '@site/src/hooks/useRippleEffect';
import type { Theme } from '@site/src/types';
import {
  createAccessibleVariants,
  fadeUpVariants,
  hoverElevationVariants,
} from '@site/src/utils/animations';
import { CARD_ICON_SIZE } from '@site/src/utils/iconSizes';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Box,
  ChevronDown,
  Code,
  ExternalLink,
  Layers,
  Puzzle,
  Terminal,
  Zap
} from 'lucide-react';
import { memo, useState, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Tipo para ferramenta no-code
 */
type NoCodeTool = {
  id: string;
  name: string;
  description: string;
  category: 'visual' | 'automation' | 'testing' | 'integration';
  features: string[];
  pricing: 'free' | 'freemium' | 'paid';
  link: string;
  icon: LucideIcon;
  pros: string[];
  cons: string[];
  bestFor: string;
};

/**
 * Ferramentas no-code recomendadas
 * 
 * Curated by Tech Writer + UI/UX Specialist
 * Tools selected based on ease of use, Z-API compatibility, and user feedback
 */
const NO_CODE_TOOLS: NoCodeTool[] = [
  {
    id: 'postman',
    name: 'Postman',
    description:
      'Interface visual para testar e explorar APIs sem escrever código. Perfeito para iniciantes que querem entender como APIs funcionam.',
    category: 'testing',
    features: [
      'Interface visual intuitiva',
      'Coleção de requisições pré-configuradas',
      'Testes automatizados',
      'Documentação integrada',
      'Compartilhamento de coleções',
    ],
    pricing: 'freemium',
    link: 'https://www.postman.com/',
    icon: Code,
    pros: [
      'Muito fácil de usar',
      'Gratuito para uso pessoal',
      'Excelente para aprender APIs',
      'Suporte completo a Z-API',
    ],
    cons: [
      'Versão gratuita tem limitações',
      'Requer instalação de software',
    ],
    bestFor: 'Pessoas que querem testar APIs visualmente e aprender como funcionam',
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description:
      'Plataforma de automação visual que conecta diferentes serviços. Crie automações complexas arrastando e soltando elementos.',
    category: 'automation',
    features: [
      'Interface drag-and-drop',
      'Centenas de integrações',
      'Automações multi-etapa',
      'Agendamento de tarefas',
      'Filtros e condições',
    ],
    pricing: 'freemium',
    link: 'https://zapier.com/',
    icon: Zap,
    pros: [
      'Muito intuitivo',
      'Não precisa programar',
      'Integração nativa com WhatsApp',
      'Suporte a webhooks',
    ],
    cons: [
      'Plano gratuito limitado',
      'Pode ficar caro em escala',
      'Menos flexibilidade que código',
    ],
    bestFor: 'Automações complexas entre múltiplos serviços sem escrever código',
  },
  {
    id: 'make',
    name: 'Make (Integromat)',
    description:
      'Plataforma avançada de automação visual com mais controle e flexibilidade que Zapier. Ideal para automações complexas.',
    category: 'automation',
    features: [
      'Fluxos visuais avançados',
      'Manipulação de dados',
      'Loops e iterações',
      'Tratamento de erros',
      'Execução em tempo real',
    ],
    pricing: 'freemium',
    link: 'https://www.make.com/',
    icon: Layers,
    pros: [
      'Mais poderoso que Zapier',
      'Melhor para lógica complexa',
      'Plano gratuito generoso',
      'Excelente para webhooks',
    ],
    cons: [
      'Curva de aprendizado maior',
      'Interface pode ser complexa',
      'Documentação em inglês',
    ],
    bestFor: 'Automações avançadas que precisam de lógica complexa e manipulação de dados',
  },
  {
    id: 'insomnia',
    name: 'Insomnia',
    description:
      'Cliente REST alternativo ao Postman, mais leve e focado em desenvolvedores. Interface limpa e fácil de usar.',
    category: 'testing',
    features: [
      'Interface minimalista',
      'Gerenciamento de ambientes',
      'Geração automática de código',
      'Plugins e extensões',
      'Open source',
    ],
    pricing: 'free',
    link: 'https://insomnia.rest/',
    icon: Box,
    pros: [
      '100% gratuito',
      'Mais leve que Postman',
      'Open source',
      'Boa para iniciantes',
    ],
    cons: [
      'Menos recursos que Postman',
      'Comunidade menor',
      'Menos integrações',
    ],
    bestFor: 'Pessoas que preferem ferramentas simples e gratuitas para testar APIs',
  },
  {
    id: 'n8n',
    name: 'n8n',
    description:
      'Ferramenta de automação open source que você pode hospedar você mesmo. Máxima flexibilidade e controle.',
    category: 'automation',
    features: [
      '100% open source',
      'Self-hosted ou cloud',
      'Fluxos visuais poderosos',
      'Suporte a webhooks',
      'Comunidade ativa',
    ],
    pricing: 'free',
    link: 'https://n8n.io/',
    icon: Puzzle,
    pros: [
      'Completamente gratuito',
      'Controle total dos dados',
      'Muito flexível',
      'Boa documentação',
    ],
    cons: [
      'Requer conhecimento técnico',
      'Precisa hospedar você mesmo',
      'Curva de aprendizado',
    ],
    bestFor: 'Pessoas técnicas que querem controle total e não se importam em hospedar',
  },
  {
    id: 'httpie',
    name: 'HTTPie',
    description:
      'Cliente HTTP moderno e amigável para linha de comando. Mais simples que cURL, mas mais poderoso que interfaces gráficas.',
    category: 'testing',
    features: [
      'Sintaxe intuitiva',
      'Syntax highlighting',
      'Plugins e extensões',
      'Interface web opcional',
      'Suporte a JSON',
    ],
    pricing: 'freemium',
    link: 'https://httpie.io/',
    icon: Terminal,
    pros: [
      'Muito simples de usar',
      'Boa para scripts',
      'Interface web disponível',
      'Bem documentado',
    ],
    cons: [
      'Requer linha de comando',
      'Menos visual que Postman',
      'Curva de aprendizado',
    ],
    bestFor: 'Pessoas que gostam de linha de comando mas querem algo mais simples que cURL',
  },
];

/**
 * Props do componente ToolCard
 */
type ToolCardProps = {
  tool: NoCodeTool;
  isExpanded: boolean;
  onToggle: () => void;
  theme?: Theme;
};

/**
 * Componente ToolCard - Card expansível de ferramenta no-code
 * 
 * Designed by UI/UX Specialist
 * Optimized for readability and accessibility
 * Dropdown functionality for better UX
 */
const ToolCard = memo(function ToolCard({
  tool,
  isExpanded,
  onToggle,
  theme = 'official',
}: ToolCardProps): ReactNode {
  const [ripples, handleRippleClick] = useRippleEffect({});
  const variants = createAccessibleVariants(hoverElevationVariants);

  const categoryLabels: Record<NoCodeTool['category'], string> = {
    visual: 'Visual',
    automation: 'Automação',
    testing: 'Teste',
    integration: 'Integração',
  };

  const pricingLabels: Record<NoCodeTool['pricing'], string> = {
    free: 'Gratuito',
    freemium: 'Freemium',
    paid: 'Pago',
  };

  return (
    <motion.div
      variants={variants}
      initial="rest"
      whileHover="hover"
      className={styles.cardWrapper}>
      <button
        className={clsx(styles.card, styles[theme])}
        data-theme={theme}
        data-expanded={isExpanded}
        onClick={(e) => {
          handleRippleClick(e);
          onToggle();
        }}
        aria-expanded={isExpanded}
        aria-controls={`tool-content-${tool.id}`}
        aria-label={`${isExpanded ? 'Recolher' : 'Expandir'} detalhes da ferramenta ${tool.name}`}>
        {ripples.map((ripple) => (
          <span
            key={`ripple-${ripple.id}`}
            className={styles.ripple}
            style={{
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
            }}
          />
        ))}
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderLeft}>
            <div className={styles.cardIcon}>
              <AnimatedIcon
                icon={tool.icon}
                size={CARD_ICON_SIZE}
                animation="hover"
              />
            </div>
            <div className={styles.cardTitleWrapper}>
              <h3 className={styles.cardTitle}>{tool.name}</h3>
              <p className={styles.cardDescription}>{tool.description}</p>
            </div>
          </div>
          <div className={styles.cardHeaderRight}>
            <div className={styles.cardMeta}>
              <span className={styles.category}>{categoryLabels[tool.category]}</span>
              <span className={styles.pricing}>{pricingLabels[tool.pricing]}</span>
            </div>
            <ChevronDown
              className={clsx(styles.expandIcon, isExpanded && styles.expanded)}
              size={24}
              aria-hidden="true"
            />
          </div>
        </div>
        <div
          id={`tool-content-${tool.id}`}
          className={styles.cardContent}
          data-expanded={isExpanded}>
          <div className={styles.cardBestFor}>
            <strong>Ideal para:</strong> {tool.bestFor}
          </div>
          <div className={styles.cardFeatures}>
            <strong>Principais recursos:</strong>
            <ul>
              {tool.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className={styles.cardProsCons}>
            <div className={styles.pros}>
              <strong>Vantagens:</strong>
              <ul>
                {tool.pros.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>
            <div className={styles.cons}>
              <strong>Desvantagens:</strong>
              <ul>
                {tool.cons.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            to={tool.link}
            className={styles.cardLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.stopPropagation();
            }}>
            <strong className="text--success">
              Visitar site oficial <ExternalLink size={16} aria-hidden="true" />
            </strong>
          </Link>
        </div>
      </button>
    </motion.div>
  );
});

/**
 * Props do componente ToolsSection
 */
type ToolsSectionProps = {
  /** Tema do design system (padrão: 'official') */
  theme?: Theme;
};

/**
 * Componente ToolsSection - Seção de ferramentas no-code recomendadas.
 * 
 * Curated by Tech Writer + UI/UX Specialist
 * 
 * Exibe ferramentas recomendadas para criar automações sem código.
 * Cada ferramenta inclui descrição, recursos, prós/contras e link oficial.
 * 
 * @param props - Props do componente ToolsSection
 * @param props.theme - Tema do design system (padrão: 'official')
 * @returns Componente React da seção de ferramentas
 */
export default function ToolsSection({
  theme = 'official',
}: ToolsSectionProps): ReactNode {
  const [expandedTools, setExpandedTools] = useState<Set<string>>(new Set());
  const variants = createAccessibleVariants(fadeUpVariants);

  const toggleTool = (toolId: string) => {
    setExpandedTools((prev) => {
      const next = new Set(prev);
      if (next.has(toolId)) {
        next.delete(toolId);
      } else {
        next.add(toolId);
      }
      return next;
    });
  };

  return (
    <section
      id="ferramentas"
      className={clsx(styles.tools, styles[theme])}
      data-theme={theme}
      aria-label="Ferramentas no-code recomendadas">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}>
          <h2 className={styles.title}>Ferramentas No-Code Recomendadas</h2>
          <p className={styles.subtitle}>
            Descubra as melhores ferramentas para criar automações WhatsApp sem
            escrever código. Cada ferramenta foi testada e recomendada pela nossa equipe.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {NO_CODE_TOOLS.map((tool, index) => (
            <motion.div
              key={tool.id}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}>
              <ToolCard
                tool={tool}
                isExpanded={expandedTools.has(tool.id)}
                onToggle={() => toggleTool(tool.id)}
                theme={theme}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

