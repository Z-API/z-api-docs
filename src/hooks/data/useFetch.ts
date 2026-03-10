/**
 * useFetch - Hook genérico para fetch de dados
 * 
 * Hook reutilizável para fazer requisições HTTP e gerenciar estados
 * de loading, error e data. Segue o padrão Hooks Pattern do React.
 * 
 * @template T - Tipo dos dados retornados
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error, refetch } = useFetch<User[]>('/api/users');
 * 
 * if (isLoading) return <Loading />;
 * if (error) return <Error message={error.message} />;
 * return <UserList users={data} />;
 * ```
 */

import { useCallback, useEffect, useState } from 'react';

export type UseFetchOptions<T> = {
  /** URL para fetch */
  url?: string;
  /** Função customizada para fetch */
  fetchFn?: () => Promise<T>;
  /** Opções do fetch (headers, method, body, etc.) */
  fetchOptions?: RequestInit;
  /** Se deve fazer fetch automaticamente ao montar (padrão: true) */
  enabled?: boolean;
  /** Transformador de dados */
  transform?: (data: unknown) => T;
  /** Validador de dados */
  validate?: (data: unknown) => data is T;
  /** Callback quando fetch é bem-sucedido */
  onSuccess?: (data: T) => void;
  /** Callback quando fetch falha */
  onError?: (error: Error) => void;
};

export type UseFetchReturn<T> = {
  /** Dados retornados do fetch */
  data: T | null;
  /** Se está carregando */
  isLoading: boolean;
  /** Erro ocorrido (se houver) */
  error: Error | null;
  /** Função para refazer o fetch */
  refetch: () => Promise<void>;
  /** Função para resetar estado */
  reset: () => void;
};

/**
 * Hook genérico para fetch de dados
 * 
 * @param options - Opções do hook
 * @returns Estado e funções do fetch
 * 
 * @example
 * ```tsx
 * // Uso básico
 * const { data, isLoading, error } = useFetch<User[]>('/api/users');
 * 
 * // Com função customizada
 * const { data } = useFetch({
 *   fetchFn: async () => {
 *     const res = await fetch('/api/users');
 *     return res.json();
 *   }
 * });
 * 
 * // Com transformação
 * const { data } = useFetch({
 *   url: '/api/users',
 *   transform: (data) => data.users.map(u => ({ ...u, active: true }))
 * });
 * ```
 */
export function useFetch<T = unknown>(
  options: UseFetchOptions<T> | string = {}
): UseFetchReturn<T> {
  // Normalizar options
  const opts: UseFetchOptions<T> =
    typeof options === 'string'
      ? { url: options }
      : options;

  const {
    url,
    fetchFn,
    fetchOptions = {},
    enabled = true,
    transform,
    validate,
    onSuccess,
    onError,
  } = opts;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    // Validar que url ou fetchFn foi fornecido
    if (!url && !fetchFn) {
      const err = new Error('useFetch: url ou fetchFn deve ser fornecido');
      setError(err);
      onError?.(err);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      let result: unknown;

      if (fetchFn) {
        result = await fetchFn();
      } else if (url) {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Verificar Content-Type antes de fazer parse JSON
        const contentType = response.headers.get('content-type');
        
        // Verificar se a resposta é HTML (geralmente indica 404 ou erro)
        if (contentType && contentType.includes('text/html')) {
          const text = await response.text();
          throw new Error(
            `useFetch: Recebeu HTML em vez de JSON. Status: ${response.status}. ` +
            `Isso geralmente indica que o endpoint não existe (404). ` +
            `Primeiros caracteres: ${text.substring(0, 100)}`
          );
        }
        
        if (contentType && contentType.includes('application/json')) {
          result = await response.json();
        } else {
          // Se não for JSON, tentar fazer parse mesmo assim (pode ser texto JSON sem header)
          const text = await response.text();
          
          // Verificar se começa com HTML (indicador de erro 404)
          if (text.trim().toLowerCase().startsWith('<!doctype') || text.trim().toLowerCase().startsWith('<html')) {
            throw new Error(
              `useFetch: Recebeu HTML em vez de JSON. Status: ${response.status}. ` +
              `Isso geralmente indica que o endpoint não existe (404). ` +
              `Primeiros caracteres: ${text.substring(0, 100)}`
            );
          }
          
          try {
            result = JSON.parse(text);
          } catch (parseError) {
            throw new Error(
              `useFetch: Resposta não é JSON válido. Content-Type: ${contentType || 'não especificado'}. ` +
              `Primeiros caracteres: ${text.substring(0, 50)}`
            );
          }
        }
      } else {
        throw new Error('useFetch: url ou fetchFn deve ser fornecido');
      }

      // Transformar dados se fornecido
      let transformedData = transform ? transform(result) : (result as T);

      // Validar dados se fornecido
      if (validate && !validate(transformedData)) {
        throw new Error('useFetch: dados não passaram na validação');
      }

      setData(transformedData);
      onSuccess?.(transformedData);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido');
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [url, fetchFn, fetchOptions, transform, validate, onSuccess, onError]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, url, fetchFn]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    reset,
  };
}
