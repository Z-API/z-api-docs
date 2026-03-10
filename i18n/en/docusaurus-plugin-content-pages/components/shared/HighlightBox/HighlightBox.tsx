import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Link2, Code2, Key, Globe, Settings, Hash, Phone, Terminal, Search, FileCode } from 'lucide-react';
import clsx from 'clsx';
import styles from './HighlightBox.module.css';

export type HighlightBoxVariant = 
  | 'default' 
  | 'endpoint' 
  | 'url' 
  | 'token' 
  | 'code' 
  | 'header' 
  | 'parameter'
  | 'env'           // Variáveis de ambiente
  | 'id'            // IDs (InstanceId, MessageId, etc.)
  | 'phone'         // Números de telefone
  | 'query'         // Query parameters
  | 'path-param'    // Path parameters
  | 'compact'
  | 'highlighted';

export interface HighlightBoxProps {
  /**
   * Conteúdo a ser exibido
   */
  children: React.ReactNode;
  /**
   * Texto instrucional opcional acima do conteúdo
   */
  instructionText?: string;
  /**
   * Variante visual do componente
   * @default "default"
   */
  variant?: HighlightBoxVariant;
  /**
   * Se o componente deve ser copiável
   * @default true
   */
  copyable?: boolean;
  /**
   * Texto a ser copiado (se diferente do children)
   */
  copyText?: string;
  /**
   * Ícone customizado (lucide-react icon name)
   */
  icon?: string;
  /**
   * Classe CSS adicional
   */
  className?: string;
  /**
   * Se deve exibir o ícone
   * @default true
   */
  showIcon?: boolean;
}

/**
 * Componente base reutilizável para destacar informações importantes
 * 
 * Suporta múltiplas variantes: endpoint, URL, token, código, header, parâmetro
 * 
 * @example
 * ```tsx
 * <HighlightBox variant="endpoint">
 *   POST /instances/{instanceId}/token/{token}/send-text
 * </HighlightBox>
 * ```
 * 
 * @example
 * ```tsx
 * <HighlightBox 
 *   variant="url" 
 *   instructionText="URL base da API"
 * >
 *   https://api.z-api.io
 * </HighlightBox>
 * ```
 */
export default function HighlightBox({
  children,
  instructionText,
  variant = 'default',
  copyable = true,
  copyText,
  icon,
  className,
  showIcon = true,
}: HighlightBoxProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Determinar texto a copiar
  const textToCopy = copyText || (typeof children === 'string' ? children : '');

  // Ícones por variante
  const iconMap: Record<string, React.ComponentType<any>> = {
    endpoint: Link2,
    url: Globe,
    token: Key,
    code: Code2,
    header: Settings,
    parameter: Settings,
    env: Terminal,        // Variáveis de ambiente
    id: Hash,             // IDs
    phone: Phone,         // Números de telefone
    query: Search,        // Query parameters
    'path-param': FileCode, // Path parameters
    default: Code2,
  };

  // Selecionar ícone - sempre garantir um componente válido
  let IconComponent: React.ComponentType<any> = Code2; // Fallback padrão
  
  // Primeiro, tentar usar ícone customizado se fornecido
  if (icon) {
    try {
      const LucideIcons = require('lucide-react') as Record<string, React.ComponentType<any> | undefined>;
      const customIcon = LucideIcons[icon];
      if (customIcon && typeof customIcon === 'function') {
        IconComponent = customIcon;
      } else {
        // Se não encontrar, usar variante
        IconComponent = iconMap[variant] || iconMap.default || Code2;
      }
    } catch {
      // Se der erro, usar variante
      IconComponent = iconMap[variant] || iconMap.default || Code2;
    }
  } else {
    // Se não há ícone customizado, usar variante
    IconComponent = iconMap[variant] || iconMap.default || Code2;
  }

  const handleCopy = useCallback(async () => {
    if (!copyable || !textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  }, [copyable, textToCopy]);

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

  const boxVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.01,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    tap: {
      scale: 0.99,
    },
  };

  return (
    <motion.div
      className={clsx(styles.container, styles[variant], className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Texto instrucional */}
      {instructionText && (
        <motion.p
          className={styles.instructionText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {instructionText}
        </motion.p>
      )}

      {/* Container do conteúdo */}
      <motion.div
        className={styles.contentContainer}
        variants={boxVariants}
        initial="rest"
        animate={isHovered ? 'hover' : 'rest'}
        whileTap={copyable ? 'tap' : 'rest'}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={copyable ? handleCopy : undefined}
      >
        {/* Ícone */}
        {showIcon && (
          <motion.div
            className={styles.iconWrapper}
            initial="rest"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <IconComponent className={styles.icon} size={20} />
          </motion.div>
        )}

        {/* Conteúdo */}
        <div className={styles.content}>
          {children}
        </div>

        {/* Botão de copiar */}
        {copyable && textToCopy && (
          <motion.button
            className={styles.copyButton}
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            aria-label="Copiar"
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

        {/* Efeito de brilho */}
        {copyable && <div className={styles.glow} />}
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
            Copiado!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
