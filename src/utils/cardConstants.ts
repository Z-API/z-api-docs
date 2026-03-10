/**
 * Constantes para componentes Card
 * 
 * Define valores padrão e opções padronizadas para uso em cards
 */

/**
 * Textos padronizados para links de cards
 */
export const CARD_LINK_TEXTS = {
  /** Texto padrão para links de documentação e guias */
  LEARN_MORE: 'Saiba mais',
  /** Texto para links de recursos externos (blog, tutoriais) */
  ACCESS: 'Acessar',
  /** Texto para links de documentação técnica */
  VIEW_DOCS: 'Ver documentação',
  /** Texto para links de exemplos */
  VIEW_EXAMPLES: 'Ver exemplos',
} as const;

/**
 * Tipo para textos de link de card
 */
export type CardLinkText = typeof CARD_LINK_TEXTS[keyof typeof CARD_LINK_TEXTS];

/**
 * Texto padrão para links de cards
 * Usado quando linkText não é fornecido
 */
export const DEFAULT_CARD_LINK_TEXT: CardLinkText = CARD_LINK_TEXTS.LEARN_MORE;

/**
 * Mapeamento de contexto para texto de link recomendado
 * 
 * @param context - Contexto do card
 * @returns Texto de link recomendado
 */
export function getRecommendedLinkText(context: 'documentation' | 'blog' | 'tutorial' | 'example'): CardLinkText {
  const contextMap: Record<string, CardLinkText> = {
    documentation: CARD_LINK_TEXTS.LEARN_MORE,
    blog: CARD_LINK_TEXTS.ACCESS,
    tutorial: CARD_LINK_TEXTS.ACCESS,
    example: CARD_LINK_TEXTS.VIEW_EXAMPLES,
  };
  
  return contextMap[context] || DEFAULT_CARD_LINK_TEXT;
}

