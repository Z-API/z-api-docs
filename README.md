# Z-API Central

Documentação completa e organizada da API Z-API, construída com Docusaurus.

## 📑 Índice

- [Sobre](#sobre)
- [Estrutura da Documentação](#estrutura-da-documentação)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Teste Local](#instalação-e-teste-local)
  - [Passo a Passo Completo](#passo-a-passo-completo)
- [Comandos de Desenvolvimento](#comandos-de-desenvolvimento)
  - [Servidor de Desenvolvimento](#servidor-de-desenvolvimento)
  - [Limpar Cache](#limpar-cache)
- [Build: Entendendo npm build vs Docusaurus build](#build-entendendo-npm-build-vs-docusaurus-build)
  - [O que é Build?](#o-que-é-build)
  - [Build npm vs Build Docusaurus](#build-npm-vs-build-docusaurus)
  - [Build de Produção](#build-de-produção)
  - [Build de Desenvolvimento](#build-de-desenvolvimento)
  - [Build Rápido (Sem Minificação)](#build-rápido-sem-minificação)
  - [Build Completo (Com Validações)](#build-completo-com-validações)
  - [Testar Build Localmente](#testar-build-localmente)
  - [Limpar e Rebuild](#limpar-e-rebuild)
- [Deploy](#deploy)
  - [Deploy Manual (Alternativo)](#deploy-manual-alternativo)
- [Tecnologias](#tecnologias)
- [Guias de Desenvolvimento](#guias-de-desenvolvimento)
- [Licença](#licença)
- [FAQ: Problemas e Soluções Comuns](#faq-problemas-e-soluções-comuns)
  - [Problemas de Instalação](#problemas-de-instalação)
  - [Problemas ao Iniciar o Servidor](#problemas-ao-iniciar-o-servidor)
  - [Problemas de Build](#problemas-de-build)
  - [Problemas com Hot Reload](#problemas-com-hot-reload)
  - [Problemas de Dependências](#problemas-de-dependências)
  - [Problemas Específicos do Windows](#problemas-específicos-do-windows)
  - [Problemas de Performance](#problemas-de-performance)
  - [Verificação de Ambiente](#verificação-de-ambiente)
  - [Comandos Úteis de Troubleshooting](#comandos-úteis-de-troubleshooting)
  - [Quando Procurar Ajuda](#quando-procurar-ajuda)

---

## Sobre

Este projeto contém a documentação completa da [Z-API](https://developer.z-api.io/), organizada de forma estruturada e fácil de navegar. A Z-API é um serviço RESTful que permite interagir com o WhatsApp através de uma API simples e intuitiva.

## Estrutura da Documentação

A documentação está organizada nas seguintes seções:

- **Quick Start**: Guia de início rápido e boas práticas
- **Security**: Segurança, autenticação e tokens
- **Instance**: Gerenciamento de instâncias
- **Messages**: Todos os tipos de mensagens suportadas
- **Groups**: Gerenciamento de grupos
- **Contacts**: Gerenciamento de contatos
- **Chats**: Gerenciamento de conversas
- **Webhooks**: Configuração e uso de webhooks
- **WhatsApp Business**: Funcionalidades Business
- **Mobile**: Registro e gerenciamento de números
- **Status**: Gerenciamento de status/stories
- **Communities**: Gerenciamento de comunidades

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js**: >= 20.0 (verificar com `node --version`)
- **npm**: >= 10.0 (verificar com `npm --version`)
- **Git**: Para clonar o repositório (opcional, mas recomendado)

## Instalação e Teste Local

### Passo a Passo Completo

#### 1. Verificar Pré-requisitos

Antes de começar, verifique se você tem as versões corretas instaladas:

```bash
# Verificar versão do Node.js (deve ser >= 20.0)
node --version

# Verificar versão do npm (deve ser >= 10.0)
npm --version
```

**Se não tiver Node.js instalado:**
- **Linux/Mac**: Use `nvm` (Node Version Manager) - [Instruções](https://github.com/nvm-sh/nvm)
- **Windows**: Baixe do [site oficial](https://nodejs.org/) (versão LTS 20.x)

#### 2. Clonar ou Acessar o Repositório

```bash
# Se for clonar (ajuste a URL conforme necessário)
git clone <URL_DO_REPOSITORIO>
cd Z-API-Central-Dev_Grupo-Irrah

# Ou se já tiver o projeto localmente
cd Z-API-Central-Dev_Grupo-Irrah
```

#### 3. Instalar Dependências do npm

Este passo instala todas as bibliotecas e ferramentas necessárias (Docusaurus, React, TypeScript, etc.):

```bash
npm install
```

**O que acontece:**
- npm lê o arquivo `package.json`
- Baixa todas as dependências listadas em `dependencies` e `devDependencies`
- Instala no diretório `node_modules/`
- Gera/atualiza o arquivo `package-lock.json` (lock das versões)

**Tempo estimado:** 2-5 minutos (dependendo da conexão)

**Problemas Comuns durante a Instalação:**

- **Erro de permissão no Linux/Mac**: Use `sudo npm install` ou configure npm para não usar sudo:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

- **Node version incompatível**: Se tiver erro de versão, use `nvm` (Node Version Manager):

```bash
nvm install 20
nvm use 20
```

- **Dependências conflitantes**: Se encontrar erros de dependências:

```bash
rm -rf node_modules package-lock.json
npm install
```

- **Windows PowerShell**: Se encontrar erro de execução de scripts:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### 4. Iniciar Servidor de Desenvolvimento

Após instalar as dependências, inicie o servidor local:

```bash
npm start
```

**O que acontece:**
- Docusaurus compila o projeto em modo desenvolvimento
- Inicia um servidor local na porta 3000
- Abre automaticamente o navegador (ou acesse manualmente `http://localhost:3000`)
- Hot reload está ativo - mudanças são refletidas automaticamente

**Primeira execução pode demorar:** 30-60 segundos (compilação inicial)

**Para parar o servidor:** Pressione `Ctrl + C` no terminal

## Comandos de Desenvolvimento

### Servidor de Desenvolvimento

```bash
npm start
```

Inicia servidor local com hot reload. Mudanças em arquivos Markdown, TypeScript e CSS são refletidas automaticamente.

**Variantes disponíveis:**

- `npm run start:open` - Abre navegador automaticamente
- `npm run start:fast` - Modo rápido (sem minificação, hot reload otimizado)
- `npm run start:watch` - Modo watch com polling (útil para sistemas de arquivos lentos)

### Limpar Cache

Se encontrar problemas estranhos (arquivos não atualizando, erros inesperados):

```bash
npm run clear
```

Remove cache do Docusaurus (`.docusaurus/`, `.cache-loader/`) e permite rebuild limpo.

## Build: Entendendo npm build vs Docusaurus build

### O que é Build?

**Build** é o processo de transformar o código-fonte (TypeScript, React, Markdown) em arquivos estáticos (HTML, CSS, JavaScript) que podem ser servidos por qualquer servidor web.

### Build npm vs Build Docusaurus

**`npm run build`** é um script do npm que:
1. Executa comandos definidos no `package.json`
2. Chama internamente o comando do Docusaurus
3. Configura variáveis de ambiente (`NODE_ENV=production`)
4. Define limites de memória (`NODE_OPTIONS=--max-old-space-size=8192`)

**Build do Docusaurus** (executado internamente):
1. Processa todos os arquivos Markdown/MDX em `docs/` e `blog/`
2. Compila componentes React/TypeScript em `src/`
3. Gera HTML estático otimizado
4. Minifica CSS e JavaScript
5. Gera índices de busca local
6. Cria sitemap e outros arquivos de SEO
7. Copia arquivos estáticos de `static/` para `build/`

### Build de Produção

```bash
npm run build
```

**O que acontece:**
- Limpa cache automaticamente (via `prebuild`)
- Compila tudo em modo produção (otimizado e minificado)
- Gera arquivos estáticos no diretório `build/`
- Tempo estimado: 2-5 minutos

**Resultado:** Pasta `build/` com site estático pronto para deploy

### Build de Desenvolvimento

```bash
npm run build:dev
```

**Diferença:** Gera build sem minificação, útil para debug. Saída em `build-dev/`.

### Build Rápido (Sem Minificação)

```bash
npm run build:fast
```

**Quando usar:** Se o build normal estiver muito lento ou consumindo muita memória.

### Build Completo (Com Validações)

```bash
npm run build:prod
```

**O que faz:**
1. Executa type checking (`npm run typecheck`)
2. Executa build de produção (`npm run build`)

**Quando usar:** Antes de fazer deploy, para garantir que tudo está correto.

### Testar Build Localmente

Após fazer o build, teste como ficará em produção:

```bash
npm run serve
```

**O que faz:**
- Serve os arquivos estáticos da pasta `build/`
- Simula ambiente de produção
- Disponível em `http://localhost:3000`

**Comando alternativo:**
```bash
npm run serve:build
```
Faz build e serve automaticamente (útil para testar tudo de uma vez).

### Limpar e Rebuild

Se o build der errado ou quiser garantir build limpo:

```bash
npm run build:clean
```

Equivale a:
```bash
npm run clear  # Remove cache
npm run build  # Faz build novo
```

## Deploy

> **ℹ️ Nota:** O deploy é feito automaticamente via GitHub Actions quando você faz push para a branch `main`. Veja o guia completo em [`DEVELOPMENT/GUIA_GITHUB_ACTIONS_DEPLOY.md`](./DEVELOPMENT/GUIA_GITHUB_ACTIONS_DEPLOY.md).

### Deploy Manual (Alternativo)

Se precisar fazer deploy manual usando o comando do Docusaurus:

**Usando SSH:**
```bash
USE_SSH=true npm run deploy
```

**Sem SSH:**
```bash
GIT_USER=<Seu usuário GitHub> npm run deploy
```

Este comando constrói o site e faz push para o branch `gh-pages` do GitHub.

## Tecnologias

- [Docusaurus](https://docusaurus.io/) - Gerador de site estático moderno
- TypeScript
- React

## Guias de Desenvolvimento

Para instruções sobre como adicionar novos conteúdos ao blog ou outras tarefas de desenvolvimento, consulte a pasta [`DEVELOPMENT/`](./DEVELOPMENT/README.md).

## Licença

Este projeto é propriedade intelectual do cliente (Grupo Irrah - FOUR PIXEL TECNOLOGIA DA INFORMAÇÃO LTDA). Consulte o arquivo [`LICENSE`](./LICENSE) para mais informações sobre os termos de licenciamento.

Para informações oficiais sobre a Z-API, consulte: https://developer.z-api.io/

---

## FAQ: Problemas e Soluções Comuns

### Problemas de Instalação

#### ❌ Erro: "Cannot find module" durante `npm install`

**Causa:** Dependências corrompidas ou cache do npm.

**Solução:**
```bash
# Limpar cache do npm
npm cache clean --force

# Remover node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install
```

#### ❌ Erro: "EACCES: permission denied" no Linux/Mac

**Causa:** Permissões insuficientes para instalar pacotes globalmente.

**Solução 1 (Recomendado):** Configurar npm para não usar sudo:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install
```

**Solução 2:** Usar sudo (não recomendado):
```bash
sudo npm install
```

#### ❌ Erro: "Node version incompatível"

**Causa:** Versão do Node.js muito antiga ou muito nova.

**Solução:** Use Node.js 20 (LTS):
```bash
# Com nvm (Node Version Manager)
nvm install 20
nvm use 20

# Verificar versão
node --version  # Deve mostrar v20.x.x
```

### Problemas ao Iniciar o Servidor

#### ❌ Erro: "Port 3000 is already in use"

**Causa:** Outro processo está usando a porta 3000.

**Solução 1:** Encontrar e matar o processo:
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

**Solução 2:** Usar outra porta:
```bash
npx cross-env PORT=3001 docusaurus start
```

#### ❌ Servidor não inicia ou trava

**Causa:** Cache corrompido ou problemas de compilação.

**Solução:**
```bash
# Limpar cache
npm run clear

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Tentar novamente
npm start
```

#### ❌ Erro: "Cannot find module 'mdast-util-footnote'" ou similar

**Causa:** Dependência faltando ou versão incompatível.

**Solução:**
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Se persistir, instalar dependência específica
npm install mdast-util-footnote
```

### Problemas de Build

#### ❌ Erro: "JavaScript heap out of memory"

**Causa:** Build muito grande para memória disponível.

**Solução 1:** O script já configura limite de memória. Se ainda falhar:
```bash
# Build sem minificação (usa menos memória)
npm run build:fast
```

**Solução 2:** Aumentar memória manualmente:
```bash
NODE_OPTIONS=--max-old-space-size=16384 npm run build
```

#### ❌ Build falha com erro de TypeScript

**Causa:** Erros de tipo no código TypeScript.

**Solução:**
```bash
# Verificar erros de tipo
npm run typecheck

# Corrigir erros ou ajustar tsconfig.json se necessário
```

#### ❌ Build funciona mas site aparece em branco

**Causa:** Problema com `baseUrl` ou recursos não carregando.

**Solução:**
1. Verificar `baseUrl` no `docusaurus.config.ts`:
   ```typescript
   baseUrl: isDev ? '/' : '/<NOME_DO_REPOSITORIO>/',
   ```

2. Limpar e rebuild:
   ```bash
   npm run build:clean
   ```

3. Verificar console do navegador para erros específicos

#### ❌ Arquivos não atualizam após mudanças

**Causa:** Cache do navegador ou do Docusaurus.

**Solução:**
```bash
# Limpar cache do Docusaurus
npm run clear

# Limpar cache do navegador (Ctrl+Shift+Delete ou Cmd+Shift+Delete)
# Ou usar modo anônimo/privado

# Reiniciar servidor
npm start
```

### Problemas com Hot Reload

#### ❌ Mudanças não aparecem automaticamente

**Causa:** Hot reload desabilitado ou sistema de arquivos não suporta watch.

**Solução:**
```bash
# Usar modo watch com polling
npm run start:watch

# Ou forçar rebuild manual (Ctrl+C e npm start novamente)
```

### Problemas de Dependências

#### ❌ Erro: "Module not found" para módulos do Docusaurus

**Causa:** Dependências não instaladas ou versões incompatíveis.

**Solução:**
```bash
# Verificar se todas as dependências estão instaladas
npm list --depth=0

# Reinstalar tudo
rm -rf node_modules package-lock.json
npm install
```

#### ❌ Avisos sobre dependências peer

**Causa:** Versões de dependências podem ter pequenas incompatibilidades.

**Solução:** Geralmente são apenas avisos e não impedem o funcionamento. Se quiser corrigir:
```bash
npm install --legacy-peer-deps
```

### Problemas Específicos do Windows

#### ❌ Erro: "Execution policy" no PowerShell

**Causa:** Política de execução de scripts bloqueada.

**Solução:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### ❌ Comandos npm não funcionam no CMD

**Causa:** CMD do Windows pode ter problemas com alguns comandos.

**Solução:** Use PowerShell ou Git Bash em vez do CMD.

### Problemas de Performance

#### ❌ Build muito lento

**Solução:**
```bash
# Build sem minificação (mais rápido)
npm run build:fast

# Ou build de desenvolvimento
npm run build:dev
```

#### ❌ Servidor de desenvolvimento lento

**Solução:**
```bash
# Modo rápido (sem minificação, hot reload otimizado)
npm run start:fast
```

### Verificação de Ambiente

#### Como verificar se tudo está configurado corretamente?

```bash
# Verificar Node.js
node --version  # Deve ser >= 20.0

# Verificar npm
npm --version   # Deve ser >= 10.0

# Verificar se dependências estão instaladas
ls node_modules  # Deve listar muitas pastas

# Verificar se Docusaurus está instalado
npx docusaurus --version  # Deve mostrar 3.9.2
```

### Comandos Úteis de Troubleshooting

```bash
# Limpar tudo e começar do zero
npm run clear
rm -rf node_modules package-lock.json
npm install
npm start

# Verificar erros de TypeScript
npm run typecheck

# Verificar problemas de lint
npm run lint

# Verificar formatação
npm run format:check
```

### Quando Procurar Ajuda

Se nenhuma das soluções acima funcionar:

1. Verifique os logs completos do erro
2. Confirme que está usando Node.js 20 (LTS)
3. Verifique se todas as dependências foram instaladas
4. Tente em um ambiente limpo (nova pasta, clone do repositório)
5. Consulte a [documentação oficial do Docusaurus](https://docusaurus.io/docs)
6. Veja os guias em [`DEVELOPMENT/`](./DEVELOPMENT/README.md) para mais informações
