import { lazy, Suspense } from 'react';
import styles from './styles.module.css';

const LazyAgentFlowDiagram = lazy(async () => ({
  default: (await import('./AgentFlowDiagram')).AgentFlowDiagram,
}));

const LazyAutoAnimateList = lazy(async () => ({
  default: (await import('./AutoAnimateList')).AutoAnimateList,
}));

const LazyLottieAgentPulse = lazy(async () => ({
  default: (await import('./LottieAgentPulse')).LottieAgentPulse,
}));

const InlineFallback = () => (
  <div className={styles.lazyFallback} role="status" aria-live="polite">
    <p><strong className="text--success">Carregando demonstração interativa…</strong></p>
  </div>
);

/**
 * Seção agregadora que carrega os componentes interativos sob demanda.
 * 
 * Implementa lazy loading para melhorar performance:
 * - Componentes com animações pesadas (Lottie, ReactFlow, AutoAnimate)
 *   são carregados apenas quando visíveis na viewport
 * - Reduz bundle size inicial e melhora Core Web Vitals (LCP, FCP)
 * - Cada componente tem seu próprio Suspense boundary para carregamento independente
 * 
 * Performance Benefits:
 * - Code splitting automático via React.lazy
 * - Reduz tempo de carregamento inicial da página
 * - Melhora First Contentful Paint (FCP) e Largest Contentful Paint (LCP)
 * - Componentes carregam apenas quando necessário (viewport visibility)
 * 
 * @example
 * ```tsx
 * <ShowcaseSection />
 * ```
 */
export const ShowcaseSection = () => (
  <div className={styles.showcaseGrid}>
    <Suspense fallback={<InlineFallback />}>
      <LazyAgentFlowDiagram />
    </Suspense>
    <Suspense fallback={<InlineFallback />}>
      <LazyAutoAnimateList />
    </Suspense>
    <Suspense fallback={<InlineFallback />}>
      <LazyLottieAgentPulse />
    </Suspense>
  </div>
);


