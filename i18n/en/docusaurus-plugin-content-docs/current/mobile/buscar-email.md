---
id: buscar-email
sidebar_position: 9
title: Search for Account Email
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Mail" size="lg" /> Search WhatsApp Account Email

Retrieve the email configured in your WhatsApp account.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is used to retrieve the email configured in your WhatsApp account. It's useful for verifying which email is linked to the account and whether it has been verified.

:::caution Caution
This API is available only for mobile instances.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/security/email
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
if (data.success) {
  if (data.hasEmail) {
    console.log(`Email: ${data.email}`);
    console.log(`Verificado: ${data.verified ? 'Sim' : 'Não'}`);
  } else {
    console.log('Nenhum email configurado na conta.');
  }
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.get(url, headers=headers)
data = response.json()

if data.get('success'):
    if data.get('hasEmail'):
        print(f"Email: {data['email']}")
        print(f"Verificado: {'Sim' if data['verified'] else 'Não'}")
    else:
        print('Nenhum email configurado na conta.')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

**Case with configured and verified email**:

```json
{
  "success": true,
  "hasEmail": true,
  "email": "example@email.com",
  "verified": true
}
```

**Case with configured but unverified email**:

```json
{
  "success": true,
  "hasEmail": true,
  "email": "example@email.com",
  "verified": false
}
```

**Case without configured email**:

```json
{
  "success": true,
  "hasEmail": false
}
```

### Response Fields

| Field | Type | Description |
|-------|------|------------|
| `success` | boolean | Indicates whether the request was executed successfully |
| `hasEmail` | boolean | Indicates whether an email is configured in the account |
| `email` | string | Configured email in the account (only if `hasEmail` is `true`) |
| `verified` | boolean | Indicates whether the email is verified (only if `hasEmail` is `true`) |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|--------------|
| `405` | Incorrect HTTP method | Ensure you are using `GET` as specified |
| `401` | Invalid token | Check the header `Client-Token`

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Mobile Instances**: This API is available only for mobile instances
- **Unverified Email**: If the email is not verified, you can use the [Verify Email](/docs/mobile/verificar-email) method to verify it
- **No Email**: If there is no email configured, you can use the [Register Email](/docs/mobile/cadastrar-email) method to configure it

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Register Email](/docs/mobile/cadastrar-email) - Configure email in the account
- [Verify Email](/docs/mobile/verificar-email) - Verify email of the account
- [Remove Email](/docs/mobile/remover-email) - Remove email from the account