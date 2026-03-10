---
id: alterar-descricao
title: Change Description
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FileText" size="lg" /> Change Description

Change the description of an existing community.

---

## <Icon name="Info" size="md" /> Conception {#conceituation}

This method allows you to change the community's description. The description appears in the community profile and helps participants understand the purpose of the community.

:::caution Caution
Caution: Only administrators can change the community preferences.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/update-community-description
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#attributes}

### Required

| Attribute | Type | Description |
|-----------|------|------------|
| `phone` | string | Community ID/Fone (obtained by listing or creating communities) |
| `communityDescription` | string | New community description |

---

## <Icon name="Code" size="md" /> Examples {#examples}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-community-description
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "120363019502650977",
  "communityDescription": "Nova descrição da comunidade"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-community-description',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '120363019502650977',
      communityDescription: 'Nova descrição da comunidade',
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Descrição da comunidade atualizada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-community-description"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "120363019502650977",
    "communityDescription": "Nova descrição da comunidade"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Descrição da comunidade atualizada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-community-description" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "120363019502650977",
    "communityDescription": "Nova descrição da comunidade"
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
|-------|------|------------|
| `value` | boolean | `true` if successful and `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#errors}

| Code | Reason | How to Solve |
|------|--------|--------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `403` | No permission | Only administrators can change the community description |

---

## <Icon name="Info" size="md" /> Notes {#notes}

- **Permissions**: Only community administrators can change the description
- **Community ID**: Use the ID obtained by listing or creating communities
- **Description**: The description appears in the community profile and helps participants understand the purpose

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#related-resources}

- [Community Metadata](/docs/communities/metadata) - View the current community description
- [Create Community](/docs/communities/criar) - Create a new community
- [Community Settings](/docs/communities/configuracoes) - Change other settings