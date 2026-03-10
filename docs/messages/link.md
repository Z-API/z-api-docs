---
id: link
title: Enviar link
sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Link" size="lg" /> Enviar link

Envie um link com preview personalizado para um destinatário usando a API do Z-API. Você pode controlar o título, descrição e imagem do preview do link, criando uma experiência mais rica e profissional.

**⚠️ Importante:** O link só fica clicável caso o destinatário já tenha seu telefone nos contatos, ou se o mesmo iniciar uma conversa com você.

![Exemplo de mensagem com link](/img/send-message-link.jpeg)

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-link
```

### Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Sim | Token de autenticação |
| Content-Type | string | Sim | Deve ser `application/json` |

### Corpo da requisição {#corpo-da-requisicao}

**Exemplo completo:**

```json
{
  "phone": "5511999998888",
  "message": "Aqui você coloca um texto sobre o site, atenção esse texto precisa ter o link que será enviado no final da mensagem! Assim: https://z-api.io",
  "image": "https://firebasestorage.googleapis.com/v0/b/zaap-messenger-web.appspot.com/o/logo.png?alt=media",
  "linkUrl": "https://z-api.io",
  "title": "Z-API",
  "linkDescription": "Integração com o whatsapp",
  "linkType": "LARGE"
}
```

### Parâmetros {#parametros}

#### Parâmetros Obrigatórios

| Campo | Tipo | Obrigatório | Descrição |
|--------------|---------|-------------|--------------------------------------------------|
| `phone` | string | Sim | Número do destinatário no formato DDI + DDD + NÚMERO. |
| `message` | string | Sim | Texto sobre seu link. **⚠️ IMPORTANTE:** Não esqueça de informar o mesmo valor do `linkUrl` no final deste texto. O link deve aparecer no texto para que fique clicável. |
| `image` | string | Sim | Link da imagem que aparecerá no preview do link. Deve ser uma URL pública acessível. |
| `linkUrl` | string | Sim | URL do seu link. Deve ser a mesma URL que aparece no final do texto da `message`. |
| `title` | string | Sim | Título para o link. Aparece no preview do link. |
| `linkDescription` | string | Sim | Descrição do link. Aparece no preview do link, abaixo do título. |

#### Parâmetros Opcionais

| Campo | Tipo | Obrigatório | Descrição |
|--------------|---------|-------------|--------------------------------------------------|
| `delayMessage` | number | Não | Controla o tempo de espera (em segundos) antes de enviar a próxima mensagem. Valores entre 1 e 15 segundos. Se não informado, o sistema usa um delay automático de 1 a 3 segundos. Útil ao enviar múltiplos links em sequência para evitar bloqueios. |
| `delayTyping` | number | Não | Controla o tempo que o status "Digitando..." ficará ativo (em segundos). Valores entre 1 e 15 segundos. Se não informado, o delay padrão é 0 (sem delay). Útil para simular digitação humana. |
| `linkType` | string | Não | Define o tamanho da mensagem de visualização do link enviado. Valores possíveis: `SMALL`, `MEDIUM` ou `LARGE`. O tamanho padrão caso não seja informado é `SMALL`. |

## <Icon name="Info" size="md" /> Como funciona {#como-funciona}

Quando você envia um link usando este método:

1. **Preview personalizado** - Você controla todos os elementos do preview:
   - **Título** (`title`): Título que aparece no preview
   - **Descrição** (`linkDescription`): Texto descritivo abaixo do título
   - **Imagem** (`image`): Imagem que aparece no preview
   - **URL** (`linkUrl`): Link que será aberto ao clicar

2. **Tamanho do preview** - Você pode escolher o tamanho:
   - **SMALL**: Preview pequeno (padrão)
   - **MEDIUM**: Preview médio
   - **LARGE**: Preview grande (mais destaque)

3. **Link clicável** - O link só fica clicável se:
   - O destinatário já tiver seu telefone nos contatos, OU
   - O destinatário iniciar uma conversa com você

**⚠️ Importante:** O texto da `message` **deve conter o mesmo link** que está em `linkUrl` no final da mensagem. Isso é necessário para que o link fique clicável.

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

1. **`phone`**: O número do contato que receberá o link. Use o formato completo: DDI + DDD + Número (ex: `5511999999999`).

2. **`message`**: O texto sobre o link. **⚠️ IMPORTANTE:** Este texto **deve terminar com o mesmo link** que você colocar em `linkUrl`. Por exemplo: `"Confira nosso site: https://exemplo.com"` (onde `linkUrl` também será `https://exemplo.com`).

3. **`image`**: A URL da imagem que aparecerá no preview. Deve ser uma URL pública acessível (ex: `https://exemplo.com/imagem.jpg`).

4. **`linkUrl`**: A URL do link que será aberto ao clicar. **Deve ser a mesma URL que aparece no final do texto da `message`**.

5. **`title`**: O título que aparecerá no preview do link (ex: `"Meu Site"`).

6. **`linkDescription`**: A descrição que aparecerá no preview, abaixo do título (ex: `"Confira nossos produtos e serviços"`).

### Campos Opcionais

7. **`delayMessage`**: Se você vai enviar vários links seguidos, use este campo para espaçar o envio (entre 1 e 15 segundos). Isso ajuda a evitar bloqueios.

8. **`delayTyping`**: Use este campo para simular digitação humana. Define quantos segundos o status "Digitando..." ficará ativo (entre 1 e 15 segundos).

9. **`linkType`**: Escolha o tamanho do preview:
   - `SMALL`: Preview pequeno (padrão)
   - `MEDIUM`: Preview médio
   - `LARGE`: Preview grande (mais destaque visual)

**Dica:** Na maioria dos casos, você só precisa preencher os campos obrigatórios. Os campos opcionais podem ser deixados em branco.

**Exemplo prático:**

- **message**: `"Confira nosso novo produto: https://exemplo.com/produto"`
- **linkUrl**: `https://exemplo.com/produto` (mesmo link do final da message)
- **title**: `"Novo Produto"`
- **linkDescription**: `"Descubra nosso lançamento"`
- **image**: `https://exemplo.com/imagem-produto.jpg`

## <Icon name="CheckCircle" size="md" /> Respostas {#respostas}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "3EB0C767F26A",
  "id": "3EB0C767F26A"
}
```

| Campo | Tipo | Descrição |
|-----------|--------|----------------------------------------------|
| `zaapId` | string | ID único da mensagem no sistema Z-API (para rastreamento interno) |
| `messageId` | string | ID único da mensagem no WhatsApp. **Guarde este ID!** Use-o para rastrear o status da entrega através dos webhooks |
| `id` | string | ID de compatibilidade com Zapier e sistemas legados. Tem o mesmo valor do `messageId` |

**Importante:**

- O `messageId` é o identificador principal que você deve usar para rastrear a mensagem
- O `zaapId` é usado internamente pelo Z-API para processamento
- O `id` existe apenas para compatibilidade com integrações legadas (como Zapier)

**Rastreamento de Entrega:**

Para saber quando a mensagem foi entregue, lida ou se houve algum erro, configure um webhook e monitore os eventos. Veja mais sobre [webhooks de mensagens recebidas](../webhooks/ao-receber).

### Erros comuns {#erros-comuns}

| Código | Motivo | Como resolver |
|--------|-----------------------|----------------------------------------------------|
| 400 | Parâmetros inválidos | Verifique `phone` e `message` |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |

## <Icon name="FileCode" size="md" /> Exemplos de Código

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
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
  message: sanitizeMessage('Confira este link interessante: https://exemplo.com'),
  linkPreview: true,
};

// Enviar requisição com tratamento seguro de erros
async function sendLinkMessage() {
  try {
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-link`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Erro desconhecido');
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Link enviado com sucesso. MessageId:', result.messageId);
    return result;
  } catch (error) {
    console.error('Erro ao enviar link:', error.message);
    throw error;
  }
}

// Executar função
sendLinkMessage();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
interface SendLinkRequest {
  phone: string;
  message: string;
  linkPreview?: boolean;
}

interface SendLinkResponse {
  messageId: string;
  status: string;
}

const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

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

const messageData: SendLinkRequest = {
  phone: validatePhoneNumber('5511999999999'),
  message: sanitizeMessage('Confira este link interessante: https://exemplo.com'),
  linkPreview: true,
};

async function sendLinkMessage(): Promise<SendLinkResponse> {
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-link`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(messageData),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

sendLinkMessage()
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

INSTANCE_ID = os.getenv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
CLIENT_TOKEN = os.getenv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

def validate_phone_number(phone: str) -> str:
    cleaned = re.sub(r'\D', '', phone)
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError("Número de telefone inválido. Use formato: DDI + DDD + Número")
    return cleaned

def sanitize_message(message: str) -> str:
    if not message or not message.strip():
        raise ValueError("Mensagem não pode estar vazia")
    if len(message) > 4096:
        raise ValueError("Mensagem excede limite de 4096 caracteres")
    return message.strip()

url = f"https://api.z-api.io/instances/{INSTANCE_ID}/send-link"

try:
    payload: Dict[str, Any] = {
        "phone": validate_phone_number("5511999999999"),
        "message": sanitize_message("Confira este link interessante: https://exemplo.com"),
        "linkPreview": True,
    }
except ValueError as e:
    print(f"Erro de validação: {e}")
    exit(1)

headers = {
    "Content-Type": "application/json",
    "Client-Token": CLIENT_TOKEN
}

try:
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    print(f"Link enviado. MessageId: {result.get('messageId')}")
    
except requests.exceptions.HTTPError as e:
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
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCE_ID}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-SEU_CLIENT_TOKEN}"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/send-link" \
  -H 'Content-Type: application/json' \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d '{
    "phone": "5511999999999",
    "message": "Confira este link interessante: https://exemplo.com",
    "linkPreview": true
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID CLIENT_TOKEN
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');
const { URL } = require('url');

const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

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

const messageData = {
  phone: validatePhoneNumber('5511999999999'),
  message: sanitizeMessage('Confira este link interessante: https://exemplo.com'),
  linkPreview: true,
};

const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-link`);
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
  timeout: 30000,
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const result = JSON.parse(data);
      console.log('Link enviado. MessageId:', result.messageId);
    } else {
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

const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

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

app.post('/send-link', async (req, res) => {
  try {
    const rawPhone = req.body.phone || '5511999999999';
    const rawMessage = req.body.message || 'Confira este link interessante: https://exemplo.com';
    const linkPreview = req.body.linkPreview !== undefined ? req.body.linkPreview : true;

    const messageData = {
      phone: validatePhoneNumber(rawPhone),
      message: sanitizeMessage(rawMessage),
      linkPreview: linkPreview,
    };

    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-link`);
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
      timeout: 30000,
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
              resolve({ success: true, messageId: parsed.messageId });
            } catch (error) {
              reject(new Error('Erro ao processar resposta'));
            }
          } else {
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
    console.error('Erro ao enviar link:', error.message);
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

const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

app.use(require('koa-bodyparser')());

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

router.post('/send-link', async (ctx) => {
  try {
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const rawMessage = ctx.request.body.message || 'Confira este link interessante: https://exemplo.com';
    const linkPreview = ctx.request.body.linkPreview !== undefined ? ctx.request.body.linkPreview : true;

    const messageData = {
      phone: validatePhoneNumber(rawPhone),
      message: sanitizeMessage(rawMessage),
      linkPreview: linkPreview,
    };

    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-link`);
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
      timeout: 30000,
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
              resolve({ success: true, messageId: parsed.messageId });
            } catch (error) {
              reject(new Error('Erro ao processar resposta'));
            }
          } else {
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
    ctx.app.emit('error', error, ctx);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
  console.error('Erro ao enviar link:', err.message);
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

public class SendLink {
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCE_ID";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";

    private static String validatePhoneNumber(String phone) {
        String cleaned = phone.replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("Número de telefone inválido");
        }
        return cleaned;
    }

    private static String sanitizeMessage(String message) {
        if (message == null || message.trim().isEmpty()) {
            throw new IllegalArgumentException("Mensagem não pode estar vazia");
        }
        String trimmed = message.trim();
        if (trimmed.length() > 4096) {
            throw new IllegalArgumentException("Mensagem excede limite de 4096 caracteres");
        }
        return trimmed;
    }

    public static void main(String[] args) {
        try {
            String phone = validatePhoneNumber("5511999999999");
            String message = sanitizeMessage("Confira este link interessante: https://exemplo.com");
            boolean linkPreview = true;

            String urlString = "https://api.z-api.io/instances/" + INSTANCE_ID + "/send-link";
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setDoOutput(true);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);

            String jsonPayload = String.format(
                "{\"phone\":\"%s\",\"message\":\"%s\",\"linkPreview\":%s}",
                phone, message.replace("\"", "\\\""), linkPreview
            );

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonPayload.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            int responseCode = conn.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) {
                try (BufferedReader br = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    System.out.println("Link enviado. Response: " + response.toString());
                }
            } else {
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
using System.Text.RegularExpressions;
using System.Threading.Tasks;

class SendLink
{
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCE_ID";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "SEU_CLIENT_TOKEN";

    private static string ValidatePhoneNumber(string phone)
    {
        string cleaned = Regex.Replace(phone, @"\D", "");
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("Número de telefone inválido");
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
            string phone = ValidatePhoneNumber("5511999999999");
            string message = SanitizeMessage("Confira este link interessante: https://exemplo.com");
            bool linkPreview = true;

            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/send-link";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var payload = new
                {
                    phone = phone,
                    message = message,
                    linkPreview = linkPreview
                };

                string jsonPayload = System.Text.Json.JsonSerializer.Serialize(payload);
                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Link enviado. Response: {responseBody}");
                }
                else
                {
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
    "io"
    "net/http"
    "os"
    "regexp"
    "strings"
    "time"
)

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

func validatePhoneNumber(phone string) (string, error) {
    re := regexp.MustCompile(`\D`)
    cleaned := re.ReplaceAllString(phone, "")
    if len(cleaned) < 10 || len(cleaned) > 15 {
        return "", fmt.Errorf("número de telefone inválido")
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
    clientToken := getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

    phone, err := validatePhoneNumber("5511999999999")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    message, err := sanitizeMessage("Confira este link interessante: https://exemplo.com")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    url := fmt.Sprintf("https://api.z-api.io/instances/%s/send-link", instanceId)

    payload := map[string]interface{}{
        "phone":      phone,
        "message":    message,
        "linkPreview": true,
    }

    jsonData, _ := json.Marshal(payload)

    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)

    client := &http.Client{Timeout: 30 * time.Second}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro na requisição: %v\n", err)
        return
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        body, _ := io.ReadAll(resp.Body)
        fmt.Printf("Link enviado. Response: %s\n", string(body))
    } else {
        fmt.Printf("Erro HTTP %d: Requisição falhou\n", resp.StatusCode)
    }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCE_ID';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'SEU_CLIENT_TOKEN';

function validatePhoneNumber($phone) {
    $cleaned = preg_replace('/\D/', '', $phone);
    if (strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new Exception('Número de telefone inválido');
    }
    return $cleaned;
}

function sanitizeMessage($message) {
    if (empty($message) || trim($message) === '') {
        throw new Exception('Mensagem não pode estar vazia');
    }
    $trimmed = trim($message);
    if (strlen($trimmed) > 4096) {
        throw new Exception('Mensagem excede limite de 4096 caracteres');
    }
    return $trimmed;
}

try {
    $phone = validatePhoneNumber('5511999999999');
    $message = sanitizeMessage('Confira este link interessante: https://exemplo.com');
    $linkPreview = true;

    $url = "https://api.z-api.io/instances/" . urlencode($instanceId) . "/send-link";

    $payload = [
        'phone' => $phone,
        'message' => $message,
        'linkPreview' => $linkPreview,
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Client-Token: ' . $clientToken
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Link enviado. MessageId: " . $result['messageId'] . "\n";
    } else {
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
require 'openssl'

instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCE_ID'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'SEU_CLIENT_TOKEN'

def validate_phone_number(phone)
  cleaned = phone.gsub(/\D/, '')
  if cleaned.length < 10 || cleaned.length > 15
    raise ArgumentError, 'Número de telefone inválido'
  end
  cleaned
end

def sanitize_message(message)
  if message.nil? || message.strip.empty?
    raise ArgumentError, 'Mensagem não pode estar vazia'
  end
  trimmed = message.strip
  if trimmed.length > 4096
    raise ArgumentError, 'Mensagem excede limite de 4096 caracteres'
  end
  trimmed
end

begin
  phone = validate_phone_number('5511999999999')
  message = sanitize_message('Confira este link interessante: https://exemplo.com')
  link_preview = true

  uri = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(instance_id)}/send-link")

  payload = {
    phone: phone,
    message: message,
    linkPreview: link_preview
  }

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(uri.path)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts "Link enviado. MessageId: #{result['messageId']}"
  else
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

let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCE_ID"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "SEU_CLIENT_TOKEN"

func validatePhoneNumber(_ phone: String) throws -> String {
    let cleaned = phone.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
    if cleaned.count < 10 || cleaned.count > 15 {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Número de telefone inválido"])
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

do {
    let phone = try validatePhoneNumber("5511999999999")
    let message = try sanitizeMessage("Confira este link interessante: https://exemplo.com")
    let linkPreview = true

    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-link"
    
    guard let url = URL(string: urlString) else {
        throw NSError(domain: "URLError", code: 1, userInfo: [NSLocalizedDescriptionKey: "URL inválida"])
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30.0

    let payload: [String: Any] = [
        "phone": phone,
        "message": message,
        "linkPreview": linkPreview
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
                    print("Link enviado. MessageId: \(messageId)")
                }
            } else {
                print("Erro HTTP \(httpResponse.statusCode): Requisição falhou")
            }
        }
    }
    task.resume()

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
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "SEU_CLIENT_TOKEN" }

function Validate-PhoneNumber {
    param([string]$Phone)
    $cleaned = $Phone -replace '\D', ''
    if ($cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "Número de telefone inválido"
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
    $phone = Validate-PhoneNumber -Phone "5511999999999"
    $message = Sanitize-Message -Message "Confira este link interessante: https://exemplo.com"
    $linkPreview = $true

    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/send-link"

    $body = @{
        phone = $phone
        message = $message
        linkPreview = $linkPreview
    } | ConvertTo-Json

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Body $body -Headers $headers -TimeoutSec 30 -ErrorAction Stop

    Write-Host "Link enviado. MessageId: $($response.messageId)"

} catch {
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
POST /instances/SUA_INSTANCIA/send-link HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: SEU_CLIENT_TOKEN
Content-Length: 125

{
 "phone": "5511999999999",
 "message": "Confira este link interessante: https://exemplo.com",
 "linkPreview": true
}
```

**Nota:** Este é um exemplo de requisição HTTP raw. Em produção:
- ⚠️ **SEGURANÇA:** Substitua `SUA_INSTANCIA` e `SEU_CLIENT_TOKEN` por valores reais de variáveis de ambiente
- ⚠️ **SEGURANÇA:** Sempre use HTTPS (não HTTP)
- ⚠️ **Validação:** Valide `phone` (apenas números, 10-15 dígitos), `message` (não vazio, máximo 4096 caracteres) e `linkPreview` (boolean) antes de enviar

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <regex>
#include <curl/curl.h>

std::string getEnv(const char* key, const std::string& defaultValue) {
    const char* value = std::getenv(key);
    return value ? std::string(value) : defaultValue;
}

std::string validatePhoneNumber(const std::string& phone) {
    std::regex nonDigit("\\D");
    std::string cleaned = std::regex_replace(phone, nonDigit, "");
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::invalid_argument("Número de telefone inválido");
    }
    return cleaned;
}

std::string sanitizeMessage(const std::string& message) {
    std::string trimmed = message;
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

size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

int main() {
    try {
        std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
        std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

        std::string phone = validatePhoneNumber("5511999999999");
        std::string message = sanitizeMessage("Confira este link interessante: https://exemplo.com");
        bool linkPreview = true;

        std::string url = "https://api.z-api.io/instances/" + instanceId + "/send-link";
        
        std::string jsonPayload = "{\"phone\":\"" + phone + "\",\"message\":\"" + message + "\",\"linkPreview\":" + (linkPreview ? "true" : "false") + "}";

        CURL* curl = curl_easy_init();
        if (!curl) {
            std::cerr << "Erro ao inicializar cURL" << std::endl;
            return 1;
        }

        std::string responseData;
        struct curl_slist* headers = nullptr;

        headers = curl_slist_append(headers, "Content-Type: application/json");
        std::string clientTokenHeader = "Client-Token: " + clientToken;
        headers = curl_slist_append(headers, clientTokenHeader.c_str());

        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);

        CURLcode res = curl_easy_perform(curl);
        long responseCode = 0;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            std::cout << "Link enviado. Response: " << responseData << std::endl;
        } else {
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
g++ -o send_link send_link.cpp -lcurl
```

</TabItem>
<TabItem value="c" label="C">

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <curl/curl.h>

char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

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
        return 0;
    }
    return 1;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, char* data) {
    size_t totalSize = size * nmemb;
    strncat(data, (char*)contents, totalSize);
    return totalSize;
}

int main() {
    char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
    char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

    char phone[20];
    if (!validatePhoneNumber("5511999999999", phone)) {
        fprintf(stderr, "Erro: Número de telefone inválido\n");
        return 1;
    }

    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/send-link", instanceId);

    char jsonPayload[4200];
    snprintf(jsonPayload, sizeof(jsonPayload), 
             "{\"phone\":\"%s\",\"message\":\"Confira este link interessante: https://exemplo.com\",\"linkPreview\":true}",
             phone);

    CURL* curl = curl_easy_init();
    if (!curl) {
        fprintf(stderr, "Erro ao inicializar cURL\n");
        return 1;
    }

    char responseData[4096] = {0};
    struct curl_slist* headers = NULL;

    headers = curl_slist_append(headers, "Content-Type: application/json");
    char clientTokenHeader[256];
    snprintf(clientTokenHeader, sizeof(clientTokenHeader), "Client-Token: %s", clientToken);
    headers = curl_slist_append(headers, clientTokenHeader);

    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload);
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, responseData);
    curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);

    CURLcode res = curl_easy_perform(curl);
    long responseCode = 0;
    curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

    if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
        printf("Link enviado. Response: %s\n", responseData);
    } else {
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
gcc -o send_link send_link.c -lcurl
```

</TabItem>
</Tabs>

## <Icon name="Info" size="md" /> Meta Tags Open Graph {#meta-tags-open-graph}

Para melhorar o preview do link, adicione estas meta tags no `<head>` do seu site:

```html
<!-- Título -->
<meta property="og:title" content="Título da Página" />

<!-- Descrição -->
<meta property="og:description" content="Descrição da página" />

<!-- Imagem -->
<meta property="og:image" content="https://exemplo.com/imagem.jpg" />

<!-- URL -->
<meta property="og:url" content="https://exemplo.com" />

<!-- Tipo -->
<meta property="og:type" content="website" />
```

## <Icon name="AlertTriangle" size="md" /> Limitações {#limitacoes}

- O preview é gerado automaticamente pelo WhatsApp
- Nem todos os sites têm preview disponível
- O preview depende das meta tags Open Graph do site
- Links muito longos podem ser truncados

## <Icon name="Info" size="md" /> Notas importantes {#notas-importantes}

- O WhatsApp detecta automaticamente URLs na mensagem
- O preview é gerado pelo WhatsApp, não pela API do Z-API
- Para desabilitar o preview, defina `linkPreview: false`
- Links devem ser URLs válidas e acessíveis publicamente
- O preview pode levar alguns segundos para ser gerado

## <Icon name="ArrowRight" size="md" /> Próximos passos {#proximos-passos}

- [Enviar texto simples](/docs/messages/texto-simples) - Envie mensagens de texto
- [Enviar imagem](/docs/messages/imagem) - Envie imagens com legendas
- [Enviar localização](/docs/messages/localizacao) - Compartilhe localizações
