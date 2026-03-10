/**
 * BlogPostPage redesenhado baseado no design do Figma
 * Layout: Hero (categoria → título → meta com avatar → feature image) + 
 *         Conteúdo principal + Popular Posts Sidebar + Related Articles
 */
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import TOC from '@theme/TOC';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import React, { useMemo } from 'react';

import styles from './styles.module.css';

/**
 * Componente wrapper para inserir posts relacionados antes das perguntas frequentes
 * Usa React Portal para inserir conteúdo antes da seção FAQ
 */
function PostContentWrapper({ 
  children, 
  relatedPosts 
}: { 
  children: React.ReactNode; 
  relatedPosts: Array<{
    title: string;
    permalink: string;
    description?: string;
    coverImageUrl?: string;
    category?: string;
  }>;
}) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [faqElement, setFaqElement] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!contentRef.current || relatedPosts.length === 0) return;

    // Procurar por seção de perguntas frequentes após renderização
    const findFAQ = () => {
      const headings = contentRef.current?.querySelectorAll('h2') || [];
      for (const heading of Array.from(headings)) {
        const text = heading.textContent?.toLowerCase() || '';
        if (
          text.includes('perguntas frequentes') ||
          text.includes('faq') ||
          (text.includes('perguntas') && !text.includes('relacionados'))
        ) {
          setFaqElement(heading as HTMLElement);
          return;
        }
      }
    };

    // Aguardar renderização do conteúdo
    const timeout = setTimeout(findFAQ, 100);
    return () => clearTimeout(timeout);
  }, [relatedPosts]);

  return (
    <>
      <div ref={contentRef}>{children}</div>
      {faqElement && relatedPosts.length > 0 && (
        <RelatedPostsSection 
          relatedPosts={relatedPosts} 
          insertBefore={faqElement}
        />
      )}
    </>
  );
}

/**
 * Componente para renderizar posts relacionados
 * Design Figma: Layout horizontal com imagens à esquerda
 * Será inserido antes da seção FAQ via DOM manipulation
 */
function RelatedPostsSection({
  relatedPosts,
  insertBefore,
}: {
  relatedPosts: Array<{
    title: string;
    permalink: string;
    description?: string;
    coverImageUrl?: string;
    category?: string;
  }>;
  insertBefore: HTMLElement;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current || !insertBefore.parentElement) return;

    // Inserir antes do elemento FAQ
    insertBefore.parentElement.insertBefore(containerRef.current, insertBefore);
    
    return () => {
      // Cleanup: remover ao desmontar
      containerRef.current?.remove();
    };
  }, [insertBefore]);

  // Calcular tempo de leitura estimado (placeholder)
  const getReadingTime = (description?: string) => {
    if (!description) return '4 min de leitura';
    const wordCount = description.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 300);
    return `${minutes} min de leitura`;
  };

  return (
    <div ref={containerRef} className={styles.relatedPosts} aria-labelledby="related-posts-heading">
      <h2 id="related-posts-heading" className={styles.relatedPostsTitle}>
        Aqui estão alguns artigos relacionados que podem interessar:
      </h2>
      <div className={styles.relatedPostsList}>
        {relatedPosts.map((post) => (
          <a
            key={post.permalink}
            href={post.permalink}
            className={styles.relatedPostCard}
            aria-label={`Ler artigo: ${post.title}`}
          >
            {post.coverImageUrl ? (
              <img
                className={styles.relatedPostImage}
                src={post.coverImageUrl}
                alt=""
                aria-hidden="true"
              />
            ) : null}
            <div className={styles.relatedPostContent}>
              <div className={styles.relatedPostMeta}>
                {post.category ? (
                  <span className={styles.relatedPostCategory}>
                    {post.category}
                  </span>
                ) : null}
                {post.category ? (
                  <span className={styles.relatedPostMetaSeparator} aria-hidden="true">-</span>
                ) : null}
                <span className={styles.relatedPostReadingTime}>
                  {getReadingTime(post.description)}
                </span>
              </div>
              <h3 className={styles.relatedPostTitle}>{post.title}</h3>
              {post.description ? (
                <p className={styles.relatedPostDescription}>{post.description}</p>
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

type BlogAuthor = { name?: string };
type BlogTag = { label?: string; permalink?: string };

type BlogPostContentComponent = React.ComponentType & {
  metadata: {
    title: string;
    description?: string;
    date?: string;
    permalink: string;
    tags: BlogTag[];
    authors: BlogAuthor[];
  };
  frontMatter: Record<string, unknown>;
  toc?: Array<{ value: string }>;
};

type BlogPostPageProps = {
  content: BlogPostContentComponent;
};

/**
 * Extrai categoria do post seguindo prioridade:
 * 1. frontmatter.category (se definido)
 * 2. primeira tag (label ou permalink)
 * 3. undefined (sem categoria)
 */
function extractCategory(
  frontMatter: Record<string, unknown>,
  tags: Array<{ label?: string; permalink?: string }>
): string | undefined {
  // Prioridade 1: frontmatter.category
  if (frontMatter.category && typeof frontMatter.category === 'string') {
    return frontMatter.category;
  }
  
  // Prioridade 2: primeira tag
  if (tags && tags.length > 0) {
    return tags[0]?.label ?? tags[0]?.permalink;
  }
  
  // Sem categoria
  return undefined;
}

/**
 * Encontra posts relacionados baseado em tags e categoria em comum
 */
function findRelatedPosts(
  currentPost: {
    permalink: string;
    tags: Array<{ label?: string; permalink?: string }>;
    category?: string;
  },
  allPosts: Array<{
    metadata: {
      permalink: string;
      title: string;
      description?: string;
      tags: Array<{ label?: string; permalink?: string }>;
    };
    frontMatter: Record<string, unknown>;
  }>,
  maxRelated: number = 3
): Array<{
  title: string;
  permalink: string;
  description?: string;
  coverImageUrl?: string;
  category?: string;
}> {
  // Obter tags do post atual (normalizadas)
  const currentTags = currentPost.tags
    .map((tag) => tag.label?.toLowerCase() || tag.permalink?.toLowerCase())
    .filter(Boolean) as string[];

  // Obter categoria do post atual
  const currentCategory = currentPost.category;

  // Calcular score de relacionamento para cada post
  const postsWithScore = allPosts
    .filter((post) => post.metadata.permalink !== currentPost.permalink) // Excluir post atual
    .map((post) => {
      const postTags = post.metadata.tags
        .map((tag) => tag.label?.toLowerCase() || tag.permalink?.toLowerCase())
        .filter(Boolean) as string[];

      // Calcular tags em comum
      const commonTags = currentTags.filter((tag) => postTags.includes(tag));
      const tagScore = commonTags.length;

      // Calcular score de categoria
      const postCategory = extractCategory(post.frontMatter, post.metadata.tags);
      const categoryScore = currentCategory && postCategory === currentCategory ? 1 : 0;

      // Score total: tags em comum + bônus de categoria
      const totalScore = tagScore * 2 + categoryScore * 3;

      return {
        post,
        score: totalScore,
        commonTags,
      };
    })
    .filter((item) => item.score > 0) // Apenas posts com alguma relação
    .sort((a, b) => b.score - a.score) // Ordenar por score (maior primeiro)
    .slice(0, maxRelated); // Limitar quantidade

  // Converter para formato de BlogCard
  return postsWithScore.map((item) => {
    const { metadata, frontMatter } = item.post;
    const customFrontMatter = frontMatter as {
      summary?: string;
      cover?: string;
      image?: string;
      category?: string;
    };
    const category = extractCategory(frontMatter, metadata.tags);

    return {
      title: metadata.title,
      permalink: metadata.permalink,
      description: metadata.description || customFrontMatter.summary,
      coverImageUrl: customFrontMatter.image || customFrontMatter.cover,
      category,
    };
  });
}

export default function BlogPostPage(props: BlogPostPageProps): React.JSX.Element {
  const {content: PostContent} = props;
  const {siteConfig} = useDocusaurusContext();
  const {metadata, frontMatter} = PostContent;
  const {
    title,
    description: metaDescription,
    date, // ISO date string
    tags,
    authors,
    permalink,
  } = metadata;

  const fm = frontMatter as {
    image?: string;
    cover?: string;
    summary?: string;
    category?: string;
  };

  // Imagem padrão para posts sem imagem
  const DEFAULT_IMAGE = 'https://ascenty.com/wp-content/uploads/2022/04/tecnologia-na-educa%C3%A7%C3%A3o-1920x1000-c-default.png';
  const cover = fm.image || fm.cover || DEFAULT_IMAGE;
  const category = extractCategory(frontMatter, tags);

  // Obter todos os posts do blog para encontrar relacionados
  // Tentar acessar via siteConfig ou usar fallback
  const allBlogPosts = useMemo(() => {
    try {
      // Tentar acessar posts via siteConfig (se disponível)
      // @ts-expect-error - blogListItems pode não estar tipado
      const blogListItems = siteConfig?.plugins?.find(
        (plugin: unknown) => Array.isArray(plugin) && plugin[0] === '@docusaurus/plugin-content-blog'
      )?.[1]?.blogListComponent?.props?.items;
      
      if (blogListItems && Array.isArray(blogListItems)) {
        return blogListItems.map((item: any) => ({
          metadata: {
            permalink: item.content.metadata.permalink,
            title: item.content.metadata.title,
            description: item.content.metadata.description,
            tags: item.content.metadata.tags || [],
          },
          frontMatter: item.content.frontMatter || {},
        }));
      }
    } catch (error) {
      console.warn('Não foi possível acessar posts do blog:', error);
    }
    
    // Fallback: retornar array vazio (posts relacionados não serão exibidos)
    return [];
  }, [siteConfig]);

  // Encontrar posts relacionados
  const relatedPosts = useMemo(() => {
    return findRelatedPosts(
      {
        permalink,
        tags,
        category,
      },
      allBlogPosts,
      3
    );
  }, [permalink, tags, category, allBlogPosts]);

  // Calcular tempo de leitura usando metadata do Docusaurus
  // O Docusaurus calcula automaticamente via showReadingTime no config
  const readingTime = useMemo(() => {
    // Tentar obter readingTime da metadata se disponível
    const metadataReadingTime = (metadata as any).readingTime;
    if (metadataReadingTime && typeof metadataReadingTime === 'number') {
      return metadataReadingTime;
    }
    // Fallback: estimativa baseada em description
    if (metaDescription) {
      const wordCount = metaDescription.split(/\s+/).length;
      return Math.ceil(wordCount / 300);
    }
    return undefined;
  }, [metadata, metaDescription]);

  // Format date gracefully
  const dateLabel = date ? new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : undefined;

  // Obter primeiro autor com imagem
  const firstAuthor = authors && authors.length > 0 ? authors[0] : null;
  const authorImage = firstAuthor && 'image_url' in firstAuthor 
    ? (firstAuthor as any).image_url 
    : undefined;
  const authorName = firstAuthor?.name || 'Z-API Central';

  // Obter posts populares (top 4 mais recentes, excluindo o atual)
  const popularPosts = useMemo(() => {
    return allBlogPosts
      .filter((post) => post.metadata.permalink !== permalink)
      .sort((a, b) => {
        // Ordenar por data (mais recente primeiro)
        const dateA = (a.frontMatter as any).date || '';
        const dateB = (b.frontMatter as any).date || '';
        return dateB.localeCompare(dateA);
      })
      .slice(0, 4)
      .map((item) => {
        const { metadata, frontMatter } = item;
        const customFrontMatter = frontMatter as {
          summary?: string;
          cover?: string;
          image?: string;
          category?: string;
        };
        const postCategory = extractCategory(frontMatter, metadata.tags);
        return {
          title: metadata.title,
          permalink: metadata.permalink,
          coverImageUrl: customFrontMatter.image || customFrontMatter.cover,
          category: postCategory,
        };
      });
  }, [allBlogPosts, permalink]);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        {metaDescription ? (
          <meta name="description" content={metaDescription} />
        ) : null}
        {cover ? <meta property="og:image" content={cover} /> : null}
      </Head>
      
      {/* Hero do Post - Design Figma: categoria → título → meta (com avatar) → feature image */}
      <div className={clsx(styles.hero)}>
        <div className={styles.heroContent}>
          {category ? (
            <div className={styles.category}>{category.toUpperCase()}</div>
          ) : null}
          <h1 className={styles.title}>{title}</h1>
          
          {/* Meta Section com Avatar */}
          <div className={styles.metaSection}>
            {authorImage ? (
              <img
                className={styles.authorAvatar}
                src={authorImage}
                alt={authorName}
                aria-hidden="true"
              />
            ) : null}
            <div className={styles.meta}>
              <span className={styles.metaLabel}>Por</span>
              <span className={styles.authorName}>{authorName}</span>
              {dateLabel ? (
                <>
                  <span className={styles.metaSeparator} aria-hidden="true">|</span>
                  <span className={styles.metaLabel}>Publicado em</span>
                  <span className={styles.date}>{dateLabel}</span>
                </>
              ) : null}
              {readingTime ? (
                <>
                  <span className={styles.metaSeparator} aria-hidden="true">|</span>
                  <span className={styles.readingTime}>{readingTime} min de leitura</span>
                </>
              ) : null}
            </div>
          </div>
        </div>
        
        {/* Feature Image */}
        {cover ? (
          <img
            className={styles.cover}
            src={cover}
            alt=""
            aria-hidden="true"
            loading="eager"
          />
        ) : null}
      </div>

      {/* Layout de duas colunas: Conteúdo + Popular Posts Sidebar */}
      <div className={styles.pageLayout}>
        <main className={styles.postContent}>
          <PostContentWrapper relatedPosts={relatedPosts}>
            <PostContent />
          </PostContentWrapper>
        </main>
        
        {/* Sidebar: Popular Posts + TOC */}
        <aside className={styles.sidebar}>
          {/* Popular Posts */}
          {popularPosts.length > 0 ? (
            <div className={styles.popularPosts}>
              <h2 className={styles.popularPostsTitle}>Posts Populares</h2>
              <div className={styles.popularPostsList}>
                {popularPosts.map((post, index) => (
                  <React.Fragment key={post.permalink}>
                    <a 
                      href={post.permalink}
                      className={styles.popularPostItem}
                      aria-label={`Ler artigo: ${post.title}`}
                    >
                      {post.coverImageUrl ? (
                        <img
                          className={styles.popularPostThumb}
                          src={post.coverImageUrl}
                          alt=""
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className={styles.popularPostContent}>
                        {post.category ? (
                          <span className={styles.popularPostCategory}>
                            {post.category}
                          </span>
                        ) : null}
                        <h3 className={styles.popularPostTitle}>{post.title}</h3>
                      </div>
                    </a>
                    {index < popularPosts.length - 1 ? (
                      <div className={styles.popularPostSeparator} aria-hidden="true" />
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ) : null}
          
          {/* TOC */}
          {PostContent.toc && Array.isArray(PostContent.toc) && PostContent.toc.length > 0 ? (
            <div className={styles.postToc} aria-label="Sumário do post">
              <h2 className={styles.tocTitle}>Sumário</h2>
              <TOC toc={PostContent.toc} minHeadingLevel={2} maxHeadingLevel={4} />
            </div>
          ) : null}
        </aside>
      </div>
    </Layout>
  );
}

