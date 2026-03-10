---
id: cadastrar-email
sidebar_position: 10
title: Register Email in the Account
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MailPlus" size="lg" /> Register Email in Account

Register an email in your WhatsApp account for PIN code recovery.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is used to register an email in your WhatsApp account. This email can be used later for PIN code recovery from your account.

:::caution Attention
This API is available only for mobile instances.
:::

**Full Flow**:
1. **Register Email** (this method) - Register email in the account
2. Receive verification code on email
3. [Verify Email](/docs/mobile/verificar-email) - Verify email with received code

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/security/email
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
| `email` | string | Email to be registered in your WhatsApp account |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "email": "example@email.com"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      email: 'example@email.com',
    }),
  }
);

const data = await response.json();
if (data.success) {
  if (data.message === 'VERIFY_EMAIL') {
    console.log('Email cadastrado! Verifique sua caixa de entrada para o código de verificação.');
    // Use o código recebido no email com a API de verificar-email
  }
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "email": "example@email.com"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    if data.get('message') == 'VERIFY_EMAIL':
        print('Email cadastrado! Verifique sua caixa de entrada para o código de verificação.')
        # Use o código recebido no email com a API de verificar-email
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "email": "example@email.com"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "success": true,
  "message": "VERIFY_EMAIL"
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `success` | boolean | Defines if the request was executed successfully |
| `message` | string | In case of success, it may request email verification (`VERIFY_EMAIL`). Thus, an email will be sent to the address provided in the request, containing a code that should be used in the [Verify Email](/docs/mobile/verificar-email) API to complete the registration. In case of failure, it returns an error message |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `400` | Invalid request | Check if the data you are sending is in accordance with what is documented above |
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `415` | Missing Content-Type | Add `Content-Type: application/json` in the header |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Mobile Instances**: This API is available only for mobile instances
- **Mandatory Verification**: After registering the email, you will receive a verification code on your email. Use the [Verify Email](/docs/mobile/verificar-email) API to complete the registration
- **PIN Recovery**: The registered email can be used for PIN recovery using the [Recover PIN Code](/docs/mobile/recuperacao-codigo-pin) API
- **Unique Email**: Each account can have only one email registered

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Verify Email](/docs/mobile/verificar-email) - Verify email with received code
- [Get Email](/docs/mobile/buscar-email) - Get registered email in the account
- [Remove Email](/docs/mobile/remover-email) - Remove email from the account
- [Recover PIN Code](/docs/mobile/recuperacao-codigo-pin) - Use email to recover PIN code