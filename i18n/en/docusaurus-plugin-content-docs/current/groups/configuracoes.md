---
id: configuracoes
sidebar_position: 5
title: Group Settings
---
id: configuracoes
title: Group Settings
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Settings" size="lg" /> Group Settings

Change a group's preferences and settings through the Z-API.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method allows you to change a group's preferences. You can configure who can send messages, who can change settings, if approval is required to join the group, and who can add members.

:::caution Attention

Only admins can change a group's preferences.

:::

:::caution Attention

On November 4th, 2021 WhatsApp changed the format for creating new groups:

- **Before**: `"phone": "5511999999999-1623281429"`
- **Now**: `"phone": "120363019502650977-group"`

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-settings
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Must be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|-------------|
| `phone` | string | Group ID (old format: `5511999999999-1623281429` or new format: `120363019502650977-group`) |
| `adminOnlyMessage` | boolean | Only admins can send messages in the group |
| `adminOnlySettings` | boolean | Attribute to allow only admins to make edits in the group |
| `requireAdminApproval` | boolean | Defines if approval from an admin is required to join the group |
| `adminOnlyAddMember` | boolean | Only admins can add people to the group |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**New format**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-settings
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
 "phone": "120363019502650977-group",
 "adminOnlyMessage": true,
 "adminOnlySettings": true,
 "requireAdminApproval": false,
 "adminOnlyAddMember": true
}
```

**Old format**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-settings
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999-1623281429",
  "adminOnlyMessage": true,
  "adminOnlySettings": true,
  "requireAdminApproval": false,
  "adminOnlyAddMember": true
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-settings',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '120363019502650977-group', // ou formato antigo: '5511999999999-1623281429'
      adminOnlyMessage: true, // Apenas admins podem enviar mensagens
      adminOnlySettings: true, // Apenas admins podem alterar configurações
      requireAdminApproval: false, // Não requer aprovação para entrar
      adminOnlyAddMember: true, // Apenas admins podem adicionar membros
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Configurações do grupo atualizadas com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-settings"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "phone": "120363019502650977-group",  # ou formato antigo: "5511999999999-1623281429"
    "adminOnlyMessage": True,  # Apenas admins podem enviar mensagens
    "adminOnlySettings": True,  # Apenas admins podem alterar configurações
    "requireAdminApproval": False,  # Não requer aprovação para entrar
    "adminOnlyAddMember": True  # Apenas admins podem adicionar membros
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Configurações do grupo atualizadas com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**New format**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-settings" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
  "phone": "120363019502650977-group",
  "adminOnlyMessage": true,
  "adminOnlySettings": true,
  "requireAdminApproval": false,
  "adminOnlyAddMember": true
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
| `value` | boolean | `true` if successful and `false` if failed |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to fix |
|------|--------|------------|
| `405` | Incorrect HTTP method | Make sure you're using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if all required attributes were provided correctly |
| `403` | No permission | Only admins can change group settings |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Group format**: Use the new format (`120363019502650977-group`) or old format (`5511999999999-1623281429`)
- **Permissions**: Only admins can change group settings
- **Available settings**:
  - `adminOnlyMessage`: If `true`, only admins can send messages
  - `adminOnlySettings`: If `true`, only admins can change settings
  - `requireAdminApproval`: If `true`, approval from an admin is required to join the group
  - `adminOnlyAddMember`: If `true`, only admins can add members
- **Combinations**: You can combine these settings as needed

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Update Group Name](/docs/groups/atualizar-nome) - Change the group name
- [Update Group Description](/docs/groups/atualizar-descricao) - Change the group description
- [Update Group Photo](/docs/groups/atualizar-foto) - Change the group photo
- [Group Metadata](/docs/groups/metadata) - Get group information