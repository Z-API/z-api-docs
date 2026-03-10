---
id: desvincular-grupos
title: Unlink Groups
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Unlink" size="lg" /> Unlink Groups

Remove groups from a community.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

With this API, you can remove groups from a community. To do so, you will need the ID of your community and the phone numbers of the groups you wish to remove.

:::warning Attention
A community must have at least 1 group linked to it, not counting the warning group. Therefore, if your community only has one common group linked, **it cannot be removed**.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/communities/unlink
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
| `communityId` | string | ID of the community that will have its groups unlinked |
| `groupsPhones` | array[string] | Array with the numbers of the groups to be unlinked (format: `{id}-group`) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/unlink
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "communityId": "98372465382764532938",
  "groupsPhones": ["1345353454354354-group"]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/unlink',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      communityId: '98372465382764532938',
      groupsPhones: ['1345353454354354-group'],
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Grupos desvinculados com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/unlink"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "communityId": "98372465382764532938",
    "groupsPhones": ["1345353454354354-group"]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Grupos desvinculados com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/unlink" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "communityId": "98372465382764532938",
    "groupsPhones": ["1345353454354354-group"]
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
| `success` | boolean | `true` if it was successful and `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data or attempt to remove the last group | Verify that `communityId` and `groupsPhones` were provided correctly. Remember: a community must have at least 1 common group linked |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Phone format**: Use the format `{id}-group` for group phone numbers (ex: `1345353454354354-group`)
- **Minimum number of groups**: A community must have at least 1 common group linked (excluding the warning group)
- **Warning group**: The warning group cannot be unlinked from the community
- **Permissions**: Only community administrators can unlink groups
- **Independent groups**: After unlinking, the groups continue to exist as independent groups

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Link Groups](/docs/communities/vincular-grupos) - Add groups to the community
- [Community Metadata](/docs/communities/metadata) - View linked groups in the community
- [Create Community](/docs/communities/criar) - Create a new community