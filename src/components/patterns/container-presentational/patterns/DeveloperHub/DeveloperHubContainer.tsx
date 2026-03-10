/**
 * DeveloperHubContainer - Container Component
 * 
 * Responsabilidade: O quê de dados é exibido
 * - Gerencia dados dos cards (hubCards)
 * - Pode fazer fetch de dados no futuro
 * - Passa dados para componente presentacional
 * 
 * Segue o padrão Container/Presentational conforme:
 * https://www.patterns.dev/react/presentational-container-pattern/
 */

import DeveloperHub from '@site/src/components/DeveloperHub';
import type { Theme } from '@site/src/types';
import type { ReactNode } from 'react';

/**
 * Props do componente DeveloperHubContainer
 */
type DeveloperHubContainerProps = {
  /** Tema do design system (padrão: 'classic') */
  theme?: Theme;
};

/**
 * Container Component - DeveloperHubContainer
 * 
 * Gerencia os dados dos cards e passa para o componente presentacional.
 * 
 * Em uma aplicação real, este container poderia:
 * - Fazer fetch de dados de uma API
 * - Filtrar/transformar dados
 * - Gerenciar estado relacionado aos dados
 * 
 * @param props - Props do container
 * @param props.theme - Tema do design system
 * @returns Componente React renderizado
 * 
 * @example
 * ```tsx
 * <DeveloperHubContainer />
 * <DeveloperHubContainer theme="zapi" />
 * ```
 */
export default function DeveloperHubContainer({
  theme = 'classic',
}: DeveloperHubContainerProps = {}): ReactNode {
  // Dados gerenciados pelo container
  // Em produção, isso poderia vir de uma API, contexto, etc.
  // Nota: Os dados estão hardcoded no componente DeveloperHub
  // Uma refatoração completa moveria os dados para cá
  // const hubCards: CardItem[] = [
  //   {
  //     title: 'Visão geral da Plataforma Z-API',
  //     description: 'Saiba mais sobre a Plataforma Z-API hospedada pela equipe.',
  //     link: '/docs/intro',
  //     icon: BookOpen,
  //   },
  //   {
  //     title: 'Guia de introdução',
  //     description:
  //       'Documentação para ajudar você a configurar seu ambiente, testar, desenvolver e integrar a Plataforma Z-API à sua pilha.',
  //     link: '/docs/quick-start/introducao',
  //     icon: Rocket,
  //   },
  // ];

  // Passar dados para componente presentacional
  return <DeveloperHub theme={theme} />;
}
