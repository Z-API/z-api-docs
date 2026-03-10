import Link from '@docusaurus/Link';
import AnimatedIcon from '@site/src/components/shared/Icon/AnimatedIcon';
import { useActiveBreakpoint } from '@site/src/hooks/useActiveBreakpoint';
import type { Theme } from '@site/src/types';
import {
    createAccessibleVariants,
    staggerContainerVariants,
    staggerItemVariants,
} from '@site/src/utils/animations';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    CreditCard,
    Image as ImageIcon,
    MousePointerClick,
} from 'lucide-react';
import { memo, type CSSProperties, type ReactNode } from 'react';

import styles from './styles.module.css';

/**
 * Funcionalidades exclusivas do Z-API
 * Baseado na análise do site oficial
 */
const EXCLUSIVE_FEATURES = [
  {
    title: 'Mensagens em carrossel',
    description:
      'Conteúdos interativos com imagens e botões clicáveis. Ideal para catálogos, produtos, planos e tutoriais.',
    icon: ImageIcon,
    link: '/docs/messages/catalogo',
  },
  {
    title: 'Status de botões clicados',
    description:
      'Rastreie qual botão o usuário tocou em uma mensagem interativa. Transforme cada clique em um gatilho dentro do seu funil.',
    icon: MousePointerClick,
    link: '/docs/messages/botoes',
  },
  {
    title: 'Notificações de pagamento',
    description:
      'Mensagens automáticas com status de pagamento de pedidos ou serviços. Notifique em tempo real quando o pagamento for aprovado, recusado ou estiver pendente.',
    icon: CreditCard,
    link: '/docs/webhooks/introducao',
  },
] as const;

/**
 * Props do componente ExclusiveFeature
 */
type ExclusiveFeatureProps = {
  title: string;
  description: string;
  icon: typeof ImageIcon;
  link: string;
  theme?: Theme;
};

/**
 * Componente ExclusiveFeature - Card individual de funcionalidade exclusiva.
 *
 * Renderiza um card com ícone, título, descrição e link para documentação.
 *
 * @param props - Props do componente ExclusiveFeature
 * @returns Componente React do card de funcionalidade exclusiva
 */
const ExclusiveFeature = memo(
  ({
    title,
    description,
    icon,
    link,
    theme = 'classic',
  }: ExclusiveFeatureProps) => {
    const itemVariants = createAccessibleVariants(staggerItemVariants);

    return (
      <motion.div
        className={clsx(styles.featureItem, 'stagger-item')}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
      >
        <Link to={link} className={styles.featureLink}>
          <article
            className={clsx('card', styles.featureCard)}
            data-theme={theme}
          >
            <div className={styles.featureCardInner}>
              <div className={styles.featureIcon}>
                <AnimatedIcon
                  icon={icon}
                  size="lg"
                  animation="hover"
                />
              </div>
              <div className={styles.featureBody}>
                <Heading as="h3" className={styles.featureTitle}>
                  {title}
                </Heading>
                <p className={styles.featureDescription}>{description}</p>
                <div className={styles.featureCta}>
                  <strong className="text--success">
                    Explorar funcionalidade
                    <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                  </strong>
                </div>
              </div>
            </div>
          </article>
        </Link>
      </motion.div>
    );
  }
);

ExclusiveFeature.displayName = 'ExclusiveFeature';

/**
 * Props do componente ExclusiveFeatures
 */
type ExclusiveFeaturesProps = {
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
};

/**
 * Componente ExclusiveFeatures - Seção de funcionalidades exclusivas.
 *
 * Exibe três cards destacando funcionalidades exclusivas do Z-API:
 * - Mensagens em carrossel
 * - Status de botões clicados
 * - Atualização de pagamento via WhatsApp
 *
 * Usa grid responsivo (3 colunas desktop, 2 tablet, 1 mobile).
 *
 * @param props - Props do componente ExclusiveFeatures
 * @param props.theme - Tema do design system (padrão: 'classic')
 * @returns Componente React da seção ExclusiveFeatures
 *
 * @example
 * ```tsx
 * <ExclusiveFeatures />
 * <ExclusiveFeatures theme="official" />
 * ```
 */
export default function ExclusiveFeatures({
  theme = 'classic',
}: ExclusiveFeaturesProps = {}): ReactNode {
  const containerVariants = createAccessibleVariants(staggerContainerVariants);
  const breakpoint = useActiveBreakpoint();

  const gridColumns = breakpoint.isMobile ? 1 : breakpoint.isTablet ? 2 : 3;
  const gridGap = breakpoint.isMobile
    ? 'var(--spacing-lg)' /* 24px em mobile */
    : breakpoint.isTablet
      ? 'var(--spacing-xl)' /* 32px em tablet */
      : '40px'; /* 40px em desktop - mais generoso */
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
    gap: gridGap,
  };

  return (
    <section
      className={styles.exclusiveFeatures}
      data-theme={theme}
      data-breakpoint={breakpoint.name}
      aria-label="Funcionalidades Exclusivas do Z-API"
    >
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            O que só o Z-API tem
          </Heading>
          <p className={styles.featuresSubtitle}>
            Conheça as funcionalidades exclusivas que só a nossa ferramenta pode
            te proporcionar. Aproveite e surpreenda-se!
          </p>
        </div>
        <motion.div
          className={styles.featuresGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: true, margin: '-100px' }}
          style={gridStyle}
        >
          {EXCLUSIVE_FEATURES.map((props) => (
            <ExclusiveFeature key={props.title} {...props} theme={theme} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

