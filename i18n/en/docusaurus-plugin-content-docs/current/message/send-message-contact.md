---
id: send-message-contact
title: Send contact 
---

## Method

#### /send-contact

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-contact

---

## Concept


Simple and object, this method allows you to send a contact. You don't need to have it added to your contacts list, all you have to do is fill in the method attributes with the contact information and send.

![image](../../../../../img/send-message-contact.jpeg)

---

## Attributes 

### Mandatory 

| Attributes | Type | Description |
| :-- | :-: | :-- |
| phone | string | Recipient (or group ID in case you want to send it to a group) telephone number in the format DDI DDD NUMERS Ex: 551199999999. IMPORTANT  only send numbers without formatting or a mask  |
| contactName | string | Contact’s name  |
| contactPhone | string | Contact’s phone number that you’d like to share |

### Optionals 

| Attributes | Type | Description  |
| :-- | :-: | :-- |
| messageId | String | Attribute used to answer a chat message. All you have to do is add the messageID of the message that you want to respond to this attribute |
| delayMessage | number | In this attribute a delay is added to the message. You can decide between a range of 1 - 15 secs (this is for how many seconds it will wait to send the next message EX: “delayMessage”:5,). The default delay is between 1 - 3 secs. |
| contactBusinessDescription | string | Short contact description (not displayed on WhatsApp Web) |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "contactName": "Z-API Contato",
  "contactPhone": "554498398733"
}
```

---

## Response

### 200

| Attributes | Type   | Description       |
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

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-contato)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-contact.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
