import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

// Load environment variables from .env file (if present) for local development
// This is safe to use even if .env doesn't exist - dotenv/config won't throw errors
// For production/GitHub Actions, variables are set directly in the environment
import "dotenv/config";

// Verificar se estamos em modo de desenvolvimento
// O Docusaurus define NODE_ENV=development quando usa 'docusaurus start'
// Verificamos se NODE_ENV não é 'production' (padrão é desenvolvimento)
const isDev = process.env.NODE_ENV !== "production";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
//
// Environment Variables:
// - Local development: Variables loaded from .env file (if present) via dotenv/config
// - Production/GitHub Actions: Variables set directly in environment (no .env needed)
// - Busca local: Não requer variáveis de ambiente (usa @easyops-cn/docusaurus-search-local)

const config: Config = {
  title: "Central Dev",
  tagline: "Documentação completa do Z-API",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Otimizações de build
  staticDirectories: ["static"],

  // Set the production url of your site here
  url: "https://CJBiohacker.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // Em desenvolvimento, usar '/' para evitar problemas com chunks
  // Em produção, usar '/Z-API-Central-Dev/' para GitHub Pages
  baseUrl: isDev ? "/" : "/Z-API-Central-Dev/",

  // GitHub pages deployment config.
  organizationName: "CJBiohacker",
  projectName: "Z-API-Central-Dev",
  trailingSlash: false,

  onBrokenLinks: "warn", // Temporariamente 'warn' para permitir desenvolvimento com arquivos faltantes
  // Suprimir avisos de âncoras quebradas no build
  onBrokenAnchors: "ignore",
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  themes: ["@docusaurus/theme-mermaid"],
  // Configuração customizada do Mermaid
  customFields: {
    mermaid: {
      theme: {
        light: "custom",
        dark: "custom-dark",
      },
      themeVariables: {
        light: {
          primaryColor: "#4a90e2",
          primaryTextColor: "#ffffff",
          primaryBorderColor: "#2c5aa0",
          lineColor: "#4a90e2",
          secondaryColor: "#f39c12",
          tertiaryColor: "#27ae60",
          background: "#ffffff",
          mainBkgColor: "#4a90e2",
          secondBkgColor: "#f39c12",
          tertiaryBkgColor: "#27ae60",
        },
        dark: {
          primaryColor: "#5ba3f5",
          primaryTextColor: "#ffffff",
          primaryBorderColor: "#3d7bc4",
          lineColor: "#5ba3f5",
          secondaryColor: "#ffb84d",
          tertiaryColor: "#4ade80",
          background: "#1e1e1e",
          mainBkgColor: "#5ba3f5",
          secondBkgColor: "#ffb84d",
          tertiaryBkgColor: "#4ade80",
        },
      },
    },
  },

  // Internationalization
  i18n: {
    defaultLocale: "pt-BR",
    locales: ["pt-BR", "en"],
    localeConfigs: {
      "pt-BR": {
        label: "Português (Brasil)",
        htmlLang: "pt-BR",
        calendar: "gregory",
      },
      en: {
        label: "English",
        htmlLang: "en",
        calendar: "gregory",
      },
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/docs",
          editUrl: undefined,
          // Excluir pastas de desenvolvimento interno do processamento MDX
          // Conforme AGENTS.MD: arquivos de desenvolvimento não devem ser públicos
          // Exclui completamente: development/, design-system/ e outras pastas internas
          exclude: [
            "**/development/**", // Exclui toda a pasta development/
            "**/design-system/**", // Exclui toda a pasta design-system/ (documentação interna)
            "**/_templates/**", // Exclui templates (arquivos de exemplo)
          ],
          // Plugins Remark (processamento de Markdown)
          // remark-gfm já está incluído automaticamente pelo preset-classic
          remarkPlugins: [
            // Matemática (necessário para rehype-katex funcionar completamente)
            require("remark-math"),
            // Emojis Unicode
            [require("remark-emoji"), { emoticon: true }],
            // Quebras de linha simples (sem precisar de dois espaços)
            require("remark-breaks"),
            // Títulos para blocos de código
            require("remark-code-titles"),
            // Notas de rodapé
            require("remark-footnotes"),
          ],
          // Plugins Rehype (processamento de HTML)
          // rehype-katex já está incluído automaticamente pelo preset-classic
          rehypePlugins: [
            // Equações matemáticas (KaTeX)
            // strict: false desabilita warnings sobre caracteres Unicode acentuados
            [require("rehype-katex"), { strict: false }],
          ],
        },
        blog: {
          showReadingTime: true,
          readingTime: ({ content, defaultReadingTime, locale }) =>
            defaultReadingTime({
              content,
              locale,
              options: { wordsPerMinute: 300 },
            }),
          feedOptions: {
            type: ["rss", "atom"],
            title: "Z-API Central Blog",
            description: "Guia, novidades e melhores práticas sobre o Z-API",
            copyright: `Copyright © ${new Date().getFullYear()} Z-API Central.`,
            language: "pt-BR",
            xslt: true,
          },
          blogTitle: "Z-API Central Blog",
          blogDescription: "Guia, novidades e melhores práticas",
          blogSidebarTitle: "Posts recentes",
          blogSidebarCount: 10,
          postsPerPage: 50, // Aumentado para exibir todos os posts (atualmente temos 33 posts)
          editUrl:
            "https://github.com/CJBiohacker/Z-API-Central-Dev/tree/main/",
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
          // Excluir arquivos de template e desenvolvimento do processamento MDX
          // Conforme AGENTS.MD: arquivos de desenvolvimento não devem ser públicos
          exclude: ["TEMPLATE_POST_BLOG.md", "**/TEMPLATE_*.md"],
          // Plugins Remark (processamento de Markdown)
          // remark-gfm já está incluído automaticamente pelo preset-classic
          remarkPlugins: [
            // Matemática (necessário para rehype-katex funcionar completamente)
            require("remark-math"),
            // Emojis Unicode
            [require("remark-emoji"), { emoticon: true }],
            // Quebras de linha simples (sem precisar de dois espaços)
            require("remark-breaks"),
            // Títulos para blocos de código
            require("remark-code-titles"),
            // Notas de rodapé
            require("remark-footnotes"),
          ],
          // Plugins Rehype (processamento de HTML)
          // rehype-katex já está incluído automaticamente pelo preset-classic
          rehypePlugins: [
            // Equações matemáticas (KaTeX)
            // strict: false desabilita warnings sobre caracteres Unicode acentuados
            [require("rehype-katex"), { strict: false }],
          ],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        // Desabilitar sitemap do preset classic para usar versão configurada explicitamente
        sitemap: false,
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // Plugin para melhorias de acessibilidade (aria-labels)
    require.resolve("./src/client-modules/accessibility-plugin.js"),
    // Plugin sitemap configurado explicitamente para excluir rotas confidenciais
    [
      "@docusaurus/plugin-sitemap",
      {
        changefreq: "weekly",
        priority: 0.5,
        ignorePatterns: [],
        // Nota: filterRoutes não é uma propriedade suportada pelo plugin sitemap
        // Use ignorePatterns para excluir rotas específicas
      },
    ],
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: false,
        // Otimizações de build
        cacheDir: ".docusaurus/ideal-image",
        // Usar formatos modernos (WebP) quando disponível
        formats: ["webp", "png"],
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        // Limitar redirects apenas para arquivos de documentação (docs) e blog
        // Isso evita conflitos com páginas estáticas em src/pages/
        fromExtensions: ["html", "md", "mdx"],
        // Excluir redirects automáticos para páginas que já existem
        // O plugin tentará criar /404.html → /404, mas /404 já existe como página estática
        // O warning é esperado e não crítico - o plugin ignora corretamente o redirect
        redirects: [
          // Redirects para arquivos renomeados
          {
            from: "/docs/integradors/find-my-pack",
            to: "/docs/integradors/encontrar-meu-pacote",
          },
        ],
        createRedirects(existingPath) {
          // O existingPath vem com baseUrl incluído (ex: /Z-API-Central-Dev/docs/intro ou /docs/intro)
          // Usar o baseUrl dinâmico baseado no ambiente
          const baseUrl = isDev ? "" : "/Z-API-Central-Dev";

          // Normalizar o caminho removendo baseUrl se presente
          const normalizedPath = existingPath.startsWith(baseUrl)
            ? existingPath.slice(baseUrl.length) || "/"
            : existingPath;

          // Limpar barras finais para comparação
          const cleanNormalized = normalizedPath.replace(/\/$/, "") || "/";

          // Excluir redirects automáticos para /404.html → /404
          // O Docusaurus já tem uma página 404 nativa e o plugin detecta isso automaticamente
          // Este check previne tentativas de criar redirects para /404
          if (cleanNormalized === "/404" || cleanNormalized === "/404.html") {
            return [];
          }

          // Rotas que já têm páginas dedicadas em src/pages/ - NÃO criar redirects
          // Estas rotas são páginas estáticas React e não devem ter redirects criados
          const staticPageRoutes = ["/", "/no-code", "/404"];

          // Verificar se é uma rota de página estática
          // Se for, não criar redirects para evitar conflitos
          if (staticPageRoutes.includes(cleanNormalized)) {
            return [];
          }

          // Se chegou até aqui e não é uma rota estática, processar redirects normalmente
          // MAS apenas para rotas de documentação (docs) e blog
          // Não criar redirects para outras rotas que não sejam docs ou blog
          if (
            !cleanNormalized.startsWith("/docs") &&
            !cleanNormalized.startsWith("/blog")
          ) {
            return [];
          }

          // Redirecionar sem e com barra final para outras rotas (apenas para docs, blog, etc.)
          // MAS apenas se não estiver na lista de exclusão
          if (existingPath.endsWith("/")) {
            const withoutSlash = existingPath.slice(0, -1);
            const cleanWithoutSlash = withoutSlash.startsWith(baseUrl)
              ? withoutSlash.slice(baseUrl.length).replace(/\/$/, "") || "/"
              : withoutSlash.replace(/\/$/, "") || "/";

            // Verificar se é uma rota de página estática
            if (staticPageRoutes.includes(cleanWithoutSlash)) {
              return [];
            }

            // Apenas criar redirect se for docs ou blog
            if (
              !cleanWithoutSlash.startsWith("/docs") &&
              !cleanWithoutSlash.startsWith("/blog")
            ) {
              return [];
            }

            return [withoutSlash];
          }

          const withSlash = `${existingPath}/`;
          const cleanWithSlash = withSlash.startsWith(baseUrl)
            ? withSlash.slice(baseUrl.length).replace(/\/$/, "") || "/"
            : withSlash.replace(/\/$/, "") || "/";

          // Verificar se é uma rota de página estática
          if (staticPageRoutes.includes(cleanWithSlash)) {
            return [];
          }

          // Apenas criar redirect se for docs ou blog
          if (
            !cleanWithSlash.startsWith("/docs") &&
            !cleanWithSlash.startsWith("/blog")
          ) {
            return [];
          }

          return [withSlash];
        },
      },
    ],
    // Plugin de busca local (substitui o Algolia DocSearch)
    // Nota: O plugin gera índices automaticamente durante o desenvolvimento
    // Se você encontrar erros de JSON parse, execute 'npm run build' primeiro para gerar os índices
    [
      "@easyops-cn/docusaurus-search-local",
      {
        // Opções de configuração do plugin de busca local
        hashed: true, // Usar hash para melhor cache
        language: ["pt", "en"], // Idioma da busca (lunr-languages usa 'pt' para português)
        docsRouteBasePath: "/docs", // Base path da documentação
        blogRouteBasePath: "/blog", // Base path do blog
        indexBlog: true, // Indexar posts do blog
        indexPages: false, // Não indexar páginas estáticas por padrão
        highlightSearchTermsOnTargetPage: true, // Destacar termos de busca na página de destino
        searchResultLimits: 8, // Limite de resultados por categoria
        searchResultContextMaxLength: 50, // Comprimento máximo do contexto nos resultados
        // Em desenvolvimento, o plugin pode tentar carregar índices antes que sejam gerados
        // O Docusaurus deve gerar os índices automaticamente, mas pode haver um delay inicial
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/zapi-social-card.jpg",
    metadata: [
      {
        name: "keywords",
        content:
          "Z-API, WhatsApp API, API REST, Documentação, Z-API Central, Design System, UI/UX",
      },
      {
        name: "description",
        content:
          "Documentação completa do Z-API - Interaja com WhatsApp através do Z-API, uma API simples e intuitiva. Design system híbrido Z-API.",
      },
    ],
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Central Dev",
      logo: {
        alt: "Z-API Logo",
        src: "img/z-api-logo.webp",
      },
      hideOnScroll: false,
      items: [
        {
          type: "docSidebar",
          sidebarId: "zapiSidebar",
          position: "left",
          label: "Documentação",
        },
        {
          to: "/blog",
          label: "Blog",
          position: "left",
        },
        {
          to: "/no-code",
          label: "No Code",
          position: "left",
        },
        {
          href: "https://developer.z-api.io",
          label: "Site Oficial",
          position: "right",
          className: "navbar__link--external",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
        {
          type: "search",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentação",
          items: [
            {
              label: "Introdução",
              to: "/docs/intro",
            },
            {
              label: "Quick Start",
              to: "/docs/quick-start/introducao",
            },
            {
              label: "API Reference",
              to: "/docs/messages/introducao",
            },
          ],
        },
        {
          title: "Recursos",
          items: [
            {
              label: "Site Oficial",
              href: "https://developer.z-api.io",
            },
            {
              label: "Postman Collection",
              href: "https://developer.z-api.io",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Z-API Central. Documentação não oficial do Z-API.`,
    },
    // Busca local (substituiu o Algolia DocSearch)
    // Configuração do plugin @easyops-cn/docusaurus-search-local está em plugins[]
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        "bash",
        "json",
        "http",
        "javascript",
        "typescript",
        "python",
      ],
      magicComments: [
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "code-block-error-line",
          line: "This will error",
        },
      ],
    },
    // Habilitar opções de live code block (requer @docusaurus/theme-live-codeblock)
    liveCodeBlock: {
      playgroundPosition: "bottom",
    },
    announcementBar: {
      id: "support_us",
      content:
        '⭐ Se você gostou do Z-API Central, considere dar uma estrela no <a target="_blank" rel="noopener noreferrer" href="https://github.com/CJBiohacker/Z-API-Central-Dev">GitHub</a>!',
      backgroundColor: "#fafbfc",
      textColor: "#091E42",
      isCloseable: true,
    },
  } satisfies Preset.ThemeConfig,
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",
      type: "text/css",
      integrity: undefined,
      crossorigin: "anonymous",
    },
  ],
  // Nota: Preload de recursos críticos é feito via <Head> component em src/pages/index.tsx
  // Isso garante que o logo do navbar seja pré-carregado para melhorar LCP
  //
  // Otimizações de desenvolvimento:
  // - Scripts otimizados em package.json (start, start:fast, start:watch)
  // - TypeScript incremental habilitado em tsconfig.json
  // - Variáveis de ambiente em .env.development
  // - baseUrl dinâmico (/' em dev, '/Z-API-Central-Dev/' em prod)
  //
  // Nota sobre build e memória:
  // - O limite de memória está configurado em package.json via NODE_OPTIONS=--max-old-space-size=8192
  // - Se o build ainda falhar com "heap out of memory", use npm run build:fast (sem minificação)
};

export default config;
