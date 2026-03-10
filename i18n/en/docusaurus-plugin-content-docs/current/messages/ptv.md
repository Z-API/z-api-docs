---
id: ptv
sidebar_position: 10
title: PTV (Picture-in-Picture Video)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="PictureInPicture" size="lg" /> PTV (Picture-in-Picture Video)

Send a Picture-in-Picture (PTV) video to a recipient using the Z-API. PTV videos are played in a smaller floating window over the conversation, allowing the user to continue navigating while watching.

**What is PTV?** The abbreviation PTV stands for "Pre-Recorded Transfer Video." It's a special type of video that WhatsApp plays in a floating window, allowing the user to continue navigating the conversation while watching.

![Example of PTV message](/img/send-message-ptv.jpeg)

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-ptv
```

### Headers {#headers}

| Header | Type | Required | Description |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Yes | Authentication token |
| Content-Type | string | Yes | Should be `application/json` |

### Request Body {#corpo-da-requisicao}

**Minimum example (only required fields):**

```json
{
  "phone": "5511999999999",
  "ptv": "http://techslides.com/demos/sample-videos/small.mp4"
}
```

**Complete example (with all optional parameters):**

```json
{
  "phone": "5511999999999",
  "ptv": "http://techslides.com/demos/sample-videos/small.mp4",
  "messageId": "3EB0C767F26A",
  "delayMessage": 3
}
```

**Example with Base64:**

```json
{
  "phone": "5511999999999",
  "ptv": "data:video/mp4;base64,AAYXJ0eHJlZgIGZ0eXBtc0eHDQyAAg3NDINCiUlRUAAAG1wNDJtcD"
}
```

### Parameters {#parametros}

#### Required Parameters

| Field | Type | Required | Description |
|---------|--------|-------------|--------------------------------------------------|
| `phone` | string | Yes | Recipient number in DDI + DDD + NUMBER format. |
| `ptv` | string | Yes | Public video URL or Base64 string of the video. Supported formats: MP4. |

#### Optional Parameters

| Field | Type | Required | Description |
|---------|--------|-------------|--------------------------------------------------|
| `messageId` | string | No | Allows replying to an existing message in the chat, creating a threaded conversation. Use the `messageId` of the message you want to reply to. See more about [how to reply messages](./responder). |
| `delayMessage` | number | No | Controls the wait time (in seconds) before sending the next message. Values between 1 and 15 seconds. If not specified, the system uses an automatic delay of 1 to 3 seconds. Useful when sending multiple PTV videos in sequence to avoid blocks. |

## <Icon name="FileText" size="md" /> Supported Formats {#formatos-suportados}

You can send PTV videos using:

- **URL**: `http://techslides.com/demos/sample-videos/small.mp4` - Publicly accessible URL that returns the video directly
- **Base64**: `data:video/mp4;base64,AAYXJ0eHJlZgIGZ0eXBtc0eHDQyAAg3NDINCiUlRUAAAG1wNDJtcD` - Video encoded in Base64

**Note on Base64:** If using Base64, you need to add the prefix `data:video/mp4;base64,` before the Base64 code.

## <Icon name="Wand2" size="md" /> For No-Code Users {#para-usuarios-no-code}

In your automation tool (n8n, Make, Zapier), you will fill in the following fields:

### Required Fields

1. **`phone`**: The contact number that will receive the PTV video. Use the full format: DDI + DDD + Number (ex: `5511999999999`).
2. **`ptv`**: The field where you will paste the **public URL** of your video or the Base64 code. **Recommendation:** Use URLs whenever possible, as they are simpler and more reliable.

### Optional Fields

3. **`messageId`**: If you want to reply to a specific message, paste here the `messageId` of the original message. This creates a threaded conversation in WhatsApp.

4. **`delayMessage`**: If you are going to send multiple PTV videos in sequence, use this field to space the sending (between 1 and 15 seconds). This helps avoid blocks and makes communication more natural.

**Tip:** In most cases, you only need to fill in `phone` and `ptv`. The other fields are optional and can be left blank.

**What is PTV?**

PTV (Picture-in-Picture Video) is a special type of video that WhatsApp plays in a smaller floating window over the conversation. This allows the user to continue navigating while watching the video, unlike a regular video that occupies the entire screen.

**Video Formats:**

- **MP4**: Required format
- **Maximum size**: 16MB (recommended by WhatsApp)
- **Recommended duration**: Short videos (up to 60 seconds) work best

**Where to find PTV videos:**

- Use your own catalog or server videos
- Ensure that the video URL is public and accessible
- Test the URL in a browser before using it in automation

## <Icon name="CheckCircle" size="md" /> Responses {#respostas}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "3EB0C767F26A",
  "id": "3EB0C767F26A"
}
```

| Field | Type | Description |
|-----------|--------|----------------------------------------------|
| `zaapId` | string | Unique ID of the message in the Z-API system (for internal tracking) |
| `messageId` | string | Unique ID of the message on WhatsApp. **Save this ID!** Use it to track delivery status through webhooks |
| `id` | string | Compatibility ID with Zapier and legacy systems. Has the same value as `messageId` |

**Important:**

- The `messageId` is the primary identifier you should use for tracking
- The `zaapId` is used internally by Z-API for processing
- The `id` exists only for compatibility with legacy integrations (like Zapier)

**Delivery Tracking:**

To know when the message was delivered, read or if there was an error, configure a webhook and monitor the events. See more about [message received webhooks](../webhooks/ao-receber).

### Common Errors {#erros-comuns}

| Code | Reason | How to resolve |
|--------|-----------------------|----------------------------------------------------|
| 400 | Invalid parameters | Check `phone`, `video` and video format |
| 401 | Invalid token | Check the header `Client-Token` |
| 413 | File too large | Reduce video size (maximum 16MB) |
| 429 | Rate limit | Wait and try again |
| 5xx | Internal error | Try again; open support if persists |

## <Icon name="FileCode" size="md" /> Code Examples

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

function validateVideo(video) {
  if (!video || typeof video !== 'string') {
    throw new Error('Vídeo é obrigatório (URL ou Base64)');
  }
  // Valida se é URL
  if (video.startsWith('http://') || video.startsWith('https://')) {
    try {
      const url = new URL(video);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('URL deve usar HTTP ou HTTPS');
      }
    } catch (e) {
      throw new Error('URL do vídeo inválida');
    }
  } 
  // Valida se é Base64
  else if (video.startsWith('data:video/') || video.startsWith('data:image/')) {
    if (!video.includes(';base64,')) {
      throw new Error('Formato Base64 inválido. Use: data:video/mp4;base64,data...');
    }
  } else {
    throw new Error('Vídeo deve ser uma URL (http/https) ou Base64 (data:video/...;base64,...)');
  }
  return video;
}

function sanitizeCaption(caption) {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

// Dados do vídeo PTV com validação
const ptvData = {
  phone: validatePhoneNumber('5511999999999'),
  video: validateVideo('https://exemplo.com/video.mp4'),
  caption: sanitizeCaption('Este é um vídeo PTV de exemplo'),
};

// Remover caption se undefined
if (!ptvData.caption) delete ptvData.caption;

// Enviar requisição com tratamento seguro de erros
async function sendPTVMessage() {
  try {
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-ptv`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(ptvData),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Erro desconhecido');
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Vídeo PTV enviado com sucesso. MessageId:', result.messageId);
    return result;
  } catch (error) {
    console.error('Erro ao enviar vídeo PTV:', error.message);
    throw error;
  }
}

// Executar função
sendPTVMessage();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
interface SendPTVRequest {
  phone: string;
  video: string;
  caption?: string;
}

interface SendPTVResponse {
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

function validateVideo(video: string): string {
  if (!video) {
    throw new Error('Vídeo é obrigatório (URL ou Base64)');
  }
  if (video.startsWith('http://') || video.startsWith('https://')) {
    try {
      const url = new URL(video);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('URL deve usar HTTP ou HTTPS');
      }
    } catch {
      throw new Error('URL do vídeo inválida');
    }
  } else if (video.startsWith('data:video/') || video.startsWith('data:image/')) {
    if (!video.includes(';base64,')) {
      throw new Error('Formato Base64 inválido');
    }
  } else {
    throw new Error('Vídeo deve ser uma URL ou Base64');
  }
  return video;
}

function sanitizeCaption(caption?: string): string | undefined {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

const ptvData: SendPTVRequest = {
  phone: validatePhoneNumber('5511999999999'),
  video: validateVideo('https://exemplo.com/video.mp4'),
  caption: sanitizeCaption('Este é um vídeo PTV de exemplo'),
};

async function sendPTVMessage(): Promise<SendPTVResponse> {
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-ptv`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(ptvData),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

sendPTVMessage()
  .then((result) => console.log('Sucesso. MessageId:', result.messageId))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any, Optional
from urllib.parse import urlparse

INSTANCE_ID = os.getenv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
CLIENT_TOKEN = os.getenv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

def validate_phone_number(phone: str) -> str:
    cleaned = re.sub(r'\D', '', phone)
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError("Número de telefone inválido. Use formato: DDI + DDD + Número")
    return cleaned

def validate_video(video: str) -> str:
    if not video:
        raise ValueError("Vídeo é obrigatório (URL ou Base64)")
    if video.startswith(('http://', 'https://')):
        try:
            parsed = urlparse(video)
            if parsed.scheme not in ['http', 'https']:
                raise ValueError("URL deve usar HTTP ou HTTPS")
        except Exception:
            raise ValueError("URL do vídeo inválida")
    elif video.startswith('data:video/') or video.startswith('data:image/'):
        if ';base64,' not in video:
            raise ValueError("Formato Base64 inválido. Use: data:video/mp4;base64,data...")
    else:
        raise ValueError("Vídeo deve ser uma URL (http/https) ou Base64 (data:video/...;base64,...)")
    return video

def sanitize_caption(caption: Optional[str]) -> Optional[str]:
    if not caption:
        return None
    trimmed = caption.strip()
    if len(trimmed) > 1024:
        raise ValueError("Legenda excede limite de 1024 caracteres")
    return trimmed

url = f"https://api.z-api.io/instances/{INSTANCE_ID}/send-ptv"

try:
    payload: Dict[str, Any] = {
        "phone": validate_phone_number("5511999999999"),
        "video": validate_video("https://exemplo.com/video.mp4"),
        "caption": sanitize_caption("Este é um vídeo PTV de exemplo"),
    }
    if payload["caption"] is None:
        del payload["caption"]
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
    print(f"Vídeo PTV enviado. MessageId: {result.get('messageId')}")
    
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
  "https://api.z-api.io/instances/${INSTANCE_ID}/send-ptv" \
  -H 'Content-Type: application/json' \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d '{
    "phone": "5511999999999",
    "video": "https://exemplo.com/video.mp4",
    "caption": "Este é um vídeo PTV de exemplo"
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

function validateVideo(video) {
  if (!video) {
    throw new Error('Vídeo é obrigatório (URL ou Base64)');
  }
  if (video.startsWith('http://') || video.startsWith('https://')) {
    try {
      const url = new URL(video);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('URL deve usar HTTP ou HTTPS');
      }
    } catch (e) {
      throw new Error('URL do vídeo inválida');
    }
  } else if (video.startsWith('data:video/') || video.startsWith('data:image/')) {
    if (!video.includes(';base64,')) {
      throw new Error('Formato Base64 inválido');
    }
  } else {
    throw new Error('Vídeo deve ser uma URL ou Base64');
  }
  return video;
}

function sanitizeCaption(caption) {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

const ptvData = {
  phone: validatePhoneNumber('5511999999999'),
  video: validateVideo('https://exemplo.com/video.mp4'),
  caption: sanitizeCaption('Este é um vídeo PTV de exemplo'),
};

if (!ptvData.caption) delete ptvData.caption;

const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-ptv`);
const postData = JSON.stringify(ptvData);

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
      console.log('Vídeo PTV enviado. MessageId:', result.messageId);
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

function validateVideo(video) {
  if (!video) {
    throw new Error('Vídeo é obrigatório (URL ou Base64)');
  }
  if (video.startsWith('http://') || video.startsWith('https://')) {
    try {
      const url = new URL(video);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('URL deve usar HTTP ou HTTPS');
      }
    } catch (e) {
      throw new Error('URL do vídeo inválida');
    }
  } else if (video.startsWith('data:video/') || video.startsWith('data:image/')) {
    if (!video.includes(';base64,')) {
      throw new Error('Formato Base64 inválido');
    }
  } else {
    throw new Error('Vídeo deve ser uma URL ou Base64');
  }
  return video;
}

function sanitizeCaption(caption) {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

app.post('/send-ptv', async (req, res) => {
  try {
    const rawPhone = req.body.phone || '5511999999999';
    const rawVideo = req.body.video || 'https://exemplo.com/video.mp4';
    const rawCaption = req.body.caption || '';

    const ptvData = {
      phone: validatePhoneNumber(rawPhone),
      video: validateVideo(rawVideo),
      caption: rawCaption ? sanitizeCaption(rawCaption) : undefined,
    };

    if (!ptvData.caption) delete ptvData.caption;

    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-ptv`);
    const postData = JSON.stringify(ptvData);

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
    console.error('Erro ao enviar vídeo PTV:', error.message);
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

function validateVideo(video) {
  if (!video) {
    throw new Error('Vídeo é obrigatório (URL ou Base64)');
  }
  if (video.startsWith('http://') || video.startsWith('https://')) {
    try {
      const url = new URL(video);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('URL deve usar HTTP ou HTTPS');
      }
    } catch (e) {
      throw new Error('URL do vídeo inválida');
    }
  } else if (video.startsWith('data:video/') || video.startsWith('data:image/')) {
    if (!video.includes(';base64,')) {
      throw new Error('Formato Base64 inválido');
    }
  } else {
    throw new Error('Vídeo deve ser uma URL ou Base64');
  }
  return video;
}

function sanitizeCaption(caption) {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

router.post('/send-ptv', async (ctx) => {
  try {
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const rawVideo = ctx.request.body.video || 'https://exemplo.com/video.mp4';
    const rawCaption = ctx.request.body.caption || '';

    const ptvData = {
      phone: validatePhoneNumber(rawPhone),
      video: validateVideo(rawVideo),
      caption: rawCaption ? sanitizeCaption(rawCaption) : undefined,
    };

    if (!ptvData.caption) delete ptvData.caption;

    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-ptv`);
    const postData = JSON.stringify(ptvData);

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
  console.error('Erro ao enviar vídeo PTV:', err.message);
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

public class SendPTV {
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

    private static String validateVideo(String video) {
        if (video == null || video.trim().isEmpty()) {
            throw new IllegalArgumentException("Vídeo é obrigatório (URL ou Base64)");
        }
        if (video.startsWith("http://") || video.startsWith("https://")) {
            try {
                URL url = new URL(video);
                String protocol = url.getProtocol();
                if (!protocol.equals("http") && !protocol.equals("https")) {
                    throw new IllegalArgumentException("URL deve usar HTTP ou HTTPS");
                }
            } catch (Exception e) {
                throw new IllegalArgumentException("URL do vídeo inválida");
            }
        } else if (video.startsWith("data:video/") || video.startsWith("data:image/")) {
            if (!video.contains(";base64,")) {
                throw new IllegalArgumentException("Formato Base64 inválido");
            }
        } else {
            throw new IllegalArgumentException("Vídeo deve ser uma URL ou Base64");
        }
        return video;
    }

    private static String sanitizeCaption(String caption) {
        if (caption == null || caption.trim().isEmpty()) {
            return null;
        }
        String trimmed = caption.trim();
        if (trimmed.length() > 1024) {
            throw new IllegalArgumentException("Legenda excede limite de 1024 caracteres");
        }
        return trimmed;
    }

    public static void main(String[] args) {
        try {
            String phone = validatePhoneNumber("5511999999999");
            String video = validateVideo("https://exemplo.com/video.mp4");
            String caption = sanitizeCaption("Este é um vídeo PTV de exemplo");

            String urlString = "https://api.z-api.io/instances/" + INSTANCE_ID + "/send-ptv";
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setDoOutput(true);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);

            StringBuilder jsonPayload = new StringBuilder();
            jsonPayload.append("{\"phone\":\"").append(phone);
            jsonPayload.append("\",\"video\":\"").append(video.replace("\"", "\\\""));
            if (caption != null) {
                jsonPayload.append("\",\"caption\":\"").append(caption.replace("\"", "\\\""));
            }
            jsonPayload.append("\"}");

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonPayload.toString().getBytes(StandardCharsets.UTF_8);
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
                    System.out.println("Vídeo PTV enviado. Response: " + response.toString());
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

class SendPTV
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

    private static string ValidateVideo(string video)
    {
        if (string.IsNullOrWhiteSpace(video))
        {
            throw new ArgumentException("Vídeo é obrigatório (URL ou Base64)");
        }
        if (video.StartsWith("http://") || video.StartsWith("https://"))
        {
            if (!Uri.TryCreate(video, UriKind.Absolute, out Uri? uri) || 
                (uri.Scheme != "http" && uri.Scheme != "https"))
            {
                throw new ArgumentException("URL do vídeo inválida. Deve usar HTTP ou HTTPS");
            }
        }
        else if (video.StartsWith("data:video/") || video.StartsWith("data:image/"))
        {
            if (!video.Contains(";base64,"))
            {
                throw new ArgumentException("Formato Base64 inválido. Use: data:video/mp4;base64,data...");
            }
        }
        else
        {
            throw new ArgumentException("Vídeo deve ser uma URL (http/https) ou Base64 (data:video/...;base64,...)");
        }
        return video;
    }

    private static string? SanitizeCaption(string? caption)
    {
        if (string.IsNullOrWhiteSpace(caption))
        {
            return null;
        }
        string trimmed = caption.Trim();
        if (trimmed.Length > 1024)
        {
            throw new ArgumentException("Legenda excede limite de 1024 caracteres");
        }
        return trimmed;
    }

    static async Task Main(string[] args)
    {
        try
        {
            string phone = ValidatePhoneNumber("5511999999999");
            string video = ValidateVideo("https://exemplo.com/video.mp4");
            string? caption = SanitizeCaption("Este é um vídeo PTV de exemplo");

            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/send-ptv";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var payload = new
                {
                    phone = phone,
                    video = video,
                    caption = caption
                };

                string jsonPayload = System.Text.Json.JsonSerializer.Serialize(payload);
                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Vídeo PTV enviado. Response: {responseBody}");
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
    "net/url"
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

func validateVideo(video string) (string, error) {
    if video == "" {
        return "", fmt.Errorf("Vídeo é obrigatório (URL ou Base64)")
    }
    if strings.HasPrefix(video, "http://") || strings.HasPrefix(video, "https://") {
        parsed, err := url.Parse(video)
        if err != nil {
            return "", fmt.Errorf("URL do vídeo inválida")
        }
        if parsed.Scheme != "http" && parsed.Scheme != "https" {
            return "", fmt.Errorf("URL deve usar HTTP ou HTTPS")
        }
    } else if strings.HasPrefix(video, "data:video/") || strings.HasPrefix(video, "data:image/") {
        if !strings.Contains(video, ";base64,") {
            return "", fmt.Errorf("formato Base64 inválido. Use: data:video/mp4;base64,data...")
        }
    } else {
        return "", fmt.Errorf("Vídeo deve ser uma URL (http/https) ou Base64 (data:video/...;base64,...)")
    }
    return video, nil
}

func sanitizeCaption(caption string) (string, error) {
    trimmed := strings.TrimSpace(caption)
    if trimmed == "" {
        return "", nil
    }
    if len(trimmed) > 1024 {
        return "", fmt.Errorf("legenda excede limite de 1024 caracteres")
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

    video, err := validateVideo("https://exemplo.com/video.mp4")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    caption, err := sanitizeCaption("Este é um vídeo PTV de exemplo")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    url := fmt.Sprintf("https://api.z-api.io/instances/%s/send-ptv", instanceId)

    payload := map[string]interface{}{
        "phone": phone,
        "video": video,
    }
    if caption != "" {
        payload["caption"] = caption
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
        fmt.Printf("Vídeo PTV enviado. Response: %s\n", string(body))
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

function validateVideo($video) {
    if (empty($video)) {
        throw new Exception('Vídeo é obrigatório (URL ou Base64)');
    }
    if (strpos($video, 'http://') === 0 || strpos($video, 'https://') === 0) {
        $parsed = parse_url($video);
        if ($parsed === false || !in_array($parsed['scheme'] ?? '', ['http', 'https'])) {
            throw new Exception('URL do vídeo inválida. Deve usar HTTP ou HTTPS');
        }
    } elseif (strpos($video, 'data:video/') === 0 || strpos($video, 'data:image/') === 0) {
        if (strpos($video, ';base64,') === false) {
            throw new Exception('Formato Base64 inválido. Use: data:video/mp4;base64,data...');
        }
    } else {
        throw new Exception('Vídeo deve ser uma URL (http/https) ou Base64 (data:video/...;base64,...)');
    }
    return $video;
}

function sanitizeCaption($caption) {
    if (empty(trim($caption))) {
        return null;
    }
    $trimmed = trim($caption);
    if (strlen($trimmed) > 1024) {
        throw new Exception('Legenda excede limite de 1024 caracteres');
    }
    return $trimmed;
}

try {
    $phone = validatePhoneNumber('5511999999999');
    $video = validateVideo('https://exemplo.com/video.mp4');
    $caption = sanitizeCaption('Este é um vídeo PTV de exemplo');

    $url = "https://api.z-api.io/instances/" . urlencode($instanceId) . "/send-ptv";

    $payload = [
        'phone' => $phone,
        'video' => $video,
    ];
    if ($caption !== null) {
        $payload['caption'] = $caption;
    }

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
        echo "Vídeo PTV enviado. MessageId: " . $result['messageId'] . "\n";
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

def validate_video(video)
  if video.nil? || video.strip.empty?
    raise ArgumentError, 'Vídeo é obrigatório (URL ou Base64)'
  end
  if video.start_with?('http://', 'https://')
    begin
      uri = URI.parse(video)
      unless ['http', 'https'].include?(uri.scheme)
        raise ArgumentError, 'URL deve usar HTTP ou HTTPS'
      end
    rescue URI::InvalidURIError
      raise ArgumentError, 'URL do vídeo inválida'
    end
  elsif video.start_with?('data:video/') || video.start_with?('data:image/')
    unless video.include?(';base64,')
      raise ArgumentError, 'Formato Base64 inválido. Use: data:video/mp4;base64,data...'
    end
  else
    raise ArgumentError, 'Vídeo deve ser uma URL (http/https) ou Base64 (data:video/...;base64,...)'
  end
  video
end

def sanitize_caption(caption)
  return nil if caption.nil? || caption.strip.empty?
  trimmed = caption.strip
  if trimmed.length > 1024
    raise ArgumentError, 'Legenda excede limite de 1024 caracteres'
  end
  trimmed
end

begin
  phone = validate_phone_number('5511999999999')
  video = validate_video('https://exemplo.com/video.mp4')
  caption = sanitize_caption('Este é um vídeo PTV de exemplo')

  uri = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(instance_id)}/send-ptv")

  payload = {
    phone: phone,
    video: video
  }
  payload[:caption] = caption if caption

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
    puts "Vídeo PTV enviado. MessageId: #{result['messageId']}"
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

func validateVideo(_ video: String) throws -> String {
    if video.isEmpty {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Vídeo é obrigatório (URL ou Base64)"])
    }
    if video.hasPrefix("http://") || video.hasPrefix("https://") {
        guard let url = URL(string: video),
              let scheme = url.scheme,
              (scheme == "http" || scheme == "https") else {
            throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "URL do vídeo inválida. Deve usar HTTP ou HTTPS"])
        }
    } else if video.hasPrefix("data:video/") || video.hasPrefix("data:image/") {
        if !video.contains(";base64,") {
            throw NSError(domain: "ValidationError", code: 4, userInfo: [NSLocalizedDescriptionKey: "Formato Base64 inválido. Use: data:video/mp4;base64,data..."])
        }
    } else {
        throw NSError(domain: "ValidationError", code: 5, userInfo: [NSLocalizedDescriptionKey: "Vídeo deve ser uma URL (http/https) ou Base64 (data:video/...;base64,...)"])
    }
    return video
}

func sanitizeCaption(_ caption: String?) throws -> String? {
    guard let caption = caption else { return nil }
    let trimmed = caption.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmed.isEmpty {
        return nil
    }
    if trimmed.count > 1024 {
        throw NSError(domain: "ValidationError", code: 6, userInfo: [NSLocalizedDescriptionKey: "Legenda excede limite de 1024 caracteres"])
    }
    return trimmed
}

do {
    let phone = try validatePhoneNumber("5511999999999")
    let video = try validateVideo("https://exemplo.com/video.mp4")
    let caption = try sanitizeCaption("Este é um vídeo PTV de exemplo")

    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-ptv"
    
    guard let url = URL(string: urlString) else {
        throw NSError(domain: "URLError", code: 1, userInfo: [NSLocalizedDescriptionKey: "URL inválida"])
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30.0

    var payload: [String: Any] = [
        "phone": phone,
        "video": video
    ]
    if let caption = caption {
        payload["caption"] = caption
    }
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
                    print("Vídeo PTV enviado. MessageId: \(messageId)")
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

function Validate-Video {
    param([string]$Video)
    if ([string]::IsNullOrWhiteSpace($Video)) {
        throw "Vídeo é obrigatório (URL ou Base64)"
    }
    if ($Video -match '^https?://') {
        try {
            $uri = [System.Uri]$Video
            if ($uri.Scheme -notin @('http', 'https')) {
                throw "URL deve usar HTTP ou HTTPS"
            }
        } catch {
            throw "URL do vídeo inválida"
        }
    }
    elseif ($Video -match '^data:video/|^data:image/') {
        if ($Video -notmatch ';base64,') {
            throw "Formato Base64 inválido. Use: data:video/mp4;base64,data..."
        }
    } else {
        throw "Vídeo deve ser uma URL (http/https) ou Base64 (data:video/...;base64,...)"
    }
    return $Video
}

function Sanitize-Caption {
    param([string]$Caption)
    if ([string]::IsNullOrWhiteSpace($Caption)) {
        return $null
    }
    $trimmed = $Caption.Trim()
    if ($trimmed.Length -gt 1024) {
        throw "Legenda excede limite de 1024 caracteres"
    }
    return $trimmed
}

try {
    $phone = Validate-PhoneNumber -Phone "5511999999999"
    $video = Validate-Video -Video "https://exemplo.com/video.mp4"
    $caption = Sanitize-Caption -Caption "Este é um vídeo PTV de exemplo"

    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/send-ptv"

    $body = @{
        phone = $phone
        video = $video
    }
    if ($caption) {
        $body.caption = $caption
    }
    $bodyJson = $body | ConvertTo-Json

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Body $bodyJson -Headers $headers -TimeoutSec 30 -ErrorAction Stop

    Write-Host "Vídeo PTV enviado. MessageId: $($response.messageId)"

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
POST /instances/SUA_INSTANCIA/send-ptv HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: SEU_CLIENT_TOKEN
Content-Length: 125

{
 "phone": "5511999999999",
 "video": "https://exemplo.com/video.mp4",
 "caption": "Este é um vídeo PTV de exemplo"
}
```

**Note:** This is an example of raw HTTP request. In production:
- ⚠️ **SECURITY:** Replace `SUA_INSTANCIA` and `SEU_CLIENT_TOKEN` with real values from environment variables
- ⚠️ **SECURITY:** Always use HTTPS (not HTTP)
- ⚠️ **Validation:** Validate `phone` (only numbers, 10-15 digits), `video` (valid HTTP URL/HTTPS or valid Base64 with format `data:video/mp4;base64,...`) and `caption` (maximum 1024 characters) before sending

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

std::string validateVideo(const std::string& video) {
    if (video.empty()) {
        throw std::invalid_argument("Vídeo é obrigatório (URL ou Base64)");
    }
    std::regex urlPattern("^https?://");
    if (std::regex_search(video, urlPattern)) {
        // URL válida - validação básica
    } else if (video.find("data:video/") == 0 || video.find("data:image/") == 0) {
        if (video.find(";base64,") == std::string::npos) {
            throw std::invalid_argument("Formato Base64 inválido. Use: data:video/mp4;base64,data...");
        }
    } else {
        throw std::invalid_argument("Vídeo deve ser uma URL (http/https) ou Base64 (data:video/...;base64,...)");
    }
    return video;
}

std::string sanitizeCaption(const std::string& caption) {
    std::string trimmed = caption;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    if (!trimmed.empty() && trimmed.length() > 1024) {
        throw std::invalid_argument("Legenda excede limite de 1024 caracteres");
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
        std::string video = validateVideo("https://exemplo.com/video.mp4");
        std::string caption = sanitizeCaption("Este é um vídeo PTV de exemplo");

        std::string url = "https://api.z-api.io/instances/" + instanceId + "/send-ptv";
        
        std::string jsonPayload = "{\"phone\":\"" + phone + "\",\"video\":\"" + video + "\"";
        if (!caption.empty()) {
            jsonPayload += ",\"caption\":\"" + caption + "\"";
        }
        jsonPayload += "}";

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
            std::cout << "Vídeo PTV enviado. Response: " << responseData << std::endl;
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

**Compilation:**
```bash
g++ -o send_ptv send_ptv.cpp -lcurl
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
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/send-ptv", instanceId);

    char jsonPayload[500];
    snprintf(jsonPayload, sizeof(jsonPayload), 
             "{\"phone\":\"%s\",\"video\":\"https://exemplo.com/video.mp4\",\"caption\":\"Este é um vídeo PTV de exemplo\"}",
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
        printf("Vídeo PTV enviado. Response: %s\n", responseData);
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

**Compilation:**
```bash
gcc -o send_ptv send_ptv.c -lcurl
```

</TabItem>
</Tabs>

## <Icon name="Info" size="md" /> Difference between normal video and PTV {#diferenca-entre-video-normal-e-ptv}

| Feature | Normal Video | PTV (Picture-in-Picture) |
|----------------|--------------|---------------------------|
| **Playback** | Full screen | Small floating window |
| **Navigation** | Blocks navigation | Allows continuing navigation |
| **Ideal use** | Long videos, main content | Short videos, quick tutorials |
| **Experience** | Full focus on video | Multitasking while watching |

:::tip When to Use PTV

Use PTV for:
- Quick and short tutorials
- Product demonstrations
- Videos that don't require full attention
- Content that complements the conversation without interrupting the flow

:::

## <Icon name="AlertTriangle" size="md" /> Limitations and best practices {#limitacoes-e-boas-praticas}

- **Maximum size**: 16MB per PTV video
- **Supported formats**: MP4, 3GP, AVI, MOV
- **Recommended**: Use videos up to 5MB for better performance and fast loading
- **Duration**: Recommended up to 60 seconds for PTV videos (best user experience)
- **Dimensions**: Recommended up to 1280x720 pixels
- **Legends**: Maximum of 1024 characters
- **URLs**: Should be publicly accessible and return the video directly. Avoid URLs that require authentication or complex redirects

## <Icon name="Info" size="md" /> Important notes {#notas-importantes}

- PTV videos are played in a smaller floating window, allowing the user to continue navigating on WhatsApp
- For better performance, use URLs instead of Base64 whenever possible, as URLs are processed more efficiently
- Large videos may take longer to process and send, impacting the user experience
- Ensure that video URLs are publicly accessible so that WhatsApp can download them
- WhatsApp may automatically compress PTV videos to optimize sending

## <Icon name="ArrowRight" size="md" /> Next steps {#proximos-passos}

- [Send video](/docs/messages/video) - Send normal videos with captions
- [Send GIF](/docs/messages/gif) - Send animated GIFs
- [Send image](/docs/messages/imagem) - Send images with captions