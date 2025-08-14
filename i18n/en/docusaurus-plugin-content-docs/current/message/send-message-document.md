---
id: send-message-document
title: Send documents 
---

## Method

#### /send-document/{extension}

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-document/ **{extension}**


> **Don’t forget!** You need to inform the **{extension}** parameter with the extension of the file you want to send! Theoretically this method should support all types of documents, as long as they are within WhatsApp's own file size policies (to know more about these limits [click here]).

[Click here]: https://developers.facebook.com/docs/whatsapp/api/media/#post-processing

### Size and formats 

WhatsApp limits the size of files, and its policy changes frequently. That's why we always recommend checking directly on the WhatsApp website for the latest information.
In this [link], you'll find everything you need to know about file formats and sizes.

[link]: https://developers.facebook.com/docs/whatsapp/api/media

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept 

Method responsible for sending documents to your contacts. It is simple and objective.

![image](../../../../../img/SendingDocument.jpeg)

---

## Attributes

### Required

| Attributes | Type | Description |
| :-- | :-: | :-- |
| phone | string | Recipient (or group ID in case you want to send it to a group) telephone number in the format DDI DDD NUMERS Ex: 551199999999. IMPORTANT  only send numbers without formatting or a mask  |
| document | string | video’s link or its Base64 |

### Opcionais

| Attributes | Type | Description |
| :-- | :-: | :-- |
| fileName | String | Documents name |
| messageId | String | Attribute used to answer a chat message. All you have to do is add the messageID of the message that you want to respond to this attribute |
| delayMessage | number | In this attribute a delay is added to the message. You can decide between a range of 1 - 15 secs (this is for how many seconds it will wait to send the next message EX: “delayMessage”:5,). The default delay is between 1 - 3 secs. |
| editMessageId | string | This attribute allows you to edit the caption of previously sent documents on WhatsApp. Use the message ID and the new caption in the JSON to make changes. It's necessary to configure the webhook before edit (Only the caption of the message can be edited). |

---

## Request Body

**Sending using URL**
```json
{
  "phone": "5544999999999",
  "document": "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
  "fileName": "My PDF"
}
```

**Sending using Base64**
```json
{
  "phone": "5544999999999",
  "document": "data:application/pdf;base64,JVBERiN0YXJ0eHJlZg0KMjg3NDINCiUlRU9G0xLj",
  "fileName": "My PDF"
}
```

---

## Response

### 200

| Attributes | Type   | Description      |
| :-------- | :----- | :------------- |
| zaapId    | string | id on z-api    |
| messageId | string | id on whatsapp |

Example 

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68"
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.
### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Webhook Response

Link for webhooks response (upon receiving)

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-documento)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-document.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
