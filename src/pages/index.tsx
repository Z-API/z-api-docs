import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HeroSection from "@site/src/components/HeroSection";
import {
  ProductCard,
  type ProductCardProps,
} from "@site/src/components/ProductCard";
import {
  ResourceCard,
  type ResourceCardProps,
} from "@site/src/components/ResourceCard";
import ErrorBoundary from "@site/src/components/shared/ErrorBoundary/index";
import SkipLinks from "@site/src/components/shared/SkipLinks/index";
import Layout from "@theme/Layout";
import {
  Cloud,
  Code2,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { lazy, Suspense } from "react";

import styles from "./index.module.css";

// HeroSection carregado imediatamente (above the fold - acima da dobra)
// Não deve usar lazy loading pois é o primeiro elemento visível
// É crítico para LCP (Largest Contentful Paint) - deve carregar o mais rápido possível

// Code Splitting & Lazy Loading Strategy:
// Componentes abaixo da dobra (below the fold) são carregados sob demanda
// Reduz bundle size inicial e melhora Core Web Vitals (FCP, LCP, TTI)
// Cada componente tem seu próprio chunk, carregado apenas quando necessário
// Implementa React.lazy + Suspense para code splitting automático
const HomepageFeatures = lazy(
  () => import("@site/src/components/HomepageFeatures")
);
const ExclusiveFeatures = lazy(
  () => import("@site/src/components/ExclusiveFeatures")
);
const UseCases = lazy(() => import("@site/src/components/UseCases"));
const DeveloperHub = lazy(() => import("@site/src/components/DeveloperHub"));
const LearningResources = lazy(
  () => import("@site/src/components/LearningResources")
);

const PRODUCT_CARDS: ProductCardProps[] = [
  {
    icon: MessageSquare,
    title: "Quick Start",
    description:
      "Guia oficial completo para autenticar sua conta, ler o QR Code corretamente e enviar a primeira mensagem com segurança e confiança. Inclui exemplos práticos e boas práticas.",
    link: "/docs/quick-start/introducao",
    linkLabel: "Abrir Quick Start",
  },
  {
    icon: Cloud,
    title: "Instâncias",
    description:
      "Controle total da sessão do WhatsApp: reinicie conexões, obtenha QR Code, atualize perfil e monitore o status em tempo real. Gerencie múltiplas instâncias com facilidade.",
    link: "/docs/instance/introducao",
    linkLabel: "Gerenciar instâncias",
  },
  {
    icon: Smartphone,
    title: "Mobile & Registro",
    description:
      "Fluxos completos para cadastrar PIN de segurança, confirmar códigos de verificação e manter seu número sempre disponível e conectado ao WhatsApp Web.",
    link: "/docs/mobile/introducao",
    linkLabel: "Configurar número",
  },
  {
    icon: Zap,
    title: "Webhooks",
    description:
      "Receba eventos de envio, recebimento, conexão e status da mensagem em tempo real. Configure webhooks personalizados para integrar com seus sistemas.",
    link: "/docs/webhooks/introducao",
    linkLabel: "Configurar webhooks",
  },
  {
    icon: Code2,
    title: "Messages",
    description:
      "Catálogo completo de tipos de mensagem: texto, mídia, botões interativos, listas, enquetes, cobranças e muito mais. Explore todas as possibilidades.",
    link: "/docs/messages/introducao",
    linkLabel: "Explorar mensagens",
  },
  {
    icon: ShieldCheck,
    title: "Status & Stories",
    description:
      "Publique imagens, vídeos e textos no status com monitoramento de leitura e respostas seguras. Gerencie seu conteúdo de forma profissional e eficiente.",
    link: "/docs/status/introducao",
    linkLabel: "Gerenciar status",
  },
];

/**
 * DEPRECATED: chunkArray não é mais necessário.
 * Products Section agora usa CSS Grid com auto-fit para layout flexível.
 * 
 * @deprecated Use CSS Grid com `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` ao invés de chunking manual
 */

const RESOURCE_CARDS: ResourceCardProps[] = [
  {
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    category: "Introdução oficial",
    title: "Z-API — Asas para sua imaginação",
    description:
      "Entenda o que é a Z-API, quem pode usar e por que ela foi criada para devs.",
    actionLabel: "Ver documentação",
    onAction: () => {
      window.location.href = "/docs/intro";
    },
  },
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    category: "Artigos do Blog",
    title: "O Que É Uma Instância?",
    description:
      "Entenda como seu WhatsApp vira um assistente digital através de analogias simples e práticas. Artigo didático para automatizadores.",
    actionLabel: "Ler artigo",
    onAction: () => {
      window.location.href = "/blog/o-que-e-uma-instancia-entenda-como-seu-whatsapp-vira-um-assistente-digital";
    },
  },
  {
    image:
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=900&q=80",
    category: "Artigos do Blog",
    title: "Mensagens no WhatsApp: Escolha o Formato Certo",
    description:
      "Aprenda quando usar cada tipo de mensagem e aumente seu engajamento. Guia prático com exemplos reais.",
    actionLabel: "Ler artigo",
    onAction: () => {
      window.location.href = "/blog/mensagens-whatsapp-escolha-formato-certo-aumente-engajamento";
    },
  },
  {
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    category: "Artigos do Blog",
    title: "Webhooks vs Polling: Por Que Esperar é Mais Eficiente",
    description:
      "Entenda a diferença entre webhooks e polling e por que webhooks são muito mais eficientes para automações em tempo real.",
    actionLabel: "Ler artigo",
    onAction: () => {
      window.location.href = "/blog/webhooks-vs-polling-por-que-esperar-e-mais-eficiente";
    },
  },
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    category: "Artigos do Blog",
    title: "Segurança no Z-API: Proteja Sua Automação",
    description:
      "Descubra como proteger sua automação no Z-API de forma simples e prática. Configure todas as proteções sem complicação técnica.",
    actionLabel: "Ler artigo",
    onAction: () => {
      window.location.href = "/blog/seguranca-zapi-proteja-automacao-como-porteiro";
    },
  },
  {
    image:
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=900&q=80",
    category: "Artigos do Blog",
    title: "Fila de Mensagens: Como Enviar Milhares Sem Travar",
    description:
      "Descubra como filas de mensagens funcionam e por que elas são essenciais para enviar milhares de mensagens sem travar seu sistema.",
    actionLabel: "Ler artigo",
    onAction: () => {
      window.location.href = "/blog/fila-mensagens-como-enviar-milhares-sem-travar";
    },
  },
];

/**
 * Componente de fallback para Suspense
 *
 * Fornece um placeholder com altura adequada para evitar layout shift
 * durante o carregamento lazy dos componentes.
 */
function ComponentFallback(): ReactNode {
  return (
    <div
      style={{
        minHeight: "70vh",
        backgroundColor: "var(--official-bg-hero-solid, #1A1D29)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="Carregando seção"
    />
  );
}

/**
 * Componente Home - Página principal da homepage.
 *
 * Renderiza todas as seções da homepage com lazy loading para componentes
 * abaixo da dobra, melhorando o tempo de carregamento inicial.
 *
 * Estrutura:
 * - HeroSection: Seção principal com CTAs
 * - HomepageFeatures: Benefícios da plataforma
 * - ExclusiveFeatures: Funcionalidades exclusivas
 * - Products Section: Produtos e ferramentas
 * - DeveloperHub: Central do desenvolvedor
 * - Resources Section: Conteúdo oficial
 * - UseCases: Casos de uso (foco técnico)
 * - LearningResources: Recursos de aprendizado
 *
 * @returns Componente React da homepage
 */
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <Head>
        <title>{`${siteConfig.title} - Documentação Completa da API Z-API`}</title>
        <meta
          name="description"
          content="Documentação completa da API Z-API - Interaja com WhatsApp através de uma API RESTful simples e intuitiva. Guias, exemplos e referência completa."
        />
        {/* Preload de recursos críticos para Core Web Vitals */}
        {/* Logo do navbar - crítico para LCP (Largest Contentful Paint) */}
        <link
          rel="preload"
          as="image"
          href={`${siteConfig.baseUrl}img/z-api-logo.webp`}
          type="image/webp"
          fetchPriority="high"
        />
        {/* DNS prefetch para recursos externos (Unsplash, etc.) */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </Head>
      <SkipLinks />
      <HeroSection theme="official" />
      <main id="main-content" tabIndex={-1}>
        <section data-theme="official" data-section="light">
          <ErrorBoundary>
            <Suspense fallback={<ComponentFallback />}>
              <HomepageFeatures theme="official" />
            </Suspense>
          </ErrorBoundary>
        </section>
        {/* Funcionalidades Exclusivas */}
        <section data-theme="official" data-section="light">
          <ErrorBoundary>
            <Suspense fallback={<ComponentFallback />}>
              <ExclusiveFeatures theme="official" />
            </Suspense>
          </ErrorBoundary>
        </section>
        <section
          className={styles.productsSection}
          data-theme="official"
          data-section="light"
        >
          <div className="container">
            <p className={styles.sectionEyebrow}>Produtos e ferramentas</p>
            <h2 className={styles.sectionTitle}>
              Automatize cada fluxo do WhatsApp&nbsp;Web com o&nbsp;Z-API
            </h2>
            <div className={styles.productsGrid}>
              {PRODUCT_CARDS.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </div>
          </div>
        </section>
        <section data-theme="official" data-section="light">
          <ErrorBoundary>
            <Suspense fallback={<ComponentFallback />}>
              <DeveloperHub theme="official" />
            </Suspense>
          </ErrorBoundary>
        </section>
        <section
          className={styles.resourcesSection}
          data-theme="official"
          data-section="light"
        >
          <div className="container">
            <p className={styles.sectionEyebrow}>Conteúdo oficial</p>
            <h2 className={styles.sectionTitle}>
              Documentação, blog e melhores práticas direto da Z-API
            </h2>
            <div className={styles.resourcesGrid}>
              {RESOURCE_CARDS.map((resource) => (
                <ResourceCard key={resource.title} {...resource} />
              ))}
            </div>
            <div className={styles.resourcesCta}>
              <Link to="/docs/intro" className={styles.secondaryButton}>
                Ver todos os recursos
              </Link>
            </div>
          </div>
        </section>
        {/* Casos de Uso */}
        <section data-theme="official" data-section="light">
          <ErrorBoundary>
            <Suspense fallback={<ComponentFallback />}>
              <UseCases theme="official" />
            </Suspense>
          </ErrorBoundary>
        </section>
        {/* Aprendizado com tema Official em seção clara */}
        <section
          data-theme="official"
          data-section="light"
          className={styles.learningSection}
        >
          <ErrorBoundary>
            <Suspense fallback={<ComponentFallback />}>
              <LearningResources theme="official" />
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>
    </Layout>
  );
}
