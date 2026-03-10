import React from 'react';
import styles from './styles.module.css';

/**
 * Componente semântico para imagens na documentação.
 * 
 * Segue as melhores práticas de HTML5 semântico usando <figure> e <figcaption>.
 * Substitui a estrutura não semântica de <img> dentro de <p>.
 * 
 * @param props - Props do componente
 * @param props.src - URL da imagem
 * @param props.alt - Texto alternativo (obrigatório para acessibilidade)
 * @param props.title - Título da imagem (usado como figcaption se fornecido)
 * @param props.className - Classes CSS adicionais
 * @param props.loading - Estratégia de carregamento (lazy/eager)
 * @param props.width - Largura da imagem
 * @param props.height - Altura da imagem
 */
export interface DocumentationImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number | string;
  height?: number | string;
}

export function DocumentationImage({
  src,
  alt,
  title,
  className,
  loading = 'lazy',
  width,
  height,
  ...rest
}: DocumentationImageProps): React.JSX.Element {
  // Se houver title, usar como figcaption
  const hasCaption = Boolean(title);

  return (
    <figure className={styles.figure}>
      <img
        src={src}
        alt={alt}
        className={`${styles.image} ${className || ''}`}
        loading={loading}
        width={width}
        height={height}
        {...rest}
      />
      {hasCaption && (
        <figcaption className={styles.figcaption}>{title}</figcaption>
      )}
    </figure>
  );
}


