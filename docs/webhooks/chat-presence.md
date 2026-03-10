---
id: chat-presence
title: Status do Chat (Presence)
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Activity" size="lg" /> Status do Chat (Presence)

Receba notificações em tempo real sobre o status de presença do contato no chat. Saiba quando o contato está online, digitando, gravando áudio ou fora do chat.

---

:::caution Atenção

O Z-API não aceita webhooks que não sejam HTTPS.

:::

---

## Casos de Uso Comuns

- **Indicadores de Digitação**: Mostre "digitando..." quando o contato está escrevendo
- **Status Online**: Detecte quando o contato está disponível no chat
- **Gravando Áudio**: Saiba quando o contato está gravando uma mensagem de áudio
- **Experiência em Tempo Real**: Melhore a UX mostrando status em tempo real

---

## Para Usuários No-Code

Configure este webhook na sua ferramenta de automação (n8n, Make, etc.) para receber notificações sobre o status do contato no chat. Use essas informações para:

- Mostrar indicadores visuais de atividade
- Priorizar atendimento para contatos ativos
- Criar respostas automáticas baseadas em presença

---

## Para Desenvolvedores

### <Icon name="Link" size="sm" /> Configurar Webhook {#configurar}

#### Via API

```http
PUT /instances/{instanceId}/token/{token}/update-webhook-chat-presence
```

**Headers:**

| Key | Value |
|-----|-------|
| `Content-Type` | `application/json` |
| `Client-Token` | [TOKEN DE SEGURANÇA](../security/token-seguranca) |

**Request Body:**

```json
{
 "value": "https://endereco-do-seu-sistema.com.br/instancia/{instanceId}/presence"
}
```

#### Via Painel Administrativo

Acesse o painel administrativo do Z-API e configure o webhook de Chat Presence na seção de configurações da instância.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

O webhook de Chat Presence notifica sobre mudanças no status de presença do contato no chat. Você receberá eventos quando:

- O contato entra ou sai do chat
- O contato começa ou para de digitar
- O contato começa ou para de gravar áudio

**Status disponíveis**:
- `UNAVAILABLE`: Contato fora do chat
- `AVAILABLE`: Contato dentro do chat
- `COMPOSING`: Contato está digitando
- `RECORDING`: Contato está gravando áudio
- `PAUSED`: Contato parou de digitar/gravar (apenas com multi-devices)

---

## <Icon name="Webhook" size="md" /> Retornos do Webhook {#retornos}

### Estrutura do Payload

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `type` | string | Tipo do evento. Sempre será `"PresenceChatCallback"` |
| `phone` | string | Número de telefone do contato |
| `status` | string | Status atual do chat (veja valores abaixo) |
| `lastSeen` | timestamp \| null | Timestamp da última vez que o contato esteve presente |
| `instanceId` | string | ID da instância que recebeu o evento |

### Status Possíveis

| Status | Descrição |
|--------|-----------|
| `UNAVAILABLE` | Contato está fora do chat |
| `AVAILABLE` | Contato está dentro do chat |
| `COMPOSING` | Contato está digitando uma mensagem |
| `RECORDING` | Contato está gravando uma mensagem de áudio |
| `PAUSED` | Contato parou de digitar ou gravar (apenas multi-devices) |

---

## <Icon name="Code" size="md" /> Exemplos de Payload {#exemplos}

### Contato Fora do Chat

```json
{
 "type": "PresenceChatCallback",
 "phone": "5544999999999",
 "status": "UNAVAILABLE",
 "lastSeen": null,
 "instanceId": "instance.id"
}
```

### Contato Dentro do Chat

```json
{
 "type": "PresenceChatCallback",
 "phone": "5544999999999",
 "status": "AVAILABLE",
 "lastSeen": null,
 "instanceId": "instance.id"
}
```

### Contato Digitando

```json
{
 "type": "PresenceChatCallback",
 "phone": "5544999999999",
 "status": "COMPOSING",
 "lastSeen": null,
 "instanceId": "instance.id"
}
```

### Contato Parou de Digitar (Multi-Devices)

```json
{
 "type": "PresenceChatCallback",
 "phone": "5544999999999",
 "status": "PAUSED",
 "lastSeen": null,
 "instanceId": "instance.id"
}
```

:::tip Observação

Após receber um `COMPOSING` ou `RECORDING`, um `PAUSED` será retornado quando o evento parar.

O status `PAUSED` apenas é retornado se estiver usando o beta multi-devices.

:::

### Contato Gravando Áudio (Multi-Devices)

```json
{
 "type": "PresenceChatCallback",
 "phone": "5544999999999",
 "status": "RECORDING",
 "lastSeen": null,
 "instanceId": "instance.id"
}
```

:::tip Observação

O status `RECORDING` apenas é retornado se estiver usando o beta multi-devices.

:::

---

## <Icon name="Code" size="md" /> Exemplos de Código {#exemplos-codigo}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
// Nunca commite tokens no código-fonte
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_WEBHOOK_TOKEN';

// Validação de entrada (segurança)
function validateWebhookPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload inválido');
  }
  if (!payload.type || typeof payload.type !== 'string') {
    throw new Error('Tipo de evento inválido');
  }
  if (!payload.phone || typeof payload.phone !== 'string') {
    throw new Error('Número de telefone inválido');
  }
  return true;
}

// Processar webhook de presença
async function handlePresenceWebhook(request) {
  try {
    // ⚠️ SEGURANÇA: Validar token do webhook
    const receivedToken = request.headers.get('x-token');
    if (receivedToken !== webhookToken) {
      throw new Error('Token de segurança inválido');
    }

    const payload = await request.json();
    validateWebhookPayload(payload);

    if (payload.type === 'PresenceChatCallback') {
      const { phone, status, lastSeen, instanceId } = payload;
      
      // ⚠️ SEGURANÇA: Não logue dados sensíveis
      console.log(`Contato ${phone} está: ${status}`);
      
      // Lógica baseada no status
      switch (status) {
        case 'COMPOSING':
          console.log('Contato está digitando...');
          // Mostrar indicador de digitação
          break;
        case 'AVAILABLE':
          console.log('Contato está no chat');
          // Contato disponível para conversa
          break;
        case 'RECORDING':
          console.log('Contato está gravando áudio');
          // Mostrar indicador de gravação
          break;
        case 'UNAVAILABLE':
          console.log('Contato saiu do chat');
          break;
        case 'PAUSED':
          console.log('Contato parou de digitar/gravar');
          break;
      }
    }

    return new Response(JSON.stringify({ status: 'OK' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao processar webhook:', error.message);
    return new Response(JSON.stringify({ error: 'Erro ao processar webhook' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Exemplo de uso (Cloudflare Workers, Vercel, etc.)
export default {
  async fetch(request) {
    if (request.method === 'POST' && request.url.endsWith('/webhook/presence')) {
      return handlePresenceWebhook(request);
    }
    return new Response('Not Found', { status: 404 });
  },
};
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// Tipos para melhor type safety
interface PresenceWebhookPayload {
  type: 'PresenceChatCallback';
  phone: string;
  status: 'UNAVAILABLE' | 'AVAILABLE' | 'COMPOSING' | 'RECORDING' | 'PAUSED';
  lastSeen: number | null;
  instanceId: string;
}

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const webhookToken: string = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_WEBHOOK_TOKEN';

// Validação de entrada (segurança)
function validateWebhookPayload(payload: any): payload is PresenceWebhookPayload {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload inválido');
  }
  if (payload.type !== 'PresenceChatCallback') {
    throw new Error('Tipo de evento inválido');
  }
  if (!payload.phone || typeof payload.phone !== 'string') {
    throw new Error('Número de telefone inválido');
  }
  return true;
}

// Processar webhook de presença
async function handlePresenceWebhook(request: Request): Promise<Response> {
  try {
    // ⚠️ SEGURANÇA: Validar token do webhook
    const receivedToken = request.headers.get('x-token');
    if (receivedToken !== webhookToken) {
      throw new Error('Token de segurança inválido');
    }

    const payload: PresenceWebhookPayload = await request.json();
    validateWebhookPayload(payload);

    const { phone, status } = payload;
    console.log(`Contato ${phone} está: ${status}`);

    // Lógica baseada no status
    switch (status) {
      case 'COMPOSING':
        console.log('Contato está digitando...');
        break;
      case 'AVAILABLE':
        console.log('Contato está no chat');
        break;
      case 'RECORDING':
        console.log('Contato está gravando áudio');
        break;
    }

    return new Response(JSON.stringify({ status: 'OK' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao processar webhook:', error instanceof Error ? error.message : 'Erro desconhecido');
    return new Response(JSON.stringify({ error: 'Erro ao processar webhook' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import json
from typing import Dict, Any, Optional

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
WEBHOOK_TOKEN = os.getenv('ZAPI_WEBHOOK_TOKEN', 'SEU_WEBHOOK_TOKEN')

# Validação de entrada (segurança)
def validate_webhook_payload(payload: Dict[str, Any]) -> bool:
    if not payload or not isinstance(payload, dict):
        raise ValueError('Payload inválido')
    if payload.get('type') != 'PresenceChatCallback':
        raise ValueError('Tipo de evento inválido')
    if not payload.get('phone') or not isinstance(payload.get('phone'), str):
        raise ValueError('Número de telefone inválido')
    return True

# Processar webhook de presença (exemplo Flask)
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhook/presence', methods=['POST'])
def webhook_presence():
    try:
        # ⚠️ SEGURANÇA: Validar token do webhook
        received_token = request.headers.get('x-token')
        if received_token != WEBHOOK_TOKEN:
            return jsonify({'error': 'Token de segurança inválido'}), 401

        payload = request.json
        validate_webhook_payload(payload)

        phone = payload.get('phone')
        status = payload.get('status')

        # ⚠️ SEGURANÇA: Não logue dados sensíveis
        print(f'Contato {phone} está: {status}')

        # Lógica baseada no status
        if status == 'COMPOSING':
            print('Contato está digitando...')
        elif status == 'AVAILABLE':
            print('Contato está no chat')
        elif status == 'RECORDING':
            print('Contato está gravando áudio')

        return jsonify({'status': 'OK'}), 200
    except Exception as e:
        # ⚠️ SEGURANÇA: Tratamento genérico de erro
        print(f'Erro ao processar webhook: {str(e)}')
        return jsonify({'error': 'Erro ao processar webhook'}), 500

if __name__ == '__main__':
    app.run(port=3000)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
# Configure via: export ZAPI_WEBHOOK_TOKEN="seu-token"
WEBHOOK_TOKEN="${ZAPI_WEBHOOK_TOKEN:-SEU_WEBHOOK_TOKEN}"

# Exemplo de teste do webhook (simulando requisição do Z-API)
# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
curl -X POST "https://seu-servidor.com/webhook/presence" \
  -H "Content-Type: application/json" \
  -H "x-token: ${WEBHOOK_TOKEN}" \
  -d '{
    "type": "PresenceChatCallback",
    "phone": "5511999999999",
    "status": "COMPOSING",
    "lastSeen": null,
    "instanceId": "instance.id"
  }' \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset WEBHOOK_TOKEN
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const http = require('http');
const crypto = require('crypto');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_WEBHOOK_TOKEN';

// Validação de entrada (segurança)
function validateWebhookPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload inválido');
  }
  if (payload.type !== 'PresenceChatCallback') {
    throw new Error('Tipo de evento inválido');
  }
  if (!payload.phone || typeof payload.phone !== 'string') {
    throw new Error('Número de telefone inválido');
  }
  return true;
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook/presence') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        // ⚠️ SEGURANÇA: Validar token do webhook (usando timing-safe comparison)
        const providedToken = req.headers['x-token'];
        if (!providedToken || !crypto.timingSafeEqual(
          Buffer.from(providedToken),
          Buffer.from(webhookToken)
        )) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Token de segurança inválido' }));
          return;
        }

        const payload = JSON.parse(body);
        validateWebhookPayload(payload);

        const { phone, status } = payload;
        
        // ⚠️ SEGURANÇA: Não logue dados sensíveis
        console.log(`Contato ${phone} está: ${status}`);

        // Lógica baseada no status
        switch (status) {
          case 'COMPOSING':
            console.log('Contato está digitando...');
            break;
          case 'AVAILABLE':
            console.log('Contato está no chat');
            break;
          case 'RECORDING':
            console.log('Contato está gravando áudio');
            break;
        }

        // Sempre responda rápido para não bloquear o Z-API
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'OK' }));
      } catch (error) {
        // ⚠️ SEGURANÇA: Tratamento genérico de erro
        console.error('Erro ao processar webhook:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro ao processar webhook' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('Webhook server rodando na porta 3000');
});
```

</TabItem>
<TabItem value="nodejs-express" label="Node.js (Express)">

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_WEBHOOK_TOKEN';

// Validação de entrada (segurança)
function validateWebhookPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload inválido');
  }
  if (payload.type !== 'PresenceChatCallback') {
    throw new Error('Tipo de evento inválido');
  }
  if (!payload.phone || typeof payload.phone !== 'string') {
    throw new Error('Número de telefone inválido');
  }
  return true;
}

app.post('/webhook/presence', (req, res) => {
  try {
    // ⚠️ SEGURANÇA: Validar token do webhook
    const receivedToken = req.headers['x-token'];
    if (receivedToken !== webhookToken) {
      return res.status(401).json({ error: 'Token de segurança inválido' });
    }

    const payload = req.body;
    validateWebhookPayload(payload);

    const { phone, status } = payload;
    
    // ⚠️ SEGURANÇA: Não logue dados sensíveis
    console.log(`Contato ${phone} está: ${status}`);

    // Lógica baseada no status
    switch (status) {
      case 'COMPOSING':
        console.log('Contato está digitando...');
        break;
      case 'AVAILABLE':
        console.log('Contato está no chat');
        break;
      case 'RECORDING':
        console.log('Contato está gravando áudio');
        break;
    }

    // Sempre responda rápido para não bloquear o Z-API
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao processar webhook:', error.message);
    res.status(500).json({ error: 'Erro ao processar webhook' });
  }
});

app.listen(3000, () => {
  console.log('Webhook server rodando na porta 3000');
});
```

</TabItem>
<TabItem value="nodejs-koa" label="Node.js (Koa)">

```javascript
const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_WEBHOOK_TOKEN';

// Middleware para parsing JSON
app.use(require('koa-bodyparser')());

// Validação de entrada (segurança)
function validateWebhookPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload inválido');
  }
  if (payload.type !== 'PresenceChatCallback') {
    throw new Error('Tipo de evento inválido');
  }
  if (!payload.phone || typeof payload.phone !== 'string') {
    throw new Error('Número de telefone inválido');
  }
  return true;
}

// Rota para receber webhook
router.post('/webhook/presence', async (ctx) => {
  try {
    // ⚠️ SEGURANÇA: Validar token do webhook
    const receivedToken = ctx.request.headers['x-token'];
    if (receivedToken !== webhookToken) {
      ctx.status = 401;
      ctx.body = { error: 'Token de segurança inválido' };
      return;
    }

    const payload = ctx.request.body;
    validateWebhookPayload(payload);

    const { phone, status } = payload;
    
    // ⚠️ SEGURANÇA: Não logue dados sensíveis
    console.log(`Contato ${phone} está: ${status}`);

    // Lógica baseada no status
    switch (status) {
      case 'COMPOSING':
        console.log('Contato está digitando...');
        break;
      case 'AVAILABLE':
        console.log('Contato está no chat');
        break;
      case 'RECORDING':
        console.log('Contato está gravando áudio');
        break;
    }

    // Sempre responda rápido para não bloquear o Z-API
    ctx.status = 200;
    ctx.body = { status: 'OK' };
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    ctx.app.emit('error', error, ctx);
    ctx.status = 500;
    ctx.body = { error: 'Erro ao processar webhook' };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

// Error handler
app.on('error', (err, ctx) => {
  console.error('Erro ao processar webhook:', err.message);
});

app.listen(3000, () => {
  console.log('Webhook server rodando na porta 3000');
});
```

</TabItem>
<TabItem value="java" label="Java">

```java
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
class PresenceWebhookHandler implements HttpHandler {
    private static final String WEBHOOK_TOKEN = System.getenv("ZAPI_WEBHOOK_TOKEN") != null 
        ? System.getenv("ZAPI_WEBHOOK_TOKEN") 
        : "SEU_WEBHOOK_TOKEN";
    private static final Gson gson = new Gson();

    // Validação de entrada (segurança)
    private boolean validateWebhookPayload(JsonObject payload) {
        if (payload == null || !payload.has("type")) {
            throw new IllegalArgumentException("Payload inválido");
        }
        if (!payload.get("type").getAsString().equals("PresenceChatCallback")) {
            throw new IllegalArgumentException("Tipo de evento inválido");
        }
        if (!payload.has("phone") || payload.get("phone").isJsonNull()) {
            throw new IllegalArgumentException("Número de telefone inválido");
        }
        return true;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (!"POST".equals(exchange.getRequestMethod())) {
            sendResponse(exchange, 405, "{\"error\":\"Método não permitido\"}");
            return;
        }

        try {
            // ⚠️ SEGURANÇA: Validar token do webhook
            String receivedToken = exchange.getRequestHeaders().getFirst("x-token");
            if (receivedToken == null || !receivedToken.equals(WEBHOOK_TOKEN)) {
                sendResponse(exchange, 401, "{\"error\":\"Token de segurança inválido\"}");
                return;
            }

            // Ler payload
            String requestBody = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            JsonObject payload = gson.fromJson(requestBody, JsonObject.class);
            validateWebhookPayload(payload);

            String phone = payload.get("phone").getAsString();
            String status = payload.get("status").getAsString();

            // ⚠️ SEGURANÇA: Não logue dados sensíveis
            System.out.println("Contato " + phone + " está: " + status);

            // Lógica baseada no status
            switch (status) {
                case "COMPOSING":
                    System.out.println("Contato está digitando...");
                    break;
                case "AVAILABLE":
                    System.out.println("Contato está no chat");
                    break;
                case "RECORDING":
                    System.out.println("Contato está gravando áudio");
                    break;
            }

            // Sempre responda rápido para não bloquear o Z-API
            sendResponse(exchange, 200, "{\"status\":\"OK\"}");
        } catch (Exception e) {
            // ⚠️ SEGURANÇA: Tratamento genérico de erro
            System.err.println("Erro ao processar webhook: " + e.getMessage());
            sendResponse(exchange, 500, "{\"error\":\"Erro ao processar webhook\"}");
        }
    }

    private void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, response.getBytes().length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }
}

public class WebhookServer {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(3000), 0);
        server.createContext("/webhook/presence", new PresenceWebhookHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("Webhook server rodando na porta 3000");
    }
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
public class PresenceWebhookHandler
{
    private static readonly string WebhookToken = Environment.GetEnvironmentVariable("ZAPI_WEBHOOK_TOKEN") 
        ?? "SEU_WEBHOOK_TOKEN";

    // Validação de entrada (segurança)
    private static bool ValidateWebhookPayload(JObject payload)
    {
        if (payload == null || payload["type"] == null)
        {
            throw new ArgumentException("Payload inválido");
        }
        if (payload["type"].ToString() != "PresenceChatCallback")
        {
            throw new ArgumentException("Tipo de evento inválido");
        }
        if (payload["phone"] == null || string.IsNullOrEmpty(payload["phone"].ToString()))
        {
            throw new ArgumentException("Número de telefone inválido");
        }
        return true;
    }

    public static async Task HandleRequest(HttpListenerContext context)
    {
        var request = context.Request;
        var response = context.Response;

        if (request.HttpMethod != "POST")
        {
            SendResponse(response, 405, "{\"error\":\"Método não permitido\"}");
            return;
        }

        try
        {
            // ⚠️ SEGURANÇA: Validar token do webhook
            string receivedToken = request.Headers["x-token"];
            if (string.IsNullOrEmpty(receivedToken) || receivedToken != WebhookToken)
            {
                SendResponse(response, 401, "{\"error\":\"Token de segurança inválido\"}");
                return;
            }

            // Ler payload
            string requestBody;
            using (var reader = new StreamReader(request.InputStream, Encoding.UTF8))
            {
                requestBody = await reader.ReadToEndAsync();
            }

            JObject payload = JObject.Parse(requestBody);
            ValidateWebhookPayload(payload);

            string phone = payload["phone"].ToString();
            string status = payload["status"].ToString();

            // ⚠️ SEGURANÇA: Não logue dados sensíveis
            Console.WriteLine($"Contato {phone} está: {status}");

            // Lógica baseada no status
            switch (status)
            {
                case "COMPOSING":
                    Console.WriteLine("Contato está digitando...");
                    break;
                case "AVAILABLE":
                    Console.WriteLine("Contato está no chat");
                    break;
                case "RECORDING":
                    Console.WriteLine("Contato está gravando áudio");
                    break;
            }

            // Sempre responda rápido para não bloquear o Z-API
            SendResponse(response, 200, "{\"status\":\"OK\"}");
        }
        catch (Exception ex)
        {
            // ⚠️ SEGURANÇA: Tratamento genérico de erro
            Console.Error.WriteLine($"Erro ao processar webhook: {ex.Message}");
            SendResponse(response, 500, "{\"error\":\"Erro ao processar webhook\"}");
        }
    }

    private static void SendResponse(HttpListenerResponse response, int statusCode, string body)
    {
        response.StatusCode = statusCode;
        response.ContentType = "application/json";
        byte[] buffer = Encoding.UTF8.GetBytes(body);
        response.ContentLength64 = buffer.Length;
        response.OutputStream.Write(buffer, 0, buffer.Length);
        response.Close();
    }
}

// Exemplo de uso com HttpListener
class Program
{
    static void Main()
    {
        HttpListener listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:3000/webhook/presence/");
        listener.Start();
        Console.WriteLine("Webhook server rodando na porta 3000");

        while (true)
        {
            HttpListenerContext context = listener.GetContext();
            Task.Run(() => PresenceWebhookHandler.HandleRequest(context));
        }
    }
}
```

</TabItem>
<TabItem value="go" label="Go">

```go
package main

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "os"
)

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
var webhookToken = getEnv("ZAPI_WEBHOOK_TOKEN", "SEU_WEBHOOK_TOKEN")

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

// Estrutura do payload
type PresenceWebhookPayload struct {
    Type      string `json:"type"`
    Phone     string `json:"phone"`
    Status    string `json:"status"`
    LastSeen *int64 `json:"lastSeen"`
    InstanceID string `json:"instanceId"`
}

// Validação de entrada (segurança)
func validateWebhookPayload(payload *PresenceWebhookPayload) error {
    if payload == nil {
        return fmt.Errorf("payload inválido")
    }
    if payload.Type != "PresenceChatCallback" {
        return fmt.Errorf("tipo de evento inválido")
    }
    if payload.Phone == "" {
        return fmt.Errorf("número de telefone inválido")
    }
    return nil
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
        return
    }

    // ⚠️ SEGURANÇA: Validar token do webhook
    receivedToken := r.Header.Get("x-token")
    if receivedToken != webhookToken {
        http.Error(w, "Token de segurança inválido", http.StatusUnauthorized)
        return
    }

    // Ler payload
    body, err := io.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "Erro ao ler payload", http.StatusBadRequest)
        return
    }
    defer r.Body.Close()

    var payload PresenceWebhookPayload
    if err := json.Unmarshal(body, &payload); err != nil {
        http.Error(w, "Erro ao processar JSON", http.StatusBadRequest)
        return
    }

    if err := validateWebhookPayload(&payload); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // ⚠️ SEGURANÇA: Não logue dados sensíveis
    fmt.Printf("Contato %s está: %s\n", payload.Phone, payload.Status)

    // Lógica baseada no status
    switch payload.Status {
    case "COMPOSING":
        fmt.Println("Contato está digitando...")
    case "AVAILABLE":
        fmt.Println("Contato está no chat")
    case "RECORDING":
        fmt.Println("Contato está gravando áudio")
    }

    // Sempre responda rápido para não bloquear o Z-API
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{"status": "OK"})
}

func main() {
    http.HandleFunc("/webhook/presence", webhookHandler)
    fmt.Println("Webhook server rodando na porta 3000")
    http.ListenAndServe(":3000", nil)
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$webhookToken = getenv('ZAPI_WEBHOOK_TOKEN') ?: 'SEU_WEBHOOK_TOKEN';

// Validação de entrada (segurança)
function validateWebhookPayload($payload) {
    if (!is_array($payload) || !isset($payload['type'])) {
        throw new Exception('Payload inválido');
    }
    if ($payload['type'] !== 'PresenceChatCallback') {
        throw new Exception('Tipo de evento inválido');
    }
    if (!isset($payload['phone']) || empty($payload['phone'])) {
        throw new Exception('Número de telefone inválido');
    }
    return true;
}

// Processar webhook
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // ⚠️ SEGURANÇA: Validar token do webhook
        $receivedToken = $_SERVER['HTTP_X_TOKEN'] ?? '';
        if ($receivedToken !== $webhookToken) {
            http_response_code(401);
            echo json_encode(['error' => 'Token de segurança inválido']);
            exit;
        }

        // Ler payload
        $payload = json_decode(file_get_contents('php://input'), true);
        validateWebhookPayload($payload);

        $phone = $payload['phone'];
        $status = $payload['status'];

        // ⚠️ SEGURANÇA: Não logue dados sensíveis
        error_log("Contato {$phone} está: {$status}");

        // Lógica baseada no status
        switch ($status) {
            case 'COMPOSING':
                error_log('Contato está digitando...');
                break;
            case 'AVAILABLE':
                error_log('Contato está no chat');
                break;
            case 'RECORDING':
                error_log('Contato está gravando áudio');
                break;
        }

        // Sempre responda rápido para não bloquear o Z-API
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode(['status' => 'OK']);
    } catch (Exception $e) {
        // ⚠️ SEGURANÇA: Tratamento genérico de erro
        error_log("Erro ao processar webhook: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao processar webhook']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
}
?>
```

</TabItem>
<TabItem value="ruby" label="Ruby">

```ruby
require 'sinatra'
require 'json'

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
WEBHOOK_TOKEN = ENV['ZAPI_WEBHOOK_TOKEN'] || 'SEU_WEBHOOK_TOKEN'

# Validação de entrada (segurança)
def validate_webhook_payload(payload)
  raise ArgumentError, 'Payload inválido' unless payload.is_a?(Hash)
  raise ArgumentError, 'Tipo de evento inválido' unless payload['type'] == 'PresenceChatCallback'
  raise ArgumentError, 'Número de telefone inválido' if payload['phone'].nil? || payload['phone'].empty?
  true
end

post '/webhook/presence' do
  begin
    # ⚠️ SEGURANÇA: Validar token do webhook
    received_token = request.env['HTTP_X_TOKEN']
    if received_token != WEBHOOK_TOKEN
      status 401
      return { error: 'Token de segurança inválido' }.to_json
    end

    payload = JSON.parse(request.body.read)
    validate_webhook_payload(payload)

    phone = payload['phone']
    status = payload['status']

    # ⚠️ SEGURANÇA: Não logue dados sensíveis
    puts "Contato #{phone} está: #{status}"

    # Lógica baseada no status
    case status
    when 'COMPOSING'
      puts 'Contato está digitando...'
    when 'AVAILABLE'
      puts 'Contato está no chat'
    when 'RECORDING'
      puts 'Contato está gravando áudio'
    end

    # Sempre responda rápido para não bloquear o Z-API
    status 200
    { status: 'OK' }.to_json
  rescue => e
    # ⚠️ SEGURANÇA: Tratamento genérico de erro
    puts "Erro ao processar webhook: #{e.message}"
    status 500
    { error: 'Erro ao processar webhook' }.to_json
  end
end

# Iniciar servidor
set :port, 3000
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import Foundation
import Vapor

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
let webhookToken = Environment.get("ZAPI_WEBHOOK_TOKEN") ?? "SEU_WEBHOOK_TOKEN"

// Estrutura do payload
struct PresenceWebhookPayload: Content {
    let type: String
    let phone: String
    let status: String
    let lastSeen: Int64?
    let instanceId: String
}

// Validação de entrada (segurança)
func validateWebhookPayload(_ payload: PresenceWebhookPayload) throws {
    guard payload.type == "PresenceChatCallback" else {
        throw Abort(.badRequest, reason: "Tipo de evento inválido")
    }
    guard !payload.phone.isEmpty else {
        throw Abort(.badRequest, reason: "Número de telefone inválido")
    }
}

// Configurar rota
func configure(_ app: Application) throws {
    app.post("webhook", "presence") { req -> EventLoopFuture<Response> in
        // ⚠️ SEGURANÇA: Validar token do webhook
        guard let receivedToken = req.headers["x-token"].first,
              receivedToken == webhookToken else {
            throw Abort(.unauthorized, reason: "Token de segurança inválido")
        }

        return req.content.decode(PresenceWebhookPayload.self).flatMap { payload in
            do {
                try validateWebhookPayload(payload)
                
                // ⚠️ SEGURANÇA: Não logue dados sensíveis
                app.logger.info("Contato \(payload.phone) está: \(payload.status)")
                
                // Lógica baseada no status
                switch payload.status {
                case "COMPOSING":
                    app.logger.info("Contato está digitando...")
                case "AVAILABLE":
                    app.logger.info("Contato está no chat")
                case "RECORDING":
                    app.logger.info("Contato está gravando áudio")
                default:
                    break
                }
                
                // Sempre responda rápido para não bloquear o Z-API
                return req.eventLoop.makeSucceededFuture(Response(status: .ok, body: .init(string: "{\"status\":\"OK\"}")))
            } catch {
                app.logger.error("Erro ao processar webhook: \(error)")
                throw Abort(.internalServerError, reason: "Erro ao processar webhook")
            }
        }
    }
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$webhookToken = if ($env:ZAPI_WEBHOOK_TOKEN) { $env:ZAPI_WEBHOOK_TOKEN } else { "SEU_WEBHOOK_TOKEN" }

# Validação de entrada (segurança)
function Validate-WebhookPayload {
    param($payload)
    
    if (-not $payload -or -not $payload.type) {
        throw "Payload inválido"
    }
    if ($payload.type -ne "PresenceChatCallback") {
        throw "Tipo de evento inválido"
    }
    if (-not $payload.phone -or $payload.phone -eq "") {
        throw "Número de telefone inválido"
    }
    return $true
}

# Criar listener HTTP
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:3000/webhook/presence/")
$listener.Start()

Write-Host "Webhook server rodando na porta 3000"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    try {
        if ($request.HttpMethod -ne "POST") {
            $response.StatusCode = 405
            $response.Close()
            continue
        }

        # ⚠️ SEGURANÇA: Validar token do webhook
        $receivedToken = $request.Headers["x-token"]
        if ($receivedToken -ne $webhookToken) {
            $response.StatusCode = 401
            $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"error":"Token de segurança inválido"}')
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        # Ler payload
        $reader = New-Object System.IO.StreamReader($request.InputStream)
        $body = $reader.ReadToEnd()
        $payload = $body | ConvertFrom-Json

        Validate-WebhookPayload -payload $payload

        $phone = $payload.phone
        $status = $payload.status

        # ⚠️ SEGURANÇA: Não logue dados sensíveis
        Write-Host "Contato $phone está: $status"

        # Lógica baseada no status
        switch ($status) {
            "COMPOSING" { Write-Host "Contato está digitando..." }
            "AVAILABLE" { Write-Host "Contato está no chat" }
            "RECORDING" { Write-Host "Contato está gravando áudio" }
        }

        # Sempre responda rápido para não bloquear o Z-API
        $response.StatusCode = 200
        $response.ContentType = "application/json"
        $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"status":"OK"}')
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } catch {
        # ⚠️ SEGURANÇA: Tratamento genérico de erro
        Write-Host "Erro ao processar webhook: $($_.Exception.Message)"
        $response.StatusCode = 500
        $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"error":"Erro ao processar webhook"}')
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } finally {
        $response.Close()
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST /webhook/presence HTTP/1.1
Host: seu-servidor.com
Content-Type: application/json
x-token: SEU_WEBHOOK_TOKEN
Content-Length: 125

{
  "type": "PresenceChatCallback",
  "phone": "5511999999999",
  "status": "COMPOSING",
  "lastSeen": null,
  "instanceId": "instance.id"
}
```

**Nota:** Este é um exemplo de requisição HTTP raw que o Z-API envia para seu webhook. Em produção:
- ⚠️ **SEGURANÇA:** Valide sempre o header `x-token` antes de processar o payload
- ⚠️ **SEGURANÇA:** Sempre use HTTPS (não HTTP)
- ⚠️ **Validação:** Valide o payload (tipo, phone, status) antes de processar
- ⚠️ **Performance:** Responda com `200 OK` rapidamente para não bloquear o Z-API

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <curl/curl.h>
#include <json/json.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const char* key, const std::string& defaultValue) {
    const char* value = std::getenv(key);
    return value ? std::string(value) : defaultValue;
}

std::string webhookToken = getEnv("ZAPI_WEBHOOK_TOKEN", "SEU_WEBHOOK_TOKEN");

// Validação de entrada (segurança)
bool validateWebhookPayload(const Json::Value& payload) {
    if (!payload.isObject() || !payload.isMember("type")) {
        throw std::invalid_argument("Payload inválido");
    }
    if (payload["type"].asString() != "PresenceChatCallback") {
        throw std::invalid_argument("Tipo de evento inválido");
    }
    if (!payload.isMember("phone") || payload["phone"].asString().empty()) {
        throw std::invalid_argument("Número de telefone inválido");
    }
    return true;
}

// Callback para escrever resposta HTTP
size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

// Exemplo de processamento (usando libmicrohttpd ou similar)
// Este é um exemplo simplificado - em produção use uma biblioteca HTTP adequada
int main() {
    // Implementação do servidor HTTP aqui
    // Exemplo usando libmicrohttpd ou outra biblioteca
    
    std::cout << "Webhook server rodando na porta 3000" << std::endl;
    return 0;
}
```

**Compilação:**
```bash
# Requer libcurl-dev e libjsoncpp-dev
g++ -o webhook_server webhook_server.cpp -lcurl -ljsoncpp -lmicrohttpd
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

char* webhookToken = getEnv("ZAPI_WEBHOOK_TOKEN", "SEU_WEBHOOK_TOKEN");

// Exemplo de processamento (usando libmicrohttpd ou similar)
// Este é um exemplo simplificado - em produção use uma biblioteca HTTP adequada
int main() {
    // Implementação do servidor HTTP aqui
    // Exemplo usando libmicrohttpd ou outra biblioteca
    
    printf("Webhook server rodando na porta 3000\n");
    return 0;
}
```

**Compilação:**
```bash
# Requer libcurl-dev e libmicrohttpd-dev
gcc -o webhook_server webhook_server.c -lcurl -lmicrohttpd
```

</TabItem>
</Tabs>

---

## <Icon name="Lightbulb" size="md" /> Dicas {#dicas}

- **HTTPS obrigatório**: Certifique-se de que seu endpoint usa HTTPS
- **Multi-Devices**: Alguns status (`PAUSED`, `RECORDING`) só funcionam com multi-devices ativado
- **Frequência**: Você pode receber múltiplos eventos rapidamente quando o contato está digitando
- **Status PAUSED**: Sempre recebido após `COMPOSING` ou `RECORDING` quando o evento para (apenas multi-devices)
- **Armazenamento**: Considere armazenar o último status para melhorar a experiência do usuário

---

## Próximos Passos

- [Atualizar Todos os Webhooks](/docs/webhooks/atualizar-todos) - Configure todos os webhooks de uma vez
- [Webhooks - Introdução](/docs/webhooks/introducao) - Entenda melhor como funcionam os webhooks
- [Multi-Devices](/docs/multi-devices/introducao) - Saiba mais sobre multi-devices (quando disponível)

