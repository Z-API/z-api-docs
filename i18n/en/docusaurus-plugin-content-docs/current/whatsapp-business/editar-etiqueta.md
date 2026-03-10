---
id: editar-etiqueta
sidebar_position: 10
title: Edit Label
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="TagEdit" size="lg" /> Editar Label

Update the name or color of an existing label in your WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to edit an existing label, changing its name and /ou color. Useful for adjusting the organization of your labels as your needs change.

:::important Important
This method is available only for WhatsApp Business accounts.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/edit-tag/{{ID_DA_ETIQUETA}}
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Your instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `tagId` | string | ID of the label to be edited | `10` |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|-------------|
| `name` | string | New name of the label |

### Optional

| Attribute | Type | Description |
|----------|------|-------------|
| `color` | number | Key (index) of the new desired color. This value should be set according to the available colors, which can be found in the [Label Colors API](/docs/whatsapp-business/cores-etiquetas) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Edit only the name**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/edit-tag/10
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "name": "Nome da etiqueta"
}
```

**Edit name and color**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/edit-tag/10
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "name": "Nome da etiqueta",
  "color": 2
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const tagId = '10';

// Editar apenas o nome
const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/edit-tag/${tagId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      name: 'Nome da etiqueta',
      // color: 2  // Opcional: adicione a cor se desejar alterar
    }),
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

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/edit-tag/{tag_id}"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Editar apenas o nome
payload = {
    "name": "Nome da etiqueta"
    # "color": 2  # Opcional: adicione a cor se desejar alterar
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

**Edit only the name**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/edit-tag/10" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "name": "Nome da etiqueta"
  }'
```

**Edit name and color**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/edit-tag/10" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "name": "Nome da etiqueta",
    "color": 2
  }'
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

### Fields of the Response

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` if the operation was successful, `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if the `name` was provided and if `color` (if provided) is a valid number |
| `404` | Label not found | Check if the `tagId` exists |
| `403` | Non Business account | Check if your account is a WhatsApp Business account |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business required**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Label ID**: Use the ID returned when creating the label or get it through the [Find Labels API](/docs/whatsapp-business/buscar-etiquetas)
- **Available colors**: Use the [Label Colors API](/docs/whatsapp-business/cores-etiquetas) to see which colors are available
- **Partial update**: You can update only the name or only the color, it is not necessary to provide both

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Create Label](/docs/whatsapp-business/criar-etiqueta) - Create a new label
- [Find Labels](/docs/whatsapp-business/buscar-etiquetas) - List all labels
- [Delete Label](/docs/whatsapp-business/deletar-etiqueta) - Remove a label
- [Label Colors](/docs/whatsapp-business/cores-etiquetas) - See available colors