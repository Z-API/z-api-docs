---
id: alterar-websites-empresa
title: Change Company Websites
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Globe" size="lg" /> Change Company Websites

Update your company websites on WhatsApp Business.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method allows you to change the company websites on your WhatsApp Business profile. The websites are publicly displayed on your Business account profile and allow you to direct customers to your web pages.

:::important Important
This method is only available for WhatsApp Business accounts.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/company-websites
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
| `websites` | array[string] | Array containing the company's website URLs |

:::warning Website Limit
The company can only have **2 (two)** registered websites. Sending more than two items in the request will result in an error.
:::

:::important URL Format
URLs must be valid and complete (including `http://` or `https://`). Invalid URLs will result in an error.
:::

:::tip Tip
To remove all websites, simply send the `websites` attribute as an empty array `[]` or remove it from the request body by sending an empty object (depending on the exact implementation, but an empty array is more explicit).
:::

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/company-websites
Content-Type: application/json
Client-Token: your-security-token

{
  "websites": [
    "https://www.yourcompany.com",
    "https://shop.yourcompany.com"
  ]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/company-websites',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'your-security-token',
    },
    body: JSON.stringify({
      websites: [
        'https://www.yourcompany.com',
        'https://shop.yourcompany.com'
      ],
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

url = "https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/company-websites"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "your-security-token"
}

payload = {
    "websites": [
        "https://www.yourcompany.com",
        "https://shop.yourcompany.com"
    ]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Success: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/company-websites" \
  -H "Content-Type: application/json" \
  -H "Client-Token: your-security-token" \
  -d '{
    "websites": [
      "https://www.yourcompany.com",
      "https://shop.yourcompany.com"
    ]
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
| `405` | Incorrect HTTP method | Ensure you are using `POST` as specified |
| `401` | Invalid token | Check the `Client-Token` header |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid URL or Limit exceeded | Verify URLs are valid and you have not sent more than 2 websites |
| `403` | Non-Business account | Check if your account is a WhatsApp Business account |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business required**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Public websites**: Websites are publicly displayed on your Business account profile
- **Limit**: Maximum of 2 websites per account

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Account Data](/docs/whatsapp-business/dados-conta) - View all public account information
- [Change Company Email](/docs/whatsapp-business/alterar-email-empresa) - Update contact email
- [Change Company Address](/docs/whatsapp-business/alterar-endereco-empresa) - Update address
- [Change Company Description](/docs/whatsapp-business/alterar-descricao-empresa) - Update description