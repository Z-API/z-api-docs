---
id: redefinir-link
title: Reset Invite Link
sidebar_position: 13
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="RefreshCw" size="lg" /> Reset Invite Link

Reset the invite link for a community.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method allows you to reset the invite link for a community. When you reset the link, the previous link stops working and a new one is generated.

:::important Important
After resetting the link, the previous link no longer works. Make sure to share the new link with participants you wish to add to the community.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/redefine-invitation-link/{idDaComunidade}
```

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|------------|
| `idDaComunidade` | string | Yes | Community ID/Fone (obtained by listing or creating communities) |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account Security Token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/redefine-invitation-link/120363019502650977
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const idDaComunidade = '120363019502650977';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/redefine-invitation-link/${idDaComunidade}`,
  {
    method: 'POST',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
if (data.invitationLink) {
  console.log('Novo link de convite:', data.invitationLink);
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

id_da_comunidade = "120363019502650977"
url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/redefine-invitation-link/{id_da_comunidade}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.post(url, headers=headers)
data = response.json()

if data.get('invitationLink'):
    print(f"Novo link de convite: {data['invitationLink']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/redefine-invitation-link/120363019502650977" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "invitationLink": "https://chat.whatsapp.com/C1adgkdEGki7554BWDdMkd"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|------------|
| `invitationLink` | string | New invite link for the community |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Ensure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Community not found | Verify the `idDaComunidade` is correct |
| `403` | No permission | Only administrators can reset the invite link |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Previous Link**: The previous link stops working after resetting
- **New Link**: The new link is returned in the response and should be shared with participants
- **Permissions**: Only community administrators can reset the invite link
- **Link Format**: The returned link follows the format `https://chat.whatsapp.com/{codigo}`

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Add Participants](/docs/communities/adicionar-participantes) - Add participants using the invite link
- [Community Metadata](/docs/communities/metadata) - Get information about the community
- [Create Community](/docs/communities/criar) - Create a new community