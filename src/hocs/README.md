# Higher Order Components (HOCs)

Este diretório contém Higher Order Components (HOCs) seguindo o padrão do React conforme [patterns.dev](https://www.patterns.dev/react/hoc-pattern/).

## O que são HOCs?

Um Higher Order Component (HOC) é uma função que recebe um componente e retorna um novo componente com funcionalidade adicional. HOCs permitem reutilizar lógica de componentes sem duplicação de código.

## HOCs Disponíveis

### `withRipple`

Adiciona efeito ripple (ondulação) a qualquer componente clicável.

```tsx
import { withRipple } from '@site/src/hocs';

const CardWithRipple = withRipple(Card);

<CardWithRipple title="Meu Card" />
```

**Props adicionadas:**
- `ripples`: Array de ripples ativos
- `handleRippleClick`: Handler de click que cria ripple
- `rippleClassName`: Classe CSS customizada

**Opções:**
- `duration`: Duração da animação em ms (padrão: 600)
- `disabled`: Desabilitar ripple
- `rippleClassName`: Classe CSS customizada

### `withLoader`

Adiciona estado de carregamento e fetch de dados a qualquer componente.

```tsx
import { withLoader } from '@site/src/hocs';

const ZApiFeatureImagesWithLoader = withLoader(
  ZApiFeatureImages,
  {
    url: '/api/feature-images',
    loadingText: 'Carregando features...'
  }
);

<ZApiFeatureImagesWithLoader />
```

**Props adicionadas:**
- `data`: Dados carregados (disponível após loading)
- `isLoading`: Se está carregando
- `error`: Erro ocorrido durante carregamento

**Opções:**
- `url`: URL para fetch de dados
- `fetchFn`: Função customizada para fetch
- `loadingSize`: Tamanho do spinner ('sm' | 'md' | 'lg')
- `loadingVariant`: Variante do loading ('spinner' | 'dots' | 'pulse' | 'skeleton')
- `loadingText`: Texto do loading
- `fullscreen`: Se deve mostrar loading em fullscreen
- `LoadingComponent`: Componente customizado de loading
- `ErrorComponent`: Componente customizado de erro

### `withErrorBoundary`

Adiciona Error Boundary a qualquer componente para capturar erros.

```tsx
import { withErrorBoundary } from '@site/src/hocs';

const MyComponentWithErrorBoundary = withErrorBoundary(MyComponent, {
  onError: (error, errorInfo) => {
    console.error('Erro capturado:', error);
  }
});

<MyComponentWithErrorBoundary />
```

**Opções:**
- `onError`: Callback quando erro ocorre
- `FallbackComponent`: Componente de fallback customizado
- `errorMessage`: Mensagem de erro customizada

## Composição de HOCs

Você pode compor múltiplos HOCs para adicionar várias funcionalidades:

```tsx
const MyComponent = withErrorBoundary(
  withLoader(
    withRipple(OriginalComponent, { duration: 800 }),
    { url: '/api/data', loadingText: 'Carregando...' }
  ),
  { onError: (error) => console.error(error) }
);
```

## Quando Usar HOCs vs Hooks

### Use HOCs quando:
- A mesma lógica **não customizada** precisa ser usada por muitos componentes
- O componente pode funcionar standalone, sem a lógica adicional
- Você precisa adicionar funcionalidade a componentes de terceiros

### Use Hooks quando:
- A lógica precisa ser **customizada** para cada componente
- A lógica não é usada em muitos componentes
- Você quer evitar "wrapper hell" (aninhamento profundo)

## Referências

- [React HOC Pattern - patterns.dev](https://www.patterns.dev/react/hoc-pattern/)
- [Higher-Order Components - React Docs](https://react.dev/reference/react/higher-order-components)
