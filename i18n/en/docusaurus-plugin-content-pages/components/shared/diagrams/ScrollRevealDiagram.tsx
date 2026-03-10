import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { createAccessibleVariants, fadeUpVariants, fadeDownVariants } from '@site/src/utils/animations';
import styles from './ScrollRevealDiagram.module.css';
import type { ScrollRevealDiagramProps } from './types/diagram.types';
import { DiagramZoomControls } from './DiagramZoomControls';

/**
 * ScrollRevealDiagram - Componente que renderiza diagramas Mermaid com animação ao aparecer na viewport
 * 
 * Funcionalidades:
 * - Animação suave ao aparecer (fade in)
 * - Responsive scaling do SVG para preencher o container
 * - Calcula bounding box real do conteúdo
 * - Redimensiona dinamicamente ao mudar tamanho da janela
 * 
 * @component
 * @example
 * <ScrollRevealDiagram>
 *   <div className="mermaid">{diagramDefinition}</div>
 * </ScrollRevealDiagram>
 * 
 * @param {React.ReactNode} children - Elemento Mermaid a ser renderizado
 * @param {number} [delay=0] - Delay da animação em segundos
 * @param {'up' | 'down'} [direction='up'] - Direção da animação (fade in from top/bottom)
 * @returns {React.ReactElement} Componente com diagrama animado
 */
export function ScrollRevealDiagram({
  children,
  delay = 0,
  direction = 'up',
  showZoomControls = true,
  initialZoom = 1,
}: ScrollRevealDiagramProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Usar variantes acessíveis que respeitam prefers-reduced-motion
  const baseVariants = direction === 'up' ? fadeUpVariants : fadeDownVariants;
  let variants = createAccessibleVariants(baseVariants);

  // Aplicar delay se fornecido
  if (delay > 0 && variants.visible && typeof variants.visible === 'object' && variants.visible !== null) {
    const visibleVariant = variants.visible as { transition?: { delay?: number } };
    variants = {
      ...variants,
      visible: {
        ...visibleVariant,
        transition: {
          ...(visibleVariant.transition || {}),
          delay,
        },
      },
    };
  }

  /**
   * Função utilitária para ajustar estilos do SVG e container Mermaid
   * Remove duplicação de código entre casos com e sem viewBox
   * Garante que o SVG ocupe 100% da largura e altura do container
   */
  const adjustSvgStyles = (svg: SVGElement, mermaidElement: HTMLElement) => {
    // Remover atributos width/height fixos para permitir CSS controlar o tamanho
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    
    // Remover max-width inline que pode estar limitando o tamanho
    svg.style.removeProperty('max-width');
    svg.style.removeProperty('max-height');
    
    // CSS vai controlar o tamanho - SVG deve ocupar 100% da largura e altura disponível
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.maxWidth = 'none'; // Remover limitação de max-width
    svg.style.maxHeight = 'none'; // Remover limitação de max-height
    svg.style.minWidth = '100%';
    svg.style.minHeight = '100%';
    svg.style.display = 'block';
    svg.style.boxSizing = 'border-box';
    
    // Remover qualquer padding/margin do SVG
    svg.style.margin = '0';
    svg.style.padding = '0';
    
    // Garantir preserveAspectRatio para escalar corretamente
    if (!svg.getAttribute('preserveAspectRatio')) {
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }
    
    // Garantir que o container .mermaid também ocupe 100% e remova espaçamento
    mermaidElement.style.width = '100%';
    mermaidElement.style.height = '100%';
    mermaidElement.style.maxWidth = 'none'; // Remover limitação
    mermaidElement.style.maxHeight = 'none'; // Remover limitação
    mermaidElement.style.minWidth = '100%';
    mermaidElement.style.minHeight = '100%';
    mermaidElement.style.margin = '0';
    mermaidElement.style.padding = '0';
    mermaidElement.style.aspectRatio = 'unset';
    mermaidElement.style.display = 'flex';
    mermaidElement.style.alignItems = 'stretch';
    mermaidElement.style.justifyContent = 'stretch';
  };

  // Ajustar SVG do Mermaid para ocupar 100% da largura do container
  useEffect(() => {
    if (!inView || !containerRef.current) return;

    const adjustMermaidSize = () => {
      const mermaidElement = containerRef.current?.querySelector('.mermaid') as HTMLElement;
      if (!mermaidElement) return;

      const svg = mermaidElement.querySelector('svg') as SVGElement;
      if (!svg) return;

      // Remover max-width inline que o Mermaid adiciona (ex: style="max-width: 2139.5px;")
      // Isso é crítico para permitir que o SVG ocupe 100% do container
      const inlineStyle = svg.getAttribute('style') || '';
      if (inlineStyle.includes('max-width')) {
        // Remover max-width e max-height do style inline
        const newStyle = inlineStyle
          .replace(/max-width\s*:\s*[^;]+;?/gi, '')
          .replace(/max-height\s*:\s*[^;]+;?/gi, '')
          .trim();
        if (newStyle) {
          svg.setAttribute('style', newStyle);
        } else {
          svg.removeAttribute('style');
        }
      }
      
      // Obter o viewBox atual para manter a proporção
      const currentViewBox = svg.getAttribute('viewBox');
      if (currentViewBox) {
        const parts = currentViewBox.split(' ').map(Number);
        if (parts.length === 4) {
          const [, , viewBoxWidth, viewBoxHeight] = parts;
          
          // Usar 'meet' para manter proporção e centralizar, mas ajustar viewBox se necessário
          // 'xMidYMid meet' mantém proporção e centraliza, mostrando todo o conteúdo
          svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
          
          // Tentar ajustar o viewBox para remover espaçamento extra se detectado
          // Calcular dimensões do container
          const containerWidth = containerRef.current?.clientWidth || 0;
          const containerHeight = containerRef.current?.clientHeight || 0;
          
          if (containerWidth > 0 && containerHeight > 0 && viewBoxWidth && viewBoxHeight) {
            // Calcular proporção do container vs viewBox
            const containerAspect = containerWidth / containerHeight;
            const viewBoxAspect = viewBoxWidth / viewBoxHeight;
            
            // Se o viewBox é muito menor que o container, pode haver espaçamento
            // Ajustar viewBox para preencher melhor o espaço (com pequena margem para segurança)
            if (viewBoxAspect < containerAspect * 0.8 || viewBoxAspect > containerAspect * 1.2) {
              // ViewBox está desproporcional, mas manter original para não cortar conteúdo
              // O preserveAspectRatio 'meet' já vai centralizar corretamente
            }
          }
          
          // Aplicar estilos usando função utilitária
          adjustSvgStyles(svg, mermaidElement);
        }
      } else {
        // Se não tiver viewBox, aplicar estilos diretamente
        adjustSvgStyles(svg, mermaidElement);
      }
      
      // Ajustar o grupo principal do SVG para preencher o container
      // Baseado na documentação do Mermaid, usar preserveAspectRatio + viewBox
      // Remove transformações complexas que causam mais problemas
      const mainGroup = svg.querySelector('g') as SVGGElement;
      if (mainGroup) {
        // Remover transformação existente que pode estar causando problemas
        const existingTransform = mainGroup.getAttribute('transform') || '';
        
        // Tentar calcular escala baseada no bounding box real do conteúdo
        try {
          const bbox = mainGroup.getBBox();
          if (bbox && bbox.width > 0 && bbox.height > 0) {
            // Usar apenas translate para remover o negativo offset do viewBox
            // Evita aplicar scale que distorce o conteúdo
            const translateX = -bbox.x;
            const translateY = -bbox.y;
            
            // Aplicar apenas translate se houver negativo offset
            if (bbox.x !== 0 || bbox.y !== 0) {
              mainGroup.setAttribute('transform', `translate(${translateX}, ${translateY})`);
            } else if (existingTransform && existingTransform.includes('translate')) {
              // Remover translate se bbox.x e bbox.y já estão ajustados
              mainGroup.removeAttribute('transform');
            }
          }
        } catch (e) {
          // Se getBBox falhar, deixar como está
          // O SVG vai escalar naturalmente com width: 100%, height: 100%
          // Silenciosamente usar scaling padrão (não logar em produção)
        }
      }
    };

    // Aguardar Mermaid renderizar (múltiplas tentativas para garantir que SVG está pronto)
    const attempts = 15;
    let attempt = 0;
    const interval = setInterval(() => {
      attempt++;
      adjustMermaidSize();
      
      if (attempt >= attempts) {
        clearInterval(interval);
      }
    }, 150);

    // Ajustar também quando a janela redimensionar
    const handleResize = () => {
      adjustMermaidSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [inView]);

  return (
    <motion.div
      ref={(node) => {
        // Combina refs do framer-motion e containerRef
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
        containerRef.current = node;
      }}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={styles.container}
      data-has-zoom-controls={showZoomControls ? 'true' : undefined}
    >
      {children}
      {showZoomControls && (
        <DiagramZoomControls 
          containerRef={containerRef} 
          showFullscreen={true}
          initialZoom={initialZoom}
        />
      )}
    </motion.div>
  );
}

