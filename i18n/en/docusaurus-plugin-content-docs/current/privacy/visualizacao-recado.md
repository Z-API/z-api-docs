---
id: visualizacao-recado
sidebar_position: 4
title: Message Preview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FileText" size="lg" /> Message Visualization

Configure who can see the message from your profile.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

Through this method, you can configure who can see the message from your profile. The message is the status update that appears on your WhatsApp profile.

**Available Options**:
- **Everyone** (`ALL`): Anyone can see your message
- **No One** (`NONE`): No one can see your message
- **Only My Contacts** (`CONTACTS`): Only people in my contact list can see it
- **Only My Contacts, Except...** (`CONTACT_BLACKLIST`): Only my contacts can see it, except those I add to the blacklist

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/description
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account Security Token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description | Accepted Values |
|----------|------|------------|-----------------|
| `visualizationType` | string | Viewing scope | `ALL` (Everyone can see), `NONE` (No one can see), `CONTACTS` (Only my contacts), `CONTACT_BLACKLIST` (Only my contacts, except...) |

### Optional

| Attribute | Type | Description |
|----------|------|------------|
| `contactsBlacklist` | array[object] | Contacts to be added or removed from the blacklist. Must be sent when the `visualizationType` is `CONTACT_BLACKLIST` |

### Object `contactsBlacklist`

| Attribute | Type | Description | Accepted Values |
|----------|------|------------|-----------------|
| `action` | string | Action to be performed for the contact | `add` (add), `remove` (remove) |
| `phone` | string | International phone number format without spaces | Ex: `554411111111` |

:::important Important
It is important to note that the blacklist (list of contacts not allowed) is different for each privacy configuration, i.e., the "last seen" blacklist is not the same as the "profile picture" one, and so on for all configurations that accept a blacklist.
:::

:::tip Tip
**You do not need to resend** the `contactsBlacklist` with contacts already added. This parameter is only for **changes in the blacklist**.
:::

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Everyone can see**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/description
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "visualizationType": "ALL"
}
```

**Only contacts, except some**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/description
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "visualizationType": "CONTACT_BLACKLIST",
  "contactsBlacklist": [
    { "action": "add", "phone": "554411111111" },
    { "action": "remove", "phone": "554422222222" }
  ]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Todos podem ver o recado
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/description',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      visualizationType: 'ALL', // ou 'NONE', 'CONTACTS', 'CONTACT_BLACKLIST'
      // contactsBlacklist: [  // Opcional, apenas se visualizationType for 'CONTACT_BLACKLIST'
      //   { action: 'add', phone: '554411111111' },
      //   { action: 'remove', phone: '554422222222' }
      // ]
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Configuração de visualização do recado atualizada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/description"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Todos podem ver o recado
payload = {
    "visualizationType": "ALL"  # ou "NONE", "CONTACTS", "CONTACT_BLACKLIST"
    # "contactsBlacklist": [  # Opcional, apenas se visualizationType for "CONTACT_BLACKLIST"
    #     {"action": "add", "phone": "554411111111"},
    #     {"action": "remove", "phone": "554422222222"}
    # ]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Configuração de visualização do recado atualizada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Everyone can see**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/description" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "visualizationType": "ALL"
  }'
```

**Only contacts, except some**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/description" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "visualizationType": "CONTACT_BLACKLIST",
    "contactsBlacklist": [
      {"action": "add", "phone": "554411111111"},
      {"action": "remove", "phone": "554422222222"}
    ]
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "success": true
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `success` | boolean | `true` if successful and `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `visualizationType` was provided and the value is valid |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Blacklist independent**: The message blacklist is independent of other privacy settings
- **Changes in the blacklist**: You only need to send `contactsBlacklist` when you want to make changes (add or remove contacts)
- **Phone number format**: Use international format without spaces (ex: `554411111111`)
- **Actions**: Use `add` to add a contact to the blacklist and `remove` to remove it

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Last Seen](/docs/privacy/visto-por-ultimo) - Configure last seen privacy
- [Profile Picture View](/docs/privacy/visualizacao-foto-perfil) - Configure profile picture privacy
- [Online Visibility](/docs/privacy/visualizacao-online) - Configure online visibility
- [Blocked Contacts](/docs/privacy/contatos-nao-permitidos) - List contacts in the blacklist