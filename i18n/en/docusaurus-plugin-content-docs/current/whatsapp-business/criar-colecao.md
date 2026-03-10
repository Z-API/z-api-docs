---
id: criar-colecao
sidebar_position: 1
title: Create Collection
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FolderPlus" size="lg" /> Create Collection

Create a product collection in your WhatsApp Business catalog through the Z-API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to create a product collection in your catalog. Collections are groups of products organized by category, type, or any criterion that you define.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|------------|
| `name` | string | Name of the collection |
| `productIds` | array | Array with the IDs of the products that will be part of the collection. Ex: `["121212121212", "232323232323"]` |

### <Icon name="Code" size="sm" /> Request Body {#request-body}

```json
{
  "name": "Nome da coleção",
  "productIds": ["121212121212", "232323232323"]
}
```

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada
function validateCollectionData(name, productIds) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Nome da coleção é obrigatório e não pode estar vazio');
  }
  if (!Array.isArray(productIds) || productIds.length === 0) {
    throw new Error('productIds deve ser um array não vazio');
  }
  if (!productIds.every(id => typeof id === 'string' && id.trim().length > 0)) {
    throw new Error('Todos os IDs de produtos devem ser strings não vazias');
  }
  return true;
}

// Criar coleção com tratamento seguro de erros
async function createCollection(name, productIds) {
  try {
    // Validação de entrada
    validateCollectionData(name, productIds);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/catalogs/collection`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        productIds: productIds,
      }),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Coleção criada com sucesso. ID:', result.collectionId);
    return result;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao criar coleção:', error.message);
    throw error;
  }
}

// Exemplo de uso
createCollection('Produtos em Promoção', ['121212121212', '232323232323']);
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Interface para resposta
interface CreateCollectionResponse {
  collectionId: string;
}

// Interface para dados de entrada
interface CollectionData {
  name: string;
  productIds: string[];
}

// Validação de entrada
function validateCollectionData(data: CollectionData): void {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    throw new Error('Nome da coleção é obrigatório e não pode estar vazio');
  }
  if (!Array.isArray(data.productIds) || data.productIds.length === 0) {
    throw new Error('productIds deve ser um array não vazio');
  }
  if (!data.productIds.every(id => typeof id === 'string' && id.trim().length > 0)) {
    throw new Error('Todos os IDs de produtos devem ser strings não vazias');
  }
}

// Função para criar coleção
async function createCollection(data: CollectionData): Promise<CreateCollectionResponse> {
  // Validação de entrada
  validateCollectionData(data);

  // ⚠️ SEGURANÇA: Sempre use HTTPS e encode URI components
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/catalogs/collection`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Client-Token': clientToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name.trim(),
      productIds: data.productIds,
    }),
  });

  if (!response.ok) {
    // ⚠️ SEGURANÇA: Não exponha detalhes internos em erros
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar com tratamento seguro
createCollection({
  name: 'Produtos em Promoção',
  productIds: ['121212121212', '232323232323']
})
  .then((result) => console.log('Coleção criada:', result.collectionId))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import requests
from typing import List, Dict, Any

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'SEU_CLIENT_TOKEN')

def validate_collection_data(name: str, product_ids: List[str]) -> None:
    """Valida os dados de entrada para criação de coleção"""
    if not name or not isinstance(name, str) or not name.strip():
        raise ValueError('Nome da coleção é obrigatório e não pode estar vazio')
    if not isinstance(product_ids, list) or len(product_ids) == 0:
        raise ValueError('productIds deve ser um array não vazio')
    if not all(isinstance(id, str) and id.strip() for id in product_ids):
        raise ValueError('Todos os IDs de produtos devem ser strings não vazias')

# URL do endpoint (sempre HTTPS)
url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/catalogs/collection"

# Headers obrigatórios
headers = {
    "Client-Token": CLIENT_TOKEN,
    "Content-Type": "application/json"
}

# Dados da coleção
name = "Produtos em Promoção"
product_ids = ["121212121212", "232323232323"]

# Criar coleção com tratamento seguro de erros
try:
    # Validação de entrada
    validate_collection_data(name, product_ids)
    
    payload = {
        "name": name.strip(),
        "productIds": product_ids
    }
    
    # ⚠️ SEGURANÇA: Sempre use HTTPS (verify=True por padrão)
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    
    response.raise_for_status()
    
    result: Dict[str, Any] = response.json()
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    print(f'Coleção criada com sucesso. ID: {result.get("collectionId")}')
    
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

# Criar coleção via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/catalogs/collection" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Produtos em Promoção",
    "productIds": ["121212121212", "232323232323"]
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
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada
function validateCollectionData(name, productIds) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Nome da coleção é obrigatório e não pode estar vazio');
  }
  if (!Array.isArray(productIds) || productIds.length === 0) {
    throw new Error('productIds deve ser um array não vazio');
  }
  if (!productIds.every(id => typeof id === 'string' && id.trim().length > 0)) {
    throw new Error('Todos os IDs de produtos devem ser strings não vazias');
  }
}

// Criar coleção
const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/catalogs/collection`);

const payload = JSON.stringify({
  name: 'Produtos em Promoção',
  productIds: ['121212121212', '232323232323']
});

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Client-Token': clientToken,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
  },
  timeout: 30000, // 30 segundos
};

try {
  validateCollectionData('Produtos em Promoção', ['121212121212', '232323232323']);
} catch (error) {
  console.error('Erro de validação:', error.message);
  process.exit(1);
}

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const result = JSON.parse(data);
      // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
      console.log('Coleção criada com sucesso. ID:', result.collectionId);
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

req.write(payload);
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
function validateCollectionData(name, productIds) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Nome da coleção é obrigatório e não pode estar vazio');
  }
  if (!Array.isArray(productIds) || productIds.length === 0) {
    throw new Error('productIds deve ser um array não vazio');
  }
  if (!productIds.every(id => typeof id === 'string' && id.trim().length > 0)) {
    throw new Error('Todos os IDs de produtos devem ser strings não vazias');
  }
}

// Rota para criar coleção
app.post('/catalogs/collection', async (req, res) => {
  try {
    const { name, productIds } = req.body;

    // Validação de entrada
    validateCollectionData(name, productIds);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/catalogs/collection`);

    const payload = JSON.stringify({
      name: name.trim(),
      productIds: productIds,
    });

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
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

      req.write(payload);
      req.end();
    });

    res.status(200).json(result);
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao criar coleção:', error.message);
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
function validateCollectionData(name, productIds) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Nome da coleção é obrigatório e não pode estar vazio');
  }
  if (!Array.isArray(productIds) || productIds.length === 0) {
    throw new Error('productIds deve ser um array não vazio');
  }
  if (!productIds.every(id => typeof id === 'string' && id.trim().length > 0)) {
    throw new Error('Todos os IDs de produtos devem ser strings não vazias');
  }
}

// Rota para criar coleção
router.post('/catalogs/collection', async (ctx) => {
  try {
    const { name, productIds } = ctx.request.body;

    // Validação de entrada
    validateCollectionData(name, productIds);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/catalogs/collection`);

    const payload = JSON.stringify({
      name: name.trim(),
      productIds: productIds,
    });

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Client-Token': clientToken,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
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

      req.write(payload);
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
  console.error('Erro ao criar coleção:', err.message);
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
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import org.json.JSONObject;
import org.json.JSONArray;

public class CreateCollection {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";

    // Validação de entrada
    private static void validateCollectionData(String name, String[] productIds) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome da coleção é obrigatório e não pode estar vazio");
        }
        if (productIds == null || productIds.length == 0) {
            throw new IllegalArgumentException("productIds deve ser um array não vazio");
        }
        for (String id : productIds) {
            if (id == null || id.trim().isEmpty()) {
                throw new IllegalArgumentException("Todos os IDs de produtos devem ser strings não vazias");
            }
        }
    }

    public static void main(String[] args) {
        try {
            String name = "Produtos em Promoção";
            String[] productIds = {"121212121212", "232323232323"};

            // Validação de entrada
            validateCollectionData(name, productIds);

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/catalogs/collection",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);

            // Criar JSON body
            JSONObject jsonBody = new JSONObject();
            jsonBody.put("name", name.trim());
            JSONArray jsonProductIds = new JSONArray();
            for (String id : productIds) {
                jsonProductIds.put(id);
            }
            jsonBody.put("productIds", jsonProductIds);

            // Enviar body
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
                    JSONObject result = new JSONObject(response.toString());
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    System.out.println("Coleção criada com sucesso. ID: " + result.getString("collectionId"));
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

public class CreateCollection
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") 
        ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") 
        ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") 
        ?? "SEU_CLIENT_TOKEN";

    // Validação de entrada
    private static void ValidateCollectionData(string name, string[] productIds)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Nome da coleção é obrigatório e não pode estar vazio");
        }
        if (productIds == null || productIds.Length == 0)
        {
            throw new ArgumentException("productIds deve ser um array não vazio");
        }
        foreach (var id in productIds)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                throw new ArgumentException("Todos os IDs de produtos devem ser strings não vazias");
            }
        }
    }

    public static async Task Main(string[] args)
    {
        try
        {
            string name = "Produtos em Promoção";
            string[] productIds = { "121212121212", "232323232323" };

            // Validação de entrada
            ValidateCollectionData(name, productIds);

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/catalogs/collection";

            var payload = new
            {
                name = name.Trim(),
                productIds = productIds
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
                    var resultObj = JsonSerializer.Deserialize<JsonElement>(result);
                    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
                    Console.WriteLine($"Coleção criada com sucesso. ID: {resultObj.GetProperty("collectionId").GetString()}");
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
func validateCollectionData(name string, productIds []string) error {
    if name == "" {
        return fmt.Errorf("nome da coleção é obrigatório e não pode estar vazio")
    }
    if len(productIds) == 0 {
        return fmt.Errorf("productIds deve ser um array não vazio")
    }
    for _, id := range productIds {
        if id == "" {
            return fmt.Errorf("todos os IDs de produtos devem ser strings não vazias")
        }
    }
    return nil
}

func main() {
    name := "Produtos em Promoção"
    productIds := []string{"121212121212", "232323232323"}

    // Validação de entrada
    if err := validateCollectionData(name, productIds); err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/catalogs/collection",
        instanceId, instanceToken)

    payload := map[string]interface{}{
        "name":       name,
        "productIds": productIds,
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
        if collectionId, ok := result["collectionId"].(string); ok {
            fmt.Printf("Coleção criada com sucesso. ID: %s\n", collectionId)
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
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCIA';
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'SEU_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'SEU_CLIENT_TOKEN';

// Validação de entrada
function validateCollectionData($name, $productIds) {
    if (empty($name) || !is_string($name) || trim($name) === '') {
        throw new Exception('Nome da coleção é obrigatório e não pode estar vazio');
    }
    if (!is_array($productIds) || count($productIds) === 0) {
        throw new Exception('productIds deve ser um array não vazio');
    }
    foreach ($productIds as $id) {
        if (!is_string($id) || trim($id) === '') {
            throw new Exception('Todos os IDs de produtos devem ser strings não vazias');
        }
    }
}

try {
    $name = 'Produtos em Promoção';
    $productIds = ['121212121212', '232323232323'];

    // Validação de entrada
    validateCollectionData($name, $productIds);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/catalogs/collection',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = json_encode([
        'name' => trim($name),
        'productIds' => $productIds
    ]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
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
        if (isset($result['collectionId'])) {
            echo "Coleção criada com sucesso. ID: " . $result['collectionId'] . "\n";
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

# Validação de entrada
def validate_collection_data(name, product_ids)
  raise 'Nome da coleção é obrigatório e não pode estar vazio' if name.nil? || !name.is_a?(String) || name.strip.empty?
  raise 'productIds deve ser um array não vazio' unless product_ids.is_a?(Array) && !product_ids.empty?
  product_ids.each do |id|
    raise 'Todos os IDs de produtos devem ser strings não vazias' unless id.is_a?(String) && !id.strip.empty?
  end
end

begin
  name = 'Produtos em Promoção'
  product_ids = ['121212121212', '232323232323']

  # Validação de entrada
  validate_collection_data(name, product_ids)

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(INSTANCE_ID)}/token/#{URI.encode_www_form_component(INSTANCE_TOKEN)}/catalogs/collection")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url)
  request['Client-Token'] = CLIENT_TOKEN
  request['Content-Type'] = 'application/json'
  request.body = {
    name: name.strip,
    productIds: product_ids
  }.to_json

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    puts "Coleção criada com sucesso. ID: #{result['collectionId']}"
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
func validateCollectionData(name: String, productIds: [String]) throws {
    if name.trimmingCharacters(in: .whitespaces).isEmpty {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Nome da coleção é obrigatório e não pode estar vazio"])
    }
    if productIds.isEmpty {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "productIds deve ser um array não vazio"])
    }
    for id in productIds {
        if id.trimmingCharacters(in: .whitespaces).isEmpty {
            throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "Todos os IDs de produtos devem ser strings não vazias"])
        }
    }
}

let name = "Produtos em Promoção"
let productIds = ["121212121212", "232323232323"]

do {
    // Validação de entrada
    try validateCollectionData(name: name, productIds: productIds)

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    guard let url = URL(string: "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/catalogs/collection") else {
        fatalError("URL inválida")
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.timeoutInterval = 30

    let payload: [String: Any] = [
        "name": name.trimmingCharacters(in: .whitespaces),
        "productIds": productIds
    ]

    request.httpBody = try? JSONSerialization.data(withJSONObject: payload)

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
                    if let collectionId = result?["collectionId"] as? String {
                        print("Coleção criada com sucesso. ID: \(collectionId)")
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
function Validate-CollectionData {
    param(
        [string]$Name,
        [string[]]$ProductIds
    )
    if ([string]::IsNullOrWhiteSpace($Name)) {
        throw "Nome da coleção é obrigatório e não pode estar vazio"
    }
    if ($ProductIds -eq $null -or $ProductIds.Count -eq 0) {
        throw "productIds deve ser um array não vazio"
    }
    foreach ($id in $ProductIds) {
        if ([string]::IsNullOrWhiteSpace($id)) {
            throw "Todos os IDs de produtos devem ser strings não vazias"
        }
    }
}

try {
    $name = "Produtos em Promoção"
    $productIds = @("121212121212", "232323232323")

    # Validação de entrada
    Validate-CollectionData -Name $name -ProductIds $productIds

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/catalogs/collection"

    $payload = @{
        name = $name.Trim()
        productIds = $productIds
    } | ConvertTo-Json

    $headers = @{
        "Client-Token" = $clientToken
        "Content-Type" = "application/json"
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $payload -TimeoutSec 30

    # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    Write-Host "Coleção criada com sucesso. ID: $($response.collectionId)"
} catch {
    # ⚠️ SEGURANÇA: Tratamento genérico de erro
    Write-Host "Erro: $($_.Exception.Message)"
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection HTTP/1.1
Host: api.z-api.io
Client-Token: SEU_CLIENT_TOKEN
Content-Type: application/json

{
  "name": "Produtos em Promoção",
  "productIds": ["121212121212", "232323232323"]
}
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <curl/curl.h>
#include <nlohmann/json.hpp>

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

int main() {
    std::string name = "Produtos em Promoção";
    std::vector<std::string> productIds = {"121212121212", "232323232323"};

    // Validação de entrada
    if (name.empty()) {
        std::cerr << "Erro: Nome da coleção é obrigatório" << std::endl;
        return 1;
    }
    if (productIds.empty()) {
        std::cerr << "Erro: productIds deve ser um array não vazio" << std::endl;
        return 1;
    }

    CURL* curl = curl_easy_init();
    if (curl) {
        std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/catalogs/collection";
        std::string responseData;

        // Criar JSON payload
        nlohmann::json payload;
        payload["name"] = name;
        payload["productIds"] = productIds;
        std::string jsonPayload = payload.dump();

        struct curl_slist* headers = NULL;
        std::string tokenHeader = "Client-Token: " + clientToken;
        std::string contentTypeHeader = "Content-Type: application/json";
        headers = curl_slist_append(headers, tokenHeader.c_str());
        headers = curl_slist_append(headers, contentTypeHeader.c_str());

        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);

        CURLcode res = curl_easy_perform(curl);
        long responseCode;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            auto result = nlohmann::json::parse(responseData);
            // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
            std::cout << "Coleção criada com sucesso. ID: " << result["collectionId"] << std::endl;
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
    const char* jsonPayload = "{\"name\":\"Produtos em Promoção\",\"productIds\":[\"121212121212\",\"232323232323\"]}";

    CURL* curl = curl_easy_init();
    if (curl) {
        char url[512];
        snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/catalogs/collection",
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
            printf("Coleção criada com sucesso\n");
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
 "collectionId": "123456789123"
}
```

| Field | Type | Description |
|-------|------|------------|
| `collectionId` | string | ID of the created collection |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the request headers |
| `401` | Invalid token | Check the header `Client-Token` |
| `400` | Invalid parameters | Check if the `name` and `productIds` are correct |
| `404` | Products not found | Make sure the product IDs exist in the catalog |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Existing products**: The product IDs must exist in the catalog before creating the collection
- **Multiple products**: You can add as many products as you want to the collection
- **WhatsApp Business**: This method requires a configured WhatsApp Business account
- **Manage collection**: After creation, you can [edit](/docs/whatsapp-business/editar-colecao), [list](/docs/whatsapp-business/listar-colecoes) or [delete](/docs/whatsapp-business/deletar-colecao) the collection