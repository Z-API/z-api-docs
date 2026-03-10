import Lottie from 'lottie-react';
import { Sparkles } from 'lucide-react';
import type { ReactElement } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './styles.module.css';

const pulseAnimation = {
  v: '5.7.4',
  fr: 60,
  ip: 0,
  op: 90,
  w: 120,
  h: 120,
  nm: 'agent pulse',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'circle',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [60, 60, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            {
              t: 0,
              s: [60, 60, 100],
              e: [100, 100, 100],
              i: { x: [0.56, 0.56, 0.56], y: [0.57, 0.57, 0.57] },
              o: { x: [0.33, 0.33, 0.33], y: [0, 0, 0] },
            },
            {
              t: 45,
              s: [100, 100, 100],
              e: [60, 60, 100],
              i: { x: [0.56, 0.56, 0.56], y: [1, 1, 1] },
              o: { x: [0.33, 0.33, 0.33], y: [0, 0, 0] },
            },
            { t: 90, s: [60, 60, 100], e: [60, 60, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [80, 80] }, d: 1, nm: 'Ellipse Path 1' },
            { ty: 'fl', c: { a: 0, k: [0.0627, 0.6431, 0.4667, 1] }, o: { a: 0, k: 100 }, nm: 'Fill 1' },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
              nm: 'Transform',
            },
          ],
          nm: 'Ellipse 1',
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
  ],
  markers: [],
} as const;

type LottieAgentPulseProps = {
  /**
   * Mensagem exibida abaixo da animação.
   */
  message?: string;
};

/**
 * Card utilitário que renderiza uma animação Lottie leve
 * para ilustrar estados do agente na documentação.
 * 
 * Performance Notes:
 * - Este componente usa lazy loading via ShowcaseSection
 * - Animação Lottie é inline (não carrega arquivo externo)
 * - Respeita prefers-reduced-motion para acessibilidade
 * - Para animações Lottie maiores, considerar:
 *   1. Carregar JSON externo via import dinâmico
 *   2. Usar IntersectionObserver para pausar quando não visível
 *   3. Implementar progressive loading de assets
 */
export const LottieAgentPulse = ({
  message = 'Agente pronto para próxima interação',
}: LottieAgentPulseProps): ReactElement => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className={styles.showcaseCard}>
      <p className={`${styles.showcaseTitle} text--success`}><strong>Estado do Agente</strong></p>
      <div className={styles.lottieWrapper}>
        {prefersReducedMotion ? (
          <Sparkles size={48} color="#0a8f5d" aria-hidden />
        ) : (
          <Lottie
            animationData={pulseAnimation}
            loop
            autoplay
            style={{ width: 120, height: 120 }}
            aria-label="Animação mostrando pulso do agente"
            role="img"
          />
        )}
        <p className={`${styles.lottieMessage} text--success`}>
          <strong>{message}</strong>
        </p>
      </div>
    </section>
  );
};


