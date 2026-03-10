# Guia: Como Adicionar Posts no Blog

Este guia explica como adicionar novos posts ao blog do Z-API Central.

> **✅ IMPORTANTE:** O Docusaurus detecta automaticamente os posts do blog. Você **NÃO precisa** registrar ou configurar nada no código. Basta criar o arquivo seguindo o padrão de nomenclatura e frontmatter correto.

## Como Funciona (Detecção Automática)

O Docusaurus escaneia automaticamente a pasta `blog/` e processa todos os arquivos Markdown que seguem o padrão de nomenclatura. **Não é necessário:**

- ❌ Registrar o post em nenhum arquivo de código
- ❌ Adicionar em listas ou índices
- ❌ Modificar configurações do Docusaurus
- ❌ Atualizar sidebars ou menus

**O que você precisa fazer:**

- ✅ Criar o arquivo na pasta `blog/` com o nome correto
- ✅ Adicionar o frontmatter com os campos obrigatórios
- ✅ Escrever o conteúdo em Markdown

O Docusaurus fará o resto automaticamente durante o build!

## Estrutura de Arquivos

Os posts do blog devem ser criados na pasta `blog/` na raiz do projeto, seguindo o padrão de nomenclatura:

```
blog/YYYY-MM-DD-titulo-do-post-em-kebab-case.md
```

**Exemplo**: `blog/2026-01-15-automacao-whatsapp-guia-completo.md`

## Estrutura do Frontmatter

Todo post deve começar com um bloco de frontmatter YAML:

```yaml
---
slug: titulo-do-post-em-kebab-case
title: Título Principal do Post
authors: [zapi-central]
tags: [tag1, tag2, tag3]
featured: true
summary: Resumo curto de 1-2 linhas que aparece na listagem do blog
description: Descrição mais detalhada para SEO (meta description)
image: /img/blog/nome-da-imagem.webp
---
```

### Campos do Frontmatter

- **slug**: URL amigável do post (sem espaços, em kebab-case)
- **title**: Título principal que aparece no post
- **authors**: Array com o autor (geralmente `[zapi-central]`)
- **tags**: Array de tags para categorização
- **featured**: `true` para destacar o post, `false` caso contrário
- **summary**: Resumo curto que aparece nos cards de listagem
- **description**: Meta description para SEO (até ~160 caracteres)
- **image**: Caminho para a imagem de destaque (deve estar em `static/img/blog/`)

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

### 3. Seção "Principais Conclusões" (Opcional)

```markdown
## Principais conclusões

* * Conclusão 1: Benefício ou insight principal
* * Conclusão 2: Outro benefício ou insight
* * Conclusão 3: Mais um benefício ou insight
```

### 4. Conteúdo Principal

Use seções H2 e H3 para organizar o conteúdo:

```markdown
## Por que [tema do post]

Conteúdo explicando o contexto, problema ou necessidade.

## Como [fazer algo]

Passo a passo detalhado com exemplos práticos.

### Passo 1: [Descrição]

Conteúdo do passo 1...

### Passo 2: [Descrição]

Conteúdo do passo 2...
```

### 5. Seção "Boas Práticas" (Opcional)

```markdown
## Boas práticas de [tema]

* * Prática 1: Descrição da prática
* * Prática 2: Descrição da prática
```

## Exemplo Completo

Veja o arquivo `blog/TEMPLATE_POST_BLOG.md` na raiz do projeto para um exemplo completo de estrutura.

## Imagens

1. Adicione as imagens na pasta `static/img/blog/`
2. Use formato WebP quando possível para melhor performance
3. Referencie no frontmatter: `image: /img/blog/nome-da-imagem.webp`

## Publicação

Após criar o arquivo:

1. **Verifique se o formato está correto** - Confira se o frontmatter tem todos os campos obrigatórios
2. **Teste localmente** - Execute `npm run start` e acesse `http://localhost:3000/blog`
3. **Verifique se o post aparece** - O post deve aparecer automaticamente na listagem do blog
4. **Commit e push** - Faça commit e push para o repositório
5. **Deploy automático** - O GitHub Actions fará o build e deploy automaticamente

> **💡 Dica:** Se o post não aparecer após o build, verifique:
> - Se o nome do arquivo segue o padrão `YYYY-MM-DD-titulo.md`
> - Se o frontmatter está correto (especialmente `slug`, `title`, `authors`, `tags`)
> - Se não há erros no console durante o build

## Dicas

- Use o template `blog/TEMPLATE_POST_BLOG.md` como base
- Mantenha o conteúdo claro e objetivo
- Use exemplos práticos quando possível
- Inclua diagramas Mermaid se necessário (usando blocos de código `mermaid`)
- Adicione links internos para outros posts ou documentação quando relevante

## Perguntas Frequentes

### Preciso registrar o post em algum arquivo de código?

**Não!** O Docusaurus detecta automaticamente todos os arquivos `.md` na pasta `blog/` que seguem o padrão de nomenclatura. Basta criar o arquivo e o post aparecerá automaticamente.

### O que acontece se eu criar um arquivo com nome errado?

Arquivos que não seguem o padrão `YYYY-MM-DD-titulo.md` podem não ser processados corretamente. Sempre use o formato de data no início do nome do arquivo.

### Preciso atualizar tags ou autores em algum lugar?

- **Tags:** Se você usar uma tag nova, ela será criada automaticamente. Para adicionar descrição ou outras informações, edite `blog/tags.yml`
- **Autores:** Se você usar um autor novo, adicione em `blog/authors.yml`. O autor `zapi-central` já está configurado por padrão.

### O post aparece imediatamente após criar?

- **Localmente:** Sim, após salvar o arquivo e o servidor recarregar (hot reload)
- **Em produção:** Após fazer commit, push e o GitHub Actions completar o build e deploy

### Posso usar qualquer formato de data?

Use o formato `YYYY-MM-DD` (ano-mês-dia) no início do nome do arquivo. Isso determina a ordem de exibição dos posts (mais recentes primeiro).

