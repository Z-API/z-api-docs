---
id: solicitar-desbanimento
sidebar_position: 3
title: Request Unban
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Unlock" size="lg" /> Request Unbanning

Request unbanning of a number that was banned by WhatsApp.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is used to request unbanning of a number. When a number is banned, you will receive an `appealToken` in the response from the [Check Availability](/docs/mobile/verificar-disponibilidade) API. Use this token to request unbanning together with WhatsApp.

**Flow**:
1. [Check Availability](/docs/mobile/verificar-disponibilidade) - If the number is banned, you will receive an `appealToken`
2. **Request Unbanning** (this method) - Use the `appealToken` to request unbanning
3. Wait for WhatsApp's analysis

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/mobile/request-unbanning
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
| `appealToken` | string | Token for unbanning a specific number. Obtained in the response from the [Check Availability](/docs/mobile/verificar-disponibilidade) API when the number is banned |
| `description` | string | Description to be sent for WhatsApp's analysis. Explain the reason for the ban and why you believe the number should be unbanned |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-unbanning
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "appealToken": "Ae0B_6FfVfyB8on0v76ALf1RkWXFFsfvliOdh02JyXTFcbnlTAwO5_h5Ju4L5zfa-fhWKIzQhtXYhZTGRZxwYE3_iPgJ0nimuOkjrZLvnBOf-5Sitf2zmJJRs--1EJc5mvYRA1qJnHyktSBM7ZQWrsV9Lddyrj0TyCMKa_nXhvHwNfg8n5yz7tita5s",
  "description": "Estava conversando normalmente e fui banido"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Após verificar disponibilidade e receber appealToken
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-unbanning',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      appealToken: 'Ae0B_6FfVfyB8on0v76ALf1RkWXFFsfvliOdh02JyXTFcbnlTAwO5_h5Ju4L5zfa-fhWKIzQhtXYhZTGRZxwYE3_iPgJ0nimuOkjrZLvnBOf-5Sitf2zmJJRs--1EJc5mvYRA1qJnHyktSBM7ZQWrsV9Lddyrj0TyCMKa_nXhvHwNfg8n5yz7tita5s',
      description: 'Estava conversando normalmente e fui banido. Gostaria de solicitar uma revisão do banimento.',
    }),
  }
);

const data = await response.json();
if (data.success) {
  if (data.status === 'IN_REVIEW') {
    console.log('Solicitação de desbanimento enviada! Aguardando análise do WhatsApp.');
  } else if (data.status === 'UNBANNED') {
    console.log('Número desbanido! Você pode tentar registrar novamente.');
  }
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-unbanning"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Após verificar disponibilidade e receber appealToken
payload = {
    "appealToken": "Ae0B_6FfVfyB8on0v76ALf1RkWXFFsfvliOdh02JyXTFcbnlTAwO5_h5Ju4L5zfa-fhWKIzQhtXYhZTGRZxwYE3_iPgJ0nimuOkjrZLvnBOf-5Sitf2zmJJRs--1EJc5mvYRA1qJnHyktSBM7ZQWrsV9Lddyrj0TyCMKa_nXhvHwNfg8n5yz7tita5s",
    "description": "Estava conversando normalmente e fui banido. Gostaria de solicitar uma revisão do banimento."
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    if data.get('status') == 'IN_REVIEW':
        print('Solicitação de desbanimento enviada! Aguardando análise do WhatsApp.')
    elif data.get('status') == 'UNBANNED':
        print('Número desbanido! Você pode tentar registrar novamente.')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/request-unbanning" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "appealToken": "Ae0B_6FfVfyB8on0v76ALf1RkWXFFsfvliOdh02JyXTFcbnlTAwO5_h5Ju4L5zfa-fhWKIzQhtXYhZTGRZxwYE3_iPgJ0nimuOkjrZLvnBOf-5Sitf2zmJJRs--1EJc5mvYRA1qJnHyktSBM7ZQWrsV9Lddyrj0TyCMKa_nXhvHwNfg8n5yz7tita5s",
    "description": "Estava conversando normalmente e fui banido"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

**Success Case - Under Analysis**:

```json
{
  "success": true,
  "status": "IN_REVIEW"
}
```

**Success Case - Unbanned**:

```json
{
  "success": true,
  "status": "UNBANNED"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|------------|
| `success` | boolean | Returns `true` if the request was successful |
| `status` | string | Status of the unbanning request. Possible values: `"IN_REVIEW"` (under analysis), `"UNBANNED"` (unbanned)

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|--------------|
| `400` | Invalid request | Check if the data you are sending matches what is documented above |
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Mobile Instances**: This API is available only for mobile instances
- **AppealToken**: The `appealToken` is obtained in the response from the [Check Availability](/docs/mobile/verificar-disponibilidade) API when the number is banned
- **Description**: Provide a clear and honest description of the reason for the ban and why you believe the number should be unbanned
- **Analysis**: WhatsApp will analyze the request, which may take some time to respond
- **Status**: Monitor the status of the request. If it is `UNBANNED`, you can try registering the number again

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Check Availability](/docs/mobile/verificar-disponibilidade) - Check if the number is banned and obtain `appealToken`
- [Request Code](/docs/mobile/solicitar-codigo) - Request code after unbanning