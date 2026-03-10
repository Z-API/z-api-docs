---
id: responder
sidebar_position: 27
title: Reply message
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Reply" size="lg" /> Responding to a Message

Respond to a specific message using the Z-API's send-text method. The response will appear as a threaded reply in WhatsApp, linked to the original message.

In this topic, we'll talk about how to respond directly to a message!

When you use the [send-text](./texto-simples) method, there is an optional attribute called **messageId**, which receives the ID of any message. When this attribute is passed, your message will be directly related to the original message with the provided ID.

:::tip Tip

If you have any doubts about how to send a text message, you can read about it in our [**Sending Simple Text**](./texto-simples) topic.

:::

![Example of responding to a message](/img/reply-message.jpeg)

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{instanceId}/token/{token}/send-text
```

**Important:** To respond to a message, you use the same endpoint as sending simple text (`/send-text`), but including the original message's `messageId` parameter.

### Headers {#headers}

| Header | Type | Required | Description |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Yes | Authentication token |
| Content-Type | string | Yes | Should be `application/json` |

### Request Body {#corpo-da-requisicao}

```json
{
  "phone": "5511999999999",
  "message": "Welcome to *Z-API*",
  "messageId": "3999984263738042930CD6ECDE9VDWSA"
}
```

**Example for group with private reply:**

```json
{
  "phone": "342532456234453-group",
  "message": "Welcome to *Z-API*",
  "messageId": "3999984263738042930CD6ECDE9VDWSA",
  "privateAnswer": true
}
```

**Example with optional delay:**

```json
{
  "phone": "5511999999999",
  "message": "Welcome to *Z-API*",
  "messageId": "3999984263738042930CD6ECDE9VDWSA",
  "delayMessage": 5
}
```

### Parameters {#parametros}

#### Required Parameters

| Field | Type | Required | Description |
|-----------|--------|-------------|--------------------------------------------------|
| `phone` | string | Yes | Recipient's phone number (or group ID for sending to groups) in DDI DDD NUMBER format. **Important:** Send only numbers, without formatting or mask |
| `message` | string | Yes | Text to be sent |
| `messageId` | string | Yes | Original message ID. If the message was sent by you, it's the code in your response. If it was sent by a contact, you'll receive this `messageId` via your receive webhook |

#### Optional Parameters

| Field | Type | Description |
|----------|------|-----------|
| `delayMessage` | number | Adds a delay in seconds (1-15 seconds) to the message. You can decide between a range of 1-15 sec, meaning how many seconds it will wait before sending the next message. (Ex "delayMessage": 5, ). The default delay if not informed is 1-3 sec |
| `privateAnswer` | boolean | For group messages, defines whether the reply will be sent to the group or in private from the sender (not yourself). If the sender is you, the `privateAnswer` parameter will be ignored and the reply will be sent in the group |

## <Icon name="Wand2" size="md" /> For Non-Code Users {#para-usuarios-no-code}

In your automation tool (n8n, Make, Zapier), you will fill in the following fields:

### Required Fields

1. **`phone`**: The chat number where the message is located. Use the full format: DDI + DDD + Number (ex: `5511999999999`). **Important:** Send only numbers, without formatting or mask. For groups, use the group ID.

2. **`message`**: The text of your reply. You can use Markdown formatting (bold with `*texto*`, italic with `_texto_`, etc.).

3. **`messageId`**: The ID of the original message you are replying to. This is the `messageId` from the message you received via webhooks or that you sent previously (obtained in the API response).

### Optional Fields

1. **`delayMessage`**: Delay in seconds (1-15 seconds) before sending the reply. If not informed, the default delay is 1-3 seconds.

2. **`privateAnswer`**: For group messages, defines whether the reply will be sent to the group or in private from the sender. Use `true` for sending in private, `false` or omit for sending to the group. **Important:** If the sender is you, this parameter will be ignored and the reply will be sent in the group.

### Practical Example for Non-Code

**Simple Reply:**

```json
{
  "phone": "5511999999999",
  "message": "Obrigado pela sua mensagem!",
  "messageId": "3999984263738042930CD6ECDE9VDWSA"
}
```

**Group Reply (Private):**

```json
{
  "phone": "342532456234453-group",
  "message": "Vou te responder no particular",
  "messageId": "3999984263738042930CD6ECDE9VDWSA",
  "privateAnswer": true
}
```

**Important Tips:**

- **Get messageId**: The `messageId` can be obtained through webhooks when a message is received. Save this ID if you want to reply later.
- **Threaded Replies**: When you include the `messageId`, the message will appear as a threaded reply in WhatsApp, linked to the original message.
- **Groups**: To reply in groups, use the group ID in the `phone` field. Use `privateAnswer: true` to reply in private from the sender.
- **Formatting**: You can use Markdown formatting in the message (bold, italic, etc.).

**Common Use Cases:**

- **Customer Support**: Directly answer customer questions
- **Technical Support**: Organized responses to technical queries
- **Automated Responses**: Create automated replies for received messages
- **Group Management**: Organize responses in group chats

## <Icon name="CheckCircle" size="md" /> Responses {#respostas}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

| Field | Type | Description |
|---------|---------|----------------------------------------------|
| `zaapId` | string | Unique ID of the message in the Z-API system (for internal tracking) |
| `messageId` | string | Unique ID of the message on WhatsApp. **Save this ID!** Use it to track delivery status via webhooks |
| `id` | string | Compatibility ID with Zapier and legacy systems. Has the same value as `messageId` |

**Important:**

- The `messageId` is the primary identifier you should use to track the message
- The `zaapId` is used internally by Z-API for processing
- The `id` exists only for compatibility with legacy integrations (like Zapier)

**Delivery Tracking:**

To know when the message was delivered or if there was an error, configure a webhook and monitor events. See more about [message received webhooks](../webhooks/ao-receber#response).

### Common Errors {#erros-comuns}

| Code | Reason | How to Solve |
|--------|-----------------------|----------------------------------------------------|
| 400 | Invalid parameters | Check `phone`, `messageId` and `message` |
| 401 | Invalid token | Check the header `Client-Token` |
| 404 | Message not found | Verify if the `messageId` exists and is valid |
| 429 | Rate limit | Wait and try again |
| 5xx | Internal error | Try again; open support if persists |

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone (apenas números)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números (DDI + DDD + Número)');
  }
  return phone;
}

// Validar messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId é obrigatório e deve ser uma string não vazia');
  }
  return messageId.trim();
}

// Validar mensagem
function validateMessage(message) {
  if (!message || typeof message !== 'string' || message.trim() === '') {
    throw new Error('message é obrigatório e deve ser uma string não vazia');
  }
  if (message.length > 4096) {
    throw new Error('message excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Responder mensagem
async function replyToMessage(phone, messageId, message) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    const validatedMessageId = validateMessageId(messageId);
    const validatedMessage = validateMessage(message);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/reply-message`;
    
    const payload = {
      phone: validatedPhone,
      messageId: validatedMessageId,
      message: validatedMessage,
    };
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Resposta enviada com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao responder mensagem:', error.message);
    throw error;
  }
}

// Exemplo de uso
replyToMessage('5511999999999', '3EB0C767F26A', 'Esta é uma resposta à mensagem original');
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interfaces
interface ReplyMessageResponse {
  messageId: string;
  status: string;
}

// Validar telefone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar messageId
function validateMessageId(messageId: string): string {
  if (!messageId || messageId.trim() === '') {
    throw new Error('messageId é obrigatório');
  }
  return messageId.trim();
}

// Validar mensagem
function validateMessage(message: string): string {
  if (!message || message.trim() === '') {
    throw new Error('message é obrigatório');
  }
  if (message.length > 4096) {
    throw new Error('message excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Função para responder mensagem
async function replyToMessage(
  phone: string,
  messageId: string,
  message: string
): Promise<ReplyMessageResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);
  const validatedMessageId = validateMessageId(messageId);
  const validatedMessage = validateMessage(message);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/reply-message`;

  const payload = {
    phone: validatedPhone,
    messageId: validatedMessageId,
    message: validatedMessage,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar
replyToMessage('5511999999999', '3EB0C767F26A', 'Esta é uma resposta à mensagem original')
  .then((result) => console.log('Sucesso:', result))
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
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Valida telefone (apenas números)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Telefone inválido. Use apenas números (DDI + DDD + Número)')
    return phone

def validate_message_id(message_id: str) -> str:
    """Valida messageId"""
    if not message_id or not isinstance(message_id, str) or not message_id.strip():
        raise ValueError('messageId é obrigatório e deve ser uma string não vazia')
    return message_id.strip()

def validate_message(message: str) -> str:
    """Valida mensagem"""
    if not message or not isinstance(message, str) or not message.strip():
        raise ValueError('message é obrigatório e deve ser uma string não vazia')
    if len(message) > 4096:
        raise ValueError('message excede o limite de 4096 caracteres')
    return message.strip()

def reply_to_message(phone: str, message_id: str, message: str) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    validated_message_id = validate_message_id(message_id)
    validated_message = validate_message(message)
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/reply-message"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "messageId": validated_message_id,
        "message": validated_message
    }
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Resposta enviada com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
reply_to_message('5511999999999', '3EB0C767F26A', 'Esta é uma resposta à mensagem original')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDAÇÃO: Validar telefone (apenas números)
PHONE="${1:-5511999999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Erro: Telefone inválido. Use apenas números (DDI + DDD + Número)"
    exit 1
fi

# ⚠️ VALIDAÇÃO: Validar messageId
MESSAGE_ID="${2:-3EB0C767F26A}"
if [ -z "$MESSAGE_ID" ] || [ "$MESSAGE_ID" = "" ]; then
    echo "Erro: messageId é obrigatório e deve ser uma string não vazia"
    exit 1
fi

# ⚠️ VALIDAÇÃO: Validar mensagem
MESSAGE="${3:-Esta é uma resposta à mensagem original}"
if [ -z "$MESSAGE" ] || [ "$MESSAGE" = "" ]; then
    echo "Erro: message é obrigatório e deve ser uma string não vazia"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Responder mensagem via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/reply-message" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"messageId\": \"${MESSAGE_ID}\",
    \"message\": \"${MESSAGE}\"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID CLIENT_TOKEN PHONE MESSAGE_ID MESSAGE
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId é obrigatório');
  }
  return messageId.trim();
}

// Validar mensagem
function validateMessage(message) {
  if (!message || typeof message !== 'string' || message.trim() === '') {
    throw new Error('message é obrigatório');
  }
  if (message.length > 4096) {
    throw new Error('message excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Responder mensagem
function replyToMessage(phone, messageId, message) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
      const validatedMessageId = validateMessageId(messageId);
      const validatedMessage = validateMessage(message);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/reply-message`;
    const payload = JSON.stringify({
      phone: phone,
      messageId: messageId,
      message: message,
    });
    
    const options = {
      hostname: 'api.z-api.io',
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const result = JSON.parse(data);
            console.log('Resposta enviada com sucesso');
            resolve(result);
          } catch (error) {
            reject(new Error('Erro ao parsear resposta JSON'));
          }
        } else {
          reject(new Error(`Erro HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Erro na requisição:', error.message);
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

// Executar
replyToMessage('5511999999999', '3EB0C767F26A', 'Esta é uma resposta à mensagem original')
  .then((result) => console.log('Sucesso:', result))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="nodejs-express" label="Node.js (Express)">

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId é obrigatório');
  }
  return messageId.trim();
}

// Validar mensagem
function validateMessage(message) {
  if (!message || typeof message !== 'string' || message.trim() === '') {
    throw new Error('message é obrigatório');
  }
  if (message.length > 4096) {
    throw new Error('message excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Rota para responder mensagem
app.post('/api/reply-message', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, messageId, message } = req.body;
    const validatedPhone = validatePhone(phone);
    const validatedMessageId = validateMessageId(messageId);
    const validatedMessage = validateMessage(message);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/reply-message`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      messageId: validatedMessageId,
      message: validatedMessage,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      timeout: 30000,
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error('Erro ao responder mensagem:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao responder mensagem',
    });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

</TabItem>
<TabItem value="nodejs-koa" label="Node.js (Koa)">

```javascript
const Koa = require('koa');
const axios = require('axios');
const app = new Koa();

app.use(require('koa-bodyparser')());

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar messageId
function validateMessageId(messageId) {
  if (!messageId || typeof messageId !== 'string' || messageId.trim() === '') {
    throw new Error('messageId é obrigatório');
  }
  return messageId.trim();
}

// Validar mensagem
function validateMessage(message) {
  if (!message || typeof message !== 'string' || message.trim() === '') {
    throw new Error('message é obrigatório');
  }
  if (message.length > 4096) {
    throw new Error('message excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Middleware para responder mensagem
app.use(async (ctx) => {
  if (ctx.path === '/api/reply-message' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, messageId, message } = ctx.request.body;
      const validatedPhone = validatePhone(phone);
      const validatedMessageId = validateMessageId(messageId);
      const validatedMessage = validateMessage(message);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/reply-message`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        messageId: validatedMessageId,
        message: validatedMessage,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Client-Token': clientToken,
        },
        timeout: 30000,
      });

      ctx.body = {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Erro ao responder mensagem:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao responder mensagem',
      };
    }
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import org.json.JSONObject;

public class ReplyMessage {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validar telefone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    // Validar messageId
    private static String validateMessageId(String messageId) {
        if (messageId == null || messageId.trim().isEmpty()) {
            throw new IllegalArgumentException("messageId é obrigatório");
        }
        return messageId.trim();
    }

    // Validar mensagem
    private static String validateMessage(String message) {
        if (message == null || message.trim().isEmpty()) {
            throw new IllegalArgumentException("message é obrigatório");
        }
        if (message.length() > 4096) {
            throw new IllegalArgumentException("message excede o limite de 4096 caracteres");
        }
        return message.trim();
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validatePhone("5511999999999");
            String messageId = validateMessageId("3EB0C767F26A");
            String message = validateMessage("Esta é uma resposta à mensagem original");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/reply-message",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8)
            );
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("messageId", messageId);
            payload.put("message", message);
            
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Client-Token", CLIENT_TOKEN);
            connection.setDoOutput(true);
            connection.setConnectTimeout(30000);
            connection.setReadTimeout(30000);

            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = payload.toString().getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            int responseCode = connection.getResponseCode();
            
            if (responseCode >= 200 && responseCode < 300) {
                BufferedReader reader = new BufferedReader(
                    new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8)
                );
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();
                
                System.out.println("Resposta enviada com sucesso");
                System.out.println(response.toString());
            } else {
                System.err.println("Erro HTTP " + responseCode);
            }
            
            connection.disconnect();
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
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.RegularExpressions;

class Program
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCIA";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "seu-token-de-seguranca";

    // Validar telefone
    private static string ValidatePhone(string phone)
    {
        if (!Regex.IsMatch(phone, @"^\d{10,15}$"))
        {
            throw new ArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    // Validar messageId
    private static string ValidateMessageId(string messageId)
    {
        if (string.IsNullOrWhiteSpace(messageId))
        {
            throw new ArgumentException("messageId é obrigatório");
        }
        return messageId.Trim();
    }

    // Validar mensagem
    private static string ValidateMessage(string message)
    {
        if (string.IsNullOrWhiteSpace(message))
        {
            throw new ArgumentException("message é obrigatório");
        }
        if (message.Length > 4096)
        {
            throw new ArgumentException("message excede o limite de 4096 caracteres");
        }
        return message.Trim();
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidatePhone("5511999999999");
            string messageId = ValidateMessageId("3EB0C767F26A");
            string message = ValidateMessage("Esta é uma resposta à mensagem original");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/reply-message";
            
            var payload = new
            {
                phone = phone,
                messageId = messageId,
                message = message
            };

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);
                client.Timeout = TimeSpan.FromSeconds(30);

                var json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, content);
                
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("Resposta enviada com sucesso");
                    Console.WriteLine(result);
                }
                else
                {
                    Console.WriteLine($"Erro HTTP {(int)response.StatusCode}");
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
    "io"
    "net/http"
    "os"
    "regexp"
    "strings"
    "time"
)

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
var (
    instanceId  = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA")
    clientToken = getEnv("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca")
)

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

func validatePhone(phone string) error {
    matched, _ := regexp.MatchString(`^\d{10,15}$`, phone)
    if !matched {
        return fmt.Errorf("telefone inválido. Use apenas números")
    }
    return nil
}

func validateMessageId(messageId string) error {
    if strings.TrimSpace(messageId) == "" {
        return fmt.Errorf("messageId é obrigatório")
    }
    return nil
}

func validateMessage(message string) error {
    if strings.TrimSpace(message) == "" {
        return fmt.Errorf("message é obrigatório")
    }
    if len(message) > 4096 {
        return fmt.Errorf("message excede o limite de 4096 caracteres")
    }
    return nil
}

func main() {
    // ⚠️ VALIDAÇÃO
    phone := "5511999999999"
    messageId := "3EB0C767F26A"
    message := "Esta é uma resposta à mensagem original"
    
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }
    
    if err := validateMessageId(messageId); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }
    
    if err := validateMessage(message); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/reply-message", instanceId)
    
    payload := map[string]interface{}{
        "phone": phone,
        "messageId": messageId,
        "message": message,
    }
    
    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Erro ao serializar JSON: %v\n", err)
        return
    }
    
    client := &http.Client{
        Timeout: 30 * time.Second,
    }
    
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Printf("Erro ao criar requisição: %v\n", err)
        return
    }
    
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)
    
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro na requisição: %v\n", err)
        return
    }
    defer resp.Body.Close()
    
    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        body, err := io.ReadAll(resp.Body)
        if err != nil {
            fmt.Printf("Erro ao ler resposta: %v\n", err)
            return
        }
        
        fmt.Println("Resposta enviada com sucesso")
        fmt.Println(string(body))
    } else {
        fmt.Printf("Erro HTTP %d\n", resp.StatusCode)
    }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCIA';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'seu-token-de-seguranca';

// Validar telefone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Telefone inválido. Use apenas números');
    }
    return $phone;
}

// Validar messageId
function validateMessageId($messageId) {
    if (empty($messageId) || !is_string($messageId) || trim($messageId) === '') {
        throw new Exception('messageId é obrigatório');
    }
    return trim($messageId);
}

// Validar mensagem
function validateMessage($message) {
    if (empty($message) || !is_string($message) || trim($message) === '') {
        throw new Exception('message é obrigatório');
    }
    if (strlen($message) > 4096) {
        throw new Exception('message excede o limite de 4096 caracteres');
    }
    return trim($message);
}

try {
    // ⚠️ VALIDAÇÃO
    $phone = validatePhone('5511999999999');
    $messageId = validateMessageId('3EB0C767F26A');
    $message = validateMessage('Esta é uma resposta à mensagem original');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/reply-message',
        urlencode($instanceId)
    );

    $payload = [
        'phone' => $phone,
        'messageId' => $messageId,
        'message' => $message,
    ];

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Client-Token: ' . $clientToken,
        ],
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        error_log("Erro cURL: " . $error);
        echo "Erro na requisição\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Resposta enviada com sucesso\n";
        echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
    } else {
        echo "Erro HTTP $httpCode\n";
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
require 'uri'
require 'json'

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCIA'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'seu-token-de-seguranca'

# Validar telefone
def validate_phone(phone)
  raise 'Telefone inválido. Use apenas números' unless phone.match?(/^\d{10,15}$/)
  phone
end

# Validar messageId
def validate_message_id(message_id)
  raise 'messageId é obrigatório' if message_id.nil? || message_id.to_s.strip.empty?
  message_id.to_s.strip
end

# Validar mensagem
def validate_message(message)
  raise 'message é obrigatório' if message.nil? || message.to_s.strip.empty?
  if message.length > 4096
    raise 'message excede o limite de 4096 caracteres'
  end
  message.to_s.strip
end

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_phone('5511999999999')
  message_id = validate_message_id('3EB0C767F26A')
  message = validate_message('Esta é uma resposta à mensagem original')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/reply-message")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    messageId: message_id,
    message: message
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Resposta enviada com sucesso'
    puts result.to_json
  else
    puts "Erro HTTP #{response.code}"
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
let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCIA"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "seu-token-de-seguranca"

// Validar telefone
func validatePhone(_ phone: String) throws -> String {
    let phoneRegex = "^\\d{10,15}$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", phoneRegex)
    if !predicate.evaluate(with: phone) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Telefone inválido. Use apenas números"])
    }
    return phone
}

// Validar messageId
func validateMessageId(_ messageId: String) throws -> String {
    if messageId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "messageId é obrigatório"])
    }
    return messageId.trimmingCharacters(in: .whitespacesAndNewlines)
}

// Validar mensagem
func validateMessage(_ message: String) throws -> String {
    if message.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "message é obrigatório"])
    }
    if message.count > 4096 {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "message excede o limite de 4096 caracteres"])
    }
    return message.trimmingCharacters(in: .whitespacesAndNewlines)
}

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validatePhone("5511999999999")
    let messageId = try validateMessageId("3EB0C767F26A")
    let message = try validateMessage("Esta é uma resposta à mensagem original")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/reply-message"
    
    guard let url = URL(string: urlString) else {
        print("URL inválida")
        exit(1)
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30

    let payload: [String: Any] = [
        "phone": phone,
        "messageId": messageId,
        "message": message
    ]
    
    request.httpBody = try? JSONSerialization.data(withJSONObject: payload)

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Erro: \(error.localizedDescription)")
            return
        }
        
        guard let httpResponse = response as? HTTPURLResponse else {
            print("Resposta inválida")
            return
        }
        
        if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
            if let data = data {
                do {
                    if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                        print("Resposta enviada com sucesso")
                        print(result)
                    }
                } catch {
                    print("Erro ao parsear JSON: \(error.localizedDescription)")
                }
            }
        } else {
            print("Erro HTTP \(httpResponse.statusCode)")
        }
    }

    task.resume()
    RunLoop.main.run()
} catch {
    print("Erro: \(error.localizedDescription)")
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCIA" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# Validar telefone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Telefone inválido. Use apenas números"
    }
    return $Phone
}

# Validar messageId
function Validate-MessageId {
    param([string]$MessageId)
    if ([string]::IsNullOrWhiteSpace($MessageId)) {
        throw "messageId é obrigatório"
    }
    return $MessageId.Trim()
}

# Validar mensagem
function Validate-Message {
    param([string]$Message)
    if ([string]::IsNullOrWhiteSpace($Message)) {
        throw "message é obrigatório"
    }
    if ($Message.Length -gt 4096) {
        throw "message excede o limite de 4096 caracteres"
    }
    return $Message.Trim()
}

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-Phone "5511999999999"
    $messageId = Validate-MessageId "3EB0C767F26A"
    $message = Validate-Message "Esta é uma resposta à mensagem original"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/reply-message"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        messageId = $messageId
        message = $message
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Resposta enviada com sucesso"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Erro: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/reply-message HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "messageId": "3EB0C767F26A",
  "message": "Esta é uma resposta à mensagem original"
}
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <curl/curl.h>
#include <cstdlib>
#include <regex>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnvVar(const std::string& key, const std::string& defaultValue) {
    const char* val = std::getenv(key.c_str());
    return val ? std::string(val) : defaultValue;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

bool validatePhone(const std::string& phone) {
    std::regex phoneRegex("^\\d{10,15}$");
    return std::regex_match(phone, phoneRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    std::string phone = "5511999999999";
    std::string messageId = "3EB0C767F26A";
    std::string message = "Esta é uma resposta à mensagem original";
    
    // ⚠️ VALIDAÇÃO
    if (!validatePhone(phone)) {
        std::cerr << "Erro: Telefone inválido" << std::endl;
        return 1;
    }
    
    if (messageId.empty()) {
        std::cerr << "Erro: messageId é obrigatório" << std::endl;
        return 1;
    }
    
    if (message.empty()) {
        std::cerr << "Erro: message é obrigatório" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/reply-message";
    
    // Criar payload JSON (escapar caracteres especiais)
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"messageId\":\"" << messageId << "\","
                  << "\"message\":\"" << message << "\""
                  << "}";
    std::string payload = payloadStream.str();
    
    CURL* curl = curl_easy_init();
    if (curl) {
        std::string responseData;
        
        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        std::string tokenHeader = "Client-Token: " + clientToken;
        headers = curl_slist_append(headers, tokenHeader.c_str());
        
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        
        CURLcode res = curl_easy_perform(curl);
        
        if (res == CURLE_OK) {
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);
            
            if (responseCode >= 200 && responseCode < 300) {
                std::cout << "Resposta enviada com sucesso" << std::endl;
                std::cout << responseData << std::endl;
            } else {
                std::cout << "Erro HTTP " << responseCode << std::endl;
            }
        } else {
            std::cerr << "Erro cURL: " << curl_easy_strerror(res) << std::endl;
        }
        
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }
    
    return 0;
}
```

</TabItem>
<TabItem value="c" label="C">

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>
#include <regex.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
char* getEnvVar(const char* key, const char* defaultValue) {
    char* val = getenv(key);
    return val ? val : (char*)defaultValue;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, char* data) {
    size_t totalSize = size * nmemb;
    memcpy(data, contents, totalSize);
    data[totalSize] = '\0';
    return totalSize;
}

int validatePhone(const char* phone) {
    regex_t regex;
    int ret = regcomp(&regex, "^[0-9]{10,15}$", REG_EXTENDED);
    if (ret) return 0;
    ret = regexec(&regex, phone, 0, NULL, 0);
    regfree(&regex);
    return ret == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    char* phone = "5511999999999";
    char* messageId = "3EB0C767F26A";
    char* message = "Esta é uma resposta à mensagem original";
    
    // ⚠️ VALIDAÇÃO
    if (!validatePhone(phone)) {
        fprintf(stderr, "Erro: Telefone inválido\n");
        return 1;
    }
    
    if (!messageId || strlen(messageId) == 0) {
        fprintf(stderr, "Erro: messageId é obrigatório\n");
        return 1;
    }
    
    if (!message || strlen(message) == 0) {
        fprintf(stderr, "Erro: message é obrigatório\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/reply-message", instanceId);
    
    char payload[1024];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"messageId\":\"%s\",\"message\":\"%s\"}",
        phone, messageId, message);
    
    CURL* curl = curl_easy_init();
    if (curl) {
        char responseData[4096] = {0};
        
        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        char tokenHeader[256];
        snprintf(tokenHeader, sizeof(tokenHeader), "Client-Token: %s", clientToken);
        headers = curl_slist_append(headers, tokenHeader);
        
        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, responseData);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        
        CURLcode res = curl_easy_perform(curl);
        
        if (res == CURLE_OK) {
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);
            
            if (responseCode >= 200 && responseCode < 300) {
                printf("Resposta enviada com sucesso\n");
                printf("%s\n", responseData);
            } else {
                printf("Erro HTTP %ld\n", responseCode);
            }
        } else {
            fprintf(stderr, "Erro cURL: %s\n", curl_easy_strerror(res));
        }
        
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }
    
    return 0;
}
```

</TabItem>
</Tabs>

## <Icon name="Info" size="md" /> How It Works {#como-funciona}

When you respond to a message:

1. **Threaded Reply** - The reply appears linked to the original message
2. **Original Message Preview** - WhatsApp shows a preview of the original message above your reply
3. **Context Maintained** - This helps maintain the conversation context, especially in groups

:::tip Good Practice

Use threaded replies to maintain context in long conversations or in groups, making it easier to understand which message you are replying to.

:::

## <Icon name="AlertTriangle" size="md" /> Limitations {#limitacoes}

- You can only respond to messages that you received or sent
- Deleted messages cannot be responded to
- The `messageId` must be valid and accessible

## <Icon name="Info" size="md" /> Important Notes {#notas-importantes}

- The response appears as a threaded reply in WhatsApp, showing a preview of the original message
- Use the `messageId` from messages received via webhooks or listed in chats
- The `phone` must be the original sender's phone number
- Responses help maintain the conversation context on WhatsApp
- You can respond to any type of message (text, media, etc.)

## <Icon name="ArrowRight" size="md" /> Next Steps {#proximos-passos}

- [Sending Simple Text](/docs/messages/texto-simples) - Send text messages
- [Forwarding a Message](/docs/messages/reencaminhar) - Share received messages
- [Adding Reaction](/docs/messages/reacao) - Add emoji reactions to messages