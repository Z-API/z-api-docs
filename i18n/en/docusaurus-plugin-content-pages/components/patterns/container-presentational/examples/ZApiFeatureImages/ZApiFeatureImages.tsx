/**
 * ZApiFeatureImages - Componente Presentacional
 * 
 * Responsabilidade: Como os dados são exibidos
 * - Recebe dados via props
 * - Não modifica os dados
 * - Foca apenas na renderização
 * 
 * Segue o padrão Container/Presentational conforme:
 * https://www.patterns.dev/react/presentational-container-pattern/
 * 
 * Este exemplo demonstra o padrão usando imagens reais do projeto Z-API.
 */

import type { ReactNode } from 'react';
import styles from './styles.module.css';

/**
 * Props do componente ZApiFeatureImages (Presentational)
 */
type ZApiFeatureImagesProps = {
  /** Array de URLs de imagens de features da Z-API */
  images: string[];
  /** Se está carregando */
  isLoading?: boolean;
  /** Erro ocorrido */
  error?: Error | null;
  /** Título da seção (opcional) */
  title?: string;
};

/**
 * Componente Presentacional - ZApiFeatureImages
 * 
 * Este componente apenas renderiza os dados que recebe via props.
 * Não gerencia estado, não faz fetch, não tem lógica de aplicação.
 * 
 * @param props - Props do componente
 * @param props.images - Array de URLs de imagens
 * @param props.isLoading - Se está carregando
 * @param props.error - Erro ocorrido
 * @param props.title - Título da seção
 * @returns Componente React renderizado
 * 
 * @example
 * ```tsx
 * <ZApiFeatureImages images={['/img/Status1.jpeg', '/img/Status2.jpeg']} />
 * ```
 */
export default function ZApiFeatureImages({ 
  images, 
  isLoading = false, 
  error = null,
  title = 'Imagens de Features da Z-API'
}: ZApiFeatureImagesProps): ReactNode {
  // Mostrar loading
  if (isLoading) {
    return (
      <div className={styles.loading} role="status" aria-live="polite">
        <p>Carregando imagens...</p>
      </div>
    );
  }

  // Mostrar erro
  if (error) {
    return (
      <div className={styles.error} role="alert" aria-live="assertive">
        <p>Erro ao carregar imagens: {error.message}</p>
      </div>
    );
  }

  // Renderizar imagens
  if (!images || images.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Nenhuma imagem encontrada</p>
      </div>
    );
  }

  return (
    <section className={styles.featureImages} aria-label={title}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.imagesGrid}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageWrapper}>
            <img
              src={image}
              alt={`Feature Z-API ${index + 1}`}
              className={styles.featureImage}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
