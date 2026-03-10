---
id: atualizar-descricao
sidebar_position: 4
title: Update Group Description
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FileText" size="lg" /> Update Group Description

Change the description of a group through the Z-API.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method allows you to change the group's description. The description is visible to all group participants.

:::caution Attention

Only administrators can change group preferences.

:::

:::caution Attention

On November 4, 2021, WhatsApp changed the format for creating new groups:

- **Before**: `"phone": "5511999999999-1623281429"`
- **Now**: `"phone": "120363019502650977-group"`

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/update-group-description
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Must be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|-------------|
| `groupId` | string | Group ID (old format: `5511999999999-1623281429` or new format: `120363019502650977-group`) |
| `groupDescription` | string | Attribute to change the group description |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**New format**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-description
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "groupId": "120363019502650977-group",
  "groupDescription": "descrição do grupo"
}
```

**Old format**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-description
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "groupId": "5511999999999-1623281429",
  "groupDescription": "descrição do grupo"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-description',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      groupId: '120363019502650977-group', // ou formato antigo: '5511999999999-1623281429'
      groupDescription: 'descrição do grupo',
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Descrição do grupo atualizada com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-description"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "groupId": "120363019502650977-group",  # ou formato antigo: "5511999999999-1623281429"
    "groupDescription": "descrição do grupo"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Descrição do grupo atualizada com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**New format**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-description" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "groupId": "120363019502650977-group",
    "groupDescription": "descrição do grupo"
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

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to fix |
|------|--------|------------|
| `405` | Incorrect HTTP method | Make sure you're using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `groupId` and `groupDescription` were provided correctly |
| `403` | No permission | Only administrators can change the group description |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Group format**: Use the new format (`120363019502650977-group`) or old format (`5511999999999-1623281429`)
- **Permissions**: Only administrators can change the group description
- **Visibility**: The group description is visible to all participants
- **Character limit**: WhatsApp has a character limit for the group description

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Update Group Name](/docs/groups/atualizar-nome) - Change the group name
- [Update Group Photo](/docs/groups/atualizar-foto) - Change the group photo
- [Group Settings](/docs/groups/configuracoes) - Change group settings