import AnimatedIcon from '@site/src/components/shared/Icon/AnimatedIcon';
import { useRippleEffect } from '@site/src/hooks/useRippleEffect';
import type { Theme } from '@site/src/types';
import { createAccessibleVariants, fadeUpVariants, hoverElevationVariants } from '@site/src/utils/animations';
import { CARD_ICON_SIZE } from '@site/src/utils/iconSizes';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
    CheckCircle2,
    ChevronDown,
    FileJson,
    Image,
    MessageSquare,
    QrCode,
    Settings,
    Shield,
    Webhook,
    Zap,
} from 'lucide-react';
import { memo, useState, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Tipo para passo do guia visual
 */
type GuideStep = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  details?: string[];
};

/**
 * Guias visuais passo a passo
 */
const VISUAL_GUIDES: {
  title: string;
  description: string;
  steps: GuideStep[];
}[] = [
  {
    title: 'Como Conectar sua Conta WhatsApp',
    description:
      'Passo a passo visual para conectar sua conta WhatsApp à Z-API sem precisar de código.',
    steps: [
      {
        id: 1,
        title: 'Criar Instância',
        description:
          'Acesse o painel Z-API e crie uma nova instância. É como criar uma conta separada do WhatsApp.',
        icon: Settings,
        details: [
          'Acesse developer.z-api.io',
          'Faça login ou crie uma conta',
          'Clique em "Criar Instância"',
          'Escolha um nome para sua instância',
        ],
      },
      {
        id: 2,
        title: 'Escanear QR Code',
        description:
          'Escaneie o QR Code com seu WhatsApp. É como fazer login no WhatsApp Web.',
        icon: QrCode,
        details: [
          'Abra o WhatsApp no celular',
          'Vá em Configurações > Aparelhos conectados',
          'Escaneie o QR Code exibido na tela',
          'Aguarde a conexão ser estabelecida',
        ],
      },
      {
        id: 3,
        title: 'Copiar Token',
        description:
          'Copie o token de acesso. É como uma senha que permite seu sistema usar a API.',
        icon: Shield,
        details: [
          'Na página da instância, encontre o campo "Token"',
          'Clique em "Copiar Token"',
          'Guarde em local seguro (você precisará depois)',
          'Nunca compartilhe seu token com outras pessoas',
        ],
      },
      {
        id: 4,
        title: 'Testar Conexão',
        description:
          'Envie uma mensagem de teste para verificar se tudo está funcionando.',
        icon: CheckCircle2,
        details: [
          'Use ferramentas como Postman ou cURL',
          'Faça uma requisição de teste',
          'Verifique se a mensagem foi enviada',
          'Confirme no WhatsApp que recebeu',
        ],
      },
    ],
  },
  {
    title: 'Como Configurar Webhooks',
    description:
      'Aprenda a configurar webhooks para receber notificações automáticas quando algo acontecer.',
    steps: [
      {
        id: 1,
        title: 'Preparar URL',
        description:
          'Você precisa de uma URL pública onde seu sistema receberá as notificações.',
        icon: Webhook,
        details: [
          'Use serviços como ngrok para criar URL pública',
          'Ou configure um servidor na internet',
          'A URL deve aceitar requisições POST',
          'Deve retornar status 200 quando receber dados',
        ],
      },
      {
        id: 2,
        title: 'Configurar no Painel',
        description:
          'No painel Z-API, configure a URL do webhook e escolha quais eventos deseja receber.',
        icon: Settings,
        details: [
          'Acesse a página da instância',
          'Vá em "Webhooks"',
          'Cole a URL pública',
          'Selecione os eventos (mensagens, status, etc.)',
        ],
      },
      {
        id: 3,
        title: 'Validar Token',
        description:
          'Configure validação de token para garantir segurança. É como uma senha extra.',
        icon: Shield,
        details: [
          'Escolha um token secreto',
          'Configure no painel Z-API',
          'Valide o token em seu sistema',
          'Rejeite requisições sem token válido',
        ],
      },
      {
        id: 4,
        title: 'Testar Webhook',
        description:
          'Envie uma mensagem de teste e verifique se seu sistema recebeu a notificação.',
        icon: CheckCircle2,
        details: [
          'Envie uma mensagem para o número conectado',
          'Verifique logs do seu sistema',
          'Confirme que recebeu os dados',
          'Valide que o formato está correto',
        ],
      },
    ],
  },
  {
    title: 'Como Enviar Mensagens',
    description:
      'Guia visual para enviar diferentes tipos de mensagens via API sem escrever código.',
    steps: [
      {
        id: 1,
        title: 'Escolher Tipo de Mensagem',
        description:
          'Decida qual tipo de mensagem enviar: texto, imagem, áudio, vídeo, etc.',
        icon: MessageSquare,
        details: [
          'Texto simples: para mensagens curtas',
          'Imagem: para fotos e imagens',
          'Áudio: para mensagens de voz',
          'Vídeo: para vídeos curtos',
          'Documento: para PDFs e arquivos',
        ],
      },
      {
        id: 2,
        title: 'Preparar Dados',
        description:
          'Organize as informações necessárias: número do destinatário, conteúdo, etc.',
        icon: Settings,
        details: [
          'Número do destinatário (formato: 5511999999999)',
          'Conteúdo da mensagem',
          'Token de acesso',
          'ID da instância',
        ],
      },
      {
        id: 3,
        title: 'Fazer Requisição',
        description:
          'Use ferramentas visuais como Postman ou Zapier para fazer a requisição.',
        icon: Webhook,
        details: [
          'Abra Postman ou ferramenta similar',
          'Configure método POST',
          'Cole a URL do endpoint',
          'Adicione headers (token)',
          'Adicione body (dados da mensagem)',
        ],
      },
      {
        id: 4,
        title: 'Verificar Resultado',
        description:
          'Confirme que a mensagem foi enviada e apareceu no WhatsApp.',
        icon: CheckCircle2,
        details: [
          'Verifique resposta da API (status 200)',
          'Confirme no WhatsApp do destinatário',
          'Verifique logs em caso de erro',
          'Ajuste conforme necessário',
        ],
      },
    ],
  },
  {
    title: 'Como Criar Automação com Zapier',
    description:
      'Guia completo para criar sua primeira automação usando Zapier sem escrever código.',
    steps: [
      {
        id: 1,
        title: 'Criar Conta Zapier',
        description:
          'Crie uma conta gratuita no Zapier. O plano gratuito permite criar automações básicas.',
        icon: Settings,
        details: [
          'Acesse zapier.com',
          'Clique em "Sign Up"',
          'Crie conta com email ou Google',
          'Confirme seu email',
        ],
      },
      {
        id: 2,
        title: 'Criar Novo Zap',
        description:
          'Um Zap é uma automação que conecta dois ou mais serviços. Vamos criar um Zap simples.',
        icon: Zap,
        details: [
          'Clique em "Create Zap"',
          'Escolha um nome para seu Zap',
          'Defina o trigger (gatilho)',
          'Escolha a ação a ser executada',
        ],
      },
      {
        id: 3,
        title: 'Configurar Trigger',
        description:
          'O trigger é o evento que inicia sua automação. Ex: receber mensagem WhatsApp.',
        icon: Webhook,
        details: [
          'Escolha "Webhooks by Zapier"',
          'Selecione "Catch Hook"',
          'Copie a URL do webhook',
          'Configure no painel Z-API',
        ],
      },
      {
        id: 4,
        title: 'Configurar Ação',
        description:
          'A ação é o que acontece quando o trigger é acionado. Ex: enviar mensagem WhatsApp.',
        icon: MessageSquare,
        details: [
          'Escolha "Z-API" como ação',
          'Configure mensagem a enviar',
          'Mapeie dados do trigger',
          'Teste sua automação',
        ],
      },
    ],
  },
  {
    title: 'Como Enviar Mensagem com Imagem',
    description:
      'Aprenda a enviar mensagens com imagens usando ferramentas no-code.',
    steps: [
      {
        id: 1,
        title: 'Preparar Imagem',
        description:
          'Tenha a imagem pronta e hospedada em um servidor público ou URL acessível.',
        icon: Image,
        details: [
          'Use imagens em formato JPG ou PNG',
          'Tamanho máximo recomendado: 5MB',
          'Hospede em serviço como Imgur ou seu servidor',
          'Copie a URL da imagem',
        ],
      },
      {
        id: 2,
        title: 'Configurar Requisição',
        description:
          'Configure a requisição para enviar mensagem com imagem usando Postman ou ferramenta similar.',
        icon: Settings,
        details: [
          'Abra Postman',
          'Configure método POST',
          'Cole URL do endpoint send-image',
          'Adicione headers (token)',
        ],
      },
      {
        id: 3,
        title: 'Adicionar Dados',
        description:
          'Adicione os dados necessários: número do destinatário e URL da imagem.',
        icon: FileJson,
        details: [
          'Número no formato: 5511999999999',
          'URL da imagem (deve ser pública)',
          'Legenda opcional para a imagem',
          'Verifique formato JSON',
        ],
      },
      {
        id: 4,
        title: 'Enviar e Verificar',
        description:
          'Envie a requisição e verifique se a imagem foi entregue no WhatsApp.',
        icon: CheckCircle2,
        details: [
          'Clique em "Send" no Postman',
          'Verifique status 200 (sucesso)',
          'Confirme no WhatsApp do destinatário',
          'Ajuste se necessário',
        ],
      },
    ],
  },
];

/**
 * Props do componente VisualGuides
 */
type VisualGuidesProps = {
  /** Tema do design system (padrão: 'official') */
  theme?: Theme;
};

/**
 * Props do componente GuideCard
 */
type GuideCardProps = {
  guide: typeof VISUAL_GUIDES[0];
  isExpanded: boolean;
  onToggle: () => void;
  theme?: Theme;
};

/**
 * Componente GuideCard - Card expansível de guia visual
 */
const GuideCard = memo(function GuideCard({
  guide,
  isExpanded,
  onToggle,
  theme = 'official',
}: GuideCardProps): ReactNode {
  const [ripples, handleRippleClick] = useRippleEffect({});
  const variants = createAccessibleVariants(hoverElevationVariants);

  return (
    <motion.div
      variants={variants}
      initial="rest"
      whileHover="hover"
      className={styles.cardWrapper}>
      <button
        className={clsx(styles.guideCard, styles[theme])}
        data-theme={theme}
        data-expanded={isExpanded}
        onClick={(e) => {
          handleRippleClick(e);
          onToggle();
        }}
        aria-expanded={isExpanded}
        aria-controls={`guide-content-${guide.title}`}
        aria-label={`${isExpanded ? 'Recolher' : 'Expandir'} guia visual: ${guide.title}`}>
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
        <div className={styles.guideHeader}>
          <div className={styles.guideHeaderContent}>
            <h3 className={styles.guideTitle}>{guide.title}</h3>
            <p className={styles.guideDescription}>{guide.description}</p>
          </div>
          <ChevronDown
            className={clsx(styles.expandIcon, isExpanded && styles.expanded)}
            size={24}
            aria-hidden="true"
          />
        </div>
        <div
          id={`guide-content-${guide.title}`}
          className={styles.guideContent}
          data-expanded={isExpanded}>
          <div className={styles.steps}>
            {guide.steps.map((step) => (
              <div key={step.id} className={styles.step}>
                <div className={styles.stepNumber}>{step.id}</div>
                <div className={styles.stepContent}>
                  <div className={styles.stepHeader}>
                    <AnimatedIcon
                      icon={step.icon}
                      size={CARD_ICON_SIZE}
                      animation="hover"
                      className={styles.stepIcon}
                    />
                    <h4 className={styles.stepTitle}>{step.title}</h4>
                  </div>
                  <p className={styles.stepDescription}>
                    {step.description}
                  </p>
                  {step.details && step.details.length > 0 && (
                    <ul className={styles.stepDetails}>
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </button>
    </motion.div>
  );
});

/**
 * Componente VisualGuides - Guias visuais passo a passo.
 *
 * Exibe guias interativos com passos numerados e detalhes expandíveis.
 * Ideal para pessoas não técnicas que precisam seguir instruções visuais.
 * Cada guia funciona como um dropdown expansível/colapsável.
 *
 * @param props - Props do componente VisualGuides
 * @param props.theme - Tema do design system (padrão: 'official')
 * @returns Componente React dos guias visuais
 */
export default function VisualGuides({
  theme = 'official',
}: VisualGuidesProps): ReactNode {
  const [expandedGuides, setExpandedGuides] = useState<Set<string>>(new Set());

  const toggleGuide = (guideTitle: string) => {
    setExpandedGuides((prev) => {
      const next = new Set(prev);
      if (next.has(guideTitle)) {
        next.delete(guideTitle);
      } else {
        next.add(guideTitle);
      }
      return next;
    });
  };

  const variants = createAccessibleVariants(fadeUpVariants);

  return (
    <section
      id="guias"
      className={clsx(styles.guides, styles[theme])}
      data-theme={theme}
      aria-label="Guias visuais passo a passo">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}>
          <h2 className={styles.title}>Guias Visuais Passo a Passo</h2>
          <p className={styles.subtitle}>
            Aprenda a fazer automações seguindo instruções visuais simples,
            sem precisar escrever código. Clique em cada guia para ver os passos detalhados.
          </p>
        </motion.div>

        <div className={styles.guidesList}>
          {VISUAL_GUIDES.map((guide, guideIndex) => (
            <motion.div
              key={guide.title}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: guideIndex * 0.1 }}>
              <GuideCard
                guide={guide}
                isExpanded={expandedGuides.has(guide.title)}
                onToggle={() => toggleGuide(guide.title)}
                theme={theme}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

