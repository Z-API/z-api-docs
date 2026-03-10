import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Key } from 'lucide-react';
import styles from './ClientTokenDisplay.module.css';

export interface ClientTokenDisplayProps {
  /**
   * Texto instrucional a ser exibido acima do token
   * @default "Verifique se está usando o token correto no header"
   */
  instructionText?: string;
  /**
   * Texto do token a ser exibido
   * @default "Client - Token"
   */
  tokenText?: string;
  /**
   * Se o componente deve ser interativo (copiável)
   * @default true
   */
  interactive?: boolean;
  /**
   * Variante visual do componente
   * @default "default"
   */
  variant?: 'default' | 'compact' | 'highlighted';
  /**
   * Classe CSS adicional
   */
  className?: string;
}

/**
 * Componente interativo e visualmente atraente para exibir o Client-Token
 * 
 * @example
 * ```tsx
 * <ClientTokenDisplay />
 * ```
 * 
 * @example
 * ```tsx
 * <ClientTokenDisplay 
 *   instructionText="Use este token no header da requisição"
 *   variant="highlighted"
 * />
 * ```
 */
export default function ClientTokenDisplay({
  instructionText = 'Verifique se está usando o token correto no header',
  tokenText = 'Client - Token',
  interactive = true,
  variant = 'default',
  className,
}: ClientTokenDisplayProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!interactive) return;

    try {
      await navigator.clipboard.writeText(tokenText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar token:', err);
    }
  }, [interactive, tokenText]);

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const tokenBoxVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const iconVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: {
      rotate: [0, -10, 10, -10, 0],
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <motion.div
      className={`${styles.container} ${styles[variant]} ${className || ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Texto instrucional */}
      <motion.p
        className={styles.instructionText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {instructionText}
      </motion.p>

      {/* Container do token */}
      <motion.div
        className={styles.tokenContainer}
        variants={tokenBoxVariants}
        initial="rest"
        animate={isHovered ? 'hover' : 'rest'}
        whileTap={interactive ? 'tap' : 'rest'}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={interactive ? handleCopy : undefined}
      >
        {/* Ícone de chave */}
        <motion.div
          className={styles.iconWrapper}
          variants={iconVariants}
          initial="rest"
          animate={isHovered ? 'hover' : 'rest'}
        >
          <Key className={styles.icon} size={20} />
        </motion.div>

        {/* Texto do token */}
        <code className={styles.tokenText}>{tokenText}</code>

        {/* Botão de copiar (apenas se interativo) */}
        {interactive && (
          <motion.button
            className={styles.copyButton}
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            aria-label="Copiar token"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className={styles.copyIcon} size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -180 }}
                  transition={{ duration: 0.2 }}
                >
                  <Copy className={styles.copyIcon} size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}

        {/* Efeito de brilho ao passar o mouse */}
        {interactive && <div className={styles.glow} />}
      </motion.div>

      {/* Feedback de cópia */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className={styles.copyFeedback}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            Token copiado!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
