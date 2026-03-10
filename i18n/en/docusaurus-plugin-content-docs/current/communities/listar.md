---
id: listar
title: List Communities
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="List" size="lg" /> List Communities

List all communities you are part of.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for returning all the communities you are part of. Use this API to get a list of all your communities, including basic information such as name and ID.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page of communities you want to search (used for pagination) |
| `pageSize` | integer | No | Number of communities returned per page |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**List all communities**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities
Client-Token: seu-token-de-seguranca
```

**With pagination**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities?page=1&pageSize=10
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Listar todas as comunidades
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const communities = await response.json();
console.log('Comunidades:', communities);

// Com paginação
const responsePaginated = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities?page=1&pageSize=10',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

# Listar todas as comunidades
response = requests.get(url, headers=headers)
communities = response.json()
print(f"Comunidades encontradas: {len(communities)}")

# Com paginação
params = {
    "page": 1,
    "pageSize": 10
}
response = requests.get(url, headers=headers, params=params)
communities = response.json()
```

</TabItem>
<TabItem value="curl" label="cURL">

**List all communities**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities" \
  -H "Client-Token: seu-token-de-seguranca"
```

**With pagination**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities?page=1&pageSize=10" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
[
  {
    "name": "Minha primeira Comunidade",
    "id": "98372465382764532938"
  },
  {
    "name": "Outra Comunidade",
    "id": "120363019502650977"
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Community name |
| `id` | string | Community ID (use this ID for other operations) |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|--------------|
| `405` | Incorrect HTTP method | Make sure you are using `GET` as specified |
| `401` | Invalid token | Check the header `Client-Token`

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Pagination**: Use the parameters `page` and `pageSize` for pagination when there are many communities
- **Community ID**: The `id` returned can be used in other community APIs (metadata, settings, etc.)
- **Empty list**: If you are not part of any communities, the array returned will be empty

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Create Community](/docs/communities/criar) - Create a new community
- [Community Metadata](/docs/communities/metadata) - Get detailed information about a community
- [Community Settings](/docs/communities/configuracoes) - Change community settings