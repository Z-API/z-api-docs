---
id: arquivar
title: Archive Chats
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Archive" size="lg" /> Archive Chats

Archive and unarchive your chats through the Z-API.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method is responsible for archiving and unarchiving your chats. When you archive a chat, it is moved to the archived section but is not deleted. You can unarchive the chat at any time.

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
| `phone` | string | Phone number you want to change in your **YOUR** chat (international format, no spaces) | Ex: `5544999999999` |
| `action` | string | Attribute to archive and unarchive the chat | `archive` (archive), `unarchive` (unarchive) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Archive chat**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5544999999999",
  "action": "archive"
}
```

**Unarchive chat**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5544999999999",
  "action": "unarchive"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Arquivar chat
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
      action: 'archive', // ou 'unarchive' para desarquivar
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Chat arquivado com sucesso!');
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

# Arquivar chat
payload = {
    "phone": "5544999999999",
    "action": "archive"  # ou "unarchive" para desarquivar
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Chat arquivado com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Archive chat**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5544999999999",
    "action": "archive"
  }'
```

**Unarchive chat**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5544999999999",
    "action": "unarchive"
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
| `400` | Invalid data | Check if `phone` and `action` were provided correctly. Use `archive` or `unarchive` |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Available actions**: Use `archive` to archive a chat or `unarchive` to unarchive it
- **Phone format**: Use international format without spaces (ex: `5544999999999`)
- **Chat not deleted**: Archiving a chat does not delete it, only moves it to the archived section
- **Reversible**: You can unarchive a chat at any time using `unarchive`

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Delete Chat](/docs/chats/deletar) - Delete a chat permanently
- [Clear Chat](/docs/chats/limpar) - Clear messages from a chat
- [Mute Chat](/docs/chats/mutar) - Mute or unmute a chat
- [List Chats](/docs/chats/pegar-chats) - List all chats