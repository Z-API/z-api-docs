---
id: anular-convite-admin
sidebar_position: 15
title: Cancel Admin Invitation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="XCircle" size="lg" /> Cancel Invite Admin

Revoke an admin invite sent to a user before it is accepted.

---

## <Icon name="Info" size="md" /> Concept {#concept}

This method is responsible for canceling an admin invite from a channel. Use this method when you sent an invite but changed your mind or sent it to the wrong user.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/newsletter/revoke-admin-invite/{newsletterId}
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Your instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `newsletterId` | string | Channel ID (must contain the suffix `@newsletter`) | `999999999999999999@newsletter` |

:::warning Attention
The channel ID always must contain the suffix `@newsletter`, as this is the standard used by WhatsApp itself.
:::

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#attributes}

### Required

| Attribute | Type | Description |
|----------|------|-------------|
| `phone` | string | User phone number for which the invite will be canceled (international format, no spaces) |

---

## <Icon name="Code" size="md" /> Examples {#examples}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/revoke-admin-invite/999999999999999999@newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const newsletterId = '999999999999999999@newsletter';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/revoke-admin-invite/${newsletterId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5511999999999',
    }),
  }
);

const data = await response.json();
console.log('Convite anulado com sucesso');
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

newsletter_id = '999999999999999999@newsletter'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/revoke-admin-invite/{newsletter_id}"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "5511999999999"
}

response = requests.post(url, headers=headers, json=payload)
print("Convite anulado com sucesso")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/revoke-admin-invite/999999999999999999@newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5511999999999"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 201 Created {#201-created}

The successful response does not return a body, only the status code `201`.

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#errors}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Content-Type missing | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `phone` was provided and that the number is in the correct format |
| `404` | Channel not found | Check if the channel ID is correct and contains the suffix `@newsletter` |

---

## <Icon name="Info" size="md" /> Notes {#notes}

- **Required Suffix**: The channel ID always must contain the suffix `@newsletter`
- **Phone Format**: Use international format without spaces or special characters (ex: `5511999999999`)
- **Pending Invites**: This method only works for invites that have not yet been accepted
- **Permissions**: Only owners and admins can cancel invites

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#related-resources}

- [Send Admin Invite](/docs/messages/convite-admin-canal) - Send invite to be admin
- [Accept Admin Invite](/docs/partners/newsletter/aceitar-convite-admin) - Accept admin invite
- [Promote Admin](/docs/partners/newsletter/promover-admin) - Promote user to admin directly
- [Remove Admin](/docs/partners/newsletter/remover-admin) - Remove admin from channel