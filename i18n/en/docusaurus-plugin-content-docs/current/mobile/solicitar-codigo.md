---
id: solicitar-codigo
sidebar_position: 2
title: Request Confirmation Code
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MessageSquare" size="lg" /> Request Confirmation Code

Request the sending of the confirmation code to register a number in a mobile instance.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituation}

This method is used to request the sending of the confirmation code. To execute this method, it is necessary that you first [verify if the number is available](/docs/mobile/verificar-disponibilidade) to be registered. Without performing this verification beforehand, it will not be possible to request the code.

:::tip Attention
Do not forget that the phone number you send in this request is the same one you verified in the [previous API](/docs/mobile/verificar-disponibilidade). As a reminder, verifying if the number is available is mandatory to be able to request the confirmation code.
:::

**Available sending methods**:
- **SMS** (`sms`): Code sent via text message
- **Voice** (`voice`): Code sent via voice call
- **Pop-up in the app** (`wa_old`): Code displayed in a pop-up on WhatsApp (requires physical access to the phone)

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/mobile/request-registration-code
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
| `ddi` | string | DDI of the number (country code, ex: `"55"` for Brazil) |
| `phone` | string | Phone number you want to register. Should include only the **number with DDD** (Ex: `4499999999`), without formatting or mask |
| `method` | string | Defines the method of sending the code. Possible values: `"sms"` (SMS), `"voice"` (voice call), `"wa_old"` (pop-up in the WhatsApp app) |

---

## <Icon name="Code" size="md" /> Examples {#examples}

<Tabs>
<TabItem value="http" label="HTTP">

**Request code via SMS**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-registration-code
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "ddi": "55",
  "phone": "4499999999",
  "method": "sms"
}
```

**Request code via voice call**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-registration-code
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "ddi": "55",
  "phone": "4499999999",
  "method": "voice"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Solicitar código via SMS
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-registration-code',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      ddi: '55',
      phone: '4499999999', // Mesmo número usado em verificar-disponibilidade
      method: 'sms', // ou 'voice' ou 'wa_old'
    }),
  }
);

const data = await response.json();
if (data.success) {
  if (data.captcha) {
    console.log('Captcha necessário! Use a API de responder-captcha.');
    // data.captcha contém a imagem Base64 do captcha
  } else {
    console.log('Código solicitado com sucesso! Aguarde o recebimento.');
  }
} else if (data.blocked) {
  console.log('Número banido. Use o appealToken para solicitar desbanimento.');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-registration-code"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Solicitar código via SMS
payload = {
    "ddi": "55",
    "phone": "4499999999",  # Mesmo número usado em verificar-disponibilidade
    "method": "sms"  # ou "voice" ou "wa_old"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    if 'captcha' in data:
        print('Captcha necessário! Use a API de responder-captcha.')
        # data['captcha'] contém a imagem Base64 do captcha
    else:
        print('Código solicitado com sucesso! Aguarde o recebimento.')
elif data.get('blocked'):
    print('Número banido. Use o appealToken para solicitar desbanimento.')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-registration-code" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "ddi": "55",
    "phone": "4499999999",
    "method": "sms"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

**Success case**:

```json
{
  "success": true,
  "retryAfter": "165",
  "smsWaitSeconds": 125,
  "voiceWaitSeconds": 125,
  "waOldWaitSeconds": 125,
  "method": "sms"
}
```

**Captcha required case**:

```json
{
  "success": false,
  "captcha": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

**Banned number case**:

```json
{
  "success": false,
  "blocked": true
}
```

### Response Fields

| Field | Type | Description |
|-------|------|------------|
| `success` | boolean | Returns `true` if the code request was sent successfully. Check if you received the code and use it in the [Confirm Code](/docs/mobile/confirmar-codigo) API |
| `captcha` | string | Base64 image with captcha code. In case you receive this attribute, you will need to confirm this code in the [Answer Captcha](/docs/mobile/responder-captcha) API for the code to be actually sent. After confirming the captcha, there is no need to request the code again, just wait for its receipt |
| `blocked` | boolean | Defines if the number is banned or not |
| `retryAfter` | string | Time in seconds to wait for a new code request |
| `smsWaitSeconds` | number | Time to wait for an **SMS**. If the value is `0`, it means that the request can already be sent for this method |
| `voiceWaitSeconds` | number | Time to wait for a **voice call**. Same purpose as `smsWaitSeconds` |
| `waOldWaitSeconds` | number | Time to wait for a **pop-up in the app**. Same purpose as `smsWaitSeconds` |
| `method` | string | Code sending method used |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#errors}

| Code | Reason | How to resolve |
|------|--------|---------------|
| `400` | Invalid request | Check if the data you are sending is in accordance with what is documented above |
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |

---

## <Icon name="Info" size="md" /> Notes {#notes}

- **Mobile Instances**: This API is available only for mobile instances
- **Mandatory verification**: You must verify the availability of the number before requesting the code
- **Consistent number**: Use the same number that was verified in the Availability Check API
- **Captcha**: If you receive `captcha` in the response, use the [Answer Captcha](/docs/mobile/responder-captcha) API before waiting for the code
- **Waiting times**: Respect the waiting times (`smsWaitSeconds`, `voiceWaitSeconds`) before requesting a new code
- **Pop-up in the phone**: The `wa_old` method only works if you have physical access to the phone where the number is linked

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#related-resources}

- [Check Availability](/docs/mobile/verificar-disponibilidade) - Check if the number is available (mandatory before)
- [Answer Captcha](/docs/mobile/responder-captcha) - Answer captcha if required
- [Confirm Code](/docs/mobile/confirmar-codigo) - Confirm received code
- [Request Unban](/docs/mobile/solicitar-desbanimento) - Request unban if the number is banned