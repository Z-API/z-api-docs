---
id: criar-produto
sidebar_position: 1
title: Create/Edit Product
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Package" size="lg" /> Create/Editar Product

Register and update products in your catalog through the Z-API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

In this method, you will be able to register and update a product in your catalog. The same endpoint is used for both creating a new product and updating an existing product.

**Operation**:
- If the `retailerId` does not exist, a new product will be created
- If the `retailerId` already exists, the product will be updated with the new data

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/products
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json`

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|------------|
| `currency` | string | Currency type (ex: `BRL`, `USD`, `EUR`) |
| `description` | string | Product description |
| `images` | array (string) | Array with URLs of product images |
| `isHidden` | boolean | Attribute to "hide" the product in the catalog (`true` for hide, `false` for show) |
| `name` | string | Product name |
| `price` | integer | Product price (in cents or lower unit of the currency) |
| `salePrice` | integer | Promotional price (in cents or lower unit of the currency) |
| `retailerId` | string | Unique product ID (used to identify and update the product) |
| `url` | string | URL of Z-API route or product link |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Create new product**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "currency": "BRL",
  "description": "Uma descrição do produto",
  "images": ["https://avatars.githubusercontent.com/u/60630101?s=200&v=4"],
  "isHidden": false,
  "name": "Meu primeiro produto",
  "price": 2000,
  "salePrice": 1800,
  "retailerId": "002",
  "url": "https://z-api.io"
}
```

**Update existing product** (using the same `retailerId`):

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "currency": "BRL",
  "description": "Descrição atualizada do produto",
  "images": ["https://novo-link-da-imagem.com/produto.jpg"],
  "isHidden": false,
  "name": "Produto atualizado",
  "price": 2500,
  "salePrice": 2200,
  "retailerId": "002",
  "url": "https://z-api.io/produto/002"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Criar ou atualizar produto
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      currency: 'BRL',
      description: 'Uma descrição do produto',
      images: ['https://avatars.githubusercontent.com/u/60630101?s=200&v=4'],
      isHidden: false,
      name: 'Meu primeiro produto',
      price: 2000, // R$ 20,00 (em centavos)
      salePrice: 1800, // R$ 18,00 (em centavos)
      retailerId: '002', // ID único do produto
      url: 'https://z-api.io',
    }),
  }
);

const data = await response.json();
console.log('Produto criado/atualizado:', data);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Criar ou atualizar produto
payload = {
    "currency": "BRL",
    "description": "Uma descrição do produto",
    "images": ["https://avatars.githubusercontent.com/u/60630101?s=200&v=4"],
    "isHidden": False,
    "name": "Meu primeiro produto",
    "price": 2000,  # R$ 20,00 (em centavos)
    "salePrice": 1800,  # R$ 18,00 (em centavos)
    "retailerId": "002",  # ID único do produto
    "url": "https://z-api.io"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

print('Produto criado/atualizado:', data)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/products" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "currency": "BRL",
    "description": "Uma descrição do produto",
    "images": ["https://avatars.githubusercontent.com/u/60630101?s=200&v=4"],
    "isHidden": false,
    "name": "Meu primeiro produto",
    "price": 2000,
    "salePrice": 1800,
    "retailerId": "002",
    "url": "https://z-api.io"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "id": "4741575945866725"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|------------|
| `id` | string | Product ID in the WhatsApp catalog |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Ensure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Content-Type missing | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Verify that all required attributes were provided correctly |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Create or update**: The same endpoint is used for both creating and updating. If the `retailerId` does not exist, a new product will be created. If it exists, an existing product will be updated
- **Price in cents**: The values of `price` and `salePrice` should be in cents (or lower unit of the currency). Ex: R$ 20,00 = `2000`
- **Multiple images**: The field `images` accepts an array of URLs. You can send multiple product images
- **Hidden product**: Use `isHidden: true` to hide the product in the catalog without deleting it
- **retailerId unique**: The `retailerId` is the unique identifier of the product. Use the same `retailerId` to update an existing product

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Get Products](/docs/whatsapp-business/pegar-produtos) - List products in the catalog
- [Get Product by ID](/docs/whatsapp-business/pegar-produto-id) - Get details of a specific product
- [Delete Product](/docs/whatsapp-business/deletar-produto) - Remove a product from the catalog
- [Edit Product](/docs/whatsapp-business/editar-produto) - Additional documentation on editing