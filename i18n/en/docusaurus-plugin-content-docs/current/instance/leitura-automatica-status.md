---
id: leitura-automatica-status
sidebar_position: 3
title: Automatic Status Reading
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Eye" size="lg" /> Automatic Status Reading

Enable automatic reading of all status updates received by the API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method enables automatic reading of all status updates received by the API. When enabled, all received statuses will be marked as read automatically.

:::caution Caution

For it to work, you must have [Automatic Reading](/docs/instance/leitura-automatica) enabled.

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
PUT /instances/{instanceId}/token/{token}/update-auto-read-status
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account Security Token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|------------|
| `value` | boolean | `true` to activate automatic status reading, `false` to deactivate |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Activate**:

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-auto-read-status
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "value": true
}
```

**Deactivate**:

```http
PUT https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-auto-read-status
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "value": false
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Ativar leitura automática de status
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-auto-read-status',
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      value: true, // ou false para desativar
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Leitura automática de status ativada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-auto-read-status"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Ativar leitura automática de status
payload = {
    "value": True  # ou False para desativar
}

response = requests.put(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Leitura automática de status ativada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Activate**:

```bash
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-auto-read-status" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "value": true
  }'
```

**Deactivate**:

```bash
curl -X PUT "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-auto-read-status" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "value": false
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
|-------|------|------------|
| `value` | boolean | Confirmation of action (`true` if successful) |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Ensure you are using `PUT` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Verify that `value` was provided correctly (must be `true` or `false`) |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Prerequisite**: You must have [Automatic Reading](/docs/instance/leitura-automatica) enabled for this feature to work
- **Activation**: Use `value: true` to activate automatic status reading
- **Deactivation**: Use `value: false` to deactivate automatic status reading
- **Received statuses**: When activated, all received statuses will be marked as read automatically

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Automatic Reading](/docs/instance/leitura-automatica) - Configure general automatic reading
- [Status](/docs/status/introducao) - Documentation about status/stories