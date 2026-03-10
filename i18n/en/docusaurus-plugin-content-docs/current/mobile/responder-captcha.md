---
id: responder-captcha
sidebar_position: 12
title: Answer Captcha
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Shield" size="lg" /> Example Captcha Response

Respond to the captcha required for sending the confirmation code during number registration.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is used to respond to the captcha required for sending the confirmation code. This method only becomes necessary if the API of [Request Code](/docs/mobile/solicitar-codigo) returns with the attribute `captcha`, which contains the base64 of the captcha image.

**Typical Flow**:
1. Check number availability
2. Request confirmation code
3. If `captcha` is returned, respond to the captcha using this method
4. Wait for receiving the code
5. Confirm received code

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/mobile/respond-captcha
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
| `captcha` | string | Confirmation captcha code. This captcha is displayed in the image returned by the request for the confirmation code |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/respond-captcha
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "captcha": "123456"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Após solicitar código e receber captcha na resposta
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/respond-captcha',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      captcha: '123456', // Código extraído da imagem captcha
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Captcha respondido com sucesso! Aguarde o código de confirmação.');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/respond-captcha"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Após solicitar código e receber captcha na resposta
payload = {
    "captcha": "123456"  # Código extraído da imagem captcha
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Captcha respondido com sucesso! Aguarde o código de confirmação.')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/respond-captcha" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "captcha": "123456"
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
| `success` | boolean | Returns `true` if the captcha has been correctly responded. Thus, wait for receiving the confirmation code and use it in the API of [Confirm Code](/docs/mobile/confirmar-codigo)

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `400` | Invalid request | Check if the data you are sending is in accordance with what is documented above |
| `405` | Incorrect HTTP method | Make sure to use `POST` as specified |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Mobile Instances**: This API is available only for mobile instances
- **Optional Captcha**: This method is only necessary if the API of [Request Code](/docs/mobile/solicitar-codigo) returns with the attribute `captcha`
- **Base64 Image**: The captcha is returned as a Base64 image in the response of requesting the confirmation code
- **Next Step**: After successfully responding to the captcha, wait for receiving the confirmation code and use the method [Confirm Code](/docs/mobile/confirmar-codigo)

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Request Code](/docs/mobile/solicitar-codigo) - Request confirmation code
- [Confirm Code](/docs/mobile/confirmar-codigo) - Confirm received code
- [Check Availability](/docs/mobile/verificar-disponibilidade) - Check if the number is available for registration