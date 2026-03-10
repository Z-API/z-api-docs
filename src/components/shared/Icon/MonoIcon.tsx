
/**
 * Nomes dos ícones Mono disponíveis para uso no layout.
 *
 * Estes nomes devem corresponder aos arquivos SVG exportados
 * do arquivo Figma "Mono Icons 1.3 – Community" e colocados
 * em `static/img/mono-icons/<name>.svg`.
 */
import type { JSX } from 'react';

export type MonoIconName =
  | 'message'
  | 'cloud'
  | 'book'
  | 'rocket'
  | 'play'
  | 'shield-check'
  | 'phone'
  | 'email'
  | 'bar-chart';

export type MonoIconProps = {
  /** Nome do ícone Mono (mapeado para o arquivo SVG correspondente). */
  name: MonoIconName;
  /** Tamanho do ícone em pixels (largura/altura). */
  size?: number;
  /** Classe CSS opcional para estilização adicional. */
  className?: string;
  /** Texto alternativo/aria-label para acessibilidade. */
  'aria-label'?: string;
};

/**
 * Mapeamento de nome lógico → caminho do arquivo SVG.
 *
 * Importante: você precisa exportar estes ícones do Figma
 * e salvar os arquivos na pasta `static/img/mono-icons/`
 * com os mesmos nomes usados aqui.
 */
const ICON_SRC: Record<MonoIconName, string> = {
  message: '/img/mono-icons/message.svg',
  cloud: '/img/mono-icons/cloud.svg',
  book: '/img/mono-icons/book.svg',
  rocket: '/img/mono-icons/rocket.svg',
  play: '/img/mono-icons/play.svg',
  'shield-check': '/img/mono-icons/shield-check.svg',
  phone: '/img/mono-icons/phone.svg',
  email: '/img/mono-icons/email.svg',
  'bar-chart': '/img/mono-icons/bar-chart.svg',
};

/**
 * Componente simples para renderizar ícones Mono exportados do Figma.
 *
 * Usa `<img>` apontando para arquivos SVG em `static/img/mono-icons`.
 * Mantém o controle de tamanho via props e respeita boas práticas de
 * acessibilidade através de `alt` / `aria-label`.
 */
export function MonoIcon({
  name,
  size = 24,
  className,
  'aria-label': ariaLabel,
}: MonoIconProps): JSX.Element {
  const src = ICON_SRC[name];

  return (
    <img
      src={src}
      width={size}
      height={size}
      className={className}
      alt={ariaLabel ?? name}
      loading="lazy"
    />
  );
}


