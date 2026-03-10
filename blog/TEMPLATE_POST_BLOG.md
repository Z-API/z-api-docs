# Template de Post do Blog - Baseado no Formato Oficial Z-API

Este template segue a estrutura e formato dos posts do blog oficial do Z-API (<https://www.z-api.io/blog/>).

## Estrutura do Frontmatter

```yaml
---
slug: slug-do-post-sem-espacos
title: Título Principal do Post
authors: [zapi-central]
tags: [tag1, tag2, tag3]
featured: true
summary: Resumo curto de 1-2 linhas que aparece na listagem do blog
description: Descrição mais detalhada para SEO (meta description)
image: URL da imagem de destaque
---
```

## Estrutura do Conteúdo

### 1. Título Principal (H1)

```markdown
# Título Principal do Post
```

### 2. Introdução Destacada

```markdown
**Primeiro parágrafo em negrito** que captura a atenção e resume o valor do post. 
Aqui você explica o problema que será resolvido e o que o leitor vai aprender.
```

### 3. Seção "Principais Conclusões"

```markdown
## Principais conclusões

* * Conclusão 1: Benefício ou insight principal
* * Conclusão 2: Outro benefício ou insight
* * Conclusão 3: Mais um benefício ou insight
* * Conclusão 4: Benefício adicional
* * Conclusão 5: Último benefício ou insight
```

### 4. Conteúdo Principal Estruturado

#### Seção "Por que" (Contexto)

```markdown
## Por que [tema do post]

Conteúdo explicando o contexto, problema ou necessidade que o post aborda.
Use parágrafos curtos e objetivos.
```

#### Seção "Como" (Tutorial/Guia)

```markdown
## Como [fazer algo]

Passo a passo detalhado com exemplos práticos.

### Passo 1: [Descrição]

Conteúdo do passo 1...

### Passo 2: [Descrição]

Conteúdo do passo 2...
```

#### Seção "Exemplos Práticos"

```markdown
## [Tema]: Exemplos Práticos

Exemplos de código ou casos de uso reais.

\`\`\`javascript
// Exemplo de código
\`\`\`
```

### 5. Seção "Boas Práticas"

```markdown
## Boas práticas de [tema]

* * Prática 1: Descrição da prática
* * Prática 2: Descrição da prática
* * Prática 3: Descrição da prática
* * Prática 4: Descrição da prática
* * Prática 5: Descrição da prática
```

### 6. Seção "Implemente Hoje Mesmo"

```markdown
## Implemente [tema] com o Z-API hoje mesmo

Call-to-action prático com passos concretos para começar.

1. Passo 1
2. Passo 2
3. Passo 3

**Leia também:** [Link para post relacionado]
```

### 7. Conclusão

```markdown
## Conclusão

Resumo final destacando os principais pontos e benefícios. 
Mensagem motivacional para ação.
```

### 8. Perguntas Frequentes (FAQ)

```markdown
## Perguntas Frequentes

* * **Pergunta 1?** 
 Resposta detalhada com links para documentação quando relevante.
* * **Pergunta 2?** 
 Resposta detalhada.
* * **Pergunta 3?** 
 Resposta detalhada.
* * **Pergunta 4?** 
 Resposta detalhada.
* * **Pergunta 5?** 
 Resposta detalhada.
```

## Elementos Especiais

### Links Internos

Sempre que possível, inclua links para a documentação:

```markdown
[texto do link](/docs/secao/pagina)
```

### Código

Use blocos de código com syntax highlighting:
\`\`\`javascript
// código aqui
\`\`\`

### Listas com Ícones

Use emojis para tornar listas mais visuais:

```markdown
- Item positivo
- Item de atenção
- Item de documentação
- Item de segurança
```

### Call-to-Actions

Inclua CTAs claros ao longo do post:

```markdown
**Comece agora:** [Link para documentação](/docs/quick-start/introducao)
```

## Exemplo Completo

Veja o arquivo `2025-11-18-automacao-whatsapp-5-fluxos-prontos.md` para um exemplo completo seguindo este template.
