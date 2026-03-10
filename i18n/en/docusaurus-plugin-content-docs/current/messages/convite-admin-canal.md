---
id: convite-admin-canal
sidebar_position: 34
title: Send Channel Admin Invite
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserPlus" size="lg" /> Send Channel Admin Invitation

Send messages inviting people to be administrators of your channels on WhatsApp through the Z-API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

In this method, you can send messages inviting people to be administrators of your channels on WhatsApp. The recipient will receive a special message with a button to accept or reject the invitation.

**Invitation Flow**:
1. You send the invitation through this API
2. The recipient receives an invitation message
3. The recipient can accept or reject the invitation
4. You will receive notifications via webhook about the response to the invitation

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/send-newsletter-admin-invite
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
| `phone` | string | Recipient's phone number in DDI DDD NUMBER format. **IMPORTANT**: Send only numbers, without formatting or mask. Ex: `551199999999` |
| `adminInviteMessage` | object | Object with the necessary data for sending the invitation message |

### adminInviteMessage (Object)

| Attribute | Type | Description |
|----------|------|------------|
| `newsletterId` | string | ID of the channel to which the invitation belongs. Ex: `999999999999999999@newsletter` |
| `caption` | string | Text of the invitation message |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-newsletter-admin-invite
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "adminInviteMessage": {
    "newsletterId": "120363166555745933@newsletter",
    "caption": "Quero convidar você para ser admin do meu canal no WhatsApp."
  }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-newsletter-admin-invite',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5511999999999',
      adminInviteMessage: {
        newsletterId: '120363166555745933@newsletter',
        caption: 'Quero convidar você para ser admin do meu canal no WhatsApp.',
      },
    }),
  }
);

const data = await response.json();
console.log('Convite enviado:', data);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-newsletter-admin-invite"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "5511999999999",
    "adminInviteMessage": {
        "newsletterId": "120363166555745933@newsletter",
        "caption": "Quero convidar você para ser admin do meu canal no WhatsApp."
    }
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

print('Convite enviado:', data)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-newsletter-admin-invite" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5511999999999",
    "adminInviteMessage": {
      "newsletterId": "120363166555745933@newsletter",
      "caption": "Quero convidar você para ser admin do meu canal no WhatsApp."
    }
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|------------|
| `zaapId` | string | ID in Z-API |
| `messageId` | string | ID in WhatsApp |
| `id` | string | Added for compatibility with Zapier, it has the same value as `messageId` |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Content-Type missing | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `phone` and `adminInviteMessage` were provided correctly |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **newsletterId**: Use the channel ID in the format `999999999999999999@newsletter`
- **Phone Format**: Use DDI DDD NUMBER without formatting (ex: `5511999999999`)
- **Caption**: The text of the invitation will be displayed in the message sent to the recipient
- **Notifications**: You will receive notifications via webhook when the invitation is accepted, rejected or when the admin is promoted/removido
- **Permissions**: Only the channel owner can send admin invitations

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Webhook - Channel Admin Invitation](/docs/webhooks/ao-receber#example-of-channel-admin-invitation-webhook) - Receive notifications of admin invitations
- [Webhook - Admin Promoted](/docs/webhooks/ao-receber#example-of-admin-promoted-to-a-channel) - Receive notifications of promoted admins
- [Webhook - Admin Removed](/docs/webhooks/ao-receber#example-of-admin-removed-from-a-channel) - Receive notifications of removed admins
- [Promote Admin](/docs/partners/newsletter/promover-admin) - Promote an admin directly
- [Accept Admin Invitation](/docs/partners/newsletter/aceitar-convite-admin) - Accept an admin invitation