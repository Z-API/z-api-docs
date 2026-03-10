---
id: deixar-seguir
sidebar_position: 32
title: Unfollow Channel
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserMinus" size="lg" /> Leave Following Channel

Stop following a newsletter channel.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for leaving a follow. When you leave a channel, you will no longer receive messages from that channel and it will be removed from your list of followed channels.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
PUT /instances/{instanceId}/token/{token}/unfollow-newsletter
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
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/unfollow-newsletter
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
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/unfollow-newsletter',
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

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/unfollow-newsletter"
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
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/unfollow-newsletter" \
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
- **Owners**: Channel owners cannot leave following their own channels
- **Messages**: After leaving, you will no longer receive messages from that channel
- **Followed Channels List**: The channel will be removed from your list of followed channels

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Follow Channel](/docs/partners/newsletter/seguir-canal) - Follow a channel
- [List Channels](/docs/partners/newsletter/listar-canais) - See all followed channels
- [Channel Metadata](/docs/partners/newsletter/metadata) - View complete channel information