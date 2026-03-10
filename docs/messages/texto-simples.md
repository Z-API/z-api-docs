---
id: texto-simples
title: Enviar Texto
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiPlayground from '@site/src/components/shared/ApiPlayground';
import { EndpointDisplay, PhoneDisplay, RequestBodyDisplay, EnvironmentVariableDisplay } from '@site/src/components/shared/HighlightBox';

# <Icon name="MessageSquare" size="lg" /> Enviar Mensagem de Texto

Este é o tipo de mensagem mais fundamental e amplamente utilizado. Permite enviar qualquer conteúdo em formato de texto para um contato no WhatsApp.

---

## <Icon name="Lightbulb" size="md" /> Casos de Uso Comuns

- **Notificações:** Enviar lembretes de agendamento, confirmações de pedido ou atualizações de status.
- **Suporte ao Cliente:** Responder a perguntas de clientes com informações claras e diretas.
- **Comunicação Interna:** Enviar alertas ou comunicados para equipes.
- **Automações Simples:** Enviar uma mensagem de boas-vindas quando um novo contato é adicionado.

---

## <Icon name="Wand2" size="md" /> Para Usuários No-Code

Se você está usando uma plataforma de automação como n8n ou Make, a configuração para enviar uma mensagem de texto é muito simples. Você precisará preencher principalmente dois campos obrigatórios:

1. **`phone`**: O número de telefone do seu contato. Lembre-se de usar o formato completo, com o código do país e o DDD. Exemplo: `5511999999999`.
2. **`message`**: O texto que você deseja enviar. Você pode usar variáveis da sua ferramenta de automação para personalizar a mensagem (por exemplo, `"Olá, {{nome_do_cliente}}!"`).

![Exemplo de mensagem de texto](/img/send-message-text.jpeg)

### Parâmetros Opcionais para No-Code

Se você quiser tornar suas mensagens mais naturais ou evitar bloqueios ao enviar muitas mensagens, você também pode usar estes campos opcionais:

- **`delayMessage`** (número): Adicione um delay de 1 a 15 segundos entre mensagens. Útil para campanhas ou quando você está enviando muitas mensagens seguidas.
- **`delayTyping`** (número): Mostra "Digitando..." por 1 a 15 segundos antes de enviar. Isso torna a comunicação mais natural e humanizada.

**Exemplo prático no n8n ou Make:**

```json
{
  "phone": "{{$json.phone}}",
  "message": "Olá, {{$json.nome}}! Seu pedido foi confirmado.",
  "delayMessage": 3,
  "delayTyping": 2
}
```

Para mais detalhes sobre como configurar automações no-code com Z-API, veja nossa seção de [Integradores](../integradors).

---

### Formatando sua Mensagem

Você pode formatar o texto das suas mensagens usando os mesmos códigos que o WhatsApp utiliza. Isso ajuda a destacar informações importantes.

| Estilo | Código | Exemplo no Código | Resultado no WhatsApp |
|:--------- |:---------------------------- |:--------------------------- |:--------------------------- |
| **Negrito**| Envolver com asteriscos (`*`) | `*texto em negrito*` | **texto em negrito** |
| *Itálico* | Envolver com underlines (`_`) | `_texto em itálico_` | *texto em itálico* |
| ~Tachado~ | Envolver com tils (`~`) | `~texto tachado~` | ~texto tachado~ |
| `Monoespaçado`| Envolver com 3 crases (``````) | ` ```texto monoespaçado``` ` | `texto monoespaçado` |

**Exemplo de mensagem formatada:**

```json
{
 "phone": "5511999999999",
 "message": "Olá!\n\nSeu pedido foi *confirmado*.\nO código de rastreio é `123456`.\n\n_Obrigado pela sua compra!_"
}
```

---

### <Icon name="AlignLeft" size="sm" /> Quebra de Linha

Para criar quebras de linha nas suas mensagens, você pode usar diferentes formatos dependendo da plataforma ou linguagem de programação que está utilizando:

| Formato | Quando Usar | Exemplo |
|:--------|:------------|:--------|
| `\n` | **Mais comum** - Funciona na maioria das linguagens (JavaScript, Python, PHP, etc.) | `"Linha 1\nLinha 2"` |
| `\r\n` | Windows e algumas APIs - Sequência de retorno de carro + nova linha | `"Linha 1\r\nLinha 2"` |
| `\r` | Sistemas legados (raramente usado) | `"Linha 1\rLinha 2"` |
| `%0a` | URLs e requisições HTTP quando o texto é codificado | `"Linha 1%0aLinha 2"` |

**Para Usuários No-Code:**

Em plataformas como n8n ou Make, geralmente você pode usar `\n` diretamente no campo de texto, ou usar a função de quebra de linha da própria ferramenta. Algumas plataformas também aceitam múltiplas linhas quando você pressiona Enter no campo de texto.

**Para Desenvolvedores:**

A maioria das linguagens modernas suporta `\n` nativamente. Em JavaScript/TypeScript, Python, PHP e outras linguagens, você pode usar strings com `\n`:

```javascript
const message = "Primeira linha\nSegunda linha\nTerceira linha";
```

Se você descobrir uma nova forma de fazer quebra de linha que funcione, [nos avise](https://github.com/CJBiohacker/Z-API-Central-Dev/issues) para incluirmos na documentação!

---

### <Icon name="Smile" size="sm" /> Emojis

Você pode usar emojis diretamente nas suas mensagens! Eles são tratados como caracteres normais de texto pelo WhatsApp.

**Como usar:**

1. **Copiar e colar:** Simplesmente copie um emoji de qualquer fonte e cole diretamente na sua mensagem
2. **Códigos Unicode:** Algumas linguagens permitem usar códigos Unicode (ex: `\u{1F600}` em JavaScript)
3. **Bibliotecas:** Muitas linguagens têm bibliotecas que facilitam o uso de emojis

**Exemplo:**

```json
{
  "phone": "5511999999999",
  "message": "Olá! 👋\n\nSeu pedido foi *confirmado* ✅\n\n_Obrigado pela sua compra!_ 😊"
}
```

**Dica:** Você pode encontrar emojis em sites como [Emojipedia](https://emojipedia.org/) ou simplesmente usar os emojis do seu teclado ou sistema operacional.

---

## <Icon name="Code" size="md" /> Para Desenvolvedores

Para enviar uma mensagem de texto via API, você fará uma requisição `POST` para o endpoint abaixo.

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

<EndpointDisplay
  method="POST"
  endpoint="https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text"
  instructionText="Endpoint para enviar mensagem de texto"
/>

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |
| `Content-Type` | string | Sim | Deve ser `application/json` |

### <Icon name="FileText" size="sm" /> Corpo da Requisição {#corpo-requisicao}

O corpo da requisição deve ser um JSON contendo o telefone do destinatário e a mensagem a ser enviada.

<RequestBodyDisplay
  body={{
    phone: "5511999999999",
    message: "Olá! Esta é uma mensagem de teste enviada pelo Z-API."
  }}
  instructionText="Corpo da requisição em formato JSON"
/>

### <Icon name="Settings" size="sm" /> Parâmetros {#parametros}

#### Parâmetros Obrigatórios

| Campo | Tipo | Obrigatório | Descrição |
|:------ |:----- |:---------- |:------------------------------------------------------------------------ |
| `phone` | string | Sim | O número do destinatário no formato DDI + DDD + NÚMERO. Veja exemplo abaixo: |
| `message`| string | Sim | O conteúdo da mensagem de texto que você deseja enviar. |

<PhoneDisplay
  phone="5511999999999"
  instructionText="Exemplo de número no formato internacional (DDI + DDD + Número)"
/>

#### Parâmetros Opcionais

| Campo | Tipo | Obrigatório | Descrição |
|:------ |:----- |:---------- |:------------------------------------------------------------------------ |
| `delayMessage` | number | Não | Controla o delay entre o envio de mensagens. Valor entre **1 e 15 segundos**. Se não informado, o delay padrão é de **1 a 3 segundos**. Útil para evitar bloqueios ao enviar múltiplas mensagens em sequência. |
| `delayTyping` | number | Não | Controla por quanto tempo o status "Digitando..." será exibido antes de enviar a mensagem. Valor entre **1 e 15 segundos**. Se não informado, o delay padrão é **0** (sem delay). Útil para tornar a comunicação mais natural e humanizada. |
| `editMessageId` | string | Não | Permite editar uma mensagem já enviada. Use o `messageId` da mensagem original junto com o novo conteúdo. **Importante:** É necessário ter o webhook configurado para usar esta funcionalidade. |

**Exemplo com parâmetros opcionais:**

```json
{
  "phone": "5511999999999",
  "message": "Olá! Esta é uma mensagem com delay configurado.",
  "delayMessage": 5,
  "delayTyping": 3
}
```

Neste exemplo, a mensagem aguardará 3 segundos mostrando "Digitando..." e depois aguardará mais 5 segundos antes de ser enviada.

---

### <Icon name="FlaskConical" size="sm" /> Teste Interativo

<ApiPlayground
  endpoint="/send-text"
  method="POST"
  description="Teste este endpoint agora mesmo! Cole suas credenciais, preencha o corpo da requisição e veja os resultados em tempo real."
  requiredFields={['phone', 'message']}
  defaultParams={{
    phone: "5511999999999",
    message: "Olá! Esta é uma mensagem de teste enviada pelo Z-API."
  }}
/>

---

## <Icon name="FileCode" size="md" /> Exemplos de Código

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
// Nunca commite tokens no código-fonte
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  // Remove caracteres não numéricos e valida formato
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

// Validação de mensagem (prevenção de injeção)
function sanitizeMessage(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('Mensagem deve ser uma string não vazia');
  }
  // Limita tamanho para prevenir DoS
  if (message.length > 4096) {
    throw new Error('Mensagem excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Dados da mensagem com validação
const rawPhone = '5511999999999';
const rawMessage = 'Olá! Esta é uma mensagem de teste.';

const messageData = {
  phone: validatePhoneNumber(rawPhone),
  message: sanitizeMessage(rawMessage),
};

// Enviar requisição com tratamento seguro de erros
async function sendTextMessage() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`;
    
    const response = await fetch(url, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      const errorText = await response.text().catch(() => 'Erro desconhecido');
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Mensagem enviada com sucesso. MessageId:', result.messageId);
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar mensagem:', error.message);
    throw error;
  }
}

// Executar função
sendTextMessage();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// Tipos para melhor type safety
interface SendTextRequest {
  phone: string;
  message: string;
}

interface SendTextResponse {
  messageId: string;
  status: string;
}

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
// Configure via: export ZAPI_INSTANCE_ID="seu-id"
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido');
  }
  return cleaned;
}

function sanitizeMessage(message: string): string {
  if (!message || message.trim().length === 0) {
    throw new Error('Mensagem não pode estar vazia');
  }
  if (message.length > 4096) {
    throw new Error('Mensagem excede limite de 4096 caracteres');
  }
  return message.trim();
}

// Dados da mensagem com validação
const messageData: SendTextRequest = {
  phone: validatePhoneNumber('5511999999999'),
  message: sanitizeMessage('Olá! Esta é uma mensagem de teste.'),
};

// Função para enviar mensagem de texto
async function sendTextMessage(): Promise<SendTextResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`;

  const response = await fetch(url, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(messageData),
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
sendTextMessage()
  .then((result) => console.log('Sucesso. MessageId:', result.messageId))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
# Configure via: export ZAPI_INSTANCE_ID="seu-id"
INSTANCE_ID = os.getenv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
INSTANCE_TOKEN = os.getenv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN")
CLIENT_TOKEN = os.getenv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

# Validação de entrada (segurança)
def validate_phone_number(phone: str) -> str:
    """Valida e sanitiza número de telefone."""
    cleaned = re.sub(r'\D', '', phone)  # Remove caracteres não numéricos
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError("Número de telefone inválido. Use formato: DDI + DDD + Número")
    return cleaned

def sanitize_message(message: str) -> str:
    """Valida e sanitiza mensagem."""
    if not message or not message.strip():
        raise ValueError("Mensagem não pode estar vazia")
    if len(message) > 4096:
        raise ValueError("Mensagem excede limite de 4096 caracteres")
    return message.strip()

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-text"

# Dados da mensagem com validação
try:
    payload: Dict[str, str] = {
        "phone": validate_phone_number("5511999999999"),
        "message": sanitize_message("Olá! Esta é uma mensagem de teste.")
    }
except ValueError as e:
    print(f"Erro de validação: {e}")
    exit(1)

# Headers obrigatórios
headers = {
 "Content-Type": "application/json",
    "Client-Token": CLIENT_TOKEN
}

# Enviar requisição com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    
    # Verificar status da resposta
    response.raise_for_status()  # Lança exceção se status >= 400
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    print(f"Mensagem enviada. MessageId: {result.get('messageId')}")
    
except requests.exceptions.HTTPError as e:
    # ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
    print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
except requests.exceptions.RequestException as e:
    print(f"Erro na requisição: {e}")
except ValueError as e:
    print(f"Erro de validação: {e}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
# Configure via: export ZAPI_INSTANCE_ID="seu-id"
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCE_ID}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_INSTANCE_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-SEU_CLIENT_TOKEN}"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Validação básica de entrada
PHONE="5511999999999"
MESSAGE="Olá! Esta é uma mensagem de teste."

# Enviar mensagem de texto via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-text" \
 -H 'Content-Type: application/json' \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"message\": \"${MESSAGE}\"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');
const { URL } = require('url');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function sanitizeMessage(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('Mensagem deve ser uma string não vazia');
  }
  if (message.length > 4096) {
    throw new Error('Mensagem excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Dados da mensagem com validação
const messageData = {
  phone: validatePhoneNumber('5511999999999'),
  message: sanitizeMessage('Olá! Esta é uma mensagem de teste.'),
};

// Enviar requisição
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`);
const postData = JSON.stringify(messageData);

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Client-Token': clientToken,
    'Content-Length': Buffer.byteLength(postData),
  },
  timeout: 30000, // 30 segundos
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const result = JSON.parse(data);
      // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
      console.log('Mensagem enviada. MessageId:', result.messageId);
    } else {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
      console.error(`Erro HTTP ${res.statusCode}: Requisição falhou`);
    }
  });
});

req.on('error', (error) => {
  console.error('Erro na requisição:', error.message);
});

req.on('timeout', () => {
  req.destroy();
  console.error('Timeout na requisição');
});

req.write(postData);
req.end();
```

</TabItem>
<TabItem value="nodejs-express" label="Node.js (Express)">

```javascript
const express = require('express');
const https = require('https');
const { URL } = require('url');

const app = express();
app.use(express.json());

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function sanitizeMessage(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('Mensagem deve ser uma string não vazia');
  }
  if (message.length > 4096) {
    throw new Error('Mensagem excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Rota para enviar mensagem de texto
app.post('/send-text', async (req, res) => {
  try {
    // Dados da mensagem com validação
    const rawPhone = req.body.phone || '5511999999999';
    const rawMessage = req.body.message || 'Olá! Esta é uma mensagem de teste.';

    const messageData = {
      phone: validatePhoneNumber(rawPhone),
      message: sanitizeMessage(rawMessage),
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`);
    const postData = JSON.stringify(messageData);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
        'Content-Length': Buffer.byteLength(postData),
      },
      timeout: 30000, // 30 segundos
    };

    const result = await new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            try {
              const parsed = JSON.parse(data);
              // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
              resolve({ success: true, messageId: parsed.messageId });
            } catch (error) {
              reject(new Error('Erro ao processar resposta'));
            }
          } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            reject(new Error(`Erro HTTP ${response.statusCode}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout na requisição'));
      });

      req.write(postData);
      req.end();
    });

    res.status(200).json(result);
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao enviar mensagem:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor Express rodando na porta 3000');
});
```

</TabItem>
<TabItem value="nodejs-koa" label="Node.js (Koa)">

```javascript
const Koa = require('koa');
const Router = require('@koa/router');
const https = require('https');
const { URL } = require('url');

const app = new Koa();
const router = new Router();

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Middleware para parsing JSON
app.use(require('koa-bodyparser')());

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function sanitizeMessage(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('Mensagem deve ser uma string não vazia');
  }
  if (message.length > 4096) {
    throw new Error('Mensagem excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Rota para enviar mensagem de texto
router.post('/send-text', async (ctx) => {
  try {
    // Dados da mensagem com validação
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const rawMessage = ctx.request.body.message || 'Olá! Esta é uma mensagem de teste.';

    const messageData = {
      phone: validatePhoneNumber(rawPhone),
      message: sanitizeMessage(rawMessage),
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`);
    const postData = JSON.stringify(messageData);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
        'Content-Length': Buffer.byteLength(postData),
      },
      timeout: 30000, // 30 segundos
    };

    const result = await new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            try {
              const parsed = JSON.parse(data);
              // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
              resolve({ success: true, messageId: parsed.messageId });
            } catch (error) {
              reject(new Error('Erro ao processar resposta'));
            }
          } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            reject(new Error(`Erro HTTP ${response.statusCode}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout na requisição'));
      });

      req.write(postData);
      req.end();
    });

    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    ctx.app.emit('error', error, ctx);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

// Error handler
app.on('error', (err, ctx) => {
  console.error('Erro ao enviar mensagem:', err.message);
});

app.listen(3000, () => {
  console.log('Servidor Koa rodando na porta 3000');
});
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class SendTextMessage {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCE_ID";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_INSTANCE_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";

    // Validação de entrada (segurança)
    private static String validatePhoneNumber(String phone) {
        String cleaned = phone.replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("Número de telefone inválido. Use formato: DDI + DDD + Número");
        }
        return cleaned;
    }

    private static String sanitizeMessage(String message) {
        if (message == null || message.trim().isEmpty()) {
            throw new IllegalArgumentException("Mensagem não pode estar vazia");
        }
        if (message.length() > 4096) {
            throw new IllegalArgumentException("Mensagem excede limite de 4096 caracteres");
        }
        return message.trim();
    }

    public static void main(String[] args) {
        try {
            // Dados da mensagem com validação
            String phone = validatePhoneNumber("5511999999999");
            String message = sanitizeMessage("Olá! Esta é uma mensagem de teste.");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-text",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setConnectTimeout(30000); // 30 segundos
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);

            // Enviar dados
            String jsonInputString = String.format(
                "{\"phone\":\"%s\",\"message\":\"%s\"}",
                phone.replace("\"", "\\\""),
                message.replace("\"", "\\\"")
            );

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            // Verificar resposta
            int responseCode = conn.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) {
                try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    System.out.println("Mensagem enviada. Response: " + response.toString());
                }
            } else {
                // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
                System.err.println("Erro HTTP " + responseCode + ": Requisição falhou");
            }

        } catch (Exception e) {
            System.err.println("Erro: " + e.getMessage());
        }
    }
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

class SendTextMessage
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = 
        Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCE_ID";
    private static readonly string InstanceToken = 
        Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "SEU_INSTANCE_TOKEN";
    private static readonly string ClientToken = 
        Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "SEU_CLIENT_TOKEN";

    // Validação de entrada (segurança)
    private static string ValidatePhoneNumber(string phone)
    {
        string cleaned = System.Text.RegularExpressions.Regex.Replace(phone, @"\D", "");
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("Número de telefone inválido. Use formato: DDI + DDD + Número");
        }
        return cleaned;
    }

    private static string SanitizeMessage(string message)
    {
        if (string.IsNullOrWhiteSpace(message))
        {
            throw new ArgumentException("Mensagem não pode estar vazia");
        }
        if (message.Length > 4096)
        {
            throw new ArgumentException("Mensagem excede limite de 4096 caracteres");
        }
        return message.Trim();
    }

    static async Task Main(string[] args)
    {
        try
        {
            // Dados da mensagem com validação
            string phone = ValidatePhoneNumber("5511999999999");
            string message = SanitizeMessage("Olá! Esta é uma mensagem de teste.");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-text";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);

                var payload = new
                {
                    phone = phone,
                    message = message
                };

                string json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                content.Headers.Add("Client-Token", ClientToken);

                HttpResponseMessage response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine($"Mensagem enviada. Response: {result}");
                }
                else
                {
                    // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
                    Console.WriteLine($"Erro HTTP {(int)response.StatusCode}: Requisição falhou");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro: {ex.Message}");
        }
    }
}
```

</TabItem>
<TabItem value="go" label="Go">

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "net/url"
    "os"
    "regexp"
    "strings"
    "time"
)

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

// Validação de entrada (segurança)
func validatePhoneNumber(phone string) (string, error) {
    re := regexp.MustCompile(`\D`)
    cleaned := re.ReplaceAllString(phone, "")
    if len(cleaned) < 10 || len(cleaned) > 15 {
        return "", fmt.Errorf("número de telefone inválido. Use formato: DDI + DDD + Número")
    }
    return cleaned, nil
}

func sanitizeMessage(message string) (string, error) {
    trimmed := strings.TrimSpace(message)
    if trimmed == "" {
        return "", fmt.Errorf("mensagem não pode estar vazia")
    }
    if len(trimmed) > 4096 {
        return "", fmt.Errorf("mensagem excede limite de 4096 caracteres")
    }
    return trimmed, nil
}

func main() {
    instanceId := getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
    instanceToken := getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN")
    clientToken := getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

    // Dados da mensagem com validação
    phone, err := validatePhoneNumber("5511999999999")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    message, err := sanitizeMessage("Olá! Esta é uma mensagem de teste.")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    baseURL := fmt.Sprintf(
        "https://api.z-api.io/instances/%s/token/%s/send-text",
        url.QueryEscape(instanceId),
        url.QueryEscape(instanceToken),
    )

    payload := map[string]string{
        "phone":   phone,
        "message": message,
    }

    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Erro ao serializar JSON: %v\n", err)
        return
    }

    req, err := http.NewRequest("POST", baseURL, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Printf("Erro ao criar requisição: %v\n", err)
        return
    }

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)

    client := &http.Client{
        Timeout: 30 * time.Second,
    }

    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro na requisição: %v\n", err)
        return
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        var result map[string]interface{}
        if err := json.NewDecoder(resp.Body).Decode(&result); err == nil {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            fmt.Printf("Mensagem enviada. MessageId: %v\n", result["messageId"])
        }
    } else {
        // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
        fmt.Printf("Erro HTTP %d: Requisição falhou\n", resp.StatusCode)
    }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCE_ID';
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'SEU_INSTANCE_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber($phone) {
    $cleaned = preg_replace('/\D/', '', $phone);
    if (strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new InvalidArgumentException('Número de telefone inválido. Use formato: DDI + DDD + Número');
    }
    return $cleaned;
}

function sanitizeMessage($message) {
    if (empty(trim($message))) {
        throw new InvalidArgumentException('Mensagem não pode estar vazia');
    }
    if (strlen($message) > 4096) {
        throw new InvalidArgumentException('Mensagem excede limite de 4096 caracteres');
    }
    return trim($message);
}

try {
    // Dados da mensagem com validação
    $phone = validatePhoneNumber('5511999999999');
    $message = sanitizeMessage('Olá! Esta é uma mensagem de teste.');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-text',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = json_encode([
        'phone' => $phone,
        'message' => $message
    ]);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Client-Token: ' . $clientToken
        ],
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true, // ⚠️ SEGURANÇA: Sempre verifique certificados SSL
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        throw new Exception("Erro na requisição: $error");
    }

    if ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        echo "Mensagem enviada. MessageId: " . $result['messageId'] . "\n";
    } else {
        // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
        echo "Erro HTTP $httpCode: Requisição falhou\n";
    }

} catch (Exception $e) {
    echo "Erro: " . $e->getMessage() . "\n";
}
?>
```

</TabItem>
<TabItem value="ruby" label="Ruby">

```ruby
require 'net/http'
require 'json'
require 'uri'

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCE_ID'
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_INSTANCE_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'SEU_CLIENT_TOKEN'

# Validação de entrada (segurança)
def validate_phone_number(phone)
  cleaned = phone.gsub(/\D/, '')
  if cleaned.length < 10 || cleaned.length > 15
    raise ArgumentError, 'Número de telefone inválido. Use formato: DDI + DDD + Número'
  end
  cleaned
end

def sanitize_message(message)
  trimmed = message.to_s.strip
  if trimmed.empty?
    raise ArgumentError, 'Mensagem não pode estar vazia'
  end
  if trimmed.length > 4096
    raise ArgumentError, 'Mensagem excede limite de 4096 caracteres'
  end
  trimmed
end

begin
  # Dados da mensagem com validação
  phone = validate_phone_number('5511999999999')
  message = sanitize_message('Olá! Esta é uma mensagem de teste.')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(instance_id)}/token/#{URI.encode_www_form_component(instance_token)}/send-text")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER # ⚠️ SEGURANÇA: Sempre verifique certificados SSL
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = JSON.generate({
    phone: phone,
    message: message
  })

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    puts "Mensagem enviada. MessageId: #{result['messageId']}"
  else
    # ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
    puts "Erro HTTP #{response.code}: Requisição falhou"
  end

rescue => e
  puts "Erro: #{e.message}"
end
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import Foundation

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCE_ID"
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "SEU_INSTANCE_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "SEU_CLIENT_TOKEN"

// Validação de entrada (segurança)
func validatePhoneNumber(_ phone: String) throws -> String {
    let cleaned = phone.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
    if cleaned.count < 10 || cleaned.count > 15 {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Número de telefone inválido. Use formato: DDI + DDD + Número"])
    }
    return cleaned
}

func sanitizeMessage(_ message: String) throws -> String {
    let trimmed = message.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmed.isEmpty {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Mensagem não pode estar vazia"])
    }
    if trimmed.count > 4096 {
        throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "Mensagem excede limite de 4096 caracteres"])
    }
    return trimmed
}

// Dados da mensagem com validação
do {
    let phone = try validatePhoneNumber("5511999999999")
    let message = try sanitizeMessage("Olá! Esta é uma mensagem de teste.")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-text"
    
    guard let url = URL(string: urlString) else {
        throw NSError(domain: "URLError", code: 1, userInfo: [NSLocalizedDescriptionKey: "URL inválida"])
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30.0

    let payload: [String: String] = [
        "phone": phone,
        "message": message
    ]
    request.httpBody = try JSONSerialization.data(withJSONObject: payload)

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Erro na requisição: \(error.localizedDescription)")
            return
        }

        if let httpResponse = response as? HTTPURLResponse {
            if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
                if let data = data,
                   let result = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let messageId = result["messageId"] as? String {
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    print("Mensagem enviada. MessageId: \(messageId)")
                }
            } else {
                // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
                print("Erro HTTP \(httpResponse.statusCode): Requisição falhou")
            }
        }
    }
    task.resume()

    // Aguardar conclusão (em produção, use async/await ou completion handlers)
    RunLoop.main.run(until: Date(timeIntervalSinceNow: 35))

} catch {
    print("Erro: \(error.localizedDescription)")
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCE_ID" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_INSTANCE_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "SEU_CLIENT_TOKEN" }

# Validação de entrada (segurança)
function Validate-PhoneNumber {
    param([string]$Phone)
    $cleaned = $Phone -replace '\D', ''
    if ($cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "Número de telefone inválido. Use formato: DDI + DDD + Número"
    }
    return $cleaned
}

function Sanitize-Message {
    param([string]$Message)
    $trimmed = $Message.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed)) {
        throw "Mensagem não pode estar vazia"
    }
    if ($trimmed.Length -gt 4096) {
        throw "Mensagem excede limite de 4096 caracteres"
    }
    return $trimmed
}

try {
    # Dados da mensagem com validação
    $phone = Validate-PhoneNumber -Phone "5511999999999"
    $message = Sanitize-Message -Message "Olá! Esta é uma mensagem de teste."

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-text"

    $body = @{
        phone = $phone
        message = $message
    } | ConvertTo-Json

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Body $body -Headers $headers -TimeoutSec 30 -ErrorAction Stop

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    Write-Host "Mensagem enviada. MessageId: $($response.messageId)"

} catch {
    # ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
    if ($_.Exception.Response) {
        $statusCode = [int]$_.Exception.Response.StatusCode
        Write-Host "Erro HTTP $statusCode : Requisição falhou"
    } else {
        Write-Host "Erro: $($_.Exception.Message)"
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST /instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: SEU_CLIENT_TOKEN
Content-Length: 65

{
 "phone": "5511999999999",
 "message": "Olá! Esta é uma mensagem de teste."
}
```

**Nota:** Este é um exemplo de requisição HTTP raw. Em produção:

- ⚠️ **SEGURANÇA:** Substitua `SUA_INSTANCIA`, `SEU_TOKEN` e `SEU_CLIENT_TOKEN` por valores reais de variáveis de ambiente
- ⚠️ **SEGURANÇA:** Sempre use HTTPS (não HTTP)
- ⚠️ **Validação:** Valide `phone` (apenas números, 10-15 dígitos) e `message` (não vazio, máximo 4096 caracteres) antes de enviar

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <cstring>
#include <regex>
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const char* key, const std::string& defaultValue) {
    const char* value = std::getenv(key);
    return value ? std::string(value) : defaultValue;
}

// Validação de entrada (segurança)
std::string validatePhoneNumber(const std::string& phone) {
    std::regex nonDigit("\\D");
    std::string cleaned = std::regex_replace(phone, nonDigit, "");
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::invalid_argument("Número de telefone inválido. Use formato: DDI + DDD + Número");
    }
    return cleaned;
}

std::string sanitizeMessage(const std::string& message) {
    std::string trimmed = message;
    // Remove espaços no início e fim
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    
    if (trimmed.empty()) {
        throw std::invalid_argument("Mensagem não pode estar vazia");
    }
    if (trimmed.length() > 4096) {
        throw std::invalid_argument("Mensagem excede limite de 4096 caracteres");
    }
    return trimmed;
}

// Callback para escrever resposta
size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

int main() {
    try {
        // ⚠️ SEGURANÇA: Use variáveis de ambiente
        std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
        std::string instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN");
        std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

        // Dados da mensagem com validação
        std::string phone = validatePhoneNumber("5511999999999");
        std::string message = sanitizeMessage("Olá! Esta é uma mensagem de teste.");

        // ⚠️ SEGURANÇA: Sempre use HTTPS
        std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-text";
        
        // Criar payload JSON
        std::string jsonPayload = "{\"phone\":\"" + phone + "\",\"message\":\"" + message + "\"}";

        CURL* curl = curl_easy_init();
        if (!curl) {
            std::cerr << "Erro ao inicializar cURL" << std::endl;
            return 1;
        }

        std::string responseData;
        struct curl_slist* headers = nullptr;

        // Configurar headers
        headers = curl_slist_append(headers, "Content-Type: application/json");
        std::string clientTokenHeader = "Client-Token: " + clientToken;
        headers = curl_slist_append(headers, clientTokenHeader.c_str());

        // Configurar cURL
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L); // 30 segundos
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L); // ⚠️ SEGURANÇA: Verificar certificados SSL

        CURLcode res = curl_easy_perform(curl);
        long responseCode = 0;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            std::cout << "Mensagem enviada. Response: " << responseData << std::endl;
        } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            std::cerr << "Erro HTTP " << responseCode << ": Requisição falhou" << std::endl;
            if (res != CURLE_OK) {
                std::cerr << "Erro cURL: " << curl_easy_strerror(res) << std::endl;
            }
        }

        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);

    } catch (const std::exception& e) {
        std::cerr << "Erro: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}
```

**Compilação:**

```bash
# Requer libcurl-dev
g++ -o send_text send_text.cpp -lcurl
```

</TabItem>
<TabItem value="c" label="C">

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

// Validação de entrada (segurança)
int validatePhoneNumber(const char* phone, char* cleaned) {
    int j = 0;
    for (int i = 0; phone[i] != '\0'; i++) {
        if (isdigit(phone[i])) {
            cleaned[j++] = phone[i];
        }
    }
    cleaned[j] = '\0';
    
    int len = strlen(cleaned);
    if (len < 10 || len > 15) {
        return 0; // Inválido
    }
    return 1; // Válido
}

int sanitizeMessage(const char* message, char* sanitized) {
    // Remove espaços no início e fim
    int start = 0;
    int end = strlen(message) - 1;
    
    while (isspace(message[start]) && message[start] != '\0') start++;
    while (end > start && isspace(message[end])) end--;
    
    if (start > end) {
        return 0; // Vazio
    }
    
    int len = end - start + 1;
    if (len > 4096) {
        return -1; // Muito longo
    }
    
    strncpy(sanitized, message + start, len);
    sanitized[len] = '\0';
    return 1; // Válido
}

// Callback para escrever resposta
size_t WriteCallback(void* contents, size_t size, size_t nmemb, char* data) {
    size_t totalSize = size * nmemb;
    strncat(data, (char*)contents, totalSize);
    return totalSize;
}

int main() {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente
    char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
    char* instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN");
    char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

    // Dados da mensagem com validação
    char phone[20];
    if (!validatePhoneNumber("5511999999999", phone)) {
        fprintf(stderr, "Erro de validação: Número de telefone inválido\n");
        return 1;
    }

    char message[4100];
    int msgResult = sanitizeMessage("Olá! Esta é uma mensagem de teste.", message);
    if (msgResult == 0) {
        fprintf(stderr, "Erro de validação: Mensagem não pode estar vazia\n");
        return 1;
    } else if (msgResult == -1) {
        fprintf(stderr, "Erro de validação: Mensagem excede limite de 4096 caracteres\n");
        return 1;
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-text", 
             instanceId, instanceToken);

    // Criar payload JSON
    char jsonPayload[4200];
    snprintf(jsonPayload, sizeof(jsonPayload), 
             "{\"phone\":\"%s\",\"message\":\"%s\"}", phone, message);

    CURL* curl = curl_easy_init();
    if (!curl) {
        fprintf(stderr, "Erro ao inicializar cURL\n");
        return 1;
    }

    char responseData[4096] = {0};
    struct curl_slist* headers = NULL;

    // Configurar headers
    headers = curl_slist_append(headers, "Content-Type: application/json");
    char clientTokenHeader[256];
    snprintf(clientTokenHeader, sizeof(clientTokenHeader), "Client-Token: %s", clientToken);
    headers = curl_slist_append(headers, clientTokenHeader);

    // Configurar cURL
    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload);
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, responseData);
    curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L); // 30 segundos
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L); // ⚠️ SEGURANÇA: Verificar certificados SSL

    CURLcode res = curl_easy_perform(curl);
    long responseCode = 0;
    curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

    if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        printf("Mensagem enviada. Response: %s\n", responseData);
    } else {
        // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
        fprintf(stderr, "Erro HTTP %ld: Requisição falhou\n", responseCode);
        if (res != CURLE_OK) {
            fprintf(stderr, "Erro cURL: %s\n", curl_easy_strerror(res));
        }
    }

    curl_slist_free_all(headers);
    curl_easy_cleanup(curl);

    return 0;
}
```

**Compilação:**

```bash
# Requer libcurl-dev
gcc -o send_text send_text.c -lcurl
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Resposta da API {#resposta}

Se a sua requisição for bem-sucedida, você receberá a seguinte resposta, indicando que a mensagem foi enfileirada para envio.

### 200 OK {#200-ok}

```json
{
    "zaapId": "019BC85B8F177B568F393E5D1FDD346A",
    "messageId": "71B2D1A84A1F786E3226",
    "id": "71B2D1A84A1F786E3226"
}
```

| Campo | Tipo | Descrição |
|:--- |:--- |:--- |
| `zaapId` | string | id no z-api. |
| `messageId` | string | id no whatsapp. |
| `id` | string | Adicionado para compatibilidade com zapier, ele tem o mesmo valor do messageId. |

**Importante:** A resposta é imediata porque a mensagem é enfileirada para processamento assíncrono. Para saber quando a mensagem foi realmente enviada e recebida, configure um [webhook de status de mensagem](../webhooks/status-mensagem).

**Para rastrear mensagens recebidas:** Configure o webhook [Ao Receber Mensagem](../webhooks/ao-receber) para ser notificado quando alguém responder à sua mensagem.

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Descrição | Como Resolver |
|--------|-----------|---------------|
| `400` | Parâmetros inválidos | Verifique os parâmetros enviados |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `405` | Método HTTP incorreto | Certifique-se de usar `POST` |
| `415` | Content-Type ausente | Adicione `Content-Type: application/json` no header |
| `429` | Rate limit excedido | Aguarde e tente novamente |
| `5xx` | Erro interno do servidor | Tente novamente; se persistir, abra um chamado de suporte |
