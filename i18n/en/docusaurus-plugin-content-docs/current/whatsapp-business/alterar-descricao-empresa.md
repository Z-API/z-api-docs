---
id: alterar-descricao-empresa
title: Change Company Description
sidebar_position: 17
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="FileText" size="lg" /> Change Company Description

Update your company description on WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to change the company description in your WhatsApp Business profile. The description is publicly displayed on your Business account profile and helps customers better understand your business.

:::important Important
This method is only available for WhatsApp Business accounts.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/company-description
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|-------------|-----------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Must be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Optional

| Attribute | Type | Description |
|----------|------|-----------|
| `value` | string | Company description |

:::tip Tip
To remove the description, simply send the `value` attribute as empty (`""`).
:::

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/company-description
Content-Type: application/json
Client-Token: your-security-token

{
  "value": "Description text"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/company-description',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'your-security-token',
    },
    body: JSON.stringify({
      value: 'Description text',
    }),
  }
);

const data = await response.json();
console.log('Success:', data.success);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/company-description"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "your-security-token"
}

payload = {
    "value": "Description text"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Success: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/company-description" \
  -H "Content-Type: application/json" \
  -H "Client-Token: your-security-token" \
  -d '{
    "value": "Description text"
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

### Response Fields

| Field | Type | Description |
|-------|------|-----------|
| `success` | boolean | `true` if the operation was successful, `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to resolve |
|--------|--------|---------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the `Client-Token` header |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `403` | Not a Business account | Verify if your account is a WhatsApp Business account |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business required**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Only works with instances connected to the Multi-Devices version
- **Public description**: The description is publicly displayed on your Business account profile
- **Remove description**: To remove the description, send `value` as an empty string (`""`)

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Account Data](/docs/whatsapp-business/dados-conta) - View all public account information
- [Change Company Address](/docs/whatsapp-business/alterar-endereco-empresa) - Update address
- [Change Company Email](/docs/whatsapp-business/alterar-email-empresa) - Update contact email
- [Change Company Websites](/docs/whatsapp-business/alterar-websites-empresa) - Update websites