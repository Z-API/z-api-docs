---
id: limpar
title: Clear Chat
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Eraser" size="lg" /> Clear Chat

Clear all messages from a chat through the Z-API API.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method is responsible for clearing the messages of your chats. When you clear a chat, all messages are removed, but the chat continues to exist in your list of conversations.

:::important Important
Clearing a chat permanently removes all messages. This action cannot be undone.
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
| `phone` | string | Phone number you want to change in **YOUR** chat (international format, no spaces) | Ex: `5544999999999` |
| `action` | string | Attribute to clear the chat ( `clear` ) |

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
  "action": "clear"
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
      action: 'clear',
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Chat limpo com sucesso!');
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
    "action": "clear"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Chat limpo com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5544999999999",
    "action": "clear"
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
| `400` | Invalid data | Check if `phone` and `action` were provided correctly. Use `clear` as action |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Permanent Action**: Clearing a chat permanently removes all messages
- **Chat Preserved**: The chat continues to exist in your conversation list, only the messages are removed
- **Phone Format**: Use international format without spaces (ex: `5544999999999`)
- **Action**: Use `clear` as value for attribute `action`
- **Difference from Delete**: Different from deleting, clearing keeps the chat in the list but removes all messages

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Archive Chat](/docs/chats/arquivar) - Archive a chat
- [Delete Chat](/docs/chats/deletar) - Permanently delete a chat
- [Mute Chat](/docs/chats/mutar) - Mute or unmute a chat
- [List Chats](/docs/chats/pegar-chats) - List all chats