import clsx from 'clsx';
import { useState, type ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Links de skip disponíveis
 */
type SkipLink = {
  /** ID do elemento alvo */
  targetId: string;
  /** Texto do link */
  label: string;
  /** Ordem de exibição */
  order?: number;
};

/**
 * Links padrão de skip
 */
const DEFAULT_SKIP_LINKS: SkipLink[] = [
  { targetId: 'main-content', label: 'Pular para conteúdo principal', order: 1 },
  { targetId: 'main-navigation', label: 'Pular para navegação principal', order: 2 },
  { targetId: 'sidebar-navigation', label: 'Pular para navegação da documentação', order: 3 },
];

/**
 * Props do componente SkipLinks
 */
type SkipLinksProps = {
  /** Links customizados (opcional) */
  links?: SkipLink[];
  /** Classe CSS adicional */
  className?: string;
};

/**
 * Componente SkipLinks - Links para pular seções da página.
 * 
 * Componente acessível que permite usuários de teclado e screen readers
 * pular para seções principais da página (conteúdo, navegação, etc.).
 * 
 * Os links aparecem apenas quando recebem foco via teclado (Tab).
 * 
 * @param props - Props do componente SkipLinks
 * @param props.links - Links customizados (opcional)
 * @param props.className - Classe CSS adicional
 * @returns Componente React renderizado
 * 
 * @example
 * ```tsx
 * // Usar links padrão
 * <SkipLinks />
 * 
 * // Links customizados
 * <SkipLinks links={[
 *   { targetId: 'main-content', label: 'Ir para conteúdo', order: 1 },
 *   { targetId: 'sidebar', label: 'Ir para sidebar', order: 2 }
 * ]} />
 * ```
 */
export default function SkipLinks({ links = DEFAULT_SKIP_LINKS, className }: SkipLinksProps): ReactNode {
  const [isVisible, setIsVisible] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Ordenar links
  const sortedLinks = [...links].sort((a, b) => (a.order || 0) - (b.order || 0));

  /**
   * Handler para foco em qualquer link
   */
  const handleFocus = (index: number) => {
    setIsVisible(true);
    setFocusedIndex(index);
  };

  /**
   * Handler para blur (quando sai do foco)
   */
  const handleBlur = () => {
    // Delay para permitir navegação entre links
    setTimeout(() => {
      setFocusedIndex(null);
      // Esconder apenas se nenhum link estiver focado
      if (document.activeElement?.closest(`.${styles.skipLinks}`) === null) {
        setIsVisible(false);
      }
    }, 100);
  };

  /**
   * Handler para click no link
   */
  const handleClick = (targetId: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const target = document.getElementById(targetId);
    if (target) {
      // Adicionar tabindex temporário se necessário
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      
      // Focar no elemento alvo
      target.focus();
      
      // Scroll suave para o elemento
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Remover tabindex após um tempo (opcional)
      setTimeout(() => {
        if (target.getAttribute('tabindex') === '-1') {
          target.removeAttribute('tabindex');
        }
      }, 1000);
    }
  };

  return (
    <nav
      className={clsx(styles.skipLinks, isVisible && styles.visible, className)}
      aria-label="Links de navegação rápida">
      <ul className={styles.skipLinksList}>
        {sortedLinks.map((link, index) => (
          <li key={link.targetId}>
            <a
              href={`#${link.targetId}`}
              className={clsx(
                styles.skipLink,
                focusedIndex === index && styles.focused
              )}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              onClick={(e) => handleClick(link.targetId, e)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

