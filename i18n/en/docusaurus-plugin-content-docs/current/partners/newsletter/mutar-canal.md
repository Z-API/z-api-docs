---
id: mutar-canal
sidebar_position: 33
title: Change Channel
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="VolumeX" size="lg" /> Mute Channel

Mute a channel to stop receiving notifications of new messages.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for muting a channel. When a channel is muted, you will not receive notifications of new messages, but you can still view the content of the channel.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
PUT /instances/{instanceId}/token/{token}/mute-newsletter
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|------------|
| `id` | string | Channel ID (must contain the suffix `@newsletter`) |

:::warning Attention
The channel ID always must contain the suffix `@newsletter` as this is the standard used by WhatsApp itself.
:::

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "id": "999999999999999999@newsletter"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter',
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      id: '999999999999999999@newsletter',
    }),
  }
);

const data = await response.json();
console.log('Sucesso:', data.value);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "id": "999999999999999999@newsletter"
}

response = requests.put(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['value']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "id": "999999999999999999@newsletter"
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

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `value` | boolean | `true` if the operation was successful, `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `PUT` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `id` was provided and contains the suffix `@newsletter` |
| `404` | Channel not found | Check if the channel ID is correct |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Required Suffix**: The channel ID always must contain the suffix `@newsletter`
- **Notifications**: When muted, you will not receive notifications of new messages
- **Access to Content**: You can still view the content of the channel even when muted
- **Status**: The mute status can be verified through the [Channel Metadata](/docs/partners/newsletter/metadata) method in the field `viewMetadata.mute`

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Unmute Channel](/docs/partners/newsletter/desmutar-canal) - Reactivate notifications of the channel
- [Channel Metadata](/docs/partners/newsletter/metadata) - View complete information about the channel
- [Follow Channel](/docs/partners/newsletter/seguir-canal) - Follow a channel
- [Leave Following](/docs/partners/newsletter/deixar-seguir) - Stop following a channel