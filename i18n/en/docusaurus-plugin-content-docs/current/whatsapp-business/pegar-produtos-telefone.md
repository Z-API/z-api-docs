---
id: pegar-produtos-telefone
sidebar_position: 4
title: Order Products by Phone
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Phone" size="lg" /> Get Products by Phone

Get products from a WhatsApp Business catalog of any number, whether your own catalog or another Business number.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituation}

This method allows you to get products from a WhatsApp Business catalog of any number. You can query both your own catalog and catalogs of other Business numbers, provided the number has a publicly configured catalog.

**Use cases**:
- Consult partner or supplier catalogs
- Verify competitor catalogs
- Integrate multiple catalogs

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/catalogs/{phoneNumber}
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Your instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `phoneNumber` | string | International phone number format (no spaces or special characters) | `5511999999999` |

### Query Parameters (Optional)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `nextCursor` | string | Token used for pagination of records | `eyJpZCI6IjEyMzQ1NiJ9` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#examples}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/5511999999999
Client-Token: seu-token-de-seguranca
```

**With pagination**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/5511999999999?nextCursor=eyJpZCI6IjEyMzQ1NiJ9
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const phoneNumber = '5511999999999';
const nextCursor = null; // Opcional: token de paginação

let url = `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/${phoneNumber}`;
if (nextCursor) {
  url += `?nextCursor=${nextCursor}`;
}

const response = await fetch(url, {
  method: 'GET',
  headers: {
    'Client-Token': 'seu-token-de-seguranca',
  },
});

const data = await response.json();
console.log(data);

// Se houver mais resultados, use o nextCursor retornado
if (data.nextCursor) {
  // Fazer nova requisição com nextCursor
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

phone_number = '5511999999999'
next_cursor = None  # Opcional: token de paginação

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/{phone_number}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

params = {}
if next_cursor:
    params['nextCursor'] = next_cursor

response = requests.get(url, headers=headers, params=params)
data = response.json()
print(data)

# Se houver mais resultados, use o nextCursor retornado
if data.get('nextCursor'):
    # Fazer nova requisição com nextCursor
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/5511999999999" \
  -H "Client-Token: seu-token-de-seguranca"
```

**With pagination**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/5511999999999?nextCursor=eyJpZCI6IjEyMzQ1NiJ9" \
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
  "nextCursor": "eyJpZCI6IjEyMzQ1NiJ9",
  "products": [
    {
      "availability": "in stock",
      "id": "99999999999999999",
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
|-------|------|-------------|
| `cartEnabled` | boolean | Indicates if shopping cart is active in the consulted catalog |
| `nextCursor` | string \| null | Pagination token. If present, there are more results available. Use this token in the next request to get more products |
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

### Pagination

When there are many products in the catalog, the response may come paginated. To get more products:

1. Check if the `nextCursor` field is present in the response
2. Make a new request including the `nextCursor` as query parameter
3. Repeat until `nextCursor` is `null` or not present

**Example of pagination loop**:

```javascript
let allProducts = [];
let nextCursor = null;

do {
  let url = `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/5511999999999`;
  if (nextCursor) {
    url += `?nextCursor=${nextCursor}`;
  }

  const response = await fetch(url, {
    headers: { 'Client-Token': 'seu-token-de-seguranca' }
  });
  
  const data = await response.json();
  allProducts = allProducts.concat(data.products);
  nextCursor = data.nextCursor;
} while (nextCursor);
```

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#errors}

| Code | Reason | How to resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Ensure you are using `GET` as specified |
| `415` | Missing Content-Type | Add `Content-Type: application/json` in the header |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Catalog not found | Verify if the number has a configured Business catalog and it is accessible |
| `400` | Invalid number | Check if the number is in the correct format (DDI + DDD + NUMBER, no spaces) |

---

## <Icon name="Info" size="md" /> Notes {#notes}

- **WhatsApp Business**: The queried number must have a configured Business catalog
- **Number format**: Use international format without spaces or special characters (ex: `5511999999999`)
- **Public catalogs**: You can query catalogs of any Business number, not just your own
- **Pagination**: Use the `nextCursor` field to get all products when there are many results
- **Prices in cents**: The values of `price` and `salePrice` are returned in cents
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#related-resources}

- [Get Products](/docs/whatsapp-business/pegar-produtos) - List products from your own catalog
- [Get Product by ID](/docs/whatsapp-business/pegar-produto-id) - Get a specific product
- [Create/Editar Product](/docs/whatsapp-business/editar-produto) - Create or update products