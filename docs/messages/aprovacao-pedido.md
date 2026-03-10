---
id: aprovacao-pedido
title: Enviar Pedido
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="ShoppingCart" size="lg" /> Enviar Pedido

Envie pedidos completos com produtos do seu catálogo ou produtos customizados. Ideal para e-commerce, cobranças e aprovação de pedidos no WhatsApp Business.

---

:::important Importante

Este método está disponível **apenas para contas Business** do WhatsApp.

:::

---

## <Icon name="Lightbulb" size="md" /> Casos de Uso Comuns

- **E-commerce**: Enviar pedidos com produtos do catálogo
- **Cobranças**: Enviar cobranças para clientes
- **Aprovação de Pedidos**: Enviar pedidos para aprovação do cliente
- **Produtos Customizados**: Criar pedidos com produtos não cadastrados no catálogo

![Exemplo de pedido - Tela 1](/img/send-order1.jpeg)

![Exemplo de pedido - Tela 2](/img/send-order2.jpeg)

---

## <Icon name="Wand2" size="md" /> Para Usuários No-Code

Se você está usando uma plataforma de automação como n8n ou Make, configure os seguintes campos:

1. **`phone`**: Número do destinatário (formato: `5511999999999`)
2. **`order`**: Objeto com informações do pedido (moeda, produtos, descontos, etc.)
3. **`paymentSettings`** (opcional): Configurações de pagamento (PIX, cartão)

---

## <Icon name="Code" size="md" /> Para Desenvolvedores

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-order
```

### <Icon name="Settings" size="sm" /> Atributos {#atributos}

#### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `phone` | string | Telefone do destinatário no formato DDI DDD NÚMERO (ex: `5511999999999`). **IMPORTANTE**: Envie somente números, sem formatação ou máscara |
| `order` | object | Informações do pedido (veja estrutura abaixo) |
| `paymentSettings` | object | Configurações de pagamento (veja estrutura abaixo) |

#### Estrutura do Objeto `order`

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `currency` | string | Sim | Código da moeda (ex: `BRL`, `USD`) |
| `products` | array | Sim | Array de produtos do pedido (veja estrutura abaixo) |

**Atributos opcionais do `order`:**

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `discount` | number | Valor de desconto |
| `tax` | number | Valor de imposto |
| `shipping` | number | Valor de frete |

#### Estrutura do Objeto `products` (dentro de `order`)

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `name` | string | Sim | Nome do produto |
| `value` | number | Sim | Valor do produto |
| `quantity` | number | Sim | Quantidade do produto |
| `productId` | string | Não | ID do produto do catálogo. Se não informado, será um produto customizado |

#### Estrutura do Objeto `paymentSettings`

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `pix` | object | Não | Informações da chave PIX (veja estrutura abaixo) |
| `card` | object | Não | Configuração de pagamento via cartão (veja estrutura abaixo) |

#### Estrutura do Objeto `pix` (dentro de `paymentSettings`)

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `key` | string | Sim | Chave PIX |
| `keyType` | string | Sim | Tipo da chave: `cpf`, `cnpj`, `phone`, `email`, `randomKey` |
| `name` | string | Sim | Nome da chave PIX |

#### Estrutura do Objeto `card` (dentro de `paymentSettings`)

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `enabled` | boolean | Sim | Habilitar pagamento via cartão (requer configuração na conta WhatsApp pelo celular) |

### <Icon name="Info" size="sm" /> Conceituação {#conceituacao}

Este método permite enviar pedidos completos com produtos do catálogo ou produtos customizados. A mensagem enviada é a mesma que aparece quando você clica em "Aceitar pedido" ou "Enviar cobrança" no pedido do cliente.

**Importante**:
- O webhook retornará informações sobre o pedido, incluindo `referenceId` e `orderRequestId`
- Esses IDs são necessários para atualizar o status e pagamento do pedido
- Produtos sem `productId` são considerados "customizados" e recebem um ID temporário

---

## <Icon name="Code" size="md" /> Exemplos de Código {#exemplos}

### Exemplo Básico (Apenas Obrigatórios)

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone (apenas números)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números (DDI + DDD + Número)');
  }
  return phone;
}

// Validar produtos
function validateProducts(products) {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('A lista de produtos é obrigatória e não pode estar vazia');
  }
  for (const product of products) {
    if (!product.name || typeof product.name !== 'string' || product.name.trim() === '') {
      throw new Error('Cada produto deve ter um nome válido');
    }
    if (typeof product.value !== 'number' || product.value <= 0) {
      throw new Error('Cada produto deve ter um valor válido maior que zero');
    }
    if (typeof product.quantity !== 'number' || product.quantity <= 0) {
      throw new Error('Cada produto deve ter uma quantidade válida maior que zero');
    }
  }
  return products;
}

// Enviar pedido
async function sendOrder(phone, order, paymentSettings = {}) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    if (!order || !order.currency || !order.products) {
      throw new Error('O objeto order deve conter currency e products');
    }
    const validatedProducts = validateProducts(order.products);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-order`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify({
        phone: validatedPhone,
        order: {
          currency: order.currency,
          products: validatedProducts.map(product => ({
            name: product.name.trim(),
            value: product.value,
            quantity: product.quantity,
            productId: product.productId || undefined,
          })),
          discount: order.discount || undefined,
          tax: order.tax || undefined,
          shipping: order.shipping || undefined,
        },
        paymentSettings: paymentSettings || {},
      }),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Pedido enviado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar pedido:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendOrder('5511999999999', {
  currency: 'BRL',
  products: [
    {
      name: 'Produto Exemplo',
      value: 150.00,
      quantity: 1,
    },
  ],
}, {});
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interfaces
interface Product {
  name: string;
  value: number;
  quantity: number;
  productId?: string;
}

interface Order {
  currency: string;
  products: Product[];
  discount?: number;
  tax?: number;
  shipping?: number;
}

interface PaymentSettings {
  pix?: {
    key: string;
    keyType: string;
    name: string;
  };
  card?: {
    enabled: boolean;
  };
}

interface OrderResponse {
  zaapId: string;
  messageId: string;
  id: string;
  referenceId?: string;
  orderRequestId?: string;
}

// Validar telefone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar produtos
function validateProducts(products: Product[]): Product[] {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('A lista de produtos é obrigatória e não pode estar vazia');
  }
  for (const product of products) {
    if (!product.name || product.name.trim() === '') {
      throw new Error('Cada produto deve ter um nome válido');
    }
    if (typeof product.value !== 'number' || product.value <= 0) {
      throw new Error('Cada produto deve ter um valor válido maior que zero');
    }
    if (typeof product.quantity !== 'number' || product.quantity <= 0) {
      throw new Error('Cada produto deve ter uma quantidade válida maior que zero');
    }
  }
  return products;
}

// Função para enviar pedido
async function sendOrder(
  phone: string,
  order: Order,
  paymentSettings: PaymentSettings = {}
): Promise<OrderResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);
  if (!order || !order.currency || !order.products) {
    throw new Error('O objeto order deve conter currency e products');
  }
  const validatedProducts = validateProducts(order.products);

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-order`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify({
      phone: validatedPhone,
      order: {
        currency: order.currency,
        products: validatedProducts.map(product => ({
          name: product.name.trim(),
          value: product.value,
          quantity: product.quantity,
          productId: product.productId,
        })),
        discount: order.discount,
        tax: order.tax,
        shipping: order.shipping,
      },
      paymentSettings: paymentSettings || {},
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar
sendOrder('5511999999999', {
  currency: 'BRL',
  products: [
    {
      name: 'Produto Exemplo',
      value: 150.00,
      quantity: 1,
    },
  ],
}, {})
  .then((result) => console.log('Sucesso:', result))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any, List, Optional

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Valida telefone (apenas números)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Telefone inválido. Use apenas números (DDI + DDD + Número)')
    return phone

def validate_products(products: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Valida produtos"""
    if not isinstance(products, list) or len(products) == 0:
        raise ValueError('A lista de produtos é obrigatória e não pode estar vazia')
    for product in products:
        if not product.get('name') or not isinstance(product['name'], str) or not product['name'].strip():
            raise ValueError('Cada produto deve ter um nome válido')
        if not isinstance(product.get('value'), (int, float)) or product['value'] <= 0:
            raise ValueError('Cada produto deve ter um valor válido maior que zero')
        if not isinstance(product.get('quantity'), (int, float)) or product['quantity'] <= 0:
            raise ValueError('Cada produto deve ter uma quantidade válida maior que zero')
    return products

def send_order(phone: str, order: Dict[str, Any], payment_settings: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    if not order or 'currency' not in order or 'products' not in order:
        raise ValueError('O objeto order deve conter currency e products')
    validated_products = validate_products(order['products'])
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-order"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "order": {
            "currency": order["currency"],
            "products": [
                {
                    "name": product["name"].strip(),
                    "value": product["value"],
                    "quantity": product["quantity"],
                    "productId": product.get("productId")
                }
                for product in validated_products
            ],
            "discount": order.get("discount"),
            "tax": order.get("tax"),
            "shipping": order.get("shipping"),
        },
        "paymentSettings": payment_settings or {}
    }
    
    # Remover campos None do payload
    payload["order"] = {k: v for k, v in payload["order"].items() if v is not None}
    payload["order"]["products"] = [
        {k: v for k, v in product.items() if v is not None}
        for product in payload["order"]["products"]
    ]
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Pedido enviado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_order('5511999999999', {
    'currency': 'BRL',
    'products': [
        {
            'name': 'Produto Exemplo',
            'value': 150.00,
            'quantity': 1
        }
    ]
}, {})
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDAÇÃO: Validar telefone (apenas números)
PHONE="${1:-5511999999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Erro: Telefone inválido. Use apenas números (DDI + DDD + Número)"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Enviar pedido via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-order" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"order\": {
      \"currency\": \"BRL\",
      \"products\": [
        {
          \"name\": \"Produto Exemplo\",
          \"value\": 150.00,
          \"quantity\": 1
        }
      ]
    },
    \"paymentSettings\": {}
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar produtos
function validateProducts(products) {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('A lista de produtos é obrigatória e não pode estar vazia');
  }
  for (const product of products) {
    if (!product.name || typeof product.name !== 'string' || product.name.trim() === '') {
      throw new Error('Cada produto deve ter um nome válido');
    }
    if (typeof product.value !== 'number' || product.value <= 0) {
      throw new Error('Cada produto deve ter um valor válido maior que zero');
    }
    if (typeof product.quantity !== 'number' || product.quantity <= 0) {
      throw new Error('Cada produto deve ter uma quantidade válida maior que zero');
    }
  }
  return products;
}

// Enviar pedido
function sendOrder(phone, order, paymentSettings = {}) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
      if (!order || !order.currency || !order.products) {
        throw new Error('O objeto order deve conter currency e products');
      }
      const validatedProducts = validateProducts(order.products);
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-order`;
    const payload = JSON.stringify({
      phone: phone,
      order: {
        currency: order.currency,
        products: order.products.map(product => ({
          name: product.name.trim(),
          value: product.value,
          quantity: product.quantity,
          productId: product.productId,
        })),
        discount: order.discount,
        tax: order.tax,
        shipping: order.shipping,
      },
      paymentSettings: paymentSettings || {},
    });
    
    const options = {
      hostname: 'api.z-api.io',
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const result = JSON.parse(data);
            console.log('Pedido enviado com sucesso');
            resolve(result);
          } catch (error) {
            reject(new Error('Erro ao parsear resposta JSON'));
          }
        } else {
          reject(new Error(`Erro HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Erro na requisição:', error.message);
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

// Executar
sendOrder('5511999999999', {
  currency: 'BRL',
  products: [
    {
      name: 'Produto Exemplo',
      value: 150.00,
      quantity: 1,
    },
  ],
}, {})
  .then((result) => console.log('Sucesso:', result))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="nodejs-express" label="Node.js (Express)">

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar produtos
function validateProducts(products) {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('A lista de produtos é obrigatória e não pode estar vazia');
  }
  for (const product of products) {
    if (!product.name || typeof product.name !== 'string' || product.name.trim() === '') {
      throw new Error('Cada produto deve ter um nome válido');
    }
    if (typeof product.value !== 'number' || product.value <= 0) {
      throw new Error('Cada produto deve ter um valor válido maior que zero');
    }
    if (typeof product.quantity !== 'number' || product.quantity <= 0) {
      throw new Error('Cada produto deve ter uma quantidade válida maior que zero');
    }
  }
  return products;
}

// Rota para enviar pedido
app.post('/api/send-order', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, order, paymentSettings } = req.body;
    
    const validatedPhone = validatePhone(phone);
    if (!order || !order.currency || !order.products) {
      return res.status(400).json({
        success: false,
        error: 'O objeto order deve conter currency e products',
      });
    }
    const validatedProducts = validateProducts(order.products);

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-order`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      order: {
        currency: order.currency,
        products: validatedProducts.map(product => ({
          name: product.name.trim(),
          value: product.value,
          quantity: product.quantity,
          productId: product.productId,
        })),
        discount: order.discount,
        tax: order.tax,
        shipping: order.shipping,
      },
      paymentSettings: paymentSettings || {},
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      timeout: 30000,
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error('Erro ao enviar pedido:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar pedido',
    });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

</TabItem>
<TabItem value="nodejs-koa" label="Node.js (Koa)">

```javascript
const Koa = require('koa');
const axios = require('axios');
const app = new Koa();

app.use(require('koa-bodyparser')());

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar produtos
function validateProducts(products) {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('A lista de produtos é obrigatória e não pode estar vazia');
  }
  for (const product of products) {
    if (!product.name || typeof product.name !== 'string' || product.name.trim() === '') {
      throw new Error('Cada produto deve ter um nome válido');
    }
    if (typeof product.value !== 'number' || product.value <= 0) {
      throw new Error('Cada produto deve ter um valor válido maior que zero');
    }
    if (typeof product.quantity !== 'number' || product.quantity <= 0) {
      throw new Error('Cada produto deve ter uma quantidade válida maior que zero');
    }
  }
  return products;
}

// Middleware para enviar pedido
app.use(async (ctx) => {
  if (ctx.path === '/api/send-order' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, order, paymentSettings } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      if (!order || !order.currency || !order.products) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'O objeto order deve conter currency e products',
        };
        return;
      }
      const validatedProducts = validateProducts(order.products);

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-order`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        order: {
          currency: order.currency,
          products: validatedProducts.map(product => ({
            name: product.name.trim(),
            value: product.value,
            quantity: product.quantity,
            productId: product.productId,
          })),
          discount: order.discount,
          tax: order.tax,
          shipping: order.shipping,
        },
        paymentSettings: paymentSettings || {},
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Client-Token': clientToken,
        },
        timeout: 30000,
      });

      ctx.body = {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Erro ao enviar pedido:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar pedido',
      };
    }
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
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

public class SendOrder {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validar telefone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validatePhone("5511999999999");
            
            JSONArray products = new JSONArray();
            JSONObject product = new JSONObject();
            product.put("name", "Produto Exemplo");
            product.put("value", 150.00);
            product.put("quantity", 1);
            products.put(product);
            
            JSONObject order = new JSONObject();
            order.put("currency", "BRL");
            order.put("products", products);
            
            JSONObject paymentSettings = new JSONObject();

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-order",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("order", order);
            payload.put("paymentSettings", paymentSettings);
            
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Client-Token", CLIENT_TOKEN);
            connection.setDoOutput(true);
            connection.setConnectTimeout(30000);
            connection.setReadTimeout(30000);

            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = payload.toString().getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            int responseCode = connection.getResponseCode();
            
            if (responseCode >= 200 && responseCode < 300) {
                BufferedReader reader = new BufferedReader(
                    new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8)
                );
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();
                
                System.out.println("Pedido enviado com sucesso");
                System.out.println(response.toString());
            } else {
                System.err.println("Erro HTTP " + responseCode);
            }
            
            connection.disconnect();
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
using System.Text.RegularExpressions;

class Program
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "seu-token-de-seguranca";

    // Validar telefone
    private static string ValidatePhone(string phone)
    {
        if (!Regex.IsMatch(phone, @"^\d{10,15}$"))
        {
            throw new ArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidatePhone("5511999999999");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-order";
            
            var payload = new
            {
                phone = phone,
                order = new
                {
                    currency = "BRL",
                    products = new[]
                    {
                        new { name = "Produto Exemplo", value = 150.00, quantity = 1 }
                    }
                },
                paymentSettings = new { }
            };

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);
                client.Timeout = TimeSpan.FromSeconds(30);

                var json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, content);
                
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("Pedido enviado com sucesso");
                    Console.WriteLine(result);
                }
                else
                {
                    Console.WriteLine($"Erro HTTP {(int)response.StatusCode}");
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

func validatePhone(phone string) error {
    matched, _ := regexp.MatchString(`^\d{10,15}$`, phone)
    if !matched {
        return fmt.Errorf("telefone inválido. Use apenas números")
    }
    return nil
}

func main() {
    // ⚠️ VALIDAÇÃO
    phone := "5511999999999"
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-order", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "order": map[string]interface{}{
            "currency": "BRL",
            "products": []map[string]interface{}{
                {
                    "name":     "Produto Exemplo",
                    "value":    150.00,
                    "quantity": 1,
                },
            },
        },
        "paymentSettings": map[string]interface{}{},
    }
    
    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Erro ao serializar JSON: %v\n", err)
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
    
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)
    
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro na requisição: %v\n", err)
        return
    }
    defer resp.Body.Close()
    
    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        body, err := io.ReadAll(resp.Body)
        if err != nil {
            fmt.Printf("Erro ao ler resposta: %v\n", err)
            return
        }
        
        fmt.Println("Pedido enviado com sucesso")
        fmt.Println(string(body))
    } else {
        fmt.Printf("Erro HTTP %d\n", resp.StatusCode)
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

// Validar telefone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Telefone inválido. Use apenas números');
    }
    return $phone;
}

try {
    // ⚠️ VALIDAÇÃO
    $phone = validatePhone('5511999999999');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-order',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'order' => [
            'currency' => 'BRL',
            'products' => [
                [
                    'name' => 'Produto Exemplo',
                    'value' => 150.00,
                    'quantity' => 1,
                ],
            ],
        ],
        'paymentSettings' => [],
    ];

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Client-Token: ' . $clientToken,
        ],
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        error_log("Erro cURL: " . $error);
        echo "Erro na requisição\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Pedido enviado com sucesso\n";
        echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
    } else {
        echo "Erro HTTP $httpCode\n";
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

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCIA'
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'seu-token-de-seguranca'

# Validar telefone
def validate_phone(phone)
  raise 'Telefone inválido. Use apenas números' unless phone.match?(/^\d{10,15}$/)
  phone
end

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_phone('5511999999999')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-order")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    order: {
      currency: 'BRL',
      products: [
        {
          name: 'Produto Exemplo',
          value: 150.00,
          quantity: 1
        }
      ]
    },
    paymentSettings: {}
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Pedido enviado com sucesso'
    puts result.to_json
  else
    puts "Erro HTTP #{response.code}"
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

// Validar telefone
func validatePhone(_ phone: String) throws -> String {
    let phoneRegex = "^\\d{10,15}$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", phoneRegex)
    if !predicate.evaluate(with: phone) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Telefone inválido. Use apenas números"])
    }
    return phone
}

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validatePhone("5511999999999")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-order"
    
    guard let url = URL(string: urlString) else {
        print("URL inválida")
        exit(1)
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30

    let payload: [String: Any] = [
        "phone": phone,
        "order": [
            "currency": "BRL",
            "products": [
                [
                    "name": "Produto Exemplo",
                    "value": 150.00,
                    "quantity": 1
                ]
            ]
        ],
        "paymentSettings": [:]
    ]
    
    request.httpBody = try? JSONSerialization.data(withJSONObject: payload)

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Erro: \(error.localizedDescription)")
            return
        }
        
        guard let httpResponse = response as? HTTPURLResponse else {
            print("Resposta inválida")
            return
        }
        
        if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
            if let data = data {
                do {
                    if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                        print("Pedido enviado com sucesso")
                        print(result)
                    }
                } catch {
                    print("Erro ao parsear JSON: \(error.localizedDescription)")
                }
            }
        } else {
            print("Erro HTTP \(httpResponse.statusCode)")
        }
    }

    task.resume()
    RunLoop.main.run()
} catch {
    print("Erro: \(error.localizedDescription)")
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCIA" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# Validar telefone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Telefone inválido. Use apenas números"
    }
    return $Phone
}

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-Phone "5511999999999"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-order"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        order = @{
            currency = "BRL"
            products = @(
                @{
                    name = "Produto Exemplo"
                    value = 150.00
                    quantity = 1
                }
            )
        }
        paymentSettings = @{}
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Pedido enviado com sucesso"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Erro: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-order HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "order": {
    "currency": "BRL",
    "products": [
      {
        "name": "Produto Exemplo",
        "value": 150.00,
        "quantity": 1
      }
    ]
  },
  "paymentSettings": {}
}
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <curl/curl.h>
#include <cstdlib>
#include <regex>
#include <sstream>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnvVar(const std::string& key, const std::string& defaultValue) {
    const char* val = std::getenv(key.c_str());
    return val ? std::string(val) : defaultValue;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

bool validatePhone(const std::string& phone) {
    std::regex phoneRegex("^\\d{10,15}$");
    return std::regex_match(phone, phoneRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    std::string phone = "5511999999999";
    if (!validatePhone(phone)) {
        std::cerr << "Erro: Telefone inválido" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-order";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"order\":{"
                  << "\"currency\":\"BRL\","
                  << "\"products\":["
                  << "{\"name\":\"Produto Exemplo\",\"value\":150.00,\"quantity\":1}"
                  << "]"
                  << "},"
                  << "\"paymentSettings\":{}"
                  << "}";
    std::string payload = payloadStream.str();
    
    CURL* curl = curl_easy_init();
    if (curl) {
        std::string responseData;
        
        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        std::string tokenHeader = "Client-Token: " + clientToken;
        headers = curl_slist_append(headers, tokenHeader.c_str());
        
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        
        CURLcode res = curl_easy_perform(curl);
        
        if (res == CURLE_OK) {
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);
            
            if (responseCode >= 200 && responseCode < 300) {
                std::cout << "Pedido enviado com sucesso" << std::endl;
                std::cout << responseData << std::endl;
            } else {
                std::cout << "Erro HTTP " << responseCode << std::endl;
            }
        } else {
            std::cerr << "Erro cURL: " << curl_easy_strerror(res) << std::endl;
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
char* getEnvVar(const char* key, const char* defaultValue) {
    char* val = getenv(key);
    return val ? val : (char*)defaultValue;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, char* data) {
    size_t totalSize = size * nmemb;
    memcpy(data, contents, totalSize);
    data[totalSize] = '\0';
    return totalSize;
}

int validatePhone(const char* phone) {
    regex_t regex;
    int ret = regcomp(&regex, "^[0-9]{10,15}$", REG_EXTENDED);
    if (ret) return 0;
    ret = regexec(&regex, phone, 0, NULL, 0);
    regfree(&regex);
    return ret == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    char* phone = "5511999999999";
    if (!validatePhone(phone)) {
        fprintf(stderr, "Erro: Telefone inválido\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-order", instanceId, instanceToken);
    
    char payload[512];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"order\":{\"currency\":\"BRL\",\"products\":[{\"name\":\"Produto Exemplo\",\"value\":150.00,\"quantity\":1}]},\"paymentSettings\":{}}",
        phone);
    
    CURL* curl = curl_easy_init();
    if (curl) {
        char responseData[4096] = {0};
        
        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        char tokenHeader[256];
        snprintf(tokenHeader, sizeof(tokenHeader), "Client-Token: %s", clientToken);
        headers = curl_slist_append(headers, tokenHeader);
        
        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, responseData);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        
        CURLcode res = curl_easy_perform(curl);
        
        if (res == CURLE_OK) {
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);
            
            if (responseCode >= 200 && responseCode < 300) {
                printf("Pedido enviado com sucesso\n");
                printf("%s\n", responseData);
            } else {
                printf("Erro HTTP %ld\n", responseCode);
            }
        } else {
            fprintf(stderr, "Erro cURL: %s\n", curl_easy_strerror(res));
        }
        
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }
    
    return 0;
}
```

</TabItem>
</Tabs>

### Exemplo Completo (Com Todos os Parâmetros)

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone (apenas números)
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números (DDI + DDD + Número)');
  }
  return phone;
}

// Validar produtos
function validateProducts(products) {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('A lista de produtos é obrigatória e não pode estar vazia');
  }
  for (const product of products) {
    if (!product.name || typeof product.name !== 'string' || product.name.trim() === '') {
      throw new Error('Cada produto deve ter um nome válido');
    }
    if (typeof product.value !== 'number' || product.value <= 0) {
      throw new Error('Cada produto deve ter um valor válido maior que zero');
    }
    if (typeof product.quantity !== 'number' || product.quantity <= 0) {
      throw new Error('Cada produto deve ter uma quantidade válida maior que zero');
    }
  }
  return products;
}

// Validar configurações de pagamento PIX
function validatePixSettings(pix) {
  if (!pix) return null;
  if (!pix.key || !pix.keyType || !pix.name) {
    throw new Error('Configuração PIX deve conter key, keyType e name');
  }
  const validKeyTypes = ['cpf', 'cnpj', 'phone', 'email', 'randomKey'];
  if (!validKeyTypes.includes(pix.keyType)) {
    throw new Error(`keyType inválido. Use: ${validKeyTypes.join(', ')}`);
  }
  return pix;
}

// Enviar pedido completo
async function sendOrderComplete(phone, order, paymentSettings = {}) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedPhone = validatePhone(phone);
    if (!order || !order.currency || !order.products) {
      throw new Error('O objeto order deve conter currency e products');
    }
    const validatedProducts = validateProducts(order.products);
    const validatedPix = paymentSettings.pix ? validatePixSettings(paymentSettings.pix) : null;

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-order`;
    
    const payload = {
      phone: validatedPhone,
      order: {
        currency: order.currency,
        products: validatedProducts.map(product => ({
          name: product.name.trim(),
          value: product.value,
          quantity: product.quantity,
          productId: product.productId || undefined,
        })),
        discount: order.discount || undefined,
        tax: order.tax || undefined,
        shipping: order.shipping || undefined,
      },
      paymentSettings: {
        pix: validatedPix || undefined,
        card: paymentSettings.card || undefined,
      },
    };
    
    // Remover campos undefined
    Object.keys(payload.order).forEach(key => {
      if (payload.order[key] === undefined) delete payload.order[key];
    });
    Object.keys(payload.paymentSettings).forEach(key => {
      if (payload.paymentSettings[key] === undefined) delete payload.paymentSettings[key];
    });
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Pedido completo enviado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao enviar pedido completo:', error.message);
    throw error;
  }
}

// Exemplo de uso
sendOrderComplete('5511999999999', {
  currency: 'BRL',
  discount: 10.00,
  tax: 10.00,
  shipping: 5.00,
  products: [
    {
      productId: '23940797548900636',
      name: 'Produto do Catálogo',
      value: 100.00,
      quantity: 2,
    },
    {
      name: 'Produto Customizado',
      value: 50.00,
      quantity: 1,
    },
  ],
}, {
  pix: {
    key: '12345678900',
    keyType: 'cpf',
    name: 'João Silva',
  },
  card: {
    enabled: true,
  },
});
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Interfaces
interface Product {
  name: string;
  value: number;
  quantity: number;
  productId?: string;
}

interface Order {
  currency: string;
  products: Product[];
  discount?: number;
  tax?: number;
  shipping?: number;
}

interface PixSettings {
  key: string;
  keyType: 'cpf' | 'cnpj' | 'phone' | 'email' | 'randomKey';
  name: string;
}

interface PaymentSettings {
  pix?: PixSettings;
  card?: {
    enabled: boolean;
  };
}

interface OrderResponse {
  zaapId: string;
  messageId: string;
  id: string;
  referenceId?: string;
  orderRequestId?: string;
}

// Validar telefone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar produtos
function validateProducts(products: Product[]): Product[] {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('A lista de produtos é obrigatória e não pode estar vazia');
  }
  for (const product of products) {
    if (!product.name || product.name.trim() === '') {
      throw new Error('Cada produto deve ter um nome válido');
    }
    if (typeof product.value !== 'number' || product.value <= 0) {
      throw new Error('Cada produto deve ter um valor válido maior que zero');
    }
    if (typeof product.quantity !== 'number' || product.quantity <= 0) {
      throw new Error('Cada produto deve ter uma quantidade válida maior que zero');
    }
  }
  return products;
}

// Validar configurações PIX
function validatePixSettings(pix: PixSettings): PixSettings {
  if (!pix.key || !pix.keyType || !pix.name) {
    throw new Error('Configuração PIX deve conter key, keyType e name');
  }
  const validKeyTypes = ['cpf', 'cnpj', 'phone', 'email', 'randomKey'];
  if (!validKeyTypes.includes(pix.keyType)) {
    throw new Error(`keyType inválido. Use: ${validKeyTypes.join(', ')}`);
  }
  return pix;
}

// Função para enviar pedido completo
async function sendOrderComplete(
  phone: string,
  order: Order,
  paymentSettings: PaymentSettings = {}
): Promise<OrderResponse> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(phone);
  if (!order || !order.currency || !order.products) {
    throw new Error('O objeto order deve conter currency e products');
  }
  const validatedProducts = validateProducts(order.products);
  const validatedPix = paymentSettings.pix ? validatePixSettings(paymentSettings.pix) : undefined;

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-order`;

  const payload: any = {
    phone: validatedPhone,
    order: {
      currency: order.currency,
      products: validatedProducts.map(product => ({
        name: product.name.trim(),
        value: product.value,
        quantity: product.quantity,
        productId: product.productId,
      })),
      discount: order.discount,
      tax: order.tax,
      shipping: order.shipping,
    },
    paymentSettings: {
      pix: validatedPix,
      card: paymentSettings.card,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar
sendOrderComplete('5511999999999', {
  currency: 'BRL',
  discount: 10.00,
  tax: 10.00,
  shipping: 5.00,
  products: [
    {
      productId: '23940797548900636',
      name: 'Produto do Catálogo',
      value: 100.00,
      quantity: 2,
    },
    {
      name: 'Produto Customizado',
      value: 50.00,
      quantity: 1,
    },
  ],
}, {
  pix: {
    key: '12345678900',
    keyType: 'cpf',
    name: 'João Silva',
  },
  card: {
    enabled: true,
  },
})
  .then((result) => console.log('Sucesso:', result))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
import re
import requests
from typing import Dict, Any, List, Optional

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Valida telefone (apenas números)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Telefone inválido. Use apenas números (DDI + DDD + Número)')
    return phone

def validate_products(products: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Valida produtos"""
    if not isinstance(products, list) or len(products) == 0:
        raise ValueError('A lista de produtos é obrigatória e não pode estar vazia')
    for product in products:
        if not product.get('name') or not isinstance(product['name'], str) or not product['name'].strip():
            raise ValueError('Cada produto deve ter um nome válido')
        if not isinstance(product.get('value'), (int, float)) or product['value'] <= 0:
            raise ValueError('Cada produto deve ter um valor válido maior que zero')
        if not isinstance(product.get('quantity'), (int, float)) or product['quantity'] <= 0:
            raise ValueError('Cada produto deve ter uma quantidade válida maior que zero')
    return products

def validate_pix_settings(pix: Optional[Dict[str, str]]) -> Optional[Dict[str, str]]:
    """Valida configurações PIX"""
    if not pix:
        return None
    if not all(key in pix for key in ['key', 'keyType', 'name']):
        raise ValueError('Configuração PIX deve conter key, keyType e name')
    valid_key_types = ['cpf', 'cnpj', 'phone', 'email', 'randomKey']
    if pix['keyType'] not in valid_key_types:
        raise ValueError(f'keyType inválido. Use: {", ".join(valid_key_types)}')
    return pix

def send_order_complete(phone: str, order: Dict[str, Any], payment_settings: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(phone)
    if not order or 'currency' not in order or 'products' not in order:
        raise ValueError('O objeto order deve conter currency e products')
    validated_products = validate_products(order['products'])
    validated_pix = validate_pix_settings(payment_settings.get('pix') if payment_settings else None)
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/send-order"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "order": {
            "currency": order["currency"],
            "products": [
                {
                    "name": product["name"].strip(),
                    "value": product["value"],
                    "quantity": product["quantity"],
                    "productId": product.get("productId")
                }
                for product in validated_products
            ],
            "discount": order.get("discount"),
            "tax": order.get("tax"),
            "shipping": order.get("shipping"),
        },
        "paymentSettings": {
            "pix": validated_pix,
            "card": payment_settings.get("card") if payment_settings else None
        }
    }
    
    # Remover campos None do payload
    payload["order"] = {k: v for k, v in payload["order"].items() if v is not None}
    payload["order"]["products"] = [
        {k: v for k, v in product.items() if v is not None}
        for product in payload["order"]["products"]
    ]
    payload["paymentSettings"] = {k: v for k, v in payload["paymentSettings"].items() if v is not None}
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Pedido completo enviado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
send_order_complete('5511999999999', {
    'currency': 'BRL',
    'discount': 10.00,
    'tax': 10.00,
    'shipping': 5.00,
    'products': [
        {
            'productId': '23940797548900636',
            'name': 'Produto do Catálogo',
            'value': 100.00,
            'quantity': 2
        },
        {
            'name': 'Produto Customizado',
            'value': 50.00,
            'quantity': 1
        }
    ]
}, {
    'pix': {
        'key': '12345678900',
        'keyType': 'cpf',
        'name': 'João Silva'
    },
    'card': {
        'enabled': True
    }
})
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID="${ZAPI_INSTANCE_ID:-SUA_INSTANCIA}"
INSTANCE_TOKEN="${ZAPI_INSTANCE_TOKEN:-SEU_TOKEN}"
CLIENT_TOKEN="${ZAPI_CLIENT_TOKEN:-seu-token-de-seguranca}"

# ⚠️ VALIDAÇÃO: Validar telefone (apenas números)
PHONE="${1:-5511999999999}"
if ! [[ "$PHONE" =~ ^[0-9]{10,15}$ ]]; then
    echo "Erro: Telefone inválido. Use apenas números (DDI + DDD + Número)"
    exit 1
fi

# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
# Enviar pedido completo via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-order" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"order\": {
      \"currency\": \"BRL\",
      \"discount\": 10.00,
      \"tax\": 10.00,
      \"shipping\": 5.00,
      \"products\": [
        {
          \"productId\": \"23940797548900636\",
          \"name\": \"Produto do Catálogo\",
          \"value\": 100.00,
          \"quantity\": 2
        },
        {
          \"name\": \"Produto Customizado\",
          \"value\": 50.00,
          \"quantity\": 1
        }
      ]
    },
    \"paymentSettings\": {
      \"pix\": {
        \"key\": \"12345678900\",
        \"keyType\": \"cpf\",
        \"name\": \"João Silva\"
      },
      \"card\": {
        \"enabled\": true
      }
    }
  }" \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset INSTANCE_ID INSTANCE_TOKEN CLIENT_TOKEN PHONE
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const https = require('https');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar produtos
function validateProducts(products) {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('A lista de produtos é obrigatória e não pode estar vazia');
  }
  for (const product of products) {
    if (!product.name || typeof product.name !== 'string' || product.name.trim() === '') {
      throw new Error('Cada produto deve ter um nome válido');
    }
    if (typeof product.value !== 'number' || product.value <= 0) {
      throw new Error('Cada produto deve ter um valor válido maior que zero');
    }
    if (typeof product.quantity !== 'number' || product.quantity <= 0) {
      throw new Error('Cada produto deve ter uma quantidade válida maior que zero');
    }
  }
  return products;
}

// Validar configurações PIX
function validatePixSettings(pix) {
  if (!pix) return null;
  if (!pix.key || !pix.keyType || !pix.name) {
    throw new Error('Configuração PIX deve conter key, keyType e name');
  }
  const validKeyTypes = ['cpf', 'cnpj', 'phone', 'email', 'randomKey'];
  if (!validKeyTypes.includes(pix.keyType)) {
    throw new Error(`keyType inválido. Use: ${validKeyTypes.join(', ')}`);
  }
  return pix;
}

// Enviar pedido completo
function sendOrderComplete(phone, order, paymentSettings = {}) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(phone);
      if (!order || !order.currency || !order.products) {
        throw new Error('O objeto order deve conter currency e products');
      }
      const validatedProducts = validateProducts(order.products);
      const validatedPix = paymentSettings.pix ? validatePixSettings(paymentSettings.pix) : null;
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-order`;
    const payload = JSON.stringify({
      phone: phone,
      order: {
        currency: order.currency,
        products: order.products.map(product => ({
          name: product.name.trim(),
          value: product.value,
          quantity: product.quantity,
          productId: product.productId,
        })),
        discount: order.discount,
        tax: order.tax,
        shipping: order.shipping,
      },
      paymentSettings: {
        pix: paymentSettings.pix || null,
        card: paymentSettings.card || null,
      },
    });
    
    const options = {
      hostname: 'api.z-api.io',
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const result = JSON.parse(data);
            console.log('Pedido completo enviado com sucesso');
            resolve(result);
          } catch (error) {
            reject(new Error('Erro ao parsear resposta JSON'));
          }
        } else {
          reject(new Error(`Erro HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Erro na requisição:', error.message);
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

// Executar
sendOrderComplete('5511999999999', {
  currency: 'BRL',
  discount: 10.00,
  tax: 10.00,
  shipping: 5.00,
  products: [
    {
      productId: '23940797548900636',
      name: 'Produto do Catálogo',
      value: 100.00,
      quantity: 2,
    },
    {
      name: 'Produto Customizado',
      value: 50.00,
      quantity: 1,
    },
  ],
}, {
  pix: {
    key: '12345678900',
    keyType: 'cpf',
    name: 'João Silva',
  },
  card: {
    enabled: true,
  },
})
  .then((result) => console.log('Sucesso:', result))
  .catch((error) => console.error('Erro:', error.message));
```

</TabItem>
<TabItem value="nodejs-express" label="Node.js (Express)">

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar produtos
function validateProducts(products) {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('A lista de produtos é obrigatória e não pode estar vazia');
  }
  for (const product of products) {
    if (!product.name || typeof product.name !== 'string' || product.name.trim() === '') {
      throw new Error('Cada produto deve ter um nome válido');
    }
    if (typeof product.value !== 'number' || product.value <= 0) {
      throw new Error('Cada produto deve ter um valor válido maior que zero');
    }
    if (typeof product.quantity !== 'number' || product.quantity <= 0) {
      throw new Error('Cada produto deve ter uma quantidade válida maior que zero');
    }
  }
  return products;
}

// Validar configurações PIX
function validatePixSettings(pix) {
  if (!pix) return null;
  if (!pix.key || !pix.keyType || !pix.name) {
    throw new Error('Configuração PIX deve conter key, keyType e name');
  }
  const validKeyTypes = ['cpf', 'cnpj', 'phone', 'email', 'randomKey'];
  if (!validKeyTypes.includes(pix.keyType)) {
    throw new Error(`keyType inválido. Use: ${validKeyTypes.join(', ')}`);
  }
  return pix;
}

// Rota para enviar pedido completo
app.post('/api/send-order-complete', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const { phone, order, paymentSettings } = req.body;
    
    const validatedPhone = validatePhone(phone);
    if (!order || !order.currency || !order.products) {
      return res.status(400).json({
        success: false,
        error: 'O objeto order deve conter currency e products',
      });
    }
    const validatedProducts = validateProducts(order.products);
    const validatedPix = paymentSettings?.pix ? validatePixSettings(paymentSettings.pix) : null;

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-order`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      order: {
        currency: order.currency,
        products: validatedProducts.map(product => ({
          name: product.name.trim(),
          value: product.value,
          quantity: product.quantity,
          productId: product.productId,
        })),
        discount: order.discount,
        tax: order.tax,
        shipping: order.shipping,
      },
      paymentSettings: {
        pix: validatedPix,
        card: paymentSettings?.card,
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      timeout: 30000,
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error('Erro ao enviar pedido completo:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao enviar pedido completo',
    });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

</TabItem>
<TabItem value="nodejs-koa" label="Node.js (Koa)">

```javascript
const Koa = require('koa');
const axios = require('axios');
const app = new Koa();

app.use(require('koa-bodyparser')());

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar telefone
function validatePhone(phone) {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido');
  }
  return phone;
}

// Validar produtos
function validateProducts(products) {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('A lista de produtos é obrigatória e não pode estar vazia');
  }
  for (const product of products) {
    if (!product.name || typeof product.name !== 'string' || product.name.trim() === '') {
      throw new Error('Cada produto deve ter um nome válido');
    }
    if (typeof product.value !== 'number' || product.value <= 0) {
      throw new Error('Cada produto deve ter um valor válido maior que zero');
    }
    if (typeof product.quantity !== 'number' || product.quantity <= 0) {
      throw new Error('Cada produto deve ter uma quantidade válida maior que zero');
    }
  }
  return products;
}

// Validar configurações PIX
function validatePixSettings(pix) {
  if (!pix) return null;
  if (!pix.key || !pix.keyType || !pix.name) {
    throw new Error('Configuração PIX deve conter key, keyType e name');
  }
  const validKeyTypes = ['cpf', 'cnpj', 'phone', 'email', 'randomKey'];
  if (!validKeyTypes.includes(pix.keyType)) {
    throw new Error(`keyType inválido. Use: ${validKeyTypes.join(', ')}`);
  }
  return pix;
}

// Middleware para enviar pedido completo
app.use(async (ctx) => {
  if (ctx.path === '/api/send-order-complete' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const { phone, order, paymentSettings } = ctx.request.body;
      
      const validatedPhone = validatePhone(phone);
      if (!order || !order.currency || !order.products) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'O objeto order deve conter currency e products',
        };
        return;
      }
      const validatedProducts = validateProducts(order.products);
      const validatedPix = paymentSettings?.pix ? validatePixSettings(paymentSettings.pix) : null;

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-order`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        order: {
          currency: order.currency,
          products: validatedProducts.map(product => ({
            name: product.name.trim(),
            value: product.value,
            quantity: product.quantity,
            productId: product.productId,
          })),
          discount: order.discount,
          tax: order.tax,
          shipping: order.shipping,
        },
        paymentSettings: {
          pix: validatedPix,
          card: paymentSettings?.card,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Client-Token': clientToken,
        },
        timeout: 30000,
      });

      ctx.body = {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Erro ao enviar pedido completo:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao enviar pedido completo',
      };
    }
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
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

public class SendOrderComplete {
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCIA";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "seu-token-de-seguranca";

    // Validar telefone
    private static String validatePhone(String phone) {
        if (!phone.matches("^\\d{10,15}$")) {
            throw new IllegalArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    public static void main(String[] args) {
        try {
            // ⚠️ VALIDAÇÃO
            String phone = validatePhone("5511999999999");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-order",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONArray products = new JSONArray();
            JSONObject product1 = new JSONObject();
            product1.put("productId", "23940797548900636");
            product1.put("name", "Produto do Catálogo");
            product1.put("value", 100.00);
            product1.put("quantity", 2);
            products.put(product1);
            
            JSONObject product2 = new JSONObject();
            product2.put("name", "Produto Customizado");
            product2.put("value", 50.00);
            product2.put("quantity", 1);
            products.put(product2);
            
            JSONObject order = new JSONObject();
            order.put("currency", "BRL");
            order.put("discount", 10.00);
            order.put("tax", 10.00);
            order.put("shipping", 5.00);
            order.put("products", products);
            
            JSONObject pix = new JSONObject();
            pix.put("key", "12345678900");
            pix.put("keyType", "cpf");
            pix.put("name", "João Silva");
            
            JSONObject card = new JSONObject();
            card.put("enabled", true);
            
            JSONObject paymentSettings = new JSONObject();
            paymentSettings.put("pix", pix);
            paymentSettings.put("card", card);
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("order", order);
            payload.put("paymentSettings", paymentSettings);
            
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Client-Token", CLIENT_TOKEN);
            connection.setDoOutput(true);
            connection.setConnectTimeout(30000);
            connection.setReadTimeout(30000);

            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = payload.toString().getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            int responseCode = connection.getResponseCode();
            
            if (responseCode >= 200 && responseCode < 300) {
                BufferedReader reader = new BufferedReader(
                    new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8)
                );
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();
                
                System.out.println("Pedido completo enviado com sucesso");
                System.out.println(response.toString());
            } else {
                System.err.println("Erro HTTP " + responseCode);
            }
            
            connection.disconnect();
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
using System.Text.RegularExpressions;

class Program
{
    // ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCIA";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") ?? "SEU_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") ?? "seu-token-de-seguranca";

    // Validar telefone
    private static string ValidatePhone(string phone)
    {
        if (!Regex.IsMatch(phone, @"^\d{10,15}$"))
        {
            throw new ArgumentException("Telefone inválido. Use apenas números");
        }
        return phone;
    }

    static async Task Main(string[] args)
    {
        try
        {
            // ⚠️ VALIDAÇÃO
            string phone = ValidatePhone("5511999999999");

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-order";
            
            var payload = new
            {
                phone = phone,
                order = new
                {
                    currency = "BRL",
                    discount = 10.00,
                    tax = 10.00,
                    shipping = 5.00,
                    products = new[]
                    {
                        new { productId = "23940797548900636", name = "Produto do Catálogo", value = 100.00, quantity = 2 },
                        new { name = "Produto Customizado", value = 50.00, quantity = 1 }
                    }
                },
                paymentSettings = new
                {
                    pix = new { key = "12345678900", keyType = "cpf", name = "João Silva" },
                    card = new { enabled = true }
                }
            };

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);
                client.Timeout = TimeSpan.FromSeconds(30);

                var json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, content);
                
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("Pedido completo enviado com sucesso");
                    Console.WriteLine(result);
                }
                else
                {
                    Console.WriteLine($"Erro HTTP {(int)response.StatusCode}");
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

func validatePhone(phone string) error {
    matched, _ := regexp.MatchString(`^\d{10,15}$`, phone)
    if !matched {
        return fmt.Errorf("telefone inválido. Use apenas números")
    }
    return nil
}

func main() {
    // ⚠️ VALIDAÇÃO
    phone := "5511999999999"
    if err := validatePhone(phone); err != nil {
        fmt.Printf("Erro: %v\n", err)
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-order", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "order": map[string]interface{}{
            "currency": "BRL",
            "discount": 10.00,
            "tax": 10.00,
            "shipping": 5.00,
            "products": []map[string]interface{}{
                {
                    "productId": "23940797548900636",
                    "name": "Produto do Catálogo",
                    "value": 100.00,
                    "quantity": 2,
                },
                {
                    "name": "Produto Customizado",
                    "value": 50.00,
                    "quantity": 1,
                },
            },
        },
        "paymentSettings": map[string]interface{}{
            "pix": map[string]interface{}{
                "key": "12345678900",
                "keyType": "cpf",
                "name": "João Silva",
            },
            "card": map[string]interface{}{
                "enabled": true,
            },
        },
    }
    
    jsonData, err := json.Marshal(payload)
    if err != nil {
        fmt.Printf("Erro ao serializar JSON: %v\n", err)
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
    
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)
    
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro na requisição: %v\n", err)
        return
    }
    defer resp.Body.Close()
    
    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        body, err := io.ReadAll(resp.Body)
        if err != nil {
            fmt.Printf("Erro ao ler resposta: %v\n", err)
            return
        }
        
        fmt.Println("Pedido completo enviado com sucesso")
        fmt.Println(string(body))
    } else {
        fmt.Printf("Erro HTTP %d\n", resp.StatusCode)
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

// Validar telefone
function validatePhone($phone) {
    if (!preg_match('/^\d{10,15}$/', $phone)) {
        throw new Exception('Telefone inválido. Use apenas números');
    }
    return $phone;
}

try {
    // ⚠️ VALIDAÇÃO
    $phone = validatePhone('5511999999999');

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/send-order',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'order' => [
            'currency' => 'BRL',
            'discount' => 10.00,
            'tax' => 10.00,
            'shipping' => 5.00,
            'products' => [
                [
                    'productId' => '23940797548900636',
                    'name' => 'Produto do Catálogo',
                    'value' => 100.00,
                    'quantity' => 2,
                ],
                [
                    'name' => 'Produto Customizado',
                    'value' => 50.00,
                    'quantity' => 1,
                ],
            ],
        ],
        'paymentSettings' => [
            'pix' => [
                'key' => '12345678900',
                'keyType' => 'cpf',
                'name' => 'João Silva',
            ],
            'card' => [
                'enabled' => true,
            ],
        ],
    ];

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Client-Token: ' . $clientToken,
        ],
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        error_log("Erro cURL: " . $error);
        echo "Erro na requisição\n";
    } elseif ($httpCode >= 200 && $httpCode < 300) {
        $result = json_decode($response, true);
        echo "Pedido completo enviado com sucesso\n";
        echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
    } else {
        echo "Erro HTTP $httpCode\n";
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

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
instance_id = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCIA'
instance_token = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_TOKEN'
client_token = ENV['ZAPI_CLIENT_TOKEN'] || 'seu-token-de-seguranca'

# Validar telefone
def validate_phone(phone)
  raise 'Telefone inválido. Use apenas números' unless phone.match?(/^\d{10,15}$/)
  phone
end

begin
  # ⚠️ VALIDAÇÃO
  phone = validate_phone('5511999999999')

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/send-order")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    order: {
      currency: 'BRL',
      discount: 10.00,
      tax: 10.00,
      shipping: 5.00,
      products: [
        {
          productId: '23940797548900636',
          name: 'Produto do Catálogo',
          value: 100.00,
          quantity: 2
        },
        {
          name: 'Produto Customizado',
          value: 50.00,
          quantity: 1
        }
      ]
    },
    paymentSettings: {
      pix: {
        key: '12345678900',
        keyType: 'cpf',
        name: 'João Silva'
      },
      card: {
        enabled: true
      }
    }
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Pedido completo enviado com sucesso'
    puts result.to_json
  else
    puts "Erro HTTP #{response.code}"
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

// Validar telefone
func validatePhone(_ phone: String) throws -> String {
    let phoneRegex = "^\\d{10,15}$"
    let predicate = NSPredicate(format: "SELF MATCHES %@", phoneRegex)
    if !predicate.evaluate(with: phone) {
        throw NSError(domain: "ValidationError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Telefone inválido. Use apenas números"])
    }
    return phone
}

do {
    // ⚠️ VALIDAÇÃO
    let phone = try validatePhone("5511999999999")

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/send-order"
    
    guard let url = URL(string: urlString) else {
        print("URL inválida")
        exit(1)
    }

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(clientToken, forHTTPHeaderField: "Client-Token")
    request.timeoutInterval = 30

    let payload: [String: Any] = [
        "phone": phone,
        "order": [
            "currency": "BRL",
            "discount": 10.00,
            "tax": 10.00,
            "shipping": 5.00,
            "products": [
                [
                    "productId": "23940797548900636",
                    "name": "Produto do Catálogo",
                    "value": 100.00,
                    "quantity": 2
                ],
                [
                    "name": "Produto Customizado",
                    "value": 50.00,
                    "quantity": 1
                ]
            ]
        ],
        "paymentSettings": [
            "pix": [
                "key": "12345678900",
                "keyType": "cpf",
                "name": "João Silva"
            ],
            "card": [
                "enabled": true
            ]
        ]
    ]
    
    request.httpBody = try? JSONSerialization.data(withJSONObject: payload)

    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Erro: \(error.localizedDescription)")
            return
        }
        
        guard let httpResponse = response as? HTTPURLResponse else {
            print("Resposta inválida")
            return
        }
        
        if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
            if let data = data {
                do {
                    if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                        print("Pedido completo enviado com sucesso")
                        print(result)
                    }
                } catch {
                    print("Erro ao parsear JSON: \(error.localizedDescription)")
                }
            }
        } else {
            print("Erro HTTP \(httpResponse.statusCode)")
        }
    }

    task.resume()
    RunLoop.main.run()
} catch {
    print("Erro: \(error.localizedDescription)")
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCIA" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "seu-token-de-seguranca" }

# Validar telefone
function Validate-Phone {
    param([string]$Phone)
    if ($Phone -notmatch '^\d{10,15}$') {
        throw "Telefone inválido. Use apenas números"
    }
    return $Phone
}

try {
    # ⚠️ VALIDAÇÃO
    $phone = Validate-Phone "5511999999999"

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-order"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        order = @{
            currency = "BRL"
            discount = 10.00
            tax = 10.00
            shipping = 5.00
            products = @(
                @{
                    productId = "23940797548900636"
                    name = "Produto do Catálogo"
                    value = 100.00
                    quantity = 2
                },
                @{
                    name = "Produto Customizado"
                    value = 50.00
                    quantity = 1
                }
            )
        }
        paymentSettings = @{
            pix = @{
                key = "12345678900"
                keyType = "cpf"
                name = "João Silva"
            }
            card = @{
                enabled = $true
            }
        }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Pedido completo enviado com sucesso"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Erro: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-order HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "order": {
    "currency": "BRL",
    "discount": 10.00,
    "tax": 10.00,
    "shipping": 5.00,
    "products": [
      {
        "productId": "23940797548900636",
        "name": "Produto do Catálogo",
        "value": 100.00,
        "quantity": 2
      },
      {
        "name": "Produto Customizado",
        "value": 50.00,
        "quantity": 1
      }
    ]
  },
  "paymentSettings": {
    "pix": {
      "key": "12345678900",
      "keyType": "cpf",
      "name": "João Silva"
    },
    "card": {
      "enabled": true
    }
  }
}
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <curl/curl.h>
#include <cstdlib>
#include <regex>
#include <sstream>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnvVar(const std::string& key, const std::string& defaultValue) {
    const char* val = std::getenv(key.c_str());
    return val ? std::string(val) : defaultValue;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    size_t totalSize = size * nmemb;
    data->append((char*)contents, totalSize);
    return totalSize;
}

bool validatePhone(const std::string& phone) {
    std::regex phoneRegex("^\\d{10,15}$");
    return std::regex_match(phone, phoneRegex);
}

int main() {
    std::string instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    std::string instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    std::string clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    std::string phone = "5511999999999";
    if (!validatePhone(phone)) {
        std::cerr << "Erro: Telefone inválido" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/send-order";
    
    // Criar payload JSON
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"order\":{"
                  << "\"currency\":\"BRL\","
                  << "\"discount\":10.00,"
                  << "\"tax\":10.00,"
                  << "\"shipping\":5.00,"
                  << "\"products\":["
                  << "{\"productId\":\"23940797548900636\",\"name\":\"Produto do Catálogo\",\"value\":100.00,\"quantity\":2},"
                  << "{\"name\":\"Produto Customizado\",\"value\":50.00,\"quantity\":1}"
                  << "]"
                  << "},"
                  << "\"paymentSettings\":{"
                  << "\"pix\":{\"key\":\"12345678900\",\"keyType\":\"cpf\",\"name\":\"João Silva\"},"
                  << "\"card\":{\"enabled\":true}"
                  << "}"
                  << "}";
    std::string payload = payloadStream.str();
    
    CURL* curl = curl_easy_init();
    if (curl) {
        std::string responseData;
        
        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        std::string tokenHeader = "Client-Token: " + clientToken;
        headers = curl_slist_append(headers, tokenHeader.c_str());
        
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        
        CURLcode res = curl_easy_perform(curl);
        
        if (res == CURLE_OK) {
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);
            
            if (responseCode >= 200 && responseCode < 300) {
                std::cout << "Pedido completo enviado com sucesso" << std::endl;
                std::cout << responseData << std::endl;
            } else {
                std::cout << "Erro HTTP " << responseCode << std::endl;
            }
        } else {
            std::cerr << "Erro cURL: " << curl_easy_strerror(res) << std::endl;
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
char* getEnvVar(const char* key, const char* defaultValue) {
    char* val = getenv(key);
    return val ? val : (char*)defaultValue;
}

size_t WriteCallback(void* contents, size_t size, size_t nmemb, char* data) {
    size_t totalSize = size * nmemb;
    memcpy(data, contents, totalSize);
    data[totalSize] = '\0';
    return totalSize;
}

int validatePhone(const char* phone) {
    regex_t regex;
    int ret = regcomp(&regex, "^[0-9]{10,15}$", REG_EXTENDED);
    if (ret) return 0;
    ret = regexec(&regex, phone, 0, NULL, 0);
    regfree(&regex);
    return ret == 0;
}

int main() {
    char* instanceId = getEnvVar("ZAPI_INSTANCE_ID", "SUA_INSTANCIA");
    char* instanceToken = getEnvVar("ZAPI_INSTANCE_TOKEN", "SEU_TOKEN");
    char* clientToken = getEnvVar("ZAPI_CLIENT_TOKEN", "seu-token-de-seguranca");
    
    // ⚠️ VALIDAÇÃO
    char* phone = "5511999999999";
    if (!validatePhone(phone)) {
        fprintf(stderr, "Erro: Telefone inválido\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/send-order", instanceId, instanceToken);
    
    char payload[1024];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"order\":{\"currency\":\"BRL\",\"discount\":10.00,\"tax\":10.00,\"shipping\":5.00,\"products\":[{\"productId\":\"23940797548900636\",\"name\":\"Produto do Catálogo\",\"value\":100.00,\"quantity\":2},{\"name\":\"Produto Customizado\",\"value\":50.00,\"quantity\":1}]},\"paymentSettings\":{\"pix\":{\"key\":\"12345678900\",\"keyType\":\"cpf\",\"name\":\"João Silva\"},\"card\":{\"enabled\":true}}}",
        phone);
    
    CURL* curl = curl_easy_init();
    if (curl) {
        char responseData[4096] = {0};
        
        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        char tokenHeader[256];
        snprintf(tokenHeader, sizeof(tokenHeader), "Client-Token: %s", clientToken);
        headers = curl_slist_append(headers, tokenHeader);
        
        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, responseData);
        curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
        
        CURLcode res = curl_easy_perform(curl);
        
        if (res == CURLE_OK) {
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);
            
            if (responseCode >= 200 && responseCode < 300) {
                printf("Pedido completo enviado com sucesso\n");
                printf("%s\n", responseData);
            } else {
                printf("Erro HTTP %ld\n", responseCode);
            }
        } else {
            fprintf(stderr, "Erro cURL: %s\n", curl_easy_strerror(res));
        }
        
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
| `zaapId` | string | ID da mensagem no Z-API |
| `messageId` | string | ID da mensagem no WhatsApp (use este ID para atualizações do pedido) |
| `id` | string | ID para compatibilidade com Zapier (mesmo valor do `messageId`) |

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

Quando um pedido é enviado, o webhook [Ao receber mensagem](/docs/webhooks/ao-receber) será acionado com informações importantes:

- **`referenceId`**: ID de referência do pedido (use para atualizações)
- **`orderRequestId`**: ID da requisição do pedido (use para atualizações)
- **`productId`**: IDs dos produtos (incluindo produtos customizados com prefixo `custom-item-`)
- **`isCustomItem`**: Indica se o produto é customizado

Para mais detalhes, consulte a documentação do webhook [Ao receber mensagem](/docs/webhooks/ao-receber#exemplo-de-retorno-de-envio-de-pedido).

---

## <Icon name="Lightbulb" size="md" /> Dicas {#dicas}

:::tip Produtos Customizados

Ao enviar um produto sem o atributo `productId`, ele será considerado um produto "customizado". O WhatsApp atribuirá um ID temporário com o prefixo `custom-item-`, que será retornado no webhook e deve ser usado nas atualizações do pedido.

:::

- **Armazene os IDs**: Salve o `messageId`, `referenceId` e `orderRequestId` retornados no webhook para atualizações futuras
- **Produtos do catálogo**: Use `productId` para produtos já cadastrados no seu catálogo
- **Pagamento via cartão**: Requer configuração prévia na conta WhatsApp pelo celular
- **Moeda**: Use códigos ISO de moeda (ex: `BRL`, `USD`, `EUR`)

---

## <Icon name="Rocket" size="md" /> Próximos Passos

- [Atualizar Status do Pedido](/docs/messages/atualizacao-status-pedido) - Atualize o status do pedido (pending, processing, shipped, completed, canceled)
- [Atualizar Pagamento do Pedido](/docs/messages/atualizacao-pagamento-pedido) - Atualize o status do pagamento (pending, paid)
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks para receber notificações sobre pedidos
