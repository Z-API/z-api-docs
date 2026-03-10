---
id: remover-participantes
title: Removing Participants
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserMinus" size="lg" /> Removing Participants

Remove participants from a community.

---

## <Icon name="Info" size="md" /> Conception {#conceituacao}

This method is responsible for removing participants from the community. Removed participants will lose access to the community and linked groups.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/remove-participant
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
| `phones` | array[string] | Array with the numbers of participants to be removed (international format, no spaces) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/remove-participant
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "phones": ["5544999999999", "5544888888888"]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/remove-participant',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5511999999999',
      phones: ['5544999999999', '5544888888888'],
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Participantes removidos com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/remove-participant"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "5511999999999",
    "phones": ["5544999999999", "5544888888888"]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Participantes removidos com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/remove-participant" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5511999999999",
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

### Response Fields

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
| `403` | No permission | Only administrators can remove participants |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Phone format**: Use international format without spaces (ex: `5544999999999`)
- **Permissions**: Only community administrators can remove participants
- **Multiple participants**: You can remove multiple participants at once, sending an array with the numbers
- **Effect**: Removed participants will lose access to the community and linked groups

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Add Participants](/docs/communities/adicionar-participantes) - Add participants to the community
- [Promote Admin](/docs/communities/promover-admin) - Promote participants to administrators
- [Remove Admin](/docs/communities/remover-admin) - Remove administrators