import AnimatedIcon from '@site/src/components/shared/Icon/AnimatedIcon';
import { useActiveBreakpoint } from '@site/src/hooks/useActiveBreakpoint';
import type { Theme } from '@site/src/types';
import {
  createAccessibleVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from '@site/src/utils/animations';
import { FEATURE_ICON_SIZE } from '@site/src/utils/iconSizes';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import {
  Bell,
  Bot,
  Headphones,
  Package,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react';
import { memo, type CSSProperties, type ReactNode } from 'react';

import styles from './styles.module.css';

/**
 * Top 5 casos de uso mais relevantes do Z-API
 * Baseado na análise do site oficial
 */
const USE_CASES = [
  {
    category: 'Gestão e CRM',
    title: 'CRM Channel',
    description:
      'Integração direta com CRMs para centralizar conversas via WhatsApp no histórico do cliente. Ideal para times de vendas e atendimento manterem o contexto e otimizarem o relacionamento.',
    icon: TrendingUp,
  },
  {
    category: 'Logística',
    title: 'Tracking de encomendas',
    description:
      'Atualizações em tempo real de status de pedidos e entregas diretamente no WhatsApp, integrando com ERPs e plataformas logísticas.',
    icon: Package,
  },
  {
    category: 'E-commerce',
    title: 'Envio de códigos promocionais',
    description:
      'Distribuição automatizada de cupons e descontos via WhatsApp, segmentando por comportamento ou lista de clientes, com rastreabilidade e controle.',
    icon: ShoppingBag,
  },
  {
    category: 'Atendimento',
    title: 'SAC completo via WhatsApp',
    description:
      'Canal completo de atendimento via WhatsApp, com múltiplos atendentes, organização por tickets e bots de triagem para otimizar o fluxo.',
    icon: Headphones,
  },
  {
    category: 'Automação',
    title: 'Chatbot inteligente com IA',
    description:
      'Criação de bots conversacionais avançados usando modelos de linguagem (GPT, Claude, Gemini), capazes de interpretar linguagem natural, entender contexto e executar tarefas complexas de forma autônoma.',
    icon: Bot,
  },
  {
    category: 'Notificações',
    title: 'Notificações transacionais',
    description:
      'Envio automatizado de confirmações de pagamento, agendamentos, lembretes e atualizações importantes diretamente no WhatsApp, melhorando a experiência do cliente.',
    icon: Bell,
  },
] as const;

/**
 * Props do componente UseCase
 */
type UseCaseProps = {
  category: string;
  title: string;
  description: string;
  icon: typeof TrendingUp;
  theme?: Theme;
};

/**
 * Componente UseCase - Card individual de caso de uso.
 *
 * Renderiza um card com categoria, ícone, título e descrição.
 *
 * @param props - Props do componente UseCase
 * @returns Componente React do card de caso de uso
 */
const UseCase = memo(
  ({ category, title, description, icon, theme = 'classic' }: UseCaseProps) => {
    const itemVariants = createAccessibleVariants(staggerItemVariants);

    return (
      <motion.div
        className={clsx(styles.useCaseItem, 'stagger-item')}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
      >
        <article
          className={clsx('card', styles.useCaseCard)}
          data-theme={theme}
        >
          <div className="padding-horiz--md padding-vert--md">
            <div className={styles.useCaseCategory}>
              <span className={styles.categoryBadge}>{category}</span>
            </div>
            <div className={styles.useCaseIcon}>
              <AnimatedIcon
                icon={icon}
                size={FEATURE_ICON_SIZE}
                animation="hover"
              />
            </div>
            <Heading as="h3" className={styles.useCaseTitle}>
              {title}
            </Heading>
            <p className={styles.useCaseDescription}>{description}</p>
          </div>
        </article>
      </motion.div>
    );
  }
);

UseCase.displayName = 'UseCase';

/**
 * Props do componente UseCases
 */
type UseCasesProps = {
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
};

/**
 * Componente UseCases - Seção de casos de uso.
 *
 * Exibe seis cards destacando os principais casos de uso do Z-API:
 * - CRM Channel
 * - Tracking de encomendas
 * - Envio de códigos promocionais
 * - SAC completo via WhatsApp
 * - Chatbot inteligente com IA
 * - Notificações transacionais
 *
 * Usa grid responsivo (3 colunas desktop, 2 tablet, 1 mobile).
 *
 * @param props - Props do componente UseCases
 * @param props.theme - Tema do design system (padrão: 'classic')
 * @returns Componente React da seção UseCases
 *
 * @example
 * ```tsx
 * <UseCases />
 * <UseCases theme="official" />
 * ```
 */
export default function UseCases({
  theme = 'classic',
}: UseCasesProps = {}): ReactNode {
  const containerVariants = createAccessibleVariants(staggerContainerVariants);
  const breakpoint = useActiveBreakpoint();

  const gridColumns = breakpoint.isMobile ? 1 : breakpoint.isTablet ? 2 : 3;
  const gridGap = breakpoint.isMobile
    ? 'var(--spacing-md)'
    : breakpoint.isTablet
      ? 'var(--spacing-lg)'
      : 'var(--spacing-xl)';
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
    gap: gridGap,
  };

  return (
    <section
      className={styles.useCases}
      data-theme={theme}
      data-breakpoint={breakpoint.name}
      aria-label="Casos de Uso do Z-API"
    >
      <div className="container">
        <div className={styles.useCasesHeader}>
          <Heading as="h2" className={styles.useCasesTitle}>
            Casos de uso com o Z-API
          </Heading>
          <p className={styles.useCasesSubtitle}>
            Exemplos práticos de integração com a API Z-API. Aprenda como implementar funcionalidades comuns do WhatsApp em seus projetos.
          </p>
        </div>
        <motion.div
          className={styles.useCasesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: true, margin: '-100px' }}
          style={gridStyle}
        >
          {USE_CASES.map((props, index) => (
            <UseCase key={`${props.title}-${index}`} {...props} theme={theme} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

