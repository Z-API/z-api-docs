---
id: visualizacao-online
title: Online Viewing
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Circle" size="lg" /> Online Viewing

Configure who can see when you are online.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

Through this method, it is possible to configure who can see when you are online. The "online" status appears when you are using WhatsApp at the moment.

**Available options**:
- **Everyone** (`ALL`): Anyone can see when you are online
- **Same as Last Seen Configuration** (`SAME_LAST_SEEN`): Uses the same configuration that you set for "last seen"

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/online
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
|----------|------|-----------|-----------------|
| `visualizationType` | string | Viewing scope | `ALL` (Everyone can see), `SAME_LAST_SEEN` (Same configuration as "last seen") |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Everyone can see**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/online
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "visualizationType": "ALL"
}
```

**Same as Last Seen Configuration**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/online
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "visualizationType": "SAME_LAST_SEEN"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Todos podem ver quando estiver online
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/online',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      visualizationType: 'ALL', // ou 'SAME_LAST_SEEN'
    }),
  }
);

const data = await response.json();
if (data.success) {
  console.log('Configuração de visualização online atualizada!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/online"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "visualizationType": "ALL"  # ou "SAME_LAST_SEEN"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    print('Configuração de visualização online atualizada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/online" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "visualizationType": "ALL"
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
|-------|------|-----------|
| `success` | boolean | `true` if successful and `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `visualizationType` was provided and the value is `ALL` or `SAME_LAST_SEEN`

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Accepted values**: Use `ALL` to allow everyone to see when you are online, or `SAME_LAST_SEEN` to use the same configuration as "last seen"
- **SAME_LAST_SEEN**: When using this option, the online viewing will follow the same rules that you set for "last seen" (including blacklist if applicable)
- **Online status**: The "online" status appears only when you are actively using WhatsApp

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Last Seen](/docs/privacy/visto-por-ultimo) - Configure last seen privacy
- [Photo Viewing](/docs/privacy/visualizacao-foto-perfil) - Configure profile photo privacy
- [Message Viewing](/docs/privacy/visualizacao-recado) - Configure message privacy