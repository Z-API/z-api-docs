---
id: deletar-produto
title: Delete Product
sidebar_position: 19
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Trash2" size="lg" /> Delete Product

Remove a product from your WhatsApp Business catalog.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method allows you to delete a product from your catalog using the product ID. When a product is deleted, it is permanently removed from the catalog and cannot be recovered.

:::warning Attention
Deleting a product is a permanent operation and cannot be undone. Make sure you really want to remove the product before executing this operation.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
DELETE https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/products/{{product-id}}
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Your instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `productId` | string | ID of the product to be deleted | `99999999999999` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
DELETE https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/products/99999999999999
Client-Token: your-security-token
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const productId = '99999999999999';

const response = await fetch(
  `https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/products/${productId}`,
  {
    method: 'DELETE',
    headers: {
      'Client-Token': 'your-security-token',
    },
  }
);

const data = await response.json();
console.log('Success:', data.success);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

product_id = '99999999999999'

url = f"https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/products/{product_id}"
headers = {
    "Client-Token": "your-security-token"
}

response = requests.delete(url, headers=headers)
data = response.json()
print(f"Success: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X DELETE "https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/products/99999999999999" \
  -H "Client-Token: your-security-token"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "success": true
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` if the operation was successful, `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to resolve |
|------|--------|----------------|
| `405` | Incorrect HTTP method | Make sure you are using `DELETE` as specified |
| `401` | Invalid token | Check the `Client-Token` header |
| `404` | Product not found | Check if the product ID is correct and if the product exists in the catalog |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Product ID**: Use the ID returned when creating or editing the product, or get it via the [Get Products API](/docs/whatsapp-business/pegar-produtos)
- **Permanent removal**: The product will be permanently removed and cannot be recovered
- **Products in collections**: If the product is in a collection, it will also be removed from that collection

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Create/Edit Product](/docs/whatsapp-business/editar-produto) - Create or update products
- [Get Products](/docs/whatsapp-business/pegar-produtos) - List all products
- [Get Product by ID](/docs/whatsapp-business/pegar-produto-id) - Get a specific product