---
id: send-poll
title: send poll
---

## Method

#### /send-poll

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-poll

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

In this method, you can send poll-type messages.

<!-- ![image](../../img/send-poll.jpeg) -->

---

## Attributes

### Required

| Attribute | Type | Description |
| :--| :-: | :-- |
| phone | string | Recipient's phone number (or group ID for group sending) in the format DDI DDD NUMBER. Example: 551199999999. **IMPORTANT:** Send only numbers, without formatting or masks. |
| message | string | Text to be sent in the poll |
| poll  | PollItem | List of poll options |

### Optional

| Attribute | Type | Description |
| :-- | :-: | :-- |
| delayMessage | number | In this attribute, a delay is added to the message. You can choose from a range of 1~15 seconds, which means how many seconds it will wait to send the next message. (Example: "delayMessage": 5). The default delay if not provided is 1~3 seconds. |
| pollMaxOptions | number | Maximum number of votes per person in the poll |

### PollItem

| Attribute | Type   | Description   |
| :-------- | :----: | :------------ |
| name      | string | Option name    |

---

## Request Body

```json
Multiple choices

{
  "phone": "5511999999999",
  "message": "What is the best API for WhatsApp?",
  "poll": [
    {"name": "Z-API"},  
    {"name": "Others"}
  ]
}

------------------------------------------------------

Single choice

{
  "phone": "5511999999999",
  "message": "What is the best API for WhatsApp?",
  "pollMaxOptions": 1,
  "poll": [
    {"name": "Z-API"},  
    {"name": "Others"}
  ]
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

Webhook response link (upon receiving)

[Webhook](../webhooks/on-message-received#example-of-poll-response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-poll.json&targets=all" frameBorder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
