---
id: voto-enquete
sidebar_position: 29
title: Vote in Survey
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckSquare" size="lg" /> Poll Voting

Send a vote for a poll through the Z-API.

---

## <Icon name="Info" size="md" /> Conceptualization {#conceituacao}

In this method, you can vote for a specific poll. You can vote in one or more options of the poll depending on its configuration.

**Important**:
- You need the `messageId` from the poll message to be able to vote
- You can vote in more than one option if the poll allows it
- The `messageId` can be obtained by sending a poll or receiving a poll from another contact

---

## <Icon name="Link" size="md" /> Endpoint {#endpoint}

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll-vote
```

### <Icon name="Settings" size="sm" /> Headers {#headers}

| Header | Type | Required | Description |
|--------|------|----------|------------|
| `Client-Token` | string | Yes | [Account security token](../security/token-seguranca) |
| `Content-Type` | string | Yes | Should be `application/json` |

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|----------|------|------------|
| `phone` | string | Recipient's phone (or group ID for sending to groups) in DDI DDD NUMBER format. **Important**: Send only numbers, without formatting or mask. Ex: `551199999999` |
| `pollMessageId` | string | Poll message ID. **Important**: This is the `messageId` received when sending a poll or receiving from another contact |
| `pollVote` | array | List of options that compose the vote. **Important**: You can vote in more than one option |

### PollVote (Object)

| Attribute | Type | Description |
|----------|------|------------|
| `name` | string | Name of the poll option you want to vote for |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

<Tabs>
<TabItem value="http" label="HTTP">

**Vote in one option**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll-vote
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "pollMessageId": "id da mensagem de enquete",
  "pollVote": [
    {"name": "Z-API"}
  ]
}
```

**Vote in multiple options**:

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll-vote
Content-Type: application/json
Client-Token: seu-token-de-seguranca

{
  "phone": "5511999999999",
  "pollMessageId": "id da mensagem de enquete",
  "pollVote": [
    {"name": "Z-API"},
    {"name": "WhatsApp"}
  ]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript (fetch)">

```javascript
// Votar em uma opção
const response = await fetch(
  'https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll-vote',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': 'seu-token-de-seguranca',
    },
    body: JSON.stringify({
      phone: '5511999999999',
      pollMessageId: 'id da mensagem de enquete',
      pollVote: [
        { name: 'Z-API' },
        // Você pode adicionar mais opções se a enquete permitir múltiplos votos
      ],
    }),
  }
);

const data = await response.json();
console.log('Voto enviado:', data);
```

</TabItem>
<TabItem value="python" label="Python (requests)">

```python
import requests

url = "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll-vote"
headers = {
    "Content-Type": "application/json",
    "Client-Token": "seu-token-de-seguranca"
}

# Votar em uma opção
payload = {
    "phone": "5511999999999",
    "pollMessageId": "id da mensagem de enquete",
    "pollVote": [
        {"name": "Z-API"}
        # Você pode adicionar mais opções se a enquete permitir múltiplos votos
    ]
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

print('Voto enviado:', data)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll-vote" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "5511999999999",
    "pollMessageId": "id da mensagem de enquete",
    "pollVote": [
      {"name": "Z-API"}
    ]
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### Fields of the Response

| Field | Type | Description |
|-------|------|------------|
| `zaapId` | string | ID in Z-API |
| `messageId` | string | ID in WhatsApp |
| `id` | string | Added for compatibility with Zapier, it has the same value as `messageId` |

---

### <Icon name="AlertCircle" size="sm" /> Error Codes {#erros}

| Code | Reason | How to Solve |
|------|--------|-------------|
| `405` | Incorrect HTTP method | Make sure you are using `POST` as specified |
| `401` | Invalid token | Check the header `Client-Token` |
| `415` | Content-Type missing | Add `Content-Type: application/json` to the header |
| `400` | Invalid data | Check if `phone`, `pollMessageId` and `pollVote` were provided correctly |

---

## <Icon name="Info" size="md" /> Notes {#observacoes}

- **messageId**: You need the `messageId` from the poll message to be able to vote. This ID can be obtained:
  - When sending a poll through the API
  - When receiving a poll from another contact (via webhook)
- **Multiple votes**: You can vote in more than one option if the poll allows multiple votes
- **Phone format**: Use DDI DDD NUMBER format without formatting (ex: `5511999999999`)
- **Groups**: You can vote in polls sent to groups using the group ID as `phone`

---

## <Icon name="ArrowRight" size="md" /> Related Resources {#recursos-relacionados}

- [Send Poll](/docs/messages/enquete) - Create and send a poll
- [Webhook - Poll Response](/docs/webhooks/ao-receber#example-of-poll-response) - Receive notifications of votes in polls