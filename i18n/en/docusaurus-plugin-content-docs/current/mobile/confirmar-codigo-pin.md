---
id: confirmar-codigo-pin
sidebar_position: 5
title: Confirm PIN Code
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Lock" size="lg" /> Confirm Code PIN

Confirm the verification code PIN to complete the number connection.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method is used to confirm the code PIN of your account. This method is only required if you have enabled two-factor authentication on WhatsApp. If this is the case, it is necessary that this code PIN be confirmed; otherwise, it will not be possible to connect the number in a mobile instance.

**When to use**:
- After confirming the confirmation code, if the response contains `confirmSecurityCode: true`
- During the registration process of a mobile instance
- If your WhatsApp account has two-factor authentication enabled

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/mobile/confirm-pin-code
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
| `code` | string | Two-factor authentication code PIN (usually 6 digits) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-pin-code
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "code": "123456"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Após confirmar código e receber confirmSecurityCode: true
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-pin-code',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      code: '123456', // Código PIN de verificação em duas etapas
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Código PIN confirmado! Instância conectada com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-pin-code"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Após confirmar código e receber confirmSecurityCode: true
payload = {
    "code": "123456"  # Código PIN de verificação em duas etapas
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Código PIN confirmado! Instância conectada com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-pin-code" \
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
| `success` | boolean | Returns `true` if the code has been confirmed correctly. After that, the instance will be connected |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to solve |
|------|--------|--------------|
| `400` | Invalid request | Check if the data you are sending matches what is documented above |
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Mobile Instances**: This API is available only for mobile instances
- **Two-Factor Authentication**: This method is only required if your WhatsApp account has two-factor authentication enabled
- **Code PIN**: The code PIN is the same you configured in WhatsApp for two-factor authentication
- **Connection**: After confirming the code PIN, the instance will be connected and ready to use
- **Forgot PIN**: If you forgot the code PIN, use the [PIN Recovery](/docs/mobile/recuperacao-codigo-pin) method

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Confirm Code](/docs/mobile/confirmar-codigo) - Confirm the confirmation code received
- [PIN Recovery](/docs/mobile/recuperacao-codigo-pin) - Request PIN recovery
- [Check if Has Code PIN](/docs/mobile/verificar-codigo-pin) - Check if the account has a registered code PIN
- [Register Code PIN](/docs/mobile/cadastrar-codigo-pin) - Register code PIN in the account