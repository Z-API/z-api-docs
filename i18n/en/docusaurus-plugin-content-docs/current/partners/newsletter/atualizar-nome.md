---
id: atualizar-nome
sidebar_position: 20
title: Update Channel Name
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Edit" size="lg" /> Update Channel Name

Change the name of an existing newsletter channel.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for changing the name of an already existing channel. The channel name is publicly displayed and helps followers identify the channel.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/update-newsletter-name
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|------------|
| `id` | string | Channel ID (must contain the suffix `@newsletter`) |
| `name` | string | New channel name |

:::warning Attention
The channel ID always must contain the suffix `@newsletter`, as this is the standard used by WhatsApp itself.
:::

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-name
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "id": "999999999999999999@newsletter",
  "name": "Novo nome do canal"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-name',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      id: '999999999999999999@newsletter',
      name: 'Novo nome do canal',
    }),
  }
);

const data = await response.json();
console.log('Sucesso:', data.value);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-name"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "id": "999999999999999999@newsletter",
    "name": "Novo nome do canal"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['value']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-name" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "id": "999999999999999999@newsletter",
    "name": "Novo nome do canal"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 201 Created {#201-created}

```json
{
  "value": true
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `value` | boolean | `true` if the operation was successful, `false` in case of failure |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Verify if `id` and `name` were provided and if the ID contains the suffix `@newsletter` |
| `404` | Channel not found | Verify if the channel ID is correct |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Required Suffix**: The channel ID always must contain the suffix `@newsletter`
- **Public Name**: The name is publicly displayed in the channel profile
- **Permissions**: Only owners and administrators can change the channel name

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Channel Metadata](/docs/partners/newsletter/metadata) - View complete channel information
- [Update Description](/docs/partners/newsletter/atualizar-descricao) - Change channel description
- [Update Image](/docs/partners/newsletter/atualizar-imagem) - Change channel image
- [Update Settings](/docs/partners/newsletter/atualizar-configuracoes) - Configure channel options