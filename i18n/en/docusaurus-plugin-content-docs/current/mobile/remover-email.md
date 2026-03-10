---
id: remover-email
sidebar_position: 11
title: Remove Email from Account
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="MailMinus" size="lg" /> Remove Email from Account

Remove the email configured in your WhatsApp account.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is used to remove the email configured in your WhatsApp account. After removal, you will no longer be able to use this email for PIN code recovery.

:::caution Caution
This API is available only for mobile instances.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/security/email/remove
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
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email/remove
Content-Type: application/json
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email/remove',
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
  console.log('Email removido com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email/remove"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.post(url, headers=headers)
data = response.json()

if data.get('success'):
    print('Email removido com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/security/email/remove" \
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
  "success": true,
  "message": "REMOVED"
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `success` | boolean | Defines if the request was executed successfully |
| `message` | string | In case of failure, returns a message regarding the error. In case of success, may return a confirmation as `"REMOVED"` |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `400` | Invalid request | Check if the data you are sending is in accordance with what is documented above |
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `415` | Content-Type missing | Add `Content-Type: application/json` in the header |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Mobile Instances**: This API is available only for mobile instances
- **PIN Recovery**: After removing the email, you will no longer be able to use this email for PIN code recovery
- **Re-registration**: You can register a new email using the [Register Email](/docs/mobile/cadastrar-email) API

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Register Email](/docs/mobile/cadastrar-email) - Register email in the account
- [Get Email](/docs/mobile/buscar-email) - Check registered email in the account
- [Verify Email](/docs/mobile/verificar-email) - Verify email of the account