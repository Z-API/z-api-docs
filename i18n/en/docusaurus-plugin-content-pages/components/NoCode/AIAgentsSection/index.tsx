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
  Brain,
  FileText,
  Globe,
  MessageSquare,
  Shield,
  Sparkles
} from 'lucide-react';
import { memo, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Tipo para exemplo de agente de IA
 */
type AIAgentExample = {
  id: string;
  title: string;
  description: string;
  useCase: string;
  howItWorks: string[];
  benefits: string[];
  tools: string[];
  icon: LucideIcon;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  link?: string;
};

/**
 * Exemplos de agentes de IA para automações WhatsApp
 * 
 * Curated by AI Agents Specialist
 * Based on AGENTS.MD knowledge base
 */
const AI_AGENT_EXAMPLES: AIAgentExample[] = [
  {
    id: 'chatbot-inteligente',
    title: 'Chatbot Inteligente com IA',
    description:
      'Crie um chatbot que entende contexto e responde de forma natural usando modelos de linguagem como GPT ou Claude.',
    useCase:
      'Ideal para atendimento ao cliente 24/7, responder perguntas frequentes e qualificar leads automaticamente.',
    howItWorks: [
      'Configure webhook para receber mensagens',
      'Envie mensagem recebida para API de IA (OpenAI, Anthropic)',
      'IA processa e gera resposta contextual',
      'Envie resposta de volta via Z-API',
      'Aprende com cada interação',
    ],
    benefits: [
      'Respostas naturais e contextuais',
      'Disponível 24 horas por dia',
      'Escala automaticamente',
      'Melhora com o tempo',
      'Reduz custos de atendimento',
    ],
    tools: [
      'OpenAI GPT-4',
      'Anthropic Claude',
      'Google Gemini',
      'Z-API Webhooks',
      'Make/Zapier para orquestração',
    ],
    icon: Brain,
    complexity: 'intermediate',
    link: '/docs/webhooks/introducao',
  },
  {
    id: 'assistente-vendas',
    title: 'Assistente de Vendas com IA',
    description:
      'Agente de IA que ajuda no processo de vendas: qualifica leads, apresenta produtos e agenda reuniões automaticamente.',
    useCase:
      'Perfeito para equipes de vendas que querem automatizar qualificação inicial e agendamento de reuniões.',
    howItWorks: [
      'Lead envia mensagem inicial',
      'IA identifica intenção de compra',
      'Faz perguntas qualificadoras',
      'Apresenta produtos relevantes',
      'Agenda reunião se necessário',
      'Envia follow-up automático',
    ],
    benefits: [
      'Qualifica leads automaticamente',
      'Aumenta taxa de conversão',
      'Libera tempo da equipe',
      'Follow-up consistente',
      'Dados estruturados para CRM',
    ],
    tools: [
      'GPT-4 para conversação',
      'Z-API para mensagens',
      'CRM integration (HubSpot, Salesforce)',
      'Calendly para agendamento',
    ],
    icon: MessageSquare,
    complexity: 'advanced',
  },
  {
    id: 'moderador-conteudo',
    title: 'Moderador de Conteúdo Automatizado',
    description:
      'Agente de IA que analisa mensagens e detecta conteúdo inadequado, spam ou violações de política automaticamente.',
    useCase:
      'Essencial para grupos grandes, comunidades e canais públicos que precisam de moderação automática.',
    howItWorks: [
      'Recebe mensagem via webhook',
      'IA analisa conteúdo e contexto',
      'Classifica como apropriado/inadequado',
      'Aplica ação (apagar, avisar, banir)',
      'Registra incidente para revisão',
    ],
    benefits: [
      'Moderação 24/7',
      'Resposta instantânea',
      'Consistência nas decisões',
      'Reduz carga de moderadores',
      'Aprende padrões de spam',
    ],
    tools: [
      'OpenAI Moderation API',
      'Perspective API (Google)',
      'Z-API para ações',
      'Banco de dados para histórico',
    ],
    icon: Shield,
    complexity: 'intermediate',
  },
  {
    id: 'tradutor-automatico',
    title: 'Tradutor Automático Inteligente',
    description:
      'Agente que traduz mensagens automaticamente mantendo contexto e tom, ideal para comunicação internacional.',
    useCase:
      'Perfeito para empresas globais, suporte multilíngue e comunicação com clientes internacionais.',
    howItWorks: [
      'Detecta idioma da mensagem',
      'Traduz mantendo contexto',
      'Ajusta tom e formalidade',
      'Envia tradução ao destinatário',
      'Aprende preferências do usuário',
    ],
    benefits: [
      'Comunicação sem barreiras',
      'Tradução contextual',
      'Suporte multilíngue',
      'Melhora experiência global',
      'Reduz necessidade de tradutores',
    ],
    tools: [
      'Google Translate API',
      'DeepL API',
      'GPT-4 para contexto',
      'Z-API para envio',
    ],
    icon: Globe,
    complexity: 'beginner',
  },
  {
    id: 'analisador-sentimento',
    title: 'Analisador de Sentimento',
    description:
      'Agente que analisa sentimento das mensagens e aciona ações baseadas no humor do cliente (positivo, neutro, negativo).',
    useCase:
      'Ideal para medir satisfação do cliente, detectar problemas rapidamente e melhorar experiência.',
    howItWorks: [
      'Recebe mensagem do cliente',
      'IA analisa sentimento e emoção',
      'Classifica como positivo/neutro/negativo',
      'Aciona ação apropriada',
      'Escala para humano se necessário',
      'Gera relatório de satisfação',
    ],
    benefits: [
      'Detecta problemas rapidamente',
      'Melhora satisfação do cliente',
      'Dados para análise',
      'Prioriza atendimento urgente',
      'Identifica tendências',
    ],
    tools: [
      'Sentiment Analysis APIs',
      'GPT-4 para análise profunda',
      'Z-API para ações',
      'Dashboard para visualização',
    ],
    icon: Sparkles,
    complexity: 'intermediate',
  },
  {
    id: 'agente-resumo',
    title: 'Agente de Resumo e Insights',
    description:
      'Agente que resume conversas longas, extrai informações importantes e gera insights para equipes.',
    useCase:
      'Perfeito para equipes que precisam acompanhar múltiplas conversas, extrair dados e gerar relatórios.',
    howItWorks: [
      'Coleta todas as mensagens da conversa',
      'IA identifica pontos principais',
      'Extrai informações estruturadas',
      'Gera resumo executivo',
      'Cria insights e recomendações',
      'Envia para equipe ou CRM',
    ],
    benefits: [
      'Economiza tempo de leitura',
      'Insights acionáveis',
      'Dados estruturados',
      'Melhora tomada de decisão',
      'Automatiza relatórios',
    ],
    tools: [
      'GPT-4 para resumo',
      'Z-API para coletar mensagens',
      'CRM integration',
      'Dashboard para visualização',
    ],
    icon: FileText,
    complexity: 'advanced',
  },
];

/**
 * Props do componente AIAgentCard
 */
type AIAgentCardProps = {
  agent: AIAgentExample;
  theme?: Theme;
};

/**
 * Componente AIAgentCard - Card de exemplo de agente de IA
 * 
 * Designed by AI Agents Specialist + UI/UX
 */
const AIAgentCard = memo(function AIAgentCard({
  agent,
  theme = 'official',
}: AIAgentCardProps): ReactNode {
  const [ripples, handleRippleClick] = useRippleEffect({});
  const variants = createAccessibleVariants(hoverElevationVariants);

  const complexityLabels: Record<AIAgentExample['complexity'], string> = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
  };

  const complexityColors: Record<AIAgentExample['complexity'], string> = {
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
      {agent.link ? (
        <Link
          to={agent.link}
          className={clsx(styles.card, styles[theme])}
          data-theme={theme}
          onClick={handleRippleClick}
          aria-label={`${agent.title} - ${agent.description}`}>
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
                  icon={agent.icon}
                  size={CARD_ICON_SIZE}
                  animation="hover"
                />
              </div>
              <span
                className={styles.complexity}
                style={{ color: complexityColors[agent.complexity] }}>
                {complexityLabels[agent.complexity]}
              </span>
            </div>
            <h3 className={styles.cardTitle}>{agent.title}</h3>
            <p className={styles.cardDescription}>{agent.description}</p>
            <div className={styles.cardUseCase}>
              <strong>Quando usar:</strong> {agent.useCase}
            </div>
            <div className={styles.cardHowItWorks}>
              <strong>Como funciona:</strong>
              <ol>
                {agent.howItWorks.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            <div className={styles.cardBenefits}>
              <strong>Benefícios:</strong>
              <ul>
                {agent.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className={styles.cardTools}>
              <strong>Ferramentas necessárias:</strong>
              <div className={styles.toolsList}>
                {agent.tools.map((tool, index) => (
                  <span key={index} className={styles.toolTag}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            {agent.link && (
              <span className={styles.cardLink}>
                <strong className="text--success">Ver como fazer →</strong>
              </span>
            )}
          </div>
        </Link>
      ) : (
        <div
          className={clsx(styles.card, styles[theme])}
          data-theme={theme}
          onClick={handleRippleClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleRippleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Card interativo - Clique para ver detalhes">
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
                  icon={agent.icon}
                  size={CARD_ICON_SIZE}
                  animation="hover"
                />
              </div>
              <span
                className={styles.complexity}
                style={{ color: complexityColors[agent.complexity] }}>
                {complexityLabels[agent.complexity]}
              </span>
            </div>
            <h3 className={styles.cardTitle}>{agent.title}</h3>
            <p className={styles.cardDescription}>{agent.description}</p>
            <div className={styles.cardUseCase}>
              <strong>Quando usar:</strong> {agent.useCase}
            </div>
            <div className={styles.cardHowItWorks}>
              <strong>Como funciona:</strong>
              <ol>
                {agent.howItWorks.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            <div className={styles.cardBenefits}>
              <strong>Benefícios:</strong>
              <ul>
                {agent.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className={styles.cardTools}>
              <strong>Ferramentas necessárias:</strong>
              <div className={styles.toolsList}>
                {agent.tools.map((tool, index) => (
                  <span key={index} className={styles.toolTag}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
});

/**
 * Props do componente AIAgentsSection
 */
type AIAgentsSectionProps = {
  /** Tema do design system (padrão: 'official') */
  theme?: Theme;
};

/**
 * Componente AIAgentsSection - Seção sobre agentes de IA para automações.
 * 
 * Curated by AI Agents Specialist
 * Based on AGENTS.MD knowledge base
 * 
 * Exibe exemplos práticos de como usar agentes de IA para criar automações
 * inteligentes no WhatsApp sem escrever código.
 * 
 * @param props - Props do componente AIAgentsSection
 * @param props.theme - Tema do design system (padrão: 'official')
 * @returns Componente React da seção de agentes de IA
 */
export default function AIAgentsSection({
  theme = 'official',
}: AIAgentsSectionProps): ReactNode {
  const variants = createAccessibleVariants(fadeUpVariants);

  return (
    <section
      id="agentes-ia"
      className={clsx(styles.agents, styles[theme])}
      data-theme={theme}
      aria-label="Agentes de IA para automações">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}>
          <h2 className={styles.title}>Agentes de IA para Automações</h2>
          <p className={styles.subtitle}>
            Descubra como usar inteligência artificial para criar automações
            inteligentes que entendem contexto, aprendem e melhoram com o tempo.
            Tudo sem escrever código.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {AI_AGENT_EXAMPLES.map((agent, index) => (
            <motion.div
              key={agent.id}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}>
              <AIAgentCard agent={agent} theme={theme} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

