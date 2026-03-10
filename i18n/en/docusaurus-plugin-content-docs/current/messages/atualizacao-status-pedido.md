---
id: atualizacao-status-pedido
sidebar_position: 31
title: Update Order Status
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="RefreshCw" size="lg" /> Update Order Status

Update the status of an order that was sent previously. Use this method to notify the customer about changes in the order status (pending, processing, shipped, completed, canceled).

---

:::important Important

This method is available **only for Business WhatsApp** accounts.

:::

---

## <Icon name="Lightbulb" size="md" /> Common Use Cases

- **Processing**: Notify when the order is being processed
- **Shipping**: Inform when the order was shipped
- **Completed**: Confirm when the order has been delivered
- **Cancelled**: Notify about cancellation of the order

![Example of order status update](/img/order-status-update.jpeg)

---

## <Icon name="Wand2" size="md" /> For No-Code Users

To update the status of an order, you will need the following data returned in the webhook when the order was sent:

1. **`messageId`**: Original message ID from the order
2. **`referenceId`**: Order reference ID
3. **`orderRequestId`**: Request ID for the order
4. **`paymentStatus`**: Current payment status
5. **`order`**: All original order data (products, values, etc.)

---

## <Icon name="Code" size="md" /> For Developers

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/order-status-update
```

### <Icon name="Settings" size="sm" /> Attributes {#attributes}

#### Required

| Attribute | Type | Description |
|----------|------|-----------|
| `phone` | string | Recipient phone number in DDI DDD NUMBER format (ex: `5511999999999`) |
| `messageId` | string | WhatsApp message ID of the original order message |
| `referenceId` | string | Order reference ID (returned in webhook) |
| `orderRequestId` | string | Request ID for the order (returned in webhook) |
| `orderStatus` | string | New order status: `pending`, `processing`, `shipped`, `completed`, `canceled` |
| `paymentStatus` | string | Current payment status: `pending` or `paid` (returned in webhook) |
| `order` | object | Complete order information (see structure below)

#### Optional

| Attribute | Type | Description |
|----------|------|-----------|
| `message` | string | Custom message text |

#### Structure of Object `order`

| Attribute | Type | Required | Description |
|----------|------|---------|-----------|
| `currency` | string | Yes | Currency code (ex: `BRL`) |
| `products` | array | Yes | Array of products (see structure below) |
| `discount` | number | No | Discount value |
| `tax` | number | No | Tax value |
| `shipping` | number | No | Shipping cost |

#### Structure of Object `products` (within `order`)

| Attribute | Type | Required | Description |
|----------|------|---------|-----------|
| `productId` | string | Yes | Product ID (returned in webhook, including custom products with prefix `custom-item-`) |
| `name` | string | Yes | Product name |
| `value` | number | Yes | Product value |
| `quantity` | number | Yes | Product quantity |
| `isCustomItem` | boolean | Yes | Indicates if it is a custom product (returned in webhook) |

---

### <Icon name="FileJson" size="sm" /> Request Body {#request-body}

:::warning Warning

All previously provided data for the order must be sent in the request, including some additional required parameters which are returned in the [webhook](/docs/webhooks/ao-receber#example-of-order-status-update).

:::

```json
{
  "phone": "554499999999",
  "messageId": "3EB0F91BBA791BB0A787FC",
  "message": "Mensagem de texto da atualização do pedido",
  "referenceId": "4N8FCTW1WM6",
  "orderRequestId": "4N8FCTW22W4",
  "orderStatus": "processing",
  "paymentStatus": "pending",
  "order": {
    "currency": "BRL",
    "discount": 10,
    "tax": 10,
    "shipping": 5,
    "products": [
      {
        "value": 150,
        "quantity": 2,
        "name": "order 1",
        "isCustomItem": true,
        "productId": "custom-item-4N8FCTW23N7"
      },
      {
        "productId": "23940797548900636",
        "value": 150,
        "quantity": 2,
        "name": "order 2",
        "isCustomItem": false
      }
    ]
  }
}
```

:::tip Tip

It can be noted that the product with attribute `isCustomItem` having value `true` has an ID with prefix `custom-item`. This occurs when sending an order without any product IDs, meaning WhatsApp assumes it is a custom product. This ID is returned in the [webhook](/docs/webhooks/ao-receber#example-of-order-status-update) and is a required parameter, along with `isCustomItem`, for order updates.

:::

### <Icon name="Info" size="sm" /> Conceptualization {#conceituation}

**Available statuses**:
- `pending`: Order pending
- `processing`: Order processing
- `shipped`: Order shipped
- `completed`: Order completed/entregue
- `canceled`: Order cancelled

**Important about custom products**:
- Products with `isCustomItem: true` have IDs with prefix `custom-item-`
- These IDs are returned in the webhook and are required for updates
- Always include the correct `isCustomItem` for each product

---

## <Icon name="Code" size="md" /> Examples of Code {#exemplos}

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

// Validar status do pedido
function validateOrderStatus(status) {
  const validStatuses = ['pending', 'processing', 'shipped', 'completed', 'canceled'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Status do pedido inválido. Use: ${validStatuses.join(', ')}`);
  }
  return status;
}

// Validar status de pagamento
function validatePaymentStatus(status) {
  const validStatuses = ['pending', 'paid'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Status de pagamento inválido. Use: ${validStatuses.join(', ')}`);
  }
  return status;
}

// Atualizar status do pedido
async function updateOrderStatus(orderData) {
  try {
    // ⚠️ VALIDAÇÃO
    const validatedPhone = validatePhone(orderData.phone);
    if (!orderData.messageId || !orderData.referenceId || !orderData.orderRequestId) {
      throw new Error('messageId, referenceId e orderRequestId são obrigatórios');
    }
    const validatedOrderStatus = validateOrderStatus(orderData.orderStatus);
    const validatedPaymentStatus = validatePaymentStatus(orderData.paymentStatus);
    
    // Validar produtos
    if (!orderData.order?.products || !Array.isArray(orderData.order.products) || orderData.order.products.length === 0) {
      throw new Error('A lista de produtos é obrigatória e não pode estar vazia');
    }

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/order-status-update`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify({
        phone: validatedPhone,
        messageId: orderData.messageId,
        message: orderData.message || 'Seu pedido está sendo processado!',
        referenceId: orderData.referenceId,
        orderRequestId: orderData.orderRequestId,
        orderStatus: validatedOrderStatus,
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
    console.log('Status do pedido atualizado com sucesso');
    return data;
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro sem expor stack traces em produção
    console.error('Erro ao atualizar status do pedido:', error.message);
    throw error;
  }
}

// Exemplo de uso
updateOrderStatus({
  phone: '5511999999999',
  messageId: '3EB0F91BBA791BB0A787FC',
  message: 'Seu pedido está sendo processado!',
  referenceId: '4N8FCTW1WM6',
  orderRequestId: '4N8FCTW22W4',
  orderStatus: 'processing',
  paymentStatus: 'pending',
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

interface OrderStatusUpdate {
  phone: string;
  messageId: string;
  message?: string;
  referenceId: string;
  orderRequestId: string;
  orderStatus: 'pending' | 'processing' | 'shipped' | 'completed' | 'canceled';
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

// Validar status do pedido
function validateOrderStatus(status: string): 'pending' | 'processing' | 'shipped' | 'completed' | 'canceled' {
  const validStatuses = ['pending', 'processing', 'shipped', 'completed', 'canceled'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Status do pedido inválido. Use: ${validStatuses.join(', ')}`);
  }
  return status as 'pending' | 'processing' | 'shipped' | 'completed' | 'canceled';
}

// Validar status de pagamento
function validatePaymentStatus(status: string): 'pending' | 'paid' {
  if (status !== 'pending' && status !== 'paid') {
    throw new Error('Status de pagamento inválido. Use: pending ou paid');
  }
  return status as 'pending' | 'paid';
}

// Função para atualizar status do pedido
async function updateOrderStatus(orderData: OrderStatusUpdate): Promise<any> {
  // ⚠️ VALIDAÇÃO
  const validatedPhone = validatePhone(orderData.phone);
  if (!orderData.messageId || !orderData.referenceId || !orderData.orderRequestId) {
    throw new Error('messageId, referenceId e orderRequestId são obrigatórios');
  }
  const validatedOrderStatus = validateOrderStatus(orderData.orderStatus);
  const validatedPaymentStatus = validatePaymentStatus(orderData.paymentStatus);
  
  if (!orderData.order?.products || orderData.order.products.length === 0) {
    throw new Error('A lista de produtos é obrigatória');
  }

  // ⚠️ SEGURANÇA: Sempre use HTTPS
  const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/order-status-update`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
    },
    body: JSON.stringify({
      phone: validatedPhone,
      messageId: orderData.messageId,
      message: orderData.message || 'Seu pedido está sendo processado!',
      referenceId: orderData.referenceId,
      orderRequestId: orderData.orderRequestId,
      orderStatus: validatedOrderStatus,
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
updateOrderStatus({
  phone: '5511999999999',
  messageId: '3EB0F91BBA791BB0A787FC',
  message: 'Seu pedido está sendo processado!',
  referenceId: '4N8FCTW1WM6',
  orderRequestId: '4N8FCTW22W4',
  orderStatus: 'processing',
  paymentStatus: 'pending',
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

def validate_order_status(status: str) -> str:
    """Valida status do pedido"""
    valid_statuses = ['pending', 'processing', 'shipped', 'completed', 'canceled']
    if status not in valid_statuses:
        raise ValueError(f'Status do pedido inválido. Use: {", ".join(valid_statuses)}')
    return status

def validate_payment_status(status: str) -> str:
    """Valida status de pagamento"""
    valid_statuses = ['pending', 'paid']
    if status not in valid_statuses:
        raise ValueError(f'Status de pagamento inválido. Use: {", ".join(valid_statuses)}')
    return status

def update_order_status(order_data: Dict[str, Any]) -> Dict[str, Any]:
    # ⚠️ VALIDAÇÃO
    validated_phone = validate_phone(order_data['phone'])
    if not all(key in order_data for key in ['messageId', 'referenceId', 'orderRequestId']):
        raise ValueError('messageId, referenceId e orderRequestId são obrigatórios')
    validated_order_status = validate_order_status(order_data['orderStatus'])
    validated_payment_status = validate_payment_status(order_data['paymentStatus'])
    
    if not order_data.get('order', {}).get('products') or not isinstance(order_data['order']['products'], list) or len(order_data['order']['products']) == 0:
        raise ValueError('A lista de produtos é obrigatória e não pode estar vazia')
    
    # URL do endpoint (sempre HTTPS)
    url = f"https://api.z-api.io/instances/{INSTANCE_ID}/token/{INSTANCE_TOKEN}/order-status-update"
    
    headers = {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN
    }
    
    payload = {
        "phone": validated_phone,
        "messageId": order_data['messageId'],
        "message": order_data.get('message', 'Seu pedido está sendo processado!'),
        "referenceId": order_data['referenceId'],
        "orderRequestId": order_data['orderRequestId'],
        "orderStatus": validated_order_status,
        "paymentStatus": validated_payment_status,
        "order": order_data['order'],
    }
    
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print('Status do pedido atualizado com sucesso')
        return result
        
    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP {e.response.status_code}: Requisição falhou")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso
update_order_status({
    'phone': '5511999999999',
    'messageId': '3EB0F91BBA791BB0A787FC',
    'message': 'Seu pedido está sendo processado!',
    'referenceId': '4N8FCTW1WM6',
    'orderRequestId': '4N8FCTW22W4',
    'orderStatus': 'processing',
    'paymentStatus': 'pending',
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
# Atualizar status do pedido via cURL
curl -X POST \
  "https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/order-status-update" \
  -H "Content-Type: application/json" \
  -H "Client-Token: ${CLIENT_TOKEN}" \
  -d "{
    \"phone\": \"${PHONE}\",
    \"messageId\": \"3EB0F91BBA791BB0A787FC\",
    \"message\": \"Seu pedido está sendo processado!\",
    \"referenceId\": \"4N8FCTW1WM6\",
    \"orderRequestId\": \"4N8FCTW22W4\",
    \"orderStatus\": \"processing\",
    \"paymentStatus\": \"pending\",
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

// Atualizar status do pedido
function updateOrderStatus(orderData) {
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

    const path = `/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/order-status-update`;
    const payload = JSON.stringify({
      phone: orderData.phone,
      messageId: orderData.messageId,
      message: orderData.message || 'Seu pedido está sendo processado!',
      referenceId: orderData.referenceId,
      orderRequestId: orderData.orderRequestId,
      orderStatus: orderData.orderStatus,
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
            console.log('Status do pedido atualizado com sucesso');
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
updateOrderStatus({
  phone: '5511999999999',
  messageId: '3EB0F91BBA791BB0A787FC',
  message: 'Seu pedido está sendo processado!',
  referenceId: '4N8FCTW1WM6',
  orderRequestId: '4N8FCTW22W4',
  orderStatus: 'processing',
  paymentStatus: 'pending',
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

// Rota para atualizar status do pedido
app.post('/api/order-status-update', async (req, res) => {
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
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/order-status-update`;
    
    const response = await axios.post(url, {
      phone: validatedPhone,
      messageId: orderData.messageId,
      message: orderData.message || 'Seu pedido está sendo processado!',
      referenceId: orderData.referenceId,
      orderRequestId: orderData.orderRequestId,
      orderStatus: orderData.orderStatus,
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
    console.error('Erro ao atualizar status do pedido:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Erro ao atualizar status do pedido',
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

// Middleware para atualizar status do pedido
app.use(async (ctx) => {
  if (ctx.path === '/api/order-status-update' && ctx.method === 'POST') {
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
      const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/order-status-update`;
      
      const response = await axios.post(url, {
        phone: validatedPhone,
        messageId: orderData.messageId,
        message: orderData.message || 'Seu pedido está sendo processado!',
        referenceId: orderData.referenceId,
        orderRequestId: orderData.orderRequestId,
        orderStatus: orderData.orderStatus,
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
      console.error('Erro ao atualizar status do pedido:', error.message);
      ctx.status = error.response?.status || 500;
      ctx.body = {
        success: false,
        error: 'Erro ao atualizar status do pedido',
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

public class UpdateOrderStatus {
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
                "https://api.z-api.io/instances/%s/token/%s/order-status-update",
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
            payload.put("message", "Seu pedido está sendo processado!");
            payload.put("referenceId", referenceId);
            payload.put("orderRequestId", orderRequestId);
            payload.put("orderStatus", "processing");
            payload.put("paymentStatus", "pending");
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
                
                System.out.println("Status do pedido atualizado com sucesso");
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
            var url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/order-status-update";
            
            var payload = new
            {
                phone = phone,
                messageId = messageId,
                message = "Seu pedido está sendo processado!",
                referenceId = referenceId,
                orderRequestId = orderRequestId,
                orderStatus = "processing",
                paymentStatus = "pending",
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
                    Console.WriteLine("Status do pedido atualizado com sucesso");
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
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/order-status-update", instanceId, instanceToken)
    
    payload := map[string]interface{}{
        "phone": phone,
        "messageId": messageId,
        "message": "Seu pedido está sendo processado!",
        "referenceId": referenceId,
        "orderRequestId": orderRequestId,
        "orderStatus": "processing",
        "paymentStatus": "pending",
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
        
        fmt.Println("Status do pedido atualizado com sucesso")
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
        'https://api.z-api.io/instances/%s/token/%s/order-status-update',
        urlencode($instanceId),
        urlencode($instanceToken)
    );

    $payload = [
        'phone' => $phone,
        'messageId' => $messageId,
        'message' => 'Seu pedido está sendo processado!',
        'referenceId' => $referenceId,
        'orderRequestId' => $orderRequestId,
        'orderStatus' => 'processing',
        'paymentStatus' => 'pending',
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
        echo "Status do pedido atualizado com sucesso\n";
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
  url = URI("https://api.z-api.io/instances/#{CGI.escape(instance_id)}/token/#{CGI.escape(instance_token)}/order-status-update")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER

  payload = {
    phone: phone,
    messageId: message_id,
    message: 'Seu pedido está sendo processado!',
    referenceId: reference_id,
    orderRequestId: order_request_id,
    orderStatus: 'processing',
    paymentStatus: 'pending',
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
    puts 'Status do pedido atualizado com sucesso'
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
    let urlString = "https://api.z-api.io/instances/\(instanceId.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceId)/token/\(instanceToken.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? instanceToken)/order-status-update"
    
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
        "message": "Seu pedido está sendo processado!",
        "referenceId": referenceId,
        "orderRequestId": orderRequestId,
        "orderStatus": "processing",
        "paymentStatus": "pending",
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
                        print("Status do pedido atualizado com sucesso")
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
    $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/order-status-update"

    $headers = @{
        "Content-Type" = "application/json"
        "Client-Token" = $clientToken
    }

    $body = @{
        phone = $phone
        messageId = $messageId
        message = "Seu pedido está sendo processado!"
        referenceId = $referenceId
        orderRequestId = $orderRequestId
        orderStatus = "processing"
        paymentStatus = "pending"
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
    
    Write-Host "Status do pedido atualizado com sucesso"
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/order-status-update HTTP/1.1
Host: api.z-api.io
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "messageId": "3EB0F91BBA791BB0A787FC",
  "message": "Seu pedido está sendo processado!",
  "referenceId": "4N8FCTW1WM6",
  "orderRequestId": "4N8FCTW22W4",
  "orderStatus": "processing",
  "paymentStatus": "pending",
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
    std::string url = "https://api.z-api.io/instances/" + instanceId + "/token/" + instanceToken + "/order-status-update";
    
    // Criar payload JSON (simplificado para exemplo)
    std::ostringstream payloadStream;
    payloadStream << "{"
                  << "\"phone\":\"" << phone << "\","
                  << "\"messageId\":\"" << messageId << "\","
                  << "\"message\":\"Seu pedido está sendo processado!\","
                  << "\"referenceId\":\"" << referenceId << "\","
                  << "\"orderRequestId\":\"" << orderRequestId << "\","
                  << "\"orderStatus\":\"processing\","
                  << "\"paymentStatus\":\"pending\","
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
                std::cout << "Status do pedido atualizado com sucesso" << std::endl;
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
    snprintf(url, sizeof(url), "https://api.z-api.io/instances/%s/token/%s/order-status-update", instanceId, instanceToken);
    
    // Payload JSON simplificado
    char payload[2048];
    snprintf(payload, sizeof(payload),
        "{\"phone\":\"%s\",\"messageId\":\"%s\",\"message\":\"Seu pedido está sendo processado!\",\"referenceId\":\"%s\",\"orderRequestId\":\"%s\",\"orderStatus\":\"processing\",\"paymentStatus\":\"pending\",\"order\":{\"currency\":\"BRL\",\"discount\":10.00,\"tax\":10.00,\"shipping\":5.00,\"products\":[{\"productId\":\"custom-item-4N8FCTW23N7\",\"name\":\"Produto Customizado\",\"value\":150.00,\"quantity\":2,\"isCustomItem\":true},{\"productId\":\"23940797548900636\",\"name\":\"Produto do Catálogo\",\"value\":150.00,\"quantity\":2,\"isCustomItem\":false}]}}",
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
                printf("Status do pedido atualizado com sucesso\n");
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

| Attribute | Type | Description |
|----------|------|-----------|
| `zaapId` | string | Message ID in Z-API |
| `messageId` | string | WhatsApp message ID |
| `id` | string | Compatibility ID for Zapier (same value as `messageId`) |

**Example of response:**

```json
{
 "zaapId": "3999984263738042930CD6ECDE9VDWSA",
 "messageId": "D241XXXX732339502B68",
 "id": "D241XXXX732339502B68"
}
```

### Error Codes

| Code | Description |
|------|-----------|
| `405` | Incorrect HTTP method. Check if you are using `POST` |
| `415` | Missing Content-Type. Add `Content-Type: application/json` to header |

---

## <Icon name="Webhook" size="md" /> Related Webhook {#webhook}

When the order status is updated, the webhook [On receiving message](/docs/webhooks/ao-receber) will be triggered with information about the update.

For more details, see the webhook documentation [On receiving message](/docs/webhooks/ao-receber#example-of-order-status-update).

---

## <Icon name="Lightbulb" size="md" /> Tips {#dicas}

:::tip Store Webhook Data

Always store the data returned in the webhook when an order is sent:
- `messageId`: To reference the original order
- `referenceId`: Required for updates
- `orderRequestId`: Required for updates
- `paymentStatus`: Current payment status
- `productId` and `isCustomItem`: For each product in the order

:::

- **Complete data**: Send all original order data, including products, values and settings
- **Custom products**: Products with `isCustomItem: true` have IDs with prefix `custom-item-`
- **Payment status**: Use the `paymentStatus` returned in webhook, do not change this value here
- **Custom message**: Use the field `message` to personalize the notification to the customer

---

## <Icon name="Rocket" size="md" /> Next Steps

- [Update Payment for Order](/docs/messages/atualizacao-pagamento-pedido) - Update the payment status
- [Send Order](/docs/messages/aprovacao-pedido) - Learn how to send orders
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks to receive notifications