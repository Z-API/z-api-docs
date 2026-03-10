---
id: ao-desconectar
sidebar_position: 1
title: 'Webhook: When disconnected'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Webhook: When Disconnecting

Receive notifications when your Z-API instance disconnects from WhatsApp. Use this webhook to detect disconnections and implement reconnection logic.

## Event {#event}

The webhook sends a JSON payload with the type `DisconnectedCallback` when the instance disconnects from WhatsApp.

```json
{
  "momment": 1580163342,
  "error": "Device has been disconnected",
  "disconnected": true,
  "type": "DisconnectedCallback",
  "instanceId": "instance.id"
}
```

### Attributes

| Attributes | Type | Description |
|-----------|--------|----------------------------------------------|
| momment | integer | Moment in which the instance was disconnected from the number. |
| error | string | Description of the error. |
| disconnected | boolean | Indication if the instance is connected with the number or not. |
| type | string | Type of event for the instance, in this case will be "DisconnectedCallback". |
| instanceId | string | Identifier of the instance. |

## Reasons for Disconnection {#reasons-for-disconnection}

The field `error` contains the description of the error that caused the disconnection. Common examples include device disconnect, session conflict, or ban.

## Examples of Code

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
// Nunca commite tokens no código-fonte
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_TOKEN_DE_SEGURANCA';

// Validação de entrada (segurança)
function validateWebhookPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload inválido');
  }
  if (!payload.type || typeof payload.type !== 'string') {
    throw new Error('Tipo de evento inválido');
  }
  return true;
}

// Processar webhook de desconexão
async function handleDisconnectedWebhook(request) {
  try {
    // ⚠️ SEGURANÇA: Validar token do webhook
    const receivedToken = request.headers.get('x-token');
    if (receivedToken !== webhookToken) {
      return new Response('Unauthorized', { status: 401 });
    }

    const payload = await request.json();
    validateWebhookPayload(payload);

    if (payload.type === 'DisconnectedCallback') {
      const { instanceId, error, disconnected, momment } = payload;

      // ⚠️ SEGURANÇA: Não logue dados sensíveis
      console.log(`Instância ${instanceId} desconectada: ${disconnected}`);
      console.log(`Erro: ${error}`);
      console.log(`Desconectado em: ${new Date(momment * 1000).toISOString()}`);

      // Atualizar status da instância no banco de dados
      await updateInstanceStatus(instanceId, 'disconnected');

      // Enviar notificação para administradores
      await notifyAdmins(`Instância ${instanceId} foi desconectada. Erro: ${error}`);

      // Pausar processamento de mensagens
      await pauseMessageProcessing(instanceId);

      // Implementar lógica de reconexão automática se necessário
      // (Verificar se o erro sugere que é possível reconectar)
    }

    // Sempre responda rápido para não bloquear o Z-API
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

// Funções auxiliares (exemplo)
async function updateInstanceStatus(instanceId, status) {
  // Em produção, substitua por chamada real ao banco de dados
  console.log(`Atualizando instância ${instanceId} para status ${status}`);
}

async function notifyAdmins(message) {
  // Em produção, implemente notificação real (Slack, email, etc.)
  console.log(`Notificação: ${message}`);
}

async function pauseMessageProcessing(instanceId) {
  // Em produção, implemente pausa de processamento
  console.log(`Pausando processamento de mensagens para instância ${instanceId}`);
}

async function scheduleReconnection(instanceId) {
  // Em produção, implemente agendamento de reconexão
  console.log(`Agendando reconexão para instância ${instanceId}`);
}

// Exemplo de uso (Cloudflare Workers, Vercel, etc.)
export default {
  async fetch(request) {
    if (request.method === 'POST' && request.url.endsWith('/webhook')) {
      return handleDisconnectedWebhook(request);
    }
    return new Response('Not Found', { status: 404 });
  },
};
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
interface DisconnectedWebhookPayload {
  type: 'DisconnectedCallback';
  instanceId: string;
  momment: number;
  error: string;
  disconnected: boolean;
}

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const webhookToken: string = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_TOKEN_DE_SEGURANCA';

// Processar webhook de desconexão
async function handleDisconnectedWebhook(request: Request): Promise<Response> {
  try {
    // ⚠️ SEGURANÇA: Validar token do webhook
    const receivedToken = request.headers.get('x-token');
    if (receivedToken !== webhookToken) {
      return new Response('Unauthorized', { status: 401 });
    }

    const payload: DisconnectedWebhookPayload = await request.json();

    if (payload.type === 'DisconnectedCallback') {
      const { instanceId, error, disconnected, momment } = payload;

      console.log(`Instância ${instanceId} desconectada: ${disconnected}`);
      console.log(`Erro: ${error}`);
      console.log(`Timestamp: ${momment}`);

      // Atualizar status da instância no banco de dados
      await updateInstanceStatus(instanceId, 'disconnected');

      // Enviar notificação para administradores
      await notifyAdmins(`Instância ${instanceId} foi desconectada. Erro: ${error}`);

      // Pausar processamento de mensagens
      await pauseMessageProcessing(instanceId);
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

// Funções auxiliares
async function updateInstanceStatus(instanceId: string, status: string): Promise<void> {
  console.log(`Atualizando instância ${instanceId} para status ${status}`);
}

async function notifyAdmins(message: string): Promise<void> {
  console.log(`Notificação: ${message}`);
}

async function pauseMessageProcessing(instanceId: string): Promise<void> {
  console.log(`Pausando processamento de mensagens para instância ${instanceId}`);
}

async function scheduleReconnection(instanceId: string): Promise<void> {
  console.log(`Agendando reconexão para instância ${instanceId}`);
}
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
from flask import Flask, request, jsonify
from typing import Dict, Any, Optional

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
webhook_token = os.getenv('ZAPI_WEBHOOK_TOKEN', 'SEU_TOKEN_DE_SEGURANCA')

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    try:
        # ⚠️ SEGURANÇA: Validar token do webhook
        received_token = request.headers.get('x-token')
        if received_token != webhook_token:
            return jsonify({'error': 'Unauthorized'}), 401

        payload = request.json
        if not payload or payload.get('type') != 'DisconnectedCallback':
            return jsonify({'error': 'Evento inválido'}), 400

        if payload.get('type') == 'DisconnectedCallback':
            instance_id = payload.get('instanceId')
            error = payload.get('error')
            disconnected = payload.get('disconnected')
            momment = payload.get('momment')

            # ⚠️ SEGURANÇA: Não logue dados sensíveis
            print(f'Instância {instance_id} desconectada: {disconnected}')
            print(f'Erro: {error}')

            # Atualizar status da instância no banco de dados
            update_instance_status(instance_id, 'disconnected')

            # Enviar notificação para administradores
            notify_admins(f'Instância {instance_id} foi desconectada. Erro: {error}')

            # Pausar processamento de mensagens
            pause_message_processing(instance_id)

        # Sempre responda rápido para não bloquear o Z-API
        return jsonify({'status': 'OK'}), 200
    except Exception as e:
        # ⚠️ SEGURANÇA: Tratamento genérico de erro
        print(f'Erro ao processar webhook: {str(e)}')
        return jsonify({'error': 'Erro ao processar webhook'}), 500

# Funções auxiliares
def update_instance_status(instance_id: str, status: str):
    print(f'Atualizando instância {instance_id} para status {status}')

def notify_admins(message: str):
    print(f'Notificação: {message}')

def pause_message_processing(instance_id: str):
    print(f'Pausando processamento de mensagens para instância {instance_id}')

def schedule_reconnection(instance_id: str):
    print(f'Agendando reconexão para instância {instance_id}')

if __name__ == '__main__':
    app.run(port=3000)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
# Configure via: export ZAPI_WEBHOOK_TOKEN="seu-token"
WEBHOOK_TOKEN="${ZAPI_WEBHOOK_TOKEN:-SEU_TOKEN_DE_SEGURANCA}"

# Exemplo de teste do webhook (simulando requisição do Z-API)
# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
curl -X POST "https://seu-servidor.com/webhook" \
  -H "Content-Type: application/json" \
  -H "x-token: ${WEBHOOK_TOKEN}" \
  -d '{
    "type": "DisconnectedCallback",
    "instanceId": "instance.id",
    "momment": 1580163342,
    "error": "Device has been disconnected",
    "disconnected": true
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
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_TOKEN_DE_SEGURANCA';

// Funções auxiliares
function updateInstanceStatus(instanceId, status) {
  console.log(`Atualizando instância ${instanceId} para status ${status}`);
}

function notifyAdmins(message) {
  console.log(`Notificação: ${message}`);
}

function pauseMessageProcessing(instanceId) {
  console.log(`Pausando processamento de mensagens para instância ${instanceId}`);
}

function scheduleReconnection(instanceId) {
  console.log(`Agendando reconexão para instância ${instanceId}`);
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
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
          res.end(JSON.stringify({ error: 'Unauthorized' }));
          return;
        }

        const payload = JSON.parse(body);
        const { type, instanceId, error, disconnected, momment } = payload;

        if (type === 'DisconnectedCallback') {
          console.log(`Instância ${instanceId} desconectada: ${disconnected}`);
          console.log(`Erro: ${error}`);

          // Atualizar status da instância no banco de dados
          updateInstanceStatus(instanceId, 'disconnected');

          // Enviar notificação para administradores
          notifyAdmins(`Instância ${instanceId} foi desconectada. Erro: ${error}`);

          // Pausar processamento de mensagens
          pauseMessageProcessing(instanceId);
        }

        // Sempre responda rápido para não bloquear o Z-API
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'OK' }));
      } catch (error) {
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
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_TOKEN_DE_SEGURANCA';

app.post('/webhook', (req, res) => {
  try {
    // ⚠️ SEGURANÇA: Validar token do webhook
    const receivedToken = req.headers['x-token'];
    if (receivedToken !== webhookToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { type, instanceId, error, disconnected, momment } = req.body;

    if (type === 'DisconnectedCallback') {
      console.log(`Instância ${instanceId} desconectada: ${disconnected}`);
      console.log(`Erro: ${error}`);

      // Atualizar status da instância no banco de dados
      updateInstanceStatus(instanceId, 'disconnected');

      // Enviar notificação para administradores
      notifyAdmins(`Instância ${instanceId} foi desconectada. Erro: ${error}`);

      // Pausar processamento de mensagens
      pauseMessageProcessing(instanceId);
    }

    // Sempre responda rápido para não bloquear o Z-API
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    console.error('Erro ao processar webhook:', error.message);
    res.status(500).json({ error: 'Erro ao processar webhook' });
  }
});

// Funções auxiliares
function updateInstanceStatus(instanceId, status) {
  console.log(`Atualizando instância ${instanceId} para status ${status}`);
}

function notifyAdmins(message) {
  console.log(`Notificação: ${message}`);
}

function pauseMessageProcessing(instanceId) {
  console.log(`Pausando processamento de mensagens para instância ${instanceId}`);
}

function scheduleReconnection(instanceId) {
  console.log(`Agendando reconexão para instância ${instanceId}`);
}

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
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_TOKEN_DE_SEGURANCA';

// Middleware para parsing JSON
app.use(require('koa-bodyparser')());

// Rota para receber webhook
router.post('/webhook', async (ctx) => {
  try {
    // ⚠️ SEGURANÇA: Validar token do webhook
    const receivedToken = ctx.request.headers['x-token'];
    if (receivedToken !== webhookToken) {
      ctx.status = 401;
      ctx.body = { error: 'Unauthorized' };
      return;
    }

    const { type, instanceId, error, disconnected, momment } = ctx.request.body;

    if (type === 'DisconnectedCallback') {
      console.log(`Instância ${instanceId} desconectada: ${disconnected}`);
      console.log(`Erro: ${error}`);

      // Atualizar status da instância no banco de dados
      updateInstanceStatus(instanceId, 'disconnected');

      // Enviar notificação para administradores
      notifyAdmins(`Instância ${instanceId} foi desconectada. Erro: ${error}`);

      // Pausar processamento de mensagens
      pauseMessageProcessing(instanceId);
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

// Funções auxiliares
function updateInstanceStatus(instanceId, status) {
  console.log(`Atualizando instância ${instanceId} para status ${status}`);
}

function notifyAdmins(message) {
  console.log(`Notificação: ${message}`);
}

function pauseMessageProcessing(instanceId) {
  console.log(`Pausando processamento de mensagens para instância ${instanceId}`);
}

function scheduleReconnection(instanceId) {
  console.log(`Agendando reconexão para instância ${instanceId}`);
}

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
import com.google.gson.Gson;
import com.google.gson.JsonObject;

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
class DisconnectedWebhookHandler implements HttpHandler {
    private static final String WEBHOOK_TOKEN = System.getenv("ZAPI_WEBHOOK_TOKEN") != null 
        ? System.getenv("ZAPI_WEBHOOK_TOKEN") : "SEU_TOKEN_DE_SEGURANCA";
    private static final Gson gson = new Gson();

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
                sendResponse(exchange, 401, "{\"error\":\"Unauthorized\"}");
                return;
            }

            // Ler payload
            String requestBody = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            JsonObject payload = gson.fromJson(requestBody, JsonObject.class);

            if (payload.has("type") && "DisconnectedCallback".equals(payload.get("type").getAsString())) {
                String instanceId = payload.get("instanceId").getAsString();
                String error = payload.get("error").getAsString();
                boolean disconnected = payload.get("disconnected").getAsBoolean();
                long momment = payload.get("momment").getAsLong();

                System.out.println("Instância " + instanceId + " desconectada: " + disconnected);
                System.out.println("Erro: " + error);

                // Atualizar status da instância no banco de dados
                updateInstanceStatus(instanceId, "disconnected");

                // Enviar notificação para administradores
                notifyAdmins("Instância " + instanceId + " foi desconectada. Erro: " + error);

                // Pausar processamento de mensagens
                pauseMessageProcessing(instanceId);
            }

            // Sempre responda rápido para não bloquear o Z-API
            sendResponse(exchange, 200, "{\"status\":\"OK\"}");
        } catch (Exception e) {
            System.err.println("Erro ao processar webhook: " + e.getMessage());
            sendResponse(exchange, 500, "{\"error\":\"Erro ao processar webhook\"}");
        }
    }

    private void updateInstanceStatus(String instanceId, String status) {
        System.out.println("Atualizando instância " + instanceId + " para status " + status);
    }

    private void notifyAdmins(String message) {
        System.out.println("Notificação: " + message);
    }

    private void pauseMessageProcessing(String instanceId) {
        System.out.println("Pausando processamento de mensagens para instância " + instanceId);
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
        server.createContext("/webhook", new DisconnectedWebhookHandler());
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
using Newtonsoft.Json.Linq;

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
public class DisconnectedWebhookHandler
{
    private static readonly string WebhookToken = Environment.GetEnvironmentVariable("ZAPI_WEBHOOK_TOKEN") 
        ?? "SEU_TOKEN_DE_SEGURANCA";

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
                SendResponse(response, 401, "{\"error\":\"Unauthorized\"}");
                return;
            }

            // Ler payload
            string requestBody;
            using (var reader = new StreamReader(request.InputStream, Encoding.UTF8))
            {
                requestBody = await reader.ReadToEndAsync();
            }

            JObject payload = JObject.Parse(requestBody);
            string type = payload["type"]?.ToString();

            if (type == "DisconnectedCallback")
            {
                string instanceId = payload["instanceId"].ToString();
                string error = payload["error"].ToString();
                bool disconnected = (bool)payload["disconnected"];
                long momment = (long)payload["momment"];

                Console.WriteLine($"Instância {instanceId} desconectada: {disconnected}");
                Console.WriteLine($"Erro: {error}");

                // Atualizar status da instância no banco de dados
                UpdateInstanceStatus(instanceId, "disconnected");

                // Enviar notificação para administradores
                NotifyAdmins($"Instância {instanceId} foi desconectada. Erro: {error}");

                // Pausar processamento de mensagens
                PauseMessageProcessing(instanceId);
            }

            // Sempre responda rápido para não bloquear o Z-API
            SendResponse(response, 200, "{\"status\":\"OK\"}");
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Erro ao processar webhook: {ex.Message}");
            SendResponse(response, 500, "{\"error\":\"Erro ao processar webhook\"}");
        }
    }

    private static void UpdateInstanceStatus(string instanceId, string status)
    {
        Console.WriteLine($"Atualizando instância {instanceId} para status {status}");
    }

    private static void NotifyAdmins(string message)
    {
        Console.WriteLine($"Notificação: {message}");
    }

    private static void PauseMessageProcessing(string instanceId)
    {
        Console.WriteLine($"Pausando processamento de mensagens para instância {instanceId}");
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
        listener.Prefixes.Add("http://localhost:3000/webhook/");
        listener.Start();
        Console.WriteLine("Webhook server rodando na porta 3000");

        while (true)
        {
            HttpListenerContext context = listener.GetContext();
            Task.Run(() => DisconnectedWebhookHandler.HandleRequest(context));
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
var webhookToken = getEnv("ZAPI_WEBHOOK_TOKEN", "SEU_TOKEN_DE_SEGURANCA")

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

// Estrutura do payload
type DisconnectedWebhookPayload struct {
    Type         string `json:"type"`
    InstanceID   string `json:"instanceId"`
    Momment      int64  `json:"momment"`
    Error        string `json:"error"`
    Disconnected bool   `json:"disconnected"`
}

func updateInstanceStatus(instanceID, status string) {
    fmt.Printf("Atualizando instância %s para status %s\n", instanceID, status)
}

func notifyAdmins(message string) {
    fmt.Printf("Notificação: %s\n", message)
}

func pauseMessageProcessing(instanceID string) {
    fmt.Printf("Pausando processamento de mensagens para instância %s\n", instanceID)
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
        return
    }

    // ⚠️ SEGURANÇA: Validar token do webhook
    receivedToken := r.Header.Get("x-token")
    if receivedToken != webhookToken {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    body, err := io.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "Erro ao ler payload", http.StatusBadRequest)
        return
    }
    defer r.Body.Close()

    var payload DisconnectedWebhookPayload
    if err := json.Unmarshal(body, &payload); err != nil {
        http.Error(w, "Erro ao processar JSON", http.StatusBadRequest)
        return
    }

    if payload.Type == "DisconnectedCallback" {
        instanceID := payload.InstanceID
        
        fmt.Printf("Instância %s desconectada: %t\n", instanceID, payload.Disconnected)
        fmt.Printf("Erro: %s\n", payload.Error)

        // Atualizar status da instância no banco de dados
        updateInstanceStatus(instanceID, "disconnected")

        // Enviar notificação para administradores
        notifyAdmins(fmt.Sprintf("Instância %s foi desconectada. Erro: %s", instanceID, payload.Error))

        // Pausar processamento de mensagens
        pauseMessageProcessing(instanceID)
    }

    // Sempre responda rápido para não bloquear o Z-API
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{"status": "OK"})
}

func main() {
    http.HandleFunc("/webhook", webhookHandler)
    fmt.Println("Webhook server rodando na porta 3000")
    http.ListenAndServe(":3000", nil)
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$webhookToken = getenv('ZAPI_WEBHOOK_TOKEN') ?: 'SEU_TOKEN_DE_SEGURANCA';

// Processar webhook
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // ⚠️ SEGURANÇA: Validar token do webhook
        $receivedToken = $_SERVER['HTTP_X_TOKEN'] ?? '';
        if ($receivedToken !== $webhookToken) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            exit;
        }

        // Ler payload
        $payload = json_decode(file_get_contents('php://input'), true);
        
        if (($payload['type'] ?? '') === 'DisconnectedCallback') {
            $instanceId = $payload['instanceId'];
            $error = $payload['error'];
            $disconnected = $payload['disconnected'];
            $momment = $payload['momment'];

            // ⚠️ SEGURANÇA: Não logue dados sensíveis
            error_log("Instância {$instanceId} desconectada: " . ($disconnected ? 'true' : 'false'));
            error_log("Erro: {$error}");

            // Atualizar status da instância no banco de dados
            updateInstanceStatus($instanceId, 'disconnected');

            // Enviar notificação para administradores
            notifyAdmins("Instância {$instanceId} foi desconectada. Erro: {$error}");

            // Pausar processamento de mensagens
            pauseMessageProcessing($instanceId);
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

function updateInstanceStatus($instanceId, $status) {
    error_log("Atualizando instância {$instanceId} para status {$status}");
}

function notifyAdmins($message) {
    error_log("Notificação: {$message}");
}

function pauseMessageProcessing($instanceId) {
    error_log("Pausando processamento de mensagens para instância {$instanceId}");
}
?>
```

</TabItem>
<TabItem value="ruby" label="Ruby">

```ruby
require 'sinatra'
require 'json'

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
WEBHOOK_TOKEN = ENV['ZAPI_WEBHOOK_TOKEN'] || 'SEU_TOKEN_DE_SEGURANCA'

def update_instance_status(instance_id, status)
  puts "Atualizando instância #{instance_id} para status #{status}"
end

def notify_admins(message)
  puts "Notificação: #{message}"
end

def pause_message_processing(instance_id)
  puts "Pausando processamento de mensagens para instância #{instance_id}"
end

post '/webhook' do
  begin
    # ⚠️ SEGURANÇA: Validar token do webhook
    received_token = request.env['HTTP_X_TOKEN']
    if received_token != WEBHOOK_TOKEN
      status 401
      return { error: 'Unauthorized' }.to_json
    end

    payload = JSON.parse(request.body.read)
    
    if payload['type'] == 'DisconnectedCallback'
      instance_id = payload['instanceId']
      error = payload['error']
      disconnected = payload['disconnected']
      momment = payload['momment']

      # ⚠️ SEGURANÇA: Não logue dados sensíveis
      puts "Instância #{instance_id} desconectada: #{disconnected}"
      puts "Erro: #{error}"

      # Atualizar status da instância no banco de dados
      update_instance_status(instance_id, 'disconnected')

      # Enviar notificação para administradores
      notify_admins("Instância #{instance_id} foi desconectada. Erro: #{error}")

      # Pausar processamento de mensagens
      pause_message_processing(instance_id)
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
let webhookToken = Environment.get("ZAPI_WEBHOOK_TOKEN") ?? "SEU_TOKEN_DE_SEGURANCA"

// Estrutura do payload
struct DisconnectedWebhookPayload: Content {
    let type: String
    let instanceId: String
    let momment: Int64
    let error: String
    let disconnected: Bool
}

func updateInstanceStatus(_ instanceId: String, _ status: String, on app: Application) {
    app.logger.info("Atualizando instância \(instanceId) para status \(status)")
}

func notifyAdmins(_ message: String, on app: Application) {
    app.logger.info("Notificação: \(message)")
}

func pauseMessageProcessing(_ instanceId: String, on app: Application) {
    app.logger.info("Pausando processamento de mensagens para instância \(instanceId)")
}

// Configurar rota
func configure(_ app: Application) throws {
    app.post("webhook") { req -> EventLoopFuture<Response> in
        // ⚠️ SEGURANÇA: Validar token do webhook
        guard let receivedToken = req.headers["x-token"].first,
              receivedToken == webhookToken else {
            throw Abort(.unauthorized, reason: "Token de segurança inválido")
        }

        return req.content.decode(DisconnectedWebhookPayload.self).flatMap { payload in
            if payload.type == "DisconnectedCallback" {
                app.logger.info("Instância \(payload.instanceId) desconectada: \(payload.disconnected)")
                app.logger.info("Erro: \(payload.error)")

                // Atualizar status da instância no banco de dados
                updateInstanceStatus(payload.instanceId, "disconnected", on: app)

                // Enviar notificação para administradores
                notifyAdmins("Instância \(payload.instanceId) foi desconectada. Erro: \(payload.error)", on: app)

                // Pausar processamento de mensagens
                pauseMessageProcessing(payload.instanceId, on: app)
            }

            // Sempre responda rápido para não bloquear o Z-API
            return req.eventLoop.makeSucceededFuture(Response(status: .ok, body: .init(string: "{\"status\":\"OK\"}")))
        }
    }
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$webhookToken = if ($env:ZAPI_WEBHOOK_TOKEN) { $env:ZAPI_WEBHOOK_TOKEN } else { "SEU_TOKEN_DE_SEGURANCA" }

function Update-InstanceStatus {
    param($instanceId, $status)
    Write-Host "Atualizando instância $instanceId para status $status"
}

function Notify-Admins {
    param($message)
    Write-Host "Notificação: $message"
}

function Pause-MessageProcessing {
    param($instanceId)
    Write-Host "Pausando processamento de mensagens para instância $instanceId"
}

# Criar listener HTTP
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:3000/webhook/")
$listener.Start()

Write-Host "Webhook server rodando na porta 3000"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    try {
        if ($request.HttpMethod -ne "POST") {
            $response.StatusCode = 405
            $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"error":"Método não permitido"}')
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        # ⚠️ SEGURANÇA: Validar token do webhook
        $receivedToken = $request.Headers["x-token"]
        if ($receivedToken -ne $webhookToken) {
            $response.StatusCode = 401
            $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"error":"Unauthorized"}')
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        # Ler payload
        $reader = New-Object System.IO.StreamReader($request.InputStream)
        $body = $reader.ReadToEnd()
        $payload = $body | ConvertFrom-Json

        if ($payload.type -eq "DisconnectedCallback") {
            $instanceId = $payload.instanceId
            $error = $payload.error
            $disconnected = $payload.disconnected
            $momment = $payload.momment

            Write-Host "Instância $instanceId desconectada: $disconnected"
            Write-Host "Erro: $error"

            # Atualizar status da instância no banco de dados
            Update-InstanceStatus -instanceId $instanceId -status "disconnected"

            # Enviar notificação para administradores
            Notify-Admins -message "Instância $instanceId foi desconectada. Erro: $error"

            # Pausar processamento de mensagens
            Pause-MessageProcessing -instanceId $instanceId
        }

        # Sempre responda rápido para não bloquear o Z-API
        $response.StatusCode = 200
        $response.ContentType = "application/json"
        $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"status":"OK"}')
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } catch {
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
POST /webhook HTTP/1.1
Host: seu-servidor.com
Content-Type: application/json
x-token: SEU_TOKEN_DE_SEGURANCA
Content-Length: 155

{
  "type": "DisconnectedCallback",
  "instanceId": "instance.id",
  "momment": 1580163342,
  "error": "Device has been disconnected",
  "disconnected": true
}
```

**Note:** This is an example of a raw HTTP request that the Z-API sends to your webhook. In production:
- ⚠️ **SECURITY:** Always validate the security header `x-token` before processing the payload
- ⚠️ **SECURITY:** Always use HTTPS (not HTTP)
- ⚠️ **Validation:** Validate the payload (type, instanceId) before processing
- ⚠️ **Performance:** Respond with `200 OK` quickly to not block the Z-API

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

std::string webhookToken = getEnv("ZAPI_WEBHOOK_TOKEN", "SEU_TOKEN_DE_SEGURANCA");

// Exemplo de processamento (usando libmicrohttpd ou similar)
// Este é um exemplo simplificado - em produção use uma biblioteca HTTP adequada
int main() {
    // Implementação do servidor HTTP aqui
    // Exemplo usando libmicrohttpd ou outra biblioteca
    
    std::cout << "Webhook server rodando na porta 3000" << std::endl;
    return 0;
}
```

**Compilation:**
```bash
# Requer libcurl-dev, libjsoncpp-dev e libmicrohttpd-dev
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

char* webhookToken = getEnv("ZAPI_WEBHOOK_TOKEN", "SEU_TOKEN_DE_SEGURANCA");

// Exemplo de processamento (usando libmicrohttpd ou similar)
// Este é um exemplo simplificado - em produção use uma biblioteca HTTP adequada
int main() {
    // Implementação do servidor HTTP aqui
    // Exemplo usando libmicrohttpd ou outra biblioteca
    
    printf("Webhook server rodando na porta 3000\n");
    return 0;
}
```

**Compilation:**
```bash
# Requer libcurl-dev e libmicrohttpd-dev
gcc -o webhook_server webhook_server.c -lcurl -lmicrohttpd
```

</TabItem>
</Tabs>

## When this webhook is called {#when-this-webhook-is-called}

This webhook is called when:

- The instance loses connection with WhatsApp
- The instance is manually disconnected through the API
- The WhatsApp session expires
- The user logs out of WhatsApp
- A timeout occurs in the connection

## Errors and Considerations {#errors-and-considerations}

- **Security Validation**: Always validate the security header (e.g., `x-token`) before processing the payload
- **Asynchronous Processing**: For better performance, process notifications asynchronously
- **Instance State**: Update the instance state in your system when receiving this webhook
- **Pending Messages**: Pause message sending when the instance is disconnected
- **Reconnection**: Implement logic to automatically attempt reconnection when appropriate

## Notes {#notes}

- After receiving this webhook, the instance will not be able to send or receive messages
- To reconnect, you will need to generate a new QR Code and read it with WhatsApp
- Some disconnections are temporary and can be resolved with reconnection
- Monitor this webhook for recurring connection issues
- Implement alerts for frequent disconnections that may indicate problems