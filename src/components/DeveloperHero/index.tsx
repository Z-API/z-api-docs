import Link from '@docusaurus/Link';
import AnimatedButtonLink from '@site/src/components/shared/Button/AnimatedButtonLink';
import type { Theme } from '@site/src/types';
import { createAccessibleVariants, fadeUpVariants } from '@site/src/utils/animations';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Book, Code2, MessageSquare, ShieldCheck } from 'lucide-react';

import styles from './styles.module.css';

type HeroStat = {
  icon: LucideIcon;
  label: string;
  value: string;
};

type DeveloperHeroProps = {
  theme?: Theme;
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  stats?: HeroStat[];
};

const DEFAULT_STATS: HeroStat[] = [
  { icon: Code2, label: 'Envio médio', value: '<1s' },
  { icon: Book, label: 'Documentação', value: '200+ páginas' },
  { icon: ShieldCheck, label: 'SLA garantido', value: '99,95%' },
];

/**
 * Hero inspirado no WhatsApp Business Developer Hub.
 */
export function DeveloperHero({
  theme = 'classic',
  title = 'Construa experiências confiáveis no WhatsApp com o Z-API',
  subtitle = 'SDKs, exemplos e suporte nacional para acelerar integrações críticas.',
  primaryCta = { label: 'Começar a desenvolver', to: '/docs/quick-start/introducao' },
  secondaryCta = { label: 'Ver documentação', to: '/docs/intro' },
  stats = DEFAULT_STATS,
}: DeveloperHeroProps) {
  return (
    <section className={clsx(styles.hero, styles[`theme${theme}`])}>
      <div className={clsx('container', styles.container)}>
        <motion.div
          className={styles.content}
          variants={createAccessibleVariants(fadeUpVariants)}
          initial="hidden"
          animate="visible">
          <Heading as="h1" className={styles.title}>
            {title}
          </Heading>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.ctas}>
            <Link to={primaryCta.to} className={styles.primaryCta}>
              <AnimatedButtonLink variant="ghost" size="lg" className={styles.ctaButton}>
                <ArrowRight size={16} aria-hidden /> {primaryCta.label}
              </AnimatedButtonLink>
            </Link>
            <Link to={secondaryCta.to} className={styles.secondaryCta}>
              <AnimatedButtonLink variant="ghost" size="lg" className={styles.ctaButton}>
                {secondaryCta.label}
              </AnimatedButtonLink>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className={styles.statsGrid}
          variants={createAccessibleVariants(fadeUpVariants)}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}>
          {stats.map(({ icon: Icon = MessageSquare, label, value }) => (
            <article key={label} className={styles.statCard}>
              <Icon size={20} aria-hidden />
              <p className={styles.statValue}>{value}</p>
              <p className={styles.statLabel}>{label}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


