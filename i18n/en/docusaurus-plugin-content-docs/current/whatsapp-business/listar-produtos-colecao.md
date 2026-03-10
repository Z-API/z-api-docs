---
id: listar-produtos-colecao
sidebar_position: 6
title: List Products from Collection
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="PackageSearch" size="lg" /> Listar Produtos da Coleção

List all products that belong to a specific collection in your catalog.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

This method allows you to list all products that belong to a specific collection. Useful for viewing which products are grouped in a certain collection, verifying detailed information about each product, and managing the content of the collection.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/catalogs/collection-products/{phoneNumber}
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `phoneNumber` | string | Owner's phone number in international format (no spaces or special characters) | `5511999999999` |

### Query Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|---------|-------------|---------|
| `collectionId` | string | Yes | ID of the collection from which you want to list products | `1072603710847740` |
| `nextCursor` | string | No | Token used for pagination of records | `eyJpZCI6IjEyMzQ1NiJ9` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|---------|-------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-products/5511999999999?collectionId=1072603710847740
Client-Token: seu-token-de-seguranca
```

**With pagination**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-products/5511999999999?collectionId=1072603710847740&nextCursor=eyJpZCI6IjEyMzQ1NiJ9
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const phoneNumber = '5511999999999';
const collectionId = '1072603710847740';
const nextCursor = null; // Opcional: token de paginação

let url = `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-products/${phoneNumber}?collectionId=${collectionId}`;
if (nextCursor) {
  url += `&nextCursor=${nextCursor}`;
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
collection_id = '1072603710847740'
next_cursor = None  # Opcional: token de paginação

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-products/{phone_number}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

params = {
    'collectionId': collection_id
}
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
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-products/5511999999999?collectionId=1072603710847740" \
  -H "Client-Token: seu-token-de-seguranca"
```

**With pagination**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-products/5511999999999?collectionId=1072603710847740&nextCursor=eyJpZCI6IjEyMzQ1NiJ9" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "nextCursor": null,
  "products": [
    {
      "id": "6988917394481455",
      "name": "Nome do produto",
      "description": "Descrição do produto",
      "url": "http://site.com/produto",
      "price": "10000",
      "currency": "BRL",
      "isHidden": false,
      "availability": "in stock",
      "retailerId": "123",
      "images": [
        "https://cdn.greatsoftwares.com.br/arquivos/paginas/10603-92bb9420b363835d05d41b96a45d8f4e.png"
      ],
      "quantity": "99"
    }
  ]
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|-------------|
| `nextCursor` | string \| null | Pagination token. If present, there are more results available. Use this token in the next request to get more products |
| `products` | array | List of products from the collection |
| `products[].id` | string | Unique product ID |
| `products[].name` | string | Product name |
| `products[].description` | string | Product description |
| `products[].url` | string | Product URL (link to product page) |
| `products[].price` | string | Product price (in cents) |
| `products[].currency` | string | Currency of the product (e.g., `"BRL"`) |
| `products[].isHidden` | boolean | Indicates if the product is hidden in the collection |
| `products[].availability` | string | Product availability (`"in stock"`, `"out of stock"`, etc.) |
| `products[].retailerId` | string | Merchant ID |
| `products[].images` | array | Array of product image URLs |
| `products[].quantity` | string | Available quantity of the product |

---

### Pagination

When there are many products in the collection, the response may be paginated. To get all products:

1. Check if the field `nextCursor` is present in the response
2. Make a new request including the `nextCursor` as query parameter
3. Repeat until `nextCursor` is `null` or not present

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Ensure you are using `GET` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Collection not found | Verify if the `collectionId` is correct and if the collection exists |
| `400` | Invalid parameters | Verify if the `collectionId` was provided and if the number is in the correct format |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Collection ID**: Use the ID returned by the [List Collections](/docs/whatsapp-business/listar-colecoes) method to get `collectionId`
- **Phone number format**: Use international format without spaces or special characters (e.g., `5511999999999`)
- **Prices in cents**: Values of `price` are returned in cents (e.g., `"10000"` = R$ 100,00)
- **Hidden products**: The field `isHidden` indicates if the product is visible or hidden in the collection
- **Pagination**: Use the field `nextCursor` to get all products when there are many results

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [List Collections](/docs/whatsapp-business/listar-colecoes) - View all collections in the catalog
- [Create Collection](/docs/whatsapp-business/criar-colecao) - Create a new collection
- [Add Products to Collection](/docs/whatsapp-business/adicionar-produtos-colecao) - Add products to a collection
- [Remove Products from Collection](/docs/whatsapp-business/remover-produtos-colecao) - Remove products from a collection