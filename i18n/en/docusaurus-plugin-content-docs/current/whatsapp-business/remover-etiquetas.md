---
id: remover-etiquetas
sidebar_position: 13
title: Remove Labels
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="TagMinus" size="lg" /> Remove Tags

Remove a tag from a chat in WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to remove a tag from a specific chat in WhatsApp Business. Useful for updating the organization of your conversations as needed.

:::important Important
This method is available only on devices connected to the Multi-Devices version of WhatsApp.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
PUT https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/chats/{phone}/tags/{tag}/remove
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Your instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `phone` | string | Chat phone number (international format, no spaces) | `5511999999999` |
| `tagId` | string | ID of the tag to be removed | `10` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats/5511999999999/tags/10/remove
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const phone = '5511999999999';
const tagId = '10';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats/${phone}/tags/${tagId}/remove`,
  {
    method: 'PUT',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
console.log('Sucesso:', data.value);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

phone = '5511999999999'
tag_id = '10'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats/{phone}/tags/{tag_id}/remove"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.put(url, headers=headers)
data = response.json()
print(f"Sucesso: {data['value']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats/5511999999999/tags/10/remove" \
  -H "Client-Token: seu-token-de-seguranca"
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
| `value` | boolean | `true` if the operation was successful, `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Ensure you are using `PUT` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Chat or tag not found | Verify the number and `tagId` are correct |
| `400` | Invalid data | Verify the number is in the correct format (international format, no spaces) |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Multi-Devices required**: This method requires the instance to be connected to the Multi-Devices version of WhatsApp
- **WhatsApp Business**: Requires a configured WhatsApp Business account
- **Phone number format**: Use international format without spaces or special characters (ex: `5511999999999`)
- **Tag ID**: Use the ID returned when creating the tag or obtain it through the [Search Tags API](/docs/whatsapp-business/buscar-etiquetas)
- **Unassigned Tag**: The operation will still be successful if the tag is not assigned to the chat

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Assign Tags](/docs/whatsapp-business/atribuir-etiquetas) - Add tags to a chat
- [Search Tags](/docs/whatsapp-business/buscar-etiquetas) - List all available tags
- [Create Tag](/docs/whatsapp-business/criar-etiqueta) - Create a new tag
- [Edit Tag](/docs/whatsapp-business/editar-etiqueta) - Update a tag