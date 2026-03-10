---
id: transferir-propriedade
sidebar_position: 30
title: Transfer Ownership of Channel
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Shuffle" size="lg" /> Transfer Property of Channel

Transfer the property of a channel to another administrator.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituation}

This method is responsible for transferring the ownership of a channel to another user, who must be an administrator of that channel. After the transfer, the new owner will have full control over the channel.

:::warning Attention
The property transfer is a permanent operation. Make sure that the recipient user is trustworthy and prepared to manage the channel.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/newsletter/transfer-ownership/{newsletterId}
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Your instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `newsletterId` | string | Channel ID (must contain the suffix `@newsletter`)) | `999999999999999999@newsletter` |

:::warning Attention
The channel ID always must contain the suffix `@newsletter`, as this is the standard used by WhatsApp itself.
:::

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#attributes}

### Required

| Attribute | Type | Description |
|----------|------|-------------|
| `phone` | string | Phone number of the user who will be promoted to channel owner (international format, no spaces) |

### Optional

| Attribute | Type | Description |
|----------|------|-------------|
| `quitAdmin` | boolean | Define if you will leave being an administrator of the channel after transferring the property. Default: `false` |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Transfer and remain as admin**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999"
}
```

**Transfer and leave as admin**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "quitAdmin": true
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const newsletterId = '999999999999999999@newsletter';

// Transferir e permanecer como admin
const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/${newsletterId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5511999999999',
      // quitAdmin: true  // Opcional: sair como admin após transferir
    }),
  }
);

const data = await response.json();
console.log('Sucesso:', data.value);
if (data.message) {
  console.log('Mensagem:', data.message);
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

newsletter_id = '999999999999999999@newsletter'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/{newsletter_id}"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Transferir e permanecer como admin
payload = {
    "phone": "5511999999999"
    # "quitAdmin": True  # Opcional: sair como admin após transferir
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['value']}")
if 'message' in data:
    print(f"Mensagem: {data['message']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/transfer-ownership/999999999999999999@newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5511999999999",
    "quitAdmin": true
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

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `value` | boolean | `true` in case of success, `false` in case of failure |
| `message` | string | In case of error, may return a message with information about the error |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `phone` was provided and that the number is in the correct format |
| `404` | Channel not found | Check if the channel ID is correct and contains the suffix `@newsletter` |

---

## <Icon name="Info" size="md" /> Notes {#notes}

- **Mandatory Suffix**: The channel ID always must contain the suffix `@newsletter`
- **Required Administrator**: The recipient user must be an administrator of the channel before the transfer
- **Phone Format**: Use international format without spaces or special characters (ex: `5511999999999`)
- **Remain as Admin**: By default, you will remain as an administrator after the transfer. Use `quitAdmin: true` to completely leave
- **Permanent Operation**: The property transfer cannot be easily reversed

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Promote Admin](/docs/partners/newsletter/promover-admin) - Promote user to admin
- [Remove Admin](/docs/partners/newsletter/remover-admin) - Remove admin from channel
- [Send Admin Invite](/docs/messages/convite-admin-canal) - Send invite to be admin
- [Accept Admin Invite](/docs/partners/newsletter/aceitar-convite-admin) - Accept admin invite