---
id: get-message-chats
title: Get messages from chat
---

## Method 

#### /chat-messages/{phone}

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chat-messages/{phone}

---

## Concept 

This method is responsible for returning all conversations in a chat.

---

## Attributes

### Mandatory

| Attributes | Type | Description |
| :-- | :-: | :-- |
| phone | string | telephone number in the format DDI DDD NUMERS Ex: 551199999999. **IMPORTANT**  only send numbers without formatting or a mask |
| amount | integer | Number of messages you want to search, it is recommended that you search 10 messages at a time so that your application doesn't get too slow.|
| lastMessageId | string | Messsageid of the last message that you sent  |

### Optionals 

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL example

Method

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chat-messages/{phone}

---

## Response

### 200

| Attributes | Type | Description |
| :-------- | :--- | :-------- |

Each message type has a different attribute type. In the example below we will show you some of them.

Example 

JSON follows the sequence as shown below.

 - plain text
 - Image
 - Document
 - Contact - 
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
      "message": "A simple plain text message"
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
      "vCard": "BEGIN:VCARD\nVERSION:3.0\nN:;Z-api - Atendimento;;;\nFN:Z-api - Atendimento\nTEL;type=CELL;waid=554498398733:+55 44 9839-8733\nX-WA-BIZ-NAME:Z-api - Atendimento\nX-WA-BIZ-DESCRIPTION:Whatsapp para programadores!\nEND:VCARD",
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
      "urlTitle": "Whatsapp API: Integre sua empresa | Z-API",
      "isCatalog": false
    }
  }
]
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-message-chat.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
