import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

import styles from './MetricCard.module.css';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  delay?: number;
}

/**
 * Card de métrica com animação e indicador de mudança
 */
export default function MetricCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  color,
  delay = 0,
}: MetricCardProps): React.JSX.Element {
  const isPositive = (change || 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={styles.metricCard}
      style={{ '--metric-color': color } as React.CSSProperties}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className={styles.metricHeader}>
        <div className={styles.metricIcon}>
          <Icon className={styles.icon} />
        </div>
        {change !== undefined && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.3, type: 'spring', stiffness: 200 }}
            className={`${styles.metricChange} ${isPositive ? styles.positive : styles.negative}`}
          >
            {isPositive ? (
              <TrendingUp className={styles.changeIcon} />
            ) : (
              <TrendingDown className={styles.changeIcon} />
            )}
            <span>{Math.abs(change)}%</span>
          </motion.div>
        )}
      </div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
        className={styles.metricValue}
      >
        {value}
      </motion.div>
      <div className={styles.metricTitle}>{title}</div>
      {description && (
        <div className={styles.metricDescription}>{description}</div>
      )}
      <div className={styles.metricGlow} />
    </motion.div>
  );
}
