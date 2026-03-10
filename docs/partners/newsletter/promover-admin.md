---
id: promover-admin
title: Promover Administrador
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserPlus" size="lg" /> Promover Administrador

Promova um usuário a administrador de um canal de newsletter através do envio de um convite.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

Para promover um usuário a administrador de um canal de newsletter, você deve enviar um convite de administrador. O usuário receberá uma mensagem com o convite e poderá aceitá-lo para se tornar administrador do canal.

A promoção de administrador é feita através do método [Enviar Convite de Admin](/docs/messages/convite-admin-canal), que envia uma mensagem especial ao usuário. Quando o usuário aceita o convite através do método [Aceitar Convite de Admin](/docs/partners/newsletter/aceitar-convite-admin), ele se torna administrador do canal.

---

## <Icon name="Link" size="md" /> Processo de Promoção {#processo}

### Passo 1: Enviar Convite

Use o método [Enviar Convite de Admin](/docs/messages/convite-admin-canal) para enviar um convite ao usuário:

```http
POST /instances/{instanceId}/token/{token}/send-newsletter-admin-invite
```

**Exemplo de requisição**:

```json
{
  "phone": "5511999999999",
  "adminInviteMessage": {
    "newsletterId": "999999999999999999@newsletter",
    "caption": "Quero convidar você para ser admin do meu canal no WhatsApp."
  }
}
```

### Passo 2: Usuário Aceita o Convite

O usuário receberá uma mensagem com o convite e poderá aceitá-lo usando o método [Aceitar Convite de Admin](/docs/partners/newsletter/aceitar-convite-admin).

---

## <Icon name="Code" size="md" /> Exemplo Completo {#exemplo-completo}

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

## <Icon name="Info" size="md" /> Webhook de Confirmação {#webhook}

Quando o usuário aceita o convite e é promovido a administrador, você receberá um webhook com a notificação `NEWSLETTER_ADMIN_PROMOTE`:

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

## <Icon name="Info" size="md" /> Observações {#observacoes}

- **Permissões**: Apenas o proprietário do canal pode promover outros usuários a administradores
- **Convite necessário**: A promoção é feita através do envio de um convite, não diretamente
- **Aceitação obrigatória**: O usuário deve aceitar o convite para se tornar administrador
- **Anular convite**: Você pode anular um convite pendente usando o método [Anular Convite de Admin](/docs/partners/newsletter/anular-convite-admin)
- **Webhook**: Monitore o webhook para saber quando o usuário aceitou o convite

---

## <Icon name="ArrowRight" size="md" /> Recursos Relacionados {#recursos-relacionados}

- [Enviar Convite de Admin](/docs/messages/convite-admin-canal) - Enviar convite para ser administrador
- [Aceitar Convite de Admin](/docs/partners/newsletter/aceitar-convite-admin) - Aceitar convite de administrador
- [Anular Convite de Admin](/docs/partners/newsletter/anular-convite-admin) - Anular convite pendente
- [Remover Administrador](/docs/partners/newsletter/remover-admin) - Remover administrador do canal
- [Webhook - Mensagem Recebida](/docs/webhooks/ao-receber) - Ver exemplos de notificações de promoção
