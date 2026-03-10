---
id: deletar-etiqueta
sidebar_position: 11
title: Delete Label
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="TagX" size="lg" /> Delete Label

Remove a label from your WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to delete an existing label. When a label is deleted, it is removed from all chats where it was assigned.

:::important Important
This method is available only for WhatsApp Business accounts.
:::

:::warning Attention
When deleting a label, it will be permanently removed and cannot be recovered. Make sure you really want to delete the label before performing this operation.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
DELETE https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/tag/{{ID_DA_ETIQUETA}}
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Your instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `tagId` | string | ID of the label to be deleted | `10` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
DELETE https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/tag/10
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const tagId = '10';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/tag/${tagId}`,
  {
    method: 'DELETE',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
console.log('Sucesso:', data.success);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

tag_id = '10'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/tag/{tag_id}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.delete(url, headers=headers)
data = response.json()
print(f"Sucesso: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X DELETE "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/tag/10" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "success": true
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` if the operation was successful, `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Make sure you are using `DELETE` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Label not found | Check if the `tagId` exists |
| `403` | Non Business account | Check if your account is a WhatsApp Business account |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business required**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Label ID**: Use the ID returned when creating the label or get it through the [Search Labels API](/docs/whatsapp-business/buscar-etiquetas)
- **Permanent removal**: The label will be permanently removed and cannot be recovered
- **Chat removal**: When a label is deleted, it is automatically removed from all chats where it was assigned

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Create Label](/docs/whatsapp-business/criar-etiqueta) - Create a new label
- [Edit Label](/docs/whatsapp-business/editar-etiqueta) - Update an existing label
- [Search Labels](/docs/whatsapp-business/buscar-etiquetas) - List all labels
- [Assign Labels](/docs/whatsapp-business/atribuir-etiquetas) - Add labels to chats