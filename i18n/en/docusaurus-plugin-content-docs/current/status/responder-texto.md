---
id: responder-texto
sidebar_position: 2
title: Reply Status with Text
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MessageSquare" size="lg" /> Responding Status with Text

Send a text response to another user's status.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for sending a text response to a status. When you respond to a status, the response is sent as a private message to the author of the status.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-text
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|------------|
| `phone` | string | Number of the user who sent the status (international format, no spaces) |
| `message` | string | Response message |
| `statusMessageId` | string | ID of the status message. Can be obtained from the received message webhook -> [webhook](../webhooks/ao-receber) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-text
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5544999999999",
  "message": "texto da mensagem",
  "statusMessageId": "1F606398F2ECAA4846269F659B6003A9"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-text',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5544999999999',
      message: 'texto da mensagem',
      statusMessageId: '1F606398F2ECAA4846269F659B6003A9',
    }),
  }
);

const data = await response.json();
console.log('Resposta enviada:', data.messageId);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-text"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "5544999999999",
    "message": "texto da mensagem",
    "statusMessageId": "1F606398F2ECAA4846269F659B6003A9"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

print(f"Resposta enviada: {data.get('messageId')}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-text" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5544999999999",
    "message": "texto da mensagem",
    "statusMessageId": "1F606398F2ECAA4846269F659B6003A9"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `zaapId` | string | ID in Z-API |
| `messageId` | string | ID in WhatsApp |
| `id` | string | Added for compatibility with Zapier, has the same value as `messageId` |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Ensure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Verify that `phone`, `message` and `statusMessageId` were provided correctly |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **statusMessageId**: The ID of the status message can be obtained from the webhook when you receive a status notification
- **Phone format**: Use international format without spaces (ex: `5544999999999`)
- **Private message**: The response is sent as a private message to the author of the status
- **Webhook**: Consult the [received message webhook](../webhooks/ao-receber) for obtaining `statusMessageId`

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Responding Status with Sticker](/docs/status/responder-sticker) - Responding status with sticker
- [Responding Status with GIF](/docs/status/responder-gif) - Responding status with GIF
- [Sending Text Status](/docs/status/enviando-texto) - Sending a text status
- [Webhooks](/docs/webhooks/ao-receber) - Obtaining the ID of the status message