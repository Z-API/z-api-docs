import { useReducedMotion } from '@site/src/hooks/useReducedMotion';
import { createAccessibleVariants } from '@site/src/utils/animations';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Dados de exemplo de código para animação
 */
const codeExamples = [
  {
    filename: 'send-text.js',
    lines: [
      { num: 1, code: [{ text: 'const', color: 'pink' }, { text: ' response = ', color: 'gray' }, { text: 'await', color: 'pink' }, { text: ' fetch', color: 'yellow' }, { text: '(', color: 'gray' }] },
      { num: 2, code: [{ text: "  'https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-text'", color: 'green' }, { text: ',', color: 'gray' }] },
      { num: 3, code: [{ text: '  {', color: 'gray' }] },
      { num: 4, code: [{ text: "    method", color: 'blue' }, { text: ': ', color: 'gray' }, { text: "'POST'", color: 'green' }, { text: ',', color: 'gray' }] },
      { num: 5, code: [{ text: "    headers", color: 'blue' }, { text: ': { ', color: 'gray' }, { text: "'Content-Type'", color: 'green' }, { text: ': ', color: 'gray' }, { text: "'application/json'", color: 'green' }, { text: ' },', color: 'gray' }] },
      { num: 6, code: [{ text: "    body", color: 'blue' }, { text: ': JSON.', color: 'gray' }, { text: 'stringify', color: 'yellow' }, { text: '({', color: 'gray' }] },
      { num: 7, code: [{ text: "      phone", color: 'blue' }, { text: ': ', color: 'gray' }, { text: "'5511999999999'", color: 'green' }, { text: ',', color: 'gray' }] },
      { num: 8, code: [{ text: "      message", color: 'blue' }, { text: ': ', color: 'gray' }, { text: "'Olá! Mensagem via Z-API'", color: 'green' }] },
      { num: 9, code: [{ text: '    })', color: 'gray' }] },
      { num: 10, code: [{ text: '  }', color: 'gray' }] },
      { num: 11, code: [{ text: ');', color: 'gray' }] },
    ],
    success: '✓ Mensagem de texto enviada',
  },
  {
    filename: 'send-image.js',
    lines: [
      { num: 1, code: [{ text: 'const', color: 'pink' }, { text: ' response = ', color: 'gray' }, { text: 'await', color: 'pink' }, { text: ' fetch', color: 'yellow' }, { text: '(', color: 'gray' }] },
      { num: 2, code: [{ text: "  'https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-image'", color: 'green' }, { text: ',', color: 'gray' }] },
      { num: 3, code: [{ text: '  {', color: 'gray' }] },
      { num: 4, code: [{ text: "    method", color: 'blue' }, { text: ': ', color: 'gray' }, { text: "'POST'", color: 'green' }, { text: ',', color: 'gray' }] },
      { num: 5, code: [{ text: "    headers", color: 'blue' }, { text: ': { ', color: 'gray' }, { text: "'Content-Type'", color: 'green' }, { text: ': ', color: 'gray' }, { text: "'application/json'", color: 'green' }, { text: ' },', color: 'gray' }] },
      { num: 6, code: [{ text: "    body", color: 'blue' }, { text: ': JSON.', color: 'gray' }, { text: 'stringify', color: 'yellow' }, { text: '({', color: 'gray' }] },
      { num: 7, code: [{ text: "      phone", color: 'blue' }, { text: ': ', color: 'gray' }, { text: "'5511999999999'", color: 'green' }, { text: ',', color: 'gray' }] },
      { num: 8, code: [{ text: "      image", color: 'blue' }, { text: ': ', color: 'gray' }, { text: "'https://example.com/image.jpg'", color: 'green' }, { text: ',', color: 'gray' }] },
      { num: 9, code: [{ text: "      caption", color: 'blue' }, { text: ': ', color: 'gray' }, { text: "'Confira esta imagem!'", color: 'green' }] },
      { num: 10, code: [{ text: '    })', color: 'gray' }] },
      { num: 11, code: [{ text: '  }', color: 'gray' }] },
      { num: 12, code: [{ text: ');', color: 'gray' }] },
    ],
    success: '✓ Imagem enviada com sucesso',
  },
  {
    filename: 'send-document.js',
    lines: [
      { num: 1, code: [{ text: 'const', color: 'pink' }, { text: ' response = ', color: 'gray' }, { text: 'await', color: 'pink' }, { text: ' fetch', color: 'yellow' }, { text: '(', color: 'gray' }] },
      { num: 2, code: [{ text: "  'https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-document'", color: 'green' }, { text: ',', color: 'gray' }] },
      { num: 3, code: [{ text: '  {', color: 'gray' }] },
      { num: 4, code: [{ text: "    method", color: 'blue' }, { text: ': ', color: 'gray' }, { text: "'POST'", color: 'green' }, { text: ',', color: 'gray' }] },
      { num: 5, code: [{ text: "    headers", color: 'blue' }, { text: ': { ', color: 'gray' }, { text: "'Content-Type'", color: 'green' }, { text: ': ', color: 'gray' }, { text: "'application/json'", color: 'green' }, { text: ' },', color: 'gray' }] },
      { num: 6, code: [{ text: "    body", color: 'blue' }, { text: ': JSON.', color: 'gray' }, { text: 'stringify', color: 'yellow' }, { text: '({', color: 'gray' }] },
      { num: 7, code: [{ text: "      phone", color: 'blue' }, { text: ': ', color: 'gray' }, { text: "'5511999999999'", color: 'green' }, { text: ',', color: 'gray' }] },
      { num: 8, code: [{ text: "      document", color: 'blue' }, { text: ': ', color: 'gray' }, { text: "'https://example.com/doc.pdf'", color: 'green' }, { text: ',', color: 'gray' }] },
      { num: 9, code: [{ text: "      fileName", color: 'blue' }, { text: ': ', color: 'gray' }, { text: "'relatorio.pdf'", color: 'green' }] },
      { num: 10, code: [{ text: '    })', color: 'gray' }] },
      { num: 11, code: [{ text: '  }', color: 'gray' }] },
      { num: 12, code: [{ text: ');', color: 'gray' }] },
    ],
    success: '✓ Documento enviado com sucesso',
  },
  {
    filename: 'webhook-setup.js',
    lines: [
      { num: 1, code: [{ text: 'const', color: 'pink' }, { text: ' response = ', color: 'gray' }, { text: 'await', color: 'pink' }, { text: ' fetch', color: 'yellow' }, { text: '(', color: 'gray' }] },
      { num: 2, code: [{ text: "  'https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/webhook'", color: 'green' }, { text: ',', color: 'gray' }] },
      { num: 3, code: [{ text: '  {', color: 'gray' }] },
      { num: 4, code: [{ text: "    method", color: 'blue' }, { text: ': ', color: 'gray' }, { text: "'POST'", color: 'green' }, { text: ',', color: 'gray' }] },
      { num: 5, code: [{ text: "    headers", color: 'blue' }, { text: ': { ', color: 'gray' }, { text: "'Content-Type'", color: 'green' }, { text: ': ', color: 'gray' }, { text: "'application/json'", color: 'green' }, { text: ' },', color: 'gray' }] },
      { num: 6, code: [{ text: "    body", color: 'blue' }, { text: ': JSON.', color: 'gray' }, { text: 'stringify', color: 'yellow' }, { text: '({', color: 'gray' }] },
      { num: 7, code: [{ text: "      url", color: 'blue' }, { text: ': ', color: 'gray' }, { text: "'https://yourserver.com/webhook'", color: 'green' }, { text: ',', color: 'gray' }] },
      { num: 8, code: [{ text: "      enabled", color: 'blue' }, { text: ': ', color: 'gray' }, { text: 'true', color: 'purple' }, { text: ',', color: 'gray' }] },
      { num: 9, code: [{ text: "      webhookByEvents", color: 'blue' }, { text: ': ', color: 'gray' }, { text: 'false', color: 'purple' }] },
      { num: 10, code: [{ text: '    })', color: 'gray' }] },
      { num: 11, code: [{ text: '  }', color: 'gray' }] },
      { num: 12, code: [{ text: ');', color: 'gray' }] },
    ],
    success: '✓ Webhook configurado',
  },
] as const;

/**
 * Componente CodeAnimation - Animação de código interativa para HeroSection.
 * 
 * Exibe exemplos de código da Z-API com animação tipo-typing, transições suaves
 * e efeitos visuais inspirados em editores modernos. Posicionado no lado direito
 * do banner hero para criar interesse visual sem competir com o conteúdo principal.
 * 
 * Características:
 * - Animações respeitando prefers-reduced-motion
 * - Design system tokens (cores, espaçamentos, tipografia)
 * - Transições suaves (300ms, EASE_IN_AND_OUT)
 * - GPU-accelerated para melhor performance
 * - Responsivo (oculto em mobile, visível em desktop)
 * 
 * @returns Componente React de animação de código
 * 
 * @example
 * ```tsx
 * <CodeAnimation />
 * ```
 */
export default function CodeAnimation(): ReactNode {
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentExample, setCurrentExample] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const reducedMotion = useReducedMotion();

  // Garantir que sempre temos um código válido
  const currentCode = codeExamples[currentExample] ?? codeExamples[0];

  // Controlar animação de digitação linha por linha
  useEffect(() => {
    if (reducedMotion) {
      // Em reduced motion, mostrar todas as linhas imediatamente
      setVisibleLines(currentCode.lines.length);
      return;
    }

    const timer = setInterval(() => {
      setVisibleLines((prev) =>
        prev < currentCode.lines.length ? prev + 1 : prev
      );
    }, 180);

    return () => clearInterval(timer);
  }, [currentExample, currentCode.lines.length, reducedMotion]);

  // Transição entre exemplos
  useEffect(() => {
    if (reducedMotion) {
      // Em reduced motion, não fazer transição automática
      return undefined;
    }

    if (visibleLines === currentCode.lines.length) {
      const transitionTimer = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentExample((prev) => (prev + 1) % codeExamples.length);
          setVisibleLines(0);
          setIsTransitioning(false);
        }, 500);
      }, 3000);

      return () => clearTimeout(transitionTimer);
    }

    return undefined;
  }, [visibleLines, currentCode.lines.length, reducedMotion]);

  return (
    <div className={styles.codeAnimationWrapper}>
      {/* Glow effect - gradiente sutil atrás do editor */}
      <div className={styles.glowEffect} aria-hidden="true" />

      {/* Editor window */}
      <motion.div
        initial="hidden"
        animate={isTransitioning ? 'transitioning' : 'visible'}
        variants={createAccessibleVariants({
          hidden: {
            opacity: 0,
            y: 20,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
          transitioning: {
            opacity: 0.3,
            y: 0,
          },
        })}
        transition={{
          duration: 0.5,
          ease: [0.42, 0, 0.58, 1], // EASE_IN_AND_OUT
        }}
        className={styles.editorWindow}>
        {/* Editor header */}
        <div className={styles.editorHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.trafficLights}>
              <div className={clsx(styles.trafficLight, styles.trafficLightRed)} aria-hidden="true" />
              <div className={clsx(styles.trafficLight, styles.trafficLightYellow)} aria-hidden="true" />
              <div className={clsx(styles.trafficLight, styles.trafficLightGreen)} aria-hidden="true" />
            </div>
            <span className={styles.filename}>{currentCode.filename}</span>
          </div>

          {/* Progress indicators */}
          <div className={styles.progressIndicators} aria-label="Exemplos de código">
            {codeExamples.map((_, index) => (
              <div
                key={index}
                className={clsx(
                  styles.progressDot,
                  index === currentExample && styles.progressDotActive
                )}
                aria-current={index === currentExample ? 'step' : undefined}
                aria-label={`Exemplo ${index + 1} de ${codeExamples.length}`}
              />
            ))}
          </div>
        </div>

        {/* Code content */}
        <div className={styles.codeContent}>
          {currentCode.lines.map((line, index) => (
            <motion.div
              key={`${currentExample}-${line.num}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: visibleLines > index ? 1 : 0,
                x: visibleLines > index ? 0 : -20,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.3,
                delay: reducedMotion ? 0 : index * 0.15,
                ease: [0.42, 0, 0.58, 1], // EASE_IN_AND_OUT
              }}
              className={styles.codeLine}>
              {/* Line number */}
              <span className={styles.lineNumber} aria-hidden="true">
                {line.num}
              </span>

              {/* Code line */}
              <div className={styles.codeTokens}>
                {line.code.map((token, tokenIndex) => (
                  <span
                    key={tokenIndex}
                    className={clsx(styles.token, styles[`token${token.color.charAt(0).toUpperCase() + token.color.slice(1)}`])}>
                    {token.text}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Cursor blink */}
          {visibleLines === currentCode.lines.length &&
            !isTransitioning &&
            !reducedMotion && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={styles.cursor}
                aria-hidden="true"
              />
            )}
        </div>

        {/* Success response indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity:
              visibleLines === currentCode.lines.length && !isTransitioning
                ? 1
                : 0,
            y:
              visibleLines === currentCode.lines.length && !isTransitioning
                ? 0
                : 10,
          }}
          transition={{
            delay: reducedMotion ? 0 : 0.5,
            duration: reducedMotion ? 0 : 0.3,
            ease: [0.42, 0, 0.58, 1], // EASE_IN_AND_OUT
          }}
          className={styles.successIndicator}>
          <div className={styles.successIcon} aria-hidden="true" />
          <span className={styles.successText}>{currentCode.success}</span>
        </motion.div>
      </motion.div>

      {/* Floating particles - apenas em desktop e sem reduced motion */}
      {!reducedMotion && (
        <div className={styles.particlesContainer} aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className={styles.particle}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${50 + Math.random() * 50}%`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

