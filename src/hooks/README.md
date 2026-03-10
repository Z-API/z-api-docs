# Hooks Customizados

Este diretório contém hooks customizados reutilizáveis organizados por categoria.

## Estrutura

```
hooks/
├── data/           # Hooks de dados (useFetch, useLocalStorage)
├── forms/          # Hooks de formulários (useForm)
├── ui/             # Hooks de UI (useToggle, useDebounce)
└── ...             # Outros hooks (useRippleEffect, etc.)
```

## Hooks de Dados

### `useFetch<T>`

Hook genérico para fetch de dados HTTP.

**Localização**: `src/hooks/data/useFetch.ts`

**Características**:
- Gerenciamento de loading, error e data
- Função refetch para recarregar dados
- Suporte a URL ou função customizada
- Transformação e validação de dados
- Callbacks onSuccess e onError

**Exemplo de Uso**:

```tsx
import { useFetch } from '@site/src/hooks/data';

// Uso básico
function UserList() {
  const { data, isLoading, error, refetch } = useFetch<User[]>('/api/users');

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      {data?.map(user => <UserCard key={user.id} user={user} />)}
      <button onClick={refetch}>Recarregar</button>
    </div>
  );
}

// Com função customizada
const { data } = useFetch({
  fetchFn: async () => {
    const res = await fetch('/api/data', { headers: { 'Authorization': 'Bearer token' } });
    return res.json();
  }
});

// Com transformação
const { data } = useFetch({
  url: '/api/users',
  transform: (data) => data.users.map(u => ({ ...u, active: true }))
});
```

**API**:
```tsx
useFetch<T>(options: UseFetchOptions<T> | string): UseFetchReturn<T>

type UseFetchReturn<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  reset: () => void;
}
```

---

### `useLocalStorage<T>`

Hook para sincronizar estado com localStorage.

**Localização**: `src/hooks/data/useLocalStorage.ts`

**Características**:
- Sincronização automática com localStorage
- Suporte a parser/stringifier customizados
- Sincronização entre abas (storage event)
- Type-safe com TypeScript

**Exemplo de Uso**:

```tsx
import { useLocalStorage } from '@site/src/hooks/data';

// Uso básico
function ThemeSelector() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Tema: {theme}
    </button>
  );
}

// Com parser customizado
const [user, setUser, removeUser] = useLocalStorage<User>(
  'user',
  null,
  {
    parser: JSON.parse,
    stringifier: JSON.stringify
  }
);
```

**API**:
```tsx
useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: { parser?, stringifier? }
): [T, (value: T | ((prev: T) => T)) => void, () => void]
```

---

## Hooks de Formulários

### `useForm<T>`

Hook genérico para gerenciamento de formulários.

**Localização**: `src/hooks/forms/useForm.ts`

**Características**:
- Gerenciamento de valores e erros
- Validação customizada
- Validação onChange e onBlur
- Submit handler
- Estado de submissão

**Exemplo de Uso**:

```tsx
import { useForm } from '@site/src/hooks/forms';

type LoginForm = {
  email: string;
  password: string;
};

function LoginForm() {
  const form = useForm<LoginForm>({
    initialValues: { email: '', password: '' },
    validate: (values) => {
      const errors: Partial<Record<keyof LoginForm, string>> = {};
      if (!values.email) errors.email = 'Email obrigatório';
      if (!values.password) errors.password = 'Senha obrigatória';
      return errors;
    },
    validateOnChange: true,
    onSubmit: async (values) => {
      await login(values);
    }
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        value={form.values.email}
        onChange={(e) => form.handleChange('email')(e.target.value)}
        onBlur={form.handleBlur('email')}
      />
      {form.errors.email && <span>{form.errors.email}</span>}

      <input
        type="password"
        value={form.values.password}
        onChange={(e) => form.handleChange('password')(e.target.value)}
        onBlur={form.handleBlur('password')}
      />
      {form.errors.password && <span>{form.errors.password}</span>}

      <button type="submit" disabled={!form.isValid || form.isSubmitting}>
        {form.isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
```

**API**:
```tsx
useForm<T>(options: UseFormOptions<T>): UseFormReturn<T>

type UseFormReturn<T> = {
  values: T;
  errors: FormErrors<T>;
  isValid: boolean;
  isSubmitting: boolean;
  handleChange: (name: keyof T) => (value: unknown) => void;
  handleBlur: (name: keyof T) => () => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
  // ... mais funções
}
```

---

## Hooks de UI

### `useToggle`

Hook para estado boolean com toggle.

**Localização**: `src/hooks/ui/useToggle.ts`

**Exemplo de Uso**:

```tsx
import { useToggle } from '@site/src/hooks/ui';

function Modal() {
  const [isOpen, toggle, open, close] = useToggle(false);

  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <button onClick={open}>Abrir</button>
      <button onClick={close}>Fechar</button>
      {isOpen && <div>Modal Aberto</div>}
    </>
  );
}
```

**API**:
```tsx
useToggle(initialValue?: boolean): [boolean, () => void, () => void, () => void]
// Retorna: [valor, toggle, setTrue, setFalse]
```

---

### `useDebounce<T>`

Hook para debounce de valores.

**Localização**: `src/hooks/ui/useDebounce.ts`

**Exemplo de Uso**:

```tsx
import { useDebounce } from '@site/src/hooks/ui';

function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar..."
    />
  );
}
```

**API**:
```tsx
useDebounce<T>(value: T, delay?: number): T
```

---

## Hooks Existentes

Além dos hooks genéricos acima, o projeto também possui:

- `useRippleEffect` - Efeito ripple em componentes clicáveis
- `useParallaxScroll` - Parallax scroll otimizado
- `useIntersectionObserver` - Observer de interseção
- `useActiveBreakpoint` - Breakpoint responsivo
- `useReducedMotion` - Preferência de movimento reduzido
- `usePrefersReducedMotion` - Media query para movimento reduzido

---

## Importação

Importe hooks de categorias específicas:

```tsx
// Hooks de dados
import { useFetch, useLocalStorage } from '@site/src/hooks/data';

// Hooks de formulários
import { useForm } from '@site/src/hooks/forms';

// Hooks de UI
import { useToggle, useDebounce } from '@site/src/hooks/ui';

// Ou importe todos de uma vez
import { useFetch, useForm, useToggle } from '@site/src/hooks';
```

---

## Quando Usar Cada Hook?

### `useFetch` - Quando:
- Precisa fazer fetch de dados HTTP
- Quer gerenciar loading, error e data states
- Precisa de refetch ou retry logic

### `useForm` - Quando:
- Tem formulário com múltiplos campos
- Precisa de validação
- Quer gerenciar estado de submissão

### `useToggle` - Quando:
- Precisa alternar estado boolean
- Modais, accordions, switches
- Qualquer estado on/off

### `useDebounce` - Quando:
- Busca em tempo real
- Validação de formulários
- Eventos de scroll/resize

### `useLocalStorage` - Quando:
- Precisa persistir dados no navegador
- Preferências do usuário
- Dados de sessão

---

## Referências

- [React Hooks](https://react.dev/reference/react)
- [Hooks Pattern - patterns.dev](https://www.patterns.dev/react/hooks-pattern/)
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

---

**Versão**: 1.0.0  
**Data**: 2025-01-30
