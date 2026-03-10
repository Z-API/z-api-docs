import React from 'react';
import { motion } from 'framer-motion';
import styles from './AnimatedFlow.module.css';
import type { FlowStep } from './types/flow.types';
import type { AnimatedFlowProps } from './types/diagram.types';

/**
 * Props completas do AnimatedFlow
 * Combina props de apresentação com dados de domínio
 */
interface AnimatedFlowFullProps extends AnimatedFlowProps {
  /** Etapas do fluxo (domínio) */
  steps: FlowStep[];
}

/**
 * Performance Notes:
 * - Usa Framer Motion variants para animações otimizadas (GPU accelerated)
 * - Respeita prefers-reduced-motion via autoPlay prop
 * - Para listas grandes (>10 steps), considerar:
 *   1. Memoização do componente com React.memo
 *   2. Virtualização se steps forem muitos (>20)
 *   3. Lazy loading de steps fora da viewport
 */

export function AnimatedFlow({
  steps,
  direction = 'horizontal',
  autoPlay = true,
}: AnimatedFlowFullProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'vertical' ? 20 : 0,
      x: direction === 'horizontal' ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,

        ease: [0.25, 0.46, 0.45, 0.94] as const, // easeOut cubic-bezier
      },
    },
  };

  return (
    <motion.div
      className={styles.container}
      data-direction={direction}
      variants={containerVariants}
      initial={autoPlay ? 'hidden' : 'visible'}
      animate="visible"
      role="list"
      aria-label={`Fluxo de ${steps.length} etapas`}
    >
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <motion.div
            className={styles.step}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              '--step-color': step.color || 'var(--diagram-line-primary, #4a90e2)',
            } as React.CSSProperties}
            role="listitem"
            aria-label={`Etapa ${index + 1} de ${steps.length}: ${step.label}${step.description ? ` - ${step.description}` : ''}`}
          >
            <div className={styles.iconWrapper}>
              <step.icon size={32} />
            </div>
            <div className={styles.content}>
              <h4 className={styles.label}>{step.label}</h4>
              {step.description && (
                <p className={styles.description}>{step.description}</p>
              )}
            </div>
          </motion.div>
          {index < steps.length - 1 && (
            <div className={styles.connector}>
              <motion.div
                className={styles.connectorLine}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
}

