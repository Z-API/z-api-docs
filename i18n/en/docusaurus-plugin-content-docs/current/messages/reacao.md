---
id: reacao
sidebar_position: 4
title: Add reaction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Heart" size="lg" /> Add Reaction

Add an emoji reaction to an existing message using the Z-API. Reactions allow you to respond quickly to messages with emojis.

In this method, you can send reactions to messages sent or received. You need to provide the chat phone number, an emoji, and the message that will be reacted to.

![Example of Reaction](/img/send-message-reaction.jpeg)

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{instanceId}/token/{token}/send-reaction
```

### Headers {#headers}

| Header | Type | Required | Description |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Yes | Authentication token |
| Content-Type | string | Yes | Should be `application/json` |

### Request Body {#request-body}

```json
{
  "phone": "5511999999999",
  "reaction": "❤️",
  "messageId": "3EB0C767F26A"
}
```

**Example with optional delay:**

```json
{
  "phone": "5511999999999",
  "reaction": "❤️",
  "messageId": "3EB0C767F26A",
  "delayMessage": 5
}
```

### Parameters {#parameters}

#### Required Parameters

| Field | Type | Required | Description |
|-----------|--------|-------------|--------------------------------------------------|
| `phone` | string | Yes | Recipient's phone number (or group ID for sending to groups) in DDI DDD NUMBER format. **IMPORTANT:** Send only numbers, without formatting or mask |
| `reaction` | string | Yes | Reaction emoji. See options of emojis in this [link](https://fsymbols.com/pt/emoji/) |
| `messageId` | string | Yes | ID of the message that will receive the reaction |

#### Optional Parameters

| Field | Type | Description |
|----------|------|-----------|
| `delayMessage` | number | This attribute adds a delay in the message. You can decide between a range of 1\~15 sec, meaning how many seconds it will wait to send the next message. (Ex "delayMessage": 5, ). The default delay if not informed is 1\~3 sec |

## <Icon name="Smile" size="md" /> Available Reactions {#available-reactions}

You can use any emoji as a reaction. The most common include:

| Emoji | Name | Common Use |
|-------|------|-----------|
| 👍 | Thumbs up | Approval, agreement |
| ❤️ | Heart | Liked, love |
| 😂 | Laugh | Funny, humorous |
| 😮 | Surprise | Surprise, amazement |
| 😢 | Sad | Sadness, empathy |
| 🙏 | Prayer | Gratitude, respect |

:::tip Tip

You can use any Unicode emoji as a reaction. Explore different emojis to express your reactions more precisely. See options of emojis in this [link](https://fsymbols.com/pt/emoji/).

:::

## <Icon name="Wand2" size="md" /> For No-Code Users {#for-no-code-users}

In your automation tool (n8n, Make, Zapier), you will fill in the following fields:

### Required Fields

1. **`phone`**: The chat number where the message is located. Use the full format: DDI + DDD + Number (ex: `5511999999999`). **Important:** Use only numbers, without formatting or mask. For groups, use the group ID.

2. **`reaction`**: The emoji you want to use as a reaction (ex: `"👍"`, `"❤️"`, `"😂"`). You can use any Unicode emoji. See options of emojis in this [link](https://fsymbols.com/pt/emoji/).

3. **`messageId`**: The ID of the message that will receive the reaction. This is the `messageId` of the original message you want to react to. You can get the `messageId` through webhooks when a message is received or sent.

### Optional Fields

4. **`delayMessage`**: Delay in seconds (1-15 seconds) before sending the reaction. If not informed, the default delay is 1-3 seconds.

### Practical Example for No-Code

```json
{
  "phone": "5511999999999",
  "reaction": "❤️",
  "messageId": "3EB0C767F26A"
}
```

**Important Tips:**

- **Get messageId**: The `messageId` can be obtained through webhooks when a message is received or sent. Save this ID if you want to react to a message later.
- **Valid Emojis**: Use valid Unicode emojis. You can copy emojis from sites like [fsymbols.com](https://fsymbols.com/pt/emoji/) or use emojis directly from your keyboard.
- **Reactions in Groups**: You can react to messages in groups using the group ID in the `phone` field.
- **Optional Delay**: Use `delayMessage` if you want to add a delay before sending the reaction (useful for simulating human behavior).

**Common Use Cases:**

- **Quick Feedback**: React to customer messages with 👍 to confirm receipt
- **Approval**: Use ❤️ to show that you liked something
- **Empathy**: Use 😢 or 🙏 to express empathy in difficult situations
- **Humor**: Use 😂 to react to funny messages
- **Automated Customer Service**: Automatically react to received messages to confirm they were read

## <Icon name="CheckCircle" size="md" /> Responses {#responses}

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
| `zaapId` | string | Unique ID of the message in Z-API system (for internal tracking) |
| `messageId` | string | Unique ID of the message in WhatsApp. **Save this ID!** Use it to track delivery status through webhooks |
| `id` | string | Compatibility ID with Zapier and legacy systems. Has the same value as `messageId` |

**Important:**

- The `messageId` is the primary ID you should use to track the message
- The `zaapId` is used internally by Z-API for processing
- The `id` exists only for compatibility with legacy integrations (like Zapier)

**Delivery Tracking:**

To know when the reaction was applied or if there was an error, configure a webhook and monitor events. See more about [message received webhooks](../webhooks/ao-receber#example-of-reaction-response).

### Common Errors {#common-errors}

| Code | Reason | How to Solve |
|--------|-----------------------|----------------------------------------------------|
| 400 | Invalid parameters | Check `phone`, `messageId` and `reaction` |
| 401 | Invalid token | Check header `Client-Token` |
| 404 | Message not found | Verify if the `messageId` exists and is valid |
| 429 | Rate limit | Wait and try again |
| 5xx | Internal error | Try again; open support if persists |

## <Icon name="Code" size="md" /> Examples {#examples}

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

// Validar reação (emoji)
function validateReaction(reaction) {
  if (!reaction || typeof reaction !== 'string' || reaction.trim() === '') {
    throw new Error('reaction é obrigatório e deve ser um emoji válido');
  }
  return reaction.trim();
}

// Adicionar reação
async function addReaction(phone, messageId, reaction) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    const validatedMessageId = validateMessageId(messageId);
    const validatedReaction = validateReaction(reaction);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/reaction`;
    
    const payload = {
      phone: validatedPhone,
      messageId: validatedMessageId,
      reaction: validatedReaction,
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
    if (data.value) {
      console.log('Reação adicionada com sucesso');
      return data;
    } else {
      throw new Error(data.message || 'Erro ao adicionar reação');
    }
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao adicionar reação:', error.message);
    throw error;
  }
}

// Exemplo de uso
addReaction('5511999999999', '3EB0C767F26A', '👍');
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interfaces
interface AddReactionResponse {
  value: boolean;
  message: string;
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

// Validar reação
function validateReaction(reaction: string): string {
  if (!reaction || reaction.trim() === '') {
    throw new Error('reaction é obrigatório');
  }
  return reaction.trim();
}

// Função para adicionar reação
async function addReaction(
  phone: string,
  messageId: string,
  reaction: string
): Promise<AddReactionResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);
  const validatedMessageId = validateMessageId(messageId);
  const validatedReaction = validateReaction(reaction);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/reaction`;

  const payload = {
    phone: validatedPhone,
    messageId: validatedMessageId,
    reaction: validatedReaction,
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

  const data = await response.json();
  if (!data.value) {
    throw new Error(data.message || 'Erro ao adicionar reação');
  }

  return data;
}

// Executar
addReaction('5511999999999', '3EB0C767F26A', '👍')
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

def validate_reaction(reaction: str) -> str:
    """Valida reação (emoji)"""
    if not reaction or not isinstance(reaction, str) or not reaction.strip():
        raise ValueError('reaction é obrigatório e deve ser um emoji válido')
    return reaction.strip()

def add_reaction(phone: str, message_id: str, reaction: str) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    validated_message_id = validate_message_id(message_id)
    validated_reaction = validate_reaction(reaction)
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/reaction"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "messageId": validated_message_id,
        "reaction": validated_reaction
    }
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        if result.get('value'):
            print('Reação adicionada com sucesso')
            return result
        else:
            raise ValueError(result.get('message', 'Erro ao adicionar reação'))
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
add_reaction('5511999999999', '3EB0C767F26A', '👍')
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

# ⚠️ VALIDAÇÃO: Validar reação
REACTION="${3:-👍}"
if [ -z "$REACTION" ] || [ "$REACTION" = "" ]; then
    echo "Erro: reaction é obrigatório e deve ser um emoji válido"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Adicionar reação via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/reaction" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"messageId\": \"${MESSAGE_ID}\",
    \"reaction\": \"${REACTION}\"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID CLIENT_TOKEN PHONE MESSAGE_ID REACTION
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

// Validar reação
function validateReaction(reaction) {
  if (!reaction || typeof reaction !== 'string' || reaction.trim() === '') {
    throw new Error('reaction é obrigatório');
  }
  return reaction.trim();
}

// Adicionar reação
function addReaction(phone, messageId, reaction) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
      const validatedMessageId = validateMessageId(messageId);
      const validatedReaction = validateReaction(reaction);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/reaction`;
    const payload = JSON.stringify({
      phone: phone,
      messageId: messageId,
      reaction: reaction,
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
            if (result.value) {
              console.log('Reação adicionada com sucesso');
              resolve(result);
            } else {
              reject(new Error(result.message || 'Erro ao adicionar reação'));
            }
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
addReaction('5511999999999', '3EB0C767F26A', '👍')
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

// Validar reação
function validateReaction(reaction) {
  if (!reaction || typeof reaction !== 'string' || reaction.trim() === '') {
    throw new Error('reaction é obrigatório');
  }
  return reaction.trim();
}

// Rota para adicionar reação
app.post('/api/reaction', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, messageId, reaction } = req.body;
    const validatedPhone = validatePhone(phone);
    const validatedMessageId = validateMessageId(messageId);
    const validatedReaction = validateReaction(reaction);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/reaction`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      messageId: validatedMessageId,
      reaction: validatedReaction,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      timeout: 30000,
    });

    if (response.data.value) {
      res.json({
        success: true,
        data: response.data,
      });
    } else {
      res.status(400).json({
        success: false,
        error: response.data.message || 'Erro ao adicionar reação',
      });
    }
  } catch (error) {
    console.error('Erro ao adicionar reação:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao adicionar reação',
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

// Validar reação
function validateReaction(reaction) {
  if (!reaction || typeof reaction !== 'string' || reaction.trim() === '') {
    throw new Error('reaction é obrigatório');
  }
  return reaction.trim();
}

// Middleware para adicionar reação
app.use(async (ctx) => {
  if (ctx.path === '/api/reaction' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, messageId, reaction } = ctx.request.body;
      const validatedPhone = validatePhone(phone);
      const validatedMessageId = validateMessageId(messageId);
      const validatedReaction = validateReaction(reaction);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/reaction`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        messageId: validatedMessageId,
        reaction: validatedReaction,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Client-Token': clientToken,
        },
        timeout: 30000,
      });

      if (response.data.value) {
        ctx.body = {
          success: true,
          data: response.data,
        };
      } else {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: response.data.message || 'Erro ao adicionar reação',
        };
      }
    } catch (error) {
      console.error('Erro ao adicionar reação:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao adicionar reação',
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

public class AddReaction {
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

    // Validar reação
    private static String validateReaction(String reaction) {
        if (reaction == null || reaction.trim().isEmpty()) {
            throw new IllegalArgumentException("reaction é obrigatório");
        }
        return reaction.trim();
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validatePhone("5511999999999");
            String messageId = validateMessageId("3EB0C767F26A");
            String reaction = validateReaction("👍");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/reaction",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8)
            );
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("messageId", messageId);
            payload.put("reaction", reaction);
            
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
                
                JSONObject result = new JSONObject(response.toString());
                if (result.getBoolean("value")) {
                    System.out.println("Reação adicionada com sucesso");
                    System.out.println(result.toString());
                } else {
                    System.err.println("Erro: " + result.getString("message"));
                }
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

    // Validar reação
    private static string ValidateReaction(string reaction)
    {
        if (string.IsNullOrWhiteSpace(reaction))
        {
            throw new ArgumentException("reaction é obrigatório");
        }
        return reaction.Trim();
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidatePhone("5511999999999");
            string messageId = ValidateMessageId("3EB0C767F26A");
            string reaction = ValidateReaction("👍");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/reaction";
            
            var payload = new
            {
                phone = phone,
                messageId = messageId,
                reaction = reaction
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
                    var jsonDoc = JsonDocument.Parse(result);
                    var root = jsonDoc.RootElement;
                    
                    if (root.GetProperty("value").GetBoolean())
                    {
                        Console.WriteLine("Reação adicionada com sucesso");
                        Console.WriteLine(result);
                    }
                    else
                    {
                        Console.WriteLine($"Erro: {root.GetProperty("message").GetString()}");
                    }
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

func validateReaction(reaction string) error {
    if strings.TrimSpace(reaction) == "" {
        return fmt.Errorf("reaction é obrigatório")
    }
    return nil
}

func main() {
    // ⚠️ VALIDAÇÃO
    phone := "5511999999999"
    messageId := "3EB0C767F26A"
    reaction := "👍"
    
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }
    
    if err := validateMessageId(messageId); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }
    
    if err := validateReaction(reaction); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/reaction", instanceId)
    
    payload := map[string]interface{}{
        "phone": phone,
        "messageId": messageId,
        "reaction": reaction,
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
        
        var result map[string]interface{}
        if err := json.Unmarshal(body, &result); err != nil {
            fmt.Printf("Erro ao parsear JSON: %v\n", err)
            return
        }
        
        if value, ok := result["value"].(bool); ok && value {
            fmt.Println("Reação adicionada com sucesso")
            fmt.Println(string(body))
        } else {
            fmt.Printf("Erro: %v\n", result["message"])
        }
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

// Validar reação
function validateReaction($reaction) {
    if (empty($reaction) || !is_string($reaction) || trim($reaction) === '') {
        throw new Exception('reaction é obrigatório');
    }
    return trim($reaction);
}

try {
    // ⚠️ VALIDAÇÃO
    $phone = validatePhone('5511999999999');
    $messageId = validateMessageId('3EB0C767F26A');
    $reaction = validateReaction('👍');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/reaction',
        urlencode($instanceId)
    );

    $payload = [
        'phone' => $phone,
        'messageId' => $messageId,
        'reaction' => $reaction,
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
        if ($result && isset($result['value']) && $result['value']) {
            echo "Reação adicionada com sucesso\n";
            echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
        } else {
            echo "Erro: " . ($result['message'] ?? 'Erro ao adicionar reação') . "\n";
        }
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

# Validar reação
def validate_reaction(reaction)
  raise 'reaction é obrigatório' if reaction.nil? || reaction.to_s.strip.empty?
  reaction.to_s.strip
end

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_phone('5511999999999')
  message_id = validate_message_id('3EB0C767F26A')
  reaction = validate_reaction('👍')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/reaction")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    messageId: message_id,
    reaction: reaction
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    if result['value']
      puts 'Reação adicionada com sucesso'
      puts result.to_json
    else
      puts "Erro: #{result['message']}"
    end
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

// Validar reação
func validateReaction(_ reaction: String) throws -> String {
    if reaction.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "reaction é obrigatório"])
    }
    return reaction.trimmingCharacters(in: .whitespacesAndNewlines)
}

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validatePhone("5511999999999")
    let messageId = try validateMessageId("3EB0C767F26A")
    let reaction = try validateReaction("👍")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/reaction"
    
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
        "reaction": reaction
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
                    if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                       let value = result["value"] as? Bool, value {
                        print("Reação adicionada com sucesso")
                        print(result)
                    } else if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                        print("Erro: \(result["message"] as? String ?? "Erro ao adicionar reação")")
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

# Validar reação
function Validate-Reaction {
    param([string]$Reaction)
    if ([string]::IsNullOrWhiteSpace($Reaction)) {
        throw "reaction é obrigatório"
    }
    return $Reaction.Trim()
}

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-Phone "5511999999999"
    $messageId = Validate-MessageId "3EB0C767F26A"
    $reaction = Validate-Reaction "👍"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/reaction"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        messageId = $messageId
        reaction = $reaction
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    if ($response.value) {
        Write-Host "Reação adicionada com sucesso"
        $response | ConvertTo-Json -Depth 10
    } else {
        Write-Host "Erro: $($response.message)"
    }
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/reaction HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "messageId": "3EB0C767F26A",
  "reaction": "👍"
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
    std::string reaction = "👍";
    
    // ⚠️ VALIDAÇÃO
    if (!validatePhone(phone)) {
        std::cerr << "Erro: Telefone inválido" << std::endl;
        return 1;
    }
    
    if (messageId.empty()) {
        std::cerr << "Erro: messageId é obrigatório" << std::endl;
        return 1;
    }
    
    if (reaction.empty()) {
        std::cerr << "Erro: reaction é obrigatório" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/reaction";
    
    // Criar payload JSON (escapar caracteres especiais)
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"messageId\":\"" << messageId << "\","
                  << "\"reaction\":\"" << reaction << "\""
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
                std::cout << "Reação adicionada com sucesso" << std::endl;
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
    char* reaction = "👍";
    
    // ⚠️ VALIDAÇÃO
    if (!validatePhone(phone)) {
        fprintf(stderr, "Erro: Telefone inválido\n");
        return 1;
    }
    
    if (!messageId || strlen(messageId) == 0) {
        fprintf(stderr, "Erro: messageId é obrigatório\n");
        return 1;
    }
    
    if (!reaction || strlen(reaction) == 0) {
        fprintf(stderr, "Erro: reaction é obrigatório\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/reaction", instanceId);
    
    char payload[512];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"messageId\":\"%s\",\"reaction\":\"%s\"}",
        phone, messageId, reaction);
    
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
                printf("Reação adicionada com sucesso\n");
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

## <Icon name="AlertTriangle" size="md" /> Limitations {#limitations}

- You can only add one reaction per message
- If you have already reacted, adding a new reaction replaces the previous one
- The original message must exist and be accessible

:::info Behavior

- Use the `messageId` of the message you want to react to
- The `phone` should be the sender's phone number of the original message
- Reactions appear below the message in WhatsApp
- You can remove a reaction using the [remove reaction](/docs/messages/remover-reacao) endpoint

:::

## <Icon name="Info" size="md" /> Important Notes {#important-notes}

- Reactions are a quick and visual way to respond to messages
- Use appropriate emojis for the context of the message
- Reactions appear in real-time for the original sender of the message

## <Icon name="ArrowRight" size="md" /> Next Steps {#next-steps}

- [Remove Reaction](/docs/messages/remover-reacao) - Remove a reaction from a message
- [Reply Message](/docs/messages/responder) - Reply to messages with text
- [Forward Message](/docs/messages/reencaminhar) - Share received messages