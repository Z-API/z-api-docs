/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Head from '@docusaurus/Head';
import { BlogCard } from '@site/src/components/shared/BlogCard';
import Subscribe from '@site/src/components/shared/Subscribe';
import Layout from '@theme/Layout';
import clsx from 'clsx';

import styles from './styles.module.css';

type BlogListItem = {
  content: {
    metadata: {
      title: string;
      description?: string;
      permalink: string;
      authors: Array<{ name?: string }>;
      tags: Array<{ label?: string }>;
      date?: string;
    };
    frontMatter: Record<string, unknown>;
  };
};

type BlogListPageProps = {
  metadata: {
    blogTitle: string;
    blogDescription: string;
    [key: string]: unknown;
  };
  items: BlogListItem[];
};

/**
 * BlogListPage - Página inicial do blog customizada no estilo WhatsApp Business Blog
 * 
 * Estrutura:
 * - Hero: Título e descrição do blog
 * - Featured Posts: Posts destacados (featured: true) - apenas primeiro em layout grande
 * - Posts por Categoria: Todas as postagens organizadas por categoria
 * - All Posts: Lista cronológica completa - grid de cards com categoria e Read more
 * - Archives: Link para arquivo do blog
 * - Subscribe: Formulário de assinatura
 */


function BlogListPage(props: BlogListPageProps): React.JSX.Element {
  const {metadata, items} = props;
  const {blogTitle, blogDescription} = metadata;

  // Filtrar posts destacados
  const featuredPosts = items.filter((item) => {
    const {frontMatter} = item.content;
    return (frontMatter as {featured?: boolean}).featured === true;
  });

  // Ordenar todos os posts por data (mais recente primeiro)
  const sortedItems = [...items].sort((a, b) => {
    const dateA = a.content.metadata.date || '';
    const dateB = b.content.metadata.date || '';
    // Se não tem data, colocar no final
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return dateB.localeCompare(dateA);
  });

  return (
    <Layout>
      <Head>
        <title>{blogTitle}</title>
        <meta name="description" content={blogDescription} />
      </Head>
      <div className={clsx('container', styles.blogListPage)}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <h1 className={styles.heroTitle}>{blogTitle}</h1>
          <p className={styles.heroDescription}>{blogDescription}</p>
        </header>

        {/* Featured Posts Section - Apenas primeiro post em layout grande */}
        {featuredPosts.length > 0 && (() => {
          const firstFeatured = featuredPosts[0];
          if (!firstFeatured) return null;
          
          const {metadata: postMetadata, frontMatter} = firstFeatured.content;
          const customFrontMatter = frontMatter as {
            summary?: string;
            cover?: string;
            image?: string;
            category?: string;
          };
          
          return (
            <section className={styles.section} aria-labelledby="featured-heading">
              <h2 id="featured-heading" className={styles.sectionTitle}>
                Destaques
              </h2>
              <div className={styles.featuredContainer}>
                <BlogCard
                  key={postMetadata.permalink}
                  title={postMetadata.title}
                  href={postMetadata.permalink}
                  excerpt={postMetadata.description || customFrontMatter.summary}
                  coverImageUrl={customFrontMatter.image || customFrontMatter.cover}
                  category={undefined}
                  variant="featured"
                  showReadMore={true}
                  meta={
                    <div className={styles.meta}>
                      {postMetadata.authors.length > 0 && postMetadata.authors[0] && (
                        <span className={styles.author}>
                          {postMetadata.authors[0].name}
                        </span>
                      )}
                      {postMetadata.tags.length > 0 && (
                        <div className={styles.tagsContainer}>
                          {postMetadata.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className={styles.tags}>
                              {tag.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  }
                />
              </div>
            </section>
          );
        })()}

        {/* Todos os Posts - Grid único sem separação por categoria */}
        <section className={styles.section} aria-labelledby="all-posts-heading">
          <h2 id="all-posts-heading" className={styles.sectionTitle}>
            Todos os Posts
          </h2>
          <div className={styles.allPostsGrid}>
            {sortedItems.map((item) => {
              const {metadata: postMetadata, frontMatter} = item.content;
              const customFrontMatter = frontMatter as {
                summary?: string;
                cover?: string;
                image?: string;
                category?: string;
              };
              return (
                <BlogCard
                  key={postMetadata.permalink}
                  title={postMetadata.title}
                  href={postMetadata.permalink}
                  excerpt={postMetadata.description || customFrontMatter.summary}
                  coverImageUrl={customFrontMatter.image || customFrontMatter.cover}
                  category={undefined}
                  variant="default"
                  showReadMore={true}
                  meta={
                    <div className={styles.meta}>
                      {postMetadata.date && (
                        <time dateTime={postMetadata.date} className={styles.date}>
                          {new Date(postMetadata.date).toLocaleDateString('pt-BR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      )}
                      {postMetadata.authors.length > 0 && postMetadata.authors[0] && (
                        <span className={styles.author}>
                          {postMetadata.authors[0].name}
                        </span>
                      )}
                      {postMetadata.tags.length > 0 && (
                        <div className={styles.tagsContainer}>
                          {postMetadata.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className={styles.tags}>
                              {tag.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  }
                />
              );
            })}
          </div>
        </section>

        {/* Subscribe Section */}
        <Subscribe
          serviceUrl="https://business.whatsapp.com/blog"
          title="Receba as últimas novidades do Z-API Central"
          description="Inscreva-se para receber nossos últimos guias, insights e inspiração para fazer mais com conversas."
        />

        {/* Archives Link */}
        <section className={styles.section}>
          <div className={styles.archives}>
            <h2 className={styles.sectionTitle}>Blog Archives</h2>
            <p className={styles.archivesDescription}>
              Explore todos os posts organizados por data.
            </p>
            <a href="/Z-API-Central-Dev/blog/archive" className={styles.archiveLink}>
              Ver Arquivo Completo →
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default BlogListPage;

