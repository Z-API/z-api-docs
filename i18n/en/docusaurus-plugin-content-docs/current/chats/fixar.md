---
id: fixar
title: Pin Chat
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Pin Chat

Pin or unpin a chat to the top of the conversation list through the Z-API. Use this endpoint to keep important chats always visible.

## Endpoint

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat
```

### Headers

- Client-Token: string (required)
- Content-Type: application/json

### Attributes

**Required**

| Attributes | Type | Description |
|-----------|------|-------------|
| phone | integer | Phone number you want to change in YOUR chat |
| action | string | Attribute to pin and unpin the chat (pin or unpin) |

### Request Body

Example

```json
{
  "phone": "5544999999999",
  "action": "pin" ou "unpin"
}
```

## Responses

### 200 OK

```json
{
 "value": true
}
```

| Attributes | Type | Description |
|-----------|------|-------------|
| value | boolean | Attribute confirming the action |

### Common Errors

| Code | Reason | How to resolve |
|--------|-----------------------|----------------------------------------------------|
| 400 | Invalid parameters | Check `chatId` |
| 401 | Invalid token | Check the header `Client-Token` |
| 404 | Chat not found | Check if `chatId` is correct |
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

// Fixar com tratamento seguro de erros
async function pinChat() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/modify-chat`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
        action: 'pin'
      }),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if (result.value) {
      console.log('Chat fixado com sucesso');
    } else {
      console.error('Erro ao fixar chat');
    }
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao fixar chat:', error.message);
    throw error;
  }
}

// Executar função
pinChat();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface para resposta
interface PinChatResponse {
  value: boolean;
}

// Validação de entrada (segurança)
function validatePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

// Dados da requisição com validação
const phone: string = validatePhoneNumber('5511999999999');

// Função para fixar
async function pinChat(): Promise<PinChatResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/modify-chat`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Client-Token': clientToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone: phone,
      action: 'pin'
    }),
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
pinChat()
  .then((result) => console.log('Sucesso:', result.value ? 'Chat fixado' : 'Falha'))
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
    """Valida e limpa número de telefone."""
    cleaned = ''.join(filter(str.isdigit, phone))
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError('Número de telefone inválido. Use formato: DDI + DDD + Número')
    return cleaned

# Dados da requisição com validação
phone = validate_phone_number('5511999999999')

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/modify-chat"

# Headers obrigatórios
headers = {
    "Client-Token": CLIENT_TOKEN,
    "Content-Type": "application/json"
}

# Body da requisição
body = {
    "phone": phone,
    "action": "pin"
}

# Fixar chat com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.post(url, headers=headers, json=body, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result.get('value'):
        print('Chat fixado com sucesso')
    else:
        print('Erro ao fixar chat')
    
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

# Fixar chat via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/modify-chat" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"action\": \"pin\"
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

// Fixar
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/modify-chat`);

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Client-Token': clientToken,
    'Content-Type': 'application/json',
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
        console.log('Chat fixado');
      } else {
        console.error('Erro ao fixar chat');
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

req.write(JSON.stringify({
  phone: phone,
  action: 'pin'
}));

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
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

// Rota para fixar
app.post('/chats/:phone/pin', async (req, res) => {
  try {
    // Dados da requisição com validação
    const rawPhone = req.params.phone || '5511999999999';
    const phone = validatePhoneNumber(rawPhone);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/modify-chat`);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
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

      req.write(JSON.stringify({
        phone: phone,
        action: 'pin'
      }));

      req.end();
    });

    res.status(200).json(result);
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao fixar chat:', error.message);
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

// Rota para fixar
router.post('/chats/:phone/pin', async (ctx) => {
  try {
    // Dados da requisição com validação
    const rawPhone = ctx.params.phone || '5511999999999';
    const phone = validatePhoneNumber(rawPhone);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/modify-chat`);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
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

      req.write(JSON.stringify({
        phone: phone,
        action: 'pin'
      }));

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
  console.error('Erro ao fixar chat:', err.message);
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

public class PinChat {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validação de entrada (segurança)
    private static String validatePhoneNumber(String phone) {
        String cleaned = phone.replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("Número de telefone inválido. Use formato: DDI + DDD + Número");
        }
        return cleaned;
    }

    public static void main(String[] args) {
        try {
            // Dados da requisição com validação
            String phone = validatePhoneNumber("5511999999999");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/modify-chat",
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

            String jsonInputString = String.format("{\"phone\": \"%s\", \"action\": \"pin\"}", phone);

            try(OutputStream os = conn.getOutputStream()) {
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
                    System.out.println("Chat fixado com sucesso");
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

public class PinChat
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
        string cleaned = System.Text.RegularExpressions.Regex.Replace(phone, @"\D", "");
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("Número de telefone inválido. Use formato: DDI + DDD + Número");
        }
        return cleaned;
    }

    public static async Task Main(string[] args)
    {
        try
        {
            // Dados da requisição com validação
            string phone = ValidatePhoneNumber("5511999999999");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/modify-chat";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var json = $"{{\"phone\": \"{phone}\", \"action\": \"pin\"}}";
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine("Chat fixado com sucesso");
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

// Validação de entrada (segurança) e sanitização
func validatePhoneNumber(phone string) (string, error) {
    // Remove caracteres não numéricos
    re := regexp.MustCompile(`\D`)
    cleaned := re.ReplaceAllString(phone, "")

    if len(cleaned) < 10 || len(cleaned) > 15 {
        return "", fmt.Errorf("número de telefone inválido: deve ter entre 10 e 15 dígitos")
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
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/modify-chat",
        instanceId, instanceToken)

    payload := map[string]string{
        "phone":  phone,
        "action": "pin",
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
        fmt.Printf("Chat fixado com sucesso\n")
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

// Validação de entrada (segurança) e sanitização
function validatePhoneNumber($phone) {
    // Remove tudo que não for dígito
    $cleaned = preg_replace('/\D/', '', $phone);
    
    if (empty($cleaned) || strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new Exception('Número de telefone inválido. Deve conter entre 10 e 15 dígitos.');
    }
    return $cleaned;
}

try {
    // Dados da requisição com validação
    $phone = validatePhoneNumber('5511999999999');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/modify-chat',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $data = [
        'phone' => $phone,
        'action' => 'pin'
    ];
    $json = json_encode($data);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
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
            echo "Chat fixado com sucesso\n";
        } else {
            echo "Erro ao fixar chat\n";
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

# Validação de entrada (segurança) e sanitização
def validate_phone_number(phone)
  # Remove tudo que não for dígito
  cleaned = phone.to_s.gsub(/\D/, '')
  
  if cleaned.empty? || cleaned.length < 10 || cleaned.length > 15
    raise ArgumentError, 'Número de telefone inválido. Deve ter entre 10 e 15 dígitos.'
  end
  cleaned
end

begin
  # Dados da requisição com validação
  phone = validate_phone_number('5511999999999')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(INSTANCE_ID)}/token/#{URI.encode_www_form_component(INSTANCE_TOKEN)}/modify-chat")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url)
  request['Client-Token'] = CLIENT_TOKEN
  request['Content-Type'] = 'application/json'
  request.body = JSON.generate({
    phone: phone,
    action: 'pin'
  })

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result['value']
      puts "Chat fixado com sucesso"
    else
      puts "Erro ao fixar chat"
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

// Validação de entrada (segurança) e sanitização
func validatePhoneNumber(_ phone: String) throws -> String {
    let digits = phone.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
    
    guard !digits.isEmpty, digits.count >= 10, digits.count <= 15 else {
         throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "Número de telefone inválido. Deve ter entre 10 e 15 dígitos."])
    }
    return digits
}

// Dados da requisição com validação
let phone = try validatePhoneNumber("5511999999999")

// ⚠️ SEGURANÇA: Sempre use HTTPS
guard let url = URL(string: "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/modify-chat") else {
    fatalError("URL inválida")
}

var request = URLRequest(url: url)
request.httpMethod = "POST"
request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
request.timeoutInterval = 30

let body: [String: Any] = [
    "phone": phone,
    "action": "pin"
]
request.httpBody = try JSONSerialization.data(withJSONObject: body)

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
                if let value = result?["value"] as? Bool, value {
                    print("Chat fixado com sucesso")
                } else {
                    print("Erro ao fixar chat")
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

# Validação de entrada (segurança) e sanitização
function Validate-PhoneNumber {
    param([string]$Phone)
    # Remove tudo que não for dígito
    $cleaned = $Phone -replace '\D', ''
    
    if ([string]::IsNullOrWhiteSpace($cleaned) -or $cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "Número de telefone inválido. Deve ter entre 10 e 15 dígitos."
    }
    return $cleaned
}

try {
    # Dados da requisição com validação
    $phone = Validate-PhoneNumber -Phone "5511999999999"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/modify-chat"

    $headers = @{
        "Client-Token" = $clientToken
        "Content-Type" = "application/json"
    }

    $body = @{
        phone = $phone
        action = "pin"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if ($response.value) {
        Write-Host "Chat fixado com sucesso"
    } else {
        Write-Host "Erro ao fixar chat"
    }
} catch {
    # ⚠️ SEGURANÇA: Tratamento genérico de erro
    Write-Host "Erro: $($_.Exception.Message)"
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat HTTP/1.1
Host: api.z-api.io
Client-Token: seu-token-de-seguranca
Content-Type: application/json

{
  "phone": "5511999999999",
  "action": "pin"
}
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const std::string& key, const std::string& defaultValue) {
    const char* value = std::getenv(key.c_str());
    return value ? value : defaultValue;
}

std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
std::string instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");

// Validação de entrada (segurança) e sanitização
std::string validatePhoneNumber(const std::string& phone) {
    std::string cleaned;
    for (char c : phone) {
        if (isdigit(c)) {
            cleaned += c;
        }
    }
    
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::runtime_error("Número de telefone inválido. Deve ter entre 10 e 15 dígitos.");
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

        CURL* curl = curl_easy_init();
        if (curl) {
            std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/modify-chat";
            std::string responseData;

            // Simple JSON creation for C++ example to avoid external dependencies
            std::string jsonPayload = "{\"phone\": \"" + phone + "\", \"action\": \"pin\"}";

            struct curl_slist* headers = NULL;
            std::string tokenHeader = "Client-Token: " + clientToken;
            std::string contentTypeHeader = "Content-Type: application/json";
            headers = curl_slist_append(headers, tokenHeader.c_str());
            headers = curl_slist_append(headers, contentTypeHeader.c_str());

            curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
            curl_easy_setopt(curl, CURLOPT_POST, 1L);
            curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload.c_str());
            curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
            curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
            curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
            curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

            CURLcode res = curl_easy_perform(curl);
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

            if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
                // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                std::cout << "Chat fixado com sucesso" << std::endl;
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
#include <ctype.h>
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
char* instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");

// Validação de entrada (segurança) e sanitização
int validatePhoneNumber(const char* phone, char* cleaned) {
    int j = 0;
    int len = strlen(phone);
    
    for (int i = 0; i < len; i++) {
        if (isdigit(phone[i])) {
            cleaned[j++] = phone[i];
        }
    }
    cleaned[j] = '\0';
    
    if (j < 10 || j > 15) {
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
    char phone[] = "5511999999999";
    char cleaned[20];
    
    if (!validatePhoneNumber(phone, cleaned)) {
        fprintf(stderr, "Número de telefone inválido. Deve ter entre 10 e 15 dígitos.\n");
        return 1;
    }

    CURL* curl = curl_easy_init();
    if (curl) {
        char url[512];
        snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/modify-chat",
                 instanceId, instanceToken);

        struct curl_slist* headers = NULL;
        char tokenHeader[256];
        char contentTypeHeader[] = "Content-Type: application/json";
        snprintf(tokenHeader, sizeof(tokenHeader), "Client-Token: %s", clientToken);
        headers = curl_slist_append(headers, tokenHeader);
        headers = curl_slist_append(headers, contentTypeHeader);

        char jsonPayload[256];
        snprintf(jsonPayload, sizeof(jsonPayload), "{\"phone\": \"%s\", \"action\": \"pin\"}", cleaned);

        struct MemoryStruct chunk;
        chunk.memory = malloc(1);
        chunk.size = 0;

        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_POST, 1L);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteMemoryCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, (void*)&chunk);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

        CURLcode res = curl_easy_perform(curl);
        long responseCode;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            printf("Chat fixado com sucesso\n");
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

## Notes

- Pinned chats appear at the top of the conversation list
- You can pin multiple chats
- Use this endpoint to keep important conversations always accessible