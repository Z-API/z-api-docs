---
id: pegar-mensagens-chat
title: Get messages from the chat
---
## Method

### /chat-messages/:phone

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chat-messages/:phone
```

### Header

| Key           | Value                                    |
| :------------ | :--------------------------------------- |
| Client-Token  | **[ID E TOKEN](../security/id-e-token)** |

---

:::caution Attention!
This method is not available in the Multi Device version, since Z-API does not store messages. The only way to get received messages in the Multi Device version is via [Received Messages Webhook](../webhooks/ao-receber)
:::

## Concept

This method is responsible for returning all chats of a conversation.

---

## Attributes

### Required

| Attributes | Type   | Description |
| :--       | :-:    | :--         |
| phone     | string | Recipient's phone number in DDI DDD NUMBER format. Ex: 551199999999. **IMPORTANT** Send only numbers, without formatting or mask |
| amount    | integer | Quantity of messages you want to retrieve, it is recommended that you retrieve 10 by 10 messages so your application does not become too slow. |
| lastMessageId | string | messageId of the last message you retrieved |

### Optional

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

### URL example

Method

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chat-messages/:phone
```

---

## Response

### 200

| Attributes | Type | Description |
| :-------- | :--- | :-------- |

Each type of message has a different attribute type in the example below we will show some of them.

Example

Follows Json according to the sequence below:

- Simple Text
- Image
- Document
- Contact
- Emoji
- Link

```json
[
  {
    "instanceId": "399793F5C962B0F227576EA28507E212",
    "messageId": "3EB02A5A36C0103F231A",
    "phone": "5511999999999",
    "fromMe": false,
    "momment": 1623008318000,
    "status": "RECEIVED",
    "chatName": "Z-API Suporte",
    "senderPhoto": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "senderName": "5511999999999",
    "participantPhone": null,
    "photo": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "broadcast": false,
    "text": {
      "message": "Uma mensagem de texto simples"
    }
  },
  {
    "instanceId": "399793F5C962B0F227576EA28507E212",
    "messageId": "3EB09E1F42DCBF393D27",
    "phone": "5511999999999",
    "fromMe": false,
    "momment": 1623008355000,
    "status": "RECEIVED",
    "chatName": "Z-API Suporte",
    "senderPhoto": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "senderName": "Z-API Suporte",
    "participantPhone": null,
    "photo": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "broadcast": false,
    "image": {
      "mimeType": "image/jpeg",
      "imageUrl": "https://storage.z-api.io/instances/399793F5C962B0F227576EA28507E212/3EB09E1F42DCBF393D27.jpeg",
      "thumbnailUrl": "https://storage.z-api.io/instances/399793F5C962B0F227576EA28507E212/3EB09E1F42DCBF393D27.jpeg",
      "caption": "Uma imagem com texto"
    }
  },
  {
    "instanceId": "399793F5C962B0F227576EA28507E212",
    "messageId": "3EB0282CF7A8FE6E3404",
    "phone": "5511999999999",
    "fromMe": false,
    "momment": 1623008445000,
    "status": "RECEIVED",
    "chatName": "Z-API Suporte",
    "senderPhoto": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "senderName": "Z-API Suporte",
    "participantPhone": null,
    "photo": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "broadcast": false,
    "document": {
      "documentUrl": "https://storage.z-api.io/instances/399793F5C962B0F227576EA28507E212/3EB0282CF7A8FE6E3404.pdf",
      "mimeType": "application/pdf",
      "title": "Personalidade “Virtuoso” (ISTP-A _ ISTP-T) _ 16Personalities.pdf",
      "pageCount": 5,
      "fileName": "Personalidade “Virtuoso” (ISTP-A _ ISTP-T) _ 16Personalities.pdf"
    }
  },
  {
    "instanceId": "399793F5C962B0F227576EA28507E212",
    "messageId": "3EB0026521003277F45C",
    "phone": "5511999999999",
    "fromMe": false,
    "momment": 1623008464000,
    "status": "RECEIVED",
    "chatName": "Z-API Suporte",
    "senderPhoto": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "senderName": "Z-API Suporte",
    "participantPhone": null,
    "photo": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "broadcast": false,
    "contact": {
      "displayName": "Z-api - Atendimento",
      "vCard": "BEGIN:VCARD\nVERSION:3.0\nN:;Z-api - Atendimento;;;\nFN:Z-api - Atendimento\nTEL;type=CELL;waid=554498398733:+55 44 9839-8733\nX-WA-BIZ-NAME:Z-api - Atendimento\nX-WA-BIZ-DESCRIPTION:WhatsApp para programadores!\nEND:VCARD",
      "phones": ["5511999999999"]
    }
  },
  {
    "instanceId": "399793F5C962B0F227576EA28507E212",
    "messageId": "3EB0A813A6589892EFA4",
    "phone": "5511999999999",
    "fromMe": false,
    "momment": 1623008479000,
    "status": "RECEIVED",
    "chatName": "Z-API Suporte",
    "senderPhoto": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "senderName": "Z-API Suporte",
    "participantPhone": null,
    "photo": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "broadcast": false,
    "text": {
      "message": "🚀"
    }
  },
  {
    "instanceId": "399793F5C962B0F227576EA28507E212",
    "messageId": "3EB030C85D53F100A660",
    "phone": "5511999999999",
    "fromMe": false,
    "momment": 1623008501000,
    "status": "RECEIVED",
    "chatName": "Z-API Suporte",
    "senderPhoto": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "senderName": "Z-API Suporte",
    "participantPhone": null,
    "photo": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "broadcast": false,
    "text": {
      "message": "https://www.z-api.io/",
      "url": "https://www.z-api.io/",
      "urlDescription": null,
      "urlTitle": "WhatsApp API: Integre sua empresa | Z-API",
      "isCatalog": false
    }
  }
]
```

### 405

In this case make sure you are sending the correct method specification, that is verify if you sent POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add in the request headers the "Content-Type" of the object you are sending, in most cases "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-message-chat.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>