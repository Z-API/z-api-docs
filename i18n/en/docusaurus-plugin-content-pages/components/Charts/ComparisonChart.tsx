import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

import styles from './ComparisonChart.module.css';

interface ComparisonData {
  label: string;
  zapi: number | string;
  whatsapp: number | string;
  winner: 'zapi' | 'whatsapp' | 'tie';
}

interface ComparisonChartProps {
  data: ComparisonData[];
  title?: string;
}

/**
 * Componente de gráfico de comparação visual
 * Mostra comparações lado a lado com barras e indicadores visuais
 */
export default function ComparisonChart({ data, title }: ComparisonChartProps): React.JSX.Element {
  return (
    <div className={styles.chartContainer}>
      {title && <h3 className={styles.chartTitle}>{title}</h3>}
      <div className={styles.comparisonList}>
        {data.map((item, index) => {
          const isZapiWinner = item.winner === 'zapi';
          const isWhatsappWinner = item.winner === 'whatsapp';
          const isTie = item.winner === 'tie';

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={styles.comparisonItem}
            >
              <div className={styles.comparisonLabel}>{item.label}</div>
              <div className={styles.comparisonBars}>
                <div className={styles.barGroup}>
                  <div className={styles.barLabel}>Z-API</div>
                  <div className={styles.barContainer}>
                    <motion.div
                      className={`${styles.bar} ${styles.zapiBar} ${isZapiWinner ? styles.winner : ''}`}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.6, ease: 'easeOut' }}
                    >
                      <span className={styles.barValue}>{item.zapi}</span>
                    </motion.div>
                  </div>
                </div>
                <div className={styles.winnerIndicator}>
                  {isZapiWinner && <TrendingUp className={styles.winnerIcon} />}
                  {isWhatsappWinner && <TrendingDown className={styles.winnerIcon} />}
                  {isTie && <Minus className={styles.winnerIcon} />}
                </div>
                <div className={styles.barGroup}>
                  <div className={styles.barLabel}>WhatsApp</div>
                  <div className={styles.barContainer}>
                    <motion.div
                      className={`${styles.bar} ${styles.whatsappBar} ${isWhatsappWinner ? styles.winner : ''}`}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: 'easeOut' }}
                    >
                      <span className={styles.barValue}>{item.whatsapp}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
