---
id: vincular-grupos
title: Link Groups
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Link" size="lg" /> Link Groups

Add existing groups to a community.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

With this API, you can add other groups to a community. To do so, you will need the ID of your community and the phone numbers of the groups you wish to add.

:::warning Attention
It is important to remember that **the same group cannot be linked in more than one community**. If you provide 3 groups for addition where 1 already belongs to a community, 2 will be added and the other will return in the response indicating it is part of another community.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/communities/link
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
| `phone` | string | ID of the community to which groups will be added |
| `groupsPhones` | array[string] | Array with the numbers of the groups to be linked (format: `{id}-group`) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/link
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "98372465382764532938",
  "groupsPhones": ["1345353454354354-group", "1203634230225498-group"]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/link',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '98372465382764532938',
      groupsPhones: ['1345353454354354-group', '1203634230225498-group'],
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Grupos vinculados com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/link"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "98372465382764532938",
    "groupsPhones": ["1345353454354354-group", "1203634230225498-group"]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Grupos vinculados com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/link" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "98372465382764532938",
    "groupsPhones": ["1345353454354354-group", "1203634230225498-group"]
  }'
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

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `success` | boolean | `true` if successful and `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `phone` and `groupsPhones` were provided correctly |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Phone format**: Use the format `{id}-group` for group phone numbers (ex: `1345353454354354-group`)
- **Linked groups**: If a group is already linked to another community, it will not be linked and the API will return success only for the groups that could be linked
- **Group limit**: A community can have up to 50 linked groups
- **Permissions**: Only community administrators can link groups

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Unlink Groups](/docs/communities/desvincular-grupos) - Remove groups from the community
- [Community Metadata](/docs/communities/metadata) - View linked groups to the community
- [Create Community](/docs/communities/criar) - Create a new community