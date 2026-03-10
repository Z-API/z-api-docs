import React from 'react';
import HighlightBox, { HighlightBoxProps } from './HighlightBox';

export interface PhoneDisplayProps extends Omit<HighlightBoxProps, 'variant' | 'icon'> {
  /**
   * Número de telefone a ser exibido
   */
  phone: string;
  /**
   * Se deve formatar o número (DDI + DDD + Número)
   * @default false
   */
  format?: boolean;
}

/**
 * Componente especializado para exibir números de telefone
 * 
 * @example
 * ```tsx
 * <PhoneDisplay 
 *   phone="5511999999999"
 *   instructionText="Número no formato internacional"
 * />
 * ```
 */
export default function PhoneDisplay({
  phone,
  format = false,
  instructionText,
  ...props
}: PhoneDisplayProps): React.JSX.Element {
  // Formatação opcional: 5511999999999 -> +55 11 99999-9999
  const displayPhone = format && phone.length >= 10
    ? `+${phone.slice(0, 2)} ${phone.slice(2, 4)} ${phone.slice(4, 9)}-${phone.slice(9)}`
    : phone;

  return (
    <HighlightBox
      variant="phone"
      icon="Phone"
      instructionText={instructionText}
      copyText={phone} // Sempre copiar o número original (sem formatação)
      {...props}
    >
      {displayPhone}
    </HighlightBox>
  );
}
