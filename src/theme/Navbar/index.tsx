import OriginalNavbar from '@theme-original/Navbar';
import type { Props } from '@theme/Navbar';
import { useEffect } from 'react';

/**
 * Navbar swizzled para adicionar aria-label para acessibilidade
 * 
 * Adiciona aria-label="Navegação principal" na navbar para screen readers
 */
export default function Navbar(props: Props) {
  useEffect(() => {
    // Adicionar aria-label na navbar após renderização
    const navbar = document.querySelector('.navbar');
    if (navbar && !navbar.getAttribute('aria-label')) {
      navbar.setAttribute('aria-label', 'Navegação principal');
      navbar.setAttribute('role', 'navigation');
    }
  }, []);

  return <OriginalNavbar {...props} />;
}

