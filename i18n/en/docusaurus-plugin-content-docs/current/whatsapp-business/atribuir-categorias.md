---
id: atribuir-categorias
sidebar_position: 16
title: Assign Categories
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FolderTree" size="lg" /> Assign Categories

Assign categories to your business on WhatsApp Business for better identification and classification.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to assign categories to your business in the WhatsApp Business profile. Categories help customers find and better understand the type of business.

:::important Important
This method is available only for WhatsApp Business accounts.
:::

:::warning Attention
You can register a maximum of 3 categories for your company, but at least one must be present.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/categories
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
| `categories` | array[string] | Array with IDs or labels of the categories to be assigned. Can be obtained from the API [List Categories](/docs/whatsapp-business/listar-categorias) |

:::important Important
The values sent in the attribute `categories` must be **equal** to those returned in the "List Categories" request, in the property `id` or `label`. The property `id` is useful when the `label` is not returned. Only in this way can you identify the desired category to be assigned.
:::

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/categories
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "categories": ["RESTAURANT", "FINANCE", "629412378414563"]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/categories',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      categories: ['RESTAURANT', 'FINANCE', '629412378414563'],
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

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/categories"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "categories": ["RESTAURANT", "FINANCE", "629412378414563"]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/categories" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "categories": ["RESTAURANT", "FINANCE", "629412378414563"]
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 201 Created {#201-created}

```json
{
  "success": true
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `success` | boolean | `true` if the operation was successful, `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Content-Type missing | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `categories` was provided, that it has at least 1 category and no more than 3, and that the values match those returned by the List Categories API (can be `id` or `label`) |
| `403` | Non-Business account | Check if your account is a WhatsApp Business account |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business required**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Minimum and maximum**: You must have at least 1 category and no more than 3 categories
- **IDs or Labels**: Use values returned by the [List Categories](/docs/whatsapp-business/listar-categorias) API (can be `id` or `label`)
- **Valid Categories**: Make sure the categories exist and are available before assigning them

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [List Categories](/docs/whatsapp-business/listar-categorias) - See all available categories
- [Account Data](/docs/whatsapp-business/dados-conta) - See all public account information
- [Change Company Description](/docs/whatsapp-business/alterar-descricao-empresa) - Update description