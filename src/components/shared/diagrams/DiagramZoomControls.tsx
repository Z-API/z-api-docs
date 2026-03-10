import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';
import styles from './DiagramZoomControls.module.css';

interface DiagramZoomControlsProps {
  /** Container do diagrama que será controlado */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Se deve mostrar o botão de tela cheia */
  showFullscreen?: boolean;
  /** Classe CSS adicional para o container */
  className?: string;
  /** Zoom inicial do diagrama (padrão: 1.0 = 100%) */
  initialZoom?: number;
}

/**
 * Componente de controles de zoom para diagramas Mermaid
 * 
 * Funcionalidades:
 * - Zoom in/out com botões
 * - Zoom com scroll do mouse (Ctrl/Cmd + Scroll)
 * - Pan/drag para mover o diagrama quando zoom > 1 (clique e arraste)
 * - Reset de zoom e posição
 * - Tela cheia (opcional)
 * 
 * @component
 */
export function DiagramZoomControls({
  containerRef,
  showFullscreen = true,
  className = '',
  initialZoom = 1,
}: DiagramZoomControlsProps) {
  const [zoomLevel, setZoomLevel] = useState(initialZoom);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const svgRef = useRef<SVGElement | null>(null);
  const zoomLevelRef = useRef(initialZoom); // Ref para acessar zoomLevel atual nos event handlers
  const translateXRef = useRef(0); // Ref para posição X do translate (pan)
  const translateYRef = useRef(0); // Ref para posição Y do translate (pan)
  const isDraggingRef = useRef(false); // Ref para rastrear se está arrastando
  const startXRef = useRef(0); // Posição X inicial do mouse ao começar arrasto
  const startYRef = useRef(0); // Posição Y inicial do mouse ao começar arrasto

  // Atualizar ref quando zoomLevel mudar e aplicar cursor
  useEffect(() => {
    zoomLevelRef.current = zoomLevel;
    if (svgRef.current) {
      svgRef.current.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
    }
  }, [zoomLevel]);

  // Função para aplicar transform (zoom + pan) ao SVG
  const applyTransform = useCallback((zoom: number, translateX: number, translateY: number) => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const clampedZoom = Math.max(0.5, Math.min(3, zoom));
    
    // Aplicar transform com scale e translate
    svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${clampedZoom})`;
    svg.style.transformOrigin = 'center center';
    svg.style.cursor = clampedZoom > 1 ? 'grab' : 'default';
    
    setZoomLevel(clampedZoom);
    zoomLevelRef.current = clampedZoom;
    translateXRef.current = translateX;
    translateYRef.current = translateY;
  }, []);

  // Função para aplicar apenas zoom (reseta pan)
  const applyZoom = useCallback((newZoom: number, resetPan = false) => {
    const translateX = resetPan ? 0 : translateXRef.current;
    const translateY = resetPan ? 0 : translateYRef.current;
    applyTransform(newZoom, translateX, translateY);
  }, [applyTransform]);

  // Handler para scroll do mouse (Ctrl/Cmd + Scroll)
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return; // Apenas com Ctrl/Cmd pressionado
    
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const currentZoom = zoomLevelRef.current;
    const newZoom = currentZoom + delta;
    applyZoom(newZoom);
  }, [applyZoom]);

  // Handler para iniciar drag (pan)
  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!svgRef.current || zoomLevelRef.current <= 1) return;
    if ((e.target as HTMLElement).closest('button, [role="button"]')) return; // Não arrastar se clicou em botão
    
    e.preventDefault();
    isDraggingRef.current = true;
    startXRef.current = e.clientX - translateXRef.current;
    startYRef.current = e.clientY - translateYRef.current;
    if (svgRef.current) {
      svgRef.current.style.cursor = 'grabbing';
    }
  }, []);

  // Handler para mover durante drag (pan)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current || !svgRef.current) return;
    
    e.preventDefault();
    const translateX = e.clientX - startXRef.current;
    const translateY = e.clientY - startYRef.current;
    applyTransform(zoomLevelRef.current, translateX, translateY);
  }, [applyTransform]);

  // Handler para terminar drag (pan)
  const handleMouseUp = useCallback(() => {
    if (!svgRef.current) return;
    isDraggingRef.current = false;
    if (svgRef.current && zoomLevelRef.current > 1) {
      svgRef.current.style.cursor = 'grab';
    } else if (svgRef.current) {
      svgRef.current.style.cursor = 'default';
    }
  }, []);

  // Encontrar o SVG dentro do container e adicionar event listeners
  useEffect(() => {
    if (!containerRef.current) return;

    const findSvg = () => {
      const svg = containerRef.current?.querySelector('svg') as SVGElement;
      if (svg) {
        // Se é um SVG diferente, remover listeners do anterior
        if (svgRef.current && svg !== svgRef.current) {
          svgRef.current.removeEventListener('wheel', handleWheel);
          svgRef.current.removeEventListener('mousedown', handleMouseDown);
        }
        
        // Se ainda não tem referência ou é diferente, configurar novo SVG
        if (!svgRef.current || svg !== svgRef.current) {
          const isNewSvg = !svgRef.current;
          svgRef.current = svg;
          
          // Adicionar listeners apenas se ainda não foram adicionados
          // Verificar se já tem listener verificando uma propriedade custom
          if (!(svg as any).__zoomControlsAttached) {
            svg.addEventListener('wheel', handleWheel, { passive: false });
            svg.addEventListener('mousedown', handleMouseDown);
            (svg as any).__zoomControlsAttached = true;
          }
          
          // Se é um novo SVG, aplicar zoom inicial
          if (isNewSvg) {
            applyTransform(initialZoom, 0, 0);
          } else {
            // Se é o mesmo SVG mas foi recriado, restaurar estado atual
            applyTransform(zoomLevelRef.current, translateXRef.current, translateYRef.current);
          }
          
          // Aplicar cursor baseado no zoom atual
          svg.style.cursor = zoomLevelRef.current > 1 ? 'grab' : 'default';
        }
      }
    };

    // Tentar encontrar SVG imediatamente
    findSvg();

    // Se não encontrar, tentar após um delay (Mermaid pode renderizar assincronamente)
    const timeout = setTimeout(findSvg, 500);
    const observer = new MutationObserver(findSvg);
    
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    // Adicionar listeners globais para mousemove e mouseup (para funcionar mesmo fora do SVG)
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (svgRef.current) {
        svgRef.current.removeEventListener('wheel', handleWheel);
        svgRef.current.removeEventListener('mousedown', handleMouseDown);
        (svgRef.current as any).__zoomControlsAttached = false;
        svgRef.current = null;
      }
    };
  }, [containerRef, handleWheel, handleMouseDown, handleMouseMove, handleMouseUp, applyTransform, initialZoom]);

  const handleZoomIn = useCallback(() => {
    const newZoom = zoomLevelRef.current + 0.2;
    applyZoom(newZoom);
  }, [applyZoom]);

  const handleZoomOut = useCallback(() => {
    const newZoom = zoomLevelRef.current - 0.2;
    applyZoom(newZoom);
  }, [applyZoom]);

  const handleReset = useCallback(() => {
    applyZoom(1, true); // Reset zoom e pan
  }, [applyZoom]);

  const handleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.warn('Fullscreen não suportado:', error);
    }
  }, [containerRef, isFullscreen]);

  // Listener para mudanças de fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className={`${styles.controls} ${className}`}>
      <button
        type="button"
        onClick={handleZoomOut}
        className={styles.button}
        aria-label="Diminuir zoom"
        title="Diminuir zoom (Ctrl + Scroll)"
      >
        <ZoomOut size={18} />
      </button>
      
      <span className={styles.zoomLevel} aria-live="polite">
        {Math.round(zoomLevel * 100)}%
      </span>
      
      <button
        type="button"
        onClick={handleZoomIn}
        className={styles.button}
        aria-label="Aumentar zoom"
        title="Aumentar zoom (Ctrl + Scroll)"
      >
        <ZoomIn size={18} />
      </button>
      
      <button
        type="button"
        onClick={handleReset}
        className={styles.button}
        aria-label="Resetar zoom"
        title="Resetar zoom para 100%"
      >
        <RotateCcw size={18} />
      </button>
      
      {showFullscreen && (
        <button
          type="button"
          onClick={handleFullscreen}
          className={styles.button}
          aria-label={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
          title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
        >
          <Maximize2 size={18} />
        </button>
      )}
    </div>
  );
}
