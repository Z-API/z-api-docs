---
id: confirmar-codigo
sidebar_position: 4
title: Confirm Code
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckCircle" size="lg" /> Confirm Code

Please confirm the code you received to connect the number to the mobile instance.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituation}

This method is used for confirming the code you received. To use this method, you need to complete the previous registration steps, which involve verifying the availability of the number and requesting the confirmation code. After receiving the code, you can use this route to perform the confirmation and connection of the number to the mobile instance.

**Full Flow**:
1. [Check Availability](/docs/mobile/verificar-disponibilidade) - Check if the number is available
2. [Request Code](/docs/mobile/solicitar-codigo) - Request confirmation code (SMS, voice or pop-up)
3. Receive code on your phone
4. **Confirm Code** (this method) - Confirm the received code
5. If necessary, [Confirm PIN Code](/docs/mobile/confirmar-codigo-pin) - Confirm verification PIN code in two steps

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/mobile/confirm-registration-code
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
| `code` | string | Confirmation code received (usually 6 digits) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-registration-code
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "code": "123456"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Após receber o código de confirmação
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-registration-code',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      code: '123456', // Código recebido via SMS, voz ou pop-up
    }),
  }
);

const data = await response.json();
if (data.success) {
  if (data.confirmSecurityCode) {
    console.log('Código confirmado! Agora confirme o código PIN de verificação em duas etapas.');
  } else {
    console.log('Código confirmado! Instância conectada com sucesso!');
  }
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-registration-code"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Após receber o código de confirmação
payload = {
    "code": "123456"  # Código recebido via SMS, voz ou pop-up
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    if data.get('confirmSecurityCode'):
        print('Código confirmado! Agora confirme o código PIN de verificação em duas etapas.')
    else:
        print('Código confirmado! Instância conectada com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/confirm-registration-code" \
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

**Case 1: Code confirmed and instance connected**:

```json
{
  "success": true
}
```

**Case 2: Code confirmed, but requires PIN confirmation**:

```json
{
  "success": false,
  "confirmSecurityCode": true
}
```

### Response Fields

| Field | Type | Description |
|-------|------|------------|
| `success` | boolean | Returns `true` if the code has been confirmed correctly. In this case, the instance will be connected |
| `confirmSecurityCode` | boolean | Returns `true` if two-step verification code confirmation is required. In this case, use the [Confirm PIN Code](/docs/mobile/confirmar-codigo-pin) method |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `400` | Invalid request | Check if the data you are sending matches what is documented above |
| `405` | Incorrect HTTP method | Make sure to use `POST` as specified |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Mobile Instances**: This API is available only for mobile instances
- **PIN Code**: If the response contains `confirmSecurityCode: true`, you will need to confirm the PIN code using the [Confirm PIN Code](/docs/mobile/confirmar-codigo-pin) method
- **Connection**: After confirming the code (and the PIN, if necessary), the instance will be connected and ready for use
- **Expired Code**: Confirmation codes have a limited validity. If the code expires, request a new one

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Check Availability](/docs/mobile/verificar-disponibilidade) - Check if the number is available for registration
- [Request Code](/docs/mobile/solicitar-codigo) - Request confirmation code
- [Confirm PIN Code](/docs/mobile/confirmar-codigo-pin) - Confirm verification PIN code in two steps
- [Answer Captcha](/docs/mobile/responder-captcha) - Answer captcha if necessary