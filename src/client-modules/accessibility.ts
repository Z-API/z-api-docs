/**
 * Client module para melhorias de acessibilidade
 * 
 * Adiciona aria-labels automaticamente em elementos que precisam
 * para melhorar compatibilidade com screen readers.
 */

export default (function accessibilityModule() {
  if (typeof window === 'undefined') {
    return;
  }

  function addAriaLabels() {
    // Navbar - adicionar aria-label se não existir
    const navbar = document.querySelector('.navbar');
    if (navbar && !navbar.getAttribute('aria-label')) {
      navbar.setAttribute('aria-label', 'Navegação principal');
      navbar.setAttribute('role', 'navigation');
      navbar.setAttribute('id', 'main-navigation');
    }

    // Sidebar desktop - documentação
    const sidebarDesktop = document.querySelector('.theme-doc-sidebar-container') ?? 
                          document.querySelector('.theme-doc-sidebar-menu') ??
                          document.querySelector('[class*="theme-doc-sidebar"]');
    if (sidebarDesktop && !sidebarDesktop.getAttribute('aria-label')) {
      sidebarDesktop.setAttribute('aria-label', 'Navegação da documentação');
      sidebarDesktop.setAttribute('role', 'navigation');
      sidebarDesktop.setAttribute('id', 'sidebar-navigation');
      // Adicionar scroll-margin-top para skip links
      if (sidebarDesktop instanceof HTMLElement) {
        sidebarDesktop.style.scrollMarginTop = '2rem';
      }
    }

    // Sidebar mobile
    const sidebarMobile = document.querySelector('.navbar-sidebar');
    if (sidebarMobile && !sidebarMobile.getAttribute('aria-label')) {
      sidebarMobile.setAttribute('aria-label', 'Menu de navegação');
      sidebarMobile.setAttribute('role', 'navigation');
    }
  }

  // Executar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addAriaLabels);
  } else {
    addAriaLabels();
  }

  // Executar também após navegação (SPA do Docusaurus)
  // Docusaurus usa eventos customizados para navegação
  if (typeof window !== 'undefined') {
    window.addEventListener('docusaurus:routeUpdate', () => {
      setTimeout(addAriaLabels, 100);
    });
  }

  // Usar MutationObserver para detectar mudanças dinâmicas de forma mais eficiente
  // ao invés de intervalo fixo
  if (typeof window !== 'undefined' && 'MutationObserver' in window) {
    const observer = new MutationObserver(() => {
      addAriaLabels();
    });

    // Observar mudanças no DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-label', 'role', 'id'],
    });

    // Cleanup: desconectar observer quando necessário
    // (não é necessário em client modules, mas mantido para boas práticas)
    // O observer será mantido durante toda a vida da aplicação
  } else {
    // Fallback para navegadores antigos: usar intervalo fixo
    const intervalId = setInterval(() => {
      addAriaLabels();
    }, 1000);

    // Limpar intervalo após 10 segundos (suficiente para inicialização)
    setTimeout(() => {
      clearInterval(intervalId);
    }, 10000);
  }
})();

