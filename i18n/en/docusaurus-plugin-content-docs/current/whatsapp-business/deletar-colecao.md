---
id: deletar-colecao
sidebar_position: 20
title: Delete Collection
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FolderX" size="lg" /> Delete Collection

Remove a collection of products from your WhatsApp Business catalog.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to delete a collection from your catalog using the collection ID. When a collection is deleted, it is permanently removed from the catalog, but the products that were in the collection are not deleted.

:::warning Attention
The operation of deleting a collection is permanent and cannot be undone. Make sure you really want to remove the collection before performing this operation.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
DELETE https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection/{{id-da-coleção}}
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Your instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `collectionId` | string | ID of the collection to be deleted | `658387616418640` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
DELETE https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/658387616418640
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const collectionId = '658387616418640';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/${collectionId}`,
  {
    method: 'DELETE',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
console.log('Sucesso:', data.success);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

collection_id = '658387616418640'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/{collection_id}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.delete(url, headers=headers)
data = response.json()
print(f"Sucesso: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X DELETE "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection/658387616418640" \
  -H "Client-Token: seu-token-de-seguranca"
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

| Code | Reason | How to Resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Make sure you are using `DELETE` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Collection not found | Verify if the collection ID is correct and if the collection exists in the catalog |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Collection ID**: Use the ID returned when creating the collection or get it through the [List Collections API](/docs/whatsapp-business/listar-colecoes)
- **Permanent removal**: The collection will be permanently removed and cannot be recovered
- **Preserved products**: Products that were in the collection are not deleted, only removed from the collection

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Create Collection](/docs/whatsapp-business/criar-colecao) - Create a new collection
- [List Collections](/docs/whatsapp-business/listar-colecoes) - View all collections
- [Edit Collection](/docs/whatsapp-business/editar-colecao) - Update information of a collection
- [List Products in Collection](/docs/whatsapp-business/listar-produtos-colecao) - View products from a collection