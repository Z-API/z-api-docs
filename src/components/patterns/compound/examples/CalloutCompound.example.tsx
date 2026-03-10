/**
 * Exemplo de uso do Callout Compound Pattern
 * 
 * Demonstra diferentes formas de usar o Callout com Compound Pattern
 */

import Callout from '@site/src/components/shared/Callout/CalloutCompound';
import { Info, AlertTriangle, XCircle } from 'lucide-react';

/**
 * Exemplo 1: Callout completo com ícone, título e corpo
 */
export function CalloutCompleteExample() {
  return (
    <Callout variant="info">
      <Callout.Icon><Info size={20} /></Callout.Icon>
      <Callout.Title>Informação Importante</Callout.Title>
      <Callout.Body>
        Esta é uma mensagem informativa usando Compound Pattern.
        O conteúdo pode ser tão extenso quanto necessário.
      </Callout.Body>
    </Callout>
  );
}

/**
 * Exemplo 2: Callout apenas com título e corpo
 */
export function CalloutSimpleExample() {
  return (
    <Callout variant="success">
      <Callout.Title>Sucesso!</Callout.Title>
      <Callout.Body>
        Operação realizada com sucesso.
      </Callout.Body>
    </Callout>
  );
}

/**
 * Exemplo 3: Callout de aviso
 */
export function CalloutWarningExample() {
  return (
    <Callout variant="warning">
      <Callout.Icon><AlertTriangle size={20} /></Callout.Icon>
      <Callout.Title>Atenção</Callout.Title>
      <Callout.Body>
        Esta operação não pode ser desfeita. Por favor, confirme antes de continuar.
      </Callout.Body>
    </Callout>
  );
}

/**
 * Exemplo 4: Callout de erro
 */
export function CalloutErrorExample() {
  return (
    <Callout variant="error">
      <Callout.Icon><XCircle size={20} /></Callout.Icon>
      <Callout.Title>Erro</Callout.Title>
      <Callout.Body>
        Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.
      </Callout.Body>
    </Callout>
  );
}
