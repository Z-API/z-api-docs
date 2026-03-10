import AnimatedIcon from "@site/src/components/shared/Icon/AnimatedIcon";
import Loading from "@site/src/components/shared/Loading";
import { useHomepageFeatures } from "@site/src/components/patterns/container-presentational";
import { useActiveBreakpoint } from "@site/src/hooks/useActiveBreakpoint";
import type { FeatureItem, Theme } from "@site/src/types";
import {
  createAccessibleVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "@site/src/utils/animations";
import { FEATURE_ICON_SIZE } from "@site/src/utils/iconSizes";
import Heading from "@theme/Heading";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { memo, type CSSProperties, type ReactNode } from "react";

import styles from "./styles.module.css";

// Dados movidos para hook useHomepageFeatures
// Seguindo padrão Container/Presentational

/**
 * Props do componente Feature
 */
type FeatureProps = FeatureItem & {
  /** Ícone do lucide-react */
  icon: typeof Zap;
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
};

/**
 * Componente Feature - Card individual de feature/benefício.
 *
 * Renderiza um card com ícone, título e descrição de um benefício da plataforma.
 *
 * @param props - Props do componente Feature
 * @param props.title - Título da feature
 * @param props.description - Descrição da feature (pode ser string ou ReactNode)
 * @param props.icon - Ícone do lucide-react
 * @param props.theme - Tema do design system (padrão: 'classic')
 * @returns Componente React do card de feature
 */
const Feature = memo(
  ({ title, description, icon, theme = "classic" }: FeatureProps) => {
    const itemVariants = createAccessibleVariants(staggerItemVariants);

    return (
      <motion.div
        className={clsx(styles.featureItem, "stagger-item")}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
      >
        <article
          className={clsx("card", styles.featureCard)}
          data-theme={theme}
        >
          <div className={clsx("text--center", "padding-horiz--md", styles.featureContent)}>
            <div className={styles.featureIcon}>
              <AnimatedIcon
                icon={icon}
                size={FEATURE_ICON_SIZE}
                animation="hover"
              />
            </div>
            <Heading as="h3" className={styles.featureTitle}>
              {title}
            </Heading>
            <p className={styles.featureDescription}>{description}</p>
          </div>
        </article>
      </motion.div>
    );
  }
);

/**
 * Props do componente HomepageFeatures
 */
type HomepageFeaturesProps = {
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
  /** URL para fetch de dados (opcional) */
  dataUrl?: string;
  /** Se deve fazer fetch de dados */
  enableFetch?: boolean;
};

/**
 * Componente HomepageFeatures - Seção de features/benefícios (Presentational).
 *
 * Componente presentacional que exibe cards destacando os principais benefícios.
 * Usa hook customizado (useHomepageFeatures) para gerenciar lógica de dados,
 * seguindo o padrão Container/Presentational.
 *
 * Usa grid responsivo (3 colunas desktop, 2 tablet, 1 mobile).
 *
 * @param props - Props do componente HomepageFeatures
 * @param props.theme - Tema do design system (padrão: 'classic')
 * @param props.dataUrl - URL para fetch de dados (opcional)
 * @param props.enableFetch - Se deve fazer fetch de dados (padrão: false)
 * @returns Componente React da seção HomepageFeatures
 *
 * @example
 * ```tsx
 * // Uso básico (dados estáticos)
 * <HomepageFeatures />
 * 
 * // Com fetch de dados
 * <HomepageFeatures 
 *   dataUrl="/api/homepage-features"
 *   enableFetch={true}
 * />
 * ```
 */
export default function HomepageFeatures({
  theme = "classic",
  dataUrl,
  enableFetch = false,
}: HomepageFeaturesProps = {}): ReactNode {
  // Hook gerencia lógica de dados (separado da apresentação)
  const { features, isLoading, error } = useHomepageFeatures({
    url: dataUrl,
    enableFetch,
  });

  const containerVariants = createAccessibleVariants(staggerContainerVariants);
  const breakpoint = useActiveBreakpoint();

  const gridColumns = breakpoint.isMobile ? 1 : breakpoint.isTablet ? 2 : 3;
  const gridGap = breakpoint.isMobile
    ? "var(--spacing-md)"
    : breakpoint.isTablet
      ? "var(--spacing-lg)"
      : "var(--spacing-xl)";
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
    gap: gridGap,
  };

  // Mostrar loading
  if (isLoading) {
    return (
      <section
        className={styles.features}
        data-theme={theme}
        aria-label="Benefícios da Plataforma Z-API"
        aria-busy="true">
        <div className="container">
          <Loading text="Carregando features..." />
        </div>
      </section>
    );
  }

  // Mostrar erro
  if (error) {
    return (
      <section
        className={styles.features}
        data-theme={theme}
        aria-label="Benefícios da Plataforma Z-API"
      >
        <div className="container">
          <div role="alert" aria-live="assertive">
            <p>Erro ao carregar features: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  // Renderizar componente presentacional
  return (
    <section
      className={styles.features}
      data-theme={theme}
      data-breakpoint={breakpoint.name}
      aria-label="Benefícios da Plataforma Z-API"
      aria-labelledby="features-title">
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" id="features-title" className={styles.featuresTitle}>
            Por que escolher Z-API?
          </Heading>
          <p className={styles.featuresSubtitle} id="features-subtitle">
            Com o Z-API você tem menos complexidade, com suporte 100% nacional
            e integração plug & play. Comece pela prática e teste nossa API sem
            precisar escrever código.
          </p>
        </div>
        <motion.div
          className={styles.featuresGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: true, margin: "-100px" }}
          style={gridStyle}
          role="list"
          aria-label="Lista de benefícios">
          {features.map((props) => (
            <Feature key={props.title} {...props} theme={theme} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
