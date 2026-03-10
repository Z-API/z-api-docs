import Link from '@docusaurus/Link';
import { MonoIcon, type MonoIconName } from '@site/src/components/shared/Icon/MonoIcon';
import { useActiveBreakpoint } from '@site/src/hooks/useActiveBreakpoint';
import { useIntersectionObserver } from '@site/src/hooks/useIntersectionObserver';
import type { Theme } from '@site/src/types';
import { createAccessibleVariants, fadeUpVariants, staggerContainerVariants, staggerItemVariants } from '@site/src/utils/animations';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { memo, type ReactNode } from 'react';

import styles from './styles.module.css';

type ResourceCard = {
  title: string;
  description: string;
  ctaLabel: string;
  to?: string;
  href?: string;
  icon: MonoIconName;
};

const RESOURCE_CARDS: ResourceCard[] = [
  {
    title: 'WhatsApp Business API',
    description: 'Envie e receba mensagens em escala. Integre a API do WhatsApp ao seu CRM ou plataforma de comunicação.',
    ctaLabel: 'Explorar API',
    to: '/docs/messages/introducao',
    icon: 'message',
  },
  {
    title: 'Cloud API',
    description: 'Hospedagem gerenciada pela Meta. Comece a enviar mensagens rapidamente sem gerenciar sua própria infraestrutura.',
    ctaLabel: 'Começar com Cloud API',
    to: '/docs/instance/introducao',
    icon: 'cloud',
  },
  {
    title: 'WhatsApp Business App',
    description: 'Aplicativo gratuito para pequenas empresas se comunicarem com clientes de forma simples e pessoal.',
    ctaLabel: 'Baixar aplicativo',
    href: 'https://www.whatsapp.com/business/',
    icon: 'phone',
  },
  {
    title: 'Embedded Signup',
    description: 'Simplifique a integração permitindo que empresas se inscrevam diretamente no seu aplicativo.',
    ctaLabel: 'Ver documentação',
    to: '/docs/partners/introducao',
    icon: 'shield-check',
  },
  {
    title: 'Webhooks',
    description: 'Receba notificações em tempo real sobre eventos importantes, como mensagens recebidas e status de entrega.',
    ctaLabel: 'Configurar webhooks',
    to: '/docs/webhooks/introducao',
    icon: 'rocket',
  },
  {
    title: 'Analytics',
    description: 'Acompanhe métricas de desempenho e entenda como suas mensagens estão sendo recebidas pelos usuários.',
    ctaLabel: 'Ver analytics',
    to: '/docs/intro',
    icon: 'bar-chart',
  },
];

/**
 * Props do componente DeveloperResources
 */
type DeveloperResourcesProps = {
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
};

/**
 * Componente inspirado no WhatsApp Business Developer Hub.
 * Renderiza cards com ícone, descrição e CTA em verde-escuro (sempre em negrito).
 * 
 * @param props - Props do componente DeveloperResources
 * @param props.theme - Tema do design system (padrão: 'classic')
 * @returns Componente React da seção DeveloperResources
 * 
 * @example
 * ```tsx
 * <DeveloperResources />
 * <DeveloperResources theme="zapi" />
 * <DeveloperResources theme="hybrid" />
 * ```
 */
const DeveloperResources = memo(({ theme = 'classic' }: DeveloperResourcesProps = {}): ReactNode => {
  const [sectionRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
  });
  const breakpoint = useActiveBreakpoint();

  const containerVariants = createAccessibleVariants(staggerContainerVariants);
  const itemVariants = createAccessibleVariants(staggerItemVariants);

  return (
    <section
      ref={sectionRef}
      className={styles.developerResources}
      data-theme={theme}
      data-breakpoint={breakpoint.name}
      aria-label="Recursos para desenvolvedores">
      <nav className="container" aria-label="Navegação de recursos">
        <motion.div
          variants={createAccessibleVariants(fadeUpVariants)}
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          exit="hidden"
          transition={{ duration: 0.6 }}>
          <Heading as="h2" className={styles.title}>
            Recursos para desenvolvedores
          </Heading>
        </motion.div>
        <motion.div
          className={styles.resourcesGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          exit="hidden"
          viewport={{ once: true, margin: '-50px' }}>
          {RESOURCE_CARDS.map((card) => {
            const linkProps = card.to
              ? { as: Link, props: { to: card.to } }
              : { as: 'a', props: { href: card.href ?? '#', target: '_blank', rel: 'noreferrer' } };

            const CtaComponent = linkProps.as as React.ComponentType<any>;

            return (
              <motion.article
                key={card.title}
                className={styles.resourceCard}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                exit="hidden">
                <div className={styles.iconBadge} aria-hidden="true">
                  <MonoIcon name={card.icon} size={24} />
                </div>
                <Heading as="h3" className={styles.cardTitle}>
                  {card.title}
                </Heading>
                <p className={clsx(styles.cardDescription, 'text-large')}>{card.description}</p>
                <CtaComponent
                  {...linkProps.props}
                  className={styles.cardCta}
                  aria-label={`${card.ctaLabel} - ${card.title}`}>
                  <strong className="text--success">{card.ctaLabel}</strong>
                  <ArrowRight size={16} aria-hidden />
                </CtaComponent>
              </motion.article>
            );
          })}
        </motion.div>
      </nav>
    </section>
  );
});

export default DeveloperResources;
