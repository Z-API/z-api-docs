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
 * Top 5 most relevant use cases for Z-API
 * Based on analysis of the official website
 */
const USE_CASES = [
  {
    category: 'CRM & Management',
    title: 'CRM Channel',
    description:
      'Direct integration with CRMs to centralize WhatsApp conversations in the customer history. Ideal for sales and support teams to maintain context and optimize relationships.',
    icon: TrendingUp,
  },
  {
    category: 'Logistics',
    title: 'Order Tracking',
    description:
      'Real‑time updates of order and delivery status directly on WhatsApp, integrating with ERPs and logistics platforms.',
    icon: Package,
  },
  {
    category: 'E‑commerce',
    title: 'Promotional Code Delivery',
    description:
      'Automated distribution of coupons and discounts via WhatsApp, segmented by behavior or customer list, with traceability and control.',
    icon: ShoppingBag,
  },
  {
    category: 'Customer Support',
    title: 'Full Service via WhatsApp',
    description:
      'Complete customer service channel through WhatsApp, with multiple agents, ticket organization, and triage bots to streamline the flow.',
    icon: Headphones,
  },
  {
    category: 'Automation',
    title: 'Intelligent AI Chatbot',
    description:
      'Creation of advanced conversational bots using language models (GPT, Claude, Gemini), capable of interpreting natural language, understanding context, and autonomously performing complex tasks.',
    icon: Bot,
  },
  {
    category: 'Notifications',
    title: 'Transactional Notifications',
    description:
      'Automated sending of payment confirmations, appointments, reminders, and important updates directly on WhatsApp, enhancing customer experience.',
    icon: Bell,
  },
] as const;

/**
 * Props for UseCase component
 */
type UseCaseProps = {
  category: string;
  title: string;
  description: string;
  icon: typeof TrendingUp;
  theme?: Theme;
};

/**
 * UseCase component – Individual use case card.
 *
 * Renders a card with category, icon, title, and description.
 *
 * @param props - UseCase component props
 * @returns React component for the use case card
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
 * Props for UseCases component
 */
type UseCasesProps = {
  /** Design system theme (default: 'classic') */
  theme?: Theme;
};

/**
 * UseCases component – Use cases section.
 *
 * Displays six cards highlighting the main use cases for Z-API:
 * - CRM Channel
 * - Order Tracking
 * - Promotional Code Delivery
 * - Full Service via WhatsApp
 * - Intelligent AI Chatbot
 * - Transactional Notifications
 *
 * Uses responsive grid (3 columns desktop, 2 tablet, 1 mobile).
 *
 * @param props - UseCases component props
 * @param props.theme - Design system theme (default: 'classic')
 * @returns React component for the UseCases section
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
      aria-label="Z-API Use Cases"
    >
      <div className="container">
        <div className={styles.useCasesHeader}>
          <Heading as="h2" className={styles.useCasesTitle}>
            Use cases with Z-API
          </Heading>
          <p className={styles.useCasesSubtitle}>
            Practical examples of integration with the Z-API. Learn how to implement common WhatsApp functionalities in your projects.
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