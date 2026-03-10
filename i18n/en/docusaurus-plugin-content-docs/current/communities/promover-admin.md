---
id: promover-admin
title: Promote Admin
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserCog" size="lg" /> Promote Admin

Promote community members to administrators.

---

## <Icon name="Info" size="md" /> Conception {#conceituacao}

This method is responsible for promoting community members to administrators. You can promote one or more participants at once.

Administrators have special permissions, such as:
- Manage community settings
- Add and remove groups
- Add and remove members
- Promote and remove other administrators

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/add-admin
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
| `phone` | string | Community ID/Fone (obtained by listing or creating communities) |
| `phones` | array[string] | Array with the numbers of participants to be promoted (international format, no spaces) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-admin
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "120363186053925765",
  "phones": ["5544999999999", "5544888888888"]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-admin',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '120363186053925765',
      phones: ['5544999999999', '5544888888888'],
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Participantes promovidos a administradores!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-admin"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "120363186053925765",
    "phones": ["5544999999999", "5544888888888"]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Participantes promovidos a administradores!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-admin" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "120363186053925765",
    "phones": ["5544999999999", "5544888888888"]
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

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `value` | boolean | `true` if successful and `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Content-Type missing | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `phone` and `phones` were provided correctly |
| `403` | No permission | Only administrators can promote other administrators |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Phone format**: Use international format without spaces (ex: `5544999999999`)
- **Permissions**: Only community administrators can promote other administrators
- **Multiple participants**: You can promote multiple participants at once, sending an array with the numbers
- **Admin permissions**: Administrators have access to all community management functionalities

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Remove Admin](/docs/communities/remover-admin) - Remove administrators from the community
- [Add Participants](/docs/communities/adicionar-participantes) - Add participants to the community
- [List Communities](/docs/communities/listar) - Get the community ID