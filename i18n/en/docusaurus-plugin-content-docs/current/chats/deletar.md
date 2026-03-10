---
id: deletar
title: Delete Chats
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Trash2" size="lg" /> Delete Chats

Delete your chats permanently through the Z-API API.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method is responsible for deleting your chats. When you delete a chat, it is permanently removed from your conversation list.

:::warning Attention
This action is **permanent** and cannot be undone. Make sure you really want to delete the chat before performing this operation.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Must be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|-------------|
| `phone` | string | Phone number you want to change in your **YOUR** chat (international format, no spaces) | Ex: `5544999999999` |
| `action` | string | Attribute to delete the chat ( `delete` ) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5544999999999",
  "action": "delete"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5544999999999',
      action: 'delete',
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Chat deletado com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "5544999999999",
    "action": "delete"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Chat deletado com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5544999999999",
    "action": "delete"
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
|-------|------|-------------|
| `value` | boolean | Action confirmation attribute (`true` if successful, `false` in case of failure) |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to fix |
|------|--------|------------|
| `405` | Incorrect HTTP method | Make sure you're using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `phone` and `action` were provided correctly. Use `delete` as the action |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Permanent Action**: Deleting a chat is a permanent action and cannot be undone
- **Phone Format**: Use international format without spaces (ex: `5544999999999`)
- **Action**: Use `delete` as the value for attribute `action`
- **Difference from Archiving**: Different from archiving, deleting permanently removes the chat

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Archive Chat](/docs/chats/arquivar) - Archive a chat (reversible)
- [Clear Chat](/docs/chats/limpar) - Clear messages from a chat
- [Mute Chat](/docs/chats/mutar) - Mute or unmute a chat
- [List Chats](/docs/chats/pegar-chats) - List all chats