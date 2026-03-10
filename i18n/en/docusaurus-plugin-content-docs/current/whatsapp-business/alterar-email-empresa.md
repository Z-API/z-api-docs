---
id: alterar-email-empresa
sidebar_position: 18
title: Change Company Email
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Mail" size="lg" /> Change Company Email

Update the contact email for your company in WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to change the contact email for your company's/companhia profile in WhatsApp Business. The email is publicly displayed on your Business account and enables customers to contact you via email.

:::important Important
This method is available only for WhatsApp Business accounts.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/company-email
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Optional

| Attribute | Type | Description |
|----------|------|------------|
| `value` | string | Company email (must be in valid email format) |

:::important Email Format
The sent value must be in a valid email format. Filling this field with text that is not in the email format will result in an error.
:::

:::tip Tip
To remove the email, simply send the `value` attribute as empty (`""`).
:::

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/company-email
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "value": "email@example.com"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/company-email',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      value: 'email@example.com',
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

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/company-email"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "value": "email@example.com"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/company-email" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "value": "email@example.com"
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
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid email | Check if the email is in a valid format (ex: `usuario@dominio.com`) |
| `403` | Non-Business account | Check if your account is a WhatsApp Business account |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business required**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Public email**: The email is publicly displayed on your Business account profile
- **Valid format**: The email must be in a valid format (ex: `usuario@dominio.com`)
- **Remove email**: To remove the email, send the `value` attribute as an empty string (`""`)

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Account Data](/docs/whatsapp-business/dados-conta) - View all public account information
- [Change Company Address](/docs/whatsapp-business/alterar-endereco-empresa) - Update address
- [Change Company Description](/docs/whatsapp-business/alterar-descricao-empresa) - Update description
- [Change Company Websites](/docs/whatsapp-business/alterar-websites-empresa) - Update websites