---
id: listar-colecoes
sidebar_position: 5
title: List Collections
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FolderOpen" size="lg" /> List Collections

List all collections from your WhatsApp Business catalog through the Z-API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to list all collections created in your catalog. Collections are groups of products organized by category, type, or any criterion that you define. The response includes information about each collection, such as ID, name, and approval status.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection
```

### Query Parameters (Optional)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `nextCursor` | string | Token used for pagination of records | `AQHRi6eu3NyRTR30t5Sr2CtkURU7rMF_e2K7NPbELxJFAa-K_HI1I6v8_C3o2j6d4wve` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection
Client-Token: seu-token-de-seguranca
```

**With pagination**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection?nextCursor=AQHRi6eu3NyRTR30t5Sr2CtkURU7rMF_e2K7NPbELxJFAa-K_HI1I6v8_C3o2j6d4wve
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const nextCursor = null; // Opcional: token de paginação

let url = 'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection';
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

next_cursor = None  # Opcional: token de paginação

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection"
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
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection" \
  -H "Client-Token: seu-token-de-seguranca"
```

**With pagination**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/catalogs/collection?nextCursor=AQHRi6eu3NyRTR30t5Sr2CtkURU7rMF_e2K7NPbELxJFAa-K_HI1I6v8_C3o2j6d4wve" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "nextCursor": "AQHRi6eu3NyRTR30t5Sr2CtkURU7rMF_e2K7NPbELxJFAa-K_HI1I6v8_C3o2j6d4wve",
  "collections": [
    {
      "id": "1072603710847740",
      "name": "Nome da coleção",
      "status": "PENDING"
    },
    {
      "id": "902834786123343",
      "name": "Nome da coleção 2",
      "status": "APPROVED"
    }
  ]
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|-------------|
| `nextCursor` | string \| null | Pagination token. If present, there are more results available. Use this token in the next request to get more collections |
| `collections` | array | List of catalog collections |
| `collections[].id` | string | Unique collection ID |
| `collections[].name` | string | Collection name |
| `collections[].status` | string | Collection approval status. Possible values: `"PENDING"` (pending for approval), `"APPROVED"` (approved) |

---

### Collection Status

| Status | Description |
|--------|-------------|
| `PENDING` | Collection is pending for approval by WhatsApp |
| `APPROVED` | Collection has been approved and is active in the catalog |

---

### Pagination

When there are many collections, the response may be paginated. To get all collections:

1. Check if the field `nextCursor` is present in the response
2. Make a new request including the `nextCursor` as query parameter
3. Repeat until `nextCursor` is `null` or not present

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|--------------|
| `405` | Incorrect HTTP method | Make sure you are using `GET` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Catalog not found | Check if the catalog exists and is configured |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Approval status**: Collections can be pending for approval (`PENDING`) or already approved (`APPROVED`)
- **Pagination**: Use the field `nextCursor` to get all collections when there are many results
- **Collection ID**: Use the returned ID to list products from a specific collection or to edit /deletar the collection

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Create Collection](/docs/whatsapp-business/criar-colecao) - Create a new collection
- [List Products from Collection](/docs/whatsapp-business/listar-produtos-colecao) - View products from a specific collection
- [Edit Collection](/docs/whatsapp-business/editar-colecao) - Update information of a collection
- [Delete Collection](/docs/whatsapp-business/deletar-colecao) - Remove a collection from the catalog