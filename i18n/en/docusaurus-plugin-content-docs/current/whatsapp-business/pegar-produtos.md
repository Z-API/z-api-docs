---
id: pegar-produtos
sidebar_position: 2
title: Get Products
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Package" size="lg" /> Get Products

Obtain all products from your WhatsApp Business catalog through the Z-API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to list all products registered in your WhatsApp Business catalog. You will receive complete information about each product, including price, description, images, and availability.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
console.log(data);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "cartEnabled": true,
  "products": [
    {
      "availability": "in stock",
      "id": "999999999999999",
      "retailerId": null,
      "description": "Descrição do mouse",
      "price": "100000",
      "salePrice": "90000",
      "currency": "BRL",
      "name": "Mouse",
      "quantity": null,
      "images": ["https://exemplo.com/imagem.jpg"]
    }
  ]
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `cartEnabled` | boolean | Indicates if the shopping cart is active in the catalog |
| `products` | array | List of products from the catalog |
| `products[].availability` | string | Product availability (`"in stock"`, `"out of stock"`, etc.) |
| `products[].id` | string | Unique product ID |
| `products[].retailerId` | string \| null | Retailer ID (can be null) |
| `products[].description` | string | Product description |
| `products[].price` | string | Product price (in cents) |
| `products[].salePrice` | string | Promotional price (in cents) |
| `products[].currency` | string | Product currency (ex: `"BRL"`) |
| `products[].name` | string | Product name |
| `products[].quantity` | number \| null | Available quantity (can be null) |
| `products[].images` | array | Array of product image URLs |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|--------------|
| `405` | Incorrect HTTP method | Ensure you are using `GET` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Catalog not found | Verify if the catalog exists and is configured |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Prices in cents**: The values of `price` and `salePrice` are returned in cents (ex: `"100000"` = R$ 1.000,00)
- **Images**: Images should be hosted on publicly accessible URLs
- **Availability**: The `availability` field can have values like `"in stock"`, `"out of stock"`, etc.

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Create/Editar Product](/docs/whatsapp-business/editar-produto) - Create or update a product
- [Get Product by ID](/docs/whatsapp-business/pegar-produto-id) - Get a specific product
- [Get Products by Phone](/docs/whatsapp-business/pegar-produtos-telefone) - Get products from another number
- [Delete Product](/docs/whatsapp-business/deletar-produto) - Remove a product from the catalog