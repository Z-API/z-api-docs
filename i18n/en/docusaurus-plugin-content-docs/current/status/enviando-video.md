---
id: enviando-video
sidebar_position: 6
title: Send Video Status
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Video" size="lg" /> Sending Video Status

Send a video to your status. Remember that statuses disappear after 24 hours.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for sending a video to your status. Statuses are temporary messages that disappear after 24 hours, similar to the Stories feature on other platforms.

:::caution Caution
The maximum size for videos in statuses is **10MB**.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status
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
| `video` | string | Video link or its Base64 |

### Optional

| Attribute | Type | Description |
|----------|------|------------|
| `caption` | string | Caption that will accompany the video for the status |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Without caption**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "video": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
}
```

**With caption**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "video": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4",
  "caption": "texto da legenda"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Sem legenda
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      video: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
      // caption: 'texto da legenda' // Opcional
    }),
  }
);

const data = await response.json();
console.log('Status enviado:', data.messageId);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Sem legenda
payload = {
    "video": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
    # "caption": "texto da legenda"  # Opcional
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

print(f"Status enviado: {data.get('messageId')}")
```

</TabItem>
<TabItem value="curl" label="cURL">

**Without caption**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "video": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
  }'
```

**With caption**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video-status" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "video": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4",
    "caption": "texto da legenda"
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
  "messageId": "D241XXXX732339502B68"
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `zaapId` | string | ID in Z-API |
| `messageId` | string | ID in WhatsApp |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data or video too large | Verify that `video` was provided correctly. Remember: the maximum size is 10MB |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Maximum Size**: The maximum size for videos in statuses is 10MB
- **Video Format**: You can send a link (URL) or Base64 of the video
- **Optional Caption**: The caption (`caption`) is optional and appears alongside the video in the status
- **Expiration**: Statuses disappear automatically after 24 hours
- **Base64**: If you have doubts about how to send a Base64 video, visit the "Send Video" messages topic, where you will find everything you need to know about sending this format

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Send Text Status](/docs/status/enviando-texto) - Send a text status
- [Send Image Status](/docs/status/enviando-imagem) - Send an image status
- [Reply to Status](/docs/status/responder-texto) - Reply to a status