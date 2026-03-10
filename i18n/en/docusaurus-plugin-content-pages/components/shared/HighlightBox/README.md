# HighlightBox - Módulo Global de Destaque

Componente base reutilizável para destacar informações importantes na documentação, com suporte a múltiplas variantes e funcionalidade de cópia.

## Características

- ✨ **Design Moderno**: Interface limpa e profissional
- 🎨 **Múltiplas Variantes**: Endpoint, URL, Token, Code, Header, Parameter
- 📋 **Cópia Interativa**: Funcionalidade de copiar para clipboard
- 🌓 **Dark Mode**: Suporte completo a modo claro e escuro
- ♿ **Acessível**: Suporte a navegação por teclado e screen readers
- 📱 **Responsivo**: Adaptado para diferentes tamanhos de tela
- 🎯 **Flexível**: Componente base extensível

## Componentes Disponíveis

### HighlightBox (Base)

Componente base reutilizável que pode ser usado para qualquer tipo de destaque.

```tsx
import HighlightBox from '@site/src/components/shared/HighlightBox';

<HighlightBox variant="endpoint" instructionText="Endpoint da API">
  POST /instances/{instanceId}/token/{token}/send-text
</HighlightBox>
```

### EndpointDisplay

Componente especializado para exibir endpoints HTTP.

```tsx
import EndpointDisplay from '@site/src/components/shared/HighlightBox/EndpointDisplay';

<EndpointDisplay 
  method="POST"
  endpoint="/instances/{instanceId}/token/{token}/send-text"
  instructionText="Endpoint para enviar mensagem de texto"
/>
```

### UrlDisplay

Componente especializado para exibir URLs.

```tsx
import UrlDisplay from '@site/src/components/shared/HighlightBox/UrlDisplay';

<UrlDisplay 
  url="https://api.z-api.io/instances/{instanceId}/status"
  instructionText="URL base da API"
/>
```

### TokenDisplay

Componente especializado para exibir tokens.

```tsx
import TokenDisplay from '@site/src/components/shared/HighlightBox/TokenDisplay';

<TokenDisplay 
  token="Client-Token"
  instructionText="Use este token no header"
/>
```

### ClientTokenDisplay

Componente especializado para exibir o Client-Token da API Z-API.
Agora parte do módulo global HighlightBox, mantendo compatibilidade com a API anterior.

```tsx
import { ClientTokenDisplay } from '@site/src/components/shared/HighlightBox';

<ClientTokenDisplay 
  instructionText="Verifique se está usando o token correto no header"
  variant="highlighted"
/>
```

**Compatibilidade**: O componente mantém a mesma API da versão anterior, mas agora usa o HighlightBox como base.

## Variantes

### Endpoint

Para exibir endpoints HTTP:

```tsx
<HighlightBox variant="endpoint">
  POST /instances/{instanceId}/token/{token}/send-text
</HighlightBox>
```

### URL

Para exibir URLs completas:

```tsx
<HighlightBox variant="url">
  https://api.z-api.io/instances/{instanceId}/status
</HighlightBox>
```

### Token

Para exibir tokens e chaves:

```tsx
<HighlightBox variant="token">
  Client-Token
</HighlightBox>
```

### Code

Para destacar códigos importantes:

```tsx
<HighlightBox variant="code">
  const instanceId = 'SUA_INSTANCE_ID';
</HighlightBox>
```

### Header

Para exibir headers HTTP:

```tsx
<HighlightBox variant="header">
  Client-Token: seu-token-aqui
</HighlightBox>
```

### Parameter

Para exibir parâmetros:

```tsx
<HighlightBox variant="parameter">
  phone: "5511999999999"
</HighlightBox>
```

### Compact

Versão compacta:

```tsx
<HighlightBox variant="compact">
  Texto compacto
</HighlightBox>
```

### Highlighted

Versão destacada:

```tsx
<HighlightBox variant="highlighted">
  Informação importante
</HighlightBox>
```

## Props do HighlightBox

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `children` | `React.ReactNode` | - | Conteúdo a ser exibido |
| `instructionText` | `string` | `undefined` | Texto instrucional acima do conteúdo |
| `variant` | `HighlightBoxVariant` | `'default'` | Variante visual |
| `copyable` | `boolean` | `true` | Se o componente deve ser copiável |
| `copyText` | `string` | `undefined` | Texto a ser copiado (se diferente do children) |
| `icon` | `string` | `undefined` | Ícone customizado (lucide-react icon name) |
| `className` | `string` | `undefined` | Classe CSS adicional |
| `showIcon` | `boolean` | `true` | Se deve exibir o ícone |

## Uso em MDX

Todos os componentes estão disponíveis globalmente em arquivos MDX:

```mdx
import EndpointDisplay from '@site/src/components/shared/HighlightBox/EndpointDisplay';

## Endpoint

<EndpointDisplay 
  method="POST"
  endpoint="/instances/{instanceId}/token/{token}/send-text"
  instructionText="Endpoint para enviar mensagem de texto"
/>
```

## Exemplos de Uso na Documentação

### Exemplo 1: Endpoint HTTP

```mdx
### Endpoint

<EndpointDisplay 
  method="POST"
  endpoint="/instances/{instanceId}/token/{token}/send-text"
  instructionText="Use este endpoint para enviar mensagens de texto"
/>
```

### Exemplo 2: URL Completa

```mdx
### URL Base

<UrlDisplay 
  url="https://api.z-api.io"
  instructionText="URL base da API Z-API"
/>
```

### Exemplo 3: Token

```mdx
### Autenticação

<TokenDisplay 
  token="Client-Token"
  instructionText="Adicione este header em todas as requisições"
/>
```

### Exemplo 4: Código Destacado

```mdx
### Variável de Ambiente

<HighlightBox variant="code" instructionText="Configure no seu .env">
  ZAPI_INSTANCE_ID=seu-instance-id
</HighlightBox>
```

### Exemplo 5: Header HTTP

```mdx
### Headers Necessários

<HighlightBox variant="header" instructionText="Header obrigatório">
  Client-Token: seu-token-aqui
</HighlightBox>
```

## Design System

O componente segue os padrões do design system Z-API:

- ✅ Usa variáveis CSS (nunca cores hardcoded)
- ✅ Suporte a dark mode
- ✅ Contraste WCAG AA (4.5:1)
- ✅ Animações suaves e performáticas
- ✅ Responsivo e acessível

## Tecnologias

- **React**: Framework base
- **Framer Motion**: Animações fluidas
- **Lucide React**: Ícones
- **CSS Modules**: Estilização isolada

## Contribuindo

Ao modificar este componente:

1. Mantenha o uso de variáveis CSS
2. Teste em light e dark mode
3. Verifique acessibilidade (navegação por teclado)
4. Teste animações com `prefers-reduced-motion`
5. Mantenha responsividade
