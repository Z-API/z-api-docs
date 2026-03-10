---
id: configuracoes
title: Community Settings
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Settings" size="lg" /> Community Settings

Change community settings, such as who can add new groups.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

With this API you can change the settings of a community. Currently, it is possible to configure who can add new groups to the community: only administrators or all participants.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/communities/settings
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description | Accepted Values |
|----------|------|------------|-----------------|
| `phone` | string | ID of the community whose settings will be changed | ID obtained by listing or creating communities |
| `whoCanAddNewGroups` | string | Configuration of who can add new groups to the community | `admins` (only administrators), `all` (all participants) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Only administrators can add groups**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/settings
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "98372465382764532938",
  "whoCanAddNewGroups": "admins"
}
```

**Everyone can add groups**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/settings
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "98372465382764532938",
  "whoCanAddNewGroups": "all"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Apenas administradores podem adicionar grupos
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/settings',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '98372465382764532938',
      whoCanAddNewGroups: 'admins', // ou 'all'
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Configurações da comunidade atualizadas!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/settings"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Apenas administradores podem adicionar grupos
payload = {
    "phone": "98372465382764532938",
    "whoCanAddNewGroups": "admins"  # ou "all"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Configurações da comunidade atualizadas!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Only administrators can add groups**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/settings" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "98372465382764532938",
    "whoCanAddNewGroups": "admins"
  }'
```

**Everyone can add groups**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/settings" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "98372465382764532938",
    "whoCanAddNewGroups": "all"
  }'
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
| `success` | boolean | `true` if successful and `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|--------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `phone` and `whoCanAddNewGroups` were provided and if the value is `admins` or `all`

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Accepted values**: Use `admins` to allow only administrators to add groups, or `all` to allow all participants to add groups
- **Permissions**: Only community administrators can change these settings
- **Immediate effect**: Changes are applied immediately after a successful update

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Community Metadata](/docs/communities/metadata) - Get information about the community
- [Link Groups](/docs/communities/vincular-grupos) - Add groups to the community
- [Create Community](/docs/communities/criar) - Create a new community