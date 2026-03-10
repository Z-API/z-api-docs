import React, { useEffect } from 'react';
import { useMermaidZoom } from '@site/src/hooks/useMermaidZoom';

/**
 * Root component do Docusaurus
 * Aplica funcionalidades globais a todas as páginas
 */
export default function Root({ children }: { children: React.ReactNode }) {
  // Adicionar zoom automático a todos os diagramas Mermaid
  useMermaidZoom();

  // Handler global para erros de JSON parsing
  useEffect(() => {
    // Interceptar erros de JSON parsing não tratados
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason;
      
      // Verificar se é erro de JSON parsing (recebeu HTML em vez de JSON)
      if (
        error instanceof SyntaxError &&
        error.message.includes('JSON') &&
        (error.message.includes("<!doctype") || error.message.includes("Unexpected token '<'"))
      ) {
        // Suprimir o erro no console para não poluir
        event.preventDefault();
        
        // Log apenas em desenvolvimento para debug
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            '[Root] Erro de JSON parsing interceptado (provavelmente 404 HTML):',
            error.message.substring(0, 100)
          );
        }
        
        return;
      }
      
      // Para outros erros, verificar se são relacionados a fetch/JSON
      if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = String(error.message);
        if (
          errorMessage.includes('JSON') &&
          (errorMessage.includes("<!doctype") || errorMessage.includes("Unexpected token '<'"))
        ) {
          event.preventDefault();
          
          if (process.env.NODE_ENV === 'development') {
            console.warn(
              '[Root] Erro de JSON parsing interceptado:',
              errorMessage.substring(0, 100)
            );
          }
          
          return;
        }
      }
    };

    // Adicionar listener para unhandled promise rejections
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return <>{children}</>;
}
