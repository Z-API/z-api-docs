---
id: atualizar-imagem
sidebar_position: 22
title: Update Channel Image
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Image" size="lg" /> Update Channel Image

Change the image of an existing newsletter channel.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method is responsible for changing the image of an already existing channel. The channel's image is publicly displayed and helps followers visually identify the channel.

You can send the image as a URL or as Base64.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/update-newsletter-picture
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
| `pictureUrl` | string | URL or Base64 of the image |

:::warning Attention
The channel ID always must contain the suffix `@newsletter`, as this is the standard used by WhatsApp itself.
:::

:::tip Send Base64 Image
If you have doubts about how to send a Base64 image, visit the [Send Image](/docs/messages/imagem) topic for everything you need to know about sending in this format.
:::

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Using URL**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-picture
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "id": "999999999999999999@newsletter",
  "pictureUrl": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
}
```

**Using Base64**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-picture
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "id": "999999999999999999@newsletter",
  "pictureUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Usando URL
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-picture',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      id: '999999999999999999@newsletter',
      pictureUrl: 'https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg',
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

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-picture"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Usando URL
payload = {
    "id": "999999999999999999@newsletter",
    "pictureUrl": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Sucesso: {data['value']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-picture" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "id": "999999999999999999@newsletter",
    "pictureUrl": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
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
| `400` | Invalid data | Check if `id` and `pictureUrl` were provided, if the ID contains the suffix `@newsletter` and if the URL/Base64 is valid |
| `404` | Channel not found | Check if the channel ID is correct |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Required Suffix**: The channel ID always must contain the suffix `@newsletter`
- **Public Image**: The image is publicly displayed in the channel's profile
- **Permissions**: Only owners and administrators can update the channel's image
- **Supported Formats**: URL (http/https) or Base64 (with prefix `data:image/tipo;base64,`)
- **Recommended Size**: Use square images for better visualization

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Channel Metadata](/docs/partners/newsletter/metadata) - View complete channel information
- [Update Name](/docs/partners/newsletter/atualizar-nome) - Update the channel name
- [Update Description](/docs/partners/newsletter/atualizar-descricao) - Update the channel description
- [Send Image](/docs/messages/imagem) - Guide on sending images (Base64)