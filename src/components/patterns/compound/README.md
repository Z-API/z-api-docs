# Compound Pattern

Este diretório contém exemplos e implementações do padrão Compound Components conforme [patterns.dev](https://www.patterns.dev/react/compound-pattern/).

## O que é o Compound Pattern?

O Compound Pattern permite criar componentes flexíveis onde múltiplos sub-componentes trabalham juntos através de uma API compartilhada. Cada sub-componente pode ser usado de forma independente, mas eles compartilham estado e contexto através do componente pai.

### Características

- **Flexibilidade**: Permite composição flexível de componentes
- **API Expressiva**: API mais declarativa e intuitiva
- **Reutilização**: Sub-componentes podem ser reutilizados
- **Composição**: Permite diferentes combinações de sub-componentes

## Componentes Implementados

### Card Compound

**Localização**: `src/components/shared/Card/CardCompound.tsx`

**Sub-componentes**:
- `Card.Header` - Cabeçalho do card
- `Card.Icon` - Ícone do card
- `Card.Body` - Corpo do card
- `Card.Title` - Título do card
- `Card.Description` - Descrição do card
- `Card.Footer` - Rodapé do card
- `Card.Link` - Link do card

**Exemplo de Uso**:

```tsx
import { CardCompound as Card } from '@site/src/components/shared/Card';

// Uso básico
<Card to="/docs/intro" theme="classic">
  <Card.Header>
    <Card.Icon icon={<BookIcon />} />
    <Card.Title>Documentação</Card.Title>
  </Card.Header>
  <Card.Body>
    <Card.Description>
      Explore nossa documentação completa da API Z-API
    </Card.Description>
  </Card.Body>
  <Card.Footer>
    <Card.Link>Acessar →</Card.Link>
  </Card.Footer>
</Card>

// Uso simplificado (sem footer)
<Card to="/docs/api">
  <Card.Icon icon={<ApiIcon />} />
  <Card.Title>API Reference</Card.Title>
  <Card.Description>Documentação completa da API</Card.Description>
</Card>
```

### Callout Compound

**Localização**: `src/components/shared/Callout/CalloutCompound.tsx`

**Sub-componentes**:
- `Callout.Icon` - Ícone do callout
- `Callout.Title` - Título do callout
- `Callout.Body` - Corpo do callout

**Exemplo de Uso**:

```tsx
import { CalloutCompound as Callout } from '@site/src/components/shared/Callout';
import { Info } from 'lucide-react';

// Uso básico
<Callout variant="info">
  <Callout.Icon><Info size={20} /></Callout.Icon>
  <Callout.Title>Informação Importante</Callout.Title>
  <Callout.Body>
    Esta é uma mensagem informativa usando Compound Pattern.
  </Callout.Body>
</Callout>

// Sem ícone
<Callout variant="warning">
  <Callout.Title>Atenção</Callout.Title>
  <Callout.Body>
    Esta operação não pode ser desfeita.
  </Callout.Body>
</Callout>
```

## Quando Usar Compound Pattern?

**Use quando**:
- Componente tem múltiplas partes relacionadas
- Precisa de flexibilidade na composição
- Quer API mais expressiva e declarativa
- Sub-componentes precisam compartilhar contexto

**Não use quando**:
- Componente é muito simples
- Não há necessidade de composição flexível
- API simples com props é suficiente

## Vantagens do Compound Pattern

1. **Flexibilidade**: Permite diferentes combinações de sub-componentes
2. **API Expressiva**: Código mais legível e declarativo
3. **Reutilização**: Sub-componentes podem ser reutilizados
4. **Manutenibilidade**: Mais fácil de manter e estender

## Comparação: Props vs Compound

### Antes (Props):
```tsx
<Card
  icon={<BookIcon />}
  title="Documentação"
  description="Explore nossa documentação"
  link="/docs"
  linkText="Acessar →"
/>
```

### Depois (Compound Pattern):
```tsx
<Card to="/docs">
  <Card.Header>
    <Card.Icon icon={<BookIcon />} />
    <Card.Title>Documentação</Card.Title>
  </Card.Header>
  <Card.Body>
    <Card.Description>Explore nossa documentação</Card.Description>
  </Card.Body>
  <Card.Footer>
    <Card.Link>Acessar →</Card.Link>
  </Card.Footer>
</Card>
```

**Vantagens**:
- Mais flexível (pode omitir partes)
- Mais expressivo (estrutura clara)
- Mais fácil de estender (adicionar novos sub-componentes)

## Implementação Técnica

### Context API

O Compound Pattern usa Context API para compartilhar estado entre sub-componentes:

```tsx
const CardContext = createContext<CardContextType | null>(null);

function useCardContext() {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('Card sub-components must be used within Card component');
  }
  return context;
}
```

### Composição de Componentes

Sub-componentes são anexados ao componente principal:

```tsx
CardCompound.Header = CardHeader;
CardCompound.Icon = CardIcon;
CardCompound.Body = CardBody;
// ...
```

## Referências

- [Compound Pattern - patterns.dev](https://www.patterns.dev/react/compound-pattern/)
- [React Compound Components](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [React Context API](https://react.dev/reference/react/useContext)

---

**Versão**: 1.0.0  
**Data**: 2025-01-30
