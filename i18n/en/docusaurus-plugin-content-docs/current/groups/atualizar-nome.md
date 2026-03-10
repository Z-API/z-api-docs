---
id: atualizar-nome
sidebar_position: 3
title: Update Group Name
---
id: update-group-name
title: Update Group Name
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Edit" size="lg" /> Update Group Name

Change the name of an existing group through the Z-API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceptualization}

This method is responsible for changing the name of an existing group. The group name is visible to all participants.

:::caution Attention

On November 4th, 2021 WhatsApp changed the format of new group creation:

- **Before**: `"phone": "5511999999999-1623281429"`
- **Now**: `"phone": "120363019502650977-group"`

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-name
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Must be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#attributes}

### Required

| Attribute | Type | Description |
|----------|------|-------------|
| `groupId` | string | Group ID/Fone (old format: `5511999999999-1623281429` or new format: `120363019502650977-group`) |
| `groupName` | string | Name of the group to be updated |

---

## <Icon name="Code" size="md" /> Examples {#examples}

<Tabs>
<TabItem value="http" label="HTTP">

**New format**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-name
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
 "groupId": "120363019502650977-group",
  "groupName": "Mudou o nome Meu grupo no Z-API"
}
```

**Old format**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-name
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "groupId": "5511999999999-1623281429",
  "groupName": "Mudou o nome Meu grupo no Z-API"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-name',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      groupId: '120363019502650977-group', // ou formato antigo: '5511999999999-1623281429'
      groupName: 'Mudou o nome Meu grupo no Z-API',
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Nome do grupo atualizado com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-name"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "groupId": "120363019502650977-group",  # ou formato antigo: "5511999999999-1623281429"
    "groupName": "Mudou o nome Meu grupo no Z-API"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Nome do grupo atualizado com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**New format**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-name" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
  "groupId": "120363019502650977-group",
    "groupName": "Mudou o nome Meu grupo no Z-API"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
 "value": true
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `value` | boolean | `true` if successful and `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#errors}

| Code | Reason | How to fix |
|------|--------|------------|
| `405` | Incorrect HTTP method | Make sure you're using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `groupId` and `groupName` were provided correctly |

---

## <Icon name="Info" size="md" /> Notes {#notes}

- **Group format**: Use the new format (`120363019502650977-group`) or old format (`5511999999999-1623281429`)
- **Permissions**: Only administrators can change the group name
- **Visibility**: The group name is visible to all participants
- **Character limit**: WhatsApp has a character limit for the group name

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#related-resources}

- [Update Group Photo](/docs/groups/atualizar-foto) - Change the group photo
- [Update Group Description](/docs/groups/atualizar-descricao) - Change the group description
- [Group Settings](/docs/groups/configuracoes) - Change group settings