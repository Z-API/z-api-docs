import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {
  Home,
  Search,
  BookOpen,
  ArrowLeft,
  Rocket,
  MessageSquare,
  Webhook,
  Smartphone,
  Shield,
  Users,
  Phone,
  Briefcase,
  HelpCircle,
  FileText,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import styles from './404.module.css';

/**
 * Página 404 Customizada - Página não encontrada
 * 
 * Página de erro 404 personalizada para o Z-API Central.
 * Fornece links úteis e ajuda o usuário a encontrar o que procura.
 * Inclui animações suaves e design moderno.
 */
export default function NotFound(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animação de entrada após renderização
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const mainActions = [
    {
      icon: Home,
      title: 'Ir para Homepage',
      description: 'Voltar para a página inicial e explorar o Z-API Central',
      to: '/',
      type: 'link' as const,
    },
    {
      icon: BookOpen,
      title: 'Ver Documentação',
      description: 'Explore nossa documentação completa da API Z-API',
      to: '/docs/intro',
      type: 'link' as const,
    },
    {
      icon: Search,
      title: 'Buscar',
      description: 'Pesquisar na documentação usando nossa busca',
      type: 'button' as const,
      onClick: () => {
        const searchButton = document.querySelector(
          '[class*="searchButton"]'
        ) as HTMLElement;
        if (searchButton) {
          searchButton.click();
        }
      },
    },
    {
      icon: ArrowLeft,
      title: 'Voltar',
      description: 'Retornar à página anterior',
      type: 'button' as const,
      onClick: () => window.history.back(),
    },
  ];

  const quickLinks = [
    { icon: Rocket, label: 'Começando', to: '/docs/quick-start/introducao' },
    { icon: MessageSquare, label: 'Mensagens', to: '/docs/messages/introducao' },
    { icon: Webhook, label: 'Webhooks', to: '/docs/webhooks/introducao' },
    { icon: Smartphone, label: 'Instâncias', to: '/docs/instance/introducao' },
    { icon: Shield, label: 'Segurança', to: '/docs/security/introducao' },
    { icon: Users, label: 'Grupos', to: '/docs/groups/introducao' },
    { icon: Briefcase, label: 'WhatsApp Business', to: '/docs/whatsapp-business/introducao' },
    { icon: Phone, label: 'Chamadas', to: '/docs/calls/introducao' },
  ];

  const helpfulResources = [
    { icon: FileText, label: 'Blog', to: '/blog', description: 'Tutoriais e novidades' },
    { icon: HelpCircle, label: 'Central de Ajuda', to: '/docs/intro', description: 'Documentação completa' },
  ];

  return (
    <Layout>
      <Head>
        <title>404 - Página não encontrada | {siteConfig.title}</title>
        <meta
          name="description"
          content="A página que você está procurando não foi encontrada. Explore nossa documentação completa da API Z-API."
        />
      </Head>
      <div className={styles.notFoundContainer}>
        <div
          className={`${styles.notFoundContent} ${isVisible ? styles.visible : ''}`}
        >
          {/* Ícone/Ilustração */}
          <div className={styles.notFoundIcon}>
            <div className={styles.errorCode}>404</div>
            <div className={styles.errorMessage}>
              <h1 className={styles.title}>Ops! Página não encontrada</h1>
              <p className={styles.description}>
                Parece que a página que você está procurando não existe ou foi
                movida. Mas não se preocupe, estamos aqui para ajudar você a
                encontrar o que precisa!
              </p>
            </div>
          </div>

          {/* Ações Principais */}
          <div className={styles.helpfulLinks}>
            <h2 className={styles.sectionTitle}>O que você pode fazer:</h2>
            
            <div className={styles.linksGrid}>
              {mainActions.map((action, index) => {
                const IconComponent = action.icon;
                const content = (
                  <>
                    <IconComponent className={styles.linkIcon} aria-hidden="true" />
                    <div className={styles.linkContent}>
                      <h3 className={styles.linkTitle}>{action.title}</h3>
                      <p className={styles.linkDescription}>
                        {action.description}
                      </p>
                    </div>
                  </>
                );

                if (action.type === 'link') {
                  return (
                    <Link
                      key={index}
                      to={action.to}
                      className={`${styles.linkCard} ${styles.animateIn}`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`${styles.linkCard} ${styles.animateIn}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    type="button"
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Links Rápidos - Seções Populares */}
          <div className={styles.quickLinks}>
            <h2 className={styles.sectionTitle}>Seções Populares</h2>
            <div className={styles.quickLinksGrid}>
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={index}
                    to={link.to}
                    className={`${styles.quickLinkCard} ${styles.animateIn}`}
                    style={{ animationDelay: `${(index + 4) * 50}ms` }}
                  >
                    <IconComponent className={styles.quickLinkIcon} aria-hidden="true" />
                    <span className={styles.quickLinkLabel}>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recursos Adicionais */}
          <div className={styles.helpfulResources}>
            <h2 className={styles.sectionTitle}>Recursos Úteis</h2>
            <div className={styles.resourcesGrid}>
              {helpfulResources.map((resource, index) => {
                const IconComponent = resource.icon;
                return (
                  <Link
                    key={index}
                    to={resource.to}
                    className={`${styles.resourceCard} ${styles.animateIn}`}
                    style={{ animationDelay: `${(index + 12) * 50}ms` }}
                  >
                    <IconComponent className={styles.resourceIcon} aria-hidden="true" />
                    <div className={styles.resourceContent}>
                      <h3 className={styles.resourceTitle}>{resource.label}</h3>
                      <p className={styles.resourceDescription}>
                        {resource.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
