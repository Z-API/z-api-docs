---
id: produto
title: Enviar produto
sidebar_position: 14
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="ShoppingBag" size="lg" /> Enviar produto

Envie informações de um produto do seu catálogo WhatsApp Business para um destinatário usando a API do Z-API. Produtos aparecem em um formato especial no WhatsApp com imagem, preço e descrição.

**⚠️ Importante:** Este recurso está disponível apenas para contas **business** do WhatsApp. É necessário também que a conta possua produtos cadastrados. Operações relacionadas a produtos podem ser encontradas na seção [WhatsApp Business](../whatsapp-business/introducao) da nossa documentação.

![Exemplo de mensagem de produto](/img/product-message.jpeg)

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-product
```

### Headers {#headers}

| Header | Tipo | Obrigatório | Descrição |
|-----------------|--------|-------------|------------------------------|
| Client-Token | string | Sim | Token de autenticação |
| Content-Type | string | Sim | Deve ser `application/json` |

### Corpo da requisição {#corpo-da-requisicao}

```json
{
  "phone": "5511999999999",
  "catalogPhone": "5511999999999",
  "productId": "7190654897637620"
}
```

### Parâmetros {#parametros}

#### Parâmetros Obrigatórios

| Campo | Tipo | Obrigatório | Descrição |
|-----------|--------|-------------|--------------------------------------------------|
| `phone` | string | Sim | Número do destinatário no formato DDI + DDD + NÚMERO. **IMPORTANTE:** Envie somente números, sem formatação ou máscara. Para grupos, use o ID do grupo. |
| `catalogPhone` | string | Sim | Telefone da conta business à qual pertence o produto. Deve ser o número da conta WhatsApp Business que possui o catálogo onde o produto está cadastrado. |
| `productId` | string | Sim | ID do produto no catálogo. Pode ser obtido na API de [listar produtos](../whatsapp-business/produtos) ou via [webhook](../webhooks/ao-receber#exemplo-de-retorno-de-produto). |

## <Icon name="Info" size="md" /> Pré-requisitos {#pre-requisitos}

Para enviar produtos, você precisa:

1. **Ter uma conta WhatsApp Business** ativa e verificada
2. **Ter um catálogo WhatsApp Business** configurado e ativo
3. **Ter produtos** cadastrados no catálogo
4. **Conhecer o número da conta business** (`catalogPhone`) que possui o catálogo
5. **Obter o ID do produto** (`productId`) que deseja enviar

:::tip Dica

Consulte a seção [WhatsApp Business](../whatsapp-business/introducao) para aprender como criar e gerenciar produtos no seu catálogo. O `productId` pode ser obtido através da API de listagem de produtos ou via webhook quando um produto é criado.

:::

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

1. **`phone`**: O número do contato que receberá o produto. Use o formato completo: DDI + DDD + Número (ex: `5511999999999`). **Importante:** Use apenas números, sem formatação ou máscara.

2. **`catalogPhone`**: O telefone da conta WhatsApp Business que possui o catálogo onde o produto está cadastrado. **Importante:** Este deve ser o número da conta business onde o produto foi criado. Use o formato completo: DDI + DDD + Número (ex: `5511999999999`).

3. **`productId`**: O ID único do produto que você deseja enviar. Este ID é gerado quando você cria o produto no catálogo. Você pode obter o `productId` de duas formas:
   - **Via API**: Use a API de [listar produtos](../whatsapp-business/produtos) para buscar todos os produtos e seus IDs
   - **Via Webhook**: Quando um produto é criado, o webhook retorna o `productId` do produto criado

**Dica:** Se você não souber o `productId`, primeiro liste os produtos do catálogo usando a API de listagem. Cada produto retornado terá um `productId` único que você pode usar aqui.

**Casos de uso comuns:**

- **E-commerce**: Enviar produtos específicos para clientes interessados
- **Promoções**: Compartilhar produtos em promoção
- **Atendimento**: Enviar produtos recomendados durante conversas de atendimento
- **Catálogo dinâmico**: Enviar produtos baseados em preferências do cliente

## <Icon name="CheckCircle" size="md" /> Respostas {#respostas}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "3EB0C767F26A",
  "id": "3EB0C767F26A"
}
```

| Campo | Tipo | Descrição |
|-----------|--------|----------------------------------------------|
| `zaapId` | string | ID único da mensagem no sistema Z-API (para rastreamento interno) |
| `messageId` | string | ID único da mensagem no WhatsApp. **Guarde este ID!** Use-o para rastrear o status da entrega através dos webhooks |
| `id` | string | ID de compatibilidade com Zapier e sistemas legados. Tem o mesmo valor do `messageId` |

**Importante:**

- O `messageId` é o identificador principal que você deve usar para rastrear a mensagem
- O `zaapId` é usado internamente pelo Z-API para processamento
- O `id` existe apenas para compatibilidade com integrações legadas (como Zapier)

**Rastreamento de Entrega:**

Para saber quando a mensagem foi entregue, lida ou se houve algum erro, configure um webhook e monitore os eventos. Veja mais sobre [webhooks de mensagens recebidas](../webhooks/ao-receber#exemplo-de-retorno-de-produto).

### Erros comuns {#erros-comuns}

| Código | Motivo | Como resolver |
|--------|-----------------------|----------------------------------------------------|
| 400 | Parâmetros inválidos | Verifique `phone`, `catalogPhone` e `productId` |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 404 | Produto não encontrado | Verifique se o `productId` existe no catálogo especificado por `catalogPhone` |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |

## <Icon name="FileCode" size="md" /> Exemplos de Código

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateProductId(productId) {
  if (!productId || typeof productId !== 'string' || productId.trim().length === 0) {
    throw new Error('productId é obrigatório e deve ser uma string não vazia');
  }
  return productId.trim();
}

function sanitizeMessage(message) {
  if (!message) return undefined;
  const trimmed = message.trim();
  if (trimmed.length > 4096) {
    throw new Error('Mensagem excede o limite de 4096 caracteres');
  }
  return trimmed.length > 0 ? trimmed : undefined;
}

// Dados do produto com validação
const productData = {
  phone: validatePhoneNumber('5511999999999'),
  productId: validateProductId('produto123'),
  message: sanitizeMessage('Confira este produto incrível!'),
};

// Remover message se undefined
if (!productData.message) delete productData.message;

// Enviar requisição com tratamento seguro de erros
async function sendProduct() {
  try {
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-product`;
    
    const response = await fetch(url, {
 method: 'POST',
 headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Erro desconhecido');
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

 const result = await response.json();
    console.log('Produto enviado com sucesso. MessageId:', result.messageId);
    return result;
 } catch (error) {
    console.error('Erro ao enviar produto:', error.message);
    throw error;
  }
}

// Executar função
sendProduct();
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
interface SendProductRequest {
  phone: string;
  productId: string;
  message?: string;
}

interface SendProductResponse {
  messageId: string;
  status: string;
}

const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

function validatePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido');
  }
  return cleaned;
}

function validateProductId(productId: string): string {
  if (!productId || productId.trim().length === 0) {
    throw new Error('productId é obrigatório e deve ser uma string não vazia');
  }
  return productId.trim();
}

function sanitizeMessage(message?: string): string | undefined {
  if (!message) return undefined;
  const trimmed = message.trim();
  if (trimmed.length > 4096) {
    throw new Error('Mensagem excede limite de 4096 caracteres');
  }
  return trimmed.length > 0 ? trimmed : undefined;
}

const productData: SendProductRequest = {
  phone: validatePhoneNumber('5511999999999'),
  productId: validateProductId('produto123'),
  message: sanitizeMessage('Confira este produto incrível!'),
};

async function sendProduct(): Promise<SendProductResponse> {
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-product`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

sendProduct()
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

INSTANCE_ID = os.getenv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
CLIENT_TOKEN = os.getenv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

def validate_phone_number(phone: str) -> str:
    cleaned = re.sub(r'\D', '', phone)
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError("Número de telefone inválido. Use formato: DDI + DDD + Número")
    return cleaned

def validate_product_id(product_id: str) -> str:
    if not product_id or not product_id.strip():
        raise ValueError("productId é obrigatório e deve ser uma string não vazia")
    return product_id.strip()

def sanitize_message(message: Optional[str]) -> Optional[str]:
    if not message:
        return None
    trimmed = message.strip()
    if len(trimmed) > 4096:
        raise ValueError("Mensagem excede limite de 4096 caracteres")
    return trimmed if trimmed else None

url = f"https://api.z-api.io/instances/{INSTANCE_ID}/send-product"

try:
    payload: Dict[str, Any] = {
        "phone": validate_phone_number("5511999999999"),
        "productId": validate_product_id("produto123"),
        "message": sanitize_message("Confira este produto incrível!"),
    }
    if payload["message"] is None:
        del payload["message"]
except ValueError as e:
    print(f"Erro de validação: {e}")
    exit(1)

headers = {
    "Content-Type": "application/json",
    "Client-Token": CLIENT_TOKEN
}

try:
    response = requests.post(url, json=payload, headers=headers, timeout=30)
 response.raise_for_status()

    result: Dict[str, Any] = response.json()
    print(f"Produto enviado. MessageId: {result.get('messageId')}")
    
except requests.exceptions.HTTPError as e:
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
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-SEU_CLIENT_TOKEN}"

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/send-product" \
 -H 'Content-Type: application/json' \
  -H "Client-Token: ${CLIENT_TOKEN}" \
 -d '{
 "phone": "5511999999999",
 "productId": "produto123",
    "message": "Confira este produto incrível!"
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID CLIENT_TOKEN
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');
const { URL } = require('url');

const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateProductId(productId) {
  if (!productId || typeof productId !== 'string' || productId.trim().length === 0) {
    throw new Error('productId é obrigatório e deve ser uma string não vazia');
  }
  return productId.trim();
}

function sanitizeMessage(message) {
  if (!message) return undefined;
  const trimmed = message.trim();
  if (trimmed.length > 4096) {
    throw new Error('Mensagem excede o limite de 4096 caracteres');
  }
  return trimmed.length > 0 ? trimmed : undefined;
}

const productData = {
  phone: validatePhoneNumber('5511999999999'),
  productId: validateProductId('produto123'),
  message: sanitizeMessage('Confira este produto incrível!'),
};

if (!productData.message) delete productData.message;

const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-product`);
const postData = JSON.stringify(productData);

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
      console.log('Produto enviado. MessageId:', result.messageId);
    } else {
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

const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateProductId(productId) {
  if (!productId || typeof productId !== 'string' || productId.trim().length === 0) {
    throw new Error('productId é obrigatório e deve ser uma string não vazia');
  }
  return productId.trim();
}

function sanitizeMessage(message) {
  if (!message) return undefined;
  const trimmed = message.trim();
  if (trimmed.length > 4096) {
    throw new Error('Mensagem excede o limite de 4096 caracteres');
  }
  return trimmed.length > 0 ? trimmed : undefined;
}

app.post('/send-product', async (req, res) => {
  try {
    const rawPhone = req.body.phone || '5511999999999';
    const rawProductId = req.body.productId || 'produto123';
    const rawMessage = req.body.message || '';

    const productData = {
      phone: validatePhoneNumber(rawPhone),
      productId: validateProductId(rawProductId),
      message: sanitizeMessage(rawMessage),
    };

    if (!productData.message) delete productData.message;

    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-product`);
    const postData = JSON.stringify(productData);

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
              resolve({ success: true, messageId: parsed.messageId });
            } catch (error) {
              reject(new Error('Erro ao processar resposta'));
            }
          } else {
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
    console.error('Erro ao enviar produto:', error.message);
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

const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';

app.use(require('koa-bodyparser')());

function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function validateProductId(productId) {
  if (!productId || typeof productId !== 'string' || productId.trim().length === 0) {
    throw new Error('productId é obrigatório e deve ser uma string não vazia');
  }
  return productId.trim();
}

function sanitizeMessage(message) {
  if (!message) return undefined;
  const trimmed = message.trim();
  if (trimmed.length > 4096) {
    throw new Error('Mensagem excede o limite de 4096 caracteres');
  }
  return trimmed.length > 0 ? trimmed : undefined;
}

router.post('/send-product', async (ctx) => {
  try {
    const rawPhone = ctx.request.body.phone || '5511999999999';
    const rawProductId = ctx.request.body.productId || 'produto123';
    const rawMessage = ctx.request.body.message || '';

    const productData = {
      phone: validatePhoneNumber(rawPhone),
      productId: validateProductId(rawProductId),
      message: sanitizeMessage(rawMessage),
    };

    if (!productData.message) delete productData.message;

    const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/send-product`);
    const postData = JSON.stringify(productData);

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
              resolve({ success: true, messageId: parsed.messageId });
            } catch (error) {
              reject(new Error('Erro ao processar resposta'));
            }
          } else {
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
    ctx.app.emit('error', error, ctx);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
  console.error('Erro ao enviar produto:', err.message);
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

public class SendProduct {
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCE_ID";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";

    private static String validatePhoneNumber(String phone) {
        String cleaned = phone.replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("Número de telefone inválido");
        }
        return cleaned;
    }

    private static String validateProductId(String productId) {
        if (productId == null || productId.trim().isEmpty()) {
            throw new IllegalArgumentException("productId é obrigatório e deve ser uma string não vazia");
        }
        return productId.trim();
    }

    private static String sanitizeMessage(String message) {
        if (message == null || message.trim().isEmpty()) {
            return null;
        }
        String trimmed = message.trim();
        if (trimmed.length() > 4096) {
            throw new IllegalArgumentException("Mensagem excede limite de 4096 caracteres");
        }
        return trimmed;
    }

    public static void main(String[] args) {
        try {
            String phone = validatePhoneNumber("5511999999999");
            String productId = validateProductId("produto123");
            String message = sanitizeMessage("Confira este produto incrível!");

            String urlString = "https://api.z-api.io/instances/" + INSTANCE_ID + "/send-product";
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setDoOutput(true);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);

            StringBuilder jsonPayload = new StringBuilder();
            jsonPayload.append("{\"phone\":\"").append(phone);
            jsonPayload.append("\",\"productId\":\"").append(productId.replace("\"", "\\\""));
            if (message != null) {
                jsonPayload.append("\",\"message\":\"").append(message.replace("\"", "\\\""));
            }
            jsonPayload.append("\"}");

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonPayload.toString().getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            int responseCode = conn.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) {
                try (BufferedReader br = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    System.out.println("Produto enviado. Response: " + response.toString());
                }
            } else {
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
using System.Text.RegularExpressions;
using System.Threading.Tasks;

class SendProduct
{
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCE_ID";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "SEU_CLIENT_TOKEN";

    private static string ValidatePhoneNumber(string phone)
    {
        string cleaned = Regex.Replace(phone, @"\D", "");
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("Número de telefone inválido");
        }
        return cleaned;
    }

    private static string ValidateProductId(string productId)
    {
        if (string.IsNullOrWhiteSpace(productId))
        {
            throw new ArgumentException("productId é obrigatório e deve ser uma string não vazia");
        }
        return productId.Trim();
    }

    private static string? SanitizeMessage(string? message)
    {
        if (string.IsNullOrWhiteSpace(message))
        {
            return null;
        }
        string trimmed = message.Trim();
        if (trimmed.Length > 4096)
        {
            throw new ArgumentException("Mensagem excede limite de 4096 caracteres");
        }
        return trimmed;
    }

    static async Task Main(string[] args)
    {
        try
        {
            string phone = ValidatePhoneNumber("5511999999999");
            string productId = ValidateProductId("produto123");
            string? message = SanitizeMessage("Confira este produto incrível!");

            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/send-product";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var payload = new
                {
                    phone = phone,
                    productId = productId,
                    message = message
                };

                string jsonPayload = System.Text.Json.JsonSerializer.Serialize(payload);
                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Produto enviado. Response: {responseBody}");
                }
                else
                {
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
    "io"
    "net/http"
    "os"
    "regexp"
    "strings"
    "time"
)

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

func validatePhoneNumber(phone string) (string, error) {
    re := regexp.MustCompile(`\D`)
    cleaned := re.ReplaceAllString(phone, "")
    if len(cleaned) < 10 || len(cleaned) > 15 {
        return "", fmt.Errorf("número de telefone inválido")
    }
    return cleaned, nil
}

func validateProductId(productId string) (string, error) {
    trimmed := strings.TrimSpace(productId)
    if trimmed == "" {
        return "", fmt.Errorf("productId é obrigatório e deve ser uma string não vazia")
    }
    return trimmed, nil
}

func sanitizeMessage(message string) (string, error) {
    trimmed := strings.TrimSpace(message)
    if trimmed == "" {
        return "", nil
    }
    if len(trimmed) > 4096 {
        return "", fmt.Errorf("mensagem excede limite de 4096 caracteres")
    }
    return trimmed, nil
}

func main() {
    instanceId := getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
    clientToken := getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")

    phone, err := validatePhoneNumber("5511999999999")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    productId, err := validateProductId("produto123")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    message, err := sanitizeMessage("Confira este produto incrível!")
    if err != nil {
        fmt.Printf("Erro de validação: %v\n", err)
        return
    }

    url := fmt.Sprintf("https://api.z-api.io/instances/%s/send-product", instanceId)

    payload := map[string]interface{}{
        "phone":     phone,
        "productId": productId,
    }
    if message != "" {
        payload["message"] = message
    }

    jsonData, _ := json.Marshal(payload)

    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)

    client := &http.Client{Timeout: 30 * time.Second}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro na requisição: %v\n", err)
        return
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        body, _ := io.ReadAll(resp.Body)
        fmt.Printf("Produto enviado. Response: %s\n", string(body))
    } else {
        fmt.Printf("Erro HTTP %d: Requisição falhou\n", resp.StatusCode)
    }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCE_ID';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'SEU_CLIENT_TOKEN';

function validatePhoneNumber($phone) {
    $cleaned = preg_replace('/\D/', '', $phone);
    if (strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new Exception('Número de telefone inválido');
    }
    return $cleaned;
}

function validateProductId($productId) {
    if (empty($productId) || trim($productId) === '') {
        throw new Exception('productId é obrigatório e deve ser uma string não vazia');
    }
    return trim($productId);
}

function sanitizeMessage($message) {
    if (empty($message) || trim($message) === '') {
        return null;
    }
    $trimmed = trim($message);
    if (strlen($trimmed) > 4096) {
        throw new Exception('Mensagem excede limite de 4096 caracteres');
    }
    return $trimmed;
}

try {
    $phone = validatePhoneNumber('5511999999999');
    $productId = validateProductId('produto123');
    $message = sanitizeMessage('Confira este produto incrível!');

    $url = "https://api.z-api.io/instances/" . urlencode($instanceId) . "/send-product";

    $payload = [
        'phone' => $phone,
        'productId' => $productId,
    ];
    if ($message !== null) {
        $payload['message'] = $message;
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Client-Token: ' . $clientToken
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Produto enviado. MessageId: " . $result['messageId'] . "\n";
    } else {
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
require 'openssl'

instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCE_ID'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'SEU_CLIENT_TOKEN'

def validate_phone_number(phone)
  cleaned = phone.gsub(/\D/, '')
  if cleaned.length < 10 || cleaned.length > 15
    raise ArgumentError, 'Número de telefone inválido'
  end
  cleaned
end

def validate_product_id(product_id)
  if product_id.nil? || product_id.strip.empty?
    raise ArgumentError, 'productId é obrigatório e deve ser uma string não vazia'
  end
  product_id.strip
end

def sanitize_message(message)
  return nil if message.nil? || message.strip.empty?
  trimmed = message.strip
  if trimmed.length > 4096
    raise ArgumentError, 'Mensagem excede limite de 4096 caracteres'
  end
  trimmed
end

begin
  phone = validate_phone_number('5511999999999')
  product_id = validate_product_id('produto123')
  message = sanitize_message('Confira este produto incrível!')

  uri = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(instance_id)}/send-product")

  payload = {
    phone: phone,
    productId: product_id
  }
  payload[:message] = message if message

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(uri.path)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts "Produto enviado. MessageId: #{result['messageId']}"
  else
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

let instanceId = ProcessInfo.processInfo.environment["ZAPI_INSTANCE_ID"] ?? "SUA_INSTANCE_ID"
let clientToken = ProcessInfo.processInfo.environment["ZAPI_CLIENT_TOKEN"] ?? "SEU_CLIENT_TOKEN"

func validatePhoneNumber(_ phone: String) throws -> String {
    let cleaned = phone.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
    if cleaned.count < 10 || cleaned.count > 15 {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Número de telefone inválido"])
    }
    return cleaned
}

func validateProductId(_ productId: String) throws -> String {
    let trimmed = productId.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmed.isEmpty {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "productId é obrigatório e deve ser uma string não vazia"])
    }
    return trimmed
}

func sanitizeMessage(_ message: String?) throws -> String? {
    guard let message = message else { return nil }
    let trimmed = message.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmed.isEmpty {
        return nil
    }
    if trimmed.count > 4096 {
        throw NSError(domain: "ValidationError", code: 3, userInfo: [NSLocalizedDescriptionKey: "Mensagem excede limite de 4096 caracteres"])
    }
    return trimmed
}

do {
    let phone = try validatePhoneNumber("5511999999999")
    let productId = try validateProductId("produto123")
    let message = try sanitizeMessage("Confira este produto incrível!")

    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "")/send-product"
    
    guard let url = URL(string: urlString) else {
        throw NSError(domain: "URLError", code: 1, userInfo: [NSLocalizedDescriptionKey: "URL inválida"])
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30.0

    var payload: [String: Any] = [
        "phone": phone,
        "productId": productId
    ]
    if let message = message {
        payload["message"] = message
    }
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
                    print("Produto enviado. MessageId: \(messageId)")
                }
            } else {
                print("Erro HTTP \(httpResponse.statusCode): Requisição falhou")
            }
        }
    }
    task.resume()

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
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "SEU_CLIENT_TOKEN" }

function Validate-PhoneNumber {
    param([string]$Phone)
    $cleaned = $Phone -replace '\D', ''
    if ($cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "Número de telefone inválido"
    }
    return $cleaned
}

function Validate-ProductId {
    param([string]$ProductId)
    if ([string]::IsNullOrWhiteSpace($ProductId)) {
        throw "productId é obrigatório e deve ser uma string não vazia"
    }
    return $ProductId.Trim()
}

function Sanitize-Message {
    param([string]$Message)
    if ([string]::IsNullOrWhiteSpace($Message)) {
        return $null
    }
    $trimmed = $Message.Trim()
    if ($trimmed.Length -gt 4096) {
        throw "Mensagem excede limite de 4096 caracteres"
    }
    return $trimmed
}

try {
    $phone = Validate-PhoneNumber -Phone "5511999999999"
    $productId = Validate-ProductId -ProductId "produto123"
    $message = Sanitize-Message -Message "Confira este produto incrível!"

    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/send-product"

    $body = @{
        phone = $phone
        productId = $productId
    }
    if ($message) {
        $body.message = $message
    }
    $bodyJson = $body | ConvertTo-Json

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Body $bodyJson -Headers $headers -TimeoutSec 30 -ErrorAction Stop

    Write-Host "Produto enviado. MessageId: $($response.messageId)"

} catch {
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
POST /instances/SUA_INSTANCIA/send-product HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: SEU_CLIENT_TOKEN
Content-Length: 125

{
 "phone": "5511999999999",
 "productId": "produto123",
 "message": "Confira este produto incrível!"
}
```

**Nota:** Este é um exemplo de requisição HTTP raw. Em produção:
- ⚠️ **SEGURANÇA:** Substitua `SUA_INSTANCIA` e `SEU_CLIENT_TOKEN` por valores reais de variáveis de ambiente
- ⚠️ **SEGURANÇA:** Sempre use HTTPS (não HTTP)
- ⚠️ **Validação:** Valide `phone` (apenas números, 10-15 dígitos), `productId` (obrigatório, string não vazia) e `message` (opcional, máximo 4096 caracteres) antes de enviar

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <regex>
#include <curl/curl.h>

std::string getEnv(const char* key, const std::string& defaultValue) {
    const char* value = std::getenv(key);
    return value ? std::string(value) : defaultValue;
}

std::string validatePhoneNumber(const std::string& phone) {
    std::regex nonDigit("\\D");
    std::string cleaned = std::regex_replace(phone, nonDigit, "");
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::invalid_argument("Número de telefone inválido");
    }
    return cleaned;
}

std::string validateProductId(const std::string& productId) {
    std::string trimmed = productId;
    trimmed.erase(0, trimmed.find_first_not_of(" \t\n\r"));
    trimmed.erase(trimmed.find_last_not_of(" \t\n\r") + 1);
    if (trimmed.empty()) {
        throw std::invalid_argument("productId é obrigatório e deve ser uma string não vazia");
    }
    return trimmed;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

int main() {
    try {
        std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
        std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

        std::string phone = validatePhoneNumber("5511999999999");
        std::string productId = validateProductId("produto123");
        std::string message = "Confira este produto incrível!";

        std::string url = "https://api.z-api.io/instances/" + instanceId + "/send-product";
        
        std::string jsonPayload = "{\"phone\":\"" + phone + "\",\"productId\":\"" + productId + "\",\"message\":\"" + message + "\"}";

        CURL* curl = curl_easy_init();
        if (!curl) {
            std::cerr << "Erro ao inicializar cURL" << std::endl;
            return 1;
        }

        std::string responseData;
        struct curl_slist* headers = nullptr;

        headers = curl_slist_append(headers, "Content-Type: application/json");
        std::string clientTokenHeader = "Client-Token: " + clientToken;
        headers = curl_slist_append(headers, clientTokenHeader.c_str());

        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);

        CURLcode res = curl_easy_perform(curl);
        long responseCode = 0;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

        if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
            std::cout << "Produto enviado. Response: " << responseData << std::endl;
        } else {
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
g++ -o send_product send_product.cpp -lcurl
```

</TabItem>
<TabItem value="c" label="C">

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <curl/curl.h>

char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

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
        return 0;
    }
    return 1;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, char* data) {
    size_t totalSize = size * nmemb;
    strncat(data, (char*)contents, totalSize);
    return totalSize;
}

int main() {
    char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
    char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");

    char phone[20];
    if (!validatePhoneNumber("5511999999999", phone)) {
        fprintf(stderr, "Erro: Número de telefone inválido\n");
        return 1;
    }

    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/send-product", instanceId);

    char jsonPayload[500];
    snprintf(jsonPayload, sizeof(jsonPayload), 
             "{\"phone\":\"%s\",\"productId\":\"produto123\",\"message\":\"Confira este produto incrível!\"}",
             phone);

    CURL* curl = curl_easy_init();
    if (!curl) {
        fprintf(stderr, "Erro ao inicializar cURL\n");
        return 1;
    }

    char responseData[4096] = {0};
    struct curl_slist* headers = NULL;

    headers = curl_slist_append(headers, "Content-Type: application/json");
    char clientTokenHeader[256];
    snprintf(clientTokenHeader, sizeof(clientTokenHeader), "Client-Token: %s", clientToken);
    headers = curl_slist_append(headers, clientTokenHeader);

    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonPayload);
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, responseData);
    curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);

    CURLcode res = curl_easy_perform(curl);
    long responseCode = 0;
    curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

    if (res == CURLE_OK && responseCode >= 200 && responseCode < 300) {
        printf("Produto enviado. Response: %s\n", responseData);
    } else {
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
gcc -o send_product send_product.c -lcurl
```

</TabItem>
</Tabs>

## <Icon name="Info" size="md" /> Como funciona {#como-funciona}

Quando você envia um produto:

1. **O produto é exibido** em um formato especial no WhatsApp com:
 - Imagem do produto
 - Nome e descrição
 - Preço e moeda
 - Botão para ver mais detalhes

2. **Mensagem adicional** (se fornecida) aparece acima do produto

3. **Interação** - O usuário pode clicar para ver mais detalhes ou iniciar uma conversa sobre o produto

:::tip Boa prática

Use mensagens personalizadas para cada produto, destacando características únicas ou ofertas especiais. Isso aumenta o engajamento e as vendas.

:::

## <Icon name="AlertTriangle" size="md" /> Limitações {#limitacoes}

- Você só pode enviar produtos que existem no seu catálogo WhatsApp Business
- O catálogo deve estar ativo e configurado corretamente
- Produtos precisam ter pelo menos uma imagem para serem exibidos corretamente

## <Icon name="Info" size="md" /> Notas importantes {#notas-importantes}

- Produtos aparecem em um formato especial no WhatsApp, diferente de mensagens normais
- Use o `productId` retornado quando você criou o produto no catálogo
- A mensagem adicional é opcional, mas recomendada para personalizar a comunicação
- Produtos são ideais para e-commerce e vendas através do WhatsApp

## <Icon name="ArrowRight" size="md" /> Próximos passos {#proximos-passos}

- [Enviar catálogo](/docs/messages/catalogo) - Envie catálogos completos de produtos
- [Gerenciar produtos](/docs/whatsapp-business/produtos) - Crie e gerencie produtos no catálogo
- [Enviar carrossel](/docs/messages/carrossel) - Crie carrosséis de produtos
