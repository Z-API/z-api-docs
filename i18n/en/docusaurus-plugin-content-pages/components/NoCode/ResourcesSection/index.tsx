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
  Book,
  Clock,
  ExternalLink,
  FileText,
  User,
  Youtube
} from 'lucide-react';
import { memo, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Tipo para recurso
 */
type Resource = {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'documentation' | 'course';
  duration?: string;
  author?: string;
  link: string;
  icon: LucideIcon;
  tags: string[];
};

/**
 * Recursos adicionais para aprendizado
 * 
 * Curated by Tech Writer
 * Additional learning resources for no-code automation
 */
const RESOURCES: Resource[] = [
  {
    id: 'video-intro-apis',
    title: 'Introdução a APIs para Iniciantes',
    description:
      'Vídeo explicativo sobre o que são APIs, como funcionam e como usar sem programação. Perfeito para quem está começando.',
    type: 'video',
    duration: '15 minutos',
    author: 'Z-API Central',
    link: 'https://www.youtube.com/watch?v=example',
    icon: Youtube,
    tags: ['APIs', 'Iniciante', 'Conceitos'],
  },
  {
    id: 'guia-postman',
    title: 'Guia Completo do Postman',
    description:
      'Tutorial completo sobre como usar Postman para testar APIs. Inclui exemplos práticos com Z-API.',
    type: 'article',
    author: 'Z-API Central',
    link: '/docs/quick-start/introducao',
    icon: FileText,
    tags: ['Postman', 'Tutorial', 'Ferramentas'],
  },
  {
    id: 'curso-zapier',
    title: 'Curso: Automações com Zapier',
    description:
      'Curso completo sobre como criar automações poderosas usando Zapier. Do básico ao avançado.',
    type: 'course',
    duration: '3 horas',
    author: 'Z-API Central',
    link: '/docs/webhooks/introducao',
    icon: Book,
    tags: ['Zapier', 'Curso', 'Automação'],
  },
  {
    id: 'webhooks-explicado',
    title: 'Webhooks Explicados de Forma Simples',
    description:
      'Artigo detalhado explicando webhooks de forma simples, sem jargão técnico. Ideal para iniciantes.',
    type: 'article',
    author: 'Z-API Central',
    link: '/docs/webhooks/introducao',
    icon: FileText,
    tags: ['Webhooks', 'Conceitos', 'Iniciante'],
  },
  {
    id: 'video-primeira-automacao',
    title: 'Sua Primeira Automação em Vídeo',
    description:
      'Vídeo passo a passo mostrando como criar sua primeira automação WhatsApp do zero usando ferramentas no-code.',
    type: 'video',
    duration: '20 minutos',
    author: 'Z-API Central',
    link: 'https://www.youtube.com/watch?v=example',
    icon: Youtube,
    tags: ['Tutorial', 'Vídeo', 'Iniciante'],
  },
  {
    id: 'best-practices',
    title: 'Melhores Práticas de Automação',
    description:
      'Guia com dicas e melhores práticas para criar automações eficientes e profissionais.',
    type: 'documentation',
    author: 'Z-API Central',
    link: '/docs/quick-start/introducao',
    icon: FileText,
    tags: ['Melhores Práticas', 'Dicas', 'Profissional'],
  },
];

/**
 * Props do componente ResourceCard
 */
type ResourceCardProps = {
  resource: Resource;
  theme?: Theme;
};

/**
 * Componente ResourceCard - Card de recurso
 * 
 * Designed by Tech Writer + UI/UX
 */
const ResourceCard = memo(function ResourceCard({
  resource,
  theme = 'official',
}: ResourceCardProps): ReactNode {
  const [ripples, handleRippleClick] = useRippleEffect({});
  const variants = createAccessibleVariants(hoverElevationVariants);

  const typeLabels: Record<Resource['type'], string> = {
    video: 'Vídeo',
    article: 'Artigo',
    documentation: 'Documentação',
    course: 'Curso',
  };

  const isExternal = resource.link.startsWith('http');

  return (
    <motion.div
      variants={variants}
      initial="rest"
      whileHover="hover"
      className={styles.cardWrapper}>
      {isExternal ? (
        <a
          href={resource.link}
          className={clsx(styles.card, styles[theme])}
          data-theme={theme}
          onClick={handleRippleClick}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${resource.title} - ${resource.description}`}>
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
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <AnimatedIcon
                  icon={resource.icon}
                  size={CARD_ICON_SIZE}
                  animation="hover"
                />
              </div>
              <span className={styles.type}>{typeLabels[resource.type]}</span>
            </div>
            <h3 className={styles.cardTitle}>{resource.title}</h3>
            <p className={styles.cardDescription}>{resource.description}</p>
            {resource.duration && (
              <div className={styles.cardMeta}>
                <span className={styles.metaItem}>
                  <Clock size={14} aria-hidden="true" />
                  {resource.duration}
                </span>
              </div>
            )}
            {resource.author && (
              <div className={styles.cardMeta}>
                <span className={styles.metaItem}>
                  <User size={14} aria-hidden="true" />
                  {resource.author}
                </span>
              </div>
            )}
            <div className={styles.cardTags}>
              {resource.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <span className={styles.cardLink}>
              <strong className="text--success">
                Acessar recurso <ExternalLink size={16} aria-hidden="true" />
              </strong>
            </span>
          </div>
        </a>
      ) : (
        <Link
          to={resource.link}
          className={clsx(styles.card, styles[theme])}
          data-theme={theme}
          onClick={handleRippleClick}
          aria-label={`${resource.title} - ${resource.description}`}>
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
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <AnimatedIcon
                  icon={resource.icon}
                  size={CARD_ICON_SIZE}
                  animation="hover"
                />
              </div>
              <span className={styles.type}>{typeLabels[resource.type]}</span>
            </div>
            <h3 className={styles.cardTitle}>{resource.title}</h3>
            <p className={styles.cardDescription}>{resource.description}</p>
            {resource.duration && (
              <div className={styles.cardMeta}>
                <span className={styles.metaItem}>
                  <Clock size={14} aria-hidden="true" />
                  {resource.duration}
                </span>
              </div>
            )}
            {resource.author && (
              <div className={styles.cardMeta}>
                <span className={styles.metaItem}>
                  <User size={14} aria-hidden="true" />
                  {resource.author}
                </span>
              </div>
            )}
            <div className={styles.cardTags}>
              {resource.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <span className={styles.cardLink}>
              <strong className="text--success">Acessar recurso →</strong>
            </span>
          </div>
        </Link>
      )}
    </motion.div>
  );
});

/**
 * Props do componente ResourcesSection
 */
type ResourcesSectionProps = {
  /** Tema do design system (padrão: 'official') */
  theme?: Theme;
};

/**
 * Componente ResourcesSection - Recursos adicionais para aprendizado.
 * 
 * Curated by Tech Writer
 * Additional learning resources for no-code automation
 * 
 * Exibe recursos adicionais como vídeos, artigos, cursos e documentação
 * para ajudar no aprendizado de automações WhatsApp sem código.
 * 
 * @param props - Props do componente ResourcesSection
 * @param props.theme - Tema do design system (padrão: 'official')
 * @returns Componente React da seção de recursos
 */
export default function ResourcesSection({
  theme = 'official',
}: ResourcesSectionProps): ReactNode {
  const variants = createAccessibleVariants(fadeUpVariants);

  return (
    <section
      id="recursos"
      className={clsx(styles.resources, styles[theme])}
      data-theme={theme}
      aria-label="Recursos adicionais para aprendizado">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}>
          <h2 className={styles.title}>Recursos Adicionais</h2>
          <p className={styles.subtitle}>
            Explore vídeos, artigos, cursos e documentação para aprofundar seu
            conhecimento sobre automações WhatsApp sem código.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {RESOURCES.map((resource, index) => (
            <motion.div
              key={resource.id}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}>
              <ResourceCard resource={resource} theme={theme} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

