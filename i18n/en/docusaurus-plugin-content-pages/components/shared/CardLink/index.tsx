import styles from './styles.module.css';

export type CardLinkProps = {
  title: string;
  description?: string;
  href: string;
};

export function CardLink({ title, description, href }: CardLinkProps) {
  return (
    <a className={styles.cardLink} href={href}>
      <div className={styles.title}>{title}</div>
      {description ? <div className={styles.description}>{description}</div> : null}
    </a>
  );
}

export default CardLink;


