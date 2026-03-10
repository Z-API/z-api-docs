---
id: expiracao
title: Chat Expiration
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Clock" size="lg" /> Chat Expiration

Configure the expiration time of messages in your chats.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method is responsible for sending chat expiration. You can configure messages in a specific chat to expire automatically after a determined period, or disable expiration.

**Available expiration options**:
- **24 hours** (`24_HOURS`): Messages expire after 24 hours
- **7 days** (`7_DAYS`): Messages expire after 7 days
- **90 days** (`90_DAYS`): Messages expire after 90 days
- **Disabled** (`OFF`): Disables message expiration (messages remain indefinitely)

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|-------------|-----------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Must be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description | Accepted Values |
|----------|------|-----------|-----------------|
| `phone` | string | Phone number you want to set the expiration time of your **chat** (international format, no spaces) | Ex: `554497050785` |
| `chatExpiration` | string | Attribute to send chat expiration | `24_HOURS`, `7_DAYS`, `90_DAYS`, `OFF` |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**24 hours**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "554497050785",
  "chatExpiration": "24_HOURS"
}
```

**7 days**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "554497050785",
  "chatExpiration": "7_DAYS"
}
```

**90 days**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "554497050785",
  "chatExpiration": "90_DAYS"
}
```

**Disable**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "554497050785",
  "chatExpiration": "OFF"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Configurar expiração para 90 dias
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '554497050785',
      chatExpiration: '90_DAYS', // ou '24_HOURS', '7_DAYS', 'OFF'
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Expiração do chat configurada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Configurar expiração para 90 dias
payload = {
    "phone": "554497050785",
    "chatExpiration": "90_DAYS"  # ou "24_HOURS", "7_DAYS", "OFF"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Expiração do chat configurada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**90 days**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "554497050785",
    "chatExpiration": "90_DAYS"
  }'
```

**Disable**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "554497050785",
    "chatExpiration": "OFF"
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
|-------|------|-----------|
| `value` | boolean | Action confirmation attribute (`true` if successful, `false` in case of failure) |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to resolve |
|--------|--------|---------------|
| `405` | Incorrect HTTP method | Make sure you're using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `phone` and `chatExpiration` were provided correctly. Use one of the accepted values: `24_HOURS`, `7_DAYS`, `90_DAYS`, or `OFF` |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Accepted values**: Use `24_HOURS` for 24 hours, `7_DAYS` for 7 days, `90_DAYS` for 9 nadays, or `OFF` to disable expiration
- **Phone format**: Use international format without spaces (ex: `554497050785`)
- **Application**: Expiration applies to all messages in the chat after configuration
- **Existing messages**: Existing messages may not be affected, depending on WhatsApp implementation

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Archive Chat](/docs/chats/arquivar) - Archive a chat
- [Delete Chat](/docs/chats/deletar) - Delete a chat
- [Clear Chat](/docs/chats/limpar) - Clear messages from a chat
- [Mute Chat](/docs/chats/mutar) - Mute or unmute a chat