---
id: gif
title: Enviar GIF
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Zap" size="lg" /> Enviar GIF

Envie uma animação GIF para um destinatário usando a API do Z-API. GIFs são imagens animadas que se reproduzem automaticamente no WhatsApp.

**⚠️ Importante:** O arquivo a ser enviado precisa ser um **MP4**, não um GIF tradicional. O WhatsApp converte o MP4 em uma animação que se comporta como um GIF.

![Exemplo de mensagem com GIF](/img/send-message-gif.jpeg)

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-gif
```

### Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Sim | Token de autenticação |
| Content-Type | string | Sim | Deve ser `application/json` |

### Corpo da requisição {#corpo-da-requisicao}

**Exemplo mínimo (apenas campos obrigatórios):**

```json
{
  "phone": "5511999999999",
  "gif": "https://file-examples.com/storage/fe88505b6162b2538a045ce/2017/04/file_example_MP4_480_1_5MG.mp4"
}
```

**Exemplo completo (com todos os parâmetros opcionais):**

```json
{
  "phone": "5511999999999",
  "gif": "https://file-examples.com/storage/fe88505b6162b2538a045ce/2017/04/file_example_MP4_480_1_5MG.mp4",
  "caption": "Legenda do GIF (opcional)",
  "messageId": "3EB0C767F26A",
  "delayMessage": 3
}
```

**Exemplo com Base64:**

```json
{
  "phone": "5511999999999",
  "gif": "data:video/mp4;base64,AAYXJ0eHJlZgIGZ0eXBtc0eHDQyAAg3NDINCiUlRUAAAG1wNDJtcD",
  "caption": "GIF enviado via Base64"
}
```

### Parâmetros {#parametros}

#### Parâmetros Obrigatórios

| Campo | Tipo | Obrigatório | Descrição |
|---------|--------|-------------|--------------------------------------------------|
| `phone` | string | Sim | Número do destinatário no formato DDI + DDD + NÚMERO. |
| `gif` | string | Sim | URL do arquivo MP4 ou string base64. **Importante:** O arquivo deve ser um MP4, não um GIF tradicional. O WhatsApp converte o MP4 em uma animação que se comporta como um GIF. |

#### Parâmetros Opcionais

| Campo | Tipo | Obrigatório | Descrição |
|---------|--------|-------------|--------------------------------------------------|
| `caption` | string | Não | Legenda do GIF (máximo 1024 caracteres). Permite formatação (negrito, itálico). |
| `messageId` | string | Não | Permite responder uma mensagem existente no chat, criando uma conversa encadeada. Use o `messageId` da mensagem que você quer responder. Veja mais sobre [como responder mensagens](./responder). |
| `delayMessage` | number | Não | Controla o tempo de espera (em segundos) antes de enviar a próxima mensagem. Valores entre 1 e 15 segundos. Se não informado, o sistema usa um delay automático de 1 a 3 segundos. Útil ao enviar múltiplos GIFs em sequência para evitar bloqueios. |

## <Icon name="FileText" size="md" /> Formatos suportados {#formatos-suportados}

**⚠️ Importante:** O arquivo deve ser um **MP4**, não um GIF tradicional. O WhatsApp converte o MP4 em uma animação que se comporta como um GIF.

Você pode enviar GIFs usando:

- **URL**: `https://exemplo.com/animacao.mp4` - URL pública acessível que retorna o arquivo MP4 diretamente
- **Base64**: `data:video/mp4;base64,AAYXJ0eHJlZgIGZ0eXBtc0eHDQyAAg3NDINCiUlRUAAAG1wNDJtcD` - Arquivo MP4 codificado em base64

**Nota sobre Base64:** Se usar Base64, você precisa adicionar o prefixo `data:video/mp4;base64,` antes do código Base64.

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

1. **`phone`**: O número do contato que receberá o GIF. Use o formato completo: DDI + DDD + Número (ex: `5511999999999`).
2. **`gif`**: O campo onde você colará a **URL pública** do seu arquivo MP4 ou o código Base64. **Recomendação:** Use URL sempre que possível, pois é mais simples e confiável.

**⚠️ Importante:** O arquivo deve ser um **MP4**, não um GIF tradicional. O WhatsApp converte o MP4 em uma animação que se comporta como um GIF.

### Campos Opcionais

3. **`caption`**: Um texto curto para descrever o GIF. Você pode usar formatação (negrito com `*texto*`, itálico com `_texto_`). Máximo de 1024 caracteres.

4. **`messageId`**: Se você quer responder uma mensagem específica, cole aqui o `messageId` da mensagem original. Isso cria uma conversa encadeada no WhatsApp.

5. **`delayMessage`**: Se você vai enviar vários GIFs seguidos, use este campo para espaçar o envio (entre 1 e 15 segundos). Isso ajuda a evitar bloqueios e torna a comunicação mais natural.

**Dica:** Na maioria dos casos, você só precisa preencher `phone` e `gif`. Os outros campos são opcionais e podem ser deixados em branco.

**Formatos de Arquivo:**

- **MP4**: Formato obrigatório (o arquivo deve ser MP4, não GIF)
- **Tamanho máximo**: 16MB (recomendado pelo WhatsApp)
- **Duração recomendada**: GIFs curtos (até 10 segundos) funcionam melhor

**Onde encontrar GIFs em formato MP4:**

- Use conversores online de GIF para MP4
- Certifique-se de que a URL do arquivo MP4 seja pública e acessível
- Teste a URL no navegador antes de usar na automação

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
| 400 | Parâmetros inválidos | Verifique `phone` e `gif` |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 413 | Arquivo muito grande | Reduza o tamanho do GIF (máximo 16MB) |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |

## <Icon name="FileCode" size="md" /> Exemplos de Código

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
// Nunca commite tokens no código-fonte
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

function validateGif(gif) {
  if (!gif || typeof gif !== 'string') {
    throw new Error('GIF é obrigatório (URL ou Base64)');
  }
  // Valida se é URL
  if (gif.startsWith('http://') || gif.startsWith('https://')) {
    try {
      const url = new URL(gif);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('URL deve usar HTTP ou HTTPS');
      }
    } catch (e) {
      throw new Error('URL do GIF inválida');
    }
  } 
  // Valida se é Base64
  else if (gif.startsWith('data:image/gif') || gif.startsWith('data:image/')) {
    if (!gif.includes(';base64,')) {
      throw new Error('Formato Base64 inválido. Use: data:image/gif;base64,data...');
    }
  } else {
    throw new Error('GIF deve ser uma URL (http/https) ou Base64 (data:image/gif;base64,...)');
  }
  return gif;
}

function sanitizeCaption(caption) {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

// Dados do GIF com validação
const gifData = {
  phone: validatePhoneNumber('5511999999999'),
  gif: validateGif('https://exemplo.com/animacao.gif'),
  caption: sanitizeCaption('Este é um GIF de exemplo'),
};

// Remover caption se undefined
if (!gifData.caption) delete gifData.caption;

// Enviar requisição com tratamento seguro de erros
async function sendGifMessage() {
 try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-gif`;
    
    const response = await fetch(url, {
 method: 'POST',
 headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(gifData),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Erro desconhecido');
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

 const result = await response.json();
    console.log('GIF enviado com sucesso. MessageId:', result.messageId);
    return result;
 } catch (error) {
    console.error('Erro ao enviar GIF:', error.message);
    throw error;
 }
}

// Executar função
sendGifMessage();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// Tipos para melhor type safety
interface SendGifRequest {
  phone: string;
  gif: string;
  caption?: string;
}

interface SendGifResponse {
  messageId: string;
  status: string;
}

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido');
  }
  return cleaned;
}

function validateGif(gif: string): string {
  if (!gif) {
    throw new Error('GIF é obrigatório (URL ou Base64)');
  }
  if (gif.startsWith('http://') || gif.startsWith('https://')) {
    try {
      const url = new URL(gif);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('URL deve usar HTTP ou HTTPS');
      }
    } catch {
      throw new Error('URL do GIF inválida');
    }
  } else if (gif.startsWith('data:image/gif') || gif.startsWith('data:image/')) {
    if (!gif.includes(';base64,')) {
      throw new Error('Formato Base64 inválido');
    }
  } else {
    throw new Error('GIF deve ser uma URL ou Base64');
  }
  return gif;
}

function sanitizeCaption(caption?: string): string | undefined {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

// Dados do GIF com validação
const gifData: SendGifRequest = {
  phone: validatePhoneNumber('5511999999999'),
  gif: validateGif('https://exemplo.com/animacao.gif'),
  caption: sanitizeCaption('Este é um GIF de exemplo'),
};

// Função para enviar GIF
async function sendGifMessage(): Promise<SendGifResponse> {
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-gif`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(gifData),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
sendGifMessage()
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

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
CLIENT_TOKEN = os.getenv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

# Validação de entrada (segurança)
def validate_phone_number(phone: str) -> str:
    cleaned = re.sub(r'\D', '', phone)
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError("Número de telefone inválido. Use formato: DDI + DDD + Número")
    return cleaned

def validate_gif(gif: str) -> str:
    if not gif:
        raise ValueError("GIF é obrigatório (URL ou Base64)")
    if gif.startswith(('http://', 'https://')):
        try:
            parsed = urlparse(gif)
            if parsed.scheme not in ['http', 'https']:
                raise ValueError("URL deve usar HTTP ou HTTPS")
        except Exception:
            raise ValueError("URL do GIF inválida")
    elif gif.startswith('data:image/gif') or gif.startswith('data:image/'):
        if ';base64,' not in gif:
            raise ValueError("Formato Base64 inválido. Use: data:image/gif;base64,data...")
    else:
        raise ValueError("GIF deve ser uma URL (http/https) ou Base64 (data:image/gif;base64,...)")
    return gif

def sanitize_caption(caption: Optional[str]) -> Optional[str]:
    if not caption:
        return None
    trimmed = caption.strip()
    if len(trimmed) > 1024:
        raise ValueError("Legenda excede limite de 1024 caracteres")
    return trimmed

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/send-gif"

# Dados do GIF com validação
try:
    payload: Dict[str, Any] = {
        "phone": validate_phone_number("5511999999999"),
        "gif": validate_gif("https://exemplo.com/animacao.gif"),
        "caption": sanitize_caption("Este é um GIF de exemplo")
    }
    if payload["caption"] is None:
        del payload["caption"]
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
    response = requests.post(url, json=payload, headers=headers, timeout=30)
 response.raise_for_status()

    result: Dict[str, Any] = response.json()
    print(f"GIF enviado. MessageId: {result.get('messageId')}")
    
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
  "https://api.z-api.io/instances/${INSTANCE_ID}/send-gif" \
 -H 'Content-Type: application/json' \
  -H "Client-Token: ${CLIENT_TOKEN}" \
 -d '{
 "phone": "5511999999999",
 "gif": "https://exemplo.com/animacao.gif",
    "caption": "Este é um GIF de exemplo"
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

function validateGif(gif) {
  if (!gif) {
    throw new Error('GIF é obrigatório (URL ou Base64)');
  }
  if (gif.startsWith('http://') || gif.startsWith('https://')) {
    try {
      const url = new URL(gif);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('URL deve usar HTTP ou HTTPS');
      }
    } catch (e) {
      throw new Error('URL do GIF inválida');
    }
  } else if (gif.startsWith('data:image/gif') || gif.startsWith('data:image/')) {
    if (!gif.includes(';base64,')) {
      throw new Error('Formato Base64 inválido');
    }
  } else {
    throw new Error('GIF deve ser uma URL ou Base64');
  }
  return gif;
}

function sanitizeCaption(caption) {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

// Dados do GIF com validação
const gifData = {
  phone: validatePhoneNumber('5511999999999'),
  gif: validateGif('https://exemplo.com/animacao.gif'),
  caption: sanitizeCaption('Este é um GIF de exemplo'),
};

if (!gifData.caption) delete gifData.caption;

// Enviar requisição
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-gif`);
const postData = JSON.stringify(gifData);

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
      console.log('GIF enviado. MessageId:', result.messageId);
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

function validateGif(gif) {
  if (!gif) {
    throw new Error('GIF é obrigatório (URL ou Base64)');
  }
  if (gif.startsWith('http://') || gif.startsWith('https://')) {
    try {
      const url = new URL(gif);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('URL deve usar HTTP ou HTTPS');
      }
    } catch (e) {
      throw new Error('URL do GIF inválida');
    }
  } else if (gif.startsWith('data:image/gif') || gif.startsWith('data:image/')) {
    if (!gif.includes(';base64,')) {
      throw new Error('Formato Base64 inválido');
    }
  } else {
    throw new Error('GIF deve ser uma URL ou Base64');
  }
  return gif;
}

function sanitizeCaption(caption) {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

// Rota para enviar GIF
app.post('/send-gif', async (req, res) => {
  try {
    const rawPhone = req.body.phone || '5511999999999';
    const rawGif = req.body.gif || 'https://exemplo.com/animacao.gif';
    const rawCaption = req.body.caption || '';

    const gifData = {
      phone: validatePhoneNumber(rawPhone),
      gif: validateGif(rawGif),
      caption: rawCaption ? sanitizeCaption(rawCaption) : undefined,
    };

    if (!gifData.caption) delete gifData.caption;

    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-gif`);
    const postData = JSON.stringify(gifData);

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
    console.error('Erro ao enviar GIF:', error.message);
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

function validateGif(gif) {
  if (!gif) {
    throw new Error('GIF é obrigatório (URL ou Base64)');
  }
  if (gif.startsWith('http://') || gif.startsWith('https://')) {
    try {
      const url = new URL(gif);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('URL deve usar HTTP ou HTTPS');
      }
    } catch (e) {
      throw new Error('URL do GIF inválida');
    }
  } else if (gif.startsWith('data:image/gif') || gif.startsWith('data:image/')) {
    if (!gif.includes(';base64,')) {
      throw new Error('Formato Base64 inválido');
    }
  } else {
    throw new Error('GIF deve ser uma URL ou Base64');
  }
  return gif;
}

function sanitizeCaption(caption) {
  if (!caption) return undefined;
  const trimmed = caption.trim();
  if (trimmed.length > 1024) {
    throw new Error('Legenda excede limite de 1024 caracteres');
  }
  return trimmed;
}

// Rota para enviar GIF
router.post('/send-gif', async (ctx) => {
  try {
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const rawGif = ctx.request.body.gif || 'https://exemplo.com/animacao.gif';
    const rawCaption = ctx.request.body.caption || '';

    const gifData = {
      phone: validatePhoneNumber(rawPhone),
      gif: validateGif(rawGif),
      caption: rawCaption ? sanitizeCaption(rawCaption) : undefined,
    };

    if (!gifData.caption) delete gifData.caption;

    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-gif`);
    const postData = JSON.stringify(gifData);

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

// Error handler
app.on('error', (err, ctx) => {
  console.error('Erro ao enviar GIF:', err.message);
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

public class SendGif {
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

    private static String validateGif(String gif) {
        if (gif == null || gif.trim().isEmpty()) {
            throw new IllegalArgumentException("GIF é obrigatório (URL ou Base64)");
        }
        if (gif.startsWith("http://") || gif.startsWith("https://")) {
            try {
                URL url = new URL(gif);
                String protocol = url.getProtocol();
                if (!protocol.equals("http") && !protocol.equals("https")) {
                    throw new IllegalArgumentException("URL deve usar HTTP ou HTTPS");
                }
            } catch (Exception e) {
                throw new IllegalArgumentException("URL do GIF inválida");
            }
        } else if (gif.startsWith("data:image/gif") || gif.startsWith("data:image/")) {
            if (!gif.contains(";base64,")) {
                throw new IllegalArgumentException("Formato Base64 inválido");
            }
        } else {
            throw new IllegalArgumentException("GIF deve ser uma URL ou Base64");
        }
        return gif;
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
            String gif = validateGif("https://exemplo.com/animacao.gif");
            String caption = sanitizeCaption("Este é um GIF de exemplo");

            String urlString = "https://api.z-api.io/instances/" + INSTANCE_ID + "/send-gif";
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setDoOutput(true);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);

            StringBuilder jsonPayload = new StringBuilder();
            jsonPayload.append("{\"phone\":\"").append(phone).append("\",");
            jsonPayload.append("\"gif\":\"").append(gif.replace("\"", "\\\"")).append("\"");
            if (caption != null) {
                jsonPayload.append(",\"caption\":\"").append(caption.replace("\"", "\\\"")).append("\"");
            }
            jsonPayload.append("}");

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
                    System.out.println("GIF enviado. Response: " + response.toString());
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

class SendGif
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

    private static string ValidateGif(string gif)
    {
        if (string.IsNullOrWhiteSpace(gif))
        {
            throw new ArgumentException("GIF é obrigatório (URL ou Base64)");
        }
        if (gif.StartsWith("http://") || gif.StartsWith("https://"))
        {
            if (!Uri.TryCreate(gif, UriKind.Absolute, out Uri? uri) || 
                (uri.Scheme != "http" && uri.Scheme != "https"))
            {
                throw new ArgumentException("URL do GIF inválida. Deve usar HTTP ou HTTPS");
            }
        }
        else if (gif.StartsWith("data:image/gif") || gif.StartsWith("data:image/"))
        {
            if (!gif.Contains(";base64,"))
            {
                throw new ArgumentException("Formato Base64 inválido. Use: data:image/gif;base64,data...");
            }
        }
        else
        {
            throw new ArgumentException("GIF deve ser uma URL (http/https) ou Base64 (data:image/gif;base64,...)");
        }
        return gif;
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
            string gif = ValidateGif("https://exemplo.com/animacao.gif");
            string? caption = SanitizeCaption("Este é um GIF de exemplo");

            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/send-gif";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var payload = new
                {
                    phone = phone,
                    gif = gif,
                    caption = caption
                };

                string jsonPayload = System.Text.Json.JsonSerializer.Serialize(payload);
                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"GIF enviado. Response: {responseBody}");
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

func validateGif(gif string) (string, error) {
    if gif == "" {
        return "", fmt.Errorf("GIF é obrigatório (URL ou Base64)")
    }
    if strings.HasPrefix(gif, "http://") || strings.HasPrefix(gif, "https://") {
        parsed, err := url.Parse(gif)
        if err != nil {
            return "", fmt.Errorf("URL do GIF inválida")
        }
        if parsed.Scheme != "http" && parsed.Scheme != "https" {
            return "", fmt.Errorf("URL deve usar HTTP ou HTTPS")
        }
    } else if strings.HasPrefix(gif, "data:image/gif") || strings.HasPrefix(gif, "data:image/") {
        if !strings.Contains(gif, ";base64,") {
            return "", fmt.Errorf("formato Base64 inválido. Use: data:image/gif;base64,data...")
        }
    } else {
        return "", fmt.Errorf("GIF deve ser uma URL (http/https) ou Base64 (data:image/gif;base64,...)")
    }
    return gif, nil
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

    gif, err := validateGif("https://exemplo.com/animacao.gif")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    caption, err := sanitizeCaption("Este é um GIF de exemplo")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    url := fmt.Sprintf("https://api.z-api.io/instances/%s/send-gif", instanceId)

    payload := map[string]interface{}{
        "phone": phone,
        "gif":   gif,
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
        fmt.Printf("GIF enviado. Response: %s\n", string(body))
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

function validateGif($gif) {
    if (empty($gif)) {
        throw new Exception('GIF é obrigatório (URL ou Base64)');
    }
    if (strpos($gif, 'http://') === 0 || strpos($gif, 'https://') === 0) {
        $parsed = parse_url($gif);
        if ($parsed === false || !in_array($parsed['scheme'] ?? '', ['http', 'https'])) {
            throw new Exception('URL do GIF inválida. Deve usar HTTP ou HTTPS');
        }
    } elseif (strpos($gif, 'data:image/gif') === 0 || strpos($gif, 'data:image/') === 0) {
        if (strpos($gif, ';base64,') === false) {
            throw new Exception('Formato Base64 inválido. Use: data:image/gif;base64,data...');
        }
    } else {
        throw new Exception('GIF deve ser uma URL (http/https) ou Base64 (data:image/gif;base64,...)');
    }
    return $gif;
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
    $gif = validateGif('https://exemplo.com/animacao.gif');
    $caption = sanitizeCaption('Este é um GIF de exemplo');

    $url = "https://api.z-api.io/instances/" . urlencode($instanceId) . "/send-gif";

    $payload = [
        'phone' => $phone,
        'gif' => $gif,
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
        echo "GIF enviado. MessageId: " . $result['messageId'] . "\n";
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

def validate_gif(gif)
  if gif.nil? || gif.strip.empty?
    raise ArgumentError, 'GIF é obrigatório (URL ou Base64)'
  end
  if gif.start_with?('http://', 'https://')
    begin
      uri = URI.parse(gif)
      unless ['http', 'https'].include?(uri.scheme)
        raise ArgumentError, 'URL deve usar HTTP ou HTTPS'
      end
    rescue URI::InvalidURIError
      raise ArgumentError, 'URL do GIF inválida'
    end
  elsif gif.start_with?('data:image/gif') || gif.start_with?('data:image/')
    unless gif.include?(';base64,')
      raise ArgumentError, 'Formato Base64 inválido. Use: data:image/gif;base64,data...'
    end
  else
    raise ArgumentError, 'GIF deve ser uma URL (http/https) ou Base64 (data:image/gif;base64,...)'
  end
  gif
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
  gif = validate_gif('https://exemplo.com/animacao.gif')
  caption = sanitize_caption('Este é um GIF de exemplo')

  uri = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(instance_id)}/send-gif")

  payload = {
    phone: phone,
    gif: gif
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
    puts "GIF enviado. MessageId: #{result['messageId']}"
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

func validateGif(_ gif: String) throws -> String {
    if gif.isEmpty {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "GIF é obrigatório (URL ou Base64)"])
    }
    if gif.hasPrefix("http://") || gif.hasPrefix("https://") {
        guard let url = URL(string: gif),
              let scheme = url.scheme,
              (scheme == "http" || scheme == "https") else {
            throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "URL do GIF inválida. Deve usar HTTP ou HTTPS"])
        }
    } else if gif.hasPrefix("data:image/gif") || gif.hasPrefix("data:image/") {
        if !gif.contains(";base64,") {
            throw NSError(domain: "ValidationError", code: 4, userInfo: [NSLocalizedDescriptionKey: "Formato Base64 inválido. Use: data:image/gif;base64,data..."])
        }
    } else {
        throw NSError(domain: "ValidationError", code: 5, userInfo: [NSLocalizedDescriptionKey: "GIF deve ser uma URL (http/https) ou Base64 (data:image/gif;base64,...)"])
    }
    return gif
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
    let gif = try validateGif("https://exemplo.com/animacao.gif")
    let caption = try sanitizeCaption("Este é um GIF de exemplo")

    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-gif"
    
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
        "gif": gif
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
                    print("GIF enviado. MessageId: \(messageId)")
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

function Validate-Gif {
    param([string]$Gif)
    if ([string]::IsNullOrWhiteSpace($Gif)) {
        throw "GIF é obrigatório (URL ou Base64)"
    }
    if ($Gif -match '^https?://') {
        try {
            $uri = [System.Uri]$Gif
            if ($uri.Scheme -notin @('http', 'https')) {
                throw "URL deve usar HTTP ou HTTPS"
            }
        } catch {
            throw "URL do GIF inválida"
        }
    }
    elseif ($Gif -match '^data:image/gif|^data:image/') {
        if ($Gif -notmatch ';base64,') {
            throw "Formato Base64 inválido. Use: data:image/gif;base64,data..."
        }
    } else {
        throw "GIF deve ser uma URL (http/https) ou Base64 (data:image/gif;base64,...)"
    }
    return $Gif
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
    $gif = Validate-Gif -Gif "https://exemplo.com/animacao.gif"
    $caption = Sanitize-Caption -Caption "Este é um GIF de exemplo"

    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/send-gif"

    $body = @{
        phone = $phone
        gif = $gif
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

    Write-Host "GIF enviado. MessageId: $($response.messageId)"

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
POST /instances/SUA_INSTANCIA/send-gif HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: SEU_CLIENT_TOKEN
Content-Length: 125

{
 "phone": "5511999999999",
 "gif": "https://exemplo.com/animacao.gif",
 "caption": "Este é um GIF de exemplo"
}
```

**Nota:** Este é um exemplo de requisição HTTP raw. Em produção:
- ⚠️ **SEGURANÇA:** Substitua `SUA_INSTANCIA` e `SEU_CLIENT_TOKEN` por valores reais de variáveis de ambiente
- ⚠️ **SEGURANÇA:** Sempre use HTTPS (não HTTP)
- ⚠️ **Validação:** Valide `phone` (apenas números, 10-15 dígitos), `gif` (URL válida HTTP/HTTPS ou Base64 válido com formato `data:image/gif;base64,...`) e `caption` (máximo 1024 caracteres) antes de enviar

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

std::string validateGif(const std::string& gif) {
    if (gif.empty()) {
        throw std::invalid_argument("GIF é obrigatório (URL ou Base64)");
    }
    std::regex urlPattern("^https?://");
    if (std::regex_search(gif, urlPattern)) {
        // URL válida - validação básica
    } else if (gif.find("data:image/gif") == 0 || gif.find("data:image/") == 0) {
        if (gif.find(";base64,") == std::string::npos) {
            throw std::invalid_argument("Formato Base64 inválido. Use: data:image/gif;base64,data...");
        }
    } else {
        throw std::invalid_argument("GIF deve ser uma URL (http/https) ou Base64 (data:image/gif;base64,...)");
    }
    return gif;
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
        std::string gif = validateGif("https://exemplo.com/animacao.gif");
        std::string caption = sanitizeCaption("Este é um GIF de exemplo");

        std::string url = "https://api.z-api.io/instances/" + instanceId + "/send-gif";
        
        std::string jsonPayload = "{\"phone\":\"" + phone + "\",\"gif\":\"" + gif + "\"";
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
            std::cout << "GIF enviado. Response: " << responseData << std::endl;
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
g++ -o send_gif send_gif.cpp -lcurl
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
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/send-gif", instanceId);

    char jsonPayload[500];
    snprintf(jsonPayload, sizeof(jsonPayload), 
             "{\"phone\":\"%s\",\"gif\":\"https://exemplo.com/animacao.gif\",\"caption\":\"Este é um GIF de exemplo\"}",
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
        printf("GIF enviado. Response: %s\n", responseData);
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
gcc -o send_gif send_gif.c -lcurl
```

</TabItem>
</Tabs>

## <Icon name="AlertTriangle" size="md" /> Limitações e boas práticas {#limitacoes-e-boas-praticas}

- **Tamanho máximo**: 16MB por GIF
- **Formatos suportados**: GIF (`.gif`)
- **Recomendado**: Use GIFs de até 5MB para melhor performance e carregamento rápido
- **Duração**: Recomendado até 10 segundos para melhor experiência do usuário
- **Dimensões**: Recomendado até 1280x720 pixels
- **Legenda**: Máximo de 1024 caracteres
- **URLs**: Devem ser acessíveis publicamente e retornar o GIF diretamente. Evite URLs que exigem autenticação ou redirecionamentos complexos

## <Icon name="Info" size="md" /> Notas importantes {#notas-importantes}

- GIFs são reproduzidos automaticamente no WhatsApp
- Para melhor performance, use URLs ao invés de base64 quando possível, pois URLs são processadas de forma mais eficiente
- GIFs muito grandes podem demorar mais para serem processados e enviados, impactando a experiência do usuário
- Certifique-se de que as URLs de GIF são acessíveis publicamente para que o WhatsApp possa baixá-las
- O WhatsApp pode comprimir GIFs automaticamente para otimizar o envio, o que pode afetar a qualidade final

## <Icon name="ArrowRight" size="md" /> Próximos passos {#proximos-passos}

- [Enviar sticker](/docs/messages/sticker) - Envie stickers do WhatsApp
- [Enviar vídeo](/docs/messages/video) - Envie vídeos com legendas
- [Enviar PTV (Picture-in-Picture Video)](/docs/messages/ptv) - Envie vídeos em modo picture-in-picture
