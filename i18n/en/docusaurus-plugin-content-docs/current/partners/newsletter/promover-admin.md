---
id: promover-admin
sidebar_position: 8
title: Promote Administrator
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserPlus" size="lg" /> Promote Administrator

Promote a user to an administrator of a newsletter channel by sending an invitation.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

To promote a user to an administrator of a newsletter channel, you must send an admin invitation. The user will receive a message with the invitation and can accept it to become an administrator of the channel.

Promoting an administrator is done through the [Send Admin Invitation](/docs/messages/convite-admin-canal) method, which sends a special message to the user. When the user accepts the invitation using the [Accept Admin Invitation](/docs/partners/newsletter/aceitar-convite-admin) method, they become an administrator of the channel.

---

## <Icon name="Link" size="md" /> Promotion Process {#processo}

### Step 1: Send Invitation

Use the [Send Admin Invitation](/docs/messages/convite-admin-canal) method to send an invitation to the user:

```http
POST /instances/{instanceId}/token/{token}/send-newsletter-admin-invite
```

**Example Request**:

```json
{
  "phone": "5511999999999",
  "adminInviteMessage": {
    "newsletterId": "999999999999999999@newsletter",
    "caption": "Quero convidar você para ser admin do meu canal no WhatsApp."
  }
}
```

### Step 2: User Accepts the Invitation

The user will receive a message with the invitation and can accept it using the [Accept Admin Invitation](/docs/partners/newsletter/aceitar-convite-admin) method.

---

## <Icon name="Code" size="md" /> Complete Example {#exemplo-completo}

<Tabs>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Passo 1: Enviar convite de admin
const sendInviteResponse = await fetch(
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
        newsletterId: '999999999999999999@newsletter',
        caption: 'Quero convidar você para ser admin do meu canal no WhatsApp.',
      },
    }),
  }
);

const inviteData = await sendInviteResponse.json();
console.log('Convite enviado:', inviteData);

// O usuário receberá a mensagem e poderá aceitar o convite
// Quando aceito, você receberá um webhook com notification: "NEWSLETTER_ADMIN_PROMOTE"
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

# Passo 1: Enviar convite de admin
url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-newsletter-admin-invite"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "5511999999999",
    "adminInviteMessage": {
        "newsletterId": "999999999999999999@newsletter",
        "caption": "Quero convidar você para ser admin do meu canal no WhatsApp."
    }
}

response = requests.post(url, headers=headers, json=payload)
invite_data = response.json()
print(f"Convite enviado: {invite_data}")

# O usuário receberá a mensagem e poderá aceitar o convite
# Quando aceito, você receberá um webhook com notification: "NEWSLETTER_ADMIN_PROMOTE"
```

</TabItem>
</Tabs>

---

## <Icon name="Info" size="md" /> Confirmation Webhook {#webhook}

When the user accepts the invitation and is promoted to an administrator, you will receive a webhook notification with the confirmation `NEWSLETTER_ADMIN_PROMOTE`:

```json
{
  "type": "ReceivedCallback",
  "notification": "NEWSLETTER_ADMIN_PROMOTE",
  "notificationParameters": ["5544999999999", "ADMIN"],
  "phone": "5544999999999@newsletter",
  "chatName": "nome do canal",
  "participantPhone": "5544999999999"
}
```

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Permissions**: Only the channel owner can promote other users to administrators
- **Invitation Required**: Promotion is done through sending an invitation, not directly
- **Acceptance Required**: The user must accept the invitation to become an administrator
- **Cancel Invitation**: You can cancel a pending invitation using the [Cancel Admin Invitation](/docs/partners/newsletter/anular-convite-admin) method
- **Webhook**: Monitor the webhook to know when the user accepted the invitation

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Send Admin Invitation](/docs/messages/convite-admin-canal) - Send invitation to be an administrator
- [Accept Admin Invitation](/docs/partners/newsletter/aceitar-convite-admin) - Accept admin invitation
- [Cancel Admin Invitation](/docs/partners/newsletter/anular-convite-admin) - Cancel pending invitation
- [Remove Administrator](/docs/partners/newsletter/remover-admin) - Remove administrator from the channel
- [Webhook - Message Received](/docs/webhooks/ao-receber) - See examples of promotion notifications