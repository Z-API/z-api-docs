---
id: atualizacao-pagamento-pedido
title: Atualizar Pagamento do Pedido
sidebar_position: 32
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CreditCard" size="lg" /> Atualizar Pagamento do Pedido

Atualize o status do pagamento de um pedido enviado anteriormente. Use este método para notificar o cliente quando o pagamento foi confirmado ou atualizado.

---

:::important Importante

Este método está disponível **apenas para contas Business** do WhatsApp.

:::

---

## <Icon name="Lightbulb" size="md" /> Casos de Uso Comuns

- **Confirmação de Pagamento**: Notificar quando o pagamento foi confirmado
- **Pagamento Pendente**: Atualizar status para pagamento pendente
- **Integração com Gateway**: Sincronizar status de pagamento com gateways de pagamento

![Exemplo de atualização de pagamento do pedido](/img/order-payment-update.jpeg)

---

## <Icon name="Wand2" size="md" /> Para Usuários No-Code

Para atualizar o pagamento de um pedido, você precisará dos seguintes dados retornados no webhook quando o pedido foi enviado:

1. **`messageId`**: ID da mensagem original do pedido
2. **`referenceId`**: ID de referência do pedido
3. **`orderRequestId`**: ID da requisição do pedido
4. **`orderStatus`**: Status atual do pedido
5. **`order`**: Todos os dados do pedido original (produtos, valores, etc.)

---

## <Icon name="Code" size="md" /> Para Desenvolvedores

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/order-payment-update
```

### <Icon name="Settings" size="sm" /> Atributos {#atributos}

#### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `phone` | string | Telefone do destinatário no formato DDI DDD NÚMERO (ex: `5511999999999`) |
| `messageId` | string | ID do WhatsApp da mensagem original do pedido |
| `referenceId` | string | ID de referência do pedido (retornado no webhook) |
| `orderRequestId` | string | ID da requisição do pedido (retornado no webhook) |
| `orderStatus` | string | Status atual do pedido: `pending`, `processing`, `shipped`, `completed`, `canceled` (retornado no webhook) |
| `paymentStatus` | string | Novo status do pagamento: `pending` ou `paid` |
| `order` | object | Informações completas do pedido (veja estrutura abaixo) |

#### Opcionais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `message` | string | Texto da mensagem de atualização |

#### Estrutura do Objeto `order`

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `currency` | string | Sim | Código da moeda (ex: `BRL`) |
| `products` | array | Sim | Array de produtos (veja estrutura abaixo) |
| `discount` | number | Não | Valor de desconto |
| `tax` | number | Não | Valor de imposto |
| `shipping` | number | Não | Valor de frete |

#### Estrutura do Objeto `products` (dentro de `order`)

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `productId` | string | Sim | ID do produto (retornado no webhook, incluindo produtos customizados com prefixo `custom-item-`) |
| `name` | string | Sim | Nome do produto |
| `value` | number | Sim | Valor do produto |
| `quantity` | number | Sim | Quantidade do produto |
| `isCustomItem` | boolean | Sim | Indica se é produto customizado (retornado no webhook) |

### <Icon name="Info" size="sm" /> Conceituação {#conceituacao}

:::caution Atenção

É necessário enviar na requisição **todos os dados previamente informados** no envio do pedido, com a inclusão dos parâmetros adicionais obrigatórios retornados no webhook.

:::

**Status de pagamento disponíveis**:
- `pending`: Pagamento pendente
- `paid`: Pagamento confirmado

**Importante sobre produtos customizados**:
- Produtos com `isCustomItem: true` têm IDs com prefixo `custom-item-`
- Esses IDs são retornados no webhook e são obrigatórios para atualizações
- Sempre inclua o `isCustomItem` correto para cada produto

---

## <Icon name="Code" size="md" /> Exemplos de Código {#exemplos}

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

// Validar status de pagamento
function validatePaymentStatus(status) {
  const validStatuses = ['pending', 'paid'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Status de pagamento inválido. Use: ${validStatuses.join(', ')}`);
  }
  return status;
}

// Atualizar status de pagamento do pedido
async function updateOrderPayment(orderData) {
  try {
    // ⚠️ VALIDAÇÃO
    const validatedPhone = validatePhone(orderData.phone);
    if (!orderData.messageId || !orderData.referenceId || !orderData.orderRequestId) {
      throw new Error('messageId, referenceId e orderRequestId são obrigatórios');
    }
    const validatedPaymentStatus = validatePaymentStatus(orderData.paymentStatus);
    
    // Validar produtos
    if (!orderData.order?.products || !Array.isArray(orderData.order.products) || orderData.order.products.length === 0) {
      throw new Error('A lista de produtos é obrigatória e não pode estar vazia');
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/order-payment-update`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify({
        phone: validatedPhone,
        messageId: orderData.messageId,
        message: orderData.message || 'Pagamento confirmado! Seu pedido será processado em breve.',
        referenceId: orderData.referenceId,
        orderRequestId: orderData.orderRequestId,
        orderStatus: orderData.orderStatus || 'processing',
        paymentStatus: validatedPaymentStatus,
        order: orderData.order,
      }),
    });

    if (!response.ok) {
      // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs de erro
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Status de pagamento atualizado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao atualizar status de pagamento:', error.message);
    throw error;
  }
}

// Exemplo de uso
updateOrderPayment({
  phone: '5511999999999',
  messageId: '3EB0F91BBA791BB0A787FC',
  message: 'Pagamento confirmado! Seu pedido será processado em breve.',
  referenceId: '4N8FCTW1WM6',
  orderRequestId: '4N8FCTW22W4',
  orderStatus: 'processing',
  paymentStatus: 'paid',
  order: {
    currency: 'BRL',
    discount: 10.00,
    tax: 10.00,
    shipping: 5.00,
    products: [
      {
        productId: 'custom-item-4N8FCTW23N7',
        name: 'Produto Customizado',
        value: 150.00,
        quantity: 2,
        isCustomItem: true,
      },
      {
        productId: '23940797548900636',
        name: 'Produto do Catálogo',
        value: 150.00,
        quantity: 2,
        isCustomItem: false,
      },
    ],
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
  productId: string;
  name: string;
  value: number;
  quantity: number;
  isCustomItem: boolean;
}

interface Order {
  currency: string;
  discount?: number;
  tax?: number;
  shipping?: number;
  products: Product[];
}

interface OrderPaymentUpdate {
  phone: string;
  messageId: string;
  message?: string;
  referenceId: string;
  orderRequestId: string;
  orderStatus: string;
  paymentStatus: 'pending' | 'paid';
  order: Order;
}

// Validar telefone
function validatePhone(phone: string): string {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Telefone inválido. Use apenas números');
  }
  return phone;
}

// Validar status de pagamento
function validatePaymentStatus(status: string): 'pending' | 'paid' {
  if (status !== 'pending' && status !== 'paid') {
    throw new Error('Status de pagamento inválido. Use: pending ou paid');
  }
  return status as 'pending' | 'paid';
}

// Função para atualizar status de pagamento
async function updateOrderPayment(orderData: OrderPaymentUpdate): Promise<any> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(orderData.phone);
  if (!orderData.messageId || !orderData.referenceId || !orderData.orderRequestId) {
    throw new Error('messageId, referenceId e orderRequestId são obrigatórios');
  }
  const validatedPaymentStatus = validatePaymentStatus(orderData.paymentStatus);
  
  if (!orderData.order?.products || orderData.order.products.length === 0) {
    throw new Error('A lista de produtos é obrigatória');
  }

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/order-payment-update`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify({
      phone: validatedPhone,
      messageId: orderData.messageId,
      message: orderData.message || 'Pagamento confirmado! Seu pedido será processado em breve.',
      referenceId: orderData.referenceId,
      orderRequestId: orderData.orderRequestId,
      orderStatus: orderData.orderStatus || 'processing',
      paymentStatus: validatedPaymentStatus,
      order: orderData.order,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

// Executar
updateOrderPayment({
  phone: '5511999999999',
  messageId: '3EB0F91BBA791BB0A787FC',
  message: 'Pagamento confirmado! Seu pedido será processado em breve.',
  referenceId: '4N8FCTW1WM6',
  orderRequestId: '4N8FCTW22W4',
  orderStatus: 'processing',
  paymentStatus: 'paid',
  order: {
    currency: 'BRL',
    discount: 10.00,
    tax: 10.00,
    shipping: 5.00,
    products: [
      {
        productId: 'custom-item-4N8FCTW23N7',
        name: 'Produto Customizado',
        value: 150.00,
        quantity: 2,
        isCustomItem: true,
      },
      {
        productId: '23940797548900636',
        name: 'Produto do Catálogo',
        value: 150.00,
        quantity: 2,
        isCustomItem: false,
      },
    ],
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
from typing import Dict, Any, List

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCIA')
INSTANCE_TOKEN = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_TOKEN')
CLIENT_TOKEN = os.getenv('ZAPI_CLIENT_TOKEN', 'seu-token-de-seguranca')

def validate_phone(phone: str) -> str:
    """Valida telefone (apenas números)"""
    if not re.match(r'^\d{10,15}$', phone):
        raise ValueError('Telefone inválido. Use apenas números (DDI + DDD + Número)')
    return phone

def validate_payment_status(status: str) -> str:
    """Valida status de pagamento"""
    valid_statuses = ['pending', 'paid']
    if status not in valid_statuses:
        raise ValueError(f'Status de pagamento inválido. Use: {", ".join(valid_statuses)}')
    return status

def update_order_payment(order_data: Dict[str, Any]) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(order_data['phone'])
    if not all(key in order_data for key in ['messageId', 'referenceId', 'orderRequestId']):
        raise ValueError('messageId, referenceId e orderRequestId são obrigatórios')
    validated_payment_status = validate_payment_status(order_data['paymentStatus'])
    
    if not order_data.get('order', {}).get('products') or not isinstance(order_data['order']['products'], list) or len(order_data['order']['products']) == 0:
        raise ValueError('A lista de produtos é obrigatória e não pode estar vazia')
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/order-payment-update"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "messageId": order_data['messageId'],
        "message": order_data.get('message', 'Pagamento confirmado! Seu pedido será processado em breve.'),
        "referenceId": order_data['referenceId'],
        "orderRequestId": order_data['orderRequestId'],
        "orderStatus": order_data.get('orderStatus', 'processing'),
        "paymentStatus": validated_payment_status,
        "order": order_data['order'],
    }
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Status de pagamento atualizado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
update_order_payment({
    'phone': '5511999999999',
    'messageId': '3EB0F91BBA791BB0A787FC',
    'message': 'Pagamento confirmado! Seu pedido será processado em breve.',
    'referenceId': '4N8FCTW1WM6',
    'orderRequestId': '4N8FCTW22W4',
    'orderStatus': 'processing',
    'paymentStatus': 'paid',
    'order': {
        'currency': 'BRL',
        'discount': 10.00,
        'tax': 10.00,
        'shipping': 5.00,
        'products': [
            {
                'productId': 'custom-item-4N8FCTW23N7',
                'name': 'Produto Customizado',
                'value': 150.00,
                'quantity': 2,
                'isCustomItem': True
            },
            {
                'productId': '23940797548900636',
                'name': 'Produto do Catálogo',
                'value': 150.00,
                'quantity': 2,
                'isCustomItem': False
            }
        ]
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
# Atualizar status de pagamento do pedido via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/order-payment-update" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"messageId\": \"3EB0F91BBA791BB0A787FC\",
    \"message\": \"Pagamento confirmado! Seu pedido será processado em breve.\",
    \"referenceId\": \"4N8FCTW1WM6\",
    \"orderRequestId\": \"4N8FCTW22W4\",
    \"orderStatus\": \"processing\",
    \"paymentStatus\": \"paid\",
    \"order\": {
      \"currency\": \"BRL\",
      \"discount\": 10.00,
      \"tax\": 10.00,
      \"shipping\": 5.00,
      \"products\": [
        {
          \"productId\": \"custom-item-4N8FCTW23N7\",
          \"name\": \"Produto Customizado\",
          \"value\": 150.00,
          \"quantity\": 2,
          \"isCustomItem\": true
        },
        {
          \"productId\": \"23940797548900636\",
          \"name\": \"Produto do Catálogo\",
          \"value\": 150.00,
          \"quantity\": 2,
          \"isCustomItem\": false
        }
      ]
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

// Atualizar status de pagamento
function updateOrderPayment(orderData) {
  return new Promise((resolve, reject) => {
    // ⚠️ VALIDAÇÃO
    try {
      const validatedPhone = validatePhone(orderData.phone);
      if (!orderData.messageId || !orderData.referenceId || !orderData.orderRequestId) {
        throw new Error('messageId, referenceId e orderRequestId são obrigatórios');
      }
      if (!orderData.order?.products || orderData.order.products.length === 0) {
        throw new Error('A lista de produtos é obrigatória');
      }
    } catch (error) {
      reject(error);
      return;
    }

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/order-payment-update`;
    const payload = JSON.stringify({
      phone: orderData.phone,
      messageId: orderData.messageId,
      message: orderData.message || 'Pagamento confirmado! Seu pedido será processado em breve.',
      referenceId: orderData.referenceId,
      orderRequestId: orderData.orderRequestId,
      orderStatus: orderData.orderStatus || 'processing',
      paymentStatus: orderData.paymentStatus,
      order: orderData.order,
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
            console.log('Status de pagamento atualizado com sucesso');
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
updateOrderPayment({
  phone: '5511999999999',
  messageId: '3EB0F91BBA791BB0A787FC',
  message: 'Pagamento confirmado! Seu pedido será processado em breve.',
  referenceId: '4N8FCTW1WM6',
  orderRequestId: '4N8FCTW22W4',
  orderStatus: 'processing',
  paymentStatus: 'paid',
  order: {
    currency: 'BRL',
    discount: 10.00,
    tax: 10.00,
    shipping: 5.00,
    products: [
      {
        productId: 'custom-item-4N8FCTW23N7',
        name: 'Produto Customizado',
        value: 150.00,
        quantity: 2,
        isCustomItem: true,
      },
      {
        productId: '23940797548900636',
        name: 'Produto do Catálogo',
        value: 150.00,
        quantity: 2,
        isCustomItem: false,
      },
    ],
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

// Rota para atualizar status de pagamento
app.post('/api/order-payment-update', async (req, res) => {
  try {
    // ⚠️ VALIDAÇÃO
    const orderData = req.body;
    
    const validatedPhone = validatePhone(orderData.phone);
    if (!orderData.messageId || !orderData.referenceId || !orderData.orderRequestId) {
      return res.status(400).json({
        success: false,
        error: 'messageId, referenceId e orderRequestId são obrigatórios',
      });
    }
    if (!orderData.order?.products || orderData.order.products.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'A lista de produtos é obrigatória',
      });
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/order-payment-update`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      messageId: orderData.messageId,
      message: orderData.message || 'Pagamento confirmado! Seu pedido será processado em breve.',
      referenceId: orderData.referenceId,
      orderRequestId: orderData.orderRequestId,
      orderStatus: orderData.orderStatus || 'processing',
      paymentStatus: orderData.paymentStatus,
      order: orderData.order,
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
    console.error('Erro ao atualizar status de pagamento:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao atualizar status de pagamento',
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

// Middleware para atualizar status de pagamento
app.use(async (ctx) => {
  if (ctx.path === '/api/order-payment-update' && ctx.method === 'POST') {
    try {
      // ⚠️ VALIDAÇÃO
      const orderData = ctx.request.body;
      
      const validatedPhone = validatePhone(orderData.phone);
      if (!orderData.messageId || !orderData.referenceId || !orderData.orderRequestId) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'messageId, referenceId e orderRequestId são obrigatórios',
        };
        return;
      }
      if (!orderData.order?.products || orderData.order.products.length === 0) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'A lista de produtos é obrigatória',
        };
        return;
      }

      // ⚠️ SEGURANÇA: Sempre use HTTPS
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/order-payment-update`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        messageId: orderData.messageId,
        message: orderData.message || 'Pagamento confirmado! Seu pedido será processado em breve.',
        referenceId: orderData.referenceId,
        orderRequestId: orderData.orderRequestId,
        orderStatus: orderData.orderStatus || 'processing',
        paymentStatus: orderData.paymentStatus,
        order: orderData.order,
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
      console.error('Erro ao atualizar status de pagamento:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao atualizar status de pagamento',
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

public class UpdateOrderPayment {
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
            String messageId = "3EB0F91BBA791BB0A787FC";
            String referenceId = "4N8FCTW1WM6";
            String orderRequestId = "4N8FCTW22W4";
            
            if (messageId == null || referenceId == null || orderRequestId == null) {
                throw new IllegalArgumentException("messageId, referenceId e orderRequestId são obrigatórios");
            }

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/order-payment-update",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );
            
            JSONArray products = new JSONArray();
            JSONObject product1 = new JSONObject();
            product1.put("productId", "custom-item-4N8FCTW23N7");
            product1.put("name", "Produto Customizado");
            product1.put("value", 150.00);
            product1.put("quantity", 2);
            product1.put("isCustomItem", true);
            products.put(product1);
            
            JSONObject product2 = new JSONObject();
            product2.put("productId", "23940797548900636");
            product2.put("name", "Produto do Catálogo");
            product2.put("value", 150.00);
            product2.put("quantity", 2);
            product2.put("isCustomItem", false);
            products.put(product2);
            
            JSONObject order = new JSONObject();
            order.put("currency", "BRL");
            order.put("discount", 10.00);
            order.put("tax", 10.00);
            order.put("shipping", 5.00);
            order.put("products", products);
            
            JSONObject payload = new JSONObject();
            payload.put("phone", phone);
            payload.put("messageId", messageId);
            payload.put("message", "Pagamento confirmado! Seu pedido será processado em breve.");
            payload.put("referenceId", referenceId);
            payload.put("orderRequestId", orderRequestId);
            payload.put("orderStatus", "processing");
            payload.put("paymentStatus", "paid");
            payload.put("order", order);
            
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
                
                System.out.println("Status de pagamento atualizado com sucesso");
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
            string messageId = "3EB0F91BBA791BB0A787FC";
            string referenceId = "4N8FCTW1WM6";
            string orderRequestId = "4N8FCTW22W4";
            
            if (string.IsNullOrEmpty(messageId) || string.IsNullOrEmpty(referenceId) || string.IsNullOrEmpty(orderRequestId))
            {
                throw new ArgumentException("messageId, referenceId e orderRequestId são obrigatórios");
            }

            // ⚠️ SEGURANÇA: Sempre use HTTPS
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/order-payment-update";
            
            var payload = new
            {
                phone = phone,
                messageId = messageId,
                message = "Pagamento confirmado! Seu pedido será processado em breve.",
                referenceId = referenceId,
                orderRequestId = orderRequestId,
                orderStatus = "processing",
                paymentStatus = "paid",
                order = new
                {
                    currency = "BRL",
                    discount = 10.00,
                    tax = 10.00,
                    shipping = 5.00,
                    products = new[]
                    {
                        new { productId = "custom-item-4N8FCTW23N7", name = "Produto Customizado", value = 150.00, quantity = 2, isCustomItem = true },
                        new { productId = "23940797548900636", name = "Produto do Catálogo", value = 150.00, quantity = 2, isCustomItem = false }
                    }
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
                    Console.WriteLine("Status de pagamento atualizado com sucesso");
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
    
    messageId := "3EB0F91BBA791BB0A787FC"
    referenceId := "4N8FCTW1WM6"
    orderRequestId := "4N8FCTW22W4"
    
    if messageId == "" || referenceId == "" || orderRequestId == "" {
        fmt.Println("Erro: messageId, referenceId e orderRequestId são obrigatórios")
        return
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/order-payment-update", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "messageId": messageId,
        "message": "Pagamento confirmado! Seu pedido será processado em breve.",
        "referenceId": referenceId,
        "orderRequestId": orderRequestId,
        "orderStatus": "processing",
        "paymentStatus": "paid",
        "order": map[string]interface{}{
            "currency": "BRL",
            "discount": 10.00,
            "tax": 10.00,
            "shipping": 5.00,
            "products": []map[string]interface{}{
                {
                    "productId": "custom-item-4N8FCTW23N7",
                    "name": "Produto Customizado",
                    "value": 150.00,
                    "quantity": 2,
                    "isCustomItem": true,
                },
                {
                    "productId": "23940797548900636",
                    "name": "Produto do Catálogo",
                    "value": 150.00,
                    "quantity": 2,
                    "isCustomItem": false,
                },
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
        
        fmt.Println("Status de pagamento atualizado com sucesso")
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
    $messageId = '3EB0F91BBA791BB0A787FC';
    $referenceId = '4N8FCTW1WM6';
    $orderRequestId = '4N8FCTW22W4';
    
    if (empty($messageId) || empty($referenceId) || empty($orderRequestId)) {
        throw new Exception('messageId, referenceId e orderRequestId são obrigatórios');
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = sprintf(
        'https://api.z-api.io/instances/%s/token/%s/order-payment-update',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'messageId' => $messageId,
        'message' => 'Pagamento confirmado! Seu pedido será processado em breve.',
        'referenceId' => $referenceId,
        'orderRequestId' => $orderRequestId,
        'orderStatus' => 'processing',
        'paymentStatus' => 'paid',
        'order' => [
            'currency' => 'BRL',
            'discount' => 10.00,
            'tax' => 10.00,
            'shipping' => 5.00,
            'products' => [
                [
                    'productId' => 'custom-item-4N8FCTW23N7',
                    'name' => 'Produto Customizado',
                    'value' => 150.00,
                    'quantity' => 2,
                    'isCustomItem' => true,
                ],
                [
                    'productId' => '23940797548900636',
                    'name' => 'Produto do Catálogo',
                    'value' => 150.00,
                    'quantity' => 2,
                    'isCustomItem' => false,
                ],
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
        echo "Status de pagamento atualizado com sucesso\n";
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
  message_id = '3EB0F91BBA791BB0A787FC'
  reference_id = '4N8FCTW1WM6'
  order_request_id = '4N8FCTW22W4'
  
  if message_id.nil? || message_id.empty? || reference_id.nil? || reference_id.empty? || order_request_id.nil? || order_request_id.empty?
    raise 'messageId, referenceId e orderRequestId são obrigatórios'
  end

  # ⚠️ SEGURANÇA: Sempre use HTTPS
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/order-payment-update")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    messageId: message_id,
    message: 'Pagamento confirmado! Seu pedido será processado em breve.',
    referenceId: reference_id,
    orderRequestId: order_request_id,
    orderStatus: 'processing',
    paymentStatus: 'paid',
    order: {
      currency: 'BRL',
      discount: 10.00,
      tax: 10.00,
      shipping: 5.00,
      products: [
        {
          productId: 'custom-item-4N8FCTW23N7',
          name: 'Produto Customizado',
          value: 150.00,
          quantity: 2,
          isCustomItem: true
        },
        {
          productId: '23940797548900636',
          name: 'Produto do Catálogo',
          value: 150.00,
          quantity: 2,
          isCustomItem: false
        }
      ]
    }
  }

  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = client_token
  request.body = payload.to_json

  response = http.request(request)
  
  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts 'Status de pagamento atualizado com sucesso'
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
    let messageId = "3EB0F91BBA791BB0A787FC"
    let referenceId = "4N8FCTW1WM6"
    let orderRequestId = "4N8FCTW22W4"
    
    if messageId.isEmpty || referenceId.isEmpty || orderRequestId.isEmpty {
        throw NSError(domain: "ValidationError", code: 2, userInfo: [NSLocalizedDescriptionKey: "messageId, referenceId e orderRequestId são obrigatórios"])
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/order-payment-update"
    
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
        "messageId": messageId,
        "message": "Pagamento confirmado! Seu pedido será processado em breve.",
        "referenceId": referenceId,
        "orderRequestId": orderRequestId,
        "orderStatus": "processing",
        "paymentStatus": "paid",
        "order": [
            "currency": "BRL",
            "discount": 10.00,
            "tax": 10.00,
            "shipping": 5.00,
            "products": [
                [
                    "productId": "custom-item-4N8FCTW23N7",
                    "name": "Produto Customizado",
                    "value": 150.00,
                    "quantity": 2,
                    "isCustomItem": true
                ],
                [
                    "productId": "23940797548900636",
                    "name": "Produto do Catálogo",
                    "value": 150.00,
                    "quantity": 2,
                    "isCustomItem": false
                ]
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
                        print("Status de pagamento atualizado com sucesso")
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
    $messageId = "3EB0F91BBA791BB0A787FC"
    $referenceId = "4N8FCTW1WM6"
    $orderRequestId = "4N8FCTW22W4"
    
    if ([string]::IsNullOrWhiteSpace($messageId) -or [string]::IsNullOrWhiteSpace($referenceId) -or [string]::IsNullOrWhiteSpace($orderRequestId)) {
        throw "messageId, referenceId e orderRequestId são obrigatórios"
    }

    # ⚠️ SEGURANÇA: Sempre use HTTPS
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/order-payment-update"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        messageId = $messageId
        message = "Pagamento confirmado! Seu pedido será processado em breve."
        referenceId = $referenceId
        orderRequestId = $orderRequestId
        orderStatus = "processing"
        paymentStatus = "paid"
        order = @{
            currency = "BRL"
            discount = 10.00
            tax = 10.00
            shipping = 5.00
            products = @(
                @{
                    productId = "custom-item-4N8FCTW23N7"
                    name = "Produto Customizado"
                    value = 150.00
                    quantity = 2
                    isCustomItem = $true
                },
                @{
                    productId = "23940797548900636"
                    name = "Produto do Catálogo"
                    value = 150.00
                    quantity = 2
                    isCustomItem = $false
                }
            )
        }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30
    
    Write-Host "Status de pagamento atualizado com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/order-payment-update HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "messageId": "3EB0F91BBA791BB0A787FC",
  "message": "Pagamento confirmado! Seu pedido será processado em breve.",
  "referenceId": "4N8FCTW1WM6",
  "orderRequestId": "4N8FCTW22W4",
  "orderStatus": "processing",
  "paymentStatus": "paid",
  "order": {
    "currency": "BRL",
    "discount": 10.00,
    "tax": 10.00,
    "shipping": 5.00,
    "products": [
      {
        "productId": "custom-item-4N8FCTW23N7",
        "name": "Produto Customizado",
        "value": 150.00,
        "quantity": 2,
        "isCustomItem": true
      },
      {
        "productId": "23940797548900636",
        "name": "Produto do Catálogo",
        "value": 150.00,
        "quantity": 2,
        "isCustomItem": false
      }
    ]
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
    
    std::string messageId = "3EB0F91BBA791BB0A787FC";
    std::string referenceId = "4N8FCTW1WM6";
    std::string orderRequestId = "4N8FCTW22W4";
    
    if (messageId.empty() || referenceId.empty() || orderRequestId.empty()) {
        std::cerr << "Erro: messageId, referenceId e orderRequestId são obrigatórios" << std::endl;
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/order-payment-update";
    
    // Criar payload JSON (simplificado para exemplo)
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"messageId\":\"" << messageId << "\","
                  << "\"message\":\"Pagamento confirmado! Seu pedido será processado em breve.\","
                  << "\"referenceId\":\"" << referenceId << "\","
                  << "\"orderRequestId\":\"" << orderRequestId << "\","
                  << "\"orderStatus\":\"processing\","
                  << "\"paymentStatus\":\"paid\","
                  << "\"order\":{"
                  << "\"currency\":\"BRL\","
                  << "\"discount\":10.00,"
                  << "\"tax\":10.00,"
                  << "\"shipping\":5.00,"
                  << "\"products\":["
                  << "{\"productId\":\"custom-item-4N8FCTW23N7\",\"name\":\"Produto Customizado\",\"value\":150.00,\"quantity\":2,\"isCustomItem\":true},"
                  << "{\"productId\":\"23940797548900636\",\"name\":\"Produto do Catálogo\",\"value\":150.00,\"quantity\":2,\"isCustomItem\":false}"
                  << "]"
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
                std::cout << "Status de pagamento atualizado com sucesso" << std::endl;
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
    
    char* messageId = "3EB0F91BBA791BB0A787FC";
    char* referenceId = "4N8FCTW1WM6";
    char* orderRequestId = "4N8FCTW22W4";
    
    if (!messageId || strlen(messageId) == 0 || !referenceId || strlen(referenceId) == 0 || !orderRequestId || strlen(orderRequestId) == 0) {
        fprintf(stderr, "Erro: messageId, referenceId e orderRequestId são obrigatórios\n");
        return 1;
    }
    
    // ⚠️ SEGURANÇA: Sempre use HTTPS
    char url[512];
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/order-payment-update", instanceId, instanceToken);
    
    // Payload JSON simplificado
    char payload[2048];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"messageId\":\"%s\",\"message\":\"Pagamento confirmado! Seu pedido será processado em breve.\",\"referenceId\":\"%s\",\"orderRequestId\":\"%s\",\"orderStatus\":\"processing\",\"paymentStatus\":\"paid\",\"order\":{\"currency\":\"BRL\",\"discount\":10.00,\"tax\":10.00,\"shipping\":5.00,\"products\":[{\"productId\":\"custom-item-4N8FCTW23N7\",\"name\":\"Produto Customizado\",\"value\":150.00,\"quantity\":2,\"isCustomItem\":true},{\"productId\":\"23940797548900636\",\"name\":\"Produto do Catálogo\",\"value\":150.00,\"quantity\":2,\"isCustomItem\":false}]}}",
        phone, messageId, referenceId, orderRequestId);
    
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
                printf("Status de pagamento atualizado com sucesso\n");
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
| `messageId` | string | ID da mensagem no WhatsApp |
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

Quando o pagamento do pedido é atualizado, o webhook [Ao receber mensagem](/docs/webhooks/ao-receber) será acionado com informações sobre a atualização.

Para mais detalhes, consulte a documentação do webhook [Ao receber mensagem](/docs/webhooks/ao-receber#exemplo-de-retorno-de-atualização-de-pedido).

---

## <Icon name="Lightbulb" size="md" /> Dicas {#dicas}

:::tip Armazenar Dados do Webhook

Sempre armazene os dados retornados no webhook quando um pedido é enviado:
- `messageId`: Para referenciar o pedido original
- `referenceId`: Obrigatório para atualizações
- `orderRequestId`: Obrigatório para atualizações
- `orderStatus`: Status atual do pedido
- `productId` e `isCustomItem`: Para cada produto do pedido

:::

- **Dados completos**: Envie todos os dados do pedido original, incluindo produtos, valores e configurações
- **Produtos customizados**: Produtos com `isCustomItem: true` têm IDs com prefixo `custom-item-`
- **Status do pedido**: Use o `orderStatus` retornado no webhook, não altere este valor aqui
- **Mensagem personalizada**: Use o campo `message` para personalizar a notificação ao cliente
- **Integração com Gateway**: Use este endpoint quando receber confirmação de pagamento do seu gateway

---

## <Icon name="Rocket" size="md" /> Próximos Passos

- [Atualizar Status do Pedido](/docs/messages/atualizacao-status-pedido) - Atualize o status do pedido
- [Enviar Pedido](/docs/messages/aprovacao-pedido) - Aprenda a enviar pedidos
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks para receber notificações
