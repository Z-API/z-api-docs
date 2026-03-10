---
id: remover-produtos-colecao
sidebar_position: 8
title: Remove Products from Collection
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="PackageMinus" size="lg" /> Remove Products from Collection

Remove products from an existing collection in your WhatsApp Business catalog.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to remove products from an existing collection. You can remove multiple products at once, specifying their IDs.

:::warning Attention
When adding or removing products from a **collection**, the ID of the same is changed by WhatsApp. This means that if you try to perform any other operation using the **ID** "old", it will not work. Remember then to use the ID returned by this same route, which is already the updated ID for subsequent operations.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection/remove-product
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|------------|
| `collectionId` | string | ID of the collection from which products will be removed |
| `productIds` | array[string] | Array with the IDs of the products that will be removed from the collection. Ex: `["6643149779134830", "6988917394481455"]` |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/remove-product
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "collectionId": "658387616418640",
  "productIds": ["6643149779134830", "6988917394481455"]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/remove-product',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      collectionId: '658387616418640',
      productIds: ['6643149779134830', '6988917394481455'],
    }),
  }
);

const data = await response.json();
console.log(data);

// IMPORTANTE: Use o collectionId retornado para próximas operações
if (data.success) {
  console.log('Novo ID da coleção:', data.collectionId);
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/remove-product"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "collectionId": "658387616418640",
    "productIds": ["6643149779134830", "6988917394481455"]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(data)

# IMPORTANTE: Use o collectionId retornado para próximas operações
if data.get('success'):
    print(f"Novo ID da coleção: {data['collectionId']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/remove-product" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "collectionId": "658387616418640",
    "productIds": ["6643149779134830", "6988917394481455"]
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "success": true,
  "collectionId": "1798362193933497"
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `success` | boolean | `true` if the operation was successful, `false` in case of failure |
| `collectionId` | string | **Updated ID of the collection**. Use this ID for all future operations with this collection |

:::important Important
The `collectionId` returned is the **new ID** of the collection after removing products. Always use this updated ID for subsequent operations, as the old ID will not work anymore.
:::

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|--------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `collectionId` and `productIds` are correct |
| `404` | Collection not found | Check if the `collectionId` exists |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Collection ID changes**: The collection ID is changed after removing products. Always use the ID returned in the response
- **Multiple products**: You can remove multiple products at once, passing an array of IDs
- **Non-existent products**: If a product does not exist in the collection, the operation will still be successful

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [List Products from Collection](/docs/whatsapp-business/listar-produtos-colecao) - View products in a collection
- [Add Products to Collection](/docs/whatsapp-business/adicionar-produtos-colecao) - Add products to a collection
- [Edit Collection](/docs/whatsapp-business/editar-colecao) - Update information of a collection
- [Delete Collection](/docs/whatsapp-business/deletar-colecao) - Remove a collection from the catalog