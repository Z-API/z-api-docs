---
id: verificar-codigo-pin
sidebar_position: 8
title: Check if you have a PIN code
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="ShieldCheck" size="lg" /> Verify if You Have a Code PIN

Check if your WhatsApp account has a registered security code PIN.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is used to check if your account has a registered security code PIN. Useful for verifying whether you will need to confirm the code PIN during the registration process.

:::caution Attention
This API is available only for mobile instances.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/security/two-fa-code
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
if (data.success) {
  if (data.hasCode) {
    console.log('A conta possui código PIN cadastrado.');
  } else {
    console.log('A conta não possui código PIN cadastrado.');
  }
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.get(url, headers=headers)
data = response.json()

if data.get('success'):
    if data.get('hasCode'):
        print('A conta possui código PIN cadastrado.')
    else:
        print('A conta não possui código PIN cadastrado.')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

**With a registered code PIN**:

```json
{
  "success": true,
  "hasCode": true
}
```

**Without a registered code PIN**:

```json
{
  "success": true,
  "hasCode": false
}
```

### Response Fields

| Field | Type | Description |
|-------|------|------------|
| `success` | boolean | Indicates whether the request was executed successfully |
| `hasCode` | boolean | Indicates whether the account has a registered code PIN |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `GET` as specified |
| `401` | Invalid token | Check the header `Client-Token`

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Mobile Instances**: This API is available only for mobile instances
- **Two-factor Authentication**: The code PIN is part of the WhatsApp two-factor authentication
- **During Registration**: If `hasCode` is `true`, you will need to confirm the code PIN after confirming the confirmation code
- **Register a PIN**: If there is no code PIN, you can register one using the [Register Code PIN](/docs/mobile/cadastrar-codigo-pin) method

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Confirm Code PIN](/docs/mobile/confirmar-codigo-pin) - Confirm code PIN during registration
- [Register Code PIN](/docs/mobile/cadastrar-codigo-pin) - Register a code PIN in your account
- [Remove Code PIN](/docs/mobile/remover-codigo-pin) - Remove the code PIN from your account
- [Recover Code PIN](/docs/mobile/recuperacao-codigo-pin) - Request recovery of the code PIN