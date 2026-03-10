import Head from '@docusaurus/Head';
import ErrorBoundary from '@site/src/components/shared/ErrorBoundary';
import SkipLinks from '@site/src/components/shared/SkipLinks';
import Layout from '@theme/Layout';
import { lazy, Suspense, type ReactNode } from 'react';
import styles from './no-code.module.css';

// Lazy loading de componentes para melhor performance
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
 * Componente de fallback para Suspense
 */
function ComponentFallback(): ReactNode {
  return (
    <div className={styles.fallback} aria-label="Carregando componente...">
      <div className={styles.spinner} aria-hidden="true" />
    </div>
  );
}

/**
 * Página No Code - Automações WhatsApp sem código.
 *
 * Página dedicada a pessoas que fazem automações mas não sabem programação.
 * 
 * Conteúdo completo incluindo:
 * - Hero section explicando o conceito
 * - Glossário interativo de termos técnicos (25+ termos)
 * - Guias visuais passo a passo detalhados (5 guias)
 * - Exemplos práticos de automações (8 exemplos)
 * - Ferramentas no-code recomendadas (6 ferramentas)
 * - Casos de uso por indústria (6 indústrias)
 * - Agentes de IA para automações (6 exemplos)
 * - Tutoriais passo a passo (6 tutoriais)
 * - Recursos adicionais (vídeos, artigos, cursos)
 * - FAQ expandido (15 perguntas)
 * 
 * Curated by:
 * - Tech Writer: Conteúdo educacional e tutoriais
 * - Code Analyst: Análises técnicas e exemplos comentados
 * - Code Review: Qualidade, padrões e melhores práticas
 * - UI/UX Specialist: Experiência visual, navegação e acessibilidade
 * - AI Agents Specialist: Conteúdo sobre agentes de IA e automações inteligentes
 *
 * @returns Componente React da página No Code
 */
export default function NoCodePage(): ReactNode {
  return (
    <Layout
      title="No Code - Automações WhatsApp sem Código"
      description="Aprenda a criar automações WhatsApp sem escrever código. Glossário completo, guias visuais passo a passo, ferramentas no-code recomendadas, casos de uso por indústria, agentes de IA e muito mais para pessoas não técnicas.">
      <Head>
        <meta
          name="keywords"
          content="no code, automação, WhatsApp, sem código, glossário técnico, guias visuais, ferramentas no-code, casos de uso, agentes de IA, Zapier, Make, Postman, Z-API"
        />
        <meta
          property="og:title"
          content="No Code - Automações WhatsApp sem Código | Z-API Central"
        />
        <meta
          property="og:description"
          content="Aprenda a criar automações WhatsApp sem escrever código. Glossário completo, ferramentas no-code, casos de uso reais, agentes de IA e muito mais."
        />
      </Head>

      <SkipLinks
        links={[
          { targetId: 'glossario', label: 'Ir para Glossário', order: 1 },
          { targetId: 'guias', label: 'Ir para Guias Visuais', order: 2 },
          { targetId: 'exemplos', label: 'Ir para Exemplos', order: 3 },
          { targetId: 'ferramentas', label: 'Ir para Ferramentas', order: 4 },
          { targetId: 'casos-uso', label: 'Ir para Casos de Uso', order: 5 },
          { targetId: 'agentes-ia', label: 'Ir para Agentes de IA', order: 6 },
          { targetId: 'tutoriais', label: 'Ir para Tutoriais', order: 7 },
          { targetId: 'recursos', label: 'Ir para Recursos', order: 8 },
          { targetId: 'faq', label: 'Ir para FAQ', order: 9 },
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
            <section id="exemplos" aria-label="Exemplos de automações">
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

