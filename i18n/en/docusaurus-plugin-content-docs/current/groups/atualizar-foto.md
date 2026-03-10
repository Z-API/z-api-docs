---
id: atualizar-foto
sidebar_position: 2
title: Update Group Photo
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Image" size="lg" /> Update Group Photo

Change the image of an existing group through the Z-API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for changing the image of an existing group. You can send the image as URL or in Base64 format.

:::caution Attention

On November 4, 2021, WhatsApp changed the format for creating new groups:

- **Before**: `"phone": "5511999999999-1623281429"`
- **Now**: `"phone": "120363019502650977-group"`

:::

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/update-group-photo
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
|-----------|------|-------------|
| `groupId` | string | Group ID (old format: `5511999999999-1623281429` or new format: `120363019502650977-group`) |
| `groupPhoto` | string | Image URL or Base64 |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**With URL**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-photo
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "groupId": "120363019502650977-group",
  "groupPhoto": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
}
```

**With Base64**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-photo
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "groupId": "120363019502650977-group",
  "groupPhoto": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Com URL
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-photo',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      groupId: '120363019502650977-group',
      groupPhoto: 'https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg',
    }),
  }
);

const data = await response.json();
if (data.value) {
  console.log('Foto do grupo atualizada com sucesso!');
}
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-photo"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Com URL
payload = {
    "groupId": "120363019502650977-group",
    "groupPhoto": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('value'):
    print('Foto do grupo atualizada com sucesso!')
```

</TabItem>
<TabItem value="curl" label="cURL">

**With URL**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-photo" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "groupId": "120363019502650977-group",
    "groupPhoto": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
  }'
```

</TabItem>
</Tabs>

:::tip Send Base64 image

If you have doubts about how to send a Base64 image, access the topic [Send Image](/docs/messages/imagem), where you will find everything needed about sending in this format.

:::

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
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `groupId` and `groupPhoto` were provided correctly |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Group format**: Use the new format (`120363019502650977-group`) or old format (`5511999999999-1623281429`)
- **URL or Base64**: You can send the image as URL or in Base64 format
- **Base6 4**: If using Base64, include the prefix `data:image/png;base64,` or `data:image/jpeg;base64,` according to the image type
- **Permissions**: Only administrators can change the group photo

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Update Group Name](/docs/groups/atualizar-nome) - Change the group name
- [Update Group Description](/docs/groups/atualizar-descricao) - Change the group description
- [Group Settings](/docs/groups/configuracoes) - Change group settings
- [Send Image](/docs/messages/imagem) - Guide on sending Base64 images