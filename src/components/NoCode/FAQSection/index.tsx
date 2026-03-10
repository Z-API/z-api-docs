import AnimatedIcon from '@site/src/components/shared/Icon/AnimatedIcon';
import type { Theme } from '@site/src/types';
import { createAccessibleVariants, fadeUpVariants } from '@site/src/utils/animations';
import { CARD_ICON_SIZE } from '@site/src/utils/iconSizes';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Tipo para pergunta do FAQ
 */
type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

/**
 * Perguntas frequentes sobre No Code
 */
const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'preciso-programacao',
    question: 'Preciso saber programação para usar a Z-API?',
    answer:
      'Não! Esta página foi criada especificamente para pessoas que não sabem programação. Você pode usar ferramentas visuais como Postman ou Zapier para criar automações sem escrever código. O glossário e os guias visuais explicam tudo de forma simples.',
  },
  {
    id: 'ferramentas-visuais',
    question: 'Quais ferramentas posso usar sem programação?',
    answer:
      'Você pode usar Postman (interface visual para testar APIs), Zapier (automações visuais), Make (anteriormente Integromat), n8n (open source), ou até mesmo planilhas do Google Sheets com scripts simples. Todas essas ferramentas permitem criar automações WhatsApp sem escrever código. Veja a seção "Ferramentas No-Code Recomendadas" para comparações detalhadas.',
  },
  {
    id: 'quanto-custa',
    question: 'Quanto custa usar a Z-API?',
    answer:
      'A Z-API oferece planos variados. Consulte o site oficial (developer.z-api.io) para ver os planos disponíveis. Muitas automações simples podem ser feitas com planos básicos. Além disso, muitas ferramentas no-code têm planos gratuitos ou freemium que permitem começar sem custo.',
  },
  {
    id: 'seguranca',
    question: 'É seguro usar a Z-API?',
    answer:
      'Sim! A Z-API usa tokens de autenticação seguros (como explicado no glossário) e criptografia HTTPS para proteger suas comunicações. Nunca compartilhe seu token com outras pessoas e sempre mantenha-o em local seguro. Use variáveis de ambiente ou gerenciadores de secrets para armazenar tokens em produção.',
  },
  {
    id: 'suporte',
    question: 'Onde posso obter ajuda se tiver dúvidas?',
    answer:
      'Você pode consultar a documentação completa em /docs, usar o glossário desta página para entender termos técnicos, seguir os guias visuais passo a passo, ou entrar em contato com o suporte da Z-API através do site oficial. A seção FAQ também responde muitas dúvidas comuns.',
  },
  {
    id: 'comecar',
    question: 'Por onde começo se nunca usei APIs?',
    answer:
      'Comece explorando o glossário para entender os termos técnicos. Depois, veja os exemplos práticos de automações e [casos de uso reais](/blog/casos-uso-automacoes-whatsapp) para ter ideias do que é possível fazer. Consulte também a [documentação completa](/docs) e os [tutoriais passo a passo](/blog/tutoriais-automacoes-whatsapp) para guias detalhados.',
  },
  {
    id: 'agentes-ia',
    question: 'Posso usar inteligência artificial nas minhas automações?',
    answer:
      'Sim! Você pode integrar agentes de IA como GPT-4, Claude ou Gemini para criar chatbots inteligentes, analisar sentimentos, traduzir mensagens e muito mais. Veja nossa [postagem sobre Agentes de IA](/blog/agentes-ia-automacoes-whatsapp) para exemplos práticos e passo a passo de como fazer.',
  },
  {
    id: 'webhooks',
    question: 'O que são webhooks e por que preciso deles?',
    answer:
      'Webhooks são como um sistema de entrega de notificações. Quando algo acontece (ex: você recebe uma mensagem), o sistema avisa automaticamente seu aplicativo, sem você precisar ficar perguntando. Eles são essenciais para criar automações reativas. Consulte a documentação em /docs/webhooks para aprender passo a passo.',
  },
  {
    id: 'escalabilidade',
    question: 'Minhas automações vão funcionar se eu tiver muitos clientes?',
    answer:
      'Sim! A Z-API foi projetada para escalar. Você pode enviar milhares de mensagens por dia. Ferramentas como Zapier e Make também suportam alto volume. Para automações muito grandes, considere usar n8n self-hosted ou contratar um desenvolvedor para criar uma solução customizada.',
  },
  {
    id: 'integracao-crm',
    question: 'Posso integrar com meu CRM ou sistema existente?',
    answer:
      'Sim! A maioria das ferramentas no-code (Zapier, Make, n8n) tem integrações prontas com CRMs populares como HubSpot, Salesforce, Pipedrive e muitos outros. Você pode sincronizar contatos, criar leads, atualizar oportunidades e muito mais automaticamente.',
  },
  {
    id: 'mensagens-multimidia',
    question: 'Posso enviar imagens, vídeos e documentos?',
    answer:
      'Sim! A Z-API suporta todos os tipos de mídia do WhatsApp: texto, imagens, vídeos, áudios, documentos, localização, contatos e até catálogos de produtos. Veja os exemplos práticos e guias visuais para aprender como enviar cada tipo de mensagem.',
  },
  {
    id: 'grupos-comunidades',
    question: 'Posso automatizar grupos e comunidades?',
    answer:
      'Sim! Você pode enviar mensagens para grupos, gerenciar membros, criar comunidades e muito mais. A Z-API suporta todas as funcionalidades de grupos do WhatsApp Business. Veja a documentação de grupos e comunidades para mais detalhes.',
  },
  {
    id: 'erros-comuns',
    question: 'Quais são os erros mais comuns e como evitá-los?',
    answer:
      'Os erros mais comuns são: token inválido ou expirado (sempre verifique se está correto), número em formato errado (use formato internacional: 5511999999999), rate limiting (não envie muitas mensagens muito rápido), e webhook não configurado corretamente. Sempre teste em ambiente de desenvolvimento antes de usar em produção.',
  },
  {
    id: 'backup-dados',
    question: 'Como faço backup dos meus dados e configurações?',
    answer:
      'Muitas ferramentas no-code permitem exportar suas automações como arquivos JSON. Sempre mantenha backups regulares. Para tokens e credenciais, use gerenciadores de secrets. Para histórico de mensagens, considere salvar em banco de dados ou planilhas. Nunca armazene dados sensíveis em código ou arquivos públicos.',
  },
  {
    id: 'compliance-lgpd',
    question: 'Preciso me preocupar com LGPD e privacidade?',
    answer:
      'Sim! Sempre obtenha consentimento antes de enviar mensagens, permita que pessoas se descadastrem facilmente, proteja dados pessoais e siga as políticas do WhatsApp Business. A Z-API oferece recursos para ajudar com compliance. Consulte a documentação de privacidade e segurança para mais detalhes.',
  },
];

/**
 * Props do componente FAQItem
 */
type FAQItemProps = {
  item: FAQItem;
  isExpanded: boolean;
  onToggle: () => void;
  theme?: Theme;
};

/**
 * Componente FAQItem - Item individual do FAQ
 */
function FAQItem({
  item,
  isExpanded,
  onToggle,
  theme = 'official',
}: FAQItemProps): ReactNode {
  const variants = createAccessibleVariants(fadeUpVariants);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={styles.faqItem}>
      <button
        className={clsx(styles.faqQuestion, styles[theme])}
        data-theme={theme}
        data-expanded={isExpanded}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`faq-answer-${item.id}`}
        aria-label={`${isExpanded ? 'Recolher' : 'Expandir'} resposta para: ${item.question}`}>
        <AnimatedIcon
          icon={HelpCircle}
          size={CARD_ICON_SIZE}
          animation="hover"
          className={styles.faqIcon}
        />
        <span className={styles.faqQuestionText}>{item.question}</span>
        <span
          className={clsx(styles.faqExpandIcon, isExpanded && styles.expanded)}
          aria-hidden="true">
          ▼
        </span>
      </button>
      <div
        id={`faq-answer-${item.id}`}
        className={styles.faqAnswer}
        data-expanded={isExpanded}>
        <p>{item.answer}</p>
      </div>
    </motion.div>
  );
}

/**
 * Props do componente FAQSection
 */
type FAQSectionProps = {
  /** Tema do design system (padrão: 'official') */
  theme?: Theme;
};

/**
 * Componente FAQSection - Seção de perguntas frequentes.
 *
 * Exibe perguntas frequentes sobre No Code com respostas expansíveis.
 * Ideal para resolver dúvidas comuns de pessoas não técnicas.
 *
 * @param props - Props do componente FAQSection
 * @param props.theme - Tema do design system (padrão: 'official')
 * @returns Componente React da seção FAQ
 */
export default function FAQSection({
  theme = 'official',
}: FAQSectionProps): ReactNode {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  return (
    <section
      id="faq"
      className={clsx(styles.faq, styles[theme])}
      data-theme={theme}
      aria-label="Perguntas frequentes">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Perguntas Frequentes</h2>
          <p className={styles.subtitle}>
            Dúvidas comuns sobre automações WhatsApp sem código respondidas de
            forma simples
          </p>
        </div>

        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isExpanded={expandedItems.has(item.id)}
              onToggle={() => toggleItem(item.id)}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

