---
id: ao-receber
title: 'Event: On Message Received'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Webhook: On Receiving a Message

This is the most important webhook for creating interactive automations. It is triggered **every time your instance receives a new message** from a contact.

Use this event to trigger chatbots, support systems, save information to CRMs, send automatic responses, and much more.

:::info File Validity Period

All media files received from Z-API through your webhook have an expiration period of **30 days**. After this period, all files, whether audio, PDF, image, etc., will be deleted from storage.

:::

:::caution Attention

Z-API does not accept webhooks that are not HTTPS.

:::

---

## Updating Webhook {#atualizando-webhook}

To update the webhook route, you can do it via API or through the administrative panel.

:::tip Tip

It is possible to update all webhooks at once to the same URL. See the endpoint [Update All Webhooks](/docs/webhooks/atualizar-todos).

:::

### API

#### `/update-webhook-received`

```http
PUT https://api.z-api.io/instances/{instanceId}/token/{token}/update-webhook-received
```

You can also update the route with the "sent by me" option enabled:

#### `/update-webhook-received-delivery`

```http
PUT https://api.z-api.io/instances/{instanceId}/token/{token}/update-webhook-received-delivery
```

### Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Client-Token` | string | Yes | [Account security token](/docs/security/token-seguranca) |
| `Content-Type` | string | Yes | Must be `application/json` |

### Request Body

```json
{
  "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/receive"
}
```

### Administrative Panel

You can also update the webhook through the Z-API administrative panel in the instance settings.

---

## The 3 Essential Fields

When you receive a new message, the webhook sends a data package (payload) in JSON format. For most automations, you will focus on these three main fields:

1. `phone`: The phone number of **who sent** the message.
2. `message`: The **content** of the message.
3. `type`: The **type** of message (text, image, audio, etc.).

With these three pieces of information, you can decide how your automation should react.

---

## For No-Code Users

In your automation tool (n8n, Make, etc.), the webhook trigger node will receive the message data. The path to access the message text, for example, will generally be something like:

`{{ $json.data.message.text }}`

You can use this value to create logic and responses.

**Example of a simple flow:**

1. **Trigger (Webhook):** Receives the message.
2. **"IF" Node (Conditional):**
 - **If** the `text` field of the message contains the word "help",
 - **Then** send a text message with the menu of options.
3. **"Google Sheets" Node:**
 - Take the `phone` and `text` values from the trigger and add them to a new row in a spreadsheet to record the contact.

---

## For Developers

The triggered event is `message`. Below is the structure of the payload that your endpoint will receive.

### Payload Structure

The `data` object contains all the information about the received message.

```json
{
 "event": "message",
 "instanceId": "3C3F8E5F4A2B1C9D",
 "data": {
 "messageId": "3EB0C767F26A",
 "phone": "5511999999999",
 "fromMe": false,
 "message": {
 "text": "Olá! Gostaria de mais informações.",
 "type": "text"
 },
 "timestamp": 1704110400
 }
}
```

#### The `data` Object

| Field | Type | Description |
|:---------- |:------ |:----------------------------------------------------------------------- |
| `messageId` | string | The unique ID of the received message. |
| `phone` | string | The sender's phone number. |
| `fromMe` | boolean | Will be `false` for received messages. Use to ignore echoes. |
| `message` | object | The object containing the message content and type. |
| `timestamp` | number | The timestamp (in seconds) of when the message was received. |

---

## Webhook Returns {#retornos-dos-webhooks}

The `on-message-received` webhook can return additional attributes beyond the basic fields. Below is the complete table of possible attributes:

### Payload `data` Attributes

The table below lists all possible attributes returned by the `on-message-received` webhook:

| Attribute | Type | Description |
|----------|------|-----------|
| `isStatusReply` | boolean | Identifies if the received message is a status reply |
| `senderLid` | string | Contact ID on WhatsApp |
| `connectedPhone` | string | Phone number connected to the API |
| `waitingMessage` | boolean | Identifies if your message has the status "Waiting for message" |
| `isEdit` | boolean | Identifies if the received message was edited |
| `isGroup` | boolean | Indicates if the chat is a group |
| `isNewsletter` | boolean | Indicates if the chat is a channel |
| `phone` | string | Phone number of the group or the sender that sent the message |
| `fromMe` | boolean | Indicates if the sent message came from the number connected to the API |
| `participantPhone` | string | Phone number of the group member who sent the message |
| `participantLid` | string | WhatsApp contact ID of the participant who sent the message within a group |
| `messageId` | string | Message identifier in the conversation |
| `status` | string | Status of the message at the time of sending (PENDING, SENT, RECEIVED, READ or PLAYED) |
| `referenceMessageId` | string | Reference to the message that was replied to in case the received message is a reply to a conversation message |
| `momment` | integer | Moment when the message was received or the error occurred |
| `messageExpirationSeconds` | integer | Time for temporary messages |
| `requestMethod` | string | Identifier of the entry request method (invite_link or non_admin_add) |
| `type` | string | Type of the instance event, in this case it will be "ReceivedCallBack" |
| `photo` | string | URL of the photo of the user who sent the message |
| `chatName` | string | Chat name |
| `chatLid` | string | Chat ID in LID format (Linked ID) |
| `senderPhoto` | string | URL of the sender's photo |
| `senderName` | string | Name of the sender |
| `broadcast` | boolean | Indicates if the message was sent in a broadcast |
| `forwarded` | boolean | Indicates if the message was forwarded |
| `fromApi` | boolean | Indicates if the message was sent via API |
| `viewOnce` | boolean | Indicates if the message is view-once |
| `expiresAt` | integer \| null | Message expiration timestamp (if applicable) |
| `code` | string \| null | Code related to the notification (if applicable) |
| `callId` | string \| null | Call ID (if applicable) |
| `notification` | string | Notification type (if applicable) |
| `notificationParameters` | array | Notification parameters (if applicable) |
| `profileName` | string | Updated profile name (when `notification` is `PROFILE_NAME_UPDATED`) |
| `updatedPhoto` | string | Updated photo URL (when `notification` is `PROFILE_PICTURE_UPDATED`) |
| `text.message` | string | Message text |
| `text.description` | string | Optional message description |
| `text.title` | string | Optional message title |
| `text.url` | string | Optional URL linked to the message |
| `text.thumbnailUrl` | string | Optional thumbnail URL |
| `image.caption` | string | Image caption |
| `image.imageUrl` | string | Image URL |
| `image.thumbnailUrl` | string | Image thumbnail URL |
| `image.mimeType` | string | Image mimeType |
| `image.width` | integer | Image width |
| `image.height` | integer | Image height |
| `image.viewOnce` | boolean | Indicates if the image is view-once |
| `audio.mimeType` | string | Audio mimeType |
| `audio.audioUrl` | string | Audio URL |
| `audio.ptt` | boolean | Indicates if it's a voice message (push-to-talk) |
| `audio.seconds` | integer | Audio duration in seconds |
| `audio.viewOnce` | boolean | Indicates if the audio is view-once |
| `video.caption` | string | Video caption |
| `video.videoUrl` | string | Video URL |
| `video.mimeType` | string | Video mimeType |
| `video.seconds` | integer | Video duration in seconds |
| `video.width` | integer | Video width |
| `video.height` | integer | Video height |
| `video.viewOnce` | boolean | Indicates if the video is view-once |
| `contact.displayName` | string | Contact name |
| `contact.vCard` | string | VCard containing contact information |
| `contact.phones` | array | Array of contact phone numbers |
| `document.mimeType` | string | Document mimeType |
| `document.fileName` | string | Document name |
| `document.title` | string | Document title |
| `document.pageCount` | string | Document page count |
| `document.thumbnailUrl` | string | Document thumbnail URL |
| `document.documentUrl` | string | Document URL |
| `location.thumbnailUrl` | string | Location thumbnail URL |
| `location.longitude` | float | Location longitude |
| `location.latitude` | float | Location latitude |
| `location.url` | string | Location URL |
| `location.name` | string | Location name |
| `location.address` | string | Location address |
| `sticker.mimeType` | string | Sticker mimeType |
| `sticker.stickerUrl` | string | Sticker URL |
| `reaction.value` | string | Reaction emoji |
| `reaction.time` | integer | Reaction timestamp |
| `reaction.reactionBy` | string | Number of who reacted |
| `reaction.referencedMessage` | object | Message referenced by the reaction |
| `buttonsResponseMessage.buttonId` | string | ID of the clicked button |
| `buttonsResponseMessage.message` | string | Text of the clicked button |
| `listResponseMessage.message` | string | List message |
| `listResponseMessage.title` | string | List title |
| `listResponseMessage.selectedRowId` | string | ID of the selected row |
| `carouselMessage.text` | string | Carousel text |
| `carouselMessage.cards` | array | Array of carousel cards |
| `hydratedTemplate.header` | object | Template header (may contain image, video, document, location) |
| `hydratedTemplate.message` | string | Template message |
| `hydratedTemplate.footer` | string | Template footer |
| `hydratedTemplate.title` | string | Template title |
| `hydratedTemplate.templateId` | string | Template ID |
| `hydratedTemplate.hydratedButtons` | array | Array of template buttons |
| `pixKeyMessage.currency` | string | Currency (e.g., "BRL") |
| `pixKeyMessage.referenceId` | string | Reference ID |
| `pixKeyMessage.key` | string | PIX key |
| `pixKeyMessage.keyType` | string | PIX key type (e.g., "EVP") |
| `pixKeyMessage.merchantName` | string | Merchant name |
| `buttonsMessage.imageUrl` | string | Image URL (if applicable) |
| `buttonsMessage.videoUrl` | string | Video URL (if applicable) |
| `buttonsMessage.message` | string | Message text |
| `buttonsMessage.buttons` | array | Array of buttons |
| `poll.question` | string | Poll question |
| `poll.pollMaxOptions` | integer | Maximum number of options per person |
| `poll.options` | array | Array of poll options |
| `pollVote.pollMessageId` | string | ID of the poll message that was responded to |
| `pollVote.options` | array | Array of selected options |
| `product.productImage` | string | Product image URL |
| `product.businessOwnerJid` | string | Business owner JID |
| `product.currencyCode` | string | Currency code |
| `product.productId` | string | Product ID |
| `product.description` | string | Product description |
| `product.productImageCount` | integer | Number of product images |
| `product.price` | integer | Product price |
| `product.url` | string | Product URL |
| `product.retailerId` | string | Retailer ID |
| `product.firstImageId` | string | First image ID |
| `product.title` | string | Product title |
| `order.itemCount` | integer | Number of items in the order |
| `order.orderId` | string | Order ID |
| `order.message` | string | Order message |
| `order.orderTitle` | string | Order title |
| `order.sellerJid` | string | Seller JID |
| `order.thumbnailUrl` | string | Thumbnail URL |
| `order.token` | string | Order token |
| `order.currency` | string | Currency |
| `order.total` | integer | Order total |
| `order.subTotal` | integer | Order subtotal |
| `order.products` | array | Array of order products |
| `reviewAndPay.type` | string | Order type (e.g., "physical-goods") |
| `reviewAndPay.currency` | string | Currency |
| `reviewAndPay.referenceId` | string | Reference ID |
| `reviewAndPay.orderRequestId` | string | Order request ID |
| `reviewAndPay.orderStatus` | string | Order status |
| `reviewAndPay.paymentStatus` | string | Payment status |
| `reviewAndPay.total` | integer | Total |
| `reviewAndPay.subTotal` | integer | Subtotal |
| `reviewAndPay.discount` | integer | Discount |
| `reviewAndPay.shipping` | integer | Shipping |
| `reviewAndPay.tax` | integer | Tax |
| `reviewAndPay.products` | array | Array of products |
| `reviewOrder.currency` | string | Currency |
| `reviewOrder.referenceId` | string | Reference ID |
| `reviewOrder.orderRequestId` | string | Order request ID |
| `reviewOrder.orderStatus` | string | Order status |
| `reviewOrder.paymentStatus` | string | Payment status |
| `reviewOrder.total` | integer | Total |
| `reviewOrder.subTotal` | integer | Subtotal |
| `reviewOrder.discount` | integer | Discount |
| `reviewOrder.shipping` | integer | Shipping |
| `reviewOrder.tax` | integer | Tax |
| `reviewOrder.products` | array | Array of products |
| `newsletterAdminInvite.newsletterId` | string | Channel ID |
| `newsletterAdminInvite.newsletterName` | string | Channel name |
| `newsletterAdminInvite.text` | string | Invite text |
| `newsletterAdminInvite.inviteExpiration` | integer | Invite expiration timestamp |
| `pinMessage.action` | string | Action (e.g., "pin") |
| `pinMessage.pinDurationInSecs` | integer | Pin duration in seconds |
| `pinMessage.referencedMessage` | object | Referenced message |
| `event.name` | string | Event name |
| `event.description` | string | Event description |
| `event.canceled` | boolean | Indicates if the event was canceled |
| `event.joinLink` | string | Link to join the event |
| `event.scheduleTime` | integer | Scheduled event timestamp |
| `event.location` | object | Event location |
| `eventResponse.response` | string | Response (e.g., "GOING", "NOT_GOING", "MAYBE") |
| `eventResponse.responseFrom` | string | Number of who responded |
| `eventResponse.time` | integer | Response timestamp |
| `eventResponse.referencedMessage` | object | Referenced message |
| `externalAdReply.title` | string | Ad title |
| `externalAdReply.body` | string | Ad body |
| `externalAdReply.mediaType` | integer | Media type |
| `externalAdReply.thumbnailUrl` | string | Thumbnail URL |
| `externalAdReply.sourceType` | string | Source type |
| `externalAdReply.sourceId` | string | Source ID |
| `externalAdReply.ctwaClid` | string | CTWA Client ID |
| `externalAdReply.sourceUrl` | string | Source URL |
| `externalAdReply.containsAutoReply` | boolean | Indicates if it contains auto-reply |
| `externalAdReply.renderLargerThumbnail` | boolean | Indicates whether to render a larger thumbnail |
| `externalAdReply.showAdAttribution` | boolean | Indicates whether to show ad attribution |
| `requestPayment.value` | integer | Payment value |
| `requestPayment.currencyCode` | string | Currency code |
| `requestPayment.expiration` | integer | Expiration timestamp |
| `requestPayment.requestPhone` | string | Number that requested the payment |
| `requestPayment.paymentInfo` | object | Payment information |
| `sendPayment.paymentInfo` | object | Sent payment information |
| `statusImage.imageUrl` | string | Status image URL |
| `statusImage.thumbnailUrl` | string | Status thumbnail URL |
| `statusImage.caption` | string | Caption |
| `statusImage.mimetype` | string | MimeType |
| `statusImage.viewOnce` | boolean | Indicates if it's view-once |
| `statusImage.width` | integer | Width |
| `statusImage.height` | integer | Height |

### Example of a Complete Payload

Below is a complete example of a JSON payload with all possible attributes:

```json
{
  "event": "message",
  "instanceId": "3C3F8E5F4A2B1C9D",
  "data": {
    "messageId": "3EB0C767F26A",
    "phone": "5511999999999",
    "fromMe": false,
    "message": {
      "text": "Olá! Gostaria de mais informações.",
      "type": "text"
    },
    "timestamp": 1704110400,
    "isStatusReply": false,
    "senderLid": "12036312345678901234",
    "connectedPhone": "5511888888888",
    "waitingMessage": false,
    "isEdit": false,
    "isGroup": false,
    "isNewsletter": false,
    "participantPhone": null
  }
}
```

### Example of a Group Payload

When the message is received in a group, the payload includes additional information:

```json
{
  "event": "message",
  "instanceId": "3C3F8E5F4A2B1C9D",
  "data": {
    "messageId": "3EB0C767F26A",
    "phone": "12036312345678901234@g.us",
    "fromMe": false,
    "message": {
      "text": "Mensagem do grupo",
      "type": "text"
    },
    "timestamp": 1704110400,
    "isStatusReply": false,
    "senderLid": "12036312345678901234",
    "connectedPhone": "5511888888888",
    "waitingMessage": false,
    "isEdit": false,
    "isGroup": true,
    "isNewsletter": false,
    "participantPhone": "5511999999999"
  }
}
```

:::tip Tip

- Use `isGroup` to identify if you need to process the message differently (e.g., mentioning the participant in groups)
- The `participantPhone` field will only be present when `isGroup` is `true`
- Use `fromMe` to filter out messages you sent yourself and avoid processing loops
- The `isEdit` field can be useful for tracking when messages were modified after sending

:::

### The `message` Object

The content of the `message` object varies according to the message `type`.

<Tabs>
<TabItem value="text" label="Text" default>

```json
{
 "message": {
 "type": "text",
 "text": "Este é o conteúdo da mensagem."
 }
}
```

</TabItem>
<TabItem value="image" label="Image">

```json
{
 "message": {
 "type": "image",
 "url": "https://url.da.imagem/aqui.jpg",
 "caption": "Esta é a legenda da imagem."
 }
}
```
:::tip Tip
The media `url` is temporary. Download the file immediately if you need to store it.
:::

</TabItem>
<TabItem value="button" label="Button Response">

```json
{
 "message": {
 "type": "buttons_response",
 "buttonId": "id_do_botao_clicado",
 "buttonText": "Texto do Botão Clicado"
 }
}
```

</TabItem>
<TabItem value="list" label="List Response">

```json
{
 "message": {
 "type": "list_response",
 "selectedRowId": "id_da_linha_selecionada"
 }
}
```

</TabItem>
</Tabs>

---

## Return Examples by Message Type {#exemplos-de-retorno-por-tipo}

Below are complete examples of JSON payloads returned by the `on-message-received` webhook for different message types. These examples show the complete payload structure as returned by the Z-API.

### Text Return Example

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
    "message": "teste",
    "descritpion": "(opcional) em caso da mensagem possuir uma descrição inserida pelo WhatsApp",
    "title": "(opcional) em caso da mensagem possuir um título inserido pelo WhatsApp",
    "url": "(opcional) caso a mensagem possua um link ligado a ela. Exemplo: mensagem de catálogo possui um botão 'Ver catálogo'",
    "thumbnailUrl": "(opcional) caso a mensagem possua uma imagem de thumbnail ligada a ela. Exemplo: mensagem de convite de grupo possui a imagem do grupo"
  }
}
```

### Text Template Return Example

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
    "message": "texto da mensagem",
    "footer": "rodapé da mensagem",
    "title": "título da mensagem",
    "templateId": "790118069824606",
    "hydratedButtons": []
  }
}
```

### Reaction Return Example

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

### Text (Button List) Return Example

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
  }
}
```

### OTP Button Template Return Example

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
    "message": "texto da mensagem",
    "footer": "",
    "title": "",
    "templateId": "",
    "hydratedButtons": [
      {
        "urlButton": {
          "displayText": "Copiar código",
          "url": "https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=otp123"
        },
        "index": 0
      }
    ]
  }
}
```

### PIX Key Button Return Example

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

### Button with Image Return Example

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
    "imageUrl": "URL da imagem",
    "videoUrl": null,
    "message": "Texto da mensagem",
    "buttons": [
      {
        "buttonId": "1",
        "type": 1,
        "buttonText": {
          "displayText": "Texto do botão 1"
        }
      },
      {
        "buttonId": "2",
        "type": 1,
        "buttonText": {
          "displayText": "Texto do botão 2"
        }
      }
    ]
  }
}
```

### Button with Video Return Example

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
    "videoUrl": "URL do video",
    "message": "Texto da mensagem",
    "buttons": [
      {
        "buttonId": "1",
        "type": 1,
        "buttonText": {
          "displayText": "Texto do botão 1"
        }
      },
      {
        "buttonId": "2",
        "type": 1,
        "buttonText": {
          "displayText": "Texto do botão 2"
        }
      }
    ]
  }
}
```

### Text (Option List) Return Example

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
    "message": "Z-API Asas para sua imaginação",
    "title": "Z-API",
    "selectedRowId": "1"
  }
}
```

### Carousel Return Example

```json
{
  "isStatusReply": false,
  "chatLid": null,
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "554499999999",
  "fromMe": true,
  "momment": 1739368022130,
  "status": "SENT",
  "chatName": "Nome",
  "senderPhoto": null,
  "senderName": "Nome",
  "photo": "https://",
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": true,
  "carouselMessage": {
    "text": "Texto da mensagem",
    "cards": [
      {
        "header": {
          "image": {
            "imageUrl": "https://",
            "thumbnailUrl": "https://",
            "caption": "",
            "mimeType": "image/jpeg",
            "viewOnce": false,
            "width": 0,
            "height": 0
          }
        },
        "message": "Mensagem do cartão do carrosel",
        "footer": "",
        "title": "",
        "hydratedButtons": [
          {
            "index": 0,
            "urlButton": {
              "displayText": "Texto do botão",
              "url": "https://"
            }
          },
          {
            "index": 1,
            "quickReplyButton": {
              "displayText": "Texto do botão",
              "id": "2"
            }
          }
        ]
      }
    ]
  }
}
```

### Text from Ad Return Example

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isGroup": false,
  "isEdit": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1657209752000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "name",
  "photo": null,
  "broadcast": false,
  "externalAdReply": {
    "title": "Titulo",
    "body": "texto do anuncio",
    "mediaType": 1,
    "thumbnailUrl": "https://",
    "sourceType": "ad",
    "sourceId": "23722824350495506",
    "ctwaClid": "Aff-niaAw7V94N8LGd79Vjr43TlJD4UnoBdpZJQ3LzABitbbG6wgKBSVOth4EN0IDr9glsKWjm2LBaFrJG3Nb0ILxP49ZtossVBNzlS8cFXBvv2ow7gNw",
    "sourceUrl": "https://",
    "containsAutoReply": false,
    "renderLargerThumbnail": true,
    "showAdAttribution": true
  },
  "messageExpirationSeconds": 0,
  "forwarded": false,
  "type": "ReceivedCallback",
  "text": {
    "message": "mensagem recebida",
    "description": "texto do anuncio",
    "title": "titulo",
    "url": "https://",
    "thumbnailUrl": "https://"
  }
}
```

### Image Return Example

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
    "width": 600,
    "height": 315,
    "viewOnce": true
  }
}
```

### Image Template Return Example

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
    "message": "texto da mensagem",
    "footer": "rodapé da mensagem",
    "title": "título da mensagem",
    "templateId": "674504507982622",
    "hydratedButtons": []
  }
}
```

### Audio Return Example

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
  }
}
```

### Video Return Example

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
  }
}
```

### Video Template Return Example

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
    "message": "texto da mensagem",
    "footer": "rodapé da mensagem",
    "title": "título da mensagem",
    "templateId": "938481574354947",
    "hydratedButtons": []
  }
}
```

### PTV Return Example

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
  "momment": 1688496074000,
  "status": "RECEIVED",
  "chatName": "eu",
  "senderPhoto": "https://",
  "senderName": "name",
  "photo": "https://",
  "broadcast": false,
  "participantPhone": "5544999999999",
  "messageExpirationSeconds": 0,
  "forwarded": true,
  "type": "ReceivedCallback",
  "video": {
    "videoUrl": "https://",
    "caption": "",
    "mimeType": "video/mp4"
  }
}
```

### Contact Return Example

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
  "contact": {
    "displayName": "Cesar Baleco",
    "vCard": "BEGIN:VCARD\\nVERSION:3.0\\nN:;nome;;;\\nFN:nome\\nTEL;type=CELL;type=VOICE;waid=5544999999999:+55 44 9999-9999\\nEND:VCARD",
    "phones": ["5544999999999"]
  }
}
```

### Document Return Example

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
  }
}
```

### Document Template Return Example

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
    "message": "texto da mensagem",
    "footer": "rodapé da mensagem",
    "title": "título da mensagem",
    "templateId": "811492407484976",
    "hydratedButtons": []
  }
}
```

### Location Return Example

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
  }
}
```

### Location Template Return Example

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
        "name": "nome do lugar",
        "address": "nome do enderço",
        "url": ""
      }
    },
    "message": "texto da mensagem",
    "footer": "rodapé da mensagem",
    "title": "título da mensagem",
    "templateId": "1143940003434066",
    "hydratedButtons": []
  }
}
```

### Sticker Return Example

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
  }
}
```

### GIF Return Example

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
    "mimeType": "video/mp4"
  }
}
```

### Payment Made Return Example

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
  }
}
```

### Payment Request Return Example

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
  "momment": 1632230332000,
  "status": "MESSAGE_RECEIVED",
  "chatName": "name",
  "senderName": "name",
  "participantPhone": "5544999999999",
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "notification": "PAYMENT_ACTION_REQUEST_DECLINED",
  "notificationParameters": ["5544999999999", "BRL", "1000"]
}
```

### Payment Received Return Example

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
  }
}
```

### Received Call Return Example

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isGroup": false,
  "isNewsletter": false,
  "isEdit": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "1679655074-84",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1679661190000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "photo": "https://",
  "broadcast": false,
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "CALL_VOICE",
  "notificationParameters": [],
  "callId": "F44E0E2011E7C784BB9A4AC11749C436"
}
```

### Missed Call Return Example

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
  "messageId": "1679655074-103",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1679661194000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "",
  "photo": "https://",
  "broadcast": false,
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "CALL_MISSED_VOICE",
  "notificationParameters": [],
  "callId": "F44E0E2011E7C784BB9A4AC11749C436"
}
```

### Group Join Request via Invite Link Example

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

### Group Join Request Revoked by User Example

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
  "notification": "REVOKED_MEMBERSHIP_REQUESTS",
  "notificationParameters": [
    "5544999999999"
  ],
  "callId": null,
  "code": null
}
```

### Group Join Request Added by Participant Example

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

### Admin Promoted to a Channel Example

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
  "chatName": "nome do canal",
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

### Admin Removed from a Channel Example

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
  "chatName": "nome do canal",
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

### Product Return Example

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
  }
}
```

### Cart Return Example

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

### Poll Return Example

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
  "poll": {
    "question": "Qual a melhor API de WhatsApp?",
    "pollMaxOptions": 0,
    "options": [
      {
        "name": "Z-API"
      },
      {
        "name": "Outras"
      }
    ]
  }
}
```

### Poll Response Return Example

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
  "momment": 1632228638000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": "if group, this will be the participant who responded",
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

### Order Submission Return Example

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

### Order Update Return Example

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

### Channel Admin Invite Return Example

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
    "text": "Quero convidar vocÃª para ser admin do meu canal no WhatsApp.",
    "inviteExpiration": 1706809668
  }
}
```

### Pin Message Return Example

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

### Event Return Example

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
    "name": "Nome do evento",
    "description": "Descrição do evento",
    "canceled": false,
    "joinLink": "https://call.whatsapp.com/video/v9123XNFG50L6iO79NddXNvKQr6bb3",
    "scheduleTime": 1716915653,
    "location": {}
  }
}
```

### Event Response Return Example

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

### "Waiting Message" Return Example

```json
{
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "momment": 1736797729000,
  "status": "RECEIVED",
  "fromMe": true,
  "phone": "5544999999999",
  "chatName": "chat",
  "senderName": "name",
  "senderPhoto": null,
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "type": "ReceivedCallback",
  "waitingMessage": true,
  "viewOnce": true
}
```

### Connected WhatsApp Name Change Return Example

```json
{
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "connectedPhone": "5544999999999",
  "fromMe": true,
  "momment": 1736797729000,
  "expiresAt": null,
  "status": "RECEIVED",
  "chatName": null,
  "senderPhoto": "https://",
  "senderName": "nome",
  "photo": "https://",
  "broadcast": false,
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "PROFILE_NAME_UPDATED",
  "callId": null,
  "code": null,
  "profileName": "nome atualizado"
}
```

### Connected WhatsApp Photo Change Return Example

```json
{
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "connectedPhone": "5544999999999",
  "fromMe": true,
  "momment": 1736797729000,
  "expiresAt": null,
  "status": "RECEIVED",
  "chatName": null,
  "senderPhoto": "https://",
  "senderName": "nome",
  "photo": "https://",
  "broadcast": false,
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "PROFILE_PICTURE_UPDATED",
  "callId": null,
  "code": null,
  "updatedPhoto": "https://"
}
```

### Chat Labels Change Return Example

```json
{
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "connectedPhone": "5544999999999",
  "fromMe": true,
  "momment": 1736797729000,
  "expiresAt": null,
  "status": "RECEIVED",
  "chatName": null,
  "senderPhoto": null,
  "senderName": "name",
  "photo": null,
  "broadcast": false,
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "CHAT_LABEL_ASSOCIATION",
  "notificationParameters": [
    {
      "phone": "5544977777777",
      "label": "1",
      "assigned": true
    },
    {
      "phone": "5544988888888",
      "label": "2",
      "assigned": false
    }
  ],
  "callId": null,
  "code": null
}
```

### Status Response Return Example

```json
{
  "isStatusReply": true,
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
  "momment": 1632228638000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "photo": "https://",
  "broadcast": false,
  "referenceMessageId": "3EB054C12BAAC70228AAB6",
  "messageExpirationSeconds": 0,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "text": {
    "message": "teste"
  },
  "statusImage": {
    "imageUrl": "https://",
    "thumbnailUrl": "https://",
    "caption": "",
    "mimetype": "image/jpeg",
    "viewOnce": false,
    "width": 1080,
    "height": 1920
  }
}
```

:::info Important

All media files received from Z-API through your webhook have an expiration period of **30 days**. After this period, all files, whether audio, PDF, image, etc., will be deleted from storage.

:::

---

## HTTP Error Codes {#codigos-de-erro-http}

### 405 - Method Not Allowed

In this case, make sure you are correctly sending the method specification, i.e., check if you sent `POST` or `PUT` as specified at the beginning of this topic.

### 415 - Unsupported Media Type

If you receive a 415 error, make sure to add the `Content-Type` of the object you are sending to the request headers, in most cases `application/json`.

---

## Notification Response {#notification-response}

### Concept

Notifications are WhatsApp messages based on WhatsApp's pre-existing message templates. When the webhook returns a payload with the `notification` field, it indicates that the message is a system notification and not a traditional user message.

That said, here are documented the notifications we receive. If you do not want to process these notifications, you must ignore the message when it arrives with the `notification` attribute.

### Notification Types

The `notification` field can contain the following values:

| Notification | Description |
|-------------|-----------|
| `MEMBERSHIP_APPROVAL_REQUEST` | Participant requested to join the group |
| `REVOKED_MEMBERSHIP_REQUESTS` | Group join request was revoked by the user |
| `GROUP_PARTICIPANT_LEAVE` | Participant left the group |
| `GROUP_CREATE` | Group was created |
| `GROUP_PARTICIPANT_ADD` | Participant was added to the group |
| `GROUP_PARTICIPANT_REMOVE` | Participant was removed from the group |
| `CALL_VOICE` | Voice call received |
| `CALL_MISSED_VOICE` | Missed voice call |
| `CALL_MISSED_VIDEO` | Missed video call |
| `E2E_ENCRYPTED` | Messages are protected with encryption |
| `CIPHERTEXT` | Messages are protected with end-to-end encryption |
| `BLUE_MSG_SELF_PREMISE_UNVERIFIED` | You are chatting with a business account, but it has not yet been confirmed by WhatsApp |
| `BLUE_MSG_SELF_PREMISE_VERIFIED` | You are chatting with a business account verified by WhatsApp |
| `BIZ_MOVE_TO_CONSUMER_APP` | This business account is now registered as a personal account and may no longer belong to a company |
| `REVOKE` | Message was deleted |
| `NEWSLETTER_ADMIN_PROMOTE` | Admin was promoted to a channel |
| `NEWSLETTER_ADMIN_DEMOTE` | Admin was removed from a channel |
| `PROFILE_NAME_UPDATED` | Connected WhatsApp profile name was changed |
| `PROFILE_PICTURE_UPDATED` | Connected WhatsApp profile picture was changed |
| `CHAT_LABEL_ASSOCIATION` | Chat labels were changed |
| `PAYMENT_ACTION_REQUEST_DECLINED` | Payment request was declined |

### Notification Processing Examples

Below are examples of how to process different types of notifications:

```javascript
function handleNotification(notification, notificationParameters) {
  switch (notification) {
    case 'MEMBERSHIP_APPROVAL_REQUEST':
      const participant = notificationParameters[0];
      console.log(`Participant ${participant} requested to join the group`);
      // Implement approval/rejection logic
      break;
      
    case 'GROUP_PARTICIPANT_LEAVE':
      const leftParticipant = notificationParameters[0];
      console.log(`Participant ${leftParticipant} left the group`);
      break;
      
    case 'CALL_MISSED_VOICE':
      console.log('Missed voice call!');
      // Implement notification logic
      break;
      
    case 'CALL_MISSED_VIDEO':
      console.log('Missed video call!');
      // Implement notification logic
      break;
      
    case 'GROUP_CREATE':
      const groupName = notificationParameters[0];
      console.log(`Created the group '${groupName}'`);
      break;
      
    case 'GROUP_PARTICIPANT_ADD':
      const addedParticipant = notificationParameters[0];
      console.log(`Participant ${addedParticipant} added`);
      break;
      
    case 'GROUP_PARTICIPANT_REMOVE':
      const removedParticipant = notificationParameters[0];
      console.log(`Participant ${removedParticipant} was removed`);
      break;
      
    case 'E2E_ENCRYPTED':
      console.log('Messages are protected with encryption');
      break;
      
    case 'CIPHERTEXT':
      console.log('Messages are protected with end-to-end encryption');
      break;
      
    case 'BLUE_MSG_SELF_PREMISE_UNVERIFIED':
      console.log('You are chatting with a business account, but it has not yet been confirmed by WhatsApp');
      break;
      
    case 'BLUE_MSG_SELF_PREMISE_VERIFIED':
      console.log('You are chatting with a business account verified by WhatsApp');
      break;
      
    case 'BIZ_MOVE_TO_CONSUMER_APP':
      console.log('This business account is now registered as a personal account');
      break;
      
    case 'REVOKE':
      console.log('Message was deleted');
      break;
      
    case 'NEWSLETTER_ADMIN_PROMOTE':
      const promotedAdmin = notificationParameters[0];
      const newRole = notificationParameters[1];
      console.log(`Admin ${promotedAdmin} promoted to ${newRole}`);
      break;
      
    case 'NEWSLETTER_ADMIN_DEMOTE':
      const demotedAdmin = notificationParameters[0];
      const oldRole = notificationParameters[1];
      console.log(`Admin ${demotedAdmin} removed from ${oldRole}`);
      break;
      
    case 'PROFILE_NAME_UPDATED':
      console.log('Profile name was updated');
      break;
      
    case 'PROFILE_PICTURE_UPDATED':
      console.log('Profile picture was updated');
      break;
      
    case 'CHAT_LABEL_ASSOCIATION':
      console.log('Chat labels were changed');
      // notificationParameters contains an array of objects with phone, label, assigned
      break;
      
    default:
      console.log(`Unknown notification: ${notification}`);
  }
}
```

:::tip Tip

- Use the `notification` field to identify when a message is a system notification
- The `notificationParameters` field contains additional information about the notification
- You can ignore notifications that are not relevant to your application
- Some notifications may be useful for updating the state of your application (e.g., when a participant leaves a group)

:::

---

## Code Examples

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SECURITY: Use environment variables for credentials
// Never commit tokens in the source code
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'YOUR_CLIENT_TOKEN';
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'YOUR_SECURITY_TOKEN';

// Input validation (security)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Invalid phone number. Use format: Country Code + Area Code + Number');
  }
  return cleaned;
}

// Process webhook and send response
async function handleWebhook(request) {
  try {
    // ⚠️ SECURITY: Validate webhook token
    const receivedToken = request.headers.get('x-token');
    if (receivedToken !== webhookToken) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { event, data } = await request.json();

    // Check if it's a message event and not from us
    if (event === 'message' && data && !data.fromMe) {
      const senderPhone = validatePhoneNumber(data.phone);

      // The 'data' object contains the raw payload (text, image, audio, etc.)
      // Implement specific logic here based on available fields
      
      // ⚠️ SECURITY: Do not log sensitive data
      console.log(`Message received from ${senderPhone}`);

      // Example: Responding only if the message contains text
      if (data.message && data.message.text) {
        const receivedText = data.message.text;
        const responseMessage = `You said: "${receivedText}"`;
        await sendTextMessage(senderPhone, responseMessage);
      }
    }

    // Always respond quickly to avoid blocking Z-API
    return new Response('OK', { status: 200 });
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling
    console.error('Error processing webhook:', error.message);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Send text message
async function sendTextMessage(phone, message) {
  try {
    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify({ phone, message }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SECURITY: Do not log tokens or sensitive data
    console.log('Response sent. MessageId:', result.messageId);
  } catch (error) {
    console.error('Error sending response:', error.message);
  }
}

// Usage example (Cloudflare Workers, Vercel, etc.)
export default {
  async fetch(request) {
    if (request.method === 'POST' && request.url.endsWith('/webhook')) {
      return handleWebhook(request);
    }
    return new Response('Not Found', { status: 404 });
  },
};
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// Types for better type safety
interface WebhookPayload {
  event: string;
  instanceId: string;
  data: {
    messageId: string;
    phone: string;
    fromMe: boolean;
    message: {
      type: string;
      text?: string;
    };
  };
}

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE_ID';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_INSTANCE_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'YOUR_CLIENT_TOKEN';
const webhookToken: string = process.env.ZAPI_WEBHOOK_TOKEN || 'YOUR_SECURITY_TOKEN';

// Input validation (security)
function validatePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Invalid phone number');
  }
  return cleaned;
}

// Process webhook
async function handleWebhook(request: Request): Promise<Response> {
  try {
    // ⚠️ SECURITY: Validate webhook token
    const receivedToken = request.headers.get('x-token');
    if (receivedToken !== webhookToken) {
      return new Response('Unauthorized', { status: 401 });
    }

    const payload: WebhookPayload = await request.json();

    // Check if it's a message event and not from us
    if (payload.event === 'message' && payload.data && !payload.data.fromMe) {
      const senderPhone = validatePhoneNumber(payload.data.phone);

      // The 'data' object contains the raw payload (text, image, audio, etc.)
      // Implement specific logic here based on available fields
      
      // ⚠️ SECURITY: Do not log sensitive data
      console.log(`Message received from ${senderPhone}`);

      // Example: Responding only if the message contains text
      if (payload.data.message && payload.data.message.text) {
        const receivedText = payload.data.message.text;
        const responseMessage = `You said: "${receivedText}"`;
        await sendTextMessage(senderPhone, responseMessage);
      }
    }

    // Always respond quickly to avoid blocking Z-API
    return new Response('OK', { status: 200 });
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling
    console.error('Error processing webhook:', error instanceof Error ? error.message : 'Unknown error');
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Send text message
async function sendTextMessage(phone: string, message: string): Promise<void> {
  try {
    // ⚠️ SECURITY: Always use HTTPS (never HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify({ phone, message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const result = await response.json();
    // ⚠️ SECURITY: Do not log tokens or sensitive data
    console.log('Response sent. MessageId:', result.messageId);
  } catch (error) {
    console.error('Error sending response:', error instanceof Error ? error.message : 'Unknown error');
  }
}
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
from flask import Flask, request, jsonify
import requests

# ⚠️ SECURITY: Use environment variables for credentials
instance_id = os.getenv('ZAPI_INSTANCE_ID', 'YOUR_INSTANCE_ID')
instance_token = os.getenv('ZAPI_INSTANCE_TOKEN', 'YOUR_INSTANCE_TOKEN')
client_token = os.getenv('ZAPI_CLIENT_TOKEN', 'YOUR_CLIENT_TOKEN')
webhook_token = os.getenv('ZAPI_WEBHOOK_TOKEN', 'YOUR_SECURITY_TOKEN')

app = Flask(__name__)

# Input validation (security)
def validate_phone_number(phone: str) -> str:
    cleaned = ''.join(filter(str.isdigit, phone))
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError('Invalid phone number. Use format: Country Code + Area Code + Number')
    return cleaned

@app.route('/webhook', methods=['POST'])
def webhook():
    try:
        # ⚠️ SECURITY: Validate webhook token
        received_token = request.headers.get('x-token')
        if received_token != webhook_token:
            return jsonify({'error': 'Unauthorized'}), 401

        payload = request.json
        event = payload.get('event')
        data = payload.get('data')

        # Check if it's a message event and not from us
        if event == 'message' and data and not data.get('fromMe'):
            sender_phone = validate_phone_number(data.get('phone'))

            # The 'data' object contains the raw payload (text, image, audio, etc.)
            # Implement specific logic here based on available fields
            
            # ⚠️ SECURITY: Do not log sensitive data
            print(f'Message received from {sender_phone}')

            # Example: Responding only if the message contains text
            message_obj = data.get('message', {})
            if message_obj.get('text'):
                received_text = message_obj.get('text')
                response_message = f'You said: "{received_text}"'
                send_text_message(sender_phone, response_message)

        # Always respond quickly to avoid blocking Z-API
        return jsonify({'status': 'OK'}), 200
    except Exception as e:
        # ⚠️ SECURITY: Generic error handling
        print(f'Error processing webhook: {str(e)}')
        return jsonify({'error': 'Internal Server Error'}), 500

def send_text_message(phone: str, message: str):
    try:
        # ⚠️ SECURITY: Always use HTTPS (never HTTP)
        url = f'https://api.z-api.io/instances/{instance_id}/token/{instance_token}/send-text'
        
        headers = {
            'Content-Type': 'application/json',
            'Client-Token': client_token,
        }
        
        response = requests.post(
            url,
            json={'phone': phone, 'message': message},
            headers=headers,
            timeout=30,
            verify=True,  # ⚠️ SECURITY: Verify SSL certificates
        )
        
        response.raise_for_status()
        result = response.json()
        # ⚠️ SECURITY: Do not log tokens or sensitive data
        print(f'Response sent. MessageId: {result.get("messageId")}')
    except Exception as e:
        print(f'Error sending response: {str(e)}')

if __name__ == '__main__':
    app.run(port=3000)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SECURITY: Use environment variables for credentials
# Configure via: export ZAPI_WEBHOOK_TOKEN="your-token"
WEBHOOK_TOKEN="${ZAPI_WEBHOOK_TOKEN:-YOUR_SECURITY_TOKEN}"

# Example of testing the webhook (simulating Z-API request)
# ⚠️ SECURITY: Always use HTTPS (never HTTP)
curl -X POST "https://your-server.com/webhook" \
  -H "Content-Type: application/json" \
  -H "x-token: ${WEBHOOK_TOKEN}" \
  -d '{
    "event": "message",
    "instanceId": "instance.id",
    "data": {
      "messageId": "3EB0C767F26A",
      "phone": "5511999999999",
      "fromMe": false,
      "message": {
        "type": "text",
        "text": "Hello! I would like more information."
      }
    }
  }' \
  --fail-with-body \
  --max-time 30

# ⚠️ SECURITY: Clear sensitive variables after use (optional)
unset WEBHOOK_TOKEN
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const http = require('http');
const https = require('https');
const { URL } = require('url');
const crypto = require('crypto');

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'YOUR_CLIENT_TOKEN';
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'YOUR_SECURITY_TOKEN';

// Input validation (security)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Invalid phone number. Use format: Country Code + Area Code + Number');
  }
  return cleaned;
}

function sendTextMessage(phone, message) {
  const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`);
  const postData = JSON.stringify({ phone, message });

  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
      'Content-Length': Buffer.byteLength(postData),
    },
    timeout: 30000,
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const result = JSON.parse(data);
        console.log('Response sent. MessageId:', result.messageId);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error sending response:', error.message);
  });

  req.write(postData);
  req.end();
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        // ⚠️ SECURITY: Validate webhook token (using timing-safe comparison)
        const providedToken = req.headers['x-token'];
        if (!providedToken || !crypto.timingSafeEqual(
          Buffer.from(providedToken),
          Buffer.from(webhookToken)
        )) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Unauthorized' }));
          return;
        }

        const payload = JSON.parse(body);
        const { event, data } = payload;

        // Check if it's a message event and not from us
        if (event === 'message' && data && !data.fromMe) {
          const senderPhone = validatePhoneNumber(data.phone);

          // The 'data' object contains the raw payload (text, image, audio, etc.)
          // Implement specific logic here based on available fields
          
          // ⚠️ SECURITY: Do not log sensitive data
          console.log(`Message received from ${senderPhone}`);

          // Example: Responding only if the message contains text
          if (data.message && data.message.text) {
            const receivedText = data.message.text;
            const responseMessage = `You said: "${receivedText}"`;
            sendTextMessage(senderPhone, responseMessage);
          }
        }

        // Always respond quickly to avoid blocking Z-API
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'OK' }));
      } catch (error) {
        // ⚠️ SECURITY: Generic error handling
        console.error('Error processing webhook:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

</TabItem>
<TabItem value="nodejs-express" label="Node.js (Express)">

```javascript
const express = require('express');
const https = require('https');
const { URL } = require('url');

const app = express();
app.use(express.json());

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'YOUR_CLIENT_TOKEN';
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'YOUR_SECURITY_TOKEN';

// Input validation (security)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Invalid phone number. Use format: Country Code + Area Code + Number');
  }
  return cleaned;
}

app.post('/webhook', (req, res) => {
  try {
    // ⚠️ SECURITY: Validate webhook token
    const receivedToken = req.headers['x-token'];
    if (receivedToken !== webhookToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { event, data } = req.body;

    // Check if it's a message event and not from us
    if (event === 'message' && data && !data.fromMe) {
      const senderPhone = validatePhoneNumber(data.phone);

      // The 'data' object contains the raw payload (text, image, audio, etc.)
      // Implement specific logic here based on available fields
      
      // ⚠️ SECURITY: Do not log sensitive data
      console.log(`Message received from ${senderPhone}`);

      // Example: Responding only if the message contains text
      if (data.message && data.message.text) {
        const receivedText = data.message.text;
        const responseMessage = `You said: "${receivedText}"`;
        sendTextMessage(senderPhone, responseMessage);
      }
    }

    // Always respond quickly to avoid blocking Z-API
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling
    console.error('Error processing webhook:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function sendTextMessage(phone, message) {
  const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`);
  const postData = JSON.stringify({ phone, message });

  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
      'Content-Length': Buffer.byteLength(postData),
    },
    timeout: 30000,
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const result = JSON.parse(data);
        console.log('Response sent. MessageId:', result.messageId);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error sending response:', error.message);
  });

  req.write(postData);
  req.end();
}

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

</TabItem>
<TabItem value="nodejs-koa" label="Node.js (Koa)">

```javascript
const Koa = require('koa');
const Router = require('@koa/router');
const https = require('https');
const { URL } = require('url');

const app = new Koa();
const router = new Router();

// ⚠️ SECURITY: Use environment variables for credentials
const instanceId = process.env.ZAPI_INSTANCE_ID || 'YOUR_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'YOUR_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'YOUR_CLIENT_TOKEN';
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'YOUR_SECURITY_TOKEN';

// Middleware for JSON parsing
app.use(require('koa-bodyparser')());

// Input validation (security)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Invalid phone number. Use format: Country Code + Area Code + Number');
  }
  return cleaned;
}

// Route to receive webhook
router.post('/webhook', async (ctx) => {
  try {
    // ⚠️ SECURITY: Validate webhook token
    const receivedToken = ctx.request.headers['x-token'];
    if (receivedToken !== webhookToken) {
      ctx.status = 401;
      ctx.body = { error: 'Unauthorized' };
      return;
    }

    const { event, data } = ctx.request.body;

    // Check if it's a message event and not from us
    if (event === 'message' && data && !data.fromMe) {
      const senderPhone = validatePhoneNumber(data.phone);

      // The 'data' object contains the raw payload (text, image, audio, etc.)
      // Implement specific logic here based on available fields
      
      // ⚠️ SECURITY: Do not log sensitive data
      console.log(`Message received from ${senderPhone}`);

      // Example: Responding only if the message contains text
      if (data.message && data.message.text) {
        const receivedText = data.message.text;
        const responseMessage = `You said: "${receivedText}"`;
        sendTextMessage(senderPhone, responseMessage);
      }
    }

    // Always respond quickly to avoid blocking Z-API
    ctx.status = 200;
    ctx.body = { status: 'OK' };
  } catch (error) {
    // ⚠️ SECURITY: Generic error handling
    ctx.app.emit('error', error, ctx);
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

function sendTextMessage(phone, message) {
  const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`);
  const postData = JSON.stringify({ phone, message });

  const options = {
    hostname: url.hostname,
    path: url.pathname,
 method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
      'Content-Length': Buffer.byteLength(postData),
    },
    timeout: 30000,
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const result = JSON.parse(data);
        // ⚠️ SECURITY: Do not log tokens or sensitive data
        console.log('Response sent. MessageId:', result.messageId);
      } else {
        // ⚠️ SECURITY: Do not expose sensitive details in logs
        console.error(`HTTP Error ${res.statusCode}: Request failed`);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error sending response:', error.message);
  });

  req.write(postData);
  req.end();
}

app.use(router.routes());
app.use(router.allowedMethods());

// Error handler
app.on('error', (err, ctx) => {
  console.error('Error processing webhook:', err.message);
});

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

</TabItem>
<TabItem value="java" label="Java">

```java
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.*;
import java.net.InetSocketAddress;
import java.net.URL;
import java.net.HttpURLConnection;
import java.nio.charset.StandardCharsets;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

// ⚠️ SECURITY: Use environment variables for credentials
class MessageWebhookHandler implements HttpHandler {
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "YOUR_INSTANCE_ID";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "YOUR_INSTANCE_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "YOUR_CLIENT_TOKEN";
    private static final String WEBHOOK_TOKEN = System.getenv("ZAPI_WEBHOOK_TOKEN") != null 
        ? System.getenv("ZAPI_WEBHOOK_TOKEN") : "YOUR_SECURITY_TOKEN";
    private static final Gson gson = new Gson();

    // Input validation (security)
    private String validatePhoneNumber(String phone) {
        String cleaned = phone.replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("Invalid phone number");
        }
        return cleaned;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (!"POST".equals(exchange.getRequestMethod())) {
            sendResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }

        try {
            // ⚠️ SECURITY: Validate webhook token
            String receivedToken = exchange.getRequestHeaders().getFirst("x-token");
            if (receivedToken == null || !receivedToken.equals(WEBHOOK_TOKEN)) {
                sendResponse(exchange, 401, "{\"error\":\"Unauthorized\"}");
                return;
            }

            // Read payload
            String requestBody = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            JsonObject payload = gson.fromJson(requestBody, JsonObject.class);

            String event = payload.get("event").getAsString();
            JsonObject data = payload.getAsJsonObject("data");

            // Check if it's a message event and not from us
            if ("message".equals(event) && data != null && !data.get("fromMe").getAsBoolean()) {
                String senderPhone = validatePhoneNumber(data.get("phone").getAsString());

                // The 'data' object contains the raw payload (text, image, audio, etc.)
                // Implement specific logic here based on available fields
                
                System.out.println("Message received from " + senderPhone);

                // Example: Responding only if the message contains text
                JsonObject message = data.getAsJsonObject("message");
                if (message != null && message.has("text")) {
                    String receivedText = message.get("text").getAsString();
                    String responseMessage = "You said: \"" + receivedText + "\"";
                    sendTextMessage(senderPhone, responseMessage);
                }
            }

            // Always respond quickly to avoid blocking Z-API
            sendResponse(exchange, 200, "{\"status\":\"OK\"}");
        } catch (Exception e) {
            System.err.println("Error processing webhook: " + e.getMessage());
            sendResponse(exchange, 500, "{\"error\":\"Internal Server Error\"}");
        }
    }

    private void sendTextMessage(String phone, String message) {
        try {
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-text",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);

            String jsonInputString = String.format("{\"phone\":\"%s\",\"message\":\"%s\"}",
                phone.replace("\"", "\\\""), message.replace("\"", "\\\""));

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            int responseCode = conn.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) {
                try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    JsonObject result = gson.fromJson(response.toString(), JsonObject.class);
                    System.out.println("Response sent. MessageId: " + result.get("messageId").getAsString());
                }
            }
        } catch (Exception e) {
            System.err.println("Error sending response: " + e.getMessage());
        }
    }

    private void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, response.getBytes().length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }
}

public class WebhookServer {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(3000), 0);
        server.createContext("/webhook", new MessageWebhookHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("Webhook server running on port 3000");
    }
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

// ⚠️ SECURITY: Use environment variables for credentials
public class MessageWebhookHandler
{
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") 
        ?? "YOUR_INSTANCE_ID";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") 
        ?? "YOUR_INSTANCE_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") 
        ?? "YOUR_CLIENT_TOKEN";
    private static readonly string WebhookToken = Environment.GetEnvironmentVariable("ZAPI_WEBHOOK_TOKEN") 
        ?? "YOUR_SECURITY_TOKEN";

    // Input validation (security)
    private static string ValidatePhoneNumber(string phone)
    {
        string cleaned = System.Text.RegularExpressions.Regex.Replace(phone, @"\D", "");
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("Invalid phone number");
        }
        return cleaned;
    }

    public static async Task HandleRequest(HttpListenerContext context)
    {
        var request = context.Request;
        var response = context.Response;

        if (request.HttpMethod != "POST")
        {
            SendResponse(response, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }

        try
        {
            // ⚠️ SECURITY: Validate webhook token
            string receivedToken = request.Headers["x-token"];
            if (string.IsNullOrEmpty(receivedToken) || receivedToken != WebhookToken)
            {
                SendResponse(response, 401, "{\"error\":\"Unauthorized\"}");
                return;
            }

            // Read payload
            string requestBody;
            using (var reader = new StreamReader(request.InputStream, Encoding.UTF8))
            {
                requestBody = await reader.ReadToEndAsync();
            }

            JObject payload = JObject.Parse(requestBody);
            string eventType = payload["event"].ToString();
            JObject data = payload["data"] as JObject;

            // Check if it's a message event and not from us
            if (eventType == "message" && data != null && !data["fromMe"].Value<bool>())
            {
                string senderPhone = ValidatePhoneNumber(data["phone"].ToString());

                // The 'data' object contains the raw payload (text, image, audio, etc.)
                // Implement specific logic here based on available fields
                
                Console.WriteLine($"Message received from {senderPhone}");

                // Example: Responding only if the message contains text
                JObject message = data["message"] as JObject;
                if (message != null && message["text"] != null)
                {
                    string receivedText = message["text"].ToString();
                    string responseMessage = $"You said: \"{receivedText}\"";
                    await SendTextMessage(senderPhone, responseMessage);
                }
            }

            // Always respond quickly to avoid blocking Z-API
            SendResponse(response, 200, "{\"status\":\"OK\"}");
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error processing webhook: {ex.Message}");
            SendResponse(response, 500, "{\"error\":\"Internal Server Error\"}");
        }
    }

    private static async Task SendTextMessage(string phone, string message)
    {
        try
        {
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-text";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var json = JsonConvert.SerializeObject(new { phone, message });
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    JObject resultObj = JObject.Parse(result);
                    Console.WriteLine($"Response sent. MessageId: {resultObj["messageId"]}");
                }
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error sending response: {ex.Message}");
        }
    }

    private static void SendResponse(HttpListenerResponse response, int statusCode, string body)
    {
        response.StatusCode = statusCode;
        response.ContentType = "application/json";
        byte[] buffer = Encoding.UTF8.GetBytes(body);
        response.ContentLength64 = buffer.Length;
        response.OutputStream.Write(buffer, 0, buffer.Length);
        response.Close();
    }
}

// Example usage with HttpListener
class Program
{
    static void Main()
    {
        HttpListener listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:3000/webhook/");
        listener.Start();
        Console.WriteLine("Webhook server running on port 3000");

        while (true)
        {
            HttpListenerContext context = listener.GetContext();
            Task.Run(() => MessageWebhookHandler.HandleRequest(context));
        }
    }
}
```

</TabItem>
<TabItem value="go" label="Go">

```go
package main

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "os"
    "regexp"
    "strings"
    "time"
)

// ⚠️ SECURITY: Use environment variables for credentials
var instanceID = getEnv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE_ID")
var instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "YOUR_INSTANCE_TOKEN")
var clientToken = getEnv("ZAPI_CLIENT_TOKEN", "YOUR_CLIENT_TOKEN")
var webhookToken = getEnv("ZAPI_WEBHOOK_TOKEN", "YOUR_SECURITY_TOKEN")

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

// Payload structures
type WebhookPayload struct {
    Event      string `json:"event"`
    InstanceID string `json:"instanceId"`
    Data       struct {
        MessageID string `json:"messageId"`
        Phone     string `json:"phone"`
        FromMe    bool   `json:"fromMe"`
        Message   struct {
            Type string `json:"type"`
            Text string `json:"text"`
        } `json:"message"`
    } `json:"data"`
}

// Input validation (security)
func validatePhoneNumber(phone string) (string, error) {
    re := regexp.MustCompile(`\D`)
    cleaned := re.ReplaceAllString(phone, "")
    if len(cleaned) < 10 || len(cleaned) > 15 {
        return "", fmt.Errorf("invalid phone number")
    }
    return cleaned, nil
}

func sendTextMessage(phone, message string) {
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-text", instanceID, instanceToken)
    
    requestData := map[string]string{
        "phone":   phone,
        "message": message,
    }
    
    jsonData, _ := json.Marshal(requestData)
    
    req, _ := http.NewRequest("POST", url, strings.NewReader(string(jsonData)))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)
    
    client := &http.Client{Timeout: 30 * time.Second}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Error sending response: %v\n", err)
        return
    }
    defer resp.Body.Close()
    
    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        var result map[string]interface{}
        json.NewDecoder(resp.Body).Decode(&result)
        fmt.Printf("Response sent. MessageId: %v\n", result["messageId"])
    }
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }

    // ⚠️ SECURITY: Validate webhook token
    receivedToken := r.Header.Get("x-token")
    if receivedToken != webhookToken {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    body, err := io.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "Error reading payload", http.StatusBadRequest)
        return
    }
    defer r.Body.Close()

    var payload WebhookPayload
    if err := json.Unmarshal(body, &payload); err != nil {
        http.Error(w, "Error processing JSON", http.StatusBadRequest)
        return
    }

    // Check if it's a message event and not from us
    if payload.Event == "message" && !payload.Data.FromMe {
        senderPhone, err := validatePhoneNumber(payload.Data.Phone)
        if err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }

        // The 'data' object contains the raw payload (text, image, audio, etc.)
        // Implement specific logic here based on available fields
        
        fmt.Printf("Message received from %s\n", senderPhone)

        // Example: Responding only if the message contains text
        if payload.Data.Message.Text != "" {
            receivedText := payload.Data.Message.Text
            responseMessage := fmt.Sprintf("You said: \"%s\"", receivedText)
            sendTextMessage(senderPhone, responseMessage)
        }
    }

    // Always respond quickly to avoid blocking Z-API
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{"status": "OK"})
}

func main() {
    http.HandleFunc("/webhook", webhookHandler)
    fmt.Println("Webhook server running on port 3000")
    http.ListenAndServe(":3000", nil)
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// ⚠️ SECURITY: Use environment variables for credentials
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'YOUR_INSTANCE_ID';
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'YOUR_INSTANCE_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'YOUR_CLIENT_TOKEN';
$webhookToken = getenv('ZAPI_WEBHOOK_TOKEN') ?: 'YOUR_SECURITY_TOKEN';

// Input validation (security)
function validatePhoneNumber($phone) {
    $cleaned = preg_replace('/\D/', '', $phone);
    if (strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new Exception('Invalid phone number. Use format: Country Code + Area Code + Number');
    }
    return $cleaned;
}

// Process webhook
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // ⚠️ SECURITY: Validate webhook token
        $receivedToken = $_SERVER['HTTP_X_TOKEN'] ?? '';
        if ($receivedToken !== $webhookToken) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            exit;
        }

        // Read payload
        $payload = json_decode(file_get_contents('php://input'), true);
        
        $event = $payload['event'] ?? '';
        $data = $payload['data'] ?? [];

        // Check if it's a message event and not from us
        if ($event === 'message' && !empty($data) && !($data['fromMe'] ?? false)) {
            $senderPhone = validatePhoneNumber($data['phone']);

            // The 'data' object contains the raw payload (text, image, audio, etc.)
            // Implement specific logic here based on available fields
            
            // ⚠️ SECURITY: Do not log sensitive data
            error_log("Message received from {$senderPhone}");

            // Example: Responding only if the message contains text
            $message = $data['message'] ?? [];
            if (!empty($message['text'])) {
                $receivedText = $message['text'];
                $responseMessage = "You said: \"{$receivedText}\"";
                sendTextMessage($senderPhone, $responseMessage);
            }
        }

        // Always respond quickly to avoid blocking Z-API
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode(['status' => 'OK']);
    } catch (Exception $e) {
        // ⚠️ SECURITY: Generic error handling
        error_log("Error processing webhook: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Internal Server Error']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

function sendTextMessage($phone, $message) {
    global $instanceId, $instanceToken, $clientToken;
    
    try {
        $url = "https://api.z-api.io/instances/" . urlencode($instanceId) . "/token/" . urlencode($instanceToken) . "/send-text";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['phone' => $phone, 'message' => $message]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Client-Token: ' . $clientToken,
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode >= 200 && $httpCode < 300) {
            $result = json_decode($response, true);
            error_log("Response sent. MessageId: " . ($result['messageId'] ?? ''));
        }
    } catch (Exception $e) {
        error_log("Error sending response: " . $e->getMessage());
    }
}
?>
```

</TabItem>
<TabItem value="ruby" label="Ruby">

```ruby
require 'sinatra'
require 'json'
require 'net/http'
require 'uri'

# ⚠️ SECURITY: Use environment variables for credentials
INSTANCE_ID = ENV['ZAPI_INSTANCE_ID'] || 'YOUR_INSTANCE_ID'
INSTANCE_TOKEN = ENV['ZAPI_INSTANCE_TOKEN'] || 'YOUR_INSTANCE_TOKEN'
CLIENT_TOKEN = ENV['ZAPI_CLIENT_TOKEN'] || 'YOUR_CLIENT_TOKEN'
WEBHOOK_TOKEN = ENV['ZAPI_WEBHOOK_TOKEN'] || 'YOUR_SECURITY_TOKEN'

# Input validation (security)
def validate_phone_number(phone)
  cleaned = phone.gsub(/\D/, '')
  if cleaned.length < 10 || cleaned.length > 15
    raise ArgumentError, 'Invalid phone number. Use format: Country Code + Area Code + Number'
  end
  cleaned
end

def send_text_message(phone, message)
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(INSTANCE_ID)}/token/#{URI.encode_www_form_component(INSTANCE_TOKEN)}/send-text")
  
  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url.path)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = CLIENT_TOKEN
  request.body = { phone: phone, message: message }.to_json

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts "Response sent. MessageId: #{result['messageId']}"
  end
rescue => e
  puts "Error sending response: #{e.message}"
end

post '/webhook' do
  begin
    # ⚠️ SECURITY: Validate webhook token
    received_token = request.env['HTTP_X_TOKEN']
    if received_token != WEBHOOK_TOKEN
      status 401
      return { error: 'Unauthorized' }.to_json
    end

    payload = JSON.parse(request.body.read)
    event = payload['event']
    data = payload['data']

    # Check if it's a message event and not from us
    if event == 'message' && data && !data['fromMe']
      sender_phone = validate_phone_number(data['phone'])

      # The 'data' object contains the raw payload (text, image, audio, etc.)
      # Implement specific logic here based on available fields
      
      # ⚠️ SECURITY: Do not log sensitive data
      puts "Message received from #{sender_phone}"

      # Example: Responding only if the message contains text
      message_obj = data['message'] || {}
      if message_obj['text']
        received_text = message_obj['text']
        response_message = "You said: \"#{received_text}\""
        send_text_message(sender_phone, response_message)
      end
    end

    # Always respond quickly to avoid blocking Z-API
    status 200
    { status: 'OK' }.to_json
  rescue => e
    # ⚠️ SECURITY: Generic error handling
    puts "Error processing webhook: #{e.message}"
    status 500
    { error: 'Internal Server Error' }.to_json
  end
end

# Start server
set :port, 3000
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import Foundation
import Vapor

// ⚠️ SECURITY: Use environment variables for credentials
let instanceId = Environment.get("ZAPI_INSTANCE_ID") ?? "YOUR_INSTANCE_ID"
let instanceToken = Environment.get("ZAPI_INSTANCE_TOKEN") ?? "YOUR_INSTANCE_TOKEN"
let clientToken = Environment.get("ZAPI_CLIENT_TOKEN") ?? "YOUR_CLIENT_TOKEN"
let webhookToken = Environment.get("ZAPI_WEBHOOK_TOKEN") ?? "YOUR_SECURITY_TOKEN"

// Payload structures
struct WebhookPayload: Content {
    let event: String
    let instanceId: String
    let data: MessageData
}

struct MessageData: Content {
    let messageId: String
    let phone: String
    let fromMe: Bool
    let message: MessageContent
}

struct MessageContent: Content {
    let type: String
    let text: String?
}

// Input validation (security)
func validatePhoneNumber(_ phone: String) throws -> String {
    let cleaned = phone.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
    if cleaned.count < 10 || cleaned.count > 15 {
        throw Abort(.badRequest, reason: "Invalid phone number")
    }
    return cleaned
}

func sendTextMessage(_ phone: String, _ message: String, on app: Application) {
    let url = "https://api.z-api.io/instances/\(instanceId)/token/\(instanceToken)/send-text"
    
    let body: [String: String] = ["phone": phone, "message": message]
    
    app.client.post(URI(string: url)) { req in
        try req.content.encode(body, as: .json)
        req.headers.add(name: "Client-Token", value: clientToken)
    }.whenComplete { result in
        switch result {
        case .success(let response):
            if let result = try? response.content.decode([String: String].self) {
                app.logger.info("Response sent. MessageId: \(result["messageId"] ?? "")")
            }
        case .failure(let error):
            app.logger.error("Error sending response: \(error.localizedDescription)")
        }
    }
}

// Configure route
func configure(_ app: Application) throws {
    app.post("webhook") { req -> EventLoopFuture<Response> in
        // ⚠️ SECURITY: Validate webhook token
        guard let receivedToken = req.headers["x-token"].first,
              receivedToken == webhookToken else {
            throw Abort(.unauthorized, reason: "Invalid security token")
        }

        return req.content.decode(WebhookPayload.self).flatMap { payload in
            // Check if it's a message event and not from us
            if payload.event == "message" && !payload.data.fromMe {
                do {
                    let senderPhone = try validatePhoneNumber(payload.data.phone)

                    // The 'data' object contains the raw payload (text, image, audio, etc.)
                    // Implement specific logic here based on available fields
                    
                    app.logger.info("Message received from \(senderPhone)")

                    // Example: Responding only if the message contains text
                    if let text = payload.data.message.text {
                        let receivedText = text
                        let responseMessage = "You said: \"\(receivedText)\""
                        sendTextMessage(senderPhone, responseMessage, on: app)
                    }
                } catch {
                    app.logger.error("Validation error: \(error)")
                }
            }

            // Always respond quickly to avoid blocking Z-API
            return req.eventLoop.makeSucceededFuture(Response(status: .ok, body: .init(string: "{\"status\":\"OK\"}")))
        }
    }
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SECURITY: Use environment variables for credentials
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "YOUR_INSTANCE_ID" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "YOUR_INSTANCE_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "YOUR_CLIENT_TOKEN" }
$webhookToken = if ($env:ZAPI_WEBHOOK_TOKEN) { $env:ZAPI_WEBHOOK_TOKEN } else { "YOUR_SECURITY_TOKEN" }

# Input validation (security)
function Validate-PhoneNumber {
    param($phone)
    $cleaned = $phone -replace '\D', ''
    if ($cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "Invalid phone number. Use format: Country Code + Area Code + Number"
    }
    return $cleaned
}

function Send-TextMessage {
    param($phone, $message)
    
    try {
        $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-text"
        
        $headers = @{
            "Content-Type" = "application/json"
            "Client-Token" = $clientToken
        }
        
        $body = @{
            phone = $phone
            message = $message
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30 -ErrorAction Stop
        Write-Host "Response sent. MessageId: $($response.messageId)"
    } catch {
        Write-Host "Error sending response: $($_.Exception.Message)"
    }
}

# Create HTTP listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:3000/webhook/")
$listener.Start()

Write-Host "Webhook server running on port 3000"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    try {
        if ($request.HttpMethod -ne "POST") {
            $response.StatusCode = 405
            $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"error":"Method not allowed"}')
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        # ⚠️ SECURITY: Validate webhook token
        $receivedToken = $request.Headers["x-token"]
        if ($receivedToken -ne $webhookToken) {
            $response.StatusCode = 401
            $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"error":"Unauthorized"}')
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        # Read payload
        $reader = New-Object System.IO.StreamReader($request.InputStream)
        $body = $reader.ReadToEnd()
        $payload = $body | ConvertFrom-Json

        # Check if it's a message event and not from us
        if ($payload.event -eq "message" -and $payload.data -and -not $payload.data.fromMe) {
            $senderPhone = Validate-PhoneNumber -phone $payload.data.phone

            # The 'data' object contains the raw payload (text, image, audio, etc.)
            # Implement specific logic here based on available fields
            
            Write-Host "Message received from $senderPhone"

            # Example: Responding only if the message contains text
            $message = $payload.data.message
            if ($message.text) {
                $receivedText = $message.text
                $responseMessage = "You said: `"$receivedText`""
                Send-TextMessage -phone $senderPhone -message $responseMessage
            }
        }

        # Always respond quickly to avoid blocking Z-API
        $response.StatusCode = 200
        $response.ContentType = "application/json"
        $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"status":"OK"}')
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } catch {
        Write-Host "Error processing webhook: $($_.Exception.Message)"
        $response.StatusCode = 500
        $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"error":"Internal Server Error"}')
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } finally {
        $response.Close()
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST /webhook HTTP/1.1
Host: your-server.com
Content-Type: application/json
x-token: YOUR_SECURITY_TOKEN
Content-Length: 245

{
  "event": "message",
  "instanceId": "instance.id",
  "data": {
    "messageId": "3EB0C767F26A",
    "phone": "5511999999999",
    "fromMe": false,
    "message": {
      "type": "text",
      "text": "Hello! I would like more information."
    }
  }
}
```

**Note:** This is an example raw HTTP request that Z-API sends to your webhook. In production:
- ⚠️ **SECURITY:** Always validate the `x-token` header before processing the payload
- ⚠️ **SECURITY:** Always use HTTPS (not HTTP)
- ⚠️ **Validation:** Validate the payload (event, data, phone, message) before processing
- ⚠️ **Performance:** Respond with `200 OK` quickly to avoid blocking Z-API

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <curl/curl.h>
#include <json/json.h>

// ⚠️ SECURITY: Use environment variables for credentials
std::string getEnv(const char* key, const std::string& defaultValue) {
    const char* value = std::getenv(key);
    return value ? std::string(value) : defaultValue;
}

std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE_ID");
std::string instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "YOUR_INSTANCE_TOKEN");
std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "YOUR_CLIENT_TOKEN");
std::string webhookToken = getEnv("ZAPI_WEBHOOK_TOKEN", "YOUR_SECURITY_TOKEN");

// Input validation (security)
std::string validatePhoneNumber(const std::string& phone) {
    std::regex nonDigit("\\D");
    std::string cleaned = std::regex_replace(phone, nonDigit, "");
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::invalid_argument("Invalid phone number");
    }
    return cleaned;
}

// Example processing (using libmicrohttpd or similar)
// This is a simplified example - in production use a suitable HTTP library
int main() {
    // HTTP server implementation here
    // Example using libmicrohttpd or another library
    
    std::cout << "Webhook server running on port 3000" << std::endl;
    return 0;
}
```

**Compilation:**
```bash
# Requires libcurl-dev, libjsoncpp-dev, and libmicrohttpd-dev
g++ -o webhook_server webhook_server.cpp -lcurl -ljsoncpp -lmicrohttpd
```

</TabItem>
<TabItem value="c" label="C">

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>

// ⚠️ SECURITY: Use environment variables for credentials
char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

char* instanceId = getEnv("ZAPI_INSTANCE_ID", "YOUR_INSTANCE_ID");
char* instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "YOUR_INSTANCE_TOKEN");
char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "YOUR_CLIENT_TOKEN");
char* webhookToken = getEnv("ZAPI_WEBHOOK_TOKEN", "YOUR_SECURITY_TOKEN");

// Example processing (using libmicrohttpd or similar)
// This is a simplified example - in production use a suitable HTTP library
int main() {
    // HTTP server implementation here
    // Example using libmicrohttpd or another library
    
    printf("Webhook server running on port 3000\n");
    return 0;
}
```

**Compilation:**
```bash
# Requires libcurl-dev and libmicrohttpd-dev
gcc -o webhook_server webhook_server.c -lcurl -lmicrohttpd
```

</TabItem>
</Tabs>