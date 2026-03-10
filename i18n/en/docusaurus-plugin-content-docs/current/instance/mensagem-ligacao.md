---
id: mensagem-ligacao
sidebar_position: 8
title: Call Message
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Phone" size="lg" /> Message of Rejection

Define the message that will be sent after rejecting a voice call received by the API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

Through this method, you define the message that will be sent after rejecting a voice call received by the API. This message will be automatically sent when a call is rejected.

:::important Important

For the message to be sent, the [Reject Calls](/docs/instance/rejeitar-chamadas) method needs to be active!

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
PUT /instances/{instanceId}/token/{token}/update-call-reject-message
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
| `value` | string | Message to be sent after rejecting the call |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-call-reject-message
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "value": "Mensagem de resposta"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-call-reject-message',
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      value: 'Desculpe, não posso atender no momento. Envie uma mensagem de texto.',
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Mensagem de ligação configurada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-call-reject-message"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "value": "Desculpe, não posso atender no momento. Envie uma mensagem de texto."
}

response = requests.put(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Mensagem de ligação configurada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-call-reject-message" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "value": "Desculpe, não posso atender no momento. Envie uma mensagem de texto."
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "value": true
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `value` | boolean | Confirmation of action (`true` if successful) |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `PUT` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `value` was provided correctly (must be a string) |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Prerequisite**: The [Reject Calls](/docs/instance/rejeitar-chamadas) method needs to be active for the message to be sent
- **Customized Message**: You can define any text message that will be sent after rejecting a call
- **Automatic Sending**: The message will be automatically sent when a call is rejected
- **Format**: The message should be a simple string of text

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Reject Calls](/docs/instance/rejeitar-chamadas) - Configure automatic call rejection
- [Instance Settings](/docs/instance/introducao) - Other instance settings