---
id: encontrar-canais
title: Find Channels
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Search" size="lg" /> Find Channels

Search for available newsletter channels using filters and search criteria.

---

## <Icon name="Info" size="md" /> Concept {#conceituacao}

This method returns a list of channel data based on the search performed using filters passed in the request body. You can search channels by country, view (recommended, trending, popular, new) and text.

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/search-newsletter
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Client-Token` | string | Yes | [Account security token](../../security/token-seguranca) |
| `Content-Type` | string | Yes | Must be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|-----------|------|-------------|
| `limit` | number | Limit of records to be listed |
| `filters` | object | Object with filters to be applied |

### `filters` object

| Attribute | Type | Description |
|-----------|------|-------------|
| `countryCodes` | array[string] | Array with country codes (ISO 3166-1 alpha-2 format, e.g., `["BR", "US", "CA"]`). See [country codes](https://www.iban.com/country-codes) |

### Optional

| Attribute | Type | Description |
|-----------|------|-------------|
| `view` | string | View filter. Possible values: `"RECOMMENDED"`, `"TRENDING"`, `"POPULAR"`, `"NEW"` |
| `searchText` | string | Text filter (search in channel name or description) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/search-newsletter
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "limit": 50,
  "view": "TRENDING",
  "filters": {
    "countryCodes": ["BR", "US", "CA"]
  },
  "searchText": "Z-API"
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/search-newsletter',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      limit: 50,
      view: 'TRENDING', // RECOMMENDED, TRENDING, POPULAR, NEW
      filters: {
        countryCodes: ['BR', 'US', 'CA'],
      },
      searchText: 'Z-API', // Opcional
    }),
  }
);

const data = await response.json();
console.log('Canais encontrados:', data.data);
console.log('Cursor:', data.cursor);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/search-newsletter"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

payload = {
    "limit": 50,
    "view": "TRENDING",  # RECOMMENDED, TRENDING, POPULAR, NEW
    "filters": {
        "countryCodes": ["BR", "US", "CA"]
    },
    "searchText": "Z-API"  # Opcional
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(f"Canais encontrados: {len(data['data'])}")
for channel in data['data']:
    print(f"- {channel['name']}: {channel['description']}")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/search-newsletter" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "limit": 50,
    "view": "TRENDING",
    "filters": {
      "countryCodes": ["BR", "US", "CA"]
    },
    "searchText": "Z-API"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "cursor": null,
  "data": [
    {
      "id": "999999999999999999@newsletter",
      "name": "Z-API",
      "description": "Canal oficial Z-API",
      "subscribersCount": "123",
      "picture": "https://mmg.whatsapp.net/v/t61.24694-24/345237462_968463277797373_5339431038113115975_n.jpg?stp=dst-jpg_s192x192&ccb=11-4&oh=01_AdTMyhA5kdwCdSqV0v784czJ1dHP_nkNhJ8TdgnANHro7Q&oe=651E6909&_nc_sid=000000&_nc_cat=109"
    },
    {
      "id": "888888888888888888@newsletter",
      "name": "Canal Exemplo",
      "description": "Exemplo",
      "subscribersCount": "0",
      "picture": null
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `cursor` | string or null | Token for result pagination. Currently always `null` until WhatsApp implements this functionality |
| `data` | array[object] | List of found channels |

### `data` object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Channel ID (always ends with `@newsletter`) |
| `name` | string | Channel name |
| `description` | string | Channel description |
| `subscribersCount` | string | Channel subscriber count |
| `picture` | string or null | Channel image URL (or `null` if no image) |

:::tip Response object "cursor" attribute
The WhatsApp API provides the `limit` attribute to search channels, which means there is pagination of results. However, the response does not include the `cursor` indicator for records. Therefore, for now, the `cursor` attribute will always be `null`, until WhatsApp implements this functionality.
:::

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to resolve |
|------|--------|----------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the `Client-Token` header |
| `415` | Missing Content-Type | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `limit` and `filters` are provided and if the country codes are in the correct format (ISO 3166-1 alpha-2) |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Country codes**: Use ISO 3166-1 alpha-2 codes (e.g., `BR`, `US`, `CA`). See [country codes](https://www.iban.com/country-codes)
- **View filters**: Use `RECOMMENDED` for recommended channels, `TRENDING` for trending channels, `POPULAR` for popular channels, and `NEW` for new channels
- **Text search**: `searchText` searches in channel name and description
- **Pagination**: Currently, `cursor` will always be `null`. Use `limit` to control how many results you want to receive

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [List Channels](/docs/partners/newsletter/listar-canais) - List own and followed channels
- [Follow Channel](/docs/partners/newsletter/seguir-canal) - Follow a found channel
- [Channel Metadata](/docs/partners/newsletter/metadata) - View complete information of a channel