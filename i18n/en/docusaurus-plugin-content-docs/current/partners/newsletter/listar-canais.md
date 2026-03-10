---
id: listar-canais
sidebar_position: 3
title: List Channels
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="List" size="lg" /> Listar Canals

List all the own and followed newsletter channels by your instance.

---

## <Icon name="Info" size="md" /> Conceituação {#conceituacao}

This method returns a list with the metadata of own and followed channels, including all information about the channel and its visualization. It includes channels you created (owner) and channels you are following (follower).

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/newsletter
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter',
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
console.log('Canais encontrados:', data.length);
data.forEach(channel => {
  console.log(`- ${channel.name} (${channel.role === 'OWNER' ? 'Proprietário' : 'Seguidor'})`);
});
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.get(url, headers=headers)
data = response.json()
print(f"Canais encontrados: {len(data)}")
for channel in data:
    role = "Proprietário" if channel['viewMetadata']['role'] == 'OWNER' else "Seguidor"
    print(f"- {channel['name']} ({role})")
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
[
  {
    "id": "999999999999999999@newsletter",
    "creationTime": "1695643504",
    "state": "ACTIVE",
    "name": "Z-API",
    "description": "Canal oficial Z-API",
    "subscribersCount": "123",
    "inviteLink": "https://www.whatsapp.com/channel/0029Va5Xk71a",
    "verification": "VERIFIED",
    "picture": "https://mmg.whatsapp.net/v/t61.24694-24/383686038_859672472421500_990610487096734362_n.jpg?ccb=11-4&oh=01_AdS-Wk3RSfXmtEqDA4-LTFaZQILXZSprywV8EwNoZPOaGw&oe=651EF162&_nc_sid=000000&_nc_cat=111",
    "preview": "https://mmg.whatsapp.net/v/t61.24694-24/383686038_859672472421500_990610487096734362_n.jpg?stp=dst-jpg_s192x192&ccb=11-4&oh=01_AdRltWYOZftf0cnm-GNw5RRGoxQ53nJR9zzxxot_N7JQCw&oe=651EF162&_nc_sid=000000&_nc_cat=111",
    "viewMetadata": {
      "mute": "OFF",
      "role": "OWNER"
    }
  },
  {
    "id": "888888888888888888@newsletter",
    "creationTime": "1695237295",
    "state": "ACTIVE",
    "name": "Canal Exemplo",
    "description": "Exemplo",
    "inviteLink": "https://www.whatsapp.com/channel/0029Va5Xk71a123",
    "verification": "UNVERIFIED",
    "picture": null,
    "preview": null,
    "viewMetadata": {
      "mute": "ON",
      "role": "SUBSCRIBER"
    }
  }
]
```

### Fields of the Response

The response is an array of objects, where each object represents a channel. Each object contains:

| Field | Type | Description |
|-------|------|------------|
| `id` | string | Channel ID (always ends with `@newsletter`) |
| `creationTime` | timestamp | Timestamp of the channel creation date |
| `state` | string | Channel state. Values: `"ACTIVE"` (active), `"NON_EXISTING"` (does not exist) |
| `name` | string | Channel name |
| `description` | string | Channel description |
| `subscribersCount` | string | Count of the number of channel followers |
| `inviteLink` | string | Channel invite link |
| `verification` | string | Indicates if the channel is verified. Values: `"VERIFIED"` (verified), `"UNVERIFIED"` (not verified) |
| `picture` | string or null | URL of the channel image (full size) |
| `preview` | string or null | URL of the preview of the channel image (reduced size) |
| `viewMetadata` | object | Object with information about the channel view |
| `viewMetadata.mute` | string | Indicates if the channel is muted. Values: `"ON"` (muted), `"OFF"` (not muted) |
| `viewMetadata.role` | string | Indicates your role in the channel. Values: `"OWNER"` (owner), `"SUBSCRIBER"` (follower) |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|--------------|
| `405` | Incorrect HTTP method | Make sure you are using `GET` as specified |
| `401` | Invalid token | Check the header `Client-Token`

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Own and followed channels**: The list includes both channels you created and channels you are following
- **Role**: Use the field `viewMetadata.role` to identify if you are owner (`OWNER`) or follower (`SUBSCRIBER`)
- **Channel state**: Channels with state `NON_EXISTING` may have been deleted or do not exist anymore
- **Invite link**: Use the `inviteLink` to share the channel with others

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Create Channel](/docs/partners/newsletter/criar-canal) - Create a new channel
- [Channel Metadata](/docs/partners/newsletter/metadata) - View detailed information of a specific channel
- [Find Channels](/docs/partners/newsletter/encontrar-canais) - Search available channels
- [Follow Channel](/docs/partners/newsletter/seguir-canal) - Follow a found channel