---
id: audio
title: Enviar Áudio
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Enviar Mensagem de Áudio

Envie mensagens de áudio para se comunicar de forma mais pessoal e direta com seus contatos.

---

## <Icon name="Lightbulb" size="md" /> Casos de Uso Comuns

- **Suporte Personalizado:** Enviar uma mensagem de voz explicando a solução para um problema do cliente.
- **Confirmação de Pedido:** Enviar um áudio de agradecimento personalizado após uma compra.
- **Conteúdo Exclusivo:** Distribuir pílulas de conhecimento ou trechos de um podcast como arquivos de áudio.

---

## <Icon name="Wand2" size="md" /> Para Usuários No-Code

Na sua plataforma de automação, você encontrará os seguintes campos:

### Campos Obrigatórios

1. **`phone`**: O número do contato que receberá o áudio. Use o formato completo: DDI + DDD + Número (ex: `5511999999999`).
2. **`audio`**: O campo onde você colará a **URL pública** do seu arquivo de áudio. A URL deve estar acessível publicamente na internet.

### Campos Opcionais

3. **`messageId`**: Se você quer responder uma mensagem específica, cole aqui o `messageId` da mensagem original. Isso cria uma conversa encadeada no WhatsApp.

4. **`delayMessage`**: Se você vai enviar vários áudios seguidos, use este campo para espaçar o envio (entre 1 e 15 segundos). Isso ajuda a evitar bloqueios e torna a comunicação mais natural.

5. **`delayTyping`**: Use este campo para controlar quanto tempo o status "Gravando áudio..." ficará visível antes do envio (entre 1 e 15 segundos). Útil para simular o tempo de gravação de uma mensagem de voz real.

6. **`viewOnce`**: Marque como `true` se quiser que o áudio desapareça após ser ouvido (áudio que some). Útil para áudios sensíveis ou temporários.

7. **`async`**: Marque como `true` se o áudio for muito grande e você quiser que a requisição responda imediatamente, processando o envio em segundo plano. O status do envio será notificado via webhook.

8. **`waveform`**: Marque como `true` para mostrar as ondas sonoras na interface do WhatsApp (padrão). Deixe `false` se não quiser mostrar as ondas.

**Dica:** Na maioria dos casos, você só precisa preencher `phone` e `audio`. Os outros campos são opcionais e podem ser deixados em branco.

---

## <Icon name="Code" size="md" /> Para Desenvolvedores

Para enviar um áudio, faça uma requisição `POST` para o endpoint abaixo.

### Endpoint

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video
```

### Corpo da Requisição

**Exemplo mínimo:**

```json
{
  "phone": "5511999999999",
  "audio": "https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3"
}
```

**Exemplo completo (com todos os parâmetros opcionais):**

```json
{
  "phone": "5511999999999",
  "audio": "https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3",
  "messageId": "3EB0C767F26A",
  "delayMessage": 3,
  "delayTyping": 2,
  "viewOnce": false,
  "async": false,
  "waveform": true
}
```

### Parâmetros

#### Parâmetros Obrigatórios

| Campo | Tipo | Obrigatório | Descrição |
|:------ |:------ |:---------- |:----------------------------------------------------------------------- |
| `phone` | string | Sim | O número do destinatário no formato DDI + DDD + NÚMERO. |
| `audio` | string | Sim | A URL pública do arquivo de áudio. O uso de Base64 não é recomendado. |

#### Parâmetros Opcionais

| Campo | Tipo | Obrigatório | Descrição |
|:------ |:------ |:---------- |:----------------------------------------------------------------------- |
| `messageId` | string | Não | Permite responder uma mensagem existente no chat, criando uma conversa encadeada. Use o `messageId` da mensagem que você quer responder. Veja mais sobre [como responder mensagens](./responder). |
| `delayMessage` | number | Não | Controla o tempo de espera (em segundos) antes de enviar a próxima mensagem. Valores entre 1 e 15 segundos. Se não informado, o sistema usa um delay automático de 1 a 3 segundos. Útil ao enviar múltiplas mensagens em sequência para evitar bloqueios. |
| `delayTyping` | number | Não | Controla o tempo (em segundos) que o status "Gravando áudio..." ficará visível antes do envio. Valores entre 1 e 15 segundos. Padrão: `0` (sem delay). Útil para tornar a comunicação mais natural, simulando o tempo de gravação de uma mensagem de voz real. |
| `viewOnce` | boolean | Não | Define se o áudio será uma mensagem de visualização única (áudio que desaparece após ser ouvido). Padrão: `false` (áudio normal, permanece no chat). Uma vez ouvido, o áudio não pode ser reproduzido novamente pelo destinatário. |
| `async` | boolean | Não | Se ativo (`true`), a requisição responderá imediatamente com sucesso e o processamento do arquivo será realizado em segundo plano. O envio pode ser verificado através do [webhook de envio](../webhooks/ao-enviar). Útil para áudios grandes que podem demorar para processar. |
| `waveform` | boolean | Não | Define se o áudio será enviado com visualização de ondas sonoras (waveform). Padrão: `true`. Quando `true`, mostra as ondas sonoras na interface do WhatsApp, tornando a mensagem mais visual e atrativa. |

---

## <Icon name="Shield" size="md" /> Boas Práticas e Limites

- **Tamanho Máximo:** O WhatsApp limita o envio de áudios a **16MB**.
- **Formatos Suportados:** MP3, OGG, AMR, M4A.
- **URLs Públicas:** Certifique-se de que o link do áudio esteja acessível publicamente.

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
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateAudioUrl(audioUrl) {
  if (!audioUrl || typeof audioUrl !== 'string') {
    throw new Error('URL do áudio é obrigatória');
  }
  try {
    const url = new URL(audioUrl);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      throw new Error('URL deve usar HTTP ou HTTPS');
    }
  } catch (e) {
    throw new Error('URL do áudio inválida');
  }
  return audioUrl;
}

// Dados do áudio com validação
const audioData = {
  phone: validatePhoneNumber('5511999999999'),
  audio: validateAudioUrl('https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3'),
};

// Enviar requisição com tratamento seguro de erros
async function sendAudio() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-audio`;
    
    const response = await fetch(url, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(audioData),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Áudio enviado com sucesso. MessageId:', result.messageId);
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar áudio:', error.message);
    throw error;
  }
}

// Executar função
sendAudio();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// Tipos para melhor type safety
interface SendAudioRequest {
  phone: string;
  audio: string;
}

interface SendAudioResponse {
  messageId: string;
  status: string;
}

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
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

function validateAudioUrl(audioUrl: string): string {
  if (!audioUrl) {
    throw new Error('URL do áudio é obrigatória');
  }
  try {
    const url = new URL(audioUrl);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      throw new Error('URL deve usar HTTP ou HTTPS');
    }
  } catch {
    throw new Error('URL do áudio inválida');
  }
  return audioUrl;
}

// Dados do áudio com validação
const audioData: SendAudioRequest = {
  phone: validatePhoneNumber('5511999999999'),
  audio: validateAudioUrl('https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3'),
};

// Função para enviar áudio
async function sendAudio(): Promise<SendAudioResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-audio`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(audioData),
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
sendAudio()
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
INSTANCE_TOKEN = os.getenv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN")
CLIENT_TOKEN = os.getenv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

# Validação de entrada (segurança)
def validate_phone_number(phone: str) -> str:
    """Valida e sanitiza número de telefone."""
    cleaned = re.sub(r'\D', '', phone)
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError("Número de telefone inválido. Use formato: DDI + DDD + Número")
    return cleaned

def validate_audio_url(audio_url: str) -> str:
    """Valida URL do áudio."""
    if not audio_url:
        raise ValueError("URL do áudio é obrigatória")
    try:
        parsed = urlparse(audio_url)
        if parsed.scheme not in ['http', 'https']:
            raise ValueError("URL deve usar HTTP ou HTTPS")
    except Exception:
        raise ValueError("URL do áudio inválida")
    return audio_url

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-audio"

# Dados do áudio com validação
try:
    payload: Dict[str, Any] = {
        "phone": validate_phone_number("5511999999999"),
        "audio": validate_audio_url("https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3")
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
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    print(f"Áudio enviado. MessageId: {result.get('messageId')}")
    
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
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCE_ID}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_INSTANCE_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-SEU_CLIENT_TOKEN}"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
PHONE="5511999999999"
AUDIO_URL="https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3"

# Enviar áudio via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-audio" \
 -H 'Content-Type: application/json' \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"audio\": \"${AUDIO_URL}\"
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

function validateAudioUrl(audioUrl) {
  if (!audioUrl) {
    throw new Error('URL do áudio é obrigatória');
  }
  try {
    const url = new URL(audioUrl);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      throw new Error('URL deve usar HTTP ou HTTPS');
    }
  } catch (e) {
    throw new Error('URL do áudio inválida');
  }
  return audioUrl;
}

// Dados do áudio com validação
const audioData = {
  phone: validatePhoneNumber('5511999999999'),
  audio: validateAudioUrl('https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3'),
};

// Enviar requisição
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-audio`);
const postData = JSON.stringify(audioData);

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
      // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
      console.log('Áudio enviado. MessageId:', result.messageId);
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

function validateAudioUrl(audioUrl) {
  if (!audioUrl) {
    throw new Error('URL do áudio é obrigatória');
  }
  try {
    const url = new URL(audioUrl);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      throw new Error('URL deve usar HTTP ou HTTPS');
    }
  } catch (e) {
    throw new Error('URL do áudio inválida');
  }
  return audioUrl;
}

// Rota para enviar áudio
app.post('/send-audio', async (req, res) => {
  try {
    // Dados do áudio com validação
    const rawPhone = req.body.phone || '5511999999999';
    const rawAudio = req.body.audio || 'https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3';

    const audioData = {
      phone: validatePhoneNumber(rawPhone),
      audio: validateAudioUrl(rawAudio),
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-audio`);
    const postData = JSON.stringify(audioData);

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
    console.error('Erro ao enviar áudio:', error.message);
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

function validateAudioUrl(audioUrl) {
  if (!audioUrl) {
    throw new Error('URL do áudio é obrigatória');
  }
  try {
    const url = new URL(audioUrl);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      throw new Error('URL deve usar HTTP ou HTTPS');
    }
  } catch (e) {
    throw new Error('URL do áudio inválida');
  }
  return audioUrl;
}

// Rota para enviar áudio
router.post('/send-audio', async (ctx) => {
  try {
    // Dados do áudio com validação
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const rawAudio = ctx.request.body.audio || 'https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3';

    const audioData = {
      phone: validatePhoneNumber(rawPhone),
      audio: validateAudioUrl(rawAudio),
    };

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-audio`);
    const postData = JSON.stringify(audioData);

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
  console.error('Erro ao enviar áudio:', err.message);
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

public class SendAudio {
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

    private static String validateAudioUrl(String audioUrl) {
        if (audioUrl == null || audioUrl.trim().isEmpty()) {
            throw new IllegalArgumentException("URL do áudio é obrigatória");
        }
        try {
            URL url = new URL(audioUrl);
            String protocol = url.getProtocol();
            if (!protocol.equals("http") && !protocol.equals("https")) {
                throw new IllegalArgumentException("URL deve usar HTTP ou HTTPS");
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("URL do áudio inválida");
        }
        return audioUrl;
    }

    public static void main(String[] args) {
        try {
            // Dados do áudio com validação
            String phone = validatePhoneNumber("5511999999999");
            String audioUrl = validateAudioUrl("https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-audio",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);

            // Criar JSON payload
            String jsonInputString = String.format(
                "{\"phone\":\"%s\",\"audio\":\"%s\"}",
                phone.replace("\"", "\\\""),
                audioUrl.replace("\"", "\\\"")
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
                    System.out.println("Áudio enviado. Response: " + response.toString());
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
using System.Text.RegularExpressions;

class SendAudio
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
        string cleaned = Regex.Replace(phone, @"\D", "");
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("Número de telefone inválido. Use formato: DDI + DDD + Número");
        }
        return cleaned;
    }

    private static string ValidateAudioUrl(string audioUrl)
    {
        if (string.IsNullOrWhiteSpace(audioUrl))
        {
            throw new ArgumentException("URL do áudio é obrigatória");
        }
        if (!Uri.TryCreate(audioUrl, UriKind.Absolute, out Uri? uri) || 
            (uri.Scheme != "http" && uri.Scheme != "https"))
        {
            throw new ArgumentException("URL do áudio inválida. Deve usar HTTP ou HTTPS");
        }
        return audioUrl;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // Dados do áudio com validação
            string phone = ValidatePhoneNumber("5511999999999");
            string audioUrl = ValidateAudioUrl("https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-audio";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);

                var payload = new
                {
                    phone = phone,
                    audio = audioUrl
                };

                string json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                content.Headers.Add("Client-Token", ClientToken);

                HttpResponseMessage response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine($"Áudio enviado. Response: {result}");
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

func validateAudioUrl(audioUrl string) (string, error) {
    if audioUrl == "" {
        return "", fmt.Errorf("URL do áudio é obrigatória")
    }
    parsed, err := url.Parse(audioUrl)
    if err != nil {
        return "", fmt.Errorf("URL do áudio inválida")
    }
    if parsed.Scheme != "http" && parsed.Scheme != "https" {
        return "", fmt.Errorf("URL deve usar HTTP ou HTTPS")
    }
    return audioUrl, nil
}

func main() {
    instanceId := getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
    instanceToken := getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN")
    clientToken := getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

    // Dados do áudio com validação
    phone, err := validatePhoneNumber("5511999999999")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    audioUrl, err := validateAudioUrl("https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    baseURL := fmt.Sprintf(
        "https://api.z-api.io/instances/%s/token/%s/send-audio",
        url.QueryEscape(instanceId),
        url.QueryEscape(instanceToken),
    )

    payload := map[string]interface{}{
        "phone": phone,
        "audio": audioUrl,
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
            fmt.Printf("Áudio enviado. MessageId: %v\n", result["messageId"])
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

function validateAudioUrl($audioUrl) {
    if (empty($audioUrl)) {
        throw new InvalidArgumentException('URL do áudio é obrigatória');
    }
    $parsed = parse_url($audioUrl);
    if ($parsed === false || !in_array($parsed['scheme'] ?? '', ['http', 'https'])) {
        throw new InvalidArgumentException('URL do áudio inválida. Deve usar HTTP ou HTTPS');
    }
    return $audioUrl;
}

try {
    // Dados do áudio com validação
    $phone = validatePhoneNumber('5511999999999');
    $audioUrl = validateAudioUrl('https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-audio',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'audio' => $audioUrl,
    ];

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Client-Token: ' . $clientToken
        ],
        CURLOPT_POSTFIELDS => json_encode($payload),
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
        echo "Áudio enviado. MessageId: " . $result['messageId'] . "\n";
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

def validate_audio_url(audio_url)
  if audio_url.nil? || audio_url.strip.empty?
    raise ArgumentError, 'URL do áudio é obrigatória'
  end
  begin
    uri = URI.parse(audio_url)
    unless ['http', 'https'].include?(uri.scheme)
      raise ArgumentError, 'URL deve usar HTTP ou HTTPS'
    end
  rescue URI::InvalidURIError
    raise ArgumentError, 'URL do áudio inválida'
  end
  audio_url
end

begin
  # Dados do áudio com validação
  phone = validate_phone_number('5511999999999')
  audio_url = validate_audio_url('https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(instance_id)}/token/#{URI.encode_www_form_component(instance_token)}/send-audio")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER # ⚠️ SEGURANÇA: Sempre verifique certificados SSL
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = JSON.generate({
    phone: phone,
    audio: audio_url
  })

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    puts "Áudio enviado. MessageId: #{result['messageId']}"
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

func validateAudioUrl(_ audioUrl: String) throws -> String {
    guard let url = URL(string: audioUrl),
          let scheme = url.scheme,
          (scheme == "http" || scheme == "https") else {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "URL do áudio inválida. Deve usar HTTP ou HTTPS"])
    }
    return audioUrl
}

// Dados do áudio com validação
// Dados do áudio com validação
do {
    let phone = try validatePhoneNumber("5511999999999")
    let audioUrl = try validateAudioUrl("https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-audio"
    
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
        "audio": audioUrl
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
                    print("Áudio enviado. MessageId: \(messageId)")
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

function Validate-AudioUrl {
    param([string]$AudioUrl)
    if ([string]::IsNullOrWhiteSpace($AudioUrl)) {
        throw "URL do áudio é obrigatória"
    }
    try {
        $uri = [System.Uri]$AudioUrl
        if ($uri.Scheme -notin @('http', 'https')) {
            throw "URL deve usar HTTP ou HTTPS"
        }
    } catch {
        throw "URL do áudio inválida"
    }
    return $AudioUrl
}

try {
    # Dados do áudio com validação
    $phone = Validate-PhoneNumber -Phone "5511999999999"
    $audioUrl = Validate-AudioUrl -AudioUrl "https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-audio"

    $body = @{
        phone = $phone
        audio = $audioUrl
    } | ConvertTo-Json

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Body $body -Headers $headers -TimeoutSec 30 -ErrorAction Stop

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    Write-Host "Áudio enviado. MessageId: $($response.messageId)"

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
POST /instances/SUA_INSTANCIA/token/SEU_TOKEN/send-audio HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: SEU_CLIENT_TOKEN
Content-Length: 145

{
 "phone": "5511999999999",
 "audio": "https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3"
}
```

**Nota:** Este é um exemplo de requisição HTTP raw. Em produção:
- ⚠️ **SEGURANÇA:** Substitua `SUA_INSTANCIA`, `SEU_TOKEN` e `SEU_CLIENT_TOKEN` por valores reais de variáveis de ambiente
- ⚠️ **SEGURANÇA:** Sempre use HTTPS (não HTTP)
- ⚠️ **Validação:** Valide `phone` (apenas números, 10-15 dígitos) e `audio` (URL válida HTTP/HTTPS) antes de enviar

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
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

std::string validateAudioUrl(const std::string& audioUrl) {
    if (audioUrl.empty()) {
        throw std::invalid_argument("URL do áudio é obrigatória");
    }
    std::regex urlPattern("^https?://");
    if (!std::regex_search(audioUrl, urlPattern)) {
        throw std::invalid_argument("URL do áudio inválida. Deve usar HTTP ou HTTPS");
    }
    return audioUrl;
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

        // Dados do áudio com validação
        std::string phone = validatePhoneNumber("5511999999999");
        std::string audioUrl = validateAudioUrl("https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3");

        // ⚠️ SEGURANÇA: Sempre use HTTPS
        std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-audio";
        
        // Criar payload JSON
        std::string jsonPayload = "{\"phone\":\"" + phone + "\",\"audio\":\"" + audioUrl + "\"}";

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
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L); // ⚠️ SEGURANÇA: Verificar certificados SSL

        CURLcode res = curl_easy_perform(curl);
        long responseCode = 0;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            std::cout << "Áudio enviado. Response: " << responseData << std::endl;
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
g++ -o send_audio send_audio.cpp -lcurl
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

int validateAudioUrl(const char* audioUrl) {
    if (audioUrl == NULL || strlen(audioUrl) == 0) {
        return 0; // Inválido
    }
    // Verifica se começa com http:// ou https://
    if (strncmp(audioUrl, "http://", 7) != 0 && strncmp(audioUrl, "https://", 8) != 0) {
        return 0; // Inválido
    }
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

    // Dados do áudio com validação
    char phone[20];
    if (!validatePhoneNumber("5511999999999", phone)) {
        fprintf(stderr, "Erro de validação: Número de telefone inválido\n");
        return 1;
    }

    const char* audioUrl = "https://file-examples.com/storage/fe23538c64c72834015694b/2017/11/file_example_MP3_700KB.mp3";
    if (!validateAudioUrl(audioUrl)) {
        fprintf(stderr, "Erro de validação: URL do áudio inválida\n");
        return 1;
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-audio", 
             instanceId, instanceToken);

    // Criar payload JSON
    char jsonPayload[1024];
    snprintf(jsonPayload, sizeof(jsonPayload), 
             "{\"phone\":\"%s\",\"audio\":\"%s\"}", 
             phone, audioUrl);

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
    curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L); // ⚠️ SEGURANÇA: Verificar certificados SSL

    CURLcode res = curl_easy_perform(curl);
    long responseCode = 0;
    curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

    if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        printf("Áudio enviado. Response: %s\n", responseData);
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
gcc -o send_audio send_audio.c -lcurl
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Resposta da API

Se a sua requisição for bem-sucedida, você receberá a seguinte resposta:

### Sucesso (200 OK)

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "3EB0C767F26A",
  "id": "3EB0C767F26A"
}
```

| Campo | Tipo | Descrição |
|:------|:-----|:----------|
| `zaapId` | string | ID único da mensagem no sistema Z-API (para rastreamento interno) |
| `messageId` | string | ID único da mensagem no WhatsApp. **Guarde este ID!** Use-o para rastrear o status da entrega através dos webhooks |
| `id` | string | ID de compatibilidade com Zapier e sistemas legados. Tem o mesmo valor do `messageId` |

**Importante:**

- O `messageId` é o identificador principal que você deve usar para rastrear a mensagem
- O `zaapId` é usado internamente pelo Z-API para processamento
- O `id` existe apenas para compatibilidade com integrações legadas (como Zapier)

**Rastreamento de Entrega:**

Para saber quando a mensagem foi entregue, lida ou se houve algum erro, configure um webhook e monitore os eventos. Veja mais sobre [webhooks de mensagens recebidas](../webhooks/ao-receber).

**Nota sobre `async: true`:**

Se você usou o parâmetro `async: true`, a resposta será imediata, mas o processamento do áudio acontecerá em segundo plano. O status do envio será notificado através do [webhook de envio](../webhooks/ao-enviar).
