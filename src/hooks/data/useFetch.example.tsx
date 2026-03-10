/**
 * Exemplos de uso do hook useFetch
 * 
 * Demonstra diferentes formas de usar o hook useFetch para fetch de dados
 */

import { useFetch } from './useFetch';

/**
 * Exemplo 1: Uso básico com URL
 */
export function BasicFetchExample() {
  const { data, isLoading, error, refetch } = useFetch<User[]>('/api/users');

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      {data.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={refetch}>Recarregar</button>
    </div>
  );
}

/**
 * Exemplo 2: Com função customizada de fetch
 */
export function CustomFetchExample() {
  const { data, isLoading } = useFetch({
    fetchFn: async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/protected', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Unauthorized');
      return res.json();
    }
  });

  if (isLoading) return <div>Carregando...</div>;
  if (!data) return null;
  
  return <div>Dados carregados</div>;
}

/**
 * Exemplo 3: Com transformação de dados
 */
export function TransformFetchExample() {
  const { data } = useFetch<User[]>({
    url: '/api/users',
    transform: (data: unknown) => {
      const users = data as { users: Array<{ firstName: string; lastName: string }> };
      return users.users.map((u) => ({
        id: '',
        name: `${u.firstName} ${u.lastName}`,
        email: '',
        fullName: `${u.firstName} ${u.lastName}`,
        active: true
      })) as User[];
    }
  });

  if (!data) return null;
  return <div>{data.length} usuários transformados</div>;
}

/**
 * Exemplo 4: Com validação
 */
export function ValidatedFetchExample() {
  const { data, error } = useFetch<User[]>({
    url: '/api/users',
    validate: (data): data is User[] => {
      return Array.isArray(data) && data.every(u => u.id && u.name);
    }
  });

  if (error) return <div>Erro: {error.message}</div>;
  if (!data) return null;
  return <div>{data.length} usuários validados</div>;
}

/**
 * Exemplo 5: Com callbacks
 */
export function CallbacksFetchExample() {
  const { data } = useFetch<User[]>({
    url: '/api/users',
    onSuccess: (_successData) => {
      // Exemplo: processar dados após carregamento
      // Em produção, processar dados sem logging
      // const userCount = Array.isArray(_successData) ? _successData.length : 0;
    },
    onError: (error) => {
      console.error('Erro ao carregar usuários:', error);
    }
  });

  if (!data || !Array.isArray(data)) return null;
  return <div>Dados carregados via callbacks: {data.length} usuários</div>;
}

import { useState } from 'react';

/**
 * Exemplo 6: Fetch condicional
 */
export function ConditionalFetchExample() {
  const [shouldFetch, setShouldFetch] = useState(false);
  
  const { data } = useFetch<User[]>({
    url: '/api/users',
    enabled: shouldFetch // Só faz fetch se shouldFetch for true
  });

  return (
    <div>
      <button onClick={() => setShouldFetch(true)}>
        Carregar Usuários
      </button>
      {data && (
        <div>
          {data.map(user => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// Types
type User = {
  id: string;
  name: string;
  email: string;
};
