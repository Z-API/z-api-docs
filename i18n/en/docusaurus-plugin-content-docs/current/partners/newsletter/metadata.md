---
id: metadata
sidebar_position: 4
title: Channel Metadata
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="Info" size="lg" /> Channel Metadata

Get complete information about a newsletter channel, including channel data and viewing information.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

This method returns the channel metadata with all channel and viewing information. Includes data such as name, description, number of followers, invite link, verification status, and how you view the channel (if muted, your role, etc.).

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
GET /instances/{instanceId}/token/{token}/newsletter/metadata/{newsletterId}
```

### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `instanceId` | string | Instance ID | `3C01A3...` |
| `token` | string | Instance token | `abc123...` |
| `newsletterId` | string | Channel ID (must contain the suffix `@newsletter`) | `999999999999999999@newsletter` |

:::warning Attention
The channel ID always must contain the suffix `@newsletter`, as this is the standard used by WhatsApp itself.
:::

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../../security/token-seguranca) |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter
Client-Token: seu-token-de-seguranca
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
const newsletterId = '999999999999999999@newsletter';

const response = await fetch(
  `https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/${newsletterId}`,
  {
    method: 'GET',
    headers: {
      'Client-Token': 'seu-token-de-seguranca',
    },
  }
);

const data = await response.json();
console.log(data);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

newsletter_id = '999999999999999999@newsletter'

url = f"https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/{newsletter_id}"
headers = {
    "Client-Token": "seu-token-de-seguranca"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X GET "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/metadata/999999999999999999@newsletter" \
  -H "Client-Token: seu-token-de-seguranca"
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
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
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `id` | string | Channel ID (always ends with `@newsletter`) |
| `creationTime` | timestamp | Timestamp of the channel creation date |
| `state` | string | Channel state. Possible values: `"ACTIVE"` (active), `"NON_EXISTING"` (does not exist) |
| `name` | string | Channel name |
| `description` | string | Channel description |
| `subscribersCount` | string | Follower count of the channel |
| `inviteLink` | string | Invite link of the channel |
| `verification` | string | Indicates if the channel is verified or not. Values: `"VERIFIED"` (verified), `"UNVERIFIED"` (not verified) |
| `picture` | string | URL of the channel image (full size) |
| `preview` | string | URL of the preview image of the channel (reduced size) |
| `viewMetadata` | object | Object with viewing information of the channel |
| `viewMetadata.mute` | string | Indicates if the channel is muted or not. Values: `"ON"` (muted), `"OFF"` (not muted) |
| `viewMetadata.role` | string | Indicates if you are the owner or follower of the channel. Values: `"OWNER"` (owner), `"SUBSCRIBER"` (follower) |

---

### Channel States

| State | Description |
|-------|------------|
| `ACTIVE` | Channel is active and functioning |
| `NON_EXISTING` | Channel does not exist or was deleted |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Resolve |
|------|--------|---------------|
| `405` | Incorrect HTTP method | Ensure you are using `GET` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `404` | Channel not found | Verify if the channel ID is correct and contains the suffix `@newsletter`

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **Mandatory Suffix**: The channel ID always must contain the suffix `@newsletter`
- **Viewing Information**: The field `viewMetadata` shows how you (the instance) view the channel, not general information
- **Invite Link**: Use the `inviteLink` to share the channel with other people
- **Verification**: Verified channels have the WhatsApp verification badge

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [List Channels](/docs/partners/newsletter/listar-canais) - List all channels of the instance
- [Create Channel](/docs/partners/newsletter/criar-canal) - Create a new channel
- [Update Name](/docs/partners/newsletter/atualizar-nome) - Change the name of the channel
- [Update Description](/docs/partners/newsletter/atualizar-descricao) - Change the description of the channel