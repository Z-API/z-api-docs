---
id: dados-conta
title: Dados da Conta Business
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Building" size="lg" /> Dados da Conta Business

Obtenha informações completas sobre uma conta WhatsApp Business através da API do Z-API.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Este método retorna todas as informações públicas de uma conta WhatsApp Business, incluindo descrição, endereço, email, websites, categorias e horário de funcionamento.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/profile?phone={phone}
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](../security/token-seguranca) |

---

## <Icon name="Settings" size="md" /> Parâmetros {#parametros}

### Obrigatórios (Query)

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `phone` | string | Telefone da conta business no formato DDI DDD NÚMERO (ex: `5511999999999`). **IMPORTANTE**: Envie somente números, sem formatação ou máscara |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada
function validatePhone(phone) {
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    throw new Error('Telefone é obrigatório e não pode estar vazio');
  }
  // Validar se contém apenas números
  if (!/^\d+$/.test(phone.trim())) {
    throw new Error('Telefone deve conter apenas números (sem formatação ou máscara)');
  }
  return true;
}

// Obter dados da conta business com tratamento seguro de erros
async function getBusinessAccountData(phone) {
  try {
    // Validação de entrada
    validatePhone(phone);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/business/profile?phone=${encodeURIComponent(phone.trim())}`;
    
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
    console.log('Dados da conta business obtidos com sucesso');
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao obter dados da conta business:', error.message);
    throw error;
  }
}

// Exemplo de uso
getBusinessAccountData('5511999999999');
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Interface para resposta
interface BusinessAccountData {
  description?: string;
  address?: string;
  email?: string;
  websites?: string[];
  categories?: Array<{
    displayName: string;
    label: string;
    id: string;
  }>;
  businessHours?: {
    timezone: string;
    days: Array<{
      dayOfWeek: string;
      openTime: string;
      closeTime: string;
    }>;
    mode: string;
  };
  hasCoverPhoto: boolean;
}

// Validação de entrada
function validatePhone(phone: string): void {
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    throw new Error('Telefone é obrigatório e não pode estar vazio');
  }
  if (!/^\d+$/.test(phone.trim())) {
    throw new Error('Telefone deve conter apenas números (sem formatação ou máscara)');
  }
}

// Função para obter dados da conta business
async function getBusinessAccountData(phone: string): Promise<BusinessAccountData> {
  // Validação de entrada
  validatePhone(phone);

  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/business/profile?phone=${encodeURIComponent(phone.trim())}`;

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
getBusinessAccountData('5511999999999')
  .then((data) => console.log('Dados obtidos:', data))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import requests
import re
from typing import Dict, Any

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'SEU_CLIENT_TOKEN')

def validate_phone(phone: str) -> None:
    """Valida o telefone de entrada"""
    if not phone or not isinstance(phone, str) or not phone.strip():
        raise ValueError('Telefone é obrigatório e não pode estar vazio')
    if not re.match(r'^\d+$', phone.strip()):
        raise ValueError('Telefone deve conter apenas números (sem formatação ou máscara)')

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/business/profile"

# Headers obrigatórios
headers = {
    "Client-Token": CLIENT_TOKEN,
    "Content-Type": "application/json"
}

# Parâmetros da requisição
phone = "5511999999999"

# Obter dados da conta business com tratamento seguro de erros
try:
    # Validação de entrada
    validate_phone(phone)
    
    params = {
        "phone": phone.strip()
    }
    
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.get(url, headers=headers, params=params, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    print('Dados da conta business obtidos com sucesso')
    
except ValueError as e:
    print(f"Erro de validação: {e}")
except requests.exceptions.HTTPError as e:
    # ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
    print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
except requests.exceptions.RequestException as e:
    print(f"Erro na requisição: {e}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-SEU_CLIENT_TOKEN}"

# Parâmetros
PHONE="5511999999999"

# Validação básica (apenas números)
if ! [[ "$PHONE" =~ ^[0-9]+$ ]]; then
    echo "Erro: Telefone deve conter apenas números"
    exit 1
fi

# Obter dados da conta business via cURL
curl -X GET \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/business/profile?phone=${PHONE}" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -H "Content-Type: application/json" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE
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

// Validação de entrada
function validatePhone(phone) {
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    throw new Error('Telefone é obrigatório e não pode estar vazio');
  }
  if (!/^\d+$/.test(phone.trim())) {
    throw new Error('Telefone deve conter apenas números (sem formatação ou máscara)');
  }
}

// Obter dados da conta business
const phone = '5511999999999';

try {
  validatePhone(phone);
} catch (error) {
  console.error('Erro de validação:', error.message);
  process.exit(1);
}

const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/business/profile`);
url.searchParams.append('phone', phone.trim());

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
      console.log('Dados da conta business obtidos com sucesso');
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

// Validação de entrada
function validatePhone(phone) {
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    throw new Error('Telefone é obrigatório e não pode estar vazio');
  }
  if (!/^\d+$/.test(phone.trim())) {
    throw new Error('Telefone deve conter apenas números (sem formatação ou máscara)');
  }
}

// Rota para obter dados da conta business
app.get('/business/profile', async (req, res) => {
  try {
    const { phone } = req.query;

    // Validação de entrada
    validatePhone(phone);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/business/profile`);
    url.searchParams.append('phone', phone.trim());

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
    console.error('Erro ao obter dados da conta business:', error.message);
    res.status(400).json({ error: error.message });
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

// Validação de entrada
function validatePhone(phone) {
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    throw new Error('Telefone é obrigatório e não pode estar vazio');
  }
  if (!/^\d+$/.test(phone.trim())) {
    throw new Error('Telefone deve conter apenas números (sem formatação ou máscara)');
  }
}

// Rota para obter dados da conta business
router.get('/business/profile', async (ctx) => {
  try {
    const { phone } = ctx.query;

    // Validação de entrada
    validatePhone(phone);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/business/profile`);
    url.searchParams.append('phone', phone.trim());

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
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

// Error handler
app.on('error', (err, ctx) => {
  console.error('Erro ao obter dados da conta business:', err.message);
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

public class GetBusinessAccountData {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";

    // Validação de entrada
    private static void validatePhone(String phone) {
        if (phone == null || phone.trim().isEmpty()) {
            throw new IllegalArgumentException("Telefone é obrigatório e não pode estar vazio");
        }
        if (!phone.trim().matches("^\\d+$")) {
            throw new IllegalArgumentException("Telefone deve conter apenas números (sem formatação ou máscara)");
        }
    }

    public static void main(String[] args) {
        try {
            String phone = "5511999999999";

            // Validação de entrada
            validatePhone(phone);

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/business/profile?phone=%s",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(phone.trim(), StandardCharsets.UTF_8)
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
                    System.out.println("Dados da conta business obtidos com sucesso");
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
using System.Text.RegularExpressions;
using System.Threading.Tasks;

public class GetBusinessAccountData
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") 
        ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") 
        ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") 
        ?? "SEU_CLIENT_TOKEN";

    // Validação de entrada
    private static void ValidatePhone(string phone)
    {
        if (string.IsNullOrWhiteSpace(phone))
        {
            throw new ArgumentException("Telefone é obrigatório e não pode estar vazio");
        }
        if (!Regex.IsMatch(phone.Trim(), @"^\d+$"))
        {
            throw new ArgumentException("Telefone deve conter apenas números (sem formatação ou máscara)");
        }
    }

    public static async Task Main(string[] args)
    {
        try
        {
            string phone = "5511999999999";

            // Validação de entrada
            ValidatePhone(phone);

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/business/profile?phone={Uri.EscapeDataString(phone.Trim())}";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine("Dados da conta business obtidos com sucesso");
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
    "regexp"
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

// Validação de entrada
func validatePhone(phone string) error {
    if phone == "" {
        return fmt.Errorf("telefone é obrigatório e não pode estar vazio")
    }
    matched, _ := regexp.MatchString(`^\d+$`, phone)
    if !matched {
        return fmt.Errorf("telefone deve conter apenas números (sem formatação ou máscara)")
    }
    return nil
}

func main() {
    phone := "5511999999999"

    // Validação de entrada
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/business/profile?phone=%s",
        instanceId, instanceToken, phone)

    client := &http.Client{
        Timeout: 30 * time.Second,
    }

    req, err := http.NewRequest("GET", url, nil)
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
        fmt.Println("Dados da conta business obtidos com sucesso")
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

// Validação de entrada
function validatePhone($phone) {
    if (empty($phone) || !is_string($phone) || trim($phone) === '') {
        throw new Exception('Telefone é obrigatório e não pode estar vazio');
    }
    if (!preg_match('/^\d+$/', trim($phone))) {
        throw new Exception('Telefone deve conter apenas números (sem formatação ou máscara)');
    }
}

try {
    $phone = '5511999999999';

    // Validação de entrada
    validatePhone($phone);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/business/profile?phone=%s',
        urlencode($instanceId),
        urlencode($instanceToken),
        urlencode(trim($phone))
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
        echo "Dados da conta business obtidos com sucesso\n";
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

# Validação de entrada
def validate_phone(phone)
  raise 'Telefone é obrigatório e não pode estar vazio' if phone.nil? || !phone.is_a?(String) || phone.strip.empty?
  raise 'Telefone deve conter apenas números (sem formatação ou máscara)' unless phone.strip.match?(/^\d+$/)
end

begin
  phone = '5511999999999'

  # Validação de entrada
  validate_phone(phone)

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(INSTANCE_ID)}/token/#{URI.encode_www_form_component(INSTANCE_TOKEN)}/business/profile?phone=#{URI.encode_www_form_component(phone.strip)}")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Get.new(url)
  request['Client-Token'] = CLIENT_TOKEN
  request['Content-Type'] = 'application/json'

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    puts 'Dados da conta business obtidos com sucesso'
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

// Validação de entrada
func validatePhone(_ phone: String) throws {
    let trimmed = phone.trimmingCharacters(in: .whitespaces)
    if trimmed.isEmpty {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Telefone é obrigatório e não pode estar vazio"])
    }
    let phoneRegex = "^\\d+$"
    let phonePredicate = NSPredicate(format: "SELF MATCHES %@", phoneRegex)
    if !phonePredicate.evaluate(with: trimmed) {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Telefone deve conter apenas números (sem formatação ou máscara)"])
    }
}

let phone = "5511999999999"

do {
    // Validação de entrada
    try validatePhone(phone)

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let trimmedPhone = phone.trimmingCharacters(in: .whitespaces)
    guard let url = URL(string: "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/business/profile?phone=\(trimmedPhone.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? "")") else {
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
                    print("Dados da conta business obtidos com sucesso")
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

# Validação de entrada
function Validate-Phone {
    param([string]$Phone)
    if ([string]::IsNullOrWhiteSpace($Phone)) {
        throw "Telefone é obrigatório e não pode estar vazio"
    }
    if ($Phone -notmatch '^\d+$') {
        throw "Telefone deve conter apenas números (sem formatação ou máscara)"
    }
}

try {
    $phone = "5511999999999"

    # Validação de entrada
    Validate-Phone -Phone $phone

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/business/profile?phone=$([System.Web.HttpUtility]::UrlEncode($phone.Trim()))"

    $headers = @{
        "Client-Token" = $clientToken
        "Content-Type" = "application/json"
    }

    $response = Invoke-RestMethod -Uri $url -Method Get -Headers $headers -TimeoutSec 30

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    Write-Host "Dados da conta business obtidos com sucesso"
} catch {
    # ⚠️ SEGURANÇA: Tratamento genérico de erro
    Write-Host "Erro: $($_.Exception.Message)"
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/profile?phone=5511999999999 HTTP/1.1
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
#include <regex>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const std::string& key, const std::string& defaultValue) {
    const char* value = std::getenv(key.c_str());
    return value ? value : defaultValue;
}

std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
std::string instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

static size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

// Validação de entrada
bool validatePhone(const std::string& phone) {
    if (phone.empty()) {
        std::cerr << "Erro: Telefone é obrigatório" << std::endl;
        return false;
    }
    std::regex phoneRegex("^\\d+$");
    if (!std::regex_match(phone, phoneRegex)) {
        std::cerr << "Erro: Telefone deve conter apenas números" << std::endl;
        return false;
    }
    return true;
}

int main() {
    std::string phone = "5511999999999";

    // Validação de entrada
    if (!validatePhone(phone)) {
        return 1;
    }

    CURL* curl = curl_easy_init();
    if (curl) {
        std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/business/profile?phone=" + phone;
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
            std::cout << "Dados da conta business obtidos com sucesso" << std::endl;
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
#include <regex.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
char* instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

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

    // Validação básica (verificar se não está vazio)
    if (strlen(phone) == 0) {
        fprintf(stderr, "Erro: Telefone é obrigatório\n");
        return 1;
    }

    CURL* curl = curl_easy_init();
    if (curl) {
        char url[512];
        snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/business/profile?phone=%s",
                 instanceId, instanceToken, phone);

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
            printf("Dados da conta business obtidos com sucesso\n");
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
 "description": "Z API - Asas para sua imaginação",
 "address": "Maringá",
 "email": "zapi@example.com",
 "websites": [
 "https://www.z-api.io"
 ],
 "categories": [
 {
 "displayName": "Outras empresas",
 "label": "OTHER_COMPANIES",
 "id": "629412378414563"
 }
 ],
 "businessHours": {
 "timezone": "America/Sao_Paulo",
 "days": [
 {
 "dayOfWeek": "MONDAY",
 "openTime": "08:00",
 "closeTime": "18:00"
 },
 {
 "dayOfWeek": "TUESDAY",
 "openTime": "08:00",
 "closeTime": "18:00"
 },
 {
 "dayOfWeek": "WEDNESDAY",
 "openTime": "08:00",
 "closeTime": "18:00"
 },
 {
 "dayOfWeek": "THURSDAY",
 "openTime": "08:00",
 "closeTime": "18:00"
 },
 {
 "dayOfWeek": "FRIDAY",
 "openTime": "08:00",
 "closeTime": "18:00"
 }
 ],
 "mode": "specificHours"
 },
 "hasCoverPhoto": false
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `description` | string | Descrição da empresa |
| `address` | string | Endereço físico da empresa |
| `email` | string | Email da empresa |
| `websites` | array | URLs dos websites da empresa |
| `categories` | array | Dados das categorias da empresa |
| `categories[].displayName` | string | Nome da categoria |
| `categories[].label` | string | Label da categoria |
| `categories[].id` | string | ID da categoria |
| `businessHours` | object | Dados do horário de funcionamento |
| `businessHours.timezone` | string | Fuso horário |
| `businessHours.days` | array | Dados de funcionamento dos dias |
| `businessHours.days[].dayOfWeek` | string | Dia da semana (MONDAY, TUESDAY, etc.) |
| `businessHours.days[].openTime` | string | Horário de abertura (formato HH:MM) |
| `businessHours.days[].closeTime` | string | Horário de fechamento (formato HH:MM) |
| `businessHours.mode` | string | Tipo do horário de funcionamento (`specificHours` ou `alwaysOpen`) |
| `hasCoverPhoto` | boolean | Indica se a conta possui foto de capa |

---

### <Icon name="AlertCircle" size="sm" /> Códigos de Erro {#erros}

| Código | Motivo | Como resolver |
|--------|--------|---------------|
| `405` | Método HTTP incorreto | Certifique-se de estar usando `GET` conforme especificado |
| `415` | Content-Type ausente | Este método não requer Content-Type, mas se enviar, use `application/json` |
| `401` | Token inválido | Verifique o header `Client-Token` |
| `400` | Parâmetros inválidos | Verifique se o `phone` está no formato correto (apenas números) |
| `404` | Conta não encontrada | Verifique se o número informado é uma conta WhatsApp Business válida |

---

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Formato do telefone**: Envie apenas números, sem formatação ou máscara (ex: `5511999999999`)
- **Informações públicas**: Este método retorna apenas informações públicas da conta business
- **Horário de funcionamento**: O campo `mode` pode ser `specificHours` (horários específicos) ou `alwaysOpen` (sempre aberto)
- **Categorias**: As categorias são definidas pelo WhatsApp Business e não podem ser alteradas diretamente
- **Atualizar dados**: Para atualizar informações da conta, use os métodos específicos:
 - [Alterar Descrição](/docs/whatsapp-business/alterar-descricao-empresa)
 - [Alterar Endereço](/docs/whatsapp-business/alterar-endereco-empresa)
 - [Alterar Email](/docs/whatsapp-business/alterar-email-empresa)
 - [Alterar Websites](/docs/whatsapp-business/alterar-websites-empresa)
 - [Alterar Horário de Funcionamento](/docs/whatsapp-business/alterar-horario-funcionamento)
