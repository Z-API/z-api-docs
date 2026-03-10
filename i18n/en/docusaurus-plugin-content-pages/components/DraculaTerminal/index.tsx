import { useReducedMotion } from '@site/src/hooks/useReducedMotion';
import { Terminal } from 'lucide-react';
import { type ReactElement, useEffect, useState } from 'react';
import styles from './styles.module.css';

type CodeExample = {
  title: string;
  code: string;
  response: string;
};

const codeExamples: CodeExample[] = [
  {
    title: 'Enviar Mensagem de Texto',
    code: `curl -X POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone": "5511999999999",
    "message": "Olá! Mensagem enviada via Z-API 🚀"
  }'`,
    response: `{
  "status": "success",
  "messageId": "3EB0ABCD1234567890"
}`,
  },
  {
    title: 'Enviar Imagem',
    code: `curl -X POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-image \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone": "5511999999999",
    "image": "https://example.com/image.jpg",
    "caption": "Confira esta imagem! 📸"
  }'`,
    response: `{
  "status": "success",
  "messageId": "3EB0DCBA0987654321"
}`,
  },
  {
    title: 'Enviar Documento',
    code: `curl -X POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-document \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone": "5511999999999",
    "document": "https://example.com/doc.pdf",
    "fileName": "documento.pdf"
  }'`,
    response: `{
  "status": "success",
  "messageId": "3EB0EFGH9876543210"
}`,
  },
  {
    title: 'Criar Grupo',
    code: `curl -X POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/group/create \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject": "Grupo Z-API",
    "participants": ["5511999999999", "5511888888888"]
  }'`,
    response: `{
  "status": "success",
  "groupId": "120363123456789012@g.us",
  "groupName": "Grupo Z-API"
}`,
  },
  {
    title: 'Webhook - Receber Mensagens',
    code: `curl -X POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/webhook \\
  -H "Content-Type: application/json" \\
  -d '{
    "webhook": "https://seu-servidor.com/webhook",
    "events": ["message-received"]
  }'`,
    response: `{
  "status": "configured",
  "webhook": "https://seu-servidor.com/webhook"
}`,
  },
  {
    title: 'Verificar Status da Instância',
    code: `curl -X GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/status`,
    response: `{
  "connected": true,
  "session": "active",
  "smartphoneConnected": true,
  "batteryLevel": 85,
  "qrCode": null
}`,
  },
  {
    title: 'Enviar Lista de Transmissão',
    code: `curl -X POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-broadcast \\
  -H "Content-Type: application/json" \\
  -d '{
    "phones": ["5511999999999", "5511888888888"],
    "message": "Mensagem para múltiplos contatos"
  }'`,
    response: `{
  "status": "success",
  "sent": 2,
  "failed": 0,
  "messageIds": ["3EB0IJKL...", "3EB0MNOP..."]
}`,
  },
];

/**
 * Props do DraculaTerminal.
 *
 * @property ignoreReducedMotion - Quando true, força animação mesmo se
 * `prefers-reduced-motion` estiver ativado. Use com cuidado e apenas
 * em contextos onde a animação é crítica para a hero section.
 */
type DraculaTerminalProps = {
  ignoreReducedMotion?: boolean;
};

/**
 * DraculaTerminal
 *
 * Terminal animado inspirado no tema Dracula para demonstrar chamadas
 * em CLI do Z-API.
 *
 * - Usa design fixo em monoespaçada com cores do tema Dracula
 * - Animação de digitação para comando + resposta
 * - Respeita prefers-reduced-motion por padrão: sem typing nem cursor blink
 * - Pode opcionalmente ignorar prefers-reduced-motion via prop
 *
 * Pode ser usado em qualquer página MDX:
 *
 * ```tsx
 * import DraculaTerminal from '@site/src/components/DraculaTerminal';
 *
 * <DraculaTerminal />
 * <DraculaTerminal ignoreReducedMotion />
 * ```
 */
export default function DraculaTerminal({
  ignoreReducedMotion,
}: DraculaTerminalProps): ReactElement {
  const [currentExample, setCurrentExample] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [isTypingCode, setIsTypingCode] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const systemReducedMotion = useReducedMotion();
  const reducedMotion = ignoreReducedMotion ? false : systemReducedMotion;

  const currentExampleData = (codeExamples[currentExample] ??
    codeExamples[0]) as CodeExample;

  // Garantir que o componente só renderize conteúdo dinâmico após hidratação
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Cursor blink effect (desativado em prefers-reduced-motion)
  useEffect(() => {
    if (reducedMotion) {
      setCursorVisible(false);
      return undefined;
    }

    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Typing animation (respeitando prefers-reduced-motion)
  useEffect(() => {
    // Só executar após montagem para evitar problemas de hidratação
    if (!isMounted) {
      return undefined;
    }

    if (reducedMotion) {
      // Sem animação: mostra tudo de uma vez
      setDisplayedText(currentExampleData.code);
      setDisplayedResponse(currentExampleData.response);
      setIsTypingCode(false);
      return undefined;
    }

    let currentIndex = 0;
    let currentText = '';
    const fullText = isTypingCode
      ? currentExampleData.code
      : currentExampleData.response;

    // Velocidade de digitação adaptativa: mais rápida para comandos curtos
    const typingSpeed = fullText.length < 100 ? 15 : 20;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];

        if (isTypingCode) {
          setDisplayedText(currentText);
        } else {
          setDisplayedResponse(currentText);
        }

        currentIndex += 1;
      } else {
        clearInterval(typingInterval);

        if (isTypingCode) {
          // Finished typing code, now type response
          setTimeout(() => {
            setIsTypingCode(false);
          }, 400);
        } else {
          // Finished typing response, move to next example
          setTimeout(() => {
            setCurrentExample((prev) => (prev + 1) % codeExamples.length);
            setDisplayedText('');
            setDisplayedResponse('');
            setIsTypingCode(true);
          }, 2500);
        }
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [currentExampleData, isTypingCode, reducedMotion, isMounted]);

  return (
    <div 
      className={styles.terminalWrapper} 
      role="region"
      aria-label={`Terminal de exemplo Z-API - ${currentExampleData.title}`}
      aria-live="polite"
      aria-atomic="false">
      {/* Header do terminal */}
      <div className={styles.terminalHeader}>
        <div className={styles.headerLeft}>
          <Terminal className="terminal-icon" size={16} color="#bd93f9" aria-hidden="true" />
          <span className={styles.title}>Z-API Terminal</span>
        </div>
        <div className={styles.controls} aria-hidden="true">
          <div className={`${styles.controlDot} ${styles.controlDotClose}`} />
          <div className={`${styles.controlDot} ${styles.controlDotMinimize}`} />
          <div className={`${styles.controlDot} ${styles.controlDotMaximize}`} />
        </div>
      </div>

      {/* Conteúdo do terminal */}
      <div className={styles.terminalBody}>
        {/* Linha de título */}
        <div className={styles.titleLine}>
          <span className={styles.titlePromptSymbol}>~</span>
          <span className={styles.titlePromptArrow}> $ </span>
          <span className={styles.titlePromptText}># {currentExampleData.title}</span>
        </div>

        {/* Comando */}
        <div className={styles.commandLine}>
          <span className={styles.commandArrow}>→ </span>
          <span className={styles.commandText} suppressHydrationWarning>
            {isMounted ? displayedText : currentExampleData.code}
            {isMounted && isTypingCode && cursorVisible && !reducedMotion && (
              <span className={styles.cursor} aria-hidden="true" />
            )}
          </span>
        </div>

        {/* Resposta */}
        {(isMounted ? displayedResponse : currentExampleData.response) && (
          <div className={styles.responseBlock} suppressHydrationWarning>
            <div className={styles.responseLabel}>// Response:</div>
            <div className={styles.responseText}>
              {isMounted ? displayedResponse : currentExampleData.response}
              {isMounted && !isTypingCode && cursorVisible && !reducedMotion && (
                <span className={styles.cursorResponse} aria-hidden="true" />
              )}
            </div>
          </div>
        )}

        {/* Indicador de progresso entre exemplos */}
        <div
          className={styles.progressDots}
          aria-label="Exemplos de comandos Z-API"
        >
          {codeExamples.map((_, index) => (
            <div
              key={index}
              className={`${styles.progressDot} ${
                index === currentExample ? styles.progressDotActive : ''
              }`}
              aria-current={index === currentExample ? 'step' : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


