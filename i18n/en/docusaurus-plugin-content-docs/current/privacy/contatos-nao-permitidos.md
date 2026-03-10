---
id: contatos-nao-permitidos
sidebar_position: 9
title: List Unapproved Contacts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="UserX" size="lg" /> List Contacted Not Allowed

List the contacts that are in the not allowed list (blacklist) for certain interactions with your account.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

Through this method, you can list the contacts that are in the not allowed list (blacklist) for certain interactions with your account. The blacklist is used in various privacy settings to exclude specific contacts.

**Available Scopes**:
- **Last Viewed** (`lastSeen`): Contacts in the last viewed blacklist
- **View Profile Photo** (`photo`): Contacts in the profile photo view blacklist
- **View Message** (`description`): Contacts in the message view blacklist
- **Add to Groups Permission** (`groupAdd`): Contacts in the add to groups permission blacklist

:::important Important
Each privacy setting has its own independent blacklist. The "last viewed" blacklist is different from the "profile photo view" blacklist, and so on.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/disallowed-contacts?type={{ESCOPO_DO_BLOQUEIO}}
```

### Query Parameters

| Parameter | Type | Required | Description | Accepted Values |
|-----------|------|----------|------------|-----------------|
| `type` | string | Yes | Scope of the block | `lastSeen` (Last Viewed), `photo` (View Profile Photo), `description` (View Message), `groupAdd` (Add to Groups Permission) |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account Security Token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**List contacts in the last viewed blacklist**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/disallowed-contacts?type=lastSeen
Client-Token: seu-token-de-seguranca
```

**List contacts in the profile photo view blacklist**:

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/disallowed-contacts?type=photo
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Listar contatos na blacklist de visto por último
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/disallowed-contacts?type=lastSeen',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
console.log('Contatos na blacklist:', data.disallowedContacts);

// Outros tipos: 'photo', 'description', 'groupAdd'
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/disallowed-contacts"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

# Listar contatos na blacklist de visto por último
params = {
    "type": "lastSeen"  # ou "photo", "description", "groupAdd"
}

response = requests.get(url, headers=headers, params=params)
data = response.json()

print(f"Contatos na blacklist: {data.get('disallowedContacts', [])}")
```

</TabItem>
<TabItem value="curl" label="cURL">

**List contacts in the last viewed blacklist**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/disallowed-contacts?type=lastSeen" \
  -H "Client-Token: seu-token-de-seguranca"
```

**List contacts in the profile photo view blacklist**:

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/disallowed-contacts?type=photo" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "disallowedContacts": [
    "554411111111",
    "554422222222"
  ]
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `disallowedContacts` | array[string] | List of phone numbers for each contact in the blacklist (international format, no spaces) |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Ensure you are using `GET` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `400` | Invalid type | Check if the parameter `type` was provided and if the value is one of the accepted: `lastSeen`, `photo`, `description`, or `groupAdd`

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Independent Blacklists**: Each type of privacy setting has its own independent blacklist
- **Available Types**: Use `lastSeen` for last viewed, `photo` for profile photo view, `description` for message view, or `groupAdd` for add to groups permission
- **Phone Format**: Phone numbers are returned in international format without spaces (ex: `554411111111`)
- **Empty List**: If there are no contacts in the blacklist, the array `disallowedContacts` will be empty

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Last Viewed](/docs/privacy/visto-por-ultimo) - Configure last viewed privacy
- [View Profile Photo](/docs/privacy/visualizacao-foto-perfil) - Configure profile photo view privacy
- [View Message](/docs/privacy/visualizacao-recado) - Configure message view privacy
- [Add to Groups Permission](/docs/privacy/permissao-adicionar-grupos) - Configure add to groups permission