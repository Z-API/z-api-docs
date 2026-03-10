---
id: responder-gif
sidebar_position: 4
title: Reply Status with GIF
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Image" size="lg" /> Responding Status with GIF

Send a response with GIF to another user's status.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for sending a response with GIF to another user's status. When you respond to a status with GIF, the response is sent as a private message to the author of the status.

:::important Important
The file needs to be an MP4 file. Even if it is an animated GIF, WhatsApp requires that it be sent as MP4.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-gif
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
| `phone` | string | Number who sent the status (international format, no spaces) |
| `gif` | string | Link to your GIF file (The file needs to be an MP4) |
| `statusMessageId` | string | ID of the status message. Can be obtained in received message webhook -> [webhook](../webhooks/ao-receber) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-gif
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5544999999999",
  "gif": "https://file-examples.com/storage/fe88505b6162b2538a045ce/2017/04/file_example_MP4_480_1_5MG.mp4",
  "statusMessageId": "1F606398F2ECAA4846269F659B6003A9"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-gif',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5544999999999',
      gif: 'https://file-examples.com/storage/fe88505b6162b2538a045ce/2017/04/file_example_MP4_480_1_5MG.mp4',
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

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-gif"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "5544999999999",
    "gif": "https://file-examples.com/storage/fe88505b6162b2538a045ce/2017/04/file_example_MP4_480_1_5MG.mp4",
    "statusMessageId": "1F606398F2ECAA4846269F659B6003A9"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

print(f"Resposta enviada: {data.get('messageId')}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-gif" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5544999999999",
    "gif": "https://file-examples.com/storage/fe88505b6162b2538a045ce/2017/04/file_example_MP4_480_1_5MG.mp4",
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
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Verify that `phone`, `gif` and `statusMessageId` were provided correctly. Remember: the file needs to be MP4 |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **File format**: The file needs to be an MP4, even if it is an animated GIF
- **statusMessageId**: The ID of the status message can be obtained in the webhook when you receive a status notification
- **Phone format**: Use international format without spaces (ex: `5544999999999`)
- **Private message**: The response is sent as a private message to the author of the status
- **Link or Base64**: You can send a link (URL) or Base64 of the MP4 file

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Responding Status with Text](/docs/status/responder-texto) - Responding status with text
- [Responding Status with Sticker](/docs/status/responder-sticker) - Responding status with sticker
- [Sending Text Status](/docs/status/enviando-texto) - Sending a text status
- [Webhooks](/docs/webhooks/ao-receber) - Getting the ID of the status message