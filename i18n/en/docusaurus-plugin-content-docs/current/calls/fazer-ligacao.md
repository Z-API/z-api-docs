---
id: fazer-ligacao
sidebar_position: 1
title: Make a connection
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Make a Call

Initiate a voice call through the Z-API API. Use this endpoint to make calls programmatically.

## Endpoint

```http
POST https://api.z-api.io/instances/{instanceId}/token/{token}/send-call
```

### Headers

- Client-Token: string (required)
- Content-Type: application/json

### Request Body

```json
{
  "phone": "5511999999999",
  "callDuration": 5
}
```

| Field | Type | Required | Description |
|-----------|---------|-------------|--------------------------------------------------|
| phone | string | Yes | Recipient number in DDI + DDD + NUMBER format (ex: `5511999999999`) |
| callDuration | number | No | Here you define how long you want the call to last, by default the call will have a duration of 5 seconds, but you can increase up to 15 seconds |

### Route Parameters

| Parameter | Type | Description |
|-----------|--------|----------------------------------------------|
| phone | string | Chat ID (format: `5511999999999@c.us` or `120363@g.us`) |

## Responses

### 200 OK

```json
{
 "value": true,
 "message": "Chamada iniciada"
}
```

### Common Errors

| Code | Reason | How to fix |
|--------|-----------------------|----------------------------------------------------|
| 400 | Invalid parameters | Check the `phone` |
| 401 | Invalid token | Check the header `Client-Token` |
| 404 | Chat not found | Check if the `phone` is correct |
| 429 | Rate limit | Wait and try again |
| 5xx | Internal error | Try again; open support if it persists |

## Code Examples

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

// Dados da requisição com validação
const phone = validatePhoneNumber('5511999999999');

// Fazer ligação com tratamento seguro de erros
async function makeCall() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-call`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      "phone": "5511999999999",
      "callDuration": 5
    }),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if (result.value) {
      console.log('Chamada iniciada com sucesso');
    } else {
      console.error('Erro ao iniciar chamada');
    }
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao iniciar chamada:', error.message);
    throw error;
  }
}

// Executar função
makeCall();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface para resposta
interface MarkReadResponse {
  value: boolean;
  message: string;
}

// Validação de entrada (segurança)
function validatePhone(phone: string): string {
  if (!phone || phone.trim().length === 0) {
    throw new Error('Phone inválido');
  }
  if (!phone.includes('@')) {
    throw new Error('Phone deve estar no formato: número@c.us ou número@g.us');
  }
  return phone.trim();
}

// Dados da requisição com validação
const phone: string = validatePhoneNumber('5511999999999');

// Função para fazer ligação
async function makeCall(): Promise<MarkReadResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-call`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Client-Token': clientToken,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
makeCall()
  .then((result) => console.log('Sucesso:', result.message))
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
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone_number(phone: str) -> str:
    """Valida formato do número de telefone."""
    if not phone or not phone.strip():
        raise ValueError('Número de telefone inválido')
    cleaned = ''.join(filter(str.isdigit, phone))
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError('Número de telefone deve ter entre 10 e 15 dígitos')
    return cleaned

# Dados da requisição com validação
phone = validate_phone_number('5511999999999')
call_type = "voice"
# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-call"

# Headers obrigatórios
headers = {
    "Client-Token": CLIENT_TOKEN,
    "Content-Type": "application/json"
}

# Payload da requisição
payload = {
    "phone": phone,
    "type": call_type,
    "

# Fazer ligação com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result.get('value'):
        print('Chamada iniciada com sucesso')
    else:
        print('Erro ao iniciar chamada')
    
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
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
PHONE="5511999999999"

# Fazer ligação via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-call" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"phone":"'${PHONE}'","type":"voice","callDuration":5}' \
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
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

// Dados da requisição com validação
const phone = validatePhoneNumber('5511999999999');
const callType = "voice";

// Fazer ligação
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-call`);

const body = JSON.stringify({
  phone: phon

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Client-Token': clientToken,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
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
      if (result.value) {
        console.log('Chamada iniciada');
      } else {
        console.error('Erro ao iniciar chamada');
      }
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

req.write(body);
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validação de entrada (segurança)
function validatePhone(phone) {
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    throw new Error('Phone inválido');
  }
  if (!phone.includes('@')) {
    throw new Error('Phone deve estar no formato: número@c.us ou número@g.us');
  }
  return phone.trim();
}

// Rota para fazer ligação
app.post('/calls', async (req, res) => {
  try {
    // Dados da requisição com validação
    const rawPhone = req.body.phone || '5511999999999';
    const phone = validatePhoneNumber(rawPhone);
    const callType = req.body.type || 'voice';

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-call`);

    const body = JSON.stringify({
      phone: phon
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
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

      req.write(body);
      req.end();
    });

    res.status(200).json(result);
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao iniciar chamada:', error.message);
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

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

// Rota para fazer ligação
router.post('/calls', async (ctx) => {
  try {
    // Dados da requisição com validação
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const phone = validatePhoneNumber(rawPhone);
    const callType = ctx.request.body.type || 'voice';

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-call`);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-call`);

    const body = JSON.stringify({
      phone: phon.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
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

      req.write(body);
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
  console.error('Erro ao iniciar chamada:', err.message);
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

public class MakeCall {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validação de entrada (segurança)
    private static String validatePhoneNumber(String phone) {
        if (phone == null || phone.trim().isEmpty()) {
            throw new IllegalArgumentException("Número de telefone inválido");
        }
        String cleaned = phone.replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("Número de telefone deve ter entre 10 e 15 dígitos");
        }
        return cleaned;
    }

    public static void main(String[] args) {
        try {
            // Dados da requisição com validação
            String phone = validatePhoneNumber("5511999999999");
            String callType = "voice";

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-call",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
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
            String jsonBody = String.format("{\"phone\":\"%s\",\"type\":\"%s\"}", phone, callType);
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonBody.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }
}", phon
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
                    System.out.println("Chamada iniciada com sucesso");
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

public class MakeCall
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") 
        ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") 
        ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") 
        ?? "seu-token-de-seguranca";

    // Validação de entrada (segurança)
    private static string ValidatePhoneNumber(string phone)
    {
        if (string.IsNullOrWhiteSpace(phone))
        {
            throw new ArgumentException("Número de telefone inválido");
        }
        string cleaned = new string(phone.Where(char.IsDigit).ToArray());
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("Número de telefone deve ter entre 10 e 15 dígitos");
        }
        return cleaned;
    }

    public static async Task Main(string[] args)
    {
        try
        {
            // Dados da requisição com validação
            string phone = ValidatePhoneNumber("5511999999999");
            string callType = "voice";

            // ⚠️ SEGURANÇA: Sempre use HTTPS

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-call";

            var payload = new
            {
                phone = phonclient = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var json = System.Text.Json.JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine("Chamada iniciada com sucesso");
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
    clientToken   = getEnv("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca")
)

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

// Validação de entrada (segurança)
func validatePhoneNumber(phone string) (string, error) {
    // Remove caracteres não numéricos
    cleaned := ""
    for _, r := range phone {
        if r >= '0' && r <= '9' {
            cleaned += string(r)
        }
    }
    if len(cleaned) < 10 || len(cleaned) > 15 {
        return "", fmt.Errorf("Número de telefone deve ter entre 10 e 15 dígitos")
    }
    return cleaned, nil
}

func main() {
    // Dados da requisição com validação
    phone, err := validatePhoneNumber("5511999999999")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-call",
        instanceId, instanceToken)
    payload := map[string]interface{}{
        "phone": phone,
    }

    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Erro ao criar JSON: %v\n", err)
    }

    client := &http.Client{
        Timeout: 30 * time.Second,
    }

    req, err := http.NewRequest("POST", url, strings.NewReader(string(jsonData)))
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
        fmt.Printf("Chamada iniciada com sucesso\n")
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
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'seu-token-de-seguranca';

// Validação de entrada (segurança)
function validatePhoneNumber($phone) {
    $cleaned = preg_replace('/\D/', '', $phone);
    if (empty($cleaned) || strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new Exception('Número de telefone deve ter entre 10 e 15 dígitos');
    }
    return $cleaned;
}

try {
    // Dados da requisição com validação
    $phone = validatePhoneNumber('5511999999999');
    $callType = 'voice';

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-call',
        urlencode($instanceToken)
    );

    $jsonBody = json_encode([
        'phone' => $phone,
        'type' => $callType
    ]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLT_POSTFIELDS, $jsonBody);
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
        if ($result['value'] ?? false) {
            echo "Chamada iniciada com sucesso\n";
        } else {
            echo "Erro ao iniciar chamada\n";
        }
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
CLIENT_TOKEN = ENV['ZAPI_CLIENT_TOKEN'] || 'seu-token-de-seguranca'

# Validação de entrada (segurança)
def validate_phone_number(phone)
  cleaned = phone.to_s.gsub(/\D/, '')
  if cleaned.empty? || cleaned.length < 10 || cleaned.length > 15
    raise ArgumentError, 'Número de telefone deve ter entre 10 e 15 dígitos'
  end
  cleaned
end

begin
  # Dados da requisição com validação
  phone = validate_phone_number('5511999999999')
  call_type = 'voice'

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(INSTANCE_ID)}/token/#{URI.encode_www_form_component(INSTANCE_TOKEN)}/send-call")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url)
  request.body = {
    phone: phone,
    type: call_type
  }.to_json
  request['Client-Token'] = CLIENT_TOKEN
  request['Content-Type'] = 'application/json'

  response = htt
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result['value']
      puts "Chamada iniciada com sucesso"
    else
      puts "Erro ao iniciar chamada"
    end
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
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "seu-token-de-seguranca"

// Validação de entrada (segurança)
func validatePhoneNumber(_ phone: String) throws -> String {
    let cleaned = phone.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
    guard cleaned.count >= 10 && cleaned.count <= 15 else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "Número de telefone deve ter entre 10 e 15 dígitos"])
    }
    return cleaned
}

// Dados da requisição com validação
let phone = try validatePhoneNumber("5511999999999")
let callType = "voice"

// ⚠️ SEGURANÇA: Sempre use HTTPS
guard let url = URL(string: "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-call") else {
    fatalError("URL inválida")
}

request.httpMethod = "POST"

let payload: [String: Any] = [
    "phone": phone,
    "type": callType
]

request.httpBody = try JSONSerialization.data(withJSONObject: payload)
request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
request.timeoutInterval = 30
n.shared.dataTask(with: request) { data, response, error in
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
                if let value = result?["value"] as? Bool, value {
                    print("Chamada iniciada com sucesso")
                } else {
                    print("Erro ao iniciar chamada")
                }
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
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCIA" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# Validação de entrada (segurança)
function Validate-PhoneNumber {
    param([string]$Phone)
    $cleaned = $Phone -replace '\D', ''
    if ([string]::IsNullOrWhiteSpace($cleaned) -or $cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "Número de telefone deve ter entre 10 e 15 dígitos"
    }
    return $cleaned
}

try {
    # Dados da requisição com validação
    $phone = Validate-PhoneNumber -Phone "5511999999999"
    $callType = "voice"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-call"

    $headers = @{
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        type = $callType
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if ($response.value) {
        Write-Host "Chamada iniciada com sucesso"
        Write-Host "Erro ao iniciar chamada"
    }
} catch {
    # ⚠️ SEGURANÇA: Tratamento genérico de erro
    Write-Host "Erro: $($_.Exception.Message)"
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-call HTTP/1.1
Host: api.z-api.io
Client-Token: seu-token-de-seguranca
Content-Type: application/json

{
  "phone": "5511999999999",
  "type": "voice",
  "callDuration": 5
}
```

</TabItem>
<TabItem value="cpp" label="C++">

```clude <iostream>
#include <string>
#include <curl/curl.h>
#include <sstream>
#include <cctype>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const std::string& key, const std::string& defaultValue) {
    const char* value = std::getenv(key.c_str());
    return value ? value : defaultValue;
}

std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
std::string instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");

// Validação de entrada (segurança)
std::string validatePhoneNumber(const std::string& phone) {
    std::string cleaned;
    for (char c : phone) {
        if (std::isdigit(c)) {
            cleaned += c;
        }
    }
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::runtime_error("Número de telefone deve ter entre 10 e 15 dígitos");
    }
    return cleaned;
}

static size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

int main() {
    try {
        // Dados da requisição com validação
        std::string phone = validatePhoneNumber("5511999999999");
        std::string callType = "voice";

        // Body da requisição
        std::ostringstream jsonBody;
        jsonBody << "{\"phone\":\"" << phone << "\",\"type\":\"" << callType << "\"}";

        CURL* curl = curl_easy_init();
        if (curl) {
            std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-call";

        // Body da requisição
        std::ostringstream jsonBody;
        jsonBody << "{\"phone\":\"" << phon
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
                std::cout << "Chamada iniciada com sucesso" << std::endl;
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
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
char* instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");

// Validação de entrada (segurança)
int validatePhoneNumber(const char* phone, char* cleaned) {
    int len = strlen(phone);
    int j = 0;
    
    // Remove caracteres não numéricos
    for (int i = 0; i < len; i++) {
        if (phone[i] >= '0' && phone[i] <= '9') {
            cleaned[j++] = phone[i];
        }
    }
    cleaned[j] = '\0';
    
    int cleanedLen = strlen(cleaned);
    if (cleanedLen < 10 || cleanedLen > 15) {
        return 0; // Inválido
    }
    
    return 1; // Válido
}

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
    const char* phone = "5511999999999";
    const char* callType = "voice";
    char cleaned[256];
    
    if (!validatePhoneNumber(phone, cleaned)) {
        fprintf(stderr, "Número de telefone inválido. Deve ter entre 10 e 15 dígitos\n");
        return 1;
    }

    // Body da requisição
    char cleaned[256];
    
    if (!validatePhoneNumber(phone, cleaned)) {
        fprintf(stderr, "Número de telefone inválido. Deve ter entre 10 e 15 dígitos\n");
        return 1;
    }

    // Body da requisição
    char jsonBody[512];
    snprintf(jsonBody, sizeof(jsonBody), "{\"phone\":\"%s\"}", cleaned
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
            printf("Chamada iniciada com sucesso\n");
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

## Phone Format

The `phone` can have different formats depending on the type of chat:

- **Individual Chat**: `5511999999999@c.us`
- **Group**: `120363@g.us`
- **Community**: `120363@c.us`

## Notes

- Marking a chat as read removes the unread message counter
- The read status is updated in WhatsApp
- Use this endpoint to keep your chats organized
- You can mark individual chats or groups as read
- After marking as read, the chat will no longer appear with unread notifications