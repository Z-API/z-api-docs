---
id: remover-codigo-pin
sidebar_position: 13
title: Remove PIN Code
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="KeyRound" size="lg" /> Remove Code PIN

Remove the security code PIN from your WhatsApp account.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is used to remove the security code PIN from the account. After removal, you will no longer need to confirm the code PIN during the registration process.

:::caution Caution
This API is available only for mobile instances.
:::

**Important**:
- After removing the code PIN, two-factor authentication will be disabled
- You can register a new code PIN using the [Register Code PIN](/docs/mobile/cadastrar-codigo-pin) API
- Removing the code PIN reduces the security of the account

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/security/two-fa-code/remove
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code/remove
Content-Type: application/json
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code/remove',
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
  console.log('Código PIN removido com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code/remove"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.post(url, headers=headers)
data = response.json()

if data.get('success'):
    print('Código PIN removido com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/two-fa-code/remove" \
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
| `success` | boolean | Defines if the request was executed successfully |
| `message` | string | In case of failure, returns a message about the error |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `400` | Invalid request | Check if the data you are sending is in accordance with what is documented above |
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Mobile Instances**: This API is available only for mobile instances
- **Security**: Removing the code PIN reduces the security of the account. Consider keeping the code PIN enabled
- **Re-registration**: You can register a new code PIN using the [Register Code PIN](/docs/mobile/cadastrar-codigo-pin) API
- **During registration**: After removing the code PIN, you will no longer need to confirm it during the registration process

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Register Code PIN](/docs/mobile/cadastrar-codigo-pin) - Register code PIN in the account
- [Check if Has Code PIN](/docs/mobile/verificar-codigo-pin) - Check if the account has a code PIN
- [Confirm Code PIN](/docs/mobile/confirmar-codigo-pin) - Confirm code PIN during registration