---
id: on-message-received
title: Upon receiving
---

## Concept

This is the incoming message return webhook

:::caution Attention

Z-API does not accept webhooks that aren’t HTTPS

:::

---

## Updating the webhook

To update the webhook route, you can do it through the API or through the admin panel.

### API

#### /update-webhook-received

`PUT` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-webhook-received

#### Or

You can also update the route with the "sent by me" option enabled.

#### /update-webhook-received-delivery

`PUT` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-webhook-received-delivery

### Header

|     Key      |                         Value                          |
| :----------: | :----------------------------------------------------: |
| Client-Token | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

#### Request Body

```json
{
  "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/receive"
}
```

---

### Administrative panel

![img](../../../../../img/received.png)

---

## Returns from webhooks

The possible returns of the **on-message-received** webhook are registered below:

## Response

| Attributes                   |   Type    | Description                                                                                           |
| :----------------------------| :-------: | :---------------------------------------------------------------------------------------------------- |
| isStatusReply                | boolean   | Identifies if the received message is a status reply                                                  |
| senderLid                    | string    | WhatsApp contact ID                                                                                   |
| connectedPhone               | string    | Phone number connected to the API                                                                     |
| waitingMessage               | boolean   | Identifies if your message is in the "Waiting for message" status                                     |
| isEdit                       | boolean   | Identifies if the received message was edited                                                         |
| isGroup                      | boolean   | Indicates if the chat is a group                                                                      |
| isNewsletter                 | boolean   | Indicates if the chat is a channel                                                                    |
| phone                        | string    | Phone number or group that sent the message                                                           |
| fromMe                       | boolean   | Indicates if the message was sent from the number connected to the API                                |
| participantPhone             | string    | Phone number of the group member who sent the message                                                 |
| participantLid               | string    | WhatsApp contact ID of the group participant who sent the message                                     |
| messageId                    | string    | Message identifier in the conversation                                                                |
| status                       | string    | Status of the message at the time of sending (PENDING, SENT, RECEIVED, READ, or PLAYED)               |
| referenceMessageId           | string    | References the message if the received message is a reply to a previous message in the conversation   |
| momment                      | integer   | Moment when the message was received or the error occurred                                            |
| messageExpirationSeconds     | integer   | Time for temporary messages                                                                           |
| requestMethod                | string    | Identifier for the incoming request method (`invite_link` OR `non_admin_add`)                             |
| type                         | string    | Type of instance event, in this case "ReceivedCallBack"                                               |
| photo                        | string    | URL of the user's photo who sent the message                                                          |
| text.message                 | string    | Message text                                                                                          |
| image.caption                | string    | Photo caption                                                                                        |
| image.imageUrl               | string    | URL of the photo                                                                                      |
| image.thumbnailUrl           | string    | URL of the photo thumbnail                                                                            |
| image.mimeType               | string    | MimeType of the image                                                                                 |
| audio.mimeType               | string    | MimeType of the audio                                                                                 |
| audio.audioUrl               | string    | URL of the audio                                                                                      |
| video.caption                | string    | Video caption                                                                                        |
| video.videoUrl               | string    | URL of the video                                                                                      |
| video.mimeType               | string    | MimeType of the video                                                                                 |
| contact.displayName          | string    | Contact name                                                                                          |
| contact.vCard                | string    | VCard containing contact information                                                                  |
| document.mimeType            | string    | MimeType of the document                                                                              |
| document.fileName            | string    | Document name                                                                                        |
| document.title               | string    | Document title                                                                                        |
| document.pageCount           | string    | Number of pages in the document                                                                       |
| document.thumbnailUrl        | string    | URL of the document thumbnail                                                                         |
| document.documentUrl         | string    | URL of the document                                                                                   |
| location.thumbnailUrl        | string    | URL of the location thumbnail                                                                         |
| location.longitude           | float     | Longitude of the location                                                                             |
| location.latitude            | float     | Latitude of the location                                                                              |
| location.url                 | string    | URL of the location                                                                                   |
| location.name                | string    | Location name                                                                                         |
| location.address             | string    | Location address                                                                                      |
| sticker.mimeType             | string    | MimeType of the sticker                                                                               |
| sticker.stickerUrl           | string    | URL of the sticker                                                                                    |


---

### 200

### Text return example

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228638000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "text": {
    "message": "test",
    "descritpion": "(optional) if the message has a description inserted by WhatsApp",
    "title": "(optional) if the message has a title inserted by WhatsApp",
    "url": "(optional) if the message has a url linked to it. Example: catalog message has a button 'See catalog'",
    "thumbnailUrl": "(optional) if the message has a image thumbnail linked to it. Example: group invitation message has the image of group"
  }
}
```

### Template text return example

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "702CC5F7E0A6BF4421",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1708457193876,
  "status": "RECEIVED",
  "chatName": "Test Number",
  "senderPhoto": null,
  "senderName": "5544999999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "hydratedTemplate": {
    "header": {},
    "message": "message text",
    "footer": "message footer",
    "title": "message title",
    "templateId": "790118069824606",
    "hydratedButtons": []
  }
}
```

### Reaction return example

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228955000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "reaction": {
    "value": "❤️",
    "time": 1651878681150,
    "reactionBy": "554499999999",
    "referencedMessage": {
      "messageId": "3EB0796DC6B777C0C7CD",
      "fromMe": true,
      "phone": "5544999999999",
      "participant": null
    }
  }
}
```

### Example return text (Button List)

```json
{
  "waitingMessage": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1634645380000,
  "status": "RECEIVED",
  "chatName": "Nome",
  "senderPhoto": "https://",
  "senderName": "Nome",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "referenceMessageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "forwarded": false,
  "type": "ReceivedCallback",
  "buttonsResponseMessage": {
    "buttonId": "1",
    "message": "Ótimo"
  },
  "instanceId": "instance.id"
}
```

### Example return text (Picklist)

```json
{
  "waitingMessage": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1634645683000,
  "status": "RECEIVED",
  "chatName": "Nome",
  "senderPhoto": "https://",
  "senderName": "Nome",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "referenceMessageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "forwarded": false,
  "type": "ReceivedCallback",
  "listResponseMessage": {
    "message": "Z-API Wings for your imagination",
    "title": "Z-API",
    "selectedRowId": "1"
  },
  "instanceId": "instance.id"
}
```

### Image return example

```json
{
  "waitingMessage": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228828000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "image": {
    "mimeType": "image/jpeg",
    "imageUrl": "https://",
    "thumbnailUrl": "https://",
    "caption": "",
    "thumbnailUrl": "https://",
    "width": 600,
    "height": 315,
    "viewOnce": true
  },
  "instanceId": "instance.id"
}
```

### Template image return example

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "885FF934BF100D579E",
  "phone": "554499999999",
  "fromMe": false,
  "momment": 1708454725028,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "554499999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "hydratedTemplate": {
    "header": {
      "image": {
        "imageUrl": "https://example.jpeg",
        "thumbnailUrl": "https://example.jpeg",
        "caption": "",
        "mimeType": "image/jpeg",
        "viewOnce": false,
        "width": 1600,
        "height": 926
      }
    },
    "message": "message text",
    "footer": "message footer",
    "title": "message title",
    "templateId": "674504507982622",
    "hydratedButtons": []
  }
}
```

### Audio feedback example

```json
{
  "waitingMessage": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228849000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "audio": {
    "ptt": true,
    "seconds": 10,
    "audioUrl": "https://",
    "mimeType": "audio/ogg; codecs=opus",
    "viewOnce": true
  },
  "instanceId": "instance.id"
}
```

### Video return example

```json
{
  "waitingMessage": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228889000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "video": {
    "videoUrl": "https://",
    "caption": "",
    "mimeType": "video/mp4",
    "seconds": 13,
    "viewOnce": true
  },
  "instanceId": "instance.id"
}
```

### Template video return example

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "0E4AD761B62E3D5EF9",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1708456287181,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "5544999999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "hydratedTemplate": {
    "header": {
      "video": {
        "videoUrl": "https://example.mp4",
        "caption": "",
        "mimeType": "video/mp4",
        "width": 0,
        "height": 0,
        "seconds": 0,
        "viewOnce": false
      }
    },
    "message": "message text",
    "footer": "message footer",
    "title": "message title",
    "templateId": "938481574354947",
    "hydratedButtons": []
  }
}
```

### Contact feedback example

```json
{
  "waitingMessage": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228925000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "contact": {
    "displayName": "Cesar Baleco",
    "vCard": "BEGIN:VCARD\nVERSION:3.0\nN:;nome;;;\nFN:nome\nTEL;type=CELL;type=VOICE;waid=5544999999999:+55 44 9999-9999\nEND:VCARD",
    "phones": ["5544999999999"]
  },
  "instanceId": "instance.id"
}
```

### Document return example

```json
{
  "waitingMessage": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228955000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "document": {
    "documentUrl": "https://",
    "mimeType": "application/pdf",
    "title": "nome",
    "pageCount": 1,
    "fileName": "nome.pdf"
  },
  "instanceId": "instance.id"
}
```

### Template document return example

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "9D968A5FA2880508C4",
  "phone": "554499999999",
  "fromMe": false,
  "momment": 1708455444850,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "554499999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "hydratedTemplate": {
    "header": {
      "document": {
        "caption": null,
        "documentUrl": "https://example.pdf",
        "mimeType": "application/pdf",
        "title": "",
        "pageCount": 0,
        "fileName": ""
      }
    },
    "message": "message text",
    "footer": "message footer",
    "title": "message title",
    "templateId": "811492407484976",
    "hydratedButtons": []
  }
}
```

### Example of a group join request via an invitation link

```json
{
  "isGroup": true,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999-group",
  "connectedPhone": "5544999999999",
  "fromMe": false,
  "momment": 1682017970000,
  "expiresAt": null,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "photo": null,
  "broadcast": false,
  "participantPhone": "5544999999999",
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "MEMBERSHIP_APPROVAL_REQUEST",
  "notificationParameters": [
      "5544999999999"
  ],
  "callId": null,
  "code": null,
  "requestMethod": "invite_link"
}
```

### Example of a group join request added by a participant

```json
{
  "isGroup": true,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999-group",
  "connectedPhone": "5544999999999",
  "fromMe": false,
  "momment": 1682017970000,
  "expiresAt": null,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "photo": null,
  "broadcast": false,
  "participantPhone": "5544999999999",
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "MEMBERSHIP_APPROVAL_REQUEST",
  "notificationParameters": [
      "5544999999999",
      "5544888888888"
  ],
  "callId": null,
  "code": null,
  "requestMethod": "non_admin_add"
}
```

### Localization’s feedback example

```json
{
  "waitingMessage": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228970000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "location": {
    "longitude": -99.999999999999999,
    "latitude": -99.9999999999999999,
    "address": "",
    "url": ""
  },
  "instanceId": "instance.id"
}
```

### Template localization return example

```json
{
  "isStatusReply": false,
  "chatLid": "199016268742711@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "27BBF23E0185D363D9",
  "phone": "554499999999",
  "fromMe": false,
  "momment": 1708456969808,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "554499999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "hydratedTemplate": {
    "header": {
      "location": {
        "longitude": -46.6388,
        "latitude": -23.5489,
        "name": "somewhere",
        "address": "somewhere",
        "url": ""
      }
    },
    "message": "message text",
    "footer": "message footer",
    "title": "message title",
    "templateId": "1143940003434066",
    "hydratedButtons": []
  }
}
```

### Template OTP button return example

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "9D968A5FA2880508C4",
  "phone": "554499999999",
  "fromMe": false,
  "momment": 1708455444850,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "554499999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "hydratedTemplate": {
    "header": {},
    "message": "Message text",
    "footer": "",
    "title": "",
    "templateId": "",
    "hydratedButtons": [
      {
        "urlButton": {
          "displayText": "Copy code",
          "url": "https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=otp123"
        },
        "index": 0
      }
    ]
  }
}
```

### Pix key button return example

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "9D968A5FA2880508C4",
  "phone": "554499999999",
  "fromMe": false,
  "momment": 1708455444850,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "554499999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "pixKeyMessage": {
    "currency": "BRL",
    "referenceId": "4PXRAHSIRDA",
    "key": "pixkey",
    "keyType": "EVP",
    "merchantName": "Pix"
  }
}
```

### Button with image return example

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "9D968A5FA2880508C4",
  "phone": "554499999999",
  "fromMe": false,
  "momment": 1708455444850,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "554499999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "buttonsMessage": {
    "imageUrl": "Image URL",
    "videoUrl": null,
    "message": "Message text",
    "buttons": [
      {
        "buttonId": "1",
        "type": 1,
        "buttonText": {
          "displayText": "Button text 1"
        }
      },
      {
        "buttonId": "2",
        "type": 1,
        "buttonText": {
          "displayText": "Button text 2"
        }
      }
    ]
  }
}
```

### Button with video return example

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "9D968A5FA2880508C4",
  "phone": "554499999999",
  "fromMe": false,
  "momment": 1708455444850,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "554499999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "buttonsMessage": {
    "imageUrl": null,
    "videoUrl": "Video URL",
    "message": "Message text",
    "buttons": [
      {
        "buttonId": "1",
        "type": 1,
        "buttonText": {
          "displayText": "Button text 1"
        }
      },
      {
        "buttonId": "2",
        "type": 1,
        "buttonText": {
          "displayText": "Button text 2"
        }
      }
    ]
  }
}
```

### Sticker feedback example

```json
{
  "waitingMessage": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228982000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "sticker": {
    "stickerUrl": "https://",
    "mimeType": "image/webp"
  },
  "instanceId": "instance.id"
}
```

### Example of return of payment made

```json
{
  "waitingMessage": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632229683000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "requestPayment": {
    "value": 1,
    "currencyCode": "BRL",
    "expiration": 1632834482000,
    "requestPhone": "5544999999999",
    "paymentInfo": {
      "receiverPhone": "5544999999999",
      "value": 1,
      "currencyCode": "BRL",
      "status": "WAITING",
      "transactionStatus": "COLLECT_SUCCESS"
    }
  },
  "instanceId": "instance.id"
}
```

### Payment request return example

```json
{
  "waitingMessage": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": true,
  "momment": 1632230332000,
  "status": "MESSAGE_RECEIVED",
  "chatName": "name",
  "senderName": "name",
  "participantPhone": "5544999999999",
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "notification": "PAYMENT_ACTION_REQUEST_DECLINED",
  "notificationParameters": ["5544999999999", "BRL", "1000"],
  "instanceId": "instance.id"
}
```

### Example of an admin promoted to newsletter

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "464201093",
  "phone": "5544999999999@newsletter",
  "fromMe": false,
  "momment": 1682017970000,
  "status": "RECEIVED",
  "chatName": "newsletter name",
  "senderPhoto": null,
  "senderName": "",
  "photo": null,
  "broadcast": false,
  "participantPhone": "5544999999999",
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "NEWSLETTER_ADMIN_PROMOTE",
  "notificationParameters": ["5544999999999", "ADMIN"],
  "callId": null
}
```

### Example of an admin demoted of newsletter

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "464201093",
  "phone": "5544999999999@newsletter",
  "fromMe": false,
  "momment": 1682017970000,
  "status": "RECEIVED",
  "chatName": "newsletter name",
  "senderPhoto": null,
  "senderName": "",
  "photo": null,
  "broadcast": false,
  "participantPhone": "5544999999999",
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "NEWSLETTER_ADMIN_DEMOTE",
  "notificationParameters": ["5544999999999", "SUBSCRIBER"],
  "callId": null
}
```

### Example of payment receipt return

```json
{
  "waitingMessage": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632230512000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "sendPayment": {
    "paymentInfo": {
      "receiverPhone": "5544999999999",
      "value": 1,
      "currencyCode": "BRL",
      "status": "COMPLETE",
      "transactionStatus": "SUCCESS"
    }
  },
  "instanceId": "instance.id"
}
```

### Product return example

```json
{
  "waitingMessage": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632233527000,
  "status": "RECEIVED",
  "senderPhoto": "https://",
  "senderName": "5544999999999",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "product": {
    "productImage": "https://",
    "businessOwnerJid": "5544999999999",
    "currencyCode": "BRL",
    "productId": "99999999999999999999",
    "description": "",
    "productImageCount": 1,
    "price": 1,
    "url": "",
    "retailerId": "",
    "firstImageId": "",
    "title": "name"
  },
  "instanceId": "instance.id"
}
```

### Cart return example

```json
{
  "waitingMessage": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632233527000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "name",
  "photo": "https://",
  "broadcast": false,
  "forwarded": false,
  "type": "ReceivedCallback",
  "order": {
    "itemCount": 1,
    "orderId": "422508169684569",
    "message": "",
    "orderTitle": "name",
    "sellerJid": "5544999999999",
    "thumbnailUrl": "https://",
    "token": "AR5d4yUr+DmSzeCR2kUtPEeMfS+eG0O+S/T/17B+oY1mfA==",
    "currency": "BRL",
    "total": 2000,
    "subTotal": 2000,
    "products": [
      {
        "quantity": 1,
        "name": "nameProduct",
        "productId": "5338924696127051",
        "retailerId": "1242",
        "price": 2000,
        "currencyCode": "BRL"
      }
    ]
  }
}
```

### Example of Poll Response

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "moment": 1632228638000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "poll": {
    "question": "What is the best WhatsApp API?",
    "options": [
      {
        "name": "Z-API"
      },
      {
        "name": "Others"
      }
    ]
  }
}
```

### Example of Poll Response Message

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "moment": 1632228638000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": "If it's a group, this will be the participant who responded",
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "pollVote": {
    "pollMessageId": "ID of the poll message that was responded to",
    "options": [
      {
        "name": "Z-API"
      }
    ]
  }
}
```

### Send order return example

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228925000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "reviewAndPay": {
    "type": "physical-goods",
    "currency": "BRL",
    "referenceId": "4N9AVI38VOB",
    "orderRequestId": "4N9AVI38VYZ",
    "orderStatus": "pending",
    "paymentStatus": "pending",
    "total": 605,
    "subTotal": 600,
    "discount": 10,
    "shipping": 5,
    "tax": 10,
    "products": [
      {
        "name": "order 1",
        "quantity": 2,
        "isCustomItem": true,
        "productId": "custom-item-4N9AVI38WI1",
        "value": 150
      },
      {
        "name": "order 2",
        "quantity": 2,
        "isCustomItem": false,
        "productId": "23940797548900636",
        "value": 150
      }
    ]
  }
}
```

### Update order return example

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228925000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "reviewOrder": {
    "currency": "BRL",
    "referenceId": "4N9AVI38VOB",
    "orderRequestId": "4N9AVI38VYZ",
    "orderStatus": "processing",
    "paymentStatus": "pending",
    "total": 605,
    "subTotal": 600,
    "discount": 10,
    "shipping": 5,
    "tax": 10,
    "products": [
      {
        "name": "order 1",
        "quantity": 2,
        "isCustomItem": true,
        "productId": "custom-item-4N9AVI38WI1",
        "value": 150
      },
      {
        "name": "order 2",
        "quantity": 2,
        "isCustomItem": false,
        "productId": "23940797548900636",
        "value": 150
      }
    ]
  }
}
```

### Newsletter admin invitation return example

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228925000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "newsletterAdminInvite": {
    "newsletterId": "120363166555745933@newsletter",
    "newsletterName": "Teste",
    "text": "I want to invite you to be an admin of my channel on WhatsApp.",
    "inviteExpiration": 1706809668
  }
}
```

### Pin message return example

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": true,
  "momment": 1632228955000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "pinMessage": {
    "action": "pin",
    "pinDurationInSecs": 604800,
    "referencedMessage": {
      "messageId": "3EB0796DC6B777C0C7CD",
      "fromMe": true,
      "phone": "554499999999",
      "participant": null
    }
  }
}
```

### Event return example

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": true,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "120363019502650977-group",
  "fromMe": false,
  "momment": 1632228638000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "event": {
    "name": "Event name",
    "description": "Event description",
    "canceled": false,
    "joinLink": "https://call.whatsapp.com/video/v9123XNFG50L6iO78ndXNvKQr6b45a",
    "scheduleTime": 1716915653,
    "location": {}
  }
}
```

### Event response return example

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": true,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "120363019502650977-group",
  "fromMe": false,
  "momment": 1632228638000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "eventResponse": {
    "response": "GOING",
    "responseFrom": "554499999999",
    "time": 1714423417000,
    "referencedMessage": {
      "messageId": "D2D612289D9E8F62307D72409A8D9DC3",
      "fromMe": false,
      "phone": "120363239161320697-group",
      "participant": "554499999988"
    }
  }
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or PUT as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Notification Response

### Concept

Notifications are WhatsApp messages that are based on WhatsApp preview message templates.

This way, the notifications we receive are documented here, if you do not want to receive these notifications, you must ignore the message when it arrives with the notification attribute.

### Examples

```json
case 'GROUP_PARTICIPANT_LEAVE':
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Participante " + valor2.notificationparameters + " saiu do grupo!<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case 'E2E_ENCRYPTED':
// code block
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>As mensagens são protegidas com a criptografia<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case 'GROUP_CREATE':
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Criou o grupo \'" + valor2.notificationparameters + "\'<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case 'GROUP_PARTICIPANT_ADD':
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Participante " + valor2.notificationparameters + " adicionado.<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case "CALL_MISSED_VOICE":
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Chamada de voz perdida!<br><br></span>" + campohora + "</div></div>"
break
```

```json
case "CALL_MISSED_VIDEO":
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Chamada de vídeo perdida!<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case 'GROUP_PARTICIPANT_REMOVE':
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Participante " + valor2.notificationparameters + " foi removido.<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case "CIPHERTEXT":
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>As mensagens são protegidas com a criptografia de ponta.<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case "BLUE_MSG_SELF_PREMISE_UNVERIFIED":
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Você está conversando com uma conta comercial, mas ainda não foi confirmada pelo WhatsApp.<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case "BLUE_MSG_SELF_PREMISE_VERIFIED":
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Você está conversando com uma conta comercial verificada pelo WhatsApp.<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case "BIZ_MOVE_TO_CONSUMER_APP":
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Esta conta comercial agora está registrada como uma conta pessoal e pode não mais pertencer a uma empresa.<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case "REVOKE":
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Apagou uma mensagem.<br><br></span>" + campohora + "</div></div>"
break;
```

<!-- ## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/on-message-received.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe> -->
