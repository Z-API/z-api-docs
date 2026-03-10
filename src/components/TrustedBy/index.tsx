import { ImageWithFallback } from '@site/src/components/shared/ImageWithFallback';
import { useActiveBreakpoint } from '@site/src/hooks/useActiveBreakpoint';
import type { Theme } from '@site/src/types';
import { createAccessibleVariants, fadeUpVariants } from '@site/src/utils/animations';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

import styles from './styles.module.css';

/**
 * Empresas que confiam no Z-API
 * Baseado na análise do site oficial
 */
const TRUSTED_COMPANIES = [
  {
    name: 'Sonae',
    logo: '/img/logos/sonae.png',
    highlight: undefined,
  },
  {
    name: 'Grupo Decolar',
    logo: '/img/logos/decolar.png',
    highlight: '66% melhoria nos atendimentos',
  },
  {
    name: 'Sebrae',
    logo: '/img/logos/sebrae.png',
    highlight: undefined,
  },
  {
    name: 'Hurb',
    logo: '/img/logos/hurb.png',
    highlight: undefined,
  },
  {
    name: 'Flugo',
    logo: '/img/logos/flugo.png',
    highlight: undefined,
  },
  {
    name: 'Arbrain',
    logo: '/img/logos/arbrain.png',
    highlight: undefined,
  },
] as const;

/**
 * Props do componente TrustedBy
 */
type TrustedByProps = {
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
};

/**
 * Componente TrustedBy - Seção "Quem confia".
 *
 * Exibe logos das empresas que utilizam a Z-API em seus projetos.
 * Focado em mostrar a confiança da comunidade de desenvolvedores.
 *
 * @param props - Props do componente TrustedBy
 * @param props.theme - Tema do design system (padrão: 'classic')
 * @returns Componente React da seção TrustedBy
 *
 * @example
 * ```tsx
 * <TrustedBy />
 * <TrustedBy theme="official" />
 * ```
 */
export default function TrustedBy({
  theme = 'classic',
}: TrustedByProps = {}): ReactNode {
  const breakpoint = useActiveBreakpoint();
  const containerVariants = createAccessibleVariants(fadeUpVariants);

  const gridColumns = breakpoint.isMobile ? 2 : breakpoint.isTablet ? 3 : 6;
  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
    gap: breakpoint.isMobile
      ? 'var(--spacing-md)'
      : breakpoint.isTablet
        ? 'var(--spacing-lg)'
        : 'var(--spacing-xl)',
  };

  return (
    <section
      className={styles.trustedBy}
      data-theme={theme}
      data-breakpoint={breakpoint.name}
      aria-label="Empresas que confiam no Z-API"
    >
      <div className="container">
        <motion.div
          className={styles.header}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Heading as="h2" className={styles.title}>
            Quem confia
          </Heading>
          <p className={styles.subtitle}>
            Empresas que utilizam a Z-API em seus projetos e confiam na nossa API para integração com WhatsApp.
          </p>
        </motion.div>
        <motion.div
          className={styles.companiesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={gridStyle}
        >
          {TRUSTED_COMPANIES.map((company) => (
            <div key={company.name} className={styles.companyCard}>
              <div className={styles.logoWrapper}>
                <ImageWithFallback
                  src={company.logo}
                  alt={`Logo ${company.name}`}
                  className={styles.logo}
                  aspectRatio="16/9"
                  loading="lazy"
                  fetchPriority="low"
                />
              </div>
              {company.highlight && (
                <p className={styles.highlight}>
                  <strong className="text--success">{company.highlight}</strong>
                </p>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

