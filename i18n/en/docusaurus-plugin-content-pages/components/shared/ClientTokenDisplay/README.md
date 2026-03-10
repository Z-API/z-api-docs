# ClientTokenDisplay

Componente interativo e visualmente atraente para exibir o **Client-Token** da API Z-API com funcionalidade de cópia e animações suaves.

## Características

- ✨ **Design Moderno**: Interface limpa e profissional
- 🎨 **Animações Suaves**: Transições fluidas com Framer Motion
- 📋 **Cópia Interativa**: Funcionalidade de copiar token para clipboard
- 🌓 **Dark Mode**: Suporte completo a modo claro e escuro
- ♿ **Acessível**: Suporte a navegação por teclado e screen readers
- 📱 **Responsivo**: Adaptado para diferentes tamanhos de tela
- 🎯 **Variantes**: Diferentes estilos disponíveis

## Uso Básico

```tsx
import ClientTokenDisplay from '@site/src/components/shared/ClientTokenDisplay';

<ClientTokenDisplay />
```

## Uso em MDX

```mdx
import ClientTokenDisplay from '@site/src/components/shared/ClientTokenDisplay';

<ClientTokenDisplay 
  instructionText="Verifique se está usando o token correto no header"
  variant="highlighted"
/>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `instructionText` | `string` | `"Verifique se está usando o token correto no header"` | Texto instrucional exibido acima do token |
| `tokenText` | `string` | `"Client - Token"` | Texto do token a ser exibido |
| `interactive` | `boolean` | `true` | Se o componente deve ser interativo (copiável) |
| `variant` | `'default' \| 'compact' \| 'highlighted'` | `'default'` | Variante visual do componente |
| `className` | `string` | `undefined` | Classe CSS adicional |

## Variantes

### Default

Estilo padrão com espaçamento confortável.

```tsx
<ClientTokenDisplay variant="default" />
```

### Compact
Versão compacta ideal para espaços menores.

```tsx
<ClientTokenDisplay variant="compact" />
```

### Highlighted

Versão destacada com bordas mais visíveis.

```tsx
<ClientTokenDisplay variant="highlighted" />
```

## Exemplos

### Com texto customizado

```tsx
<ClientTokenDisplay 
  instructionText="Use este token para autenticar suas requisições"
  tokenText="Client-Token-Authentication-Key"
/>
```

### Não interativo

```tsx
<ClientTokenDisplay 
  interactive={false}
  instructionText="Token apenas para visualização"
/>
```

### Compacto com customização

```tsx
<ClientTokenDisplay 
  variant="compact"
  instructionText="Token necessário"
  tokenText="Client - Token"
/>
```

## Recursos Interativos

- **Hover**: Efeito visual ao passar o mouse sobre o token
- **Cópia**: Clique no botão de cópia ou no próprio token para copiar
- **Feedback**: Animação de confirmação quando o token é copiado
- **Animação do Ícone**: Ícone de chave animado ao passar o mouse

## Acessibilidade

- Suporte a navegação por teclado
- Feedback visual para ações
- Labels ARIA apropriados
- Respeita preferências de movimento reduzido (`prefers-reduced-motion`)

## Estilização

O componente usa variáveis CSS do design system do projeto:

- `--official-accent-green`: Cor principal do token
- `--text-primary`: Cor do texto
- `--border-light`: Cor das bordas
- `--spacing-*`: Espaçamentos consistentes
- `--border-radius-*`: Bordas arredondadas

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
- **Lucide React**: Ícones (Key, Copy, Check)
- **CSS Modules**: Estilização isolada

## Contribuindo

Ao modificar este componente:

1. Mantenha o uso de variáveis CSS
2. Teste em light e dark mode
3. Verifique acessibilidade (navegação por teclado)
4. Teste animações com `prefers-reduced-motion`
5. Mantenha responsividade
