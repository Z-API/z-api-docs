---
id: aceitar-convite-admin
sidebar_position: 7
title: Accept Invite from Admin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckCircle" size="lg" /> Accept Admin Invite

Accept an invite to be an admin of a newsletter channel.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for accepting an invite to be an admin of a channel. This invite is a message that you can [send](/docs/messages/convite-admin-canal) or receive through the [message received webhook](/docs/webhooks/ao-receber#example-of-admin-invite-channel-return).

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/newsletter/accept-admin-invite/{newsletterId}
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Your instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `newsletterId` | string | Channel ID to which the invite belongs (must contain the suffix `@newsletter`) | `120363166555745933@newsletter` |

:::warning Attention
The channel ID always must contain the suffix `@newsletter`, as this is the standard used by WhatsApp itself.
:::

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/accept-admin-invite/120363166555745933@newsletter
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const newsletterId = '120363166555745933@newsletter';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/accept-admin-invite/${newsletterId}`,
  {
    method: 'POST',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

if (response.status === 201) {
  console.log('Convite aceito com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

newsletter_id = '120363166555745933@newsletter'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/accept-admin-invite/{newsletter_id}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.post(url, headers=headers)
if response.status_code == 201:
    print("Convite aceito com sucesso!")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/accept-admin-invite/120363166555745933@newsletter" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 201 Created {#201-created}

The successful response does not return a body, only the status code `201`.

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|--------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Channel not found or invalid invite | Verify if the channel ID is correct, contains the suffix `@newsletter`, and you received a valid invite |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Mandatory Suffix**: The channel ID always must contain the suffix `@newsletter`
- **Valid Invite**: You can only accept invites that were sent to you
- **Webhook**: When you receive an invite, it comes through the [message received webhook](/docs/webhooks/ao-receber#example-of-admin-invite-channel-return)
- **Permissions**: After accepting, you will have admin permissions in the channel

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Send Admin Invite](/docs/messages/convite-admin-canal) - Send an invite to be an admin
- [Cancel Pending Admin Invite](/docs/partners/newsletter/anular-convite-admin) - Cancel a pending invite
- [Promote Admin](/docs/partners/newsletter/promover-admin) - Promote a user to admin directly
- [Remove Admin](/docs/partners/newsletter/remover-admin) - Remove an admin from the channel
- [Webhook - Message Received](/docs/webhooks/ao-receber) - See examples of received invites