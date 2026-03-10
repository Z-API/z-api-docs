---
id: pegar-produto-id
sidebar_position: 3
title: Get Product by ID
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="PackageSearch" size="lg" /> Get Product by ID

Obtain detailed information of a specific product from your catalog using the product ID.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituation}

This method allows you to obtain complete information about a specific product from your catalog, using the unique product ID. Useful when you already know the ID and just need the details of that specific product.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/products/{{Id-do-produto}}
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Your instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `productId` | string | Product ID to be queried | `99999999999999` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products/99999999999999
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const productId = '99999999999999';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products/${productId}`,
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

product_id = '99999999999999'
url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products/{product_id}"
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
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products/99999999999999" \
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
  "catalogId": "99999999999999999",
  "product": {
    "availability": "in stock",
    "id": "99999999999999",
    "retailerId": null,
    "description": "Descrição do mouse",
    "price": "20000",
    "salePrice": "90000",
    "currency": "BRL",
    "name": "Meu primeiro produto",
    "images": ["https://exemplo.com/imagem.jpg"]
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `cartEnabled` | boolean | Indicates if the shopping cart is active in the catalog |
| `catalogId` | string | ID of the catalog to which the product belongs |
| `product` | object | Object with product information |
| `product.availability` | string | Product availability (`"in stock"`, `"out of stock"`, etc.) |
| `product.id` | string | Unique product ID |
| `product.retailerId` | string \| null | Retailer ID (can be null) |
| `product.description` | string | Product description |
| `product.price` | string | Product price (in cents) |
| `product.salePrice` | string | Promotional price (in cents) |
| `product.currency` | string | Product currency (ex: `"BRL"`) |
| `product.name` | string | Product name |
| `product.images` | array | Array of product image URLs |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Ensure you are using `GET` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Product not found | Verify if the product ID is correct and if the product exists in the catalog |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Product ID**: The product ID is returned when you create or edit a product
- **Prices in cents**: Values of `price` and `salePrice` are returned in cents (ex: `"20000"` = R$ 200,00)
- **Images**: Images should be hosted on publicly accessible URLs

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Get Products](/docs/whatsapp-business/pegar-produtos) - List all products in the catalog
- [Create/Editar Product](/docs/whatsapp-business/editar-produto) - Create or update products
- [Get Products by Phone](/docs/whatsapp-business/pegar-produtos-phone) - Get products from another number
- [Delete Product](/docs/whatsapp-business/deletar-produto) - Remove a product from the catalog