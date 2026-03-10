---
id: criar-canal
sidebar_position: 2
title: Create Channel
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="PlusCircle" size="lg" /> Create Channel

Create a new newsletter channel on WhatsApp.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituation}

This method is responsible for creating a newsletter channel. Unfortunately, it's not possible to create the channel with an image, but you can use the [Update Image](/docs/partners/newsletter/atualizar-imagem) method that is in this same section right after creation.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/create-newsletter
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#attributes}

### Required

| Attribute | Type | Description |
|----------|------|------------|
| `name` | string | Channel name |

### Optional

| Attribute | Type | Description |
|----------|------|------------|
| `description` | string | Channel description |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Create channel with only name**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "name": "Nome do canal"
}
```

**Create channel with name and description**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "name": "Nome do canal",
  "description": "Descrição do canal"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Criar canal apenas com nome
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-newsletter',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      name: 'Nome do canal',
      // description: 'Descrição do canal'  // Opcional
    }),
  }
);

const data = await response.json();
console.log('ID do canal criado:', data.id);

// IMPORTANTE: Use o ID retornado para próximas operações
// O ID sempre conterá o sufixo @newsletter
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-newsletter"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Criar canal apenas com nome
payload = {
    "name": "Nome do canal"
    # "description": "Descrição do canal"  # Opcional
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"ID do canal criado: {data['id']}")

# IMPORTANTE: Use o ID retornado para próximas operações
# O ID sempre conterá o sufixo @newsletter
```

</TabItem>
<TabItem value="curl" label="cURL">

**Create channel with only name**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "name": "Nome do canal"
  }'
```

**Create channel with name and description**:

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "name": "Nome do canal",
    "description": "Descrição do canal"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 201 Created {#201-created}

```json
{
  "id": "999999999999999999@newsletter"
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `id` | string | ID of the created channel. It will always contain the suffix `@newsletter` |

:::tip Channel ID
The returned ID will always contain the suffix `@newsletter`, a default used by WhatsApp itself. It should be used in the same format in requests that receive an ID as a parameter.
:::

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `name` was provided |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Channel ID**: Save the returned ID for future operations (update, delete, manage administrators, etc.)
- **Required Suffix**: The ID will always contain the suffix `@newsletter`
- **Image**: It's not possible to create the channel with an image. Use the [Update Image](/docs/partners/newsletter/atualizar-imagem) method after creation
- **Optional Description**: The description can be added during creation or updated later

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Update Image](/docs/partners/newsletter/atualizar-imagem) - Add image to the channel after creation
- [Update Name](/docs/partners/newsletter/atualizar-nome) - Change channel name
- [Update Description](/docs/partners/newsletter/atualizar-descricao) - Update channel description
- [List Channels](/docs/partners/newsletter/listar-canais) - See all created channels
- [Channel Metadata](/docs/partners/newsletter/metadata) - View complete channel information