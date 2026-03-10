---
id: produtos
sidebar_position: 1
title: Manage products
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Manage Products

Manage products from your WhatsApp Business catalog through the Z-API. Use this endpoint to create, edit and list products.

## Endpoint

```http
POST https://api.z-api.io/instances/{instanceId}/token/{instanceToken}/business/products
```

### Headers

- Client-Token: string (required)
- Content-Type: application/json

### Request Body

```json
{
  "name": "Nome do Produto",
  "description": "Descrição do produto",
  "price": 99.90,
  "currency": "BRL",
  "images": ["https://exemplo.com/imagem1.jpg"],
  "category": "Categoria"
    }
```

| Field | Type | Required | Description |
|-----------|--------|-------------|--------------------------------------------------|
| name | string | Yes | Product name |
| description | string | No | Product description |
| price | number | Yes | Product price |
| currency | string | Yes | Currency (ex: BRL, USD) |
| images | array | No | Array of product image URLs |
| category | string | No | Product category |


## Responses

### 200 OK

```json
{
 "value": true,
 "message": "Produto gerenciado"
}
```

### Common Errors

| Code | Reason | How to Solve |
|--------|-----------------------|----------------------------------------------------|
| 400 | Invalid parameters | Check required fields (name, price, currency) |
| 401 | Invalid token | Check the header `Client-Token` |
| 404 | Instance not found | Check if the `instanceId` is correct |
| 429 | Rate limit | Wait and try again |
| 5xx | Internal error | Try again; open support if persists |

## Code Examples

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validação de entrada (segurança)
function validateProductData(name, price, currency) {
  if (!name || name.trim().length === 0) {
    throw new Error('Nome do produto é obrigatório');
  }
  if (typeof price !== 'number' || price <= 0) {
    throw new Error('Preço deve ser um número positivo');
  }
  if (!currency || currency.trim().length === 0) {
    throw new Error('Moeda é obrigatória');
  }
  return { name: name.trim(), price, currency: currency.trim() };
}

// Dados da requisição com validação
const { name, price, currency } = validateProductData("Nome do Produto", 99.90, "BRL");
const description = "Descrição do produto"; // Opcional
const images = ["https://exemplo.com/imagem1.jpg"]; // Opcional
const category = "Categoria"; // Opcional

// Gerenciar produto com tratamento seguro de erros
async function manageProduct() {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/business/products`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        currency: currency,
        images: images,
        category: category
    }),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if (result.value) {
      console.log('Produto gerenciado com sucesso');
    } else {
      console.error('Erro ao gerenciar produto');
    }
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao gerenciar produto:', error.message);
    throw error;
  }
}

// Executar função
manageProduct();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interface para resposta
interface ProductResponse {
  value: boolean;
  message: string;
}

// Validação de entrada (segurança)
function validateProductData(name: string, price: number, currency: string): { name: string; price: number; currency: string } {
  if (!name || name.trim().length === 0) {
    throw new Error('Nome do produto é obrigatório');
  }
  if (typeof price !== 'number' || price <= 0) {
    throw new Error('Preço deve ser um número positivo');
  }
  if (!currency || currency.trim().length === 0) {
    throw new Error('Moeda é obrigatória');
  }
  return { name: name.trim(), price, currency: currency.trim() };
}

// Dados da requisição com validação
const { name, price, currency } = validateProductData("Nome do Produto", 99.90, "BRL");
const description: string = "Descrição do produto"; // Opcional
const images: string[] = ["https://exemplo.com/imagem1.jpg"]; // Opcional
const category: string = "Categoria"; // Opcional

// Função para gerenciar produto
async function manageProduct(): Promise<ProductResponse> {
  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/business/products`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Client-Token': clientToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      description: description,
      price: price,
      currency: currency,
      images: images,
      category: category
    }),
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
manageProduct()
  .then((result) => console.log('Produto gerenciado:', result.message))
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

def validate_product_data(name: str, price: float, currency: str) -> dict:
    """Valida dados do produto."""
    if not name or not name.strip():
        raise ValueError('Nome do produto é obrigatório')
    if not isinstance(price, (int, float)) or price <= 0:
        raise ValueError('Preço deve ser um número positivo')
    if not currency or not currency.strip():
        raise ValueError('Moeda é obrigatória')
    return {"name": name.strip(), "price": price, "currency": currency.strip()}

# Dados da requisição com validação
product_data = validate_product_data("Nome do Produto", 99.90, "BRL")
description = "Descrição do produto"  # Opcional
images = ["https://exemplo.com/imagem1.jpg"]  # Opcional
category = "Categoria"  # Opcional

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/business/products"

# Headers obrigatórios
headers = {
    "Client-Token": CLIENT_TOKEN,
    "Content-Type": "application/json"
}

# Payload da requisição
payload = {
    **product_data,
    "description": description,
    "images": images,
    "category": category
}

# Gerenciar produto com tratamento seguro de erros
try:
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result.get('value'):
        print('Produto gerenciado com sucesso')
    else:
        print('Erro ao gerenciar produto')
    
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
# Gerenciar produto via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/business/products" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nome do Produto",
    "description": "Descrição do produto",
    "price": 99.90,
    "currency": "BRL",
    "images": ["https://exemplo.com/imagem1.jpg"],
    "category": "Categoria"
  }' \
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
function validateProductData(name, price, currency) {
  if (!name || name.trim().length === 0) {
    throw new Error('Nome do produto é obrigatório');
  }
  if (typeof price !== 'number' || price <= 0) {
    throw new Error('Preço deve ser um número positivo');
  }
  if (!currency || currency.trim().length === 0) {
    throw new Error('Moeda é obrigatória');
  }
  return { name: name.trim(), price, currency: currency.trim() };
}

// Dados da requisição com validação
const { name, price, currency } = validateProductData("Nome do Produto", 99.90, "BRL");
const description = "Descrição do produto"; // Opcional
const images = ["https://exemplo.com/imagem1.jpg"]; // Opcional
const category = "Categoria"; // Opcional

// Gerenciar produto
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/business/products`);

const body = JSON.stringify({
  name: name,
  description: description,
  price: price,
  currency: currency,
  images: images,
  category: category
});

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Client-Token': clientToken,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
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
        console.log('Produto gerenciado com sucesso');
      } else {
        console.error('Erro ao gerenciar produto');
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
function validateProductData(name, price, currency) {
  if (!name || name.trim().length === 0) {
    throw new Error('Nome do produto é obrigatório');
  }
  if (typeof price !== 'number' || price <= 0) {
    throw new Error('Preço deve ser um número positivo');
  }
  if (!currency || currency.trim().length === 0) {
    throw new Error('Moeda é obrigatória');
  }
  return { name: name.trim(), price, currency: currency.trim() };
}

// Rota para gerenciar produto
app.post('/products', async (req, res) => {
  try {
    // Dados da requisição com validação
    const { name, price, currency } = validateProductData(
      req.body.name || "Nome do Produto",
      req.body.price || 99.90,
      req.body.currency || "BRL"
    );
    const description = req.body.description || "Descrição do produto";
    const images = req.body.images || ["https://exemplo.com/imagem1.jpg"];
    const category = req.body.category || "Categoria";

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/business/products`);

    const body = JSON.stringify({
      name: name,
      description: description,
      price: price,
      currency: currency,
      images: images,
      category: category
    });

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
    console.error('Erro ao gerenciar produto:', error.message);
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
function validateProductData(name, price, currency) {
  if (!name || name.trim().length === 0) {
    throw new Error('Nome do produto é obrigatório');
  }
  if (typeof price !== 'number' || price <= 0) {
    throw new Error('Preço deve ser um número positivo');
  }
  if (!currency || currency.trim().length === 0) {
    throw new Error('Moeda é obrigatória');
  }
  return { name: name.trim(), price, currency: currency.trim() };
}

// Rota para gerenciar produto
router.post('/products', async (ctx) => {
  try {
    // Dados da requisição com validação
    const { name, price, currency } = validateProductData(
      ctx.request.body.name || "Nome do Produto",
      ctx.request.body.price || 99.90,
      ctx.request.body.currency || "BRL"
    );
    const description = ctx.request.body.description || "Descrição do produto";
    const images = ctx.request.body.images || ["https://exemplo.com/imagem1.jpg"];
    const category = ctx.request.body.category || "Categoria";

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/business/products`);

    const body = JSON.stringify({
      name: name,
      description: description,
      price: price,
      currency: currency,
      images: images,
      category: category
    });

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
  console.error('Erro ao gerenciar produto:', err.message);
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

public class ManageProduct {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validação de entrada (segurança)
    private static void validateProductData(String name, double price, String currency) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome do produto é obrigatório");
        }
        if (price <= 0) {
            throw new IllegalArgumentException("Preço deve ser um número positivo");
        }
        if (currency == null || currency.trim().isEmpty()) {
            throw new IllegalArgumentException("Moeda é obrigatória");
        }
    }

    public static void main(String[] args) {
        try {
            // Dados da requisição com validação
            String name = "Nome do Produto";
            double price = 99.90;
            String currency = "BRL";
            String description = "Descrição do produto";
            String[] images = {"https://exemplo.com/imagem1.jpg"};
            String category = "Categoria";

            validateProductData(name, price, currency);

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/business/products",
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
            String jsonBody = String.format(
                "{\"name\":\"%s\",\"description\":\"%s\",\"price\":%.2f,\"currency\":\"%s\",\"images\":[\"%s\"],\"category\":\"%s\"}",
                name.replace("\"", "\\\""), description.replace("\"", "\\\""), price, currency, images[0], category
            );

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonBody.getBytes(StandardCharsets.UTF_8);
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
                    System.out.println("Produto gerenciado com sucesso");
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

public class ManageProduct
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") 
        ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") 
        ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") 
        ?? "seu-token-de-seguranca";

    // Validação de entrada (segurança)
    private static void ValidateProductData(string name, double price, string currency)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Nome do produto é obrigatório");
        }
        if (price <= 0)
        {
            throw new ArgumentException("Preço deve ser um número positivo");
        }
        if (string.IsNullOrWhiteSpace(currency))
        {
            throw new ArgumentException("Moeda é obrigatória");
        }
    }

    public static async Task Main(string[] args)
    {
        try
        {
            // Dados da requisição com validação
            string name = "Nome do Produto";
            double price = 99.90;
            string currency = "BRL";
            string description = "Descrição do produto";
            List<string> images = new List<string> { "https://exemplo.com/imagem1.jpg" };
            string category = "Categoria";

            ValidateProductData(name, price, currency);

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/business/products";

            var payload = new
            {
                name = name,
                description = description,
                price = price,
                currency = currency,
                images = images,
                category = category
            };

            using (HttpClient client = new HttpClient())
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
                    Console.WriteLine("Produto gerenciado com sucesso");
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
func validateProductData(name string, price float64, currency string) error {
    if strings.TrimSpace(name) == "" {
        return fmt.Errorf("Nome do produto é obrigatório")
    }
    if price <= 0 {
        return fmt.Errorf("Preço deve ser um número positivo")
    }
    if strings.TrimSpace(currency) == "" {
        return fmt.Errorf("Moeda é obrigatória")
    }
    return nil
}

func main() {
    // Dados da requisição com validação
    name := "Nome do Produto"
    price := 99.90
    currency := "BRL"
    description := "Descrição do produto"
    images := []string{"https://exemplo.com/imagem1.jpg"}
    category := "Categoria"

    if err := validateProductData(name, price, currency); err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/business/products",
        instanceId, instanceToken)

    payload := map[string]interface{}{
        "name": name,
        "description": description,
        "price": price,
        "currency": currency,
        "images": images,
        "category": category,
    }

    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Erro ao criar JSON: %v\n", err)
        return
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
        fmt.Printf("Produto gerenciado com sucesso\n")
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
function validateProductData($name, $price, $currency) {
    if (empty(trim($name))) {
        throw new Exception('Nome do produto é obrigatório');
    }
    if (!is_numeric($price) || $price <= 0) {
        throw new Exception('Preço deve ser um número positivo');
    }
    if (empty(trim($currency))) {
        throw new Exception('Moeda é obrigatória');
    }
}

try {
    // Dados da requisição com validação
    $name = "Nome do Produto";
    $price = 99.90;
    $currency = "BRL";
    $description = "Descrição do produto";
    $images = ["https://exemplo.com/imagem1.jpg"];
    $category = "Categoria";

    validateProductData($name, $price, $currency);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/business/products',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $jsonBody = json_encode([
        'name' => $name,
        'description' => $description,
        'price' => $price,
        'currency' => $currency,
        'images' => $images,
        'category' => $category
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
        if ($result['value'] ?? false) {
            echo "Produto gerenciado com sucesso\n";
        } else {
            echo "Erro ao gerenciar produto\n";
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
def validate_product_data(name, price, currency)
  if name.to_s.strip.empty?
    raise ArgumentError, 'Nome do produto é obrigatório'
  end
  if !price.is_a?(Numeric) || price <= 0
    raise ArgumentError, 'Preço deve ser um número positivo'
  end
  if currency.to_s.strip.empty?
    raise ArgumentError, 'Moeda é obrigatória'
  end
end

begin
  # Dados da requisição com validação
  name = "Nome do Produto"
  price = 99.90
  currency = "BRL"
  description = "Descrição do produto"
  images = ["https://exemplo.com/imagem1.jpg"]
  category = "Categoria"

  validate_product_data(name, price, currency)

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(INSTANCE_ID)}/token/#{URI.encode_www_form_component(INSTANCE_TOKEN)}/business/products")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url)
  request.body = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    images: images,
    category: category
  }.to_json
  request['Client-Token'] = CLIENT_TOKEN
  request['Content-Type'] = 'application/json'

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if result['value']
      puts "Produto gerenciado com sucesso"
    else
      puts "Erro ao gerenciar produto"
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
func validateProductData(_ name: String, _ price: Double, _ currency: String) throws {
    let trimmedName = name.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmedName.isEmpty else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "Nome do produto é obrigatório"])
    }
    guard price > 0 else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "Preço deve ser um número positivo"])
    }
    let trimmedCurrency = currency.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmedCurrency.isEmpty else {
        throw NSError(domain: "ValidationError", code: 400, userInfo: [NSLocalizedDescriptionKey: "Moeda é obrigatória"])
    }
}

// Dados da requisição com validação
let name = "Nome do Produto"
let price = 99.90
let currency = "BRL"
let description = "Descrição do produto"
let images = ["https://exemplo.com/imagem1.jpg"]
let category = "Categoria"

do {
    try validateProductData(name, price, currency)
} catch {
    print("Erro de validação: \(error.localizedDescription)")
    exit(1)
}

// ⚠️ SEGURANÇA: Sempre use HTTPS
guard let url = URL(string: "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/business/products") else {
    fatalError("URL inválida")
}

var request = URLRequest(url: url)
request.httpMethod = "POST"

let payload: [String: Any] = [
    "name": name,
    "description": description,
    "price": price,
    "currency": currency,
    "images": images,
    "category": category
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
                if let value = result?["value"] as? Bool, value {
                    print("Produto gerenciado com sucesso")
                } else {
                    print("Erro ao gerenciar produto")
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
function Validate-ProductData {
    param([string]$Name, [double]$Price, [string]$Currency)
    if ([string]::IsNullOrWhiteSpace($Name)) {
        throw "Nome do produto é obrigatório"
    }
    if ($Price -le 0) {
        throw "Preço deve ser um número positivo"
    }
    if ([string]::IsNullOrWhiteSpace($Currency)) {
        throw "Moeda é obrigatória"
    }
}

try {
    # Dados da requisição com validação
    $name = "Nome do Produto"
    $price = 99.90
    $currency = "BRL"
    $description = "Descrição do produto"
    $images = @("https://exemplo.com/imagem1.jpg")
    $category = "Categoria"

    Validate-ProductData -Name $name -Price $price -Currency $currency

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/business/products"

    $headers = @{
        "Client-Token" = $clientToken
        "Content-Type" = "application/json"
    }

    $body = @{
        name = $name
        description = $description
        price = $price
        currency = $currency
        images = $images
        category = $category
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    if ($response.value) {
        Write-Host "Produto gerenciado com sucesso"
    } else {
        Write-Host "Erro ao gerenciar produto"
    }
} catch {
    # ⚠️ SEGURANÇA: Tratamento genérico de erro
    Write-Host "Erro: $($_.Exception.Message)"
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/products HTTP/1.1
Host: api.z-api.io
Client-Token: seu-token-de-seguranca
Content-Type: application/json

{
  "name": "Nome do Produto",
  "description": "Descrição do produto",
  "price": 99.90,
  "currency": "BRL",
  "images": ["https://exemplo.com/imagem1.jpg"],
  "category": "Categoria"
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
std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");

// Validação de entrada (segurança)
void validateProductData(const std::string& name, double price, const std::string& currency) {
    if (name.empty() || name.find_first_not_of(" \t\n\r") == std::string::npos) {
        throw std::runtime_error("Nome do produto é obrigatório");
    }
    if (price <= 0) {
        throw std::runtime_error("Preço deve ser um número positivo");
    }
    if (currency.empty() || currency.find_first_not_of(" \t\n\r") == std::string::npos) {
        throw std::runtime_error("Moeda é obrigatória");
    }
}

static size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

int main() {
    try {
        // Dados da requisição com validação
        std::string name = "Nome do Produto";
        double price = 99.90;
        std::string currency = "BRL";
        std::string description = "Descrição do produto";
        std::string category = "Categoria";

        validateProductData(name, price, currency);

        // Body da requisição
        std::ostringstream jsonBody;
        jsonBody << "{\"name\":\"" << name << "\",\"description\":\"" << description 
                 << "\",\"price\":" << price << ",\"currency\":\"" << currency 
                 << "\",\"images\":[\"https://exemplo.com/imagem1.jpg\"],\"category\":\"" << category << "\"}";

        CURL* curl = curl_easy_init();
        if (curl) {
            std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/business/products";
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
                std::cout << "Produto gerenciado com sucesso" << std::endl;
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
int validateProductData(const char* name, double price, const char* currency) {
    if (!name || strlen(name) == 0) {
        return 0; // Inválido
    }
    if (price <= 0) {
        return 0; // Inválido
    }
    if (!currency || strlen(currency) == 0) {
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
    const char* name = "Nome do Produto";
    double price = 99.90;
    const char* currency = "BRL";
    const char* description = "Descrição do produto";
    const char* category = "Categoria";
    
    if (!validateProductData(name, price, currency)) {
        fprintf(stderr, "Dados do produto inválidos\n");
        return 1;
    }

    CURL* curl = curl_easy_init();
    if (curl) {
        char url[512];
        snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/business/products",
                 instanceId, instanceToken);

        // Body da requisição
        char jsonBody[512];
        snprintf(jsonBody, sizeof(jsonBody), 
                 "{\"name\":\"%s\",\"description\":\"%s\",\"price\":%.2f,\"currency\":\"%s\",\"images\":[\"https://exemplo.com/imagem1.jpg\"],\"category\":\"%s\"}",
                 name, description, price, currency, category);

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
            printf("Produto gerenciado com sucesso\n");
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

- Use this endpoint to create, edit and list products from the WhatsApp Business catalog
- Required fields: `name`, `price`, `currency`
- Optional fields: `description`, `images`, `category`
- Price should be a positive number
- Currency should follow the ISO standard (ex: BRL, USD, EUR)
- Images should be valid and accessible URLs