---
id: aceitar-convite
sidebar_position: 12
title: Accept Group Invitation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckCircle" size="lg" /> Accept Group Invite

Accept an invite to join a group through the Z-API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to accept an invite to join a group. The invite link can be obtained through received messages or via the [Get Invite Link](/docs/groups/obter-link) method.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/accept-invite-group?url={{URL_DE_CONVITE}}
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Client-Token` | string | Yes | [Account Security Token](../security/token-seguranca) |

---

## <Icon name="List" size="md" /> Attributes {#atributos}

### Required

| Attributes | Type | Description |
|-----------|------|-------------|
| `url` | string | Url received from the group invite. It can be obtained [here](/docs/webhooks/ao-receber#exemplo-de-retorno-de-texto) |

---

### URL

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/accept-invite-group?url=https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112
```

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/accept-invite-group?url=https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112
Client-Token: SEU_CLIENT_TOKEN
```

</TabItem>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validateInviteUrl(url) {
  if (!url || typeof url !== 'string' || url.trim().length === 0) {
    throw new Error('URL do convite é obrigatória');
  }
  if (!url.startsWith('https://chat.whatsapp.com/')) {
    throw new Error('URL do convite deve começar com https://chat.whatsapp.com/');
  }
  return url.trim();
}

// Dados da requisição com validação
const inviteUrl = validateInviteUrl('https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112');

// Aceitar convite com tratamento seguro de erros
async function acceptInvite() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/accept-invite-group?url=${encodeURIComponent(inviteUrl)}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if (result.success) {
      console.log('Convite aceito com sucesso');
    } else {
      console.error('Erro ao aceitar convite');
    }
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao aceitar convite:', error.message);
    throw error;
  }
}

// Executar função
acceptInvite();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Interface para resposta
interface AcceptInviteResponse {
  success: boolean;
}

// Validação de entrada (segurança)
function validateInviteUrl(url: string): string {
  if (!url || url.trim().length === 0) {
    throw new Error('URL do convite é obrigatória');
  }
  if (!url.startsWith('https://chat.whatsapp.com/')) {
    throw new Error('URL do convite deve começar com https://chat.whatsapp.com/');
  }
  return url.trim();
}

// Dados da requisição com validação
const inviteUrl: string = validateInviteUrl('https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112');

// Função para aceitar convite
async function acceptInvite(): Promise<AcceptInviteResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/accept-invite-group?url=${encodeURIComponent(inviteUrl)}`;

  const response = await fetch(url, {
    method: 'GET',
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
acceptInvite()
  .then((result) => console.log('Sucesso:', result.success))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import requests
from typing import Dict, Any
from urllib.parse import quote

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'SEU_CLIENT_TOKEN')

def validate_invite_url(url: str) -> str:
    """Valida formato da URL do convite."""
    if not url or not url.strip():
        raise ValueError('URL do convite é obrigatória')
    if not url.startswith('https://chat.whatsapp.com/'):
        raise ValueError('URL do convite deve começar com https://chat.whatsapp.com/')
    return url.strip()

# Dados da requisição com validação
invite_url = validate_invite_url('https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112')

# URL do endpoint (sempre HTTPS) com query parameters
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/accept-invite-group"

# Headers obrigatórios
headers = {
    "Client-Token": CLIENT_TOKEN,
    "Content-Type": "application/json"
}

# Parâmetros de query
params = {
    "url": invite_url
}

# Aceitar convite com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.get(url, headers=headers, params=params, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result.get('success'):
        print('Convite aceito com sucesso')
    else:
        print('Erro ao aceitar convite')
    
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

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
INVITE_URL="https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112"

# Aceitar convite via cURL
curl -X GET \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/accept-invite-group?url=$(printf '%s' "$INVITE_URL" | jq -sRr @uri)" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -H "Content-Type: application/json" \
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validateInviteUrl(url) {
  if (!url || typeof url !== 'string' || url.trim().length === 0) {
    throw new Error('URL do convite é obrigatória');
  }
  if (!url.startsWith('https://chat.whatsapp.com/')) {
    throw new Error('URL do convite deve começar com https://chat.whatsapp.com/');
  }
  return url.trim();
}

// Dados da requisição com validação
const inviteUrl = validateInviteUrl('https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112');

// Aceitar convite
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/accept-invite-group`);
url.searchParams.append('url', inviteUrl);

const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: 'GET',
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
      if (result.success) {
        console.log('Convite aceito com sucesso');
      } else {
        console.error('Erro ao aceitar convite');
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

// Validação de entrada (segurança)
function validateInviteUrl(url) {
  if (!url || typeof url !== 'string' || url.trim().length === 0) {
    throw new Error('URL do convite é obrigatória');
  }
  if (!url.startsWith('https://chat.whatsapp.com/')) {
    throw new Error('URL do convite deve começar com https://chat.whatsapp.com/');
  }
  return url.trim();
}

// Rota para aceitar convite
app.get('/accept-invite', async (req, res) => {
  try {
    // Dados da requisição com validação
    const rawInviteUrl = req.query.url || 'https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112';
    const inviteUrl = validateInviteUrl(rawInviteUrl);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/accept-invite-group`);
    url.searchParams.append('url', inviteUrl);

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'GET',
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

      req.end();
    });

    res.status(200).json(result);
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao aceitar convite:', error.message);
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

// Validação de entrada (segurança)
function validateInviteUrl(url) {
  if (!url || typeof url !== 'string' || url.trim().length === 0) {
    throw new Error('URL do convite é obrigatória');
  }
  if (!url.startsWith('https://chat.whatsapp.com/')) {
    throw new Error('URL do convite deve começar com https://chat.whatsapp.com/');
  }
  return url.trim();
}

// Rota para aceitar convite
router.get('/accept-invite', async (ctx) => {
  try {
    // Dados da requisição com validação
    const rawInviteUrl = ctx.query.url || 'https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112';
    const inviteUrl = validateInviteUrl(rawInviteUrl);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/accept-invite-group`);
    url.searchParams.append('url', inviteUrl);

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'GET',
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
  console.error('Erro ao aceitar convite:', err.message);
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
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class AcceptInvite {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";

    // Validação de entrada (segurança)
    private static String validateInviteUrl(String url) {
        if (url == null || url.trim().isEmpty()) {
            throw new IllegalArgumentException("URL do convite é obrigatória");
        }
        if (!url.startsWith("https://chat.whatsapp.com/")) {
            throw new IllegalArgumentException("URL do convite deve começar com https://chat.whatsapp.com/");
        }
        return url.trim();
    }

    public static void main(String[] args) {
        try {
            // Dados da requisição com validação
            String inviteUrl = validateInviteUrl("https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/accept-invite-group?url=%s",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(inviteUrl, StandardCharsets.UTF_8)
            );

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);

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
                    System.out.println("Convite aceito com sucesso");
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
using System.Threading.Tasks;

public class AcceptInvite
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") 
        ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") 
        ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") 
        ?? "SEU_CLIENT_TOKEN";

    // Validação de entrada (segurança)
    private static string ValidateInviteUrl(string url)
    {
        if (string.IsNullOrWhiteSpace(url))
        {
            throw new ArgumentException("URL do convite é obrigatória");
        }
        if (!url.StartsWith("https://chat.whatsapp.com/"))
        {
            throw new ArgumentException("URL do convite deve começar com https://chat.whatsapp.com/");
        }
        return url.Trim();
    }

    public static async Task Main(string[] args)
    {
        try
        {
            // Dados da requisição com validação
            string inviteUrl = ValidateInviteUrl("https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/accept-invite-group?url={Uri.EscapeDataString(inviteUrl)}";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine("Convite aceito com sucesso");
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
    "net/url"
    "os"
    "strings"
    "time"
)

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
var (
    instanceId    = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA")
    instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN")
    clientToken   = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")
)

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

// Validação de entrada (segurança)
func validateInviteUrl(inviteUrl string) (string, error) {
    trimmed := strings.TrimSpace(inviteUrl)
    if trimmed == "" {
        return "", fmt.Errorf("URL do convite é obrigatória")
    }
    if !strings.HasPrefix(trimmed, "https://chat.whatsapp.com/") {
        return "", fmt.Errorf("URL do convite deve começar com https://chat.whatsapp.com/")
    }
    return trimmed, nil
}

func main() {
    // Dados da requisição com validação
    inviteUrl, err := validateInviteUrl("https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    baseUrl := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/accept-invite-group",
        instanceId, instanceToken)
    u, err := url.Parse(baseUrl)
    if err != nil {
        fmt.Printf("Erro ao criar URL: %v\n", err)
        return
    }
    q := u.Query()
    q.Set("url", inviteUrl)
    u.RawQuery = q.Encode()

    client := &http.Client{
        Timeout: 30 * time.Second,
    }

    req, err := http.NewRequest("GET", u.String(), nil)
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
        fmt.Printf("Convite aceito com sucesso\n")
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

// Validação de entrada (segurança)
function validateInviteUrl($url) {
    $trimmed = trim($url);
    if (empty($trimmed)) {
        throw new Exception('URL do convite é obrigatória');
    }
    if (strpos($trimmed, 'https://chat.whatsapp.com/') !== 0) {
        throw new Exception('URL do convite deve começar com https://chat.whatsapp.com/');
    }
    return $trimmed;
}

try {
    // Dados da requisição com validação
    $inviteUrl = validateInviteUrl('https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/accept-invite-group?url=%s',
        urlencode($instanceId),
        urlencode($instanceToken),
        urlencode($inviteUrl)
    );

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
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
        if ($result['success'] ?? false) {
            echo "Convite aceito com sucesso\n";
        } else {
            echo "Erro ao aceitar convite\n";
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
CLIENT_TOKEN = ENV['ZAPI_CLIENT_TOKEN'] || 'SEU_CLIENT_TOKEN'

# Validação de entrada (segurança)
def validate_invite_url(invite_url)
  trimmed = invite_url.to_s.strip
  if trimmed.empty?
    raise ArgumentError, 'URL do convite é obrigatória'
  end
  unless trimmed.start_with?('https://chat.whatsapp.com/')
    raise ArgumentError, 'URL do convite deve começar com https://chat.whatsapp.com/'
  end
  trimmed
end

begin
  # Dados da requisição com validação
  invite_url = validate_invite_url('https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  base_url = "https://api.z-api.io/instances/#{URI.encode_www_form_component(INSTANCE_ID)}/token/#{URI.encode_www_form_component(INSTANCE_TOKEN)}/accept-invite-group"
  uri = URI(base_url)
  uri.query = URI.encode_www_form({ url: invite_url })

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Get.new(uri)
  request['Client-Token'] = CLIENT_TOKEN
  request['Content-Type'] = 'application/json'

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result['success']
      puts "Convite aceito com sucesso"
    else
      puts "Erro ao aceitar convite"
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
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "SEU_CLIENT_TOKEN"

// Validação de entrada (segurança)
func validateInviteUrl(_ url: String) throws -> String {
    let trimmed = url.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmed.isEmpty else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "URL do convite é obrigatória"])
    }
    guard trimmed.hasPrefix("https://chat.whatsapp.com/") else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "URL do convite deve começar com https://chat.whatsapp.com/"])
    }
    return trimmed
}

// Dados da requisição com validação
let inviteUrl = try validateInviteUrl("https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112")

// ⚠️ SEGURANÇA: Sempre use HTTPS
var urlComponents = URLComponents(string: "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/accept-invite-group")!
urlComponents.queryItems = [URLQueryItem(name: "url", value: inviteUrl)]

guard let url = urlComponents.url else {
    fatalError("URL inválida")
}

var request = URLRequest(url: url)
request.httpMethod = "GET"
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
                if let success = result?["success"] as? Bool, success {
                    print("Convite aceito com sucesso")
                } else {
                    print("Erro ao aceitar convite")
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
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "SEU_CLIENT_TOKEN" }

# Validação de entrada (segurança)
function Validate-InviteUrl {
    param([string]$Url)
    $trimmed = $Url.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed)) {
        throw "URL do convite é obrigatória"
    }
    if (-not $trimmed.StartsWith("https://chat.whatsapp.com/")) {
        throw "URL do convite deve começar com https://chat.whatsapp.com/"
    }
    return $trimmed
}

try {
    # Dados da requisição com validação
    $inviteUrl = Validate-InviteUrl -Url "https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $encodedUrl = [System.Web.HttpUtility]::UrlEncode($inviteUrl)
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/accept-invite-group?url=$encodedUrl"

    $headers = @{
        "Client-Token" = $clientToken
        "Content-Type" = "application/json"
    }

    $response = Invoke-RestMethod -Uri $url -Method Get -Headers $headers -TimeoutSec 30

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if ($response.success) {
        Write-Host "Convite aceito com sucesso"
    } else {
        Write-Host "Erro ao aceitar convite"
    }
} catch {
    # ⚠️ SEGURANÇA: Tratamento genérico de erro
    Write-Host "Erro: $($_.Exception.Message)"
}
```

</TabItem>
<TabItem value="http-raw" label="HTTP (Raw)">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/accept-invite-group?url=https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112 HTTP/1.1
Host: api.z-api.io
Client-Token: SEU_CLIENT_TOKEN
Content-Type: application/json
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
std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

// Validação de entrada (segurança)
std::string validateInviteUrl(const std::string& url) {
    std::string trimmed = url;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    
    if (trimmed.empty()) {
        throw std::runtime_error("URL do convite é obrigatória");
    }
    if (trimmed.find("https://chat.whatsapp.com/") != 0) {
        throw std::runtime_error("URL do convite deve começar com https://chat.whatsapp.com/");
    }
    return trimmed;
}

static size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

int main() {
    try {
        // Dados da requisição com validação
        std::string inviteUrl = validateInviteUrl("https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112");

        // URL encoding simples
        std::string encodedUrl;
        for (char c : inviteUrl) {
            if (std::isalnum(c) || c == '-' || c == '_' || c == '.' || c == '/' || c == ':' || c == '?') {
                encodedUrl += c;
            } else {
                char hex[4];
                snprintf(hex, sizeof(hex), "%%%02X", (unsigned char)c);
                encodedUrl += hex;
            }
        }

        CURL* curl = curl_easy_init();
        if (curl) {
            std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/accept-invite-group?url=" + encodedUrl;
            std::string responseData;

            struct curl_slist* headers = NULL;
            std::string tokenHeader = "Client-Token: " + clientToken;
            std::string contentTypeHeader = "Content-Type: application/json";
            headers = curl_slist_append(headers, tokenHeader.c_str());
            headers = curl_slist_append(headers, contentTypeHeader.c_str());

            curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
            curl_easy_setopt(curl, CURLOPT_HTTPGET, 1L);
            curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
            curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
            curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
            curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

            CURLcode res = curl_easy_perform(curl);
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

            if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
                // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                std::cout << "Convite aceito com sucesso" << std::endl;
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
char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

// Validação de entrada (segurança)
int validateInviteUrl(const char* url, char* cleaned) {
    int len = strlen(url);
    int j = 0;
    
    // Remove espaços iniciais e finais
    int start = 0;
    while (start < len && isspace(url[start])) start++;
    int end = len - 1;
    while (end >= start && isspace(url[end])) end--;
    
    if (end < start) {
        return 0; // Inválido
    }
    
    for (int i = start; i <= end; i++) {
        cleaned[j++] = url[i];
    }
    cleaned[j] = '\0';
    
    if (strncmp(cleaned, "https://chat.whatsapp.com/", 26) != 0) {
        return 0; // Inválido
    }
    
    return 1; // Válido
}

// URL encoding simples
void urlEncode(const char* input, char* output, size_t outputSize) {
    size_t j = 0;
    for (size_t i = 0; input[i] != '\0' && j < outputSize - 1; i++) {
        if (isalnum(input[i]) || input[i] == '-' || input[i] == '_' || input[i] == '.' || 
            input[i] == '/' || input[i] == ':' || input[i] == '?') {
            output[j++] = input[i];
        } else {
            snprintf(output + j, outputSize - j, "%%%02X", (unsigned char)input[i]);
            j += 3;
        }
    }
    output[j] = '\0';
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
    const char* inviteUrl = "https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112";
    char cleaned[512];
    char encoded[1024];
    
    if (!validateInviteUrl(inviteUrl, cleaned)) {
        fprintf(stderr, "URL do convite inválida. Deve começar com https://chat.whatsapp.com/\n");
        return 1;
    }

    urlEncode(cleaned, encoded, sizeof(encoded));

    CURL* curl = curl_easy_init();
    if (curl) {
        char url[2048];
        snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/accept-invite-group?url=%s",
                 instanceId, instanceToken, encoded);

        struct curl_slist* headers = NULL;
        char tokenHeader[512];
        char contentTypeHeader[] = "Content-Type: application/json";
        snprintf(tokenHeader, sizeof(tokenHeader), "Client-Token: %s", clientToken);
        headers = curl_slist_append(headers, tokenHeader);
        headers = curl_slist_append(headers, contentTypeHeader);

        struct MemoryStruct chunk;
        chunk.memory = malloc(1);
        chunk.size = 0;

        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_HTTPGET, 1L);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteMemoryCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, (void*)&chunk);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

        CURLcode res = curl_easy_perform(curl);
        long responseCode;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            printf("Convite aceito com sucesso\n");
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

### 200 OK {#200-ok}

```json
{
 "success": true
}
```

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` if the invite was accepted successfully, `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to resolve |
|------|--------|----------------|
| `405` | Incorrect HTTP method | Make sure you're using `GET` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `400` | Invalid URL | Check if the invite URL is correct and valid |

---

## <Icon name="Webhook" size="md" /> Related Webhook {#webhook}

The invite link can be obtained through the webhook when you receive a message with a group link. See more details in:

[Webhook on receiving message - Text return example](/docs/webhooks/ao-receber#exemplo-de-retorno-de-texto)

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Invite URL**: The URL must be the complete WhatsApp link (ex: `https://chat.whatsapp.com/...`)
- **Get URL**: The URL can be obtained through received messages or via the [Get Invite Link](/docs/groups/obter-link) method
- **Encoding**: Make sure to encode the URL when sending it as a query parameter