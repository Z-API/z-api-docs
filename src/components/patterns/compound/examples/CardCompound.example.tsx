/**
 * Exemplo de uso do Card Compound Pattern
 * 
 * Demonstra diferentes formas de usar o Card com Compound Pattern
 */

import Card from '@site/src/components/shared/Card/CardCompound';

/**
 * Exemplo 1: Card completo com todos os sub-componentes
 */
export function CardCompleteExample() {
  return (
    <Card to="/docs/intro" theme="classic">
      <Card.Header>
        <Card.Icon icon={<BookIcon />} />
        <Card.Title>Documentação Completa</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Description>
          Explore nossa documentação completa da API Z-API com exemplos práticos e guias detalhados.
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Card.Link>Acessar Documentação →</Card.Link>
      </Card.Footer>
    </Card>
  );
}

/**
 * Exemplo 2: Card simplificado sem footer
 */
export function CardSimpleExample() {
  return (
    <Card to="/docs/api" theme="classic">
      <Card.Icon icon={<ApiIcon />} />
      <Card.Title>API Reference</Card.Title>
      <Card.Description>
        Documentação completa da API REST da Z-API
      </Card.Description>
    </Card>
  );
}

/**
 * Exemplo 3: Card com header customizado
 */
export function CardCustomHeaderExample() {
  return (
    <Card to="/docs/examples" theme="official">
      <Card.Header>
        <Card.Icon icon={<CodeIcon />} />
        <Card.Title>Exemplos de Código</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Description>
          Exemplos práticos e snippets de código para integração rápida.
        </Card.Description>
      </Card.Body>
    </Card>
  );
}

/**
 * Exemplo 4: Card sem link (apenas visual)
 */
export function CardNoLinkExample() {
  return (
    <Card theme="classic" onClick={() => {
      // Exemplo: handler de clique
      // Em produção, executar ação desejada
    }}>
      <Card.Header>
        <Card.Icon icon={<InfoIcon />} />
        <Card.Title>Informação</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Description>
          Este card não tem link, apenas onClick handler.
        </Card.Description>
      </Card.Body>
    </Card>
  );
}

// Ícones Lucide
import { BookOpen, Plug, Code, Info } from 'lucide-react';

function BookIcon() { return <BookOpen size={24} />; }
function ApiIcon() { return <Plug size={24} />; }
function CodeIcon() { return <Code size={24} />; }
function InfoIcon() { return <Info size={24} />; }
