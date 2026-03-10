---
id: cadastrar-codigo-pin
sidebar_position: 7
title: Register PIN Code
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Key" size="lg" /> Register Security Code (PIN)

Register a security code PIN in your WhatsApp account for two-factor authentication.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method is used to register a security code PIN in your WhatsApp account. The code PIN is used for two-factor authentication and increases the security of your account.

:::caution Caution
This API is available only for mobile instances.
:::

**Important**:
- The code PIN must have at least 6 digits
- Choose a code that you can remember but is secure
- If you forget the code PIN, you can use the [PIN Recovery API](/docs/mobile/recuperacao-codigo-pin) if you have an email registered

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/security/two-fa-code
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
| `code` | string | Security code PIN to be registered in the account (usually 6 digits) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "code": "123456"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      code: '123456', // Código PIN escolhido
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Código PIN cadastrado com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "code": "123456"  # Código PIN escolhido
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Código PIN cadastrado com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "code": "123456"
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
|-------|------|------------|
| `success` | boolean | Defines if the request was executed successfully |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `400` | Invalid request | Check if the data you are sending is in accordance with what is documented above |
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `415` | Content-Type missing | Add `Content-Type: application/json` to the header |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Mobile Instances**: This API is available only for mobile instances
- **Security**: Choose a secure and memorable code PIN
- **During Registration**: If you already have a registered code PIN, you will need to confirm it during the registration process using the [Confirm Code PIN API](/docs/mobile/confirmar-codigo-pin)
- **Recovery**: If you forget your code PIN, you can use the [Code PIN Recovery API](/docs/mobile/recuperacao-codigo-pin) if you have an email registered
- **Removal**: You can remove the code PIN using the [Remove Code PIN API](/docs/mobile/remover-codigo-pin)

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Confirm Code PIN](/docs/mobile/confirmar-codigo-pin) - Confirm code PIN during registration
- [Check if Has Code PIN](/docs/mobile/verificar-codigo-pin) - Check if the account has a code PIN
- [Remove Code PIN](/docs/mobile/remover-codigo-pin) - Remove code PIN from the account
- [Code PIN Recovery](/docs/mobile/recuperacao-codigo-pin) - Recover forgotten code PIN