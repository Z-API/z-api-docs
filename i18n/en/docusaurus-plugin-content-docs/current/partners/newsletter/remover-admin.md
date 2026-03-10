---
id: remover-admin
sidebar_position: 14
title: Remove Administrator
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserX" size="lg" /> Remove Administrator

Remove a user from the administration of a newsletter channel.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for removing a user from the administration of the channel. After removal, the user will no longer have administrator permissions but will continue as a follower of the channel (if they were already following).

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/newsletter/remove-admin/{newsletterId}
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

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|-------------|
| `phone` | string | User's phone number to be removed from channel administration (international format, no spaces) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/remove-admin/999999999999999999@newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const newsletterId = '999999999999999999@newsletter';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/remove-admin/${newsletterId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5511999999999',
    }),
  }
);

const data = await response.json();
console.log('Administrador removido com sucesso');
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

newsletter_id = '999999999999999999@newsletter'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/remove-admin/{newsletter_id}"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "5511999999999"
}

response = requests.post(url, headers=headers, json=payload)
print("Administrador removido com sucesso")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/remove-admin/999999999999999999@newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5511999999999"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 201 Created {#201-created}

The successful response does not return a body, only the status code `201`.

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

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Required Suffix**: The channel ID always must contain the suffix `@newsletter`
- **Phone Format**: Use international format without spaces or special characters (ex: `5511999999999`)
- **Owner**: The channel owner cannot be removed from administration
- **Permissions**: Only the owner can remove administrators
- **Follower Status**: The user who was removed will continue as a follower of the channel (if they were already following)

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Promote Administrator](/docs/partners/newsletter/promover-admin) - Promote user to administrator
- [Send Admin Invite](/docs/messages/convite-admin-canal) - Send invite to be an administrator
- [Accept Admin Invite](/docs/partners/newsletter/aceitar-convite-admin) - Accept admin invitation
- [Cancel Admin Invite](/docs/partners/newsletter/anular-convite-admin) - Cancel pending invite