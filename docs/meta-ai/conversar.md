---
id: conversar
title: Conversar com Meta AI
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MessageSquare" size="lg" /> Conversar com Meta AI

Interaja diretamente com a Meta AI no WhatsApp através do Z-API, enviando mensagens de texto para obter respostas automatizadas e contextuais.

---

:::warning Atenção

Atualmente, a Meta AI no Z-API suporta **apenas mensagens em texto**. Isso significa que áudio, documentos, imagens e outros arquivos multimídia não são compatíveis nesta integração. Portanto, é necessário que apenas mensagens de texto sejam enviadas para garantir o funcionamento correto.

Além disso, esse recurso está disponível **apenas para contas pessoais** do WhatsApp, ou seja, não é acessível para contas business.

:::

---

## Casos de Uso Comuns

- **Assistentes Virtuais**: Crie assistentes inteligentes para atendimento ao cliente
- **Pesquisas Rápidas**: Realize pesquisas diretamente no WhatsApp sem abrir navegadores
- **Geração de Imagens**: Use a funcionalidade "Imagine" para criar imagens a partir de descrições textuais
- **Sugestões Personalizadas**: Receba recomendações de restaurantes, locais de viagem e atividades

---

## Para Usuários No-Code

Se você está usando uma plataforma de automação como n8n ou Make, use o endpoint `/send-text` com o número `13135550002` para interagir com a Meta AI.

---

## Para Desenvolvedores

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text
```

### <Icon name="Info" size="sm" /> Conceituação {#conceituacao}

Este método permite a interação direta com a Meta AI no WhatsApp através do Z-API, facilitando o envio de mensagens de texto para obter respostas automatizadas e contextuais.

Com ele, é possível enviar perguntas e comandos à Meta AI em conversas privadas, direcionando as mensagens ao número exclusivo **13135550002**, ou incluir a IA em grupos utilizando o ID do grupo como destinatário.

### Como Usar

Para começar a usar a Meta AI com o Z-API basta enviar uma mensagem de texto ao número da Meta AI **`13135550002`** utilizando o endpoint [`/send-text`](/docs/messages/texto-simples).

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Corpo da Requisição

**Conversar no chat privado**

```json
{
  "phone": "13135550002",
  "message": "Olá, Meta AI! Gostaria de saber sobre..."
}
```

**Conversar em grupos**

```json
{
  "phone": "5511999999999-group",
  "message": "@13135550002 Olá, Meta AI! Gostaria de saber sobre...",
  "mentioned": [13135550002]
}
```

### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `phone` | string | Para chat privado com a IA, use **13135550002**; para grupo, use o ID do grupo |
| `message` | string | Texto a ser enviado |

### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `delayMessage` | number | Delay em segundos (1~15 seg). O delay default caso não seja informado é de 1~3 seg |
| `delayTyping` | number | Delay em segundos para status "Digitando..." (1~15 sec). O delay default caso não seja informado é de 0 |
| `mentioned` | array | Necessário passar o número `13135550002` caso deseje acionar a Meta AI em um grupo |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

### Conversar no Chat Privado

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Número da Meta AI (fixo para chat privado)
const META_AI_PHONE = '13135550002';

// Validação de entrada (segurança)
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
const rawMessage = 'Olá, Meta AI! Gostaria de saber sobre...';

const messageData = {
  phone: META_AI_PHONE,
  message: sanitizeMessage(rawMessage),
};

// Enviar mensagem para Meta AI com tratamento seguro de erros
async function sendToMetaAI() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Mensagem enviada para Meta AI. MessageId:', result.messageId);
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao enviar mensagem para Meta AI:', error.message);
    throw error;
  }
}

// Executar função
sendToMetaAI();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Número da Meta AI (fixo para chat privado)
const META_AI_PHONE = '13135550002';

// Interface para resposta
interface MetaAIResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

// Validação de entrada
function sanitizeMessage(message: string): string {
  if (!message || message.trim().length === 0) {
    throw new Error('Mensagem não pode estar vazia');
  }
  if (message.length > 4096) {
    throw new Error('Mensagem excede limite de 4096 caracteres');
  }
  return message.trim();
}

// Função para enviar mensagem para Meta AI
async function sendToMetaAI(message: string): Promise<MetaAIResponse> {
  // Validação de entrada
  const sanitizedMessage = sanitizeMessage(message);

  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Client-Token': clientToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone: META_AI_PHONE,
      message: sanitizedMessage,
    }),
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
sendToMetaAI('Olá, Meta AI! Gostaria de saber sobre...')
  .then((result) => console.log('Sucesso. MessageId:', result.messageId))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import requests
from typing import Dict, Any

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'SEU_CLIENT_TOKEN')

# Número da Meta AI (fixo para chat privado)
META_AI_PHONE = '13135550002'

def sanitize_message(message: str) -> str:
    """Valida e sanitiza mensagem."""
    if not message or not message.strip():
        raise ValueError('Mensagem não pode estar vazia')
    if len(message) > 4096:
        raise ValueError('Mensagem excede limite de 4096 caracteres')
    return message.strip()

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-text"

# Dados da mensagem com validação
try:
    payload: Dict[str, str] = {
        "phone": META_AI_PHONE,
        "message": sanitize_message("Olá, Meta AI! Gostaria de saber sobre...")
    }
except ValueError as e:
    print(f"Erro de validação: {e}")
    exit(1)

# Headers obrigatórios
headers = {
    "Client-Token": CLIENT_TOKEN,
    "Content-Type": "application/json"
}

# Enviar mensagem para Meta AI com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    print(f'Mensagem enviada para Meta AI. MessageId: {result.get("messageId")}')
    
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
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-SEU_CLIENT_TOKEN}"

# Número da Meta AI (fixo para chat privado)
META_AI_PHONE="13135550002"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Enviar mensagem para Meta AI via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-text" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"phone\": \"${META_AI_PHONE}\",
    \"message\": \"Olá, Meta AI! Gostaria de saber sobre...\"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN META_AI_PHONE
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');
const { URL } = require('url');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Número da Meta AI (fixo para chat privado)
const META_AI_PHONE = '13135550002';

// Validação de entrada (segurança)
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
  phone: META_AI_PHONE,
  message: sanitizeMessage('Olá, Meta AI! Gostaria de saber sobre...'),
};

// Enviar mensagem para Meta AI
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
      console.log('Mensagem enviada para Meta AI. MessageId:', result.messageId);
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Número da Meta AI (fixo para chat privado)
const META_AI_PHONE = '13135550002';

// Validação de entrada (segurança)
function sanitizeMessage(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('Mensagem deve ser uma string não vazia');
  }
  if (message.length > 4096) {
    throw new Error('Mensagem excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Rota para enviar mensagem para Meta AI
app.post('/meta-ai/chat', async (req, res) => {
  try {
    // Dados da mensagem com validação
    const rawMessage = req.body.message || 'Olá, Meta AI! Gostaria de saber sobre...';

    const messageData = {
      phone: META_AI_PHONE,
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
              resolve({ success: true, data: parsed });
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
    console.error('Erro ao enviar mensagem para Meta AI:', error.message);
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Número da Meta AI (fixo para chat privado)
const META_AI_PHONE = '13135550002';

// Middleware para parsing JSON
app.use(require('koa-bodyparser')());

// Validação de entrada (segurança)
function sanitizeMessage(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('Mensagem deve ser uma string não vazia');
  }
  if (message.length > 4096) {
    throw new Error('Mensagem excede o limite de 4096 caracteres');
  }
  return message.trim();
}

// Rota para enviar mensagem para Meta AI
router.post('/meta-ai/chat', async (ctx) => {
  try {
    // Dados da mensagem com validação
    const rawMessage = ctx.request.body.message || 'Olá, Meta AI! Gostaria de saber sobre...';

    const messageData = {
      phone: META_AI_PHONE,
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
              resolve({ success: true, data: parsed });
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
  console.error('Erro ao enviar mensagem para Meta AI:', err.message);
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
import org.json.JSONObject;

public class SendToMetaAI {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";
    
    // Número da Meta AI (fixo para chat privado)
    private static final String META_AI_PHONE = "13135550002";

    // Validação de entrada (segurança)
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
            String message = sanitizeMessage("Olá, Meta AI! Gostaria de saber sobre...");

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
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);

            // Body da requisição
            JSONObject jsonBody = new JSONObject();
            jsonBody.put("phone", META_AI_PHONE);
            jsonBody.put("message", message);
            
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonBody.toString().getBytes(StandardCharsets.UTF_8);
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
                    System.out.println("Mensagem enviada para Meta AI com sucesso");
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
using System.Threading.Tasks;
using System.Text.Json;

public class SendToMetaAI
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") 
        ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") 
        ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") 
        ?? "SEU_CLIENT_TOKEN";
    
    // Número da Meta AI (fixo para chat privado)
    private static readonly string MetaAIPhone = "13135550002";

    // Validação de entrada (segurança)
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

    public static async Task Main(string[] args)
    {
        try
        {
            // Dados da mensagem com validação
            string message = SanitizeMessage("Olá, Meta AI! Gostaria de saber sobre...");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-text";

            var payload = new
            {
                phone = MetaAIPhone,
                message = message
            };

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine("Mensagem enviada para Meta AI com sucesso");
                }
                else
                {
                    // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
                    Console.WriteLine($"Erro HTTP {(int)response.StatusCode}: Requisição falhou");
                }
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro: {e.Message}");
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
    "strings"
    "time"
)

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
var (
    instanceId    = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA")
    instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN")
    clientToken   = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")
    metaAIPhone   = "13135550002" // Número da Meta AI (fixo para chat privado)
)

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

// Validação de entrada (segurança)
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
    // Dados da mensagem com validação
    message, err := sanitizeMessage("Olá, Meta AI! Gostaria de saber sobre...")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-text",
        instanceId, instanceToken)

    payload := map[string]interface{}{
        "phone":   metaAIPhone,
        "message": message,
    }

    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Erro ao criar JSON: %v\n", err)
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

    req.Header.Set("Client-Token", clientToken)
    req.Header.Set("Content-Type", "application/json")

    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro ao fazer requisição: %v\n", err)
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
            fmt.Printf("Erro ao processar JSON: %v\n", err)
            return
        }

        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        fmt.Println("Mensagem enviada para Meta AI com sucesso")
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
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCIA';
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'SEU_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'SEU_CLIENT_TOKEN';

// Número da Meta AI (fixo para chat privado)
$metaAIPhone = '13135550002';

// Validação de entrada (segurança)
function sanitizeMessage($message) {
    if (empty(trim($message))) {
        throw new Exception('Mensagem não pode estar vazia');
    }
    if (strlen($message) > 4096) {
        throw new Exception('Mensagem excede limite de 4096 caracteres');
    }
    return trim($message);
}

try {
    // Dados da mensagem com validação
    $message = sanitizeMessage('Olá, Meta AI! Gostaria de saber sobre...');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-text',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $jsonBody = json_encode([
        'phone' => $metaAIPhone,
        'message' => $message
    ]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonBody);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Client-Token: ' . $clientToken,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        echo "Mensagem enviada para Meta AI com sucesso\n";
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
require 'uri'
require 'json'
require 'openssl'

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCIA'
INSTANCE_TOKEN = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_TOKEN'
CLIENT_TOKEN = ENV['ZAPI_CLIENT_TOKEN'] || 'SEU_CLIENT_TOKEN'

# Número da Meta AI (fixo para chat privado)
META_AI_PHONE = '13135550002'

# Validação de entrada (segurança)
def sanitize_message(message)
  trimmed = message.to_s.strip
  if trimmed.empty?
    raise 'Mensagem não pode estar vazia'
  end
  if trimmed.length > 4096
    raise 'Mensagem excede limite de 4096 caracteres'
  end
  trimmed
end

begin
  # Dados da mensagem com validação
  message = sanitize_message('Olá, Meta AI! Gostaria de saber sobre...')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(INSTANCE_ID)}/token/#{URI.encode_www_form_component(INSTANCE_TOKEN)}/send-text")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url)
  request.body = {
    phone: META_AI_PHONE,
    message: message
  }.to_json
  request['Client-Token'] = CLIENT_TOKEN
  request['Content-Type'] = 'application/json'

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    puts 'Mensagem enviada para Meta AI com sucesso'
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
let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCIA"
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "SEU_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "SEU_CLIENT_TOKEN"

// Número da Meta AI (fixo para chat privado)
let metaAIPhone = "13135550002"

// Validação de entrada (segurança)
func sanitizeMessage(_ message: String) throws -> String {
    let trimmed = message.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmed.isEmpty {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Mensagem não pode estar vazia"])
    }
    if trimmed.count > 4096 {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Mensagem excede limite de 4096 caracteres"])
    }
    return trimmed
}

// Dados da mensagem com validação
do {
    let message = try sanitizeMessage("Olá, Meta AI! Gostaria de saber sobre...")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-text"
    
    guard let url = URL(string: urlString) else {
        fatalError("URL inválida")
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"

    let payload: [String: Any] = [
        "phone": metaAIPhone,
        "message": message
    ]

    request.httpBody = try JSONSerialization.data(withJSONObject: payload)
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.timeoutInterval = 30

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Erro: \(error.localizedDescription)")
            return
        }
        
        guard let httpResponse = response as? HTTPURLResponse else { return }
        
        if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
            if let data = data {
                do {
                    let result = try JSONSerialization.jsonObject(with: data) as? [String: Any]
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    print("Mensagem enviada para Meta AI com sucesso")
                } catch {
                    print("Erro ao processar JSON: \(error.localizedDescription)")
                }
            }
        } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            print("Erro HTTP \(httpResponse.statusCode): Requisição falhou")
        }
    }

    task.resume()
} catch {
    print("Erro de validação: \(error.localizedDescription)")
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCIA" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "SEU_CLIENT_TOKEN" }

# Número da Meta AI (fixo para chat privado)
$metaAIPhone = "13135550002"

# Validação de entrada (segurança)
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
    $message = Sanitize-Message -Message "Olá, Meta AI! Gostaria de saber sobre..."

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-text"

    $payload = @{
        phone = $metaAIPhone
        message = $message
    } | ConvertTo-Json

    $headers = @{
        "Client-Token" = $clientToken
        "Content-Type" = "application/json"
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $payload -TimeoutSec 30

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    Write-Host "Mensagem enviada para Meta AI com sucesso"
} catch {
    # ⚠️ SEGURANÇA: Tratamento genérico de erro
    Write-Host "Erro: $($_.Exception.Message)"
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text HTTP/1.1
Host: api.z-api.io
Client-Token: SEU_CLIENT_TOKEN
Content-Type: application/json

{
  "phone": "13135550002",
  "message": "Olá, Meta AI! Gostaria de saber sobre..."
}
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <curl/curl.h>
#include <sstream>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const std::string& key, const std::string& defaultValue) {
    const char* value = std::getenv(key.c_str());
    return value ? value : defaultValue;
}

std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
std::string instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

// Número da Meta AI (fixo para chat privado)
std::string metaAIPhone = "13135550002";

static size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

int main() {
    // Dados da mensagem
    std::string message = "Olá, Meta AI! Gostaria de saber sobre...";

    // Body da requisição
    std::ostringstream jsonBody;
    jsonBody << "{\"phone\":\"" << metaAIPhone << "\",\"message\":\"" << message << "\"}";

    CURL* curl = curl_easy_init();
    if (curl) {
        std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-text";
        std::string responseData;
        std::string bodyStr = jsonBody.str();

        struct curl_slist* headers = NULL;
        std::string tokenHeader = "Client-Token: " + clientToken;
        std::string contentTypeHeader = "Content-Type: application/json";
        headers = curl_slist_append(headers, tokenHeader.c_str());
        headers = curl_slist_append(headers, contentTypeHeader.c_str());

        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POST, 1L);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, bodyStr.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

        CURLcode res = curl_easy_perform(curl);
        long responseCode;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            std::cout << "Mensagem enviada para Meta AI com sucesso" << std::endl;
        } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            std::cerr << "Erro HTTP " << responseCode << ": Requisição falhou" << std::endl;
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

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
char* instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

// Número da Meta AI (fixo para chat privado)
const char* metaAIPhone = "13135550002";

struct MemoryStruct {
    char* memory;
    size_t size;
};

static size_t WriteMemoryCallback(void* contents, size_t size, size_t nmemb, void* userp) {
    size_t realsize = size * nmemb;
    struct MemoryStruct* mem = (struct MemoryStruct*)userp;

    char* ptr = realloc(mem->memory, mem->size + realsize + 1);
    if (!ptr) {
        return 0;
    }

    mem->memory = ptr;
    memcpy(&(mem->memory[mem->size]), contents, realsize);
    mem->size += realsize;
    mem->memory[mem->size] = 0;

    return realsize;
}

int main() {
    // Body da requisição
    const char* message = "Olá, Meta AI! Gostaria de saber sobre...";
    char jsonBody[512];
    snprintf(jsonBody, sizeof(jsonBody), "{\"phone\":\"%s\",\"message\":\"%s\"}", metaAIPhone, message);

    CURL* curl = curl_easy_init();
    if (curl) {
        char url[512];
        snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-text",
                 instanceId, instanceToken);

        struct curl_slist* headers = NULL;
        char tokenHeader[256];
        char contentTypeHeader[] = "Content-Type: application/json";
        snprintf(tokenHeader, sizeof(tokenHeader), "Client-Token: %s", clientToken);
        headers = curl_slist_append(headers, tokenHeader);
        headers = curl_slist_append(headers, contentTypeHeader);

        struct MemoryStruct chunk;
        chunk.memory = malloc(1);
        chunk.size = 0;

        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_POST, 1L);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonBody);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteMemoryCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, (void*)&chunk);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

        CURLcode res = curl_easy_perform(curl);
        long responseCode;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            printf("Mensagem enviada para Meta AI com sucesso\n");
        } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            fprintf(stderr, "Erro HTTP %ld: Requisição falhou\n", responseCode);
        }

        free(chunk.memory);
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }

    return 0;
}
```

</TabItem>
</Tabs>

### Conversar em Grupos

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Número da Meta AI (necessário para mencionar em grupos)
const META_AI_PHONE = '13135550002';

// Validação de entrada (segurança)
function validateGroupId(groupId) {
  const cleaned = groupId.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('ID do grupo inválido');
  }
  return cleaned + '-group';
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
const rawGroupId = '5511999999999';
const rawMessage = '@13135550002 Olá, Meta AI! Gostaria de saber sobre...';

const messageData = {
  phone: validateGroupId(rawGroupId),
  message: sanitizeMessage(rawMessage),
  mentioned: [parseInt(META_AI_PHONE)],
};

// Enviar mensagem para Meta AI em grupo com tratamento seguro de erros
async function sendToMetaAIInGroup() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Mensagem enviada para Meta AI no grupo. MessageId:', result.messageId);
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao enviar mensagem para Meta AI no grupo:', error.message);
    throw error;
  }
}

// Executar função
sendToMetaAIInGroup();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Número da Meta AI (necessário para mencionar em grupos)
const META_AI_PHONE = '13135550002';

// Interface para resposta
interface MetaAIResponse {
  zaapId: string;
  messageId: string;
  id: string;
}

// Validação de entrada
function validateGroupId(groupId: string): string {
  const cleaned = groupId.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('ID do grupo inválido');
  }
  return cleaned + '-group';
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

// Função para enviar mensagem para Meta AI em grupo
async function sendToMetaAIInGroup(groupId: string, message: string): Promise<MetaAIResponse> {
  // Validação de entrada
  const validatedGroupId = validateGroupId(groupId);
  const sanitizedMessage = sanitizeMessage(message);

  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Client-Token': clientToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone: validatedGroupId,
      message: sanitizedMessage,
      mentioned: [parseInt(META_AI_PHONE)],
    }),
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
sendToMetaAIInGroup('5511999999999', '@13135550002 Olá, Meta AI! Gostaria de saber sobre...')
  .then((result) => console.log('Sucesso. MessageId:', result.messageId))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import requests
from typing import Dict, Any, List

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'SEU_CLIENT_TOKEN')

# Número da Meta AI (necessário para mencionar em grupos)
META_AI_PHONE = '13135550002'

def validate_group_id(group_id: str) -> str:
    """Valida e formata ID do grupo."""
    cleaned = ''.join(filter(str.isdigit, group_id))
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError('ID do grupo inválido')
    return cleaned + '-group'

def sanitize_message(message: str) -> str:
    """Valida e sanitiza mensagem."""
    if not message or not message.strip():
        raise ValueError('Mensagem não pode estar vazia')
    if len(message) > 4096:
        raise ValueError('Mensagem excede limite de 4096 caracteres')
    return message.strip()

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-text"

# Dados da mensagem com validação
try:
    payload: Dict[str, Any] = {
        "phone": validate_group_id("5511999999999"),
        "message": sanitize_message("@13135550002 Olá, Meta AI! Gostaria de saber sobre..."),
        "mentioned": [int(META_AI_PHONE)]
    }
except ValueError as e:
    print(f"Erro de validação: {e}")
    exit(1)

# Headers obrigatórios
headers = {
    "Client-Token": CLIENT_TOKEN,
    "Content-Type": "application/json"
}

# Enviar mensagem para Meta AI em grupo com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    print(f'Mensagem enviada para Meta AI no grupo. MessageId: {result.get("messageId")}')
    
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
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-SEU_CLIENT_TOKEN}"

# Número da Meta AI (necessário para mencionar em grupos)
META_AI_PHONE="13135550002"

# ID do grupo (formato: números + "-group")
GROUP_ID="5511999999999-group"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Enviar mensagem para Meta AI em grupo via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-text" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"phone\": \"${GROUP_ID}\",
    \"message\": \"@${META_AI_PHONE} Olá, Meta AI! Gostaria de saber sobre...\",
    \"mentioned\": [${META_AI_PHONE}]
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN META_AI_PHONE GROUP_ID
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');
const { URL } = require('url');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Número da Meta AI (necessário para mencionar em grupos)
const META_AI_PHONE = '13135550002';

// Validação de entrada (segurança)
function validateGroupId(groupId) {
  const cleaned = groupId.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('ID do grupo inválido');
  }
  return cleaned + '-group';
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
  phone: validateGroupId('5511999999999'),
  message: sanitizeMessage('@13135550002 Olá, Meta AI! Gostaria de saber sobre...'),
  mentioned: [parseInt(META_AI_PHONE)],
};

// Enviar mensagem para Meta AI em grupo
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
      console.log('Mensagem enviada para Meta AI no grupo. MessageId:', result.messageId);
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Número da Meta AI (necessário para mencionar em grupos)
const META_AI_PHONE = '13135550002';

// Validação de entrada (segurança)
function validateGroupId(groupId) {
  const cleaned = groupId.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('ID do grupo inválido');
  }
  return cleaned + '-group';
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

// Rota para enviar mensagem para Meta AI em grupo
app.post('/meta-ai/group', async (req, res) => {
  try {
    // Dados da mensagem com validação
    const rawGroupId = req.body.groupId || '5511999999999';
    const rawMessage = req.body.message || '@13135550002 Olá, Meta AI! Gostaria de saber sobre...';

    const messageData = {
      phone: validateGroupId(rawGroupId),
      message: sanitizeMessage(rawMessage),
      mentioned: [parseInt(META_AI_PHONE)],
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
              resolve({ success: true, data: parsed });
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
    console.error('Erro ao enviar mensagem para Meta AI no grupo:', error.message);
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Número da Meta AI (necessário para mencionar em grupos)
const META_AI_PHONE = '13135550002';

// Middleware para parsing JSON
app.use(require('koa-bodyparser')());

// Validação de entrada (segurança)
function validateGroupId(groupId) {
  const cleaned = groupId.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('ID do grupo inválido');
  }
  return cleaned + '-group';
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

// Rota para enviar mensagem para Meta AI em grupo
router.post('/meta-ai/group', async (ctx) => {
  try {
    // Dados da mensagem com validação
    const rawGroupId = ctx.request.body.groupId || '5511999999999';
    const rawMessage = ctx.request.body.message || '@13135550002 Olá, Meta AI! Gostaria de saber sobre...';

    const messageData = {
      phone: validateGroupId(rawGroupId),
      message: sanitizeMessage(rawMessage),
      mentioned: [parseInt(META_AI_PHONE)],
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
              resolve({ success: true, data: parsed });
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
  console.error('Erro ao enviar mensagem para Meta AI no grupo:', err.message);
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
import org.json.JSONObject;
import org.json.JSONArray;

public class SendToMetaAIInGroup {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";
    
    // Número da Meta AI (necessário para mencionar em grupos)
    private static final String META_AI_PHONE = "13135550002";

    // Validação de entrada (segurança)
    private static String validateGroupId(String groupId) {
        String cleaned = groupId.replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("ID do grupo inválido");
        }
        return cleaned + "-group";
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
            String groupId = validateGroupId("5511999999999");
            String message = sanitizeMessage("@13135550002 Olá, Meta AI! Gostaria de saber sobre...");

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
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);

            // Body da requisição
            JSONObject jsonBody = new JSONObject();
            jsonBody.put("phone", groupId);
            jsonBody.put("message", message);
            JSONArray mentioned = new JSONArray();
            mentioned.put(Long.parseLong(META_AI_PHONE));
            jsonBody.put("mentioned", mentioned);
            
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonBody.toString().getBytes(StandardCharsets.UTF_8);
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
                    System.out.println("Mensagem enviada para Meta AI no grupo com sucesso");
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
using System.Threading.Tasks;
using System.Text.Json;
using System.Collections.Generic;

public class SendToMetaAIInGroup
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") 
        ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") 
        ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") 
        ?? "SEU_CLIENT_TOKEN";
    
    // Número da Meta AI (necessário para mencionar em grupos)
    private static readonly string MetaAIPhone = "13135550002";

    // Validação de entrada (segurança)
    private static string ValidateGroupId(string groupId)
    {
        string cleaned = System.Text.RegularExpressions.Regex.Replace(groupId, @"\D", "");
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("ID do grupo inválido");
        }
        return cleaned + "-group";
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

    public static async Task Main(string[] args)
    {
        try
        {
            // Dados da mensagem com validação
            string groupId = ValidateGroupId("5511999999999");
            string message = SanitizeMessage("@13135550002 Olá, Meta AI! Gostaria de saber sobre...");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-text";

            var payload = new
            {
                phone = groupId,
                message = message,
                mentioned = new[] { long.Parse(MetaAIPhone) }
            };

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine("Mensagem enviada para Meta AI no grupo com sucesso");
                }
                else
                {
                    // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
                    Console.WriteLine($"Erro HTTP {(int)response.StatusCode}: Requisição falhou");
                }
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro: {e.Message}");
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
    "strconv"
    "strings"
    "time"
)

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
var (
    instanceId    = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA")
    instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN")
    clientToken   = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")
    metaAIPhone   = "13135550002" // Número da Meta AI (necessário para mencionar em grupos)
)

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

// Validação de entrada (segurança)
func validateGroupId(groupId string) (string, error) {
    re := regexp.MustCompile(`\D`)
    cleaned := re.ReplaceAllString(groupId, "")
    if len(cleaned) < 10 || len(cleaned) > 15 {
        return "", fmt.Errorf("ID do grupo inválido")
    }
    return cleaned + "-group", nil
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
    // Dados da mensagem com validação
    groupId, err := validateGroupId("5511999999999")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    message, err := sanitizeMessage("@13135550002 Olá, Meta AI! Gostaria de saber sobre...")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    metaAIPhoneInt, _ := strconv.ParseInt(metaAIPhone, 10, 64)

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-text",
        instanceId, instanceToken)

    payload := map[string]interface{}{
        "phone":     groupId,
        "message":   message,
        "mentioned": []int64{metaAIPhoneInt},
    }

    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Erro ao criar JSON: %v\n", err)
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

    req.Header.Set("Client-Token", clientToken)
    req.Header.Set("Content-Type", "application/json")

    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro ao fazer requisição: %v\n", err)
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
            fmt.Printf("Erro ao processar JSON: %v\n", err)
            return
        }

        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        fmt.Println("Mensagem enviada para Meta AI no grupo com sucesso")
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
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCIA';
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'SEU_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'SEU_CLIENT_TOKEN';

// Número da Meta AI (necessário para mencionar em grupos)
$metaAIPhone = '13135550002';

// Validação de entrada (segurança)
function validateGroupId($groupId) {
    $cleaned = preg_replace('/\D/', '', $groupId);
    if (strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new Exception('ID do grupo inválido');
    }
    return $cleaned . '-group';
}

function sanitizeMessage($message) {
    if (empty(trim($message))) {
        throw new Exception('Mensagem não pode estar vazia');
    }
    if (strlen($message) > 4096) {
        throw new Exception('Mensagem excede limite de 4096 caracteres');
    }
    return trim($message);
}

try {
    // Dados da mensagem com validação
    $groupId = validateGroupId('5511999999999');
    $message = sanitizeMessage('@13135550002 Olá, Meta AI! Gostaria de saber sobre...');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-text',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $jsonBody = json_encode([
        'phone' => $groupId,
        'message' => $message,
        'mentioned' => [(int)$metaAIPhone]
    ]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonBody);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Client-Token: ' . $clientToken,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        echo "Mensagem enviada para Meta AI no grupo com sucesso\n";
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
require 'uri'
require 'json'
require 'openssl'

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCIA'
INSTANCE_TOKEN = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_TOKEN'
CLIENT_TOKEN = ENV['ZAPI_CLIENT_TOKEN'] || 'SEU_CLIENT_TOKEN'

# Número da Meta AI (necessário para mencionar em grupos)
META_AI_PHONE = '13135550002'

# Validação de entrada (segurança)
def validate_group_id(group_id)
  cleaned = group_id.to_s.gsub(/\D/, '')
  if cleaned.length < 10 || cleaned.length > 15
    raise 'ID do grupo inválido'
  end
  cleaned + '-group'
end

def sanitize_message(message)
  trimmed = message.to_s.strip
  if trimmed.empty?
    raise 'Mensagem não pode estar vazia'
  end
  if trimmed.length > 4096
    raise 'Mensagem excede limite de 4096 caracteres'
  end
  trimmed
end

begin
  # Dados da mensagem com validação
  group_id = validate_group_id('5511999999999')
  message = sanitize_message('@13135550002 Olá, Meta AI! Gostaria de saber sobre...')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(INSTANCE_ID)}/token/#{URI.encode_www_form_component(INSTANCE_TOKEN)}/send-text")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url)
  request.body = {
    phone: group_id,
    message: message,
    mentioned: [META_AI_PHONE.to_i]
  }.to_json
  request['Client-Token'] = CLIENT_TOKEN
  request['Content-Type'] = 'application/json'

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    puts 'Mensagem enviada para Meta AI no grupo com sucesso'
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
let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCIA"
let instanceToken = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_TOKEN"] ?? "SEU_TOKEN"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "SEU_CLIENT_TOKEN"

// Número da Meta AI (necessário para mencionar em grupos)
let metaAIPhone = "13135550002"

// Validação de entrada (segurança)
func validateGroupId(_ groupId: String) throws -> String {
    let cleaned = groupId.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
    if cleaned.count < 10 || cleaned.count > 15 {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "ID do grupo inválido"])
    }
    return cleaned + "-group"
}

func sanitizeMessage(_ message: String) throws -> String {
    let trimmed = message.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmed.isEmpty {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Mensagem não pode estar vazia"])
    }
    if trimmed.count > 4096 {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Mensagem excede limite de 4096 caracteres"])
    }
    return trimmed
}

// Dados da mensagem com validação
do {
    let groupId = try validateGroupId("5511999999999")
    let message = try sanitizeMessage("@13135550002 Olá, Meta AI! Gostaria de saber sobre...")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-text"
    
    guard let url = URL(string: urlString) else {
        fatalError("URL inválida")
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"

    let payload: [String: Any] = [
        "phone": groupId,
        "message": message,
        "mentioned": [Int64(metaAIPhone)!]
    ]

    request.httpBody = try JSONSerialization.data(withJSONObject: payload)
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.timeoutInterval = 30

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Erro: \(error.localizedDescription)")
            return
        }
        
        guard let httpResponse = response as? HTTPURLResponse else { return }
        
        if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
            if let data = data {
                do {
                    let result = try JSONSerialization.jsonObject(with: data) as? [String: Any]
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    print("Mensagem enviada para Meta AI no grupo com sucesso")
                } catch {
                    print("Erro ao processar JSON: \(error.localizedDescription)")
                }
            }
        } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            print("Erro HTTP \(httpResponse.statusCode): Requisição falhou")
        }
    }

    task.resume()
} catch {
    print("Erro de validação: \(error.localizedDescription)")
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCIA" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "SEU_CLIENT_TOKEN" }

# Número da Meta AI (necessário para mencionar em grupos)
$metaAIPhone = "13135550002"

# Validação de entrada (segurança)
function Validate-GroupId {
    param([string]$GroupId)
    $cleaned = $GroupId -replace '\D', ''
    if ($cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "ID do grupo inválido"
    }
    return $cleaned + "-group"
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
    $groupId = Validate-GroupId -GroupId "5511999999999"
    $message = Sanitize-Message -Message "@13135550002 Olá, Meta AI! Gostaria de saber sobre..."

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-text"

    $payload = @{
        phone = $groupId
        message = $message
        mentioned = @([int64]$metaAIPhone)
    } | ConvertTo-Json

    $headers = @{
        "Client-Token" = $clientToken
        "Content-Type" = "application/json"
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $payload -TimeoutSec 30

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    Write-Host "Mensagem enviada para Meta AI no grupo com sucesso"
} catch {
    # ⚠️ SEGURANÇA: Tratamento genérico de erro
    Write-Host "Erro: $($_.Exception.Message)"
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text HTTP/1.1
Host: api.z-api.io
Client-Token: SEU_CLIENT_TOKEN
Content-Type: application/json

{
  "phone": "5511999999999-group",
  "message": "@13135550002 Olá, Meta AI! Gostaria de saber sobre...",
  "mentioned": [13135550002]
}
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <curl/curl.h>
#include <sstream>
#include <regex>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const std::string& key, const std::string& defaultValue) {
    const char* value = std::getenv(key.c_str());
    return value ? value : defaultValue;
}

std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
std::string instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

// Número da Meta AI (necessário para mencionar em grupos)
std::string metaAIPhone = "13135550002";

static size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

std::string validateGroupId(const std::string& groupId) {
    std::regex nonDigit("\\D");
    std::string cleaned = std::regex_replace(groupId, nonDigit, "");
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::runtime_error("ID do grupo inválido");
    }
    return cleaned + "-group";
}

int main() {
    try {
        // Dados da mensagem com validação
        std::string groupId = validateGroupId("5511999999999");
        std::string message = "@13135550002 Olá, Meta AI! Gostaria de saber sobre...";

        // Body da requisição
        std::ostringstream jsonBody;
        jsonBody << "{\"phone\":\"" << groupId << "\",\"message\":\"" << message 
                 << "\",\"mentioned\":[" << metaAIPhone << "]}";

        CURL* curl = curl_easy_init();
        if (curl) {
            std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-text";
            std::string responseData;
            std::string bodyStr = jsonBody.str();

            struct curl_slist* headers = NULL;
            std::string tokenHeader = "Client-Token: " + clientToken;
            std::string contentTypeHeader = "Content-Type: application/json";
            headers = curl_slist_append(headers, tokenHeader.c_str());
            headers = curl_slist_append(headers, contentTypeHeader.c_str());

            curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
            curl_easy_setopt(curl, CURLOPT_POST, 1L);
            curl_easy_setopt(curl, CURLOPT_POSTFIELDS, bodyStr.c_str());
            curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
            curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
            curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
            curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

            CURLcode res = curl_easy_perform(curl);
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

            if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
                // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                std::cout << "Mensagem enviada para Meta AI no grupo com sucesso" << std::endl;
            } else {
                // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
                std::cerr << "Erro HTTP " << responseCode << ": Requisição falhou" << std::endl;
            }

            curl_slist_free_all(headers);
            curl_easy_cleanup(curl);
        }
    } catch (const std::exception& e) {
        std::cerr << "Erro: " << e.what() << std::endl;
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
#include <regex.h>
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
char* instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

// Número da Meta AI (necessário para mencionar em grupos)
const char* metaAIPhone = "13135550002";

struct MemoryStruct {
    char* memory;
    size_t size;
};

static size_t WriteMemoryCallback(void* contents, size_t size, size_t nmemb, void* userp) {
    size_t realsize = size * nmemb;
    struct MemoryStruct* mem = (struct MemoryStruct*)userp;

    char* ptr = realloc(mem->memory, mem->size + realsize + 1);
    if (!ptr) {
        return 0;
    }

    mem->memory = ptr;
    memcpy(&(mem->memory[mem->size]), contents, realsize);
    mem->size += realsize;
    mem->memory[mem->size] = 0;

    return realsize;
}

int main() {
    // Body da requisição (simplificado - em produção, use biblioteca JSON)
    const char* groupId = "5511999999999-group";
    const char* message = "@13135550002 Olá, Meta AI! Gostaria de saber sobre...";
    char jsonBody[512];
    snprintf(jsonBody, sizeof(jsonBody), "{\"phone\":\"%s\",\"message\":\"%s\",\"mentioned\":[%s]}", 
             groupId, message, metaAIPhone);

    CURL* curl = curl_easy_init();
    if (curl) {
        char url[512];
        snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-text",
                 instanceId, instanceToken);

        struct curl_slist* headers = NULL;
        char tokenHeader[256];
        char contentTypeHeader[] = "Content-Type: application/json";
        snprintf(tokenHeader, sizeof(tokenHeader), "Client-Token: %s", clientToken);
        headers = curl_slist_append(headers, tokenHeader);
        headers = curl_slist_append(headers, contentTypeHeader);

        struct MemoryStruct chunk;
        chunk.memory = malloc(1);
        chunk.size = 0;

        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_POST, 1L);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonBody);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteMemoryCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, (void*)&chunk);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

        CURLcode res = curl_easy_perform(curl);
        long responseCode;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            printf("Mensagem enviada para Meta AI no grupo com sucesso\n");
        } else {
            // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
            fprintf(stderr, "Erro HTTP %ld: Requisição falhou\n", responseCode);
        }

        free(chunk.memory);
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }

    return 0;
}
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `zaapId` | string | ID único da mensagem no sistema Z-API |
| `messageId` | string | ID da mensagem no WhatsApp |
| `id` | string | Adicionado para compatibilidade com Zapier, tem o mesmo valor do `messageId` |

**Exemplo de resposta:**

```json
{
 "zaapId": "3999984263738042930CD6ECDE9VDWSA",
 "messageId": "D241XXXX732339502B68",
 "id": "D241XXXX732339502B68"
}
```

### Códigos de Erro

| Código | Descrição |
|--------|-----------|
| `405` | Método HTTP incorreto. Verifique se está usando `POST` |
| `415` | Content-Type ausente. Adicione `Content-Type: application/json` no header |

---

## <Icon name="Webhook" size="md" /> Webhook Relacionado {#webhook}

[Webhook ao receber mensagem](/docs/webhooks/ao-receber) - Receba as respostas da Meta AI através do webhook

---

## <Icon name="Lightbulb" size="md" /> Dicas {#dicas}

- **Número da Meta AI**: Use sempre `13135550002` para conversas privadas
- **Apenas texto**: Lembre-se que apenas mensagens de texto são suportadas
- **Contas pessoais**: Este recurso está disponível apenas para contas pessoais, não business
- **Grupos**: Para usar em grupos, mencione o número `13135550002` no array `mentioned`
- **Funcionalidade "Imagine"**: Use descrições textuais para gerar imagens

---

## Próximos Passos

- [Meta AI - Introdução](/docs/meta-ai/introducao) - Saiba mais sobre Meta AI
- [Enviar Texto Simples](/docs/messages/texto-simples) - Documentação completa do endpoint
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks para receber respostas
