---
id: send-message-multiple-contacts
title: Send multiple contacts
---

## Method

#### /send-contacts

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-contacts

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

Simple and straightforward, this method allows you to send multiple contacts. You don't need to have them in your contacts; just fill the method's attributes with the contact information and send.

![image](../../../../../img/send-message-contacts.jpeg)

---

## Attributes

### Required

| Attributes   | Type   | Description |
| :-------     | :-:    | :-------    |
| phone        | string | Recipient (or group ID in case you want to send it to a group) telephone number in the format DDI DDD NUMERS Ex: 551199999999. IMPORTANT  only send numbers without formatting or a mask |
| contacts | array | Array of contacts to be sent|

#### Contact attributes

| Atributos           |  Tipo  | Descrição                                      |
| :------------------ | :----: | :-----------------------------------------     |
| name                | string | Contact name                                   |
| phones              | array  | Contact numbers                                |
| businessDescription | string | Brief description about the contact (optional) |

### Optional

| Attributes   | Type   | Description |
| :-- | :-: | :-- |
| messageId | String | Attribute used to reply to a message in the chat. Simply add the messageId of the message you want to reply to in this attribute |
| delayMessage | number | In this attribute a delay is added to the message. You can decide between a range of 1 - 15 secs (this is for how many seconds it will wait to send the next message EX: “delayMessage”:5,). The default delay is between 1 - 3 secs |

---

## Request Body

```json
{
  "phone": "5544999999999",
  "contacts": [
    {
      "name": "contact name",
      "phones": ["5544999999999", "5544999999999"]
    },
    {
      "name": "contact name",
      "phones": ["5544999999999"]
    },
    {
      "name": "contact name",
      "businessDescription": "One company of the Irrah Group",
      "phones": ["5544999999999"]
    }
  ]
}
```

---

## Response

### 200

| Attributes| Type   | Description    |
| :-------- | :----- | :------------- |
| zaapId    | string | id on z-api    |
| messageId | string | id on whatsapp |
| id        | string | Added for compatibility with Zapier, it has the same value as the messageId |

Example

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-contacts.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
