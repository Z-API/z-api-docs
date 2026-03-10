declare module '@docusaurus/Head' {
  const Head: import('react').ComponentType<{ children?: import('react').ReactNode }>;
  export default Head;
}

declare module '@docusaurus/Link' {
  interface LinkProps {
    to?: string;
    href?: string;
    children?: import('react').ReactNode;
    [key: string]: unknown;
  }
  const Link: import('react').ComponentType<LinkProps>;
  export default Link;
}

declare module '@docusaurus/useDocusaurusContext' {
  export default function useDocusaurusContext(): import('@docusaurus/types').DocusaurusContext;
}

declare module '@theme/*' {
  const Component: import('react').ComponentType<any>;
  export type Props = any;
  export default Component;
}

declare module '@theme-original/*' {
  const Component: import('react').ComponentType<any>;
  export type Props = any;
  export default Component;
}



