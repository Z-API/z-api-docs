---
id: listar-categorias
title: List Categories
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="List" size="lg" /> List Categories

List the categories available to assign to your company via the Z-API.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

Through this method, you can list the categories available to assign to your company. Categories are used to classify and identify your business type on WhatsApp Business.

:::important Important

This method is only available for WhatsApp Business accounts.

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/business/available-categories
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Optional

| Attribute | Type | Description |
|-----------|------|-------------|
| `query` | string | Category search parameter. Example: `"technology"` |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**List all categories**:

```http
GET https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/available-categories
Client-Token: your-security-token
```

**Search categories by term**:

```http
GET https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/available-categories?query=tecnologia
Client-Token: your-security-token
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// List all categories
const response = await fetch(
  'https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/available-categories',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'your-security-token',
    },
  }
);

const categories = await response.json();
console.log('Available categories:', categories);

// Search categories by term
const searchResponse = await fetch(
  'https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/available-categories?query=tecnologia',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'your-security-token',
    },
  }
);

const searchResults = await searchResponse.json();
console.log('Categories found:', searchResults);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/available-categories"
headers = {
    "Client-Token": "your-security-token"
}

# List all categories
response = requests.get(url, headers=headers)
categories = response.json()
print('Available categories:', categories)

# Search categories by term
params = {"query": "tecnologia"}
search_response = requests.get(url, headers=headers, params=params)
search_results = search_response.json()
print('Categories found:', search_results)
```

</TabItem>
<TabItem value="curl" label="cURL">

**List all categories**:

```bash
curl -X GET "https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/available-categories" \
  -H "Client-Token: your-security-token"
```

**Search categories by term**:

```bash
curl -X GET "https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/available-categories?query=tecnologia" \
  -H "Client-Token: your-security-token"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
[
  {
    "displayName": "Other companies",
    "label": "OTHER_COMPANIES",
    "id": "629412378414563"
  },
  {
    "displayName": "Automotive service",
    "id": "1223524174334504"
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `displayName` | string | Category name to be displayed |
| `id` | string | Category identifier. Must be sent in the request to assign categories to the company |
| `label` | string \| undefined | Can also be provided in the request to assign categories to the company (optional) |

**Note**: The response is an array of objects, where each object represents an available category.

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to resolve |
|------|--------|----------------|
| `405` | Incorrect HTTP method | Ensure you are using `GET` as specified |
| `401` | Invalid token | Check the `Client-Token` header |
| `403` | Non-Business account | This method is only available for WhatsApp Business accounts |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Business Account**: This method is only available for WhatsApp Business accounts
- **Optional search**: Use the `query` parameter to search for categories by term (e.g., `"technology"`, `"service"`)
- **Using the ID**: The returned `id` should be used in the request to [Assign Categories](/docs/whatsapp-business/atribuir-categorias) to the company
- **Optional label**: Some categories may have a `label` that can also be used in the assignment
- **Response array**: The response always returns an array, even if empty

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Assign Categories](/docs/whatsapp-business/atribuir-categorias) - Assign categories to the company
- [Account Data](/docs/whatsapp-business/dados-conta) - View Business account information