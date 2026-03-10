import { useEffect, useRef } from 'react';

/**
 * Hook para adicionar controles de zoom a diagramas Mermaid
 * Aplica zoom automático a todos os diagramas Mermaid na página
 */
export function useMermaidZoom() {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const addZoomToMermaid = () => {
      // Encontrar todos os diagramas Mermaid que ainda não têm controles
      const mermaidElements = document.querySelectorAll('.mermaid:not([data-zoom-initialized])');
      
      mermaidElements.forEach((mermaidEl) => {
        const element = mermaidEl as HTMLElement;
        element.setAttribute('data-zoom-initialized', 'true');
        
        // Verificar se já está dentro de um container com DiagramZoomControls React
        // ScrollRevealDiagram marca o container com data-has-zoom-controls
        const container = element.closest('[data-has-zoom-controls="true"]');
        if (container) {
          return; // Já tem DiagramZoomControls React, não adicionar controles via DOM
        }

        // Criar container wrapper se não existir
        let wrapper = element.parentElement;
        if (!wrapper || !wrapper.classList.contains('mermaid-zoom-wrapper')) {
          wrapper = document.createElement('div');
          wrapper.className = 'mermaid-zoom-wrapper';
          element.parentNode?.insertBefore(wrapper, element);
          wrapper.appendChild(element);
        }

        // Adicionar controles de zoom
        const svg = element.querySelector('svg');
        if (!svg) return;

        let zoomLevel = 1;
        const controls = document.createElement('div');
        controls.className = 'mermaid-zoom-controls';
        controls.innerHTML = `
          <button class="mermaid-zoom-btn" data-action="zoom-out" aria-label="Diminuir zoom" title="Diminuir zoom (Ctrl + Scroll)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
          <span class="mermaid-zoom-level" aria-live="polite">100%</span>
          <button class="mermaid-zoom-btn" data-action="zoom-in" aria-label="Aumentar zoom" title="Aumentar zoom (Ctrl + Scroll)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
          <button class="mermaid-zoom-btn" data-action="reset" aria-label="Resetar zoom" title="Resetar zoom para 100%">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </button>
        `;

        wrapper.appendChild(controls);
        wrapper.style.position = 'relative';

        const applyZoom = (newZoom: number) => {
          zoomLevel = Math.max(0.5, Math.min(3, newZoom));
          svg.style.transform = `scale(${zoomLevel})`;
          svg.style.transformOrigin = 'center center';
          const levelSpan = controls.querySelector('.mermaid-zoom-level');
          if (levelSpan) {
            levelSpan.textContent = `${Math.round(zoomLevel * 100)}%`;
          }
        };

        // Event listeners para botões
        controls.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          const button = target.closest('[data-action]') as HTMLElement;
          if (!button) return;

          const action = button.getAttribute('data-action');
          if (action === 'zoom-in') {
            applyZoom(zoomLevel + 0.2);
          } else if (action === 'zoom-out') {
            applyZoom(zoomLevel - 0.2);
          } else if (action === 'reset') {
            applyZoom(1);
          }
        });

        // Zoom com scroll (Ctrl/Cmd + Scroll)
        svg.addEventListener('wheel', (e) => {
          if (!e.ctrlKey && !e.metaKey) return;
          e.preventDefault();
          const delta = e.deltaY > 0 ? -0.1 : 0.1;
          applyZoom(zoomLevel + delta);
        }, { passive: false });
      });
    };

    // Executar imediatamente
    addZoomToMermaid();

    // Observar mudanças no DOM (para diagramas renderizados dinamicamente)
    const observer = new MutationObserver(() => {
      addZoomToMermaid();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Executar após um delay para garantir que Mermaid renderizou
    const interval = setInterval(() => {
      addZoomToMermaid();
    }, 1000);

    // Limpar após 10 segundos (tempo suficiente para Mermaid renderizar)
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);
}
