---
id: seguir-canal
sidebar_position: 31
title: Follow Channel
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserPlus" size="lg" /> Follow Channel

Follow a newsletter channel to receive messages and updates.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituation}

This method is responsible for following a channel. When you follow a channel, you start receiving messages and updates from the channel.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
PUT /instances/{instanceId}/token/{token}/follow-newsletter
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#attributes}

### Required

| Attribute | Type | Description |
|----------|------|------------|
| `id` | string | Channel ID (must contain the suffix `@newsletter`) |

:::warning Attention
The channel ID always must contain the suffix `@newsletter` as this is the standard used by WhatsApp itself.
:::

---

## <Icon name="Code" size="md" /> Examples {#examples}

<Tabs>
<TabItem value="http" label="HTTP">

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/follow-newsletter
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
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/follow-newsletter',
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

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/follow-newsletter"
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
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/follow-newsletter" \
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

### <Icon name="AlertCircle" size="sm" /> Error Codes {#errors}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `PUT` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Verify if `id` was provided and contains the suffix `@newsletter` |
| `404` | Channel not found | Verify if the channel ID is correct |

---

## <Icon name="Info" size="md" /> Notes {#notes}

- **Required Suffix**: The channel ID always must contain the suffix `@newsletter`
- **Messages**: After following, you will start receiving messages from the channel
- **Followed Channels List**: The channel will be added to your list of followed channels
- **Invite Link**: You can use the channel's invite link to share with others

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#related-resources}

- [Unfollow](/docs/partners/newsletter/deixar-seguir) - Unfollow a channel
- [List Channels](/docs/partners/newsletter/listar-canais) - View all followed channels
- [Channel Metadata](/docs/partners/newsletter/metadata) - View complete channel information
- [Find Channels](/docs/partners/newsletter/encontrar-canais) - Search available channels