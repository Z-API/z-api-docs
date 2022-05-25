---
id: reply-message
title: Answer Messages 
---

## Concept 

In this topic we will talk a little about how to respond to a text directly. 


When you use the [send-text](send-message-text) method there is an optional attribute called **messageId**, this is an attribute that receives the Id of any message, when this attribute is passed, your message will be directly related to the message of the informed Id.

:::tip


If you have any questions about how to send a text message, you can read about it in our [**Send plain text**](send-message-text) thread


:::

![image](../../../../../img/reply-message.jpeg)

---

## Attributes

### Optionals 

| Attributes | Type | Description  |
| :-- | :-: | :-- |
| messageId | string | Recipient (or group ID in case you want to send it to a group) telephone number in the format DDI DDD NUMERS Ex: 551199999999. IMPORTANT  only send numbers without formatting or a mask  |
| delayMessage | number | In this attribute a delay is added to the message. You can decide between a range of 1 - 15 secs (this is for how many seconds it will wait to send the next message EX: “delayMessage”:5,). The default delay is between 1 - 3 secs. |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "message": "Welcome to *Z-API*",
  "messageId": "3999984263738042930CD6ECDE9VDWSA"
}
```

---

## Response

### 200

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

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/reply-message.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
