---
id: verificar-disponibilidade
sidebar_position: 1
title: Check Registration Availability
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckCircle2" size="lg" /> Verify Availability of Registration

Check if a number is available for registration in a mobile instance and get information about confirmation methods.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is used to verify the availability of registration for a number. This method must be **preceded** by the request to send the code method, as it not only searches for availability information but also sets up onboarding of the number in WhatsApp. Through this API you can also see the available methods for requesting the confirmation code, and know if the number is banned or not.

**Registration flow**:
1. **Verify Availability** (this method) - Check if the number is available
2. [Request Code](/docs/mobile/solicitar-codigo) - Request confirmation code
3. Receive code (SMS, voice or pop-up)
4. [Confirm Code](/docs/mobile/confirmar-codigo) - Confirm received code
5. If necessary, [Confirm PIN Code](/docs/mobile/confirmar-codigo-pin) - Confirm PIN code

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/mobile/registration-available
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
| `ddi` | string | DDI of the number (country code, ex: `"55"` for Brazil) |
| `phone` | string | Phone number you want to register. Should include only the **number with DDD** (Ex: `4499999999`), without formatting or mask |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/registration-available
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "ddi": "55",
  "phone": "4499999999"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/registration-available',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      ddi: '55', // Código do país
      phone: '4499999999', // Número com DDD, sem formatação
    }),
  }
);

const data = await response.json();
if (data.available) {
  console.log('Número disponível para registro!');
  console.log(`SMS disponível em: ${data.smsWaitSeconds}s`);
  console.log(`Voz disponível em: ${data.voiceWaitSeconds}s`);
} else if (data.blocked) {
  console.log('Número banido. Token de desbanimento:', data.appealToken);
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/registration-available"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "ddi": "55",  # Código do país
    "phone": "4499999999"  # Número com DDD, sem formatação
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('available'):
    print('Número disponível para registro!')
    print(f"SMS disponível em: {data['smsWaitSeconds']}s")
    print(f"Voz disponível em: {data['voiceWaitSeconds']}s")
elif data.get('blocked'):
    print(f'Número banido. Token de desbanimento: {data["appealToken"]}')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mobile/registration-available" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "ddi": "55",
    "phone": "4499999999"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

**Case of available number**:

```json
{
  "available": true,
  "smsWaitSeconds": 0,
  "voiceWaitSeconds": 0,
  "waOldWaitSeconds": 0,
  "waOldEligible": true
}
```

**Case of banned number**:

```json
{
  "available": false,
  "blocked": true,
  "appealToken": "Ae0B_6FfVfyB8on0v76ALf1RkWXFFsfvliOdh02JyXTFcbnlTAwO5_h5Ju4L5zfa-fhWKIzQhtXYhZTGRZxwYE3_iPgJ0nimuOkjrZLvnBOf-5Sitf2zmJJRs--1EJc5mvYRA1qJnHyktSBM7ZQWrsV9Lddyrj0TyCMKa_nXhvHwNfg8n5yz7tita5s"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|------------|
| `available` | boolean | Returns `true` if the number is available for registration. If the response is `false`, it will not be possible to proceed to the next step of registration |
| `blocked` | boolean | Defines if the number is banned or blocked for some other reason. If this is your case, use the attribute `appealToken` to [request unbanning](/docs/mobile/solicitar-desbanimento) |
| `appealToken` | string | In the case of a banned number, this attribute will be returned containing a token for requesting unbanning |
| `smsWaitSeconds` | number | Time to wait for **SMS** request. If the value is `0`, it means that the request can already be sent to this method |
| `voiceWaitSeconds` | number | Time to wait for **voice call** request. Same objective as `smsWaitSeconds` |
| `waOldWaitSeconds` | number | Time to wait for **pop-up in the mobile app** request. Same objective as `smsWaitSeconds` |
| `waOldEligible` | boolean | Defines if the method of requesting the code via **pop-up in the mobile app** is available |
| `reason` | string | In case of error, this attribute says the reason why the error occurred |

:::warning Attention
There are some scenarios where a number is prevented from being connected even in the official WhatsApp app. In these cases, the API to verify number availability cannot identify this and will return that the number is blocked only when requesting the code. Unfortunately, at the moment there is nothing we can do about it, as different from standard bans, no token (`appealToken`) is provided to make a request for unbanning.
:::

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to resolve |
|------|--------|---------------|
| `400` | Invalid request | Check if the data you are sending is in accordance with what is documented above |
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Mobile Instances**: This API is available only for mobile instances
- **Number format**: The number should include only DDD + number, without formatting (ex: `4499999999`, not `(44) 99999-9999`)
- **Confirmation methods**: Use the wait times (`smsWaitSeconds`, `voiceWaitSeconds`) to know when you can request a code for each method
- **Mobile app pop-up**: The `waOld` (mobile app pop-up) method only works if you have physical access to the mobile device where the number is linked
- **Banned number**: If the number is banned, use the `appealToken` to request unbanning

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Request Code](/docs/mobile/solicitar-codigo) - Request confirmation code
- [Confirm Code](/docs/mobile/confirmar-codigo) - Confirm received code
- [Request Unbanning](/docs/mobile/solicitar-desbanimento) - Request unbanning of a banned number

---