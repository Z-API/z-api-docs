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
  Bot,
  Brain,
  Calendar,
  Clock,
  Network,
  PlayCircle,
  ShoppingBag,
  Target,
} from 'lucide-react';
import { memo, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Tipo para tutorial
 */
type Tutorial = {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: number;
  prerequisites: string[];
  whatYoullLearn: string[];
  icon: LucideIcon;
  link?: string;
};

/**
 * Tutoriais detalhados passo a passo
 * 
 * Curated by Tech Writer
 * Step-by-step tutorials for non-technical users
 */
const TUTORIALS: Tutorial[] = [
  {
    id: 'primeira-automacao',
    title: 'Sua Primeira Automação em 15 Minutos',
    description:
      'Aprenda a criar sua primeira automação WhatsApp do zero usando Postman. Envie uma mensagem automática sem escrever código.',
    duration: '15 minutos',
    difficulty: 'beginner',
    steps: 8,
    prerequisites: [
      'Conta Z-API criada',
      'Postman instalado',
      'WhatsApp conectado',
    ],
    whatYoullLearn: [
      'Como usar Postman para testar APIs',
      'Como fazer sua primeira requisição',
      'Como enviar mensagem via Z-API',
      'Como verificar se funcionou',
    ],
    icon: PlayCircle,
    link: '/docs/quick-start/introducao',
  },
  {
    id: 'chatbot-zapier',
    title: 'Criar Chatbot com Zapier (Sem Código)',
    description:
      'Crie um chatbot inteligente que responde perguntas frequentes usando Zapier e webhooks. Perfeito para iniciantes.',
    duration: '30 minutos',
    difficulty: 'beginner',
    steps: 12,
    prerequisites: [
      'Conta Zapier gratuita',
      'Conta Z-API',
      'WhatsApp conectado',
    ],
    whatYoullLearn: [
      'Como criar Zap no Zapier',
      'Como configurar webhooks',
      'Como criar respostas automáticas',
      'Como testar seu chatbot',
    ],
    icon: Bot,
    link: '/docs/webhooks/introducao',
  },
  {
    id: 'automatizar-vendas',
    title: 'Automatizar Processo de Vendas',
    description:
      'Automatize todo o funil de vendas: desde apresentação de produtos até confirmação de pedido e follow-up.',
    duration: '45 minutos',
    difficulty: 'intermediate',
    steps: 15,
    prerequisites: [
      'Conta Make ou Zapier',
      'Catálogo de produtos',
      'Sistema de pagamento',
    ],
    whatYoullLearn: [
      'Como criar fluxo de vendas',
      'Como enviar catálogos automaticamente',
      'Como processar pedidos',
      'Como fazer follow-up',
    ],
    icon: ShoppingBag,
    link: '/docs/messages/catalogo',
  },
  {
    id: 'agendamento-automatico',
    title: 'Sistema de Agendamento Automático',
    description:
      'Crie um sistema completo de agendamento com confirmações, lembretes e cancelamentos automáticos.',
    duration: '60 minutos',
    difficulty: 'intermediate',
    steps: 20,
    prerequisites: [
      'Ferramenta no-code (Make/Zapier)',
      'Calendário ou sistema de agendamento',
      'Banco de dados simples',
    ],
    whatYoullLearn: [
      'Como criar sistema de agendamento',
      'Como enviar confirmações',
      'Como criar lembretes automáticos',
      'Como gerenciar cancelamentos',
    ],
    icon: Calendar,
    link: '/docs/messages/botoes',
  },
  {
    id: 'integracao-crm',
    title: 'Integrar WhatsApp com CRM',
    description:
      'Conecte seu WhatsApp com CRM (HubSpot, Salesforce, Pipedrive) para sincronizar contatos e oportunidades automaticamente.',
    duration: '90 minutos',
    difficulty: 'advanced',
    steps: 25,
    prerequisites: [
      'Conta em CRM',
      'Ferramenta no-code avançada',
      'Conhecimento básico de APIs',
    ],
    whatYoullLearn: [
      'Como conectar Z-API com CRM',
      'Como sincronizar contatos',
      'Como criar leads automaticamente',
      'Como atualizar oportunidades',
    ],
    icon: Network,
    link: '/docs/webhooks/introducao',
  },
  {
    id: 'chatbot-ia',
    title: 'Chatbot com Inteligência Artificial',
    description:
      'Crie um chatbot inteligente usando GPT-4 ou Claude que entende contexto e responde de forma natural.',
    duration: '120 minutos',
    difficulty: 'advanced',
    steps: 30,
    prerequisites: [
      'Conta OpenAI ou Anthropic',
      'Ferramenta no-code avançada',
      'Conhecimento de webhooks',
    ],
    whatYoullLearn: [
      'Como integrar IA com WhatsApp',
      'Como criar prompts eficazes',
      'Como gerenciar contexto',
      'Como melhorar respostas',
    ],
    icon: Brain,
    link: '/docs/webhooks/introducao',
  },
];

/**
 * Props do componente TutorialCard
 */
type TutorialCardProps = {
  tutorial: Tutorial;
  theme?: Theme;
};

/**
 * Componente TutorialCard - Card de tutorial
 * 
 * Designed by Tech Writer
 * Clear structure for learning paths
 */
const TutorialCard = memo(function TutorialCard({
  tutorial,
  theme = 'official',
}: TutorialCardProps): ReactNode {
  const [ripples, handleRippleClick] = useRippleEffect({});
  const variants = createAccessibleVariants(hoverElevationVariants);

  const difficultyLabels: Record<Tutorial['difficulty'], string> = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
  };

  const difficultyColors: Record<Tutorial['difficulty'], string> = {
    beginner: 'var(--zapi-success, #10b981)',
    intermediate: 'var(--zapi-warning, #f59e0b)',
    advanced: 'var(--zapi-error, #ef4444)',
  };

  return (
    <motion.div
      variants={variants}
      initial="rest"
      whileHover="hover"
      className={styles.cardWrapper}>
      {tutorial.link ? (
        <Link
          to={tutorial.link}
          className={clsx(styles.card, styles[theme])}
          data-theme={theme}
          onClick={handleRippleClick}
          aria-label={`${tutorial.title} - ${tutorial.description}`}>
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
                  icon={tutorial.icon}
                  size={CARD_ICON_SIZE}
                  animation="hover"
                />
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.duration}>
                  <Clock size={14} aria-hidden="true" />
                  {tutorial.duration}
                </span>
                <span
                  className={styles.difficulty}
                  style={{ color: difficultyColors[tutorial.difficulty] }}>
                  {difficultyLabels[tutorial.difficulty]}
                </span>
              </div>
            </div>
            <h3 className={styles.cardTitle}>{tutorial.title}</h3>
            <p className={styles.cardDescription}>{tutorial.description}</p>
            <div className={styles.cardStats}>
              <span className={styles.stat}>
                <Target size={16} aria-hidden="true" />
                {tutorial.steps} passos
              </span>
            </div>
            <div className={styles.cardPrerequisites}>
              <strong>Pré-requisitos:</strong>
              <ul>
                {tutorial.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>
            <div className={styles.cardLearn}>
              <strong>O que você vai aprender:</strong>
              <ul>
                {tutorial.whatYoullLearn.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            {tutorial.link && (
              <span className={styles.cardLink}>
                <strong className="text--success">Começar tutorial →</strong>
              </span>
            )}
          </div>
        </Link>
      ) : (
        <div
          className={clsx(styles.card, styles[theme])}
          data-theme={theme}
          onClick={handleRippleClick}>
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
                  icon={tutorial.icon}
                  size={CARD_ICON_SIZE}
                  animation="hover"
                />
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.duration}>
                  <Clock size={14} aria-hidden="true" />
                  {tutorial.duration}
                </span>
                <span
                  className={styles.difficulty}
                  style={{ color: difficultyColors[tutorial.difficulty] }}>
                  {difficultyLabels[tutorial.difficulty]}
                </span>
              </div>
            </div>
            <h3 className={styles.cardTitle}>{tutorial.title}</h3>
            <p className={styles.cardDescription}>{tutorial.description}</p>
            <div className={styles.cardStats}>
              <span className={styles.stat}>
                <Target size={16} aria-hidden="true" />
                {tutorial.steps} passos
              </span>
            </div>
            <div className={styles.cardPrerequisites}>
              <strong>Pré-requisitos:</strong>
              <ul>
                {tutorial.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>
            <div className={styles.cardLearn}>
              <strong>O que você vai aprender:</strong>
              <ul>
                {tutorial.whatYoullLearn.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
});

/**
 * Props do componente TutorialsSection
 */
type TutorialsSectionProps = {
  /** Tema do design system (padrão: 'official') */
  theme?: Theme;
};

/**
 * Componente TutorialsSection - Tutoriais detalhados passo a passo.
 * 
 * Curated by Tech Writer
 * Step-by-step tutorials for non-technical users
 * 
 * Exibe tutoriais completos organizados por dificuldade, incluindo pré-requisitos,
 * duração, número de passos e o que será aprendido.
 * 
 * @param props - Props do componente TutorialsSection
 * @param props.theme - Tema do design system (padrão: 'official')
 * @returns Componente React da seção de tutoriais
 */
export default function TutorialsSection({
  theme = 'official',
}: TutorialsSectionProps): ReactNode {
  const variants = createAccessibleVariants(fadeUpVariants);

  return (
    <section
      id="tutoriais"
      className={clsx(styles.tutorials, styles[theme])}
      data-theme={theme}
      aria-label="Tutoriais passo a passo">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}>
          <h2 className={styles.title}>Tutoriais Passo a Passo</h2>
          <p className={styles.subtitle}>
            Aprenda a criar automações WhatsApp seguindo tutoriais detalhados.
            Cada tutorial inclui pré-requisitos, duração estimada e tudo que você
            vai aprender.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {TUTORIALS.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}>
              <TutorialCard tutorial={tutorial} theme={theme} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

