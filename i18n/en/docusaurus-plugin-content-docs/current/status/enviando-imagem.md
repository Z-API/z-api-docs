---
id: enviando-imagem
sidebar_position: 5
title: Send Image Status
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Image" size="lg" /> Sending Image Status

Send an image to your status. Remember that statuses disappear after 24 hours.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for sending an image to your status. Statuses are temporary messages that disappear after 24 hours, similar to the Stories feature on other platforms.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-image-status
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
| `image` | string | Image link or Base64 |

### Optional

| Attribute | Type | Description |
|----------|------|------------|
| `caption` | string | Caption that will accompany the image for your status |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Without caption**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-image-status
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "image": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
}
```

**With caption**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-image-status
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "image": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg",
  "caption": "texto da legenda"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Sem legenda
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-image-status',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      image: 'https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg',
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

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-image-status"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Sem legenda
payload = {
    "image": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
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
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-image-status" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "image": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
  }'
```

**With caption**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-image-status" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "image": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg",
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
| `400` | Invalid data | Check if `image` was provided correctly |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Image format**: You can send a link (URL) or Base64 of the image
- **Optional caption**: The caption (`caption`) is optional and appears alongside the image in your status
- **Expiration**: Statuses disappear automatically after 24 hours
- **Base64**: If you have doubts about how to send an image in Base64, visit the "Send Image" messages topic, where you will find everything you need to know about sending this format

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Send Text Status](/docs/status/enviando-texto) - Send a text status
- [Send Video Status](/docs/status/enviando-video) - Send a video status
- [Reply to Status](/docs/status/responder-texto) - Reply to a status