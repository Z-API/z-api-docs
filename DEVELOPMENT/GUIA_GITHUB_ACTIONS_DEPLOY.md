# Guia: Configuração de Build e Deploy no GitHub Actions

Este guia explica como configurar corretamente os parâmetros de build e deploy no GitHub Actions para hospedar o Docusaurus no GitHub Pages sem quebrar.

> **⚠️ IMPORTANTE:** Este guia usa placeholders (tags) para indicar onde você deve inserir suas informações reais. Substitua todos os placeholders pelos valores do seu projeto antes de usar.

## Placeholders de Configuração

Antes de começar, identifique os valores que você precisa substituir:

| Placeholder | Descrição | Onde encontrar |
|------------|-----------|----------------|
| `<USUARIO_GITHUB>` | Seu nome de usuário do GitHub | URL do seu perfil GitHub (ex: `github.com/usuario`) |
| `<ORGANIZACAO_GITHUB>` | Nome da organização (se aplicável) | URL da organização (ex: `github.com/organizacao`) |
| `<NOME_DO_REPOSITORIO>` | Nome exato do repositório | Nome do repositório no GitHub (case-sensitive) |
| `<TITULO_DO_SITE>` | Título do seu site | Escolha um título descritivo |
| `<TAGLINE_DO_SITE>` | Tagline/descrição do site | Escolha uma descrição curta |

**Exemplo prático:**
- Se seu repositório é `https://github.com/exemplo-usuario/meu-projeto-docs`
- Então: `<USUARIO_GITHUB>` = `exemplo-usuario` e `<NOME_DO_REPOSITORIO>` = `meu-projeto-docs`

## Índice

1. [Configurações do Docusaurus](#configurações-do-docusaurus)
2. [Configurações do GitHub Actions](#configurações-do-github-actions)
3. [Variáveis de Ambiente](#variáveis-de-ambiente)
4. [Configuração do Repositório](#configuração-do-repositório)
5. [Troubleshooting](#troubleshooting)
6. [Checklist de Configuração](#checklist-de-configuração)

---

## Configurações do Docusaurus

### Arquivo: `docusaurus.config.ts`

As configurações mais críticas para o deploy estão no arquivo `docusaurus.config.ts`. Erros aqui podem quebrar completamente o deploy.

### 1. URL e BaseURL

**⚠️ CRÍTICO:** Essas configurações determinam onde o site será hospedado e como os recursos serão carregados.

```typescript
// Set the production url of your site here
url: 'https://<USUARIO_GITHUB>.github.io',
// OU se for organização:
// url: 'https://<ORGANIZACAO_GITHUB>.github.io',

// Set the /<baseUrl>/ pathname under which your site is served
// Para GitHub Pages, geralmente é '/<projectName>/'
baseUrl: isDev ? '/' : '/<NOME_DO_REPOSITORIO>/',
```

**Regras importantes:**

- **URL:** Deve ser exatamente `https://<USUARIO_GITHUB>.github.io` (sem barra no final)
- **BaseURL em desenvolvimento:** Use `'/'` para evitar problemas com chunks e hot reload
- **BaseURL em produção:** Use `'/<NOME_DO_REPOSITORIO>/'` (com barra no início e no final)
- **NOME_DO_REPOSITORIO:** Deve ser exatamente o nome do repositório no GitHub (case-sensitive)

**Exemplo correto:**

```typescript
const isDev = process.env.NODE_ENV !== 'production';

const config: Config = {
  url: 'https://<USUARIO_GITHUB>.github.io',
  baseUrl: isDev ? '/' : '/<NOME_DO_REPOSITORIO>/',
  // ...
};
```

**❌ Erros comuns:**

```typescript
// ERRADO: URL com barra no final
url: 'https://<USUARIO_GITHUB>.github.io/',

// ERRADO: BaseURL sem barra no final em produção
baseUrl: isDev ? '/' : '/<NOME_DO_REPOSITORIO>',

// ERRADO: BaseURL diferente do nome do repositório (case-sensitive)
baseUrl: isDev ? '/' : '/nome-do-repositorio/', // Se o repo é Nome-Do-Repositorio
```

### 2. Organization Name e Project Name

```typescript
// GitHub pages deployment config.
organizationName: '<USUARIO_GITHUB>', // OU nome da organização: '<ORGANIZACAO_GITHUB>'
projectName: '<NOME_DO_REPOSITORIO>',
```

**Regras importantes:**

- **organizationName:** Deve ser exatamente o nome de usuário ou organização do GitHub (case-sensitive)
- **projectName:** Deve ser exatamente o nome do repositório (case-sensitive)
- Esses valores são usados pelo Docusaurus para gerar URLs corretas

**Exemplo correto:**

```typescript
organizationName: '<USUARIO_GITHUB>', // Exemplo: 'exemplo-usuario'
projectName: '<NOME_DO_REPOSITORIO>', // Exemplo: 'meu-projeto-docs'
```

### 3. Trailing Slash

```typescript
trailingSlash: false,
```

**Recomendação:** Mantenha `false` para evitar problemas com URLs duplicadas e redirecionamentos.

### 4. Verificação de Ambiente

O Docusaurus precisa saber se está em desenvolvimento ou produção:

```typescript
// Verificar se estamos em modo de desenvolvimento
const isDev = process.env.NODE_ENV !== 'production';
```

**Importante:** O GitHub Actions deve definir `NODE_ENV=production` durante o build.

---

## Configurações do GitHub Actions

### Arquivo: `.github/workflows/deploy.yml`

### 1. Permissões Necessárias

```yaml
permissions:
  contents: read      # Ler o repositório
  pages: write        # Escrever no GitHub Pages
  id-token: write     # Autenticação OIDC (obrigatório para GitHub Pages)
```

**⚠️ CRÍTICO:** Sem essas permissões, o deploy falhará.

### 2. Ambiente do Deploy

```yaml
environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
```

**Importante:** O ambiente `github-pages` deve estar configurado no repositório (Settings > Environments).

### 3. Setup do Node.js

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 20  # Use a versão LTS recomendada
    cache: 'npm'       # Cache de dependências para builds mais rápidos
```

**Recomendação:** Use Node.js 20 (LTS) para compatibilidade com Docusaurus 3.9.2.

### 4. Variáveis de Ambiente no Build

```yaml
- name: Build website
  env:
    # ⚠️ OBRIGATÓRIO: NODE_ENV deve ser 'production' para build de produção
    NODE_ENV: production
    # ⚠️ OPCIONAL: Variáveis do Algolia (apenas se usar busca online)
    # Se não usar Algolia, remova essas linhas - a busca local funciona offline
    ALGOLIA_APP_ID: ${{ secrets.ALGOLIA_APP_ID }}
    ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
    ALGOLIA_INDEX_NAME: ${{ secrets.ALGOLIA_INDEX_NAME }}
  run: npm run build
```

**⚠️ CRÍTICO:** `NODE_ENV=production` é obrigatório para:
- Gerar `baseUrl` correto
- Otimizar o build
- Carregar recursos corretamente

**ℹ️ IMPORTANTE - Busca Local vs Algolia:**
- **Busca Local (Recomendado):** O projeto já possui busca local configurada (`@easyops-cn/docusaurus-search-local`) que funciona **offline** e **não requer configuração adicional**
- **Algolia (Opcional):** As variáveis do Algolia são **totalmente opcionais** e só são necessárias se você quiser usar busca online do Algolia
- **Se não usar Algolia:** Você pode remover completamente as variáveis `ALGOLIA_*` do workflow - a busca local continuará funcionando normalmente

### 5. Upload e Deploy

```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: ./build  # Caminho do build do Docusaurus

- name: Deploy to GitHub Pages
  id: deployment
  uses: actions/deploy-pages@v4
```

**Importante:** 
- Use `actions/upload-pages-artifact@v3` (versão estável)
- Use `actions/deploy-pages@v4` (versão mais recente)
- O caminho deve ser exatamente `./build`

### 6. Concurrency (Evitar Deploys Concorrentes)

```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false  # Não cancelar deploys em progresso
```

**Recomendação:** Mantenha `cancel-in-progress: false` para evitar corromper deploys.

---

## Variáveis de Ambiente

### Secrets Necessários no GitHub

Configure em: **Settings > Secrets and variables > Actions**

### ⚠️ IMPORTANTE: Busca Local vs Algolia

**🎯 Busca Local (Padrão - Funciona Offline):**

O projeto já está configurado com **busca local** (`@easyops-cn/docusaurus-search-local`) que:
- ✅ Funciona **offline** (sem conexão com internet)
- ✅ Não requer configuração adicional
- ✅ Não precisa de secrets ou variáveis de ambiente
- ✅ Funciona automaticamente após o build
- ✅ É a solução recomendada para a maioria dos casos

**🌐 Algolia (Opcional - Requer Configuração):**

As variáveis do Algolia são **totalmente opcionais** e só são necessárias se você:
- Quiser usar busca online do Algolia (mais avançada)
- Precisar de recursos específicos do Algolia
- Quiser sincronizar busca com outros sistemas

**Se você não usar Algolia:**
- ✅ A busca local continuará funcionando normalmente
- ✅ Você pode remover completamente as variáveis `ALGOLIA_*` do workflow
- ✅ Não precisa configurar nenhum secret relacionado ao Algolia

---

#### 1. Secrets para Algolia (Opcional - Apenas se usar busca online)

> **ℹ️ Lembre-se:** Esses secrets são **opcionais**. Se você não configurá-los, a busca local continuará funcionando normalmente.

```
ALGOLIA_APP_ID
ALGOLIA_API_KEY
ALGOLIA_INDEX_NAME
```

**Como obter (apenas se quiser usar Algolia):**
1. Crie uma conta no Algolia
2. Crie um índice
3. Copie as credenciais
4. Adicione como secrets no GitHub

**Como remover do workflow (se não usar Algolia):**
1. Remova as linhas `ALGOLIA_*` da seção `env` do step de build
2. A busca local continuará funcionando normalmente

#### 2. GITHUB_TOKEN (Automático)

O `GITHUB_TOKEN` é criado automaticamente pelo GitHub Actions. Não precisa configurar manualmente.

---

## Configuração do Repositório

### 1. Habilitar GitHub Pages

1. Vá em **Settings > Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Salve as configurações

**⚠️ IMPORTANTE:** Não selecione "Deploy from a branch" se estiver usando GitHub Actions.

### 2. Configurar Ambiente

1. Vá em **Settings > Environments**
2. Clique em **New environment**
3. Nome: `github-pages`
4. Configure proteções se necessário (opcional)
5. Salve

### 3. Verificar Permissões

1. Vá em **Settings > Actions > General**
2. Em **Workflow permissions**, selecione:
   - **Read and write permissions**
   - Marque **Allow GitHub Actions to create and approve pull requests**

---

## Troubleshooting

### Problema 1: Build falha com erro de URL

**Sintoma:**
```
Error: "https://<usuario>.github.io/" does not look like a valid URL.
```

**Solução:**
- Verifique se a `url` no `docusaurus.config.ts` não tem barra no final
- Verifique se `baseUrl` está correto para produção

**Exemplo correto:**
```typescript
url: 'https://<USUARIO_GITHUB>.github.io',  // Sem barra no final
baseUrl: isDev ? '/' : '/<NOME_DO_REPOSITORIO>/',
```

### Problema 2: Recursos não carregam (404)

**Sintoma:**
- CSS não carrega
- Imagens não aparecem
- JavaScript não funciona

**Solução:**
- Verifique se `baseUrl` está correto (deve corresponder ao nome do repositório)
- Verifique se `baseUrl` tem barra no início e no final em produção
- Limpe o cache do navegador

**Exemplo correto:**
```typescript
baseUrl: isDev ? '/' : '/<NOME_DO_REPOSITORIO>/',  // Com barras
```

### Problema 3: Deploy falha com erro de permissão

**Sintoma:**
```
Error: Resource not accessible by integration
```

**Solução:**
1. Verifique as permissões no workflow:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

2. Verifique se o ambiente `github-pages` existe em Settings > Environments

3. Verifique se GitHub Pages está habilitado em Settings > Pages

### Problema 4: Build funciona localmente mas falha no GitHub Actions

**Sintoma:**
- Build local funciona
- Build no GitHub Actions falha

**Solução:**
1. Verifique se `NODE_ENV=production` está definido no workflow:
```yaml
env:
  NODE_ENV: production
```

2. Verifique se está usando a versão correta do Node.js:
```yaml
node-version: 20
```

3. Verifique se todas as dependências estão no `package.json` (não apenas em `devDependencies`)

### Problema 5: Site aparece em branco após deploy

**Sintoma:**
- Deploy conclui com sucesso
- Site aparece em branco

**Solução:**
1. Verifique o console do navegador para erros
2. Verifique se `baseUrl` está correto
3. Verifique se os arquivos foram gerados corretamente:
```yaml
- name: Verificar build
  run: |
    ls -la build/
    du -sh build/
```

4. Limpe o cache do GitHub Pages (force um novo deploy)

### Problema 6: Links quebrados após deploy

**Sintoma:**
- Links funcionam localmente
- Links quebram no GitHub Pages

**Solução:**
- Use `baseUrl` correto em produção
- Use links relativos em vez de absolutos quando possível
- Verifique se `trailingSlash` está configurado corretamente

---

## Checklist de Configuração

Use este checklist para garantir que tudo está configurado corretamente:

### Docusaurus Config (`docusaurus.config.ts`)

- [ ] `url` está correto: `'https://<USUARIO_GITHUB>.github.io'` (sem barra no final)
- [ ] `baseUrl` usa `isDev ? '/' : '/<NOME_DO_REPOSITORIO>/'`
- [ ] `organizationName` corresponde ao usuário/org do GitHub: `'<USUARIO_GITHUB>'`
- [ ] `projectName` corresponde exatamente ao nome do repositório: `'<NOME_DO_REPOSITORIO>'` (case-sensitive)
- [ ] `trailingSlash` está definido (recomendado: `false`)
- [ ] `isDev` verifica `NODE_ENV !== 'production'`

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

- [ ] Permissões configuradas (`contents: read`, `pages: write`, `id-token: write`)
- [ ] Ambiente `github-pages` configurado
- [ ] Node.js versão 20 (LTS)
- [ ] `NODE_ENV=production` definido no build
- [ ] Caminho do artifact correto (`./build`)
- [ ] Versões das actions atualizadas (`@v4` para deploy, `@v3` para upload)

### Repositório GitHub

- [ ] GitHub Pages habilitado (Settings > Pages > Source: GitHub Actions)
- [ ] Ambiente `github-pages` criado (Settings > Environments)
- [ ] Secrets do Algolia configurados (opcional - apenas se usar busca online)
- [ ] Permissões do workflow habilitadas (Settings > Actions > General)
- [ ] **Nota:** Busca local funciona offline sem configuração adicional

### Testes

- [ ] Build local funciona: `npm run build`
- [ ] Build no GitHub Actions passa
- [ ] Deploy conclui com sucesso
- [ ] Site carrega corretamente
- [ ] Recursos (CSS, JS, imagens) carregam
- [ ] Links funcionam corretamente
- [ ] Navegação funciona

---

## Exemplo Completo de Configuração

> **⚠️ IMPORTANTE:** Substitua todos os placeholders (`<USUARIO_GITHUB>`, `<NOME_DO_REPOSITORIO>`, etc.) pelos valores reais do seu projeto antes de usar.

### `docusaurus.config.ts`

```typescript
import type { Config } from '@docusaurus/types';

// Verificar ambiente
const isDev = process.env.NODE_ENV !== 'production';

const config: Config = {
  title: '<TITULO_DO_SITE>',
  tagline: '<TAGLINE_DO_SITE>',
  favicon: 'img/favicon.ico',

  // ⚠️ CONFIGURAÇÕES CRÍTICAS PARA DEPLOY
  // Substitua os placeholders pelos valores reais do seu projeto
  url: 'https://<USUARIO_GITHUB>.github.io',  // Sem barra no final
  baseUrl: isDev ? '/' : '/<NOME_DO_REPOSITORIO>/',  // Com barras em produção
  
  organizationName: '<USUARIO_GITHUB>',  // OU '<ORGANIZACAO_GITHUB>' se for organização
  projectName: '<NOME_DO_REPOSITORIO>',
  trailingSlash: false,

  // ... resto da configuração
};

export default config;
```

### `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  workflow_run:
    workflows: ["CI - Validação e Build"]
    types: [completed]
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci --no-audit --fund=false
      
      - name: Build website
        env:
          NODE_ENV: production  # ⚠️ OBRIGATÓRIO
          # ℹ️ OPCIONAL: Variáveis do Algolia (apenas se usar busca online)
          # Se não usar, remova essas linhas - busca local funciona offline
          # ALGOLIA_APP_ID: ${{ secrets.ALGOLIA_APP_ID }}
          # ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
          # ALGOLIA_INDEX_NAME: ${{ secrets.ALGOLIA_INDEX_NAME }}
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./build
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## Próximos Passos

Após configurar tudo:

1. Faça um commit e push para a branch `main`
2. Monitore o workflow no GitHub Actions
3. Verifique se o deploy foi concluído com sucesso
4. Acesse o site em `https://<USUARIO_GITHUB>.github.io/<NOME_DO_REPOSITORIO>/`
5. Teste a navegação e recursos

**Dúvidas?** Consulte a [documentação oficial do Docusaurus sobre deploy](https://docusaurus.io/docs/deployment) ou a [documentação do GitHub Pages](https://docs.github.com/en/pages).

