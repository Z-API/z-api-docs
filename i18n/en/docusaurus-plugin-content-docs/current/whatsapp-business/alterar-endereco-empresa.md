---
id: alterar-endereco-empresa
sidebar_position: 14
title: Change Company Address
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MapPin" size="lg" /> Change Company Address

Update the commercial address of your company in WhatsApp Business.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to change the commercial address of your company/companhia in your WhatsApp Business profile. The address is publicly displayed on your Business account profile.

:::important Important
This method is available only for WhatsApp Business accounts.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/company-address
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
| `value` | string | Company address |

:::tip Tip
To remove the address, simply send the attribute `value` as empty (`""`).
:::

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/company-address
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "value": "Endereço da empresa"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/company-address',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      value: 'Endereço da empresa',
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

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/company-address"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "value": "Endereço da empresa"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['success']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/company-address" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "value": "Endereço da empresa"
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
| `403` | Non-Business account | Verify if your account is a WhatsApp Business account |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **WhatsApp Business required**: This method requires a configured WhatsApp Business account
- **Multi-Devices**: Works only with instances connected to the Multi-Devices version
- **Public address**: The address is publicly displayed on your Business account profile
- **Remove address**: To remove the address, send `value` as an empty string (`""`)

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Account Data](/docs/whatsapp-business/dados-conta) - View all public account information
- [Change Company Description](/docs/whatsapp-business/alterar-descricao-empresa) - Update description
- [Change Company Email](/docs/whatsapp-business/alterar-email-empresa) - Update contact email
- [Change Company Websites](/docs/whatsapp-business/alterar-websites-empresa) - Update websites