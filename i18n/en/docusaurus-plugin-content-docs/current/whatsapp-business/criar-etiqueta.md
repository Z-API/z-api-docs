---
id: criar-etiqueta
sidebar_position: 9
title: Create Label
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Tag" size="lg" /> Create Tag

Create a new tag to organize and categorize conversations in WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to create a new tag (tag) in your WhatsApp Business. When you create a tag, it becomes available for use by assigning it to a chat, allowing you to organize and categorize your conversations more efficiently.

:::important Important
This method is only available for WhatsApp Business accounts.
:::

**Use cases**:
- Organizing conversations by category (e.g., "VIP Customer", "Pending Response")
- Marking conversations by status (e.g., "Negotiation in Progress", "Closed")
- Creating custom filters to better manage your contacts

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/create-tag
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
| `name` | string | Name of the tag to be created |

### Optional

| Attribute | Type | Description |
|----------|------|------------|
| `color` | number | Key (index) of the desired color. This value should be set according to the available colors, which can be found in the [Tag Colors API](/docs/whatsapp-business/cores-etiquetas) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Create tag without color**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/create-tag
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "name": "Nome da etiqueta"
}
```

**Create tag with color**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/create-tag
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "name": "Nome da etiqueta",
  "color": 1
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Criar etiqueta sem cor
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/create-tag',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      name: 'Nome da etiqueta',
      // color: 1  // Opcional: adicione a cor se desejar
    }),
  }
);

const data = await response.json();
console.log('ID da etiqueta criada:', data.id);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/create-tag"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Criar etiqueta sem cor
payload = {
    "name": "Nome da etiqueta"
    # "color": 1  # Opcional: adicione a cor se desejar
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"ID da etiqueta criada: {data['id']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

**Create tag without color**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/create-tag" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "name": "Nome da etiqueta"
  }'
```

**Create tag with color**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/create-tag" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "name": "Nome da etiqueta",
    "color": 1
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "id": "10"
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `id` | string | ID of the tag that was created. Use this ID for editing, deleting or assigning the tag to chats |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if the `name` was provided and if `color` (if provided) is a valid number |
| `403` | Non Business account | Check if your account is a WhatsApp Business account |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business required**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Available colors**: Use the [Tag Colors API](/docs/whatsapp-business/cores-etiquetas) to see which colors are available
- **Tag ID**: Save the returned ID for use in future operations (edit, delete, assign)
- **Unique names**: Avoid creating tags with duplicate names to facilitate organization

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Retrieve Tags](/docs/whatsapp-business/buscar-etiquetas) - List all created tags
- [Edit Tag](/docs/whatsapp-business/editar-etiqueta) - Update name or color of a tag
- [Delete Tag](/docs/whatsapp-business/deletar-etiqueta) - Remove a tag
- [Tag Colors](/docs/whatsapp-business/cores-etiquetas) - See available colors for tags
- [Assign Tags](/docs/whatsapp-business/atribuir-etiquetas) - Add tags to chats