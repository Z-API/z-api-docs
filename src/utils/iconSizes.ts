import type { ButtonSize } from '@site/src/components/shared/Button/AnimatedButtonLink';
import type { AnimatedIconSize } from '@site/src/components/shared/Icon/AnimatedIcon';

/**
 * Sistema de tamanhos de ícone por contexto
 * 
 * Define tamanhos consistentes de ícones baseados no contexto de uso:
 * - Card: Ícones em cards pequenos/médios
 * - Feature: Ícones em cards de features (maior destaque)
 * - Button: Ícones em botões (proporcionais ao tamanho do botão)
 */

/**
 * Tamanho de ícone para componentes Card
 * Cards usam ícones médios-grandes para boa visibilidade sem dominar o card
 */
export const CARD_ICON_SIZE: AnimatedIconSize = 'lg'; // 24px

/**
 * Tamanho de ícone para componentes Feature
 * Features usam ícones grandes para maior destaque visual
 */
export const FEATURE_ICON_SIZE: AnimatedIconSize = 'xl'; // 32px

/**
 * Mapeamento de tamanho de botão para tamanho de ícone
 * Garante proporção visual consistente entre botão e ícone
 * 
 * @param buttonSize - Tamanho do botão
 * @returns Tamanho de ícone proporcional
 */
export function getButtonIconSize(buttonSize: ButtonSize): AnimatedIconSize {
  const sizeMap: Record<ButtonSize, AnimatedIconSize> = {
    sm: 'sm', // 16px para botão pequeno
    md: 'md', // 20px para botão médio
    lg: 'lg', // 24px para botão grande
  };
  
  return sizeMap[buttonSize];
}

/**
 * Valida se um tamanho de ícone é válido para um contexto específico
 * 
 * @param size - Tamanho do ícone
 * @param context - Contexto de uso ('card' | 'feature' | 'button')
 * @returns true se o tamanho é apropriado para o contexto
 */
export function isValidIconSizeForContext(
  size: AnimatedIconSize,
  context: 'card' | 'feature' | 'button'
): boolean {
  const validSizes: Record<string, AnimatedIconSize[]> = {
    card: ['md', 'lg', 'xl'],
    feature: ['lg', 'xl'],
    button: ['xs', 'sm', 'md', 'lg'],
  };
  
  const contextSizes = validSizes[context];
  return contextSizes ? contextSizes.includes(size) : false;
}

