import { ImageWithFallback } from '@site/src/components/shared/ImageWithFallback';
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
import { Quote } from 'lucide-react';
import { memo, type CSSProperties, type ReactNode } from 'react';

import styles from './styles.module.css';

/**
 * Depoimentos reais de clientes Z-API
 * Baseado na análise do site oficial
 */
const TESTIMONIALS = [
  {
    author: 'Zeno',
    company: 'pesquisa.ai',
    quote:
      'Realizamos pesquisas NPS programadas a partir de configurações para disparos dentro da nossa aplicação. Nossa taxa de resposta tem ficado acima de 65%.',
    avatar: '/img/testimonials/zeno.jpg',
  },
  {
    author: 'Lary Persai',
    company: 'CloudG',
    quote:
      'Quinze dias após a compra, o cliente recebe um WhatsApp da nossa loja com uma promoção personalizada e um voucher de desconto. Também enviamos vouchers no mês de aniversário do cliente.',
    avatar: '/img/testimonials/lary.jpg',
  },
  {
    author: 'Bruno Souza',
    company: 'FullStack',
    quote:
      'Dentro da nossa aplicação, criamos uma experiência para o usuário selecionar e enviar os produtos pelo WhatsApp. Geramos um link com metadados que permite a compra direta.',
    avatar: '/img/testimonials/bruno.jpg',
  },
] as const;

/**
 * Props do componente Testimonial
 */
type TestimonialProps = {
  author: string;
  company: string;
  quote: string;
  avatar: string;
  theme?: Theme;
};

/**
 * Componente Testimonial - Card individual de depoimento.
 *
 * Renderiza um card com avatar, citação, autor e empresa.
 *
 * @param props - Props do componente Testimonial
 * @returns Componente React do card de depoimento
 */
const Testimonial = memo(
  ({ author, company, quote, avatar, theme = 'classic' }: TestimonialProps) => {
    const itemVariants = createAccessibleVariants(staggerItemVariants);

    return (
      <motion.div
        className={clsx(styles.testimonialItem, 'stagger-item')}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
      >
        <article
          className={clsx('card', styles.testimonialCard)}
          data-theme={theme}
        >
          <div className="padding-horiz--md padding-vert--md">
            <div className={styles.quoteIcon}>
              <Quote size={24} aria-hidden />
            </div>
            <blockquote className={styles.quote}>
              <p className={styles.quoteText}>{quote}</p>
            </blockquote>
            <div className={styles.authorInfo}>
              <div className={styles.avatarWrapper}>
                <ImageWithFallback
                  src={avatar}
                  alt={`Foto de ${author}`}
                  className={styles.avatar}
                  fallbackSrc="/img/z-api-logo.webp"
                  aspectRatio="1/1"
                  loading="lazy"
                  fetchPriority="low"
                  width={48}
                  height={48}
                />
              </div>
              <div className={styles.authorDetails}>
                <p className={styles.authorName}>{author}</p>
                <p className={styles.authorCompany}>{company}</p>
              </div>
            </div>
          </div>
        </article>
      </motion.div>
    );
  }
);

Testimonial.displayName = 'Testimonial';

/**
 * Props do componente Testimonials
 */
type TestimonialsProps = {
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
};

/**
 * Componente Testimonials - Seção de depoimentos.
 *
 * Exibe três cards com depoimentos reais de clientes do Z-API:
 * - Zeno (pesquisa.ai) - 65% taxa de resposta NPS
 * - Lary Persai (CloudG) - Promoções personalizadas
 * - Bruno Souza (FullStack) - Compra direta via WhatsApp
 *
 * Usa grid responsivo (3 colunas desktop, 2 tablet, 1 mobile).
 *
 * @param props - Props do componente Testimonials
 * @param props.theme - Tema do design system (padrão: 'classic')
 * @returns Componente React da seção Testimonials
 *
 * @example
 * ```tsx
 * <Testimonials />
 * <Testimonials theme="official" />
 * ```
 */
export default function Testimonials({
  theme = 'classic',
}: TestimonialsProps = {}): ReactNode {
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
      className={styles.testimonials}
      data-theme={theme}
      data-breakpoint={breakpoint.name}
      aria-label="Depoimentos de Clientes Z-API"
    >
      <div className="container">
        <div className={styles.testimonialsHeader}>
          <Heading as="h2" className={styles.testimonialsTitle}>
            Como o Z-API está impulsionando negócios
          </Heading>
          <p className={styles.testimonialsSubtitle}>
            Automação que vende, estabilidade que impressiona e resultados que
            falam por si. Veja como a API WhatsApp do Z-API virou o motor por
            trás dos negócios que mais crescem.
          </p>
        </div>
        <motion.div
          className={styles.testimonialsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: true, margin: '-100px' }}
          style={gridStyle}
        >
          {TESTIMONIALS.map((props) => (
            <Testimonial key={props.author} {...props} theme={theme} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

