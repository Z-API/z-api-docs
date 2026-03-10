import React from 'react';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import styles from './styles.module.css';

export type BlogCardProps = {
  title: string;
  href: string;
  excerpt?: string;
  coverImageUrl?: string;
  meta?: React.ReactNode;
  category?: string;
  showReadMore?: boolean;
  variant?: 'default' | 'featured' | 'compact';
};

export function BlogCard({ 
  title, 
  href, 
  excerpt, 
  coverImageUrl, 
  meta,
  category,
  showReadMore = true,
  variant = 'default'
}: BlogCardProps) {
  return (
    <a 
      className={clsx(styles.root, styles[variant])} 
      href={href}
      aria-label={`Ler artigo: ${title}`}
    >
      {coverImageUrl && variant !== 'compact' ? (
        <img 
          className={styles.cover} 
          src={coverImageUrl} 
          alt="" 
          aria-hidden="true"
        />
      ) : null}
      {category && category.trim() !== '' ? (
        <span 
          className={styles.category}
          aria-label={`Categoria: ${category}`}
        >
          {category}
        </span>
      ) : null}
      <div className={styles.title}>{title}</div>
      {excerpt && variant !== 'compact' ? (
        <div className={styles.excerpt}>{excerpt}</div>
      ) : null}
      {meta ? <div className={styles.meta}>{meta}</div> : null}
      {showReadMore && variant !== 'compact' ? (
        <div className={styles.readMore}>
          <span>Ler mais</span>
          <ArrowRight className={styles.readMoreIcon} size={16} aria-hidden="true" />
        </div>
      ) : null}
    </a>
  );
}

export default BlogCard;


