import { FormEvent, useState } from 'react';
import styles from './styles.module.css';

/**
 * Subscribe Component - Formulário de assinatura do blog
 * 
 * Integra com serviço externo (Mailchimp, ConvertKit, etc.) sem backend próprio.
 * Por padrão, usa um link externo para o formulário de assinatura.
 * 
 * @example
 * ```tsx
 * <Subscribe 
 *   serviceUrl="https://example.com/subscribe"
 *   placeholder="Seu email"
 *   buttonText="Assinar"
 * />
 * ```
 */
export interface SubscribeProps {
  /** URL do serviço externo de assinatura */
  serviceUrl?: string;
  /** Placeholder do campo de email */
  placeholder?: string;
  /** Texto do botão */
  buttonText?: string;
  /** Título da seção */
  title?: string;
  /** Descrição da seção */
  description?: string;
}

/**
 * Componente Subscribe para formulário de assinatura do blog
 */
export function Subscribe({
  serviceUrl = 'https://business.whatsapp.com/blog',
  placeholder = 'Seu email',
  buttonText = 'Assinar',
  title = 'Receba as últimas novidades do Z-API Central',
  description = 'Inscreva-se para receber nossos últimos guias, insights e inspiração para fazer mais com conversas.',
}: SubscribeProps): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Se serviceUrl for um link externo, redireciona
    if (serviceUrl && serviceUrl.startsWith('http')) {
      window.open(serviceUrl, '_blank', 'noopener,noreferrer');
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    } else {
      // Aqui você pode integrar com API externa se necessário
      // TODO: Integrar com serviço de assinatura (Mailchimp, ConvertKit, etc.)
      // Em desenvolvimento, use DevTools Network tab para ver requisições
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className={styles.subscribe} aria-labelledby="subscribe-heading">
      <div className={styles.container}>
        <h2 id="subscribe-heading" className={styles.title}>
          {title}
        </h2>
        <p className={styles.description}>{description}</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="subscribe-email" className={styles.label}>
              Email
            </label>
            <input
              id="subscribe-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className={styles.input}
              aria-required="true"
              aria-describedby="subscribe-description"
            />
          </div>
          <button
            type="submit"
            className={styles.button}
            disabled={submitted}
            aria-label={buttonText}
          >
            {submitted ? '✓ Inscrito!' : buttonText}
          </button>
        </form>
        {submitted && (
          <p className={styles.success} role="status" aria-live="polite">
            Obrigado por se inscrever! Redirecionando...
          </p>
        )}
      </div>
    </section>
  );
}

export default Subscribe;

