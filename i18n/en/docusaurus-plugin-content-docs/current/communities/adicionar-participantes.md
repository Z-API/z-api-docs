---
id: adicionar-participantes
title: Add Participants
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserPlus" size="lg" /> Add Participants

Add new participants to a community.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceptualization}

This method is responsible for adding new participants to the community. The added participants will have access to the community and its linked groups.

:::tip New attribute
Recently, WhatsApp implemented a validation to check if the phone number connected to the API has the customer's contact saved. However, Z-API developed a solution to bypass this validation, introducing a new feature called **"autoInvite"**.

Now, when a request is sent to add 10 customers to a group and only 5 of them are successfully added, the API sends private invites to the five customers who were not added. These invites allow them to join the community even if their phone numbers are not saved as contacts.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/add-participant
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
|----------|------|------------|
| `autoInvite` | boolean | Sends community invite link in private to contacts that could not be added directly |
| `phone` | string | ID of the community (obtained by listing or creating communities) |
| `phones` | array[string] | Array with the numbers of participants to be added (international format, no spaces) |

---

## <Icon name="Code" size="md" /> Examples {#examples}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-participant
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "autoInvite": true,
  "phone": "120363019502650977",
  "phones": ["5544999999999", "5544888888888"]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-participant',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      autoInvite: true,
      phone: '120363019502650977',
      phones: ['5544999999999', '5544888888888'],
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Participantes adicionados com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-participant"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "autoInvite": True,
    "phone": "120363019502650977",
    "phones": ["5544999999999", "5544888888888"]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Participantes adicionados com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/add-participant" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "autoInvite": true,
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

### <Icon name="AlertCircle" size="sm" /> Error Codes {#errors}

| Code | Reason | How to solve |
|------|--------|--------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `phone`, `phones` and `autoInvite` were provided correctly |

---

## <Icon name="Info" size="md" /> Notes {#notes}

- **autoInvite**: When `true`, the API sends private invites automatically for contacts that could not be added directly (e.g., when the number is not saved as a contact)
- **Phone format**: Use international format without spaces (ex: `5544999999999`)
- **Permissions**: Only community administrators can add participants
- **Multiple participants**: You can add multiple participants at once, sending an array with the numbers

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#related-resources}

- [Remove Participants](/docs/communities/remover-participantes) - Remove participants from the community
- [Promote Admin](/docs/communities/promover-admin) - Promote participants to administrators
- [List Communities](/docs/communities/listar) - Get the ID of the community