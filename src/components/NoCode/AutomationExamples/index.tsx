import Link from '@docusaurus/Link';
import AnimatedIcon from '@site/src/components/shared/Icon/AnimatedIcon';
import { useRippleEffect } from '@site/src/hooks/useRippleEffect';
import type { Theme } from '@site/src/types';
import {
  createAccessibleVariants,
  hoverElevationVariants,
} from '@site/src/utils/animations';
import { CARD_ICON_SIZE } from '@site/src/utils/iconSizes';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Bell,
  Calendar,
  CreditCard,
  MessageSquare,
  Package,
  ShoppingCart,
  Star,
  Users,
} from 'lucide-react';
import { memo, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Tipo para exemplo de automação
 */
type AutomationExample = {
  id: string;
  title: string;
  description: string;
  useCase: string;
  benefits: string[];
  icon: LucideIcon;
  link?: string;
};

/**
 * Exemplos práticos de automações
 */
const AUTOMATION_EXAMPLES: AutomationExample[] = [
  {
    id: 'boas-vindas',
    title: 'Mensagem de Boas-Vindas',
    description:
      'Envie uma mensagem automática quando alguém adiciona seu número ou envia primeira mensagem.',
    useCase:
      'Ideal para empresas que querem dar as boas-vindas e apresentar seus serviços.',
    benefits: [
      'Primeira impressão profissional',
      'Apresenta produtos/serviços',
      'Reduz tempo de resposta',
      'Melhora experiência do cliente',
    ],
    icon: MessageSquare,
    link: '/docs/messages/texto-simples',
  },
  {
    id: 'notificacoes',
    title: 'Notificações Automáticas',
    description:
      'Envie lembretes, confirmações e atualizações automaticamente via WhatsApp.',
    useCase:
      'Perfeito para enviar confirmações de pedidos, lembretes de consultas, atualizações de status.',
    benefits: [
      'Reduz esqueci-mentos',
      'Mantém clientes informados',
      'Aumenta satisfação',
      'Automatiza comunicação',
    ],
    icon: Bell,
    link: '/docs/webhooks/introducao',
  },
  {
    id: 'atendimento',
    title: 'Atendimento Automatizado',
    description:
      'Crie respostas automáticas para perguntas frequentes e direcione clientes.',
    useCase:
      'Use para responder perguntas comuns, direcionar para setores específicos, agendar atendimentos.',
    benefits: [
      'Disponível 24/7',
      'Respostas instantâneas',
      'Reduz carga de trabalho',
      'Melhora eficiência',
    ],
    icon: Users,
    link: '/docs/messages/botoes',
  },
  {
    id: 'vendas',
    title: 'Automação de Vendas',
    description:
      'Envie catálogos, produtos e facilitadores de compra automaticamente.',
    useCase:
      'Ideal para e-commerces, lojas virtuais e vendedores que querem automatizar o processo de venda.',
    benefits: [
      'Aumenta conversões',
      'Facilita compras',
      'Mostra produtos visualmente',
      'Reduz abandono de carrinho',
    ],
    icon: ShoppingCart,
    link: '/docs/messages/catalogo',
  },
  {
    id: 'agendamento',
    title: 'Sistema de Agendamento',
    description:
      'Permita que clientes agendem horários diretamente pelo WhatsApp usando botões interativos.',
    useCase:
      'Perfeito para salões, clínicas, consultorias e qualquer serviço que precisa de agendamento.',
    benefits: [
      'Agendamento 24/7',
      'Reduz faltas',
      'Automatiza confirmações',
      'Integra com calendário',
    ],
    icon: Calendar,
    link: '/docs/messages/botoes',
  },
  {
    id: 'pesquisa-satisfacao',
    title: 'Pesquisa de Satisfação',
    description:
      'Envie pesquisas automáticas após atendimento ou entrega para medir satisfação do cliente.',
    useCase:
      'Ideal para coletar feedback, melhorar serviços e identificar problemas rapidamente.',
    benefits: [
      'Coleta feedback automático',
      'Identifica problemas rapidamente',
      'Melhora serviços',
      'Aumenta NPS',
    ],
    icon: Star,
    link: '/docs/messages/botoes',
  },
  {
    id: 'rastreamento-pedidos',
    title: 'Rastreamento de Pedidos',
    description:
      'Envie atualizações automáticas sobre status de pedidos e códigos de rastreamento.',
    useCase:
      'Essencial para e-commerces que querem manter clientes informados sobre seus pedidos.',
    benefits: [
      'Reduz perguntas sobre pedidos',
      'Melhora experiência',
      'Aumenta confiança',
      'Automatiza comunicação',
    ],
    icon: Package,
    link: '/docs/messages/texto-simples',
  },
  {
    id: 'lembrete-pagamento',
    title: 'Lembretes de Pagamento',
    description:
      'Envie lembretes automáticos de pagamentos pendentes e facilite o recebimento.',
    useCase:
      'Perfeito para empresas que precisam cobrar clientes de forma automática e profissional.',
    benefits: [
      'Reduz inadimplência',
      'Automatiza cobrança',
      'Facilita pagamento',
      'Mantém relacionamento',
    ],
    icon: CreditCard,
    link: '/docs/messages/botoes',
  },
];

/**
 * Props do componente AutomationExampleCard
 */
type AutomationExampleCardProps = {
  example: AutomationExample;
  theme?: Theme;
};

/**
 * Componente AutomationExampleCard - Card de exemplo de automação
 */
const AutomationExampleCard = memo(function AutomationExampleCard({
  example,
  theme = 'official',
}: AutomationExampleCardProps): ReactNode {
  const [ripples, handleRippleClick] = useRippleEffect({});
  const variants = createAccessibleVariants(hoverElevationVariants);

  const cardContent = (
    <>
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
      <div className={styles.cardIcon}>
        <AnimatedIcon
          icon={example.icon}
          size={CARD_ICON_SIZE}
          animation="hover"
        />
      </div>
      <h3 className={styles.cardTitle}>{example.title}</h3>
      <p className={styles.cardDescription}>{example.description}</p>
      <div className={styles.cardUseCase}>
        <strong>Quando usar:</strong> {example.useCase}
      </div>
      <ul className={styles.cardBenefits}>
        {example.benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
      {example.link && (
        <span className={styles.cardLink}>
          <strong className="text--success">Ver como fazer →</strong>
        </span>
      )}
    </>
  );

  return (
    <motion.div
      variants={variants}
      initial="rest"
      whileHover="hover"
      className={styles.cardWrapper}>
      {example.link ? (
        <Link
          to={example.link}
          className={clsx(styles.card, styles[theme])}
          data-theme={theme}
          onClick={handleRippleClick}
          aria-label={`${example.title} - ${example.description}`}>
          {cardContent}
        </Link>
      ) : (
        <div
          className={clsx(styles.card, styles[theme])}
          data-theme={theme}
          onClick={handleRippleClick}>
          {cardContent}
        </div>
      )}
    </motion.div>
  );
});

/**
 * Props do componente AutomationExamples
 */
type AutomationExamplesProps = {
  /** Tema do design system (padrão: 'official') */
  theme?: Theme;
};

/**
 * Componente AutomationExamples - Exemplos práticos de automações.
 *
 * Exibe cards com exemplos reais de automações que podem ser criadas sem código.
 * Cada card mostra quando usar, benefícios e link para documentação.
 *
 * @param props - Props do componente AutomationExamples
 * @param props.theme - Tema do design system (padrão: 'official')
 * @returns Componente React dos exemplos de automação
 */
export default function AutomationExamples({
  theme = 'official',
}: AutomationExamplesProps): ReactNode {
  return (
    <section
      className={clsx(styles.examples, styles[theme])}
      data-theme={theme}
      aria-label="Exemplos práticos de automações">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Exemplos Práticos de Automações</h2>
          <p className={styles.subtitle}>
            Veja exemplos reais de automações que você pode criar sem escrever
            código
          </p>
        </div>

        <div className={styles.grid}>
          {AUTOMATION_EXAMPLES.map((example) => (
            <AutomationExampleCard
              key={example.id}
              example={example}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

