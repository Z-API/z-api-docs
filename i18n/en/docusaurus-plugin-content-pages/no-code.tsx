import Head from '@docusaurus/Head';
import ErrorBoundary from '@site/src/components/shared/ErrorBoundary';
import SkipLinks from '@site/src/components/shared/SkipLinks';
import Layout from '@theme/Layout';
import { lazy, Suspense, type ReactNode } from 'react';
import styles from './no-code.module.css';

// Lazy loading components for better performance
const NoCodeHero = lazy(() => import('@site/src/components/NoCode/NoCodeHero'));
const GlossarySection = lazy(
  () => import('@site/src/components/NoCode/GlossarySection')
);
const VisualGuides = lazy(
  () => import('@site/src/components/NoCode/VisualGuides')
);
const AutomationExamples = lazy(
  () => import('@site/src/components/NoCode/AutomationExamples')
);
const ToolsSection = lazy(
  () => import('@site/src/components/NoCode/ToolsSection')
);
const UseCasesSection = lazy(
  () => import('@site/src/components/NoCode/UseCasesSection')
);
const AIAgentsSection = lazy(
  () => import('@site/src/components/NoCode/AIAgentsSection')
);
const TutorialsSection = lazy(
  () => import('@site/src/components/NoCode/TutorialsSection')
);
const ResourcesSection = lazy(
  () => import('@site/src/components/NoCode/ResourcesSection')
);
const FAQSection = lazy(() => import('@site/src/components/NoCode/FAQSection'));

/**
 * Fallback component for Suspense
 */
function ComponentFallback(): ReactNode {
  return (
    <div className={styles.fallback} aria-label="Loading component...">
      <div className={styles.spinner} aria-hidden="true" />
    </div>
  );
}

/**
 * No Code Page - WhatsApp automations without code.
 *
 * Page dedicated to people who create automations but don't know how to code.
 * 
 * Complete content including:
 * - Hero section explaining the concept
 * - Interactive glossary of technical terms (25+ terms)
 * - Detailed step-by-step visual guides (5 guides)
 * - Practical automation examples (8 examples)
 * - Recommended no-code tools (6 tools)
 * - Industry-specific use cases (6 industries)
 * - AI agents for automations (6 examples)
 * - Step-by-step tutorials (6 tutorials)
 * - Additional resources (videos, articles, courses)
 * - Expanded FAQ (15 questions)
 * 
 * Curated by:
 * - Tech Writer: Educational content and tutorials
 * - Code Analyst: Technical analyses and commented examples
 * - Code Review: Quality, standards, and best practices
 * - UI/UX Specialist: Visual experience, navigation, and accessibility
 * - AI Agents Specialist: Content about AI agents and intelligent automations
 *
 * @returns React component for the No Code page
 */
export default function NoCodePage(): ReactNode {
  return (
    <Layout
      title="No Code - WhatsApp Automations without Code"
      description="Learn how to create WhatsApp automations without writing code. Complete glossary, step-by-step visual guides, recommended no-code tools, industry-specific use cases, AI agents, and much more for non-technical people.">
      <Head>
        <meta
          name="keywords"
          content="no code, automation, WhatsApp, no-code, technical glossary, visual guides, no-code tools, use cases, AI agents, Zapier, Make, Postman, Z-API"
        />
        <meta
          property="og:title"
          content="No Code - WhatsApp Automations without Code | Z-API Central"
        />
        <meta
          property="og:description"
          content="Learn how to create WhatsApp automations without writing code. Complete glossary, no-code tools, real-world use cases, AI agents, and much more."
        />
      </Head>

      <SkipLinks
        links={[
          { targetId: 'glossario', label: 'Skip to Glossary', order: 1 },
          { targetId: 'guias', label: 'Skip to Visual Guides', order: 2 },
          { targetId: 'exemplos', label: 'Skip to Examples', order: 3 },
          { targetId: 'ferramentas', label: 'Skip to Tools', order: 4 },
          { targetId: 'casos-uso', label: 'Skip to Use Cases', order: 5 },
          { targetId: 'agentes-ia', label: 'Skip to AI Agents', order: 6 },
          { targetId: 'tutoriais', label: 'Skip to Tutorials', order: 7 },
          { targetId: 'recursos', label: 'Skip to Resources', order: 8 },
          { targetId: 'faq', label: 'Skip to FAQ', order: 9 },
        ]}
      />

      <main className={styles.main}>
        {/* Hero Section */}
        <ErrorBoundary>
          <Suspense fallback={<ComponentFallback />}>
            <NoCodeHero theme="official" />
          </Suspense>
        </ErrorBoundary>

        {/* Glossary Section */}
        <ErrorBoundary>
          <Suspense fallback={<ComponentFallback />}>
            <GlossarySection theme="official" />
          </Suspense>
        </ErrorBoundary>

        {/* Visual Guides Section */}
        <ErrorBoundary>
          <Suspense fallback={<ComponentFallback />}>
            <VisualGuides theme="official" />
          </Suspense>
        </ErrorBoundary>

        {/* Automation Examples Section */}
        <ErrorBoundary>
          <Suspense fallback={<ComponentFallback />}>
            <section id="exemplos" aria-label="Automation examples">
              <AutomationExamples theme="official" />
            </section>
          </Suspense>
        </ErrorBoundary>

        {/* Tools Section */}
        <ErrorBoundary>
          <Suspense fallback={<ComponentFallback />}>
            <ToolsSection theme="official" />
          </Suspense>
        </ErrorBoundary>

        {/* Use Cases Section */}
        <ErrorBoundary>
          <Suspense fallback={<ComponentFallback />}>
            <UseCasesSection theme="official" />
          </Suspense>
        </ErrorBoundary>

        {/* AI Agents Section */}
        <ErrorBoundary>
          <Suspense fallback={<ComponentFallback />}>
            <AIAgentsSection theme="official" />
          </Suspense>
        </ErrorBoundary>

        {/* Tutorials Section */}
        <ErrorBoundary>
          <Suspense fallback={<ComponentFallback />}>
            <TutorialsSection theme="official" />
          </Suspense>
        </ErrorBoundary>

        {/* Resources Section */}
        <ErrorBoundary>
          <Suspense fallback={<ComponentFallback />}>
            <ResourcesSection theme="official" />
          </Suspense>
        </ErrorBoundary>

        {/* FAQ Section */}
        <ErrorBoundary>
          <Suspense fallback={<ComponentFallback />}>
            <FAQSection theme="official" />
          </Suspense>
        </ErrorBoundary>
      </main>
    </Layout>
  );
}