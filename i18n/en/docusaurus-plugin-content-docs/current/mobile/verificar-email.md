---
id: verificar-email
sidebar_position: 14
title: Check Account Email
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MailCheck" size="lg" /> Verify Email of Account

Verify the email registered in your account using the verification code received.

---

## <Icon name="Info" size="md" /> Conception {#conceituation}

This method is used to perform email verification of the account. You can register an email in your WhatsApp account through the [Register Email](/docs/mobile/cadastrar-email) API. After registering, you will receive a verification code at the registered email address. Use this method to verify the email with the received code.

:::caution Caution
This API is available only for mobile instances.
:::

**Full Flow**:
1. [Register Email](/docs/mobile/cadastrar-email) - Register email in the account
2. Receive verification code at the email
3. **Verify Email** (this method) - Verify email with the received code

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/security/verify-email
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#attributes}

### Required

| Attribute | Type | Description |
|----------|------|------------|
| `verificationCode` | string | Verification code sent to the email that was registered in the account |

---

## <Icon name="Code" size="md" /> Examples {#examples}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/verify-email
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "verificationCode": "123456"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Após receber o código de verificação no email
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/verify-email',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      verificationCode: '123456', // Código recebido no email
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Email verificado com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/verify-email"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Após receber o código de verificação no email
payload = {
    "verificationCode": "123456"  # Código recebido no email
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Email verificado com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/verify-email" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "verificationCode": "123456"
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

### <Icon name="AlertCircle" size="sm" /> Error Codes {#errors}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `400` | Invalid request | Check if the data you are sending is in accordance with what is documented above |
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `415` | Content-Type missing | Add `Content-Type: application/json` to the header |

---

## <Icon name="Info" size="md" /> Notes {#notes}

- **Mobile Instances**: This API is available only for mobile instances
- **Verification Code**: The code is sent to the registered email address after using the [Register Email](/docs/mobile/cadastrar-email) API
- **Code Validity**: The verification code has a limited validity. If it expires, you will need to register the email again
- **Email Verified**: After verifying the email, you can use it to retrieve the PIN code using the [Retrieve PIN Code](/docs/mobile/recuperacao-codigo-pin) API

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#related-resources}

- [Register Email](/docs/mobile/cadastrar-email) - Register email in the account
- [Get Email](/docs/mobile/buscar-email) - View registered email and verification status
- [Remove Email](/docs/mobile/remover-email) - Remove email from the account
- [Retrieve PIN Code](/docs/mobile/recuperacao-codigo-pin) - Use verified email to retrieve PIN code