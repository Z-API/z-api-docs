import clsx from 'clsx';
import { useState } from 'react';

import styles from './styles.module.css';

export type ImageWithFallbackProps = {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  /** Aspect ratio para prevenir CLS (Cumulative Layout Shift) - formato: "16/9" */
  aspectRatio?: string;
  /** Loading strategy: "lazy" para imagens abaixo da dobra, "eager" para hero/críticas */
  loading?: 'lazy' | 'eager';
  /** Fetch priority: "high" para LCP, "low" para imagens decorativas */
  fetchPriority?: 'high' | 'low' | 'auto';
  /** Width e height para prevenir layout shift */
  width?: number;
  height?: number;
  /** srcset para imagens responsivas - formato: "image-320w.jpg 320w, image-640w.jpg 640w" */
  srcSet?: string;
  /** sizes para imagens responsivas - formato: "(max-width: 768px) 100vw, 50vw" */
  sizes?: string;
};

/**
 * Componente de imagem resiliente com fallback automático.
 * Otimizado para Core Web Vitals: aspect-ratio, loading strategy e fetch priority.
 * Útil para cards que consomem assets externos (Unsplash, CDN, etc.).
 * 
 * @param props - Props do componente ImageWithFallback
 * @param props.aspectRatio - Aspect ratio para prevenir CLS (ex: "16/9", "1/1", "4/3")
 * @param props.loading - "lazy" para imagens abaixo da dobra, "eager" para hero/críticas
 * @param props.fetchPriority - "high" para LCP, "low" para decorativas
 * @param props.width - Largura da imagem (recomendado para prevenir layout shift)
 * @param props.height - Altura da imagem (recomendado para prevenir layout shift)
 */
export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackSrc = '/img/z-api-logo.webp',
  aspectRatio,
  loading = 'lazy',
  fetchPriority = 'auto',
  width,
  height,
  srcSet,
  sizes,
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={clsx(styles.image, className)}
      loading={loading}
      fetchPriority={fetchPriority}
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={sizes}
      style={aspectRatio ? { aspectRatio } : undefined}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}


