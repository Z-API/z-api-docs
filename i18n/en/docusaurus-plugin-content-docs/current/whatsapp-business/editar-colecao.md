---
id: editar-colecao
sidebar_position: 21
title: Edit Collection
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FolderEdit" size="lg" /> Edit Collection

Update the name of an existing collection in your WhatsApp Business catalog.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to edit an existing collection by changing its name. Useful for updating the organization of your collections as your needs change.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection-edit/{{id-da-coleção}}
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Your instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `collectionId` | string | ID of the collection to be edited | `658387616418640` |

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
| `name` | string | New name of the collection |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-edit/658387616418640
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "name": "Novo nome da coleção"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const collectionId = '658387616418640';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-edit/${collectionId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      name: 'Novo nome da coleção',
    }),
  }
);

const data = await response.json();
console.log('Sucesso:', data.success);
console.log('ID da coleção:', data.collectionId);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

collection_id = '658387616418640'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-edit/{collection_id}"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "name": "Novo nome da coleção"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['success']}")
print(f"ID da coleção: {data['collectionId']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection-edit/658387616418640" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "name": "Novo nome da coleção"
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
  "collectionId": "228078660281007"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|------------|
| `success` | boolean | `true` if the operation was successful, `false` in case of failure |
| `collectionId` | string | Collection ID (can be the same or a new one, depending on implementation) |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if the `name` was provided |
| `404` | Collection not found | Check if the `collectionId` exists |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Collection ID**: Use the ID returned when creating the collection or get it through the [List Collections API](/docs/whatsapp-business/listar-colecoes)
- **Only Name**: This method allows you to change only the name of the collection. To add or remove products, use specific APIs

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Create Collection](/docs/whatsapp-business/criar-colecao) - Create a new collection
- [List Collections](/docs/whatsapp-business/listar-colecoes) - View all collections
- [Add Products to Collection](/docs/whatsapp-business/adicionar-produtos-colecao) - Add products to a collection
- [Remove Products from Collection](/docs/whatsapp-business/remover-produtos-colecao) - Remove products from a collection
- [Delete Collection](/docs/whatsapp-business/deletar-colecao) - Remove a collection from the catalog