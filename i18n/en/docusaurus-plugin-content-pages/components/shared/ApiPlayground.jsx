import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './ApiPlayground.module.css';

/* eslint-disable react/prop-types */

/**
 * API Playground Component
 *
 * Componente interativo para testar endpoints da API Z-API diretamente na documentação.
 * Permite que usuários no-code testem APIs sem precisar escrever código.
 *
 * @param {Object} props
 * @param {string} props.endpoint - URL do endpoint (ex: "/chats")
 * @param {string} props.method - Método HTTP (GET, POST, PUT, DELETE)
 * @param {Object} props.defaultParams - Parâmetros padrão
 * @param {Array} props.requiredFields - Campos obrigatórios
 * @param {string} props.description - Descrição do endpoint
 */
export default function ApiPlayground({
  endpoint,
  method = 'GET',
  defaultParams = {},
  requiredFields = [],
  description = '',
  bodySchema = null,
  queryParams = []
}) {
  const [instanceId, setInstanceId] = useState('');
  const [instanceToken, setInstanceToken] = useState('');
  const [clientToken, setClientToken] = useState('');
  const [requestBody, setRequestBody] = useState(JSON.stringify(defaultParams, null, 2));
  const [queryParameters, setQueryParameters] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [formatError, setFormatError] = useState(null);

  /**
   * Anti-salvamento/autofill:
   * - Evita autocomplete/history e reduz interferência de password managers.
   * - Não garante 100% (cada navegador/extensão pode se comportar diferente),
   *   mas é a abordagem padrão para minimizar persistência no client.
   */
  const noPersistInputProps = {
    autoComplete: 'off',
    autoCorrect: 'off',
    autoCapitalize: 'off',
    spellCheck: false,
    'data-lpignore': 'true', // LastPass
    'data-1p-ignore': 'true', // 1Password
    'data-bwignore': 'true', // Bitwarden
  };

  const noPersistPasswordProps = {
    ...noPersistInputProps,
    // "new-password" costuma evitar salvamento/autofill melhor do que "off" em alguns browsers
    autoComplete: 'new-password',
  };

  const tryParseJson = (value) => {
    try {
      return { ok: true, value: JSON.parse(value) };
    } catch (parseError) {
      return { ok: false, error: parseError };
    }
  };

  // Construir URL completa
  const buildUrl = ({ maskInstanceId = false, maskInstanceToken = false } = {}) => {
    let effectiveInstanceId = instanceId;
    if (maskInstanceId) {
      effectiveInstanceId = instanceId ? '***' : 'INSTANCE_ID';
    }

    let effectiveInstanceToken = instanceToken;
    if (maskInstanceToken) {
      effectiveInstanceToken = instanceToken ? '***' : 'INSTANCE_TOKEN';
    }

    const encodedInstanceId = encodeURIComponent(effectiveInstanceId);
    const encodedInstanceToken = encodeURIComponent(effectiveInstanceToken);

    let url = `https://api.z-api.io/instances/${encodedInstanceId}/token/${encodedInstanceToken}${endpoint}`;

    // Adicionar query parameters
    const queryString = Object.entries(queryParameters)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    if (queryString) {
      url += `?${queryString}`;
    }

    return url;
  };

  // Validar campos obrigatórios
  const validateFields = () => {
    if (!instanceId) {
      return 'Instance ID é obrigatório';
    }
    if (!instanceToken) {
      return 'Instance Token é obrigatório';
    }
    if (!clientToken) {
      return 'Client Token é obrigatório';
    }

    if (method !== 'GET' && requestBody) {
      const parsed = tryParseJson(requestBody);
      if (!parsed.ok) {
        return 'JSON inválido no corpo da requisição';
      }
      const body = parsed.value;
      
      // Validar campos obrigatórios
      for (const field of requiredFields) {
        if (!body[field]) {
          return `Campo obrigatório ausente: ${field}`;
        }
      }
      
      // Validações customizadas para phone
      if (body.phone) {
        const cleaned = body.phone.replace(/\D/g, '');
        if (cleaned.length < 10 || cleaned.length > 15) {
          return 'Número de telefone inválido. Use formato: DDI + DDD + Número (10-15 dígitos)';
        }
      }
      
      // Validações customizadas para message
      if (body.message) {
        if (typeof body.message !== 'string') {
          return 'Campo message deve ser uma string';
        }
        const trimmed = body.message.trim();
        if (trimmed.length === 0) {
          return 'Mensagem não pode estar vazia';
        }
        if (trimmed.length > 4096) {
          return 'Mensagem excede o limite de 4096 caracteres';
        }
      }
    }

    return null;
  };

  // Executar requisição
  const executeRequest = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      setResponse(null);
      setShowResponse(true);
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);
    setShowResponse(true);

    try {
      const options = {
        method,
        // Evitar cache e envio de credenciais/cookies por padrão (playground deve ser stateless)
        cache: 'no-store',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        headers: {
          'Client-Token': clientToken,
          'Content-Type': 'application/json'
        }
      };

      if (method !== 'GET' && requestBody) {
        options.body = requestBody;
      }

      const url = buildUrl();
      const res = await fetch(url, options);
      
      // Verificar Content-Type antes de fazer parse JSON
      let data;
      const contentType = res.headers.get('content-type');
      
      // Verificar se a resposta é HTML (geralmente indica 404 ou erro)
      if (contentType && contentType.includes('text/html')) {
        const text = await res.text();
        throw new Error(
          `ApiPlayground: Recebeu HTML em vez de JSON. Status: ${res.status}. ` +
          `Isso geralmente indica que o endpoint não existe (404). ` +
          `Primeiros caracteres: ${text.substring(0, 100)}`
        );
      }
      
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        // Se não for JSON, tentar fazer parse mesmo assim (pode ser texto JSON sem header)
        const text = await res.text();
        
        // Verificar se começa com HTML (indicador de erro 404)
        if (text.trim().toLowerCase().startsWith('<!doctype') || text.trim().toLowerCase().startsWith('<html')) {
          throw new Error(
            `ApiPlayground: Recebeu HTML em vez de JSON. Status: ${res.status}. ` +
            `Isso geralmente indica que o endpoint não existe (404). ` +
            `Primeiros caracteres: ${text.substring(0, 100)}`
          );
        }
        
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          // Se não conseguir fazer parse, retornar o texto como erro
          throw new Error(
            `ApiPlayground: Resposta não é JSON válido. Content-Type: ${contentType || 'não especificado'}. ` +
            `Status: ${res.status}. Primeiros caracteres: ${text.substring(0, 100)}`
          );
        }
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        data: data,
        headers: Object.fromEntries(res.headers.entries())
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Atualizar query parameter
  const updateQueryParam = (key, value) => {
    setQueryParameters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Formatar JSON automaticamente
  const formatJson = () => {
    const parsed = tryParseJson(requestBody);
    if (!parsed.ok) {
      setFormatError('JSON inválido: não foi possível formatar');
      return;
    }
    setFormatError(null);
    setRequestBody(JSON.stringify(parsed.value, null, 2));
  };

  const maskedUrl = buildUrl({ maskInstanceId: true, maskInstanceToken: true });
  const tokenPlaceholder = clientToken ? '***' : 'SEU_TOKEN';
  const hasBody = method !== 'GET';

  const curlPreview = hasBody
    ? `curl --request ${method} --url '${maskedUrl}' --header 'Client-Token: ${tokenPlaceholder}' --header 'Content-Type: application/json' --data '${requestBody}'`
    : `curl --request ${method} --url '${maskedUrl}' --header 'Client-Token: ${tokenPlaceholder}'`;

  return (
    <div className={styles.playground}>
      <div className={styles.header}>
        <h3>🧪 Teste este endpoint interativamente</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      {/* Seção de Configuração */}
      <div className={styles.configSection}>
        <h4>Configuração</h4>

        <div className={styles.formGroup}>
          <label htmlFor="instanceId">
            Instance ID <span className={styles.required}>*</span>
          </label>
          <input
            id="instanceId"
            name="zapi-instance-id"
            type="text"
            value={instanceId}
            onChange={(e) => setInstanceId(e.target.value)}
            placeholder="Cole seu Instance ID aqui"
            className={styles.input}
            {...noPersistInputProps}
          />
          <small className={styles.hint}>
            Encontre seu Instance ID na <a href="https://app.z-api.io/app" target="_blank" rel="noopener noreferrer">dashboard</a>
          </small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="instanceToken">
            Instance Token <span className={styles.required}>*</span>
          </label>
          <input
            id="instanceToken"
            name="zapi-instance-token"
            type="password"
            value={instanceToken}
            onChange={(e) => setInstanceToken(e.target.value)}
            placeholder="Cole o Token da Instância aqui"
            className={styles.input}
            {...noPersistPasswordProps}
          />
          <small className={styles.hint}>
            Token da instância (usado na URL). Não será salvo.
          </small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="clientToken">
            Client Token <span className={styles.required}>*</span>
          </label>
          <input
            id="clientToken"
            name="zapi-client-token"
            type="password"
            value={clientToken}
            onChange={(e) => setClientToken(e.target.value)}
            placeholder="Cole seu Client Token aqui"
            className={styles.input}
            {...noPersistPasswordProps}
          />
          <small className={styles.hint}>
            Seu token de segurança (não será salvo)
          </small>
        </div>
      </div>

      {/* Query Parameters */}
      {queryParams.length > 0 && (
        <div className={styles.querySection}>
          <h4>Parâmetros de Query (opcionais)</h4>
          {queryParams.map((param) => (
            <div key={param.name} className={styles.formGroup}>
              <label htmlFor={`query-${param.name}`}>
                {param.name}
                {param.required && <span className={styles.required}>*</span>}
              </label>

              {param.type === 'boolean' ? (
                <select
                  id={`query-${param.name}`}
                  name={`query-${param.name}`}
                  value={queryParameters[param.name] || ''}
                  onChange={(e) => updateQueryParam(param.name, e.target.value)}
                  className={styles.select}
                  {...noPersistInputProps}
                >
                  <option value="">-- Selecione --</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              ) : (
                <input
                  id={`query-${param.name}`}
                  name={`query-${param.name}`}
                  type="text"
                  value={queryParameters[param.name] || ''}
                  onChange={(e) => updateQueryParam(param.name, e.target.value)}
                  placeholder={param.placeholder || ''}
                  className={styles.input}
                  {...noPersistInputProps}
                />
              )}

              {param.description && (
                <small className={styles.hint}>{param.description}</small>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Request Body (para POST/PUT/DELETE) */}
      {method !== 'GET' && (
        <div className={styles.bodySection}>
          <h4>Corpo da Requisição</h4>
          <div className={styles.editorHeader}>
            <button
              onClick={formatJson}
              className={styles.formatButton}
              type="button"
            >
              Formatar JSON
            </button>
          </div>
          <textarea
            name="zapi-request-body"
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            className={styles.jsonEditor}
            rows={10}
            placeholder='{"campo": "valor"}'
            {...noPersistInputProps}
          />
          {formatError && (
            <div className={styles.warningBox}>
              <strong>Atenção:</strong> {formatError}
            </div>
          )}
          {requiredFields.length > 0 && (
            <small className={styles.hint}>
              Campos obrigatórios: {requiredFields.join(', ')}
            </small>
          )}
        </div>
      )}

      {/* Preview da Requisição */}
      <div className={styles.previewSection}>
        <h4>Preview da Requisição</h4>
        <CodeBlock language="bash">
          {curlPreview}
        </CodeBlock>
      </div>

      {/* Botão de Executar */}
      <div className={styles.executeSection}>
        <button
          onClick={executeRequest}
          disabled={loading}
          className={styles.executeButton}
        >
          {loading ? 'Executando...' : 'Executar Requisição'}
        </button>
      </div>

      {/* Resposta */}
      {showResponse && (
        <div className={styles.responseSection}>
          <h4>📦 Resposta</h4>

          {error && (
            <div className={styles.errorBox}>
              <strong>Erro:</strong> {error}
            </div>
          )}

          {response && (
            <>
              <div className={styles.statusBlock}>
                <div className={`${styles.statusCard} ${
                  response.status >= 200 && response.status < 300
                    ? styles.statusCardSuccess
                    : styles.statusCardError
                }`}>
                  <div className={styles.statusLabel}>Status Code</div>
                  <div className={styles.statusValue}>{response.status}</div>
                </div>
              </div>

              <div className={styles.tabs}>
                <div className={styles.tabContent}>
                  <h5>Corpo da Resposta</h5>
                  <CodeBlock language="json">
                    {JSON.stringify(response.data, null, 2)}
                  </CodeBlock>
                </div>
              </div>

              {/* Explicação da Resposta */}
              {response.status === 200 && (
                <div className={styles.successBox}>
                  <strong>Sucesso!</strong> A requisição foi executada corretamente.
                </div>
              )}

              {response.status === 401 && (
                <div className={styles.warningBox}>
                  <strong>Não autorizado:</strong> Verifique se seu Client Token está correto.
                </div>
              )}

              {response.status === 404 && (
                <div className={styles.warningBox}>
                  <strong>Não encontrado:</strong> Verifique se o Instance ID está correto.
                </div>
              )}

              {response.status >= 500 && (
                <div className={styles.errorBox}>
                  <strong>Erro no servidor:</strong> Tente novamente em alguns instantes.
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Dicas de Segurança */}
      <div className={styles.securityNote}>
        <strong>🔒 Nota de Segurança:</strong> Suas credenciais são usadas apenas nesta sessão e não são armazenadas.
        Use este playground apenas para testes. Em produção, proteja suas credenciais adequadamente.
      </div>
    </div>
  );
}
