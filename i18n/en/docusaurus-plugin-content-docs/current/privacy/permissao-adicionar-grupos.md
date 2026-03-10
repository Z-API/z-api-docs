---
id: permissao-adicionar-grupos
sidebar_position: 8
title: Permission to Add to Groups
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Users" size="lg" /> Add Group Permission

Configure who can add you to groups.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

Through this method, you can configure who can add you to groups. This configuration controls who has permission to add you to WhatsApp groups.

**Available options**:
- **All** (`ALL`): Anyone can add you to groups
- **Only my contacts** (`CONTACTS`): Only people in your contact list can add you
- **Only my contacts, except...** (`CONTACT_BLACKLIST`): Only your contacts can add you, except those you add to the blacklist

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/group-add
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
|----------|------|-----------|-----------------|
| `type` | string | Permission scope | `ALL` (All can add), `CONTACTS` (Only my contacts), `CONTACT_BLACKLIST` (Only my contacts, except...) |

### Optional

| Attribute | Type | Description |
|----------|------|-----------|
| `contactsBlacklist` | array[object] | Contacts to be added or removed from the blacklist. Should be sent when the `type` is `CONTACT_BLACKLIST` |

### Object `contactsBlacklist`

| Attribute | Type | Description | Accepted Values |
|----------|------|-----------|-----------------|
| `action` | string | Action to be performed for the contact | `add` (add), `remove` (remove) |
| `phone` | string | International phone number format without spaces | Ex: `554411111111` |

:::important Important
It is important to note that the blacklist (list of not allowed contacts) is different for each privacy configuration, i.e., the "last seen" blacklist is not the same as the "add to groups" permission blacklist, and so on for all configurations that accept a blacklist.
:::

:::tip Tip
**You do not need to resend** the `contactsBlacklist` attribute with contacts already added. This parameter is only for **blacklist changes**.
:::

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**All can add**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/group-add
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "type": "ALL"
}
```

**Only contacts, except some**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/group-add
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "type": "CONTACT_BLACKLIST",
  "contactsBlacklist": [
    { "action": "add", "phone": "554411111111" },
    { "action": "remove", "phone": "554422222222" }
  ]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Todos podem adicionar você em grupos
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/group-add',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      type: 'ALL', // ou 'CONTACTS', 'CONTACT_BLACKLIST'
      // contactsBlacklist: [  // Opcional, apenas se type for 'CONTACT_BLACKLIST'
      //   { action: 'add', phone: '554411111111' },
      //   { action: 'remove', phone: '554422222222' }
      // ]
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Configuração de permissão para adicionar em grupos atualizada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/group-add"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Todos podem adicionar você em grupos
payload = {
    "type": "ALL"  # ou "CONTACTS", "CONTACT_BLACKLIST"
    # "contactsBlacklist": [  # Opcional, apenas se type for "CONTACT_BLACKLIST"
    #     {"action": "add", "phone": "554411111111"},
    #     {"action": "remove", "phone": "554422222222"}
    # ]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Configuração de permissão para adicionar em grupos atualizada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**All can add**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/group-add" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "type": "ALL"
  }'
```

**Only contacts, except some**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/group-add" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "type": "CONTACT_BLACKLIST",
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

### Response Fields

| Field | Type | Description |
|-------|------|-----------|
| `success` | boolean | `true` if successful and `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `type` was provided and the value is valid |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Independent blacklist**: The blacklist for add to groups permission is independent of other privacy settings
- **Blacklist changes**: You only need to send `contactsBlacklist` when you want to make changes (add or remove contacts)
- **Phone number format**: Use international format without spaces (ex: `554411111111`)
- **Actions**: Use `add` to add a contact to the blacklist and `remove` to remove it
- **Protection**: This configuration helps prevent being added to unwanted groups

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Last Seen](/docs/privacy/visto-por-ultimo) - Configure last seen privacy
- [Photo View](/docs/privacy/visualizacao-foto-perfil) - Configure profile photo privacy
- [Message View](/docs/privacy/visualizacao-recado) - Configure message privacy
- [Blocked Contacts](/docs/privacy/contatos-nao-permitidos) - List contacts in the blacklist