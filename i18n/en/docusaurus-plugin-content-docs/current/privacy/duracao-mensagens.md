---
id: duracao-mensagens
title: Message Duration
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Clock" size="lg" /> Message Duration

Configure temporary messages for new individual conversations by setting a duration.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

Through this method, you can configure temporary messages for **new individual conversations**, setting a duration. It does not affect existing conversations.

**Available Durations**:
- **90 days** (`days90`): Messages expire after 90 days
- **7 days** (`days7`): Messages expire after 7 days
- **24 hours** (`hours24`): Messages expire after 24 hours
- **Disabled** (`disable`): Disables message expiration (messages remain indefinitely)

:::important Important
This configuration applies only to **new individual conversations**. Existing conversations are not affected.
:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/messages-duration?value={{VALOR_DA_DURAÇÃO}}
```

### Query Parameters

| Parameter | Type | Required | Description | Acceptable Values |
|-----------|------|----------|------------|------------------|
| `value` | string | Yes | Duration of the messages | `days90` (90 days), `days7` (7 days), `hours24` (24 hours), `disable` (disable) |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**90 days**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=days90
Client-Token: seu-token-de-seguranca
```

**7 days**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=days7
Client-Token: seu-token-de-seguranca
```

**24 hours**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=hours24
Client-Token: seu-token-de-seguranca
```

**Disabled**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=disable
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Configurar duração para 90 dias
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=days90',
  {
    method: 'POST',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
if (data.success) {
  console.log('Duração das mensagens configurada!');
}

// Outros valores: 'days7', 'hours24', 'disable'
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

# Configurar duração para 90 dias
params = {
    "value": "days90"  # ou "days7", "hours24", "disable"
}

response = requests.post(url, headers=headers, params=params)
data = response.json()

if data.get('success'):
    print('Duração das mensagens configurada!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**90 days**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=days90" \
  -H "Client-Token: seu-token-de-seguranca"
```

**7 days**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=days7" \
  -H "Client-Token: seu-token-de-seguranca"
```

**24 hours**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=hours24" \
  -H "Client-Token: seu-token-de-seguranca"
```

**Disabled**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/messages-duration?value=disable" \
  -H "Client-Token: seu-token-de-seguranca"
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

### Response Fields

| Field | Type | Description |
|-------|------|------------|
| `success` | boolean | `true` if successful and `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Ensure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `400` | Invalid value | Check if the parameter `value` has one of the accepted values: `days90`, `days7`, `hours24`, or `disable`

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **New conversations**: This configuration applies only to new individual conversations created after the configuration
- **Existing conversations**: Existing conversations are not affected by this configuration
- **Accepted values**: Use `days90` for 90 days, `days7` for 7 days, `hours24` for 24 hours, or `disable` to disable expiration
- **Groups**: This configuration does not apply to groups

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Read Confirmations](/docs/privacy/confirmacoes-leitura) - Configure read confirmations
- [Last Seen](/docs/privacy/visto-por-ultimo) - Configure last seen privacy
- [Profile Photo View](/docs/privacy/visualizacao-foto-perfil) - Configure profile photo privacy