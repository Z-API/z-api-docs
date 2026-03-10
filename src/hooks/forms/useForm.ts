/**
 * useForm - Hook genérico para gerenciamento de formulários
 * 
 * Hook reutilizável para gerenciar estado de formulários, validação
 * e submissão. Segue o padrão Hooks Pattern do React.
 * 
 * @template T - Tipo dos valores do formulário
 * 
 * @example
 * ```tsx
 * type FormData = { name: string; email: string };
 * 
 * const { values, errors, handleChange, handleSubmit, isValid } = useForm<FormData>({
 *   initialValues: { name: '', email: '' },
 *   validate: (values) => {
 *     const errors: Partial<Record<keyof FormData, string>> = {};
 *     if (!values.name) errors.name = 'Nome é obrigatório';
 *     if (!values.email) errors.email = 'Email é obrigatório';
 *     return errors;
 *   },
 *   onSubmit: async (values) => {
 *     await fetch('/api/submit', { method: 'POST', body: JSON.stringify(values) });
 *   }
 * });
 * ```
 */

import { useCallback, useState } from 'react';

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export type UseFormOptions<T> = {
  /** Valores iniciais do formulário */
  initialValues: T;
  /** Função de validação (opcional) */
  validate?: (values: T) => FormErrors<T>;
  /** Função chamada ao submeter (opcional) */
  onSubmit?: (values: T) => void | Promise<void>;
  /** Se deve validar ao mudar valores (padrão: false) */
  validateOnChange?: boolean;
  /** Se deve validar ao perder foco (padrão: false) */
  validateOnBlur?: boolean;
};

export type UseFormReturn<T> = {
  /** Valores atuais do formulário */
  values: T;
  /** Erros de validação */
  errors: FormErrors<T>;
  /** Se o formulário é válido */
  isValid: boolean;
  /** Se está submetendo */
  isSubmitting: boolean;
  /** Handler para mudança de valores */
  handleChange: (name: keyof T) => (value: unknown) => void;
  /** Handler para mudança de valores (genérico) */
  setValue: (name: keyof T, value: unknown) => void;
  /** Handler para mudança de múltiplos valores */
  setValues: (values: Partial<T>) => void;
  /** Handler para blur */
  handleBlur: (name: keyof T) => () => void;
  /** Handler para submissão */
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  /** Função para resetar formulário */
  reset: () => void;
  /** Função para limpar erros */
  clearErrors: () => void;
  /** Função para setar erros manualmente */
  setErrors: (errors: FormErrors<T>) => void;
};

/**
 * Hook genérico para gerenciamento de formulários
 * 
 * @param options - Opções do hook
 * @returns Estado e funções do formulário
 * 
 * @example
 * ```tsx
 * type LoginForm = { email: string; password: string };
 * 
 * const form = useForm<LoginForm>({
 *   initialValues: { email: '', password: '' },
 *   validate: (values) => {
 *     const errors: FormErrors<LoginForm> = {};
 *     if (!values.email) errors.email = 'Email obrigatório';
 *     if (!values.password) errors.password = 'Senha obrigatória';
 *     return errors;
 *   },
 *   onSubmit: async (values) => {
 *     await login(values);
 *   }
 * });
 * 
 * return (
 *   <form onSubmit={form.handleSubmit}>
 *     <input
 *       value={form.values.email}
 *       onChange={(e) => form.handleChange('email')(e.target.value)}
 *       onBlur={form.handleBlur('email')}
 *     />
 *     {form.errors.email && <span>{form.errors.email}</span>}
 *     <button type="submit" disabled={!form.isValid || form.isSubmitting}>
 *       Enviar
 *     </button>
 *   </form>
 * );
 * ```
 */
export function useForm<T extends Record<string, unknown>>(
  options: UseFormOptions<T>
): UseFormReturn<T> {
  const {
    initialValues,
    validate,
    onSubmit,
    validateOnChange = false,
    validateOnBlur = false,
  } = options;

  const [values, setValuesState] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validar valores
  const runValidation = useCallback(
    (vals: T): FormErrors<T> => {
      if (!validate) return {};
      return validate(vals);
    },
    [validate]
  );

  // Verificar se formulário é válido
  const isValid = Object.keys(errors).length === 0 && Object.values(values).every((v) => {
    if (typeof v === 'string') return v.trim() !== '';
    return v != null;
  });

  // Handler para mudança de valor
  const handleChange = useCallback(
    (name: keyof T) => (value: unknown) => {
      setValuesState((prev) => {
        const newValues = { ...prev, [name]: value };
        
        // Validar se validateOnChange está ativo
        if (validateOnChange) {
          const newErrors = runValidation(newValues);
          setErrors(newErrors);
        }
        
        return newValues;
      });
    },
    [validateOnChange, runValidation]
  );

  // Setar valor diretamente
  const setValue = useCallback(
    (name: keyof T, value: unknown) => {
      handleChange(name)(value);
    },
    [handleChange]
  );

  // Setar múltiplos valores
  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState((prev) => {
      const updated = { ...prev, ...newValues };
      
      if (validateOnChange) {
        const newErrors = runValidation(updated as T);
        setErrors(newErrors);
      }
      
      return updated;
    });
  }, [validateOnChange, runValidation]);

  // Handler para blur
  const handleBlur = useCallback(
    (_name: keyof T) => () => {
      if (validateOnBlur) {
        const newErrors = runValidation(values);
        setErrors(newErrors);
      }
    },
    [values, validateOnBlur, runValidation]
  );

  // Handler para submissão
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      // Validar antes de submeter
      const validationErrors = runValidation(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      if (!onSubmit) return;

      try {
        setIsSubmitting(true);
        await onSubmit(values);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Erro ao submeter formulário');
        // Tipo 'submit' pode não existir em T, então usar any temporariamente
        setErrors({ submit: error.message } as any);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit, runValidation]
  );

  // Resetar formulário
  const reset = useCallback(() => {
    setValuesState(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Limpar erros
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Setar erros manualmente
  const setErrorsManual = useCallback((newErrors: FormErrors<T>) => {
    setErrors(newErrors);
  }, []);

  return {
    values,
    errors,
    isValid,
    isSubmitting,
    handleChange,
    setValue,
    setValues,
    handleBlur,
    handleSubmit,
    reset,
    clearErrors,
    setErrors: setErrorsManual,
  };
}
