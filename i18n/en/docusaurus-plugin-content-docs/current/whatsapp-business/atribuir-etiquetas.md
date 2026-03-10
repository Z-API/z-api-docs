---
id: atribuir-etiquetas
sidebar_position: 12
title: Assign Labels
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="TagPlus" size="lg" /> Assign Labels

Assign a label to a chat in WhatsApp Business to organize and categorize your conversations.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method allows you to assign a label to a specific chat in WhatsApp Business. Labels are useful for organizing conversations, creating custom filters, and better managing your contacts.

:::important Important
This method is available only on devices connected to the Multi-Devices version of WhatsApp.
:::

**Use cases**:
- Mark important conversations (e.g., "VIP Customer")
- Organize by status (e.g., "Awaiting Response", "In Negotiation")
- Create custom categories (e.g., "Support", "Sales")

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
PUT https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/chats/{phone}/tags/{tag}/add
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Your instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `phone` | string | Chat phone number (international format, no spaces) | `5511999999999` |
| `tagId` | string | Label ID to be assigned | `10` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats/5511999999999/tags/10/add
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const phone = '5511999999999';
const tagId = '10';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats/${phone}/tags/${tagId}/add`,
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

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats/{phone}/tags/{tag_id}/add"
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
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats/5511999999999/tags/10/add" \
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

| Code | Reason | How to resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Ensure you are using `PUT` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Chat or label not found | Verify the number and `tagId` are correct |
| `400` | Invalid data | Verify the number is in the correct format (international format, no spaces) |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Multi-Devices required**: This method requires the instance to be connected to the Multi-Devices version of WhatsApp
- **WhatsApp Business**: Requires a configured WhatsApp Business account
- **Phone number format**: Use international format without spaces or special characters (e.g., `5511999999999`)
- **Label ID**: Use the ID returned when creating the label or get it through the [Search Labels API](/docs/whatsapp-business/buscar-etiquetas)
- **Multiple labels**: You can assign multiple labels to the same chat by making separate requests
- **Duplicate labels**: If the label is already assigned to the chat, the operation will still be successful

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Create Label](/docs/whatsapp-business/criar-etiqueta) - Create a new label
- [Search Labels](/docs/whatsapp-business/buscar-etiquetas) - List all available labels
- [Remove Labels](/docs/whatsapp-business/remover-etiquetas) - Remove labels from a chat
- [Label Colors](/docs/whatsapp-business/cores-etiquetas) - View available colors for labels