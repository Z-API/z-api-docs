---
id: confirmacoes-leitura
sidebar_position: 2
title: Reading Confirmations
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckCircle2" size="lg" /> Confirmation of Reading

Configure the confirmation of reading for messages (not applicable to groups).

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

Through this method, you can configure the confirmation of reading for messages. The confirmation of reading are the two blue checkmarks (✓✓) that appear when a message is read.

:::important Important
By **disabling the confirmation of reading**, you will also not be able to see if your messages have been read.
:::

**Note**: This configuration does not apply to groups, only to individual conversations.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/privacy/read-receipts?value={VALOR_DA_CONFIGURAÇÃO}
```

### Query Parameters

| Parameter | Type | Required | Description | Accepted Values |
|-----------|------|----------|------------|-----------------|
| `value` | string | Yes | Enable or disable the confirmation of reading | `enable` (enable), `disable` (disable) |

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Enable confirmation of reading**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts?value=enable
Client-Token: seu-token-de-seguranca
```

**Disable confirmation of reading**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts?value=disable
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Habilitar confirmações de leitura
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts?value=enable',
  {
    method: 'POST',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
if (data.success) {
  console.log('Confirmações de leitura habilitadas!');
}

// Desabilitar confirmações de leitura
const responseDisable = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts?value=disable',
  {
    method: 'POST',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

# Habilitar confirmações de leitura
url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

params = {
    "value": "enable"  # ou "disable" para desabilitar
}

response = requests.post(url, headers=headers, params=params)
data = response.json()

if data.get('success'):
    print('Confirmações de leitura configuradas com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**Enable confirmation of reading**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts?value=enable" \
  -H "Client-Token: seu-token-de-seguranca"
```

**Disable confirmation of reading**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/privacy/read-receipts?value=disable" \
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

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token`

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Accepted values**: Use `enable` to enable or `disable` to disable the confirmation of reading
- **Mutual effect**: By disabling the confirmation of reading, you will also not be able to see if your messages have been read
- **Application**: This configuration applies only to individual conversations, not groups
- **Persistence**: The configuration is maintained until it is changed again

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Online View](/docs/privacy/visualizacao-online) - Configure online visibility
- [Last Seen](/docs/privacy/visto-por-ultimo) - Configure last seen privacy
- [Profile Photo View](/docs/privacy/visualizacao-foto-perfil) - Configure profile photo privacy