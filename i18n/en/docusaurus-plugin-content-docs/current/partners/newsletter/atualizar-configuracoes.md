---
id: atualizar-configuracoes
sidebar_position: 23
title: Update Channel Settings
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Settings" size="lg" /> Update Channel Settings

Configure the options of a newsletter channel, including reaction restrictions in messages.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for changing the settings of a channel. Currently, it allows configuring reaction restrictions in messages from the channel.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/newsletter/settings/{newsletterId}
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Your instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `newsletterId` | string | Channel ID (must contain the suffix `@newsletter`) | `999999999999999999@newsletter` |

:::warning Attention
The channel ID always must contain the suffix `@newsletter`, as this is the standard used by WhatsApp itself.
:::

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../../security/token-seguranca) |
| `Content-Type` | string | Yes | Must be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|------------|
| `reactionCodes` | string | Defines the reaction restrictions in messages. Possible values: `"basic"` (only basic reactions) or `"all"` (any reaction) |

### Values of `reactionCodes`

| Value | Description |
|-------|------------|
| `basic` | Allows only the sending of basic reactions (👍, ❤️, 😂, etc.) |
| `all` | Allows the sending of any reaction (including custom emojis) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/settings/999999999999999999@newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "reactionCodes": "basic"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const newsletterId = '999999999999999999@newsletter';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/settings/${newsletterId}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      reactionCodes: 'basic', // ou 'all'
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

newsletter_id = '999999999999999999@newsletter'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/settings/{newsletter_id}"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "reactionCodes": "basic"  # ou "all"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['value']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/settings/999999999999999999@newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "reactionCodes": "basic"
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
| `400` | Invalid data | Check if `reactionCodes` was provided and if the value is `"basic"` or `"all"` |
| `404` | Channel not found | Check if the channel ID is correct and contains the suffix `@newsletter`

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Mandatory Suffix**: The channel ID always must contain the suffix `@newsletter`
- **Permissions**: Only owners and administrators can update the channel settings
- **Basic Reactions**: The mode `basic` allows only default WhatsApp reactions
- **All Reactions**: The mode `all` allows any type of reaction, including custom emojis

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Channel Metadata](/docs/partners/newsletter/metadata) - View complete channel information
- [Update Name](/docs/partners/newsletter/atualizar-nome) - Change channel name
- [Update Description](/docs/partners/newsletter/atualizar-descricao) - Change channel description
- [Update Image](/docs/partners/newsletter/atualizar-imagem) - Change channel image