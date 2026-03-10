---
id: deletar-canal
sidebar_position: 6
title: Delete Channel
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Trash2" size="lg" /> Delete Channel

Permanently remove a newsletter channel.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituation}

This method is responsible for deleting a channel. When a channel is deleted, it is permanently removed and cannot be recovered.

:::warning Attention
The operation of deleting a channel is permanent and cannot be undone. Make sure you really want to remove the channel before performing this operation.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
DELETE /instances/{instanceId}/token/{token}/delete-newsletter
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
DELETE https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/delete-newsletter
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
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/delete-newsletter',
  {
    method: 'DELETE',
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

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/delete-newsletter"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "id": "999999999999999999@newsletter"
}

response = requests.delete(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['value']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X DELETE "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/delete-newsletter" \
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
| `405` | Incorrect HTTP method | Make sure you are using `DELETE` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `id` was provided and contains the suffix `@newsletter` |
| `404` | Channel not found | Check if the channel ID is correct |

---

## <Icon name="Info" size="md" /> Notes {#notes}

- **Required Suffix**: The channel ID always must contain the suffix `@newsletter`
- **Permissions**: Only the owner of the channel can delete it
- **Permanent Removal**: The channel will be permanently removed and cannot be recovered
- **Followers**: All followers will lose access to the channel after deletion

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#related-resources}

- [Create Channel](/docs/partners/newsletter/criar-canal) - Create a new channel
- [List Channels](/docs/partners/newsletter/listar-canais) - View all channels
- [Channel Metadata](/docs/partners/newsletter/metadata) - View complete channel information
---