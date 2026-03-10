---
id: atualizar-todos
sidebar_position: 1
title: Update All Webhooks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Webhook" size="lg" /> Update All Webhooks

Change all webhooks to the same URL at once through the Z-API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This endpoint serves for you who want to change all webhooks to the same URL at once. This is useful when you want to configure all webhooks of your instance to point to the same endpoint.

:::caution Caution

Z-API does not accept webhooks that are not HTTPS.

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
PUT /instances/{instanceId}/token/{token}/update-every-webhooks
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
| `value` | string | Webhook endpoint (must be HTTPS) |

### Optional

| Attribute | Type | Description |
|----------|------|------------|
| `notifySentByMe` | boolean | Activate webhook for received and sent messages by me (default: `false`) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Update all webhooks**:

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-every-webhooks
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/status",
  "notifySentByMe": true
}
```

**Update without notifying messages sent by me**:

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-every-webhooks
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/status"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-every-webhooks',
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      value: 'https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/status',
      notifySentByMe: true, // Opcional: ativar webhook de mensagens enviadas por mim
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Todos os webhooks atualizados com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-every-webhooks"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/status",
    "notifySentByMe": True  # Opcional: ativar webhook de mensagens enviadas por mim
}

response = requests.put(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Todos os webhooks atualizados com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-every-webhooks" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/status",
    "notifySentByMe": true
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
| `value` | boolean | Confirmation of action (`true` if successful, `false` in case of failure) |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `PUT` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `value` was provided correctly and that the URL is HTTPS |
| `400` | Invalid URL | The URL must be HTTPS. HTTP URLs are not accepted |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **HTTPS required**: Z-API does not accept webhooks that are not HTTPS. Make sure your URL starts with `https://`
- **All webhooks**: This endpoint updates all webhooks of the instance to the same URL
- **notifySentByMe**: If `true`, you will receive webhooks for messages received and sent by you. If `false` or not provided, only received messages will be notified
- **Replacement**: This operation replaces the URL of all previously configured webhooks

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Introduction to Webhooks](/docs/webhooks/webhooksConf/introduction) - Webhook configuration
- [Update Receipt Webhook](/docs/webhooks/webhooksConf/update-webhook-receive) - Update receipt webhook
- [Update Status Webhook](/docs/webhooks/webhooksConf/update-webhook-message-status) - Update message status webhook
- [Webhooks](/docs/webhooks/introducao) - Complete documentation on webhooks