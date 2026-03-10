---
id: metadata
title: Community Metadata
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Info" size="lg" /> Community Metadata

Get detailed information about a community, including name, description and linked groups.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method returns the metadata of the community, such as name, description and the groups that are linked to it. Use this API to get complete information about a specific community, including all linked groups and their types (common group or alert group).

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/communities-metadata/{idDaComunidade}
```

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|------------|
| `idDaComunidade` | string | Yes | Community ID (obtained by listing communities or creating a new one) |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities-metadata/98372465382764532938
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const communityId = '98372465382764532938';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities-metadata/${communityId}`,
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const metadata = await response.json();
console.log('Nome da comunidade:', metadata.name);
console.log('Descrição:', metadata.description);
console.log('Grupos vinculados:', metadata.subGroups);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

community_id = "98372465382764532938"
url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities-metadata/{community_id}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.get(url, headers=headers)
metadata = response.json()

print(f"Nome: {metadata.get('name')}")
print(f"Descrição: {metadata.get('description')}")
print(f"Grupos vinculados: {len(metadata.get('subGroups', []))}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities-metadata/98372465382764532938" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "name": "Minha primeira Comunidade",
  "id": "98372465382764532938",
  "description": "Uma descrição da comunidade",
  "subGroups": [
    {
      "name": "Minha primeira Comunidade",
      "phone": "342532456234453-group",
      "isGroupAnnouncement": true
    },
    {
      "name": "Outro grupo",
      "phone": "1203634230225498-group",
      "isGroupAnnouncement": false
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|------------|
| `name` | string | Community name |
| `id` | string | Community ID |
| `description` | string | Community description |
| `subGroups` | array[object] | List of linked groups to the community |

### Object `subGroups`

| Field | Type | Description |
|-------|------|------------|
| `name` | string | Subgroup name |
| `phone` | string | Subgroup phone (use for sending messages) |
| `isGroupAnnouncement` | boolean | `true` if it is an alert group, `false` if it is a common group |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Make sure you are using `GET` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Community not found | Check if the `idDaComunidade` is correct |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Alert Group**: The group with `isGroupAnnouncement: true` is the default group created automatically with the community. Only administrators can send messages in this group
- **Common Groups**: Groups with `isGroupAnnouncement: false` are normal groups linked to the community
- **Group Phone**: Use the field `phone` of the group for sending messages using the messaging APIs
- **Community ID**: The `id` returned is the same used for other operations in the community

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [List Communities](/docs/communities/listar) - List all communities
- [Create Community](/docs/communities/criar) - Create a new community
- [Link Groups](/docs/communities/vincular-grupos) - Add groups to the community
- [Unlink Groups](/docs/communities/desvincular-grupos) - Remove groups from the community