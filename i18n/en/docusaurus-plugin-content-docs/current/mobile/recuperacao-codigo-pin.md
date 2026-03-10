---
id: recuperacao-codigo-pin
sidebar_position: 6
title: PIN Code Recovery
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="KeyRound" size="lg" /> Recovery of PIN Code

Request the sending of an email for recovery of your WhatsApp account PIN code.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituation}

This method is used to request an email for recovery of your PIN code. This will be useful if you have set up two-step verification on WhatsApp and can no longer remember this code. In this way, WhatsApp will send a link to reset the PIN code in the email that you linked to your WhatsApp account.

**When to use**:
- During number registration, if you forgot the PIN code
- When you need to reset the PIN code for two-step verification
- If you do not have access to the configured PIN code

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/mobile/recovery-pin-code
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json`

---

## <Icon name="Code" size="md" /> Examples {#examples}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/recovery-pin-code
Content-Type: application/json
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Solicitar recuperação do código PIN
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/recovery-pin-code',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
if (data.success) {
  console.log('Email de recuperação enviado! Verifique sua caixa de entrada.');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/recovery-pin-code"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.post(url, headers=headers)
data = response.json()

if data.get('success'):
    print('Email de recuperação enviado! Verifique sua caixa de entrada.')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/recovery-pin-code" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca"
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
| `success` | boolean | Returns `true` if the recovery email has been sent |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#errors}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `400` | Invalid request | Check if the data you are sending is in accordance with what is documented above |
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `415` | Missing Content-Type | Add `Content-Type: application/json` in the header |

---

## <Icon name="Info" size="md" /> Notes {#notes}

- **Mobile Instances**: This API is available only for mobile instances
- **Linked Email**: The recovery email will be sent to the email linked to your WhatsApp account
- **Reset Link**: The email will contain a link to reset the PIN code
- **Email Verification**: Make sure you have access to the linked email
- **Processing Time**: The email may take several minutes to arrive

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#related-resources}

- [Confirm PIN Code](/docs/mobile/confirmar-codigo-pin) - Confirm PIN code during registration
- [Register PIN Code](/docs/mobile/cadastrar-codigo-pin) - Register new PIN code
- [Remove PIN Code](/docs/mobile/remover-codigo-pin) - Remove PIN code from account
- [Check if Has PIN Code](/docs/mobile/verificar-codigo-pin) - Check if the account has a PIN code