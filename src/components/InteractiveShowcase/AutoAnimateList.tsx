import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Shuffle, Sparkles } from 'lucide-react';
import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './styles.module.css';

type Step = {
  id: string;
  title: string;
  result: string;
};

const baseSteps: Step[] = [
  { id: 'thought', title: 'Thought', result: 'Definir próxima ação' },
  { id: 'action', title: 'Action', result: 'Executar ferramenta' },
  { id: 'observation', title: 'Observation', result: 'Capturar resultado' },
  { id: 'answer', title: 'Final Answer', result: 'Compartilhar conclusão' },
];

/**
 * Demonstra microanimações acessíveis usando @formkit/auto-animate.
 * Ideal para destacar etapas do ReAct sem escrever animações manuais.
 */
export const AutoAnimateList = (): ReactElement => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [steps, setSteps] = useState<Step[]>(baseSteps);
  const [parent] = useAutoAnimate<HTMLOListElement>({
    duration: prefersReducedMotion ? 0 : 250,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  });

  const handleShuffle = () => {
    setSteps((currentSteps) => {
      const cloned = [...currentSteps];
      cloned.unshift(cloned.pop() as Step);
      return cloned;
    });
  };

  const highlightStep = useMemo(() => steps[0]?.title ?? 'Thought', [steps]);

  return (
    <section className={styles.showcaseCard}>
      <p className={`${styles.showcaseTitle} text--success`}><strong>Microanimações ReAct</strong></p>
      <p className={styles.showcaseDescription}>
        Reordene as etapas para ver animações automáticas aplicadas à lista. O primeiro item destacado
        indica a etapa atual do agente e reforça a hierarquia visual.
      </p>

      <div className={styles.listActions}>
        <button type="button" className={styles.button} onClick={handleShuffle} aria-label="Reordenar etapas">
          <Shuffle size={18} />
          Embaralhar etapas
        </button>
        <span className={`${styles.badge} text--success`}>
          <strong>Foco atual: {highlightStep}</strong>
        </span>
      </div>

      <ol ref={parent} className={styles.list}>
        {steps.map((step) => (
          <li key={step.id} className={styles.listItem}>
            <div>
              <strong>{step.title}</strong>
              <p style={{ margin: 0 }}>{step.result}</p>
            </div>
            <Sparkles size={18} color="#0a8f5d" aria-hidden />
          </li>
        ))}
      </ol>
    </section>
  );
};


