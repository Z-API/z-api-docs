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

#### Request Body

```json
{
  "value": "https://your-systems-address.com/instance/YOUR_INSTANCE/receive"
}
```

---

### Administrative panel 

![img](../../../../../img/received.png)

---

## Returns from webhooks 

The possible returns of the **on-message-received** webhook are registered below:

## Response

| Attributes| Type| Description |
| :-- | :-: | :-- |
| waitingMessage | boolean | Identifies if your message is in "Waiting for message" status |
| phone | string | Phone number, or number of the group that sent the message. |
| participantPhone | string | Phone number of the group member who sent the message. |
| messageId | string | Message identifier in the conversation. |
| status | string | Status the message is in at the time of sending (PENDING, SENT, RECEIVED, READ or PLAYED). |
| referenceMessageId | string | Reference the message that was replied to in case the message received is a reply to a message in the conversation. |
| momment | integer | Time when the message was received or from the error. |
| type | string | Instance event type, in this case it will be "ReceivedCallBack". |
| photo | string | Photo url of the user who sent the message. |
| text.message | string | Message text. |
| image.caption | string | Photo’s caption  |
| image.imageUrl | string | Photo’s URL |
| image.thumbnailUrl | string | Photo’s URL thumbnail  |
| image.mimeType | string | Image’s Mime Type |
| audio.mimeType | string | Audio’s MimeType |
| audio.audioUrl | string | Audio’s URL |
| video.caption | string | Video’s caption |
| video.videoUrl | string | Video’s URL  |
| video.mimeType | string | Video’s MimeType |
| contact.displayName | string | Contact’s name  |
| contact.vCard | string | VCard containing the contact information. |
| document.mimeType | string | Document’s MimeType |
| document.fileName | string | Document’s name |
| document.title | string | Document’s Title  |
| document.pageCount | string | Number of pages in the document  |
| document.thumbnailUrl | string | URL of the document's thumbnail. |
| document.documentUrl | string | Document’s URL |
| location.thumbnailUrl | string | Location thumbnail url. |
| location.longitude | float | Location’s longitude  |
| location.latitude | float | Location's latitude |
| location.url | string | Localization’s URL |
| location.name | string | Localization’s name |
| location.address | string | Localizations’s address  |
| sticker.mimeType | string | Sticker’s MimeType |
| sticker.stickerUrl | string | Stickers URL  |

---

### 200

### Text return example 

```json
{
  "waitingMessage": false,
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
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "text": {
    "message": "test"
  },
  "instanceId": "instance.id"
}
```

### Reaction return example

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
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "reaction": {
    "value": "❤️",
    "time": 1651878681150,
    "referencedMessage": {
      "messageId": "3EB0796DC6B777C0C7CD",
      "fromMe": true,
      "phone": "5544999999999",
      "participant": null
    }
  },
  "instanceId": "instance.id"
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
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "image": {
    "mimeType": "image/jpeg",
    "imageUrl": "https://",
    "thumbnailUrl": "https://",
    "caption": ""
  },
  "instanceId": "instance.id"
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
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "audio": {
    "audioUrl": "https://",
    "mimeType": "audio/ogg; codecs=opus"
  },
  "instanceId": "instance.id"
}
```

### Video feedback example

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
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "video": {
    "videoUrl": "https://",
    "mimeType": "video/mp4",
    "caption": ""
  },
  "instanceId": "instance.id"
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

### Document feedback example 

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

##

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

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

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
html_field = "<div align='center'><div class='alert alert-primary' role='alert'><span>Participant " + valor2.notificationparameters + " Left the group!<br><br></span>" + timefield + "</div></div>"
break;
```

```json
case 'E2E_ENCRYPTED':
// code block
html_field = "<div align='center'><div class='alert alert-primary' role='alert'><span> Messages are end-to-end encrypted<br><br></span>" + timefield + "</div></div>"
break;
```

```json
case 'GROUP_CREATE':
html_field = "<div align='center'><div class='alert alert-primary' role='alert'><span>Created a group \'" + valor2.notificationparameters + "\'<br><br></span>" + timefield + "</div></div>"
break;
```

```json
case 'GROUP_PARTICIPANT_ADD':
html_field = "<div align='center'><div class='alert alert-primary' role='alert'><span>Participant " + valor2.notificationparameters + " adding.<br><br></span>" + timefield + "</div></div>"
break;
```

```json
case "CALL_MISSED_VOICE":
html_field = "<div align='center'><div class='alert alert-primary' role='alert'><span>Missed phone call!<br><br></span>" + timefield + "</div></div>"
break
```

```json
case "CALL_MISSED_VIDEO":
html_field = "<div align='center'><div class='alert alert-primary' role='alert'><span>Missed video call!<br><br></span>" + timefield + "</div></div>"
break;
```

```json
case 'GROUP_PARTICIPANT_REMOVE':
html_field = "<div align='center'><div class='alert alert-primary' role='alert'><span>Participant " + valor2.notificationparameters + " Was removed.<br><br></span>" + timefield + "</div></div>"
break;
```

```json
case "CIPHERTEXT":
html_field = "<div align='center'><div class='alert alert-primary' role='alert'><span>Messages are end-to-end encrypted. <br><br></span>" + timefield + "</div></div>"
break;
```

```json
case "BLUE_MSG_SELF_PREMISE_UNVERIFIED":
html_field = "<div align='center'><div class='alert alert-primary' role='alert'><span>
You are chatting with a business account, but it has not yet been verified by WhatsApp.<br><br></span>" + timefield + "</div></div>"
break;
```

```json
case "BLUE_MSG_SELF_PREMISE_VERIFIED":
html_field = "<div align='center'><div class='alert alert-primary' role='alert'><span>
You are chatting with a business account, but it has been verified by whatsapp <br><br></span>" + timefield + "</div></div>"
break;
```

```json
case "BIZ_MOVE_TO_CONSUMER_APP":
html_field = "<div align='center'><div class='alert alert-primary' role='alert'><span>
This business account is now registered as a personal account and may no longer belong to a business.<br><br></span>" + timefield + "</div></div>"
break;
```

```json
case "REVOKE":
html_field = "<div align='center'><div class='alert alert-primary' role='alert'><span>Deleted a message.<br><br></span>" + timefield + "</div></div>"
break;
```

<!-- ## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/on-message-received.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe> -->
