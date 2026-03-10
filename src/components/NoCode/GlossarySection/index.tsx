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
  ChevronDown,
  Code,
  Database,
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  MessageSquare,
  Network,
  Puzzle,
  QrCode,
  Search,
  Server,
  Shield,
  Terminal,
  Webhook,
  Zap
} from 'lucide-react';
import { memo, useState, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Tipo para termo do glossário
 */
type GlossaryTerm = {
  id: string;
  term: string;
  simpleExplanation: string;
  technicalExplanation?: string;
  example?: string;
  icon: LucideIcon;
  category: 'conceitos' | 'tecnologia' | 'seguranca' | 'integracao';
};

/**
 * Termos do glossário explicados de forma simples
 */
const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'api',
    term: 'API',
    simpleExplanation:
      'É como um garçom em um restaurante: você faz um pedido (solicitação), ele leva para a cozinha (servidor) e traz sua comida (resposta). A API é a ponte que conecta diferentes sistemas.',
    technicalExplanation:
      'Application Programming Interface - Interface de Programação de Aplicações. Conjunto de protocolos e ferramentas para comunicação entre sistemas.',
    example: 'Quando você usa WhatsApp Web, está usando a API do WhatsApp.',
    icon: Code,
    category: 'conceitos',
  },
  {
    id: 'webhook',
    term: 'Webhook',
    simpleExplanation:
      'É como um sistema de entrega de notificações. Quando algo acontece (ex: você recebe uma mensagem), o sistema avisa automaticamente seu aplicativo, sem você precisar ficar perguntando.',
    technicalExplanation:
      'Mecanismo de callback HTTP que permite comunicação em tempo real entre sistemas. O servidor envia dados para uma URL configurada quando um evento ocorre.',
    example:
      'Quando alguém envia mensagem no WhatsApp, o webhook avisa seu sistema automaticamente.',
    icon: Webhook,
    category: 'integracao',
  },
  {
    id: 'token',
    term: 'Token',
    simpleExplanation:
      'É como uma chave de acesso. Você usa essa chave para provar que tem permissão para usar o serviço, sem precisar informar sua senha toda vez.',
    technicalExplanation:
      'String de caracteres que serve como credencial de autenticação. Substitui senhas em requisições HTTP.',
    example:
      'Como uma chave de hotel: você mostra a chave (token) e entra no quarto (acessa o serviço).',
    icon: Shield,
    category: 'seguranca',
  },
  {
    id: 'endpoint',
    term: 'Endpoint',
    simpleExplanation:
      'É como um endereço específico em um site. Cada endpoint faz uma coisa diferente: um envia mensagens, outro recebe mensagens, outro lista contatos.',
    technicalExplanation:
      'URL específica de uma API que representa um recurso ou ação. Cada endpoint tem um método HTTP (GET, POST, PUT, DELETE).',
    example:
      'https://api.z-api.io/instances/{id}/send-text é o endpoint para enviar mensagens.',
    icon: Globe,
    category: 'tecnologia',
  },
  {
    id: 'instancia',
    term: 'Instância',
    simpleExplanation:
      'É como uma conta separada do WhatsApp. Cada instância é independente e pode ter seu próprio número e configurações.',
    technicalExplanation:
      'Configuração isolada de uma aplicação que permite múltiplas execuções independentes do mesmo sistema.',
    example:
      'Você pode ter uma instância para atendimento e outra para marketing, cada uma com seu número.',
    icon: Server,
    category: 'conceitos',
  },
  {
    id: 'mensagem',
    term: 'Mensagem',
    simpleExplanation:
      'É qualquer comunicação enviada pelo WhatsApp: texto, imagem, áudio, vídeo, documento, localização, etc.',
    technicalExplanation:
      'Objeto de dados que representa uma comunicação no WhatsApp, contendo conteúdo, destinatário, tipo e metadados.',
    example: 'Um texto "Olá!" ou uma foto são exemplos de mensagens.',
    icon: MessageSquare,
    category: 'conceitos',
  },
  {
    id: 'banco-dados',
    term: 'Banco de Dados',
    simpleExplanation:
      'É como uma planilha gigante e organizada onde você guarda informações. Pode armazenar contatos, mensagens, histórico, etc.',
    technicalExplanation:
      'Sistema de armazenamento estruturado que organiza dados em tabelas relacionadas, permitindo consultas e manipulação eficiente.',
    example:
      'Como uma agenda telefônica digital que guarda todos os contatos e conversas.',
    icon: Database,
    category: 'tecnologia',
  },
  {
    id: 'integracao',
    term: 'Integração',
    simpleExplanation:
      'É conectar diferentes sistemas para trabalharem juntos. Como conectar WhatsApp com seu sistema de vendas ou CRM.',
    technicalExplanation:
      'Processo de conectar sistemas distintos para compartilhar dados e funcionalidades, criando um fluxo de trabalho unificado.',
    example:
      'Conectar WhatsApp com seu sistema de vendas para receber pedidos automaticamente.',
    icon: Webhook,
    category: 'integracao',
  },
  {
    id: 'json',
    term: 'JSON',
    simpleExplanation:
      'É como um formato de texto organizado que computadores entendem facilmente. Parece com uma lista ou formulário estruturado.',
    technicalExplanation:
      'JavaScript Object Notation - Formato de dados leve e legível usado para trocar informações entre sistemas. Baseado em pares chave-valor.',
    example:
      'Como uma receita de bolo escrita de forma organizada: {"nome": "Bolo", "ingredientes": ["farinha", "açúcar"]}.',
    icon: FileJson,
    category: 'tecnologia',
  },
  {
    id: 'http',
    term: 'HTTP',
    simpleExplanation:
      'É o "idioma" que os computadores usam para conversar na internet. Define como pedir e receber informações.',
    technicalExplanation:
      'HyperText Transfer Protocol - Protocolo de comunicação usado para transferir dados na web. Define métodos como GET (buscar) e POST (enviar).',
    example:
      'Quando você acessa um site, seu navegador usa HTTP para pedir as páginas ao servidor.',
    icon: Network,
    category: 'tecnologia',
  },
  {
    id: 'rest',
    term: 'REST',
    simpleExplanation:
      'É uma forma padronizada de criar APIs. Define regras claras de como pedir e receber informações.',
    technicalExplanation:
      'Representational State Transfer - Arquitetura de API que usa métodos HTTP padrão (GET, POST, PUT, DELETE) e URLs para recursos.',
    example:
      'A Z-API segue padrões REST: GET para buscar informações, POST para criar/enviar, DELETE para remover.',
    icon: Code,
    category: 'tecnologia',
  },
  {
    id: 'curl',
    term: 'cURL',
    simpleExplanation:
      'É uma ferramenta de linha de comando para testar APIs. Como usar o terminal para fazer requisições HTTP.',
    technicalExplanation:
      'Client URL - Ferramenta de linha de comando para transferir dados usando vários protocolos, principalmente HTTP/HTTPS.',
    example:
      'Você pode usar cURL no terminal para enviar uma mensagem via Z-API sem precisar de interface gráfica.',
    icon: Terminal,
    category: 'tecnologia',
  },
  {
    id: 'postman',
    term: 'Postman',
    simpleExplanation:
      'É uma ferramenta visual para testar APIs. Você pode criar requisições, ver respostas e organizar tudo de forma visual.',
    technicalExplanation:
      'Ferramenta de desenvolvimento de API que permite criar, testar e documentar requisições HTTP através de interface gráfica.',
    example:
      'Use Postman para testar se sua integração com Z-API está funcionando antes de colocar no seu sistema.',
    icon: HelpCircle,
    category: 'tecnologia',
  },
  {
    id: 'rate-limit',
    term: 'Rate Limit',
    simpleExplanation:
      'É um limite de quantas requisições você pode fazer por minuto ou hora. Como um limite de velocidade para evitar abuso do sistema.',
    technicalExplanation:
      'Mecanismo de controle de tráfego que limita o número de requisições que um cliente pode fazer em um período de tempo específico.',
    example:
      'A Z-API pode limitar a 100 mensagens por minuto. Se você exceder, precisa esperar antes de enviar mais.',
    icon: Shield,
    category: 'tecnologia',
  },
  {
    id: 'status-code',
    term: 'Status Code',
    simpleExplanation:
      'É um número que indica se sua requisição foi bem-sucedida ou teve algum problema. Como um código de erro ou sucesso.',
    technicalExplanation:
      'Código numérico de 3 dígitos retornado pelo servidor HTTP indicando o resultado de uma requisição. Exemplos: 200 (sucesso), 400 (erro), 404 (não encontrado).',
    example:
      '200 significa "tudo certo", 401 significa "não autorizado", 500 significa "erro no servidor".',
    icon: Code,
    category: 'tecnologia',
  },
  {
    id: 'payload',
    term: 'Payload',
    simpleExplanation:
      'É os dados que você envia junto com sua requisição. Como o conteúdo de uma carta que você manda pelo correio.',
    technicalExplanation:
      'Dados enviados no corpo de uma requisição HTTP, geralmente em formato JSON. Contém as informações necessárias para executar a ação solicitada.',
    example:
      'Ao enviar mensagem, o payload contém o número do destinatário e o texto da mensagem.',
    icon: FileJson,
    category: 'tecnologia',
  },
  {
    id: 'header',
    term: 'Header',
    simpleExplanation:
      'São informações extras que você envia junto com sua requisição, como seu token de autenticação ou tipo de conteúdo.',
    technicalExplanation:
      'Metadados HTTP enviados junto com requisições e respostas. Contêm informações sobre autenticação, tipo de conteúdo, codificação, etc.',
    example:
      'O header "Client-Token" contém seu token de acesso, e "Content-Type" indica que você está enviando JSON.',
    icon: Network,
    category: 'tecnologia',
  },
  {
    id: 'autenticacao',
    term: 'Autenticação',
    simpleExplanation:
      'É o processo de provar quem você é. Como mostrar um documento de identidade para acessar um lugar.',
    technicalExplanation:
      'Processo de verificar a identidade de um usuário ou sistema. Geralmente usa credenciais como tokens, chaves de API ou senhas.',
    example:
      'Quando você envia seu token na requisição, está se autenticando e provando que tem permissão para usar a API.',
    icon: Shield,
    category: 'seguranca',
  },
  {
    id: 'autorizacao',
    term: 'Autorização',
    simpleExplanation:
      'É verificar se você tem permissão para fazer algo específico. Como verificar se você pode entrar em uma sala.',
    technicalExplanation:
      'Processo de verificar se um usuário autenticado tem permissão para executar uma ação específica ou acessar um recurso.',
    example:
      'Você pode estar autenticado, mas pode não ter autorização para deletar mensagens de outras pessoas.',
    icon: Shield,
    category: 'seguranca',
  },
  {
    id: 'https',
    term: 'HTTPS',
    simpleExplanation:
      'É a versão segura do HTTP. Como enviar uma carta em um envelope lacrado em vez de um envelope aberto.',
    technicalExplanation:
      'HyperText Transfer Protocol Secure - Versão criptografada do HTTP que usa SSL/TLS para proteger dados em trânsito.',
    example:
      'Quando você acessa um site com HTTPS, seus dados são criptografados e protegidos durante a transmissão.',
    icon: Shield,
    category: 'seguranca',
  },
  {
    id: 'zapier',
    term: 'Zapier',
    simpleExplanation:
      'É uma ferramenta que conecta diferentes serviços e cria automações sem código. Como um assistente que conecta suas ferramentas favoritas.',
    technicalExplanation:
      'Plataforma de automação que permite conectar diferentes aplicações através de "Zaps" (automações) sem escrever código.',
    example:
      'Você pode criar um Zap que envia mensagem WhatsApp automaticamente quando recebe um email.',
    icon: Zap,
    category: 'integracao',
  },
  {
    id: 'make',
    term: 'Make (Integromat)',
    simpleExplanation:
      'É uma ferramenta avançada de automação visual, similar ao Zapier mas com mais controle e flexibilidade.',
    technicalExplanation:
      'Plataforma de automação visual que permite criar fluxos complexos com manipulação de dados, loops e tratamento de erros.',
    example:
      'Use Make para criar automações que processam dados, fazem cálculos e tomam decisões baseadas em condições.',
    icon: Layers,
    category: 'integracao',
  },
  {
    id: 'n8n',
    term: 'n8n',
    simpleExplanation:
      'É uma ferramenta de automação open source que você pode hospedar você mesmo. Máxima flexibilidade e controle.',
    technicalExplanation:
      'Ferramenta de automação de workflow open source que permite criar automações complexas com controle total sobre dados e infraestrutura.',
    example:
      'Use n8n se você quer controle total e não se importa em hospedar a ferramenta você mesmo.',
    icon: Puzzle,
    category: 'integracao',
  },
  {
    id: 'qr-code',
    term: 'QR Code',
    simpleExplanation:
      'É um código de barras quadrado que você escaneia com a câmera do celular. Usado para conectar WhatsApp à Z-API.',
    technicalExplanation:
      'Quick Response Code - Código de barras bidimensional que armazena informações e pode ser lido por câmeras de dispositivos móveis.',
    example:
      'Quando você conecta seu WhatsApp à Z-API, precisa escanear um QR Code exibido na tela.',
    icon: QrCode,
    category: 'conceitos',
  },
  {
    id: 'evento',
    term: 'Evento',
    simpleExplanation:
      'É algo que acontece no sistema, como receber uma mensagem ou alguém entrar em um grupo. Webhooks notificam sobre eventos.',
    technicalExplanation:
      'Ocorrência de uma ação ou mudança de estado no sistema que pode ser capturada e processada por webhooks ou listeners.',
    example:
      'Quando alguém envia mensagem, isso é um evento. O webhook notifica seu sistema sobre esse evento.',
    icon: Bell,
    category: 'conceitos',
  },
];

/**
 * Props do componente GlossaryCard
 */
type GlossaryCardProps = {
  term: GlossaryTerm;
  isExpanded: boolean;
  onToggle: () => void;
  theme?: Theme;
};

/**
 * Componente GlossaryCard - Card de termo do glossário
 */
const GlossaryCard = memo(function GlossaryCard({
  term,
  isExpanded,
  onToggle,
  theme = 'official',
}: GlossaryCardProps): ReactNode {
  const [ripples, handleRippleClick] = useRippleEffect({});
  const variants = createAccessibleVariants(hoverElevationVariants);

  return (
    <motion.div
      variants={variants}
      initial="rest"
      whileHover="hover"
      className={styles.cardWrapper}>
      <button
        className={clsx(styles.card, styles[theme])}
        data-theme={theme}
        data-expanded={isExpanded}
        onClick={(e) => {
          handleRippleClick(e);
          onToggle();
        }}
        aria-expanded={isExpanded}
        aria-controls={`glossary-term-${term.id}`}
        aria-label={`${isExpanded ? 'Recolher' : 'Expandir'} explicação do termo ${term.term}`}>
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
        <div className={styles.cardHeader}>
          <div className={styles.cardIcon}>
            <AnimatedIcon
              icon={term.icon}
              size={CARD_ICON_SIZE}
              animation="hover"
            />
          </div>
          <h3 className={styles.cardTerm}>{term.term}</h3>
          <ChevronDown
            className={clsx(styles.expandIcon, isExpanded && styles.expanded)}
            size={20}
            aria-hidden="true"
          />
        </div>
        <div
          id={`glossary-term-${term.id}`}
          className={styles.cardContent}
          data-expanded={isExpanded}>
          <p className={styles.simpleExplanation}>
            {term.simpleExplanation}
          </p>
          {isExpanded && term.technicalExplanation && (
            <div className={styles.technicalSection}>
              <h4 className={styles.technicalTitle}>Explicação Técnica</h4>
              <p className={styles.technicalExplanation}>
                {term.technicalExplanation}
              </p>
            </div>
          )}
          {isExpanded && term.example && (
            <div className={styles.exampleSection}>
              <h4 className={styles.exampleTitle}>Exemplo Prático</h4>
              <p className={styles.example}>{term.example}</p>
            </div>
          )}
        </div>
      </button>
    </motion.div>
  );
});

/**
 * Props do componente GlossarySection
 */
type GlossarySectionProps = {
  /** Tema do design system (padrão: 'official') */
  theme?: Theme;
};

/**
 * Componente GlossarySection - Seção de glossário interativo.
 *
 * Exibe termos técnicos explicados de forma simples para pessoas não técnicas.
 * Cards expansíveis com explicações simples, técnicas e exemplos.
 *
 * @param props - Props do componente GlossarySection
 * @param props.theme - Tema do design system (padrão: 'official')
 * @returns Componente React da seção de glossário
 */
export default function GlossarySection({
  theme = 'official',
}: GlossarySectionProps): ReactNode {
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    GlossaryTerm['category'] | 'todos'
  >('todos');

  const toggleTerm = (termId: string) => {
    setExpandedTerms((prev) => {
      const next = new Set(prev);
      if (next.has(termId)) {
        next.delete(termId);
      } else {
        next.add(termId);
      }
      return next;
    });
  };

  // Filtrar termos por busca e categoria
  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const matchesSearch =
      searchQuery === '' ||
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.simpleExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'todos' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Obter categorias únicas
  const categories: Array<GlossaryTerm['category'] | 'todos'> = [
    'todos',
    'conceitos',
    'tecnologia',
    'seguranca',
    'integracao',
  ];

  const categoryLabels: Record<
    GlossaryTerm['category'] | 'todos',
    string
  > = {
    todos: 'Todos',
    conceitos: 'Conceitos',
    tecnologia: 'Tecnologia',
    seguranca: 'Segurança',
    integracao: 'Integração',
  };

  return (
    <section
      id="glossario"
      className={clsx(styles.glossary, styles[theme])}
      data-theme={theme}
      aria-label="Glossário de termos técnicos">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Glossário de Termos Técnicos</h2>
          <p className={styles.subtitle}>
            Conceitos explicados de forma simples para você entender automações
            sem precisar ser programador
          </p>
        </div>

        {/* Busca e Filtros */}
        <div className={styles.filters} role="search" aria-label="Filtros do glossário">
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={20} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Buscar termo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar termo no glossário"
              aria-describedby="glossary-search-description"
            />
            <span id="glossary-search-description" className="sr-only">
              Digite para buscar termos no glossário. Os resultados serão filtrados automaticamente.
            </span>
          </div>
          <div className={styles.categoryFilters}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={clsx(
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                )}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                aria-label={`Filtrar por categoria: ${categoryLabels[category]}`}>
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>

        {/* Resultados */}
        {filteredTerms.length === 0 ? (
          <div className={styles.noResults}>
            <p>Nenhum termo encontrado. Tente buscar com outras palavras.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredTerms.map((term) => (
              <GlossaryCard
                key={term.id}
                term={term}
                isExpanded={expandedTerms.has(term.id)}
                onToggle={() => toggleTerm(term.id)}
                theme={theme}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

