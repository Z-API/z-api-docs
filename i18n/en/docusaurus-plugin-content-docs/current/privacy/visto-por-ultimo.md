---
id: visto-por-ultimo
sidebar_position: 7
title: Last Seen
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Eye" size="lg" /> Last Seen

Configure who can see your "last seen".

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

Through this method, you can configure who can see your "last seen". The "last seen" shows the last time you were online on WhatsApp.

**Available options**:
- **Everyone** (`ALL`): Anyone can see when you were last online
- **No one** (`NONE`): No one can see when you were last online
- **Only my contacts** (`CONTACTS`): Only people in your contact list can see it
- **Only my contacts, except...** (`CONTACT_BLACKLIST`): Only your contacts can see it, except those you add to the blacklist

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/last-seen
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
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
| `phone` | string | Contact number (international format, no spaces) | Ex: `554411111111` |

:::important Important
It is important to note that the blacklist (list of contacts not allowed) is independent for each privacy configuration, i.e., the "last seen" blacklist is different from the "profile picture" blacklist, and so on for all configurations that accept a blacklist.
:::

:::tip Tip
**You do not need to resend** the `contactsBlacklist` attribute with contacts already added. This parameter is only for **changes in the blacklist**.
:::

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Everyone can see**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/last-seen
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "visualizationType": "ALL"
}
```

**Only contacts, except some**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/last-seen
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
// Todos podem ver o visto por último
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/last-seen',
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
  console.log('Configuração de visto por último atualizada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/last-seen"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Todos podem ver o visto por último
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
    print('Configuração de visto por último atualizada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Everyone can see**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/last-seen" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "visualizationType": "ALL"
  }'
```

**Only contacts, except some**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/last-seen" \
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

| Code | Reason | How to resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `visualizationType` was provided and the value is valid |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Blacklist independent**: The "last seen" blacklist is independent of other privacy settings
- **Changes in the blacklist**: You only need to send `contactsBlacklist` when you want to make changes (add or remove contacts)
- **Phone format**: Use international format without spaces (ex: `554411111111`)
- **Actions**: Use `add` to add a contact to the blacklist and `remove` to remove it
- **Online visibility**: The "online" visibility setting can use the same last seen configuration (`SAME_LAST_SEEN`)

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Online Visibility](/docs/privacy/visualizacao-online) - Configure online visibility
- [Photo View](/docs/privacy/visualizacao-foto-perfil) - Configure profile picture privacy
- [Message View](/docs/privacy/visualizacao-recado) - Configure message privacy
- [Blocked Contacts](/docs/privacy/contatos-nao-permitidos) - List contacts in the blacklist