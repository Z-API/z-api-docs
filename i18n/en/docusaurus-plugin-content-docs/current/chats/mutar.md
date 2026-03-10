---
id: mutar
title: Mute Chats
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="VolumeX" size="lg" /> Mute Chats

Mute and unmute your chats through the Z-API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for muting and unmuting your chats. When you mute a chat, you do not receive notifications of new messages from that chat, but the chat remains visible in your conversation list.

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

| Attribute | Type | Description | Accepted Values |
|----------|------|-------------|------------------|
| `phone` | string | Phone number you want to change in YOUR chat (international format, without spaces) | Ex: `5544999999999` |
| `action` | string | Attribute to mute and unmute the chat | `mute` (mute), `unmute` (unmute) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Mute chat**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5544999999999",
  "action": "mute"
}
```

**Unmute chat**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5544999999999",
  "action": "unmute"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Mutar chat
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
      action: 'mute', // ou 'unmute' para desmutar
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Chat mutado com sucesso!');
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

# Mutar chat
payload = {
    "phone": "5544999999999",
    "action": "mute"  # ou "unmute" para desmutar
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Chat mutado com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Mute chat**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5544999999999",
    "action": "mute"
  }'
```

**Unmute chat**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5544999999999",
    "action": "unmute"
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
| `400` | Invalid data | Check if `phone` and `action` were provided correctly. Use `mute` or `unmute` |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Available actions**: Use `mute` to mute a chat or `unmute` to unmute it
- **Phone format**: Use international format without spaces (ex: `5544999999999`)
- **Notifications**: When a chat is muted, you do not receive notifications of new messages
- **Chat visible**: The chat remains visible in your conversation list even when muted
- **Reversible**: You can unmute a chat at any time using `unmute`

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Archive Chat](/docs/chats/arquivar) - Archive a chat
- [Delete Chat](/docs/chats/deletar) - Delete a chat
- [Clear Chat](/docs/chats/limpar) - Clear messages from a chat
- [List Chats](/docs/chats/pegar-chats) - List all chats