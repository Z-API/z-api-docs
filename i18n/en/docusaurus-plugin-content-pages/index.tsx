import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HeroSection from "./components/HeroSection";
import {
  ProductCard,
  type ProductCardProps,
} from "./components/ProductCard";
import {
  ResourceCard,
  type ResourceCardProps,
} from "./components/ResourceCard";
import ErrorBoundary from "./components/shared/ErrorBoundary/index";
import SkipLinks from "./components/shared/SkipLinks/index";
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

// HeroSection loaded immediately (above the fold)
// Should not use lazy loading as it's the first visible element
// Critical for LCP (Largest Contentful Paint) – must load as fast as possible

// Code Splitting & Lazy Loading Strategy:
// Below-the-fold components are loaded on demand
// Reduces initial bundle size and improves Core Web Vitals (FCP, LCP, TTI)
// Each component has its own chunk, loaded only when needed
// Implements React.lazy + Suspense for automatic code splitting
const HomepageFeatures = lazy(
  () => import("./components/HomepageFeatures")
);
const ExclusiveFeatures = lazy(
  () => import("./components/ExclusiveFeatures")
);
const UseCases = lazy(() => import("./components/UseCases"));
const DeveloperHub = lazy(() => import("./components/DeveloperHub"));
const LearningResources = lazy(
  () => import("./components/LearningResources")
);

const PRODUCT_CARDS: ProductCardProps[] = [
  {
    icon: MessageSquare,
    title: "Quick Start",
    description:
      "Complete official guide to authenticate your account, correctly read the QR Code, and send your first message securely and confidently. Includes practical examples and best practices.",
    link: "/docs/quick-start/introducao",
    linkLabel: "Open Quick Start",
  },
  {
    icon: Cloud,
    title: "Instances",
    description:
      "Full control of your WhatsApp session: restart connections, obtain QR Code, update profile, and monitor real-time status. Manage multiple instances with ease.",
    link: "/docs/instance/introducao",
    linkLabel: "Manage instances",
  },
  {
    icon: Smartphone,
    title: "Mobile & Registration",
    description:
      "Complete flows to set up a security PIN, confirm verification codes, and keep your number always available and connected to WhatsApp Web.",
    link: "/docs/mobile/introducao",
    linkLabel: "Set up number",
  },
  {
    icon: Zap,
    title: "Webhooks",
    description:
      "Receive real-time events for sending, receiving, connection, and message status. Configure custom webhooks to integrate with your systems.",
    link: "/docs/webhooks/introducao",
    linkLabel: "Configure webhooks",
  },
  {
    icon: Code2,
    title: "Messages",
    description:
      "Complete catalog of message types: text, media, interactive buttons, lists, polls, charges, and much more. Explore all possibilities.",
    link: "/docs/messages/introducao",
    linkLabel: "Explore messages",
  },
  {
    icon: ShieldCheck,
    title: "Status & Stories",
    description:
      "Publish images, videos, and text to your status with read monitoring and secure replies. Manage your content professionally and efficiently.",
    link: "/docs/status/introducao",
    linkLabel: "Manage status",
  },
];

/**
 * DEPRECATED: chunkArray is no longer needed.
 * Products Section now uses CSS Grid with auto-fit for flexible layout.
 *
 * @deprecated Use CSS Grid with `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` instead of manual chunking
 */

const RESOURCE_CARDS: ResourceCardProps[] = [
  {
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    category: "Official Introduction",
    title: "Z-API — Wings for Your Imagination",
    description:
      "Understand what Z-API is, who can use it, and why it was created for developers.",
    actionLabel: "View documentation",
    onAction: () => {
      window.location.href = "/docs/intro";
    },
  },
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    category: "Blog Articles",
    title: "What Is an Instance?",
    description:
      "Understand how your WhatsApp becomes a digital assistant through simple, practical analogies. A didactic article for automators.",
    actionLabel: "Read article",
    onAction: () => {
      window.location.href = "/blog/o-que-e-uma-instancia-entenda-como-seu-whatsapp-vira-um-assistente-digital";
    },
  },
  {
    image:
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=900&q=80",
    category: "Blog Articles",
    title: "WhatsApp Messages: Choose the Right Format",
    description:
      "Learn when to use each message type and boost your engagement. Practical guide with real examples.",
    actionLabel: "Read article",
    onAction: () => {
      window.location.href = "/blog/mensagens-whatsapp-escolha-formato-certo-aumente-engajamento";
    },
  },
  {
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    category: "Blog Articles",
    title: "Webhooks vs Polling: Why Waiting Is More Efficient",
    description:
      "Understand the difference between webhooks and polling and why webhooks are far more efficient for real-time automations.",
    actionLabel: "Read article",
    onAction: () => {
      window.location.href = "/blog/webhooks-vs-polling-por-que-esperar-e-mais-eficiente";
    },
  },
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    category: "Blog Articles",
    title: "Security in Z-API: Protect Your Automation",
    description:
      "Discover how to protect your Z-API automation simply and practically. Set up all protections without technical complications.",
    actionLabel: "Read article",
    onAction: () => {
      window.location.href = "/blog/seguranca-zapi-proteja-automacao-como-porteiro";
    },
  },
  {
    image:
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=900&q=80",
    category: "Blog Articles",
    title: "Message Queue: How to Send Thousands Without Crashing",
    description:
      "Discover how message queues work and why they are essential for sending thousands of messages without crashing your system.",
    actionLabel: "Read article",
    onAction: () => {
      window.location.href = "/blog/fila-mensagens-como-enviar-milhares-sem-travar";
    },
  },
];

/**
 * Fallback component for Suspense
 *
 * Provides a placeholder with adequate height to prevent layout shift
 * during lazy loading of components.
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
      aria-label="Loading section"
    />
  );
}

/**
 * Home component – Main homepage.
 *
 * Renders all homepage sections with lazy loading for below‑the‑fold components,
 * improving initial load time.
 *
 * Structure:
 * - HeroSection: Main section with CTAs
 * - HomepageFeatures: Platform benefits
 * - ExclusiveFeatures: Exclusive features
 * - Products Section: Products and tools
 * - DeveloperHub: Developer hub
 * - Resources Section: Official content
 * - UseCases: Use cases (technical focus)
 * - LearningResources: Learning resources
 *
 * @returns React component for the homepage
 */
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <Head>
        <title>{`${siteConfig.title} - Complete Z-API API Documentation`}</title>
        <meta
          name="description"
          content="Complete Z-API API documentation – Interact with WhatsApp through a simple and intuitive RESTful API. Guides, examples, and full reference."
        />
        {/* Preload critical resources for Core Web Vitals */}
        {/* Navbar logo – critical for LCP (Largest Contentful Paint) */}
        <link
          rel="preload"
          as="image"
          href={`${siteConfig.baseUrl}img/z-api-logo.webp`}
          type="image/webp"
          fetchPriority="high"
        />
        {/* DNS prefetch for external resources (Unsplash, etc.) */}
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
        {/* Exclusive Features */}
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
            <p className={styles.sectionEyebrow}>Products & tools</p>
            <h2 className={styles.sectionTitle}>
              Automate every WhatsApp Web flow with Z-API
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
            <p className={styles.sectionEyebrow}>Official content</p>
            <h2 className={styles.sectionTitle}>
              Documentation, blog, and best practices straight from Z-API
            </h2>
            <div className={styles.resourcesGrid}>
              {RESOURCE_CARDS.map((resource) => (
                <ResourceCard key={resource.title} {...resource} />
              ))}
            </div>
            <div className={styles.resourcesCta}>
              <Link to="/docs/intro" className={styles.secondaryButton}>
                View all resources
              </Link>
            </div>
          </div>
        </section>
        {/* Use Cases */}
        <section data-theme="official" data-section="light">
          <ErrorBoundary>
            <Suspense fallback={<ComponentFallback />}>
              <UseCases theme="official" />
            </Suspense>
          </ErrorBoundary>
        </section>
        {/* Learning with Official theme on light section */}
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