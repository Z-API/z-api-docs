import type { ReactNode } from "react";
import { Component as ReactComponent } from "react";

/**
 * Props do componente ErrorBoundary
 */
type ErrorBoundaryProps = {
  /** Filhos a serem renderizados */
  children: ReactNode;
  /** Fallback a ser renderizado em caso de erro */
  fallback?: ReactNode;
  /** Callback chamado quando um erro é capturado */
  onError?: (error: Error, errorInfo: { componentStack: string }) => void;
};

/**
 * Estado do componente ErrorBoundary
 */
type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

/**
 * Componente ErrorBoundary - Captura erros em componentes filhos.
 *
 * Usado para capturar erros em componentes com lazy loading e outros
 * componentes React, exibindo um fallback ao invés de quebrar toda a aplicação.
 *
 * @param props - Props do componente ErrorBoundary
 * @param props.children - Filhos a serem renderizados
 * @param props.fallback - Fallback a ser renderizado em caso de erro
 * @param props.onError - Callback chamado quando um erro é capturado
 * @returns Componente React do ErrorBoundary
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<div>Erro ao carregar componente</div>}>
 *   <Suspense fallback={<Loading />}>
 *     <LazyComponent />
 *   </Suspense>
 * </ErrorBoundary>
 * ```
 */
export default class ErrorBoundary extends ReactComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Atualiza o state para exibir o fallback na próxima renderização
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(
    error: Error,
    errorInfo: { componentStack: string }
  ): void {
    // Chama o callback onError se fornecido
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log do erro apenas em desenvolvimento
    // Em produção, considere integrar com serviço de logging (Sentry, LogRocket, etc.)
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error("ErrorBoundary capturou um erro:", error, errorInfo);
    }
    // TODO: Em produção, integrar com serviço de logging
    // logErrorToService(error, errorInfo);
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      // Renderiza fallback customizado ou fallback padrão
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Fallback padrão
      return (
        <div
          style={{
            padding: "var(--spacing-xl)",
            textAlign: "center",
            backgroundColor: "var(--ifm-color-danger-lightest, #ffeef0)",
            border: "1px solid var(--ifm-color-danger, #ff4d4f)",
            borderRadius: "var(--ifm-global-radius, 8px)",
            color: "var(--ifm-color-danger-darkest, #820014)",
          }}
          role="alert"
          aria-live="assertive"
        >
          <h3 style={{ marginTop: 0 }}>Erro ao carregar componente</h3>
          <p>
            Ocorreu um erro ao carregar este componente. Por favor, recarregue a
            página.
          </p>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details
              style={{ marginTop: "var(--spacing-md)", textAlign: "left" }}
            >
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                Detalhes do erro (desenvolvimento)
              </summary>
              <pre
                style={{
                  marginTop: "var(--spacing-sm)",
                  padding: "var(--spacing-sm)",
                  backgroundColor: "var(--ifm-color-emphasis-100, #f5f5f5)",
                  borderRadius: "var(--ifm-global-radius, 4px)",
                  overflow: "auto",
                  fontSize: "0.875rem",
                }}
              >
                {this.state.error.toString()}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
