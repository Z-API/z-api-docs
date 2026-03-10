# Design System Components

Este diretório contém os componentes reutilizáveis do design system híbrido Z-API.

## Estrutura

```text
DesignSystem/
├── ColorPalette.tsx # Componente de paleta de cores
├── DesignSystem.module.css # Estilos para cores
├── TypographyScale.tsx # Componente de tipografia
├── Typography.module.css # Estilos para tipografia
├── ThemeSelector.tsx # Seletor interativo de temas
├── ThemeSelector.module.css # Estilos do seletor
├── ComponentsShowcase.module.css # Estilos do showcase
├── index.tsx # Exportações principais
└── README.md # Este arquivo
```

## Componentes Disponíveis

### 1. ColorPalette

Componente para exibir paleta de cores de um tema específico:

```tsx
import { ColorPalette } from '@site/src/components/DesignSystem';

const colors = [
 { name: 'Z-API Green', value: '#25D366', description: 'Cor primária' },
 { name: 'Z-API Teal', value: '#128C7E', description: 'Cor secundária' },
];

<ColorPalette theme="classic" colors={colors} />
```

### 2. GradientShowcase

Componente para exibir gradientes de um tema:

```tsx
import { GradientShowcase } from '@site/src/components/DesignSystem';

const gradients = [
 { 
 name: 'Hero Gradient', 
 value: 'linear-gradient(135deg, #25D366 0%, #128C7E 50%, #075E54 100%)',
 description: 'Gradiente para hero sections'
 },
];

<GradientShowcase theme="classic" gradients={gradients} />
```

### 3. TypographyScale

Componente para exibir escala tipográfica:

```tsx
import { TypographyScale } from '@site/src/components/DesignSystem';

<TypographyScale theme="zapi" />
```

### 4. FontWeights

Componente para exibir pesos de fonte:

```tsx
import { FontWeights } from '@site/src/components/DesignSystem';

<FontWeights theme="classic" />
```

### 5. ThemeSelector

Seletor interativo de temas:

```tsx
import { ThemeSelector } from '@site/src/components/DesignSystem';

<ThemeSelector themes={['classic', 'zapi', 'hybrid']} />
```

## Como Usar

### Importar Componentes

```tsx
import { 
 ColorPalette, 
 GradientShowcase, 
 TypographyScale, 
 FontWeights,
 ThemeSelector 
} from '@site/src/components/DesignSystem';
```

### Exemplo Completo

```tsx
import { ColorPalette, ThemeSelector } from '@site/src/components/DesignSystem';

const colors = [
 { name: 'Z-API Green', value: '#25D366', description: 'Cor primária' },
 { name: 'Z-API Teal', value: '#128C7E', description: 'Cor secundária' },
];

export default function DesignSystemPage() {
 return (
 <div>
 <ThemeSelector themes={['classic', 'zapi', 'hybrid']} />
 <ColorPalette theme="classic" colors={colors} />
 </div>
 );
}
```

## Props dos Componentes

### ColorPalette

```tsx
interface ColorPaletteProps {
 theme: 'classic' | 'zapi' | 'hybrid';
 colors: Array<{
 name: string;
 value: string;
 description?: string;
 }>;
}
```

### GradientShowcase

```tsx
interface GradientShowcaseProps {
 theme: 'classic' | 'zapi' | 'hybrid';
 gradients: Array<{
 name: string;
 value: string;
 description?: string;
 }>;
}
```

### TypographyScale / FontWeights

```tsx
interface TypographyScaleProps {
 theme: 'classic' | 'zapi' | 'hybrid';
}
```

### ThemeSelector

```tsx
interface ThemeSelectorProps {
 themes?: Array<'classic' | 'zapi' | 'hybrid'>;
}
```

## Customização

### Adicionar Novas Cores

Crie um array de cores e passe para o componente:

```tsx
const newColors = [
 { name: 'New Color', value: '#HEXCODE', description: 'Descrição' }
];

<ColorPalette theme="classic" colors={newColors} />
```

### Adicionar Novos Componentes

Crie novos componentes React seguindo o padrão:

```tsx
import React from 'react';
import styles from './YourComponent.module.css';

export interface YourComponentProps {
 theme: 'classic' | 'zapi' | 'hybrid';
}

export const YourComponent: React.FC<YourComponentProps> = ({ theme }) => (
 <div className={styles.container} data-theme={theme}>
 {/* Seu componente */}
 </div>
);
```

## Boas Práticas

1. **Sempre use data-theme**: Aplique `data-theme` nos containers para ativar os temas
2. **Use variáveis CSS**: Sempre use variáveis CSS (`var(--zapi-primary)`) ao invés de valores hardcoded
3. **Documente props**: Use JSDoc para documentar props dos componentes
4. **Teste todos os temas**: Garanta que os componentes funcionam em todos os temas
5. **Acessibilidade**: Use aria-labels e elementos semânticos

## Troubleshooting

### Tema não está aplicando

- Verifique se `data-theme` está no elemento correto
- Confirme que as variáveis CSS estão definidas em `custom.css`
- Verifique o console do navegador para erros

### Cores não aparecem

- Confirme que `custom.css` está importado na página
- Verifique se as variáveis estão no escopo correto (`:root`)
- Verifique se o `data-theme` está aplicado corretamente

### Animações não funcionam

- Verifique se `animations.css` está importado
- Confirme que `prefers-reduced-motion` não está ativo

---

**Última Atualização**: 2025-12-12 
**Status**: Componentes React reutilizáveis (Storybook removido)
