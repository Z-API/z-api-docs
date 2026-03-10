---
id: remover-admin
title: Remove Admin
sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserX" size="lg" /> Remove Admin

Remove um ou mais administradores de uma comunidade.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for removing one or more administrators from a community. The removed administrators will continue as participants in the community but will lose their admin permissions.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/remove-admin
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account Security Token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|------------|
| `phone` | string | ID/Fone of the community (obtained by listing or creating communities) |
| `phones` | array[string] | Array with the numbers of administrators to be removed (international format, no spaces) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/remove-admin
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "120363019502650977",
  "phones": ["5544999999999", "5544888888888"]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/remove-admin',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '120363019502650977',
      phones: ['5544999999999', '5544888888888'],
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Administradores removidos com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/remove-admin"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "120363019502650977",
    "phones": ["5544999999999", "5544888888888"]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Administradores removidos com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/remove-admin" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "120363019502650977",
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
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `phone` and `phones` were provided correctly |
| `403` | No permission | Only administrators can remove other administrators |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Phone Format**: Use international format without spaces (ex: `5544999999999`)
- **Permissions**: Only community administrators can remove other administrators
- **Multiple Administrators**: You can remove multiple administrators at once, sending an array with the numbers
- **Status After Removal**: The removed administrators will continue as participants in the community but will lose their admin permissions

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Promote Admin](/docs/communities/promover-admin) - Promote participants to administrators
- [Add Participants](/docs/communities/adicionar-participantes) - Add participants to the community
- [Remove Participants](/docs/communities/remover-participantes) - Remove participants from the community