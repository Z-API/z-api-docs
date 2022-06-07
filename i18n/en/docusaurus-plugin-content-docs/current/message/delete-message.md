---
id: delete-message
title: Deleting messages 
---

## Method

#### /messages

`DELETE` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/messages

---

## Concept

Method used to delete a text sent in a chat. You will be able to delete a message that you sent as well as a message that was sent by a contact. To use this resource you will only need the messageId of the message that you want to delete.

![image](../../../../../img/DeleteText.jpeg)

---

## Attributes

### Mandatory 

| Attributes | Type | Description |
| :-- | :-: | :-- |
| messageId | string | Original messages id, in case the message was sent by you it is the code that comes in the response. In case it is a message sent by a contact you will receive this messageID through your webhook receive. |
| phone | string | Recipient (or group ID in case you want to send it to a group) telephone number in the format DDI DDD NUMERS Ex: 551199999999. IMPORTANT  only send numbers without formatting or a mask |
| owner | boolean | Enter true if you have sent the message or false for cases where it is an incoming message |

### Optionals

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL example 

Method 

`DELETE`

https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/messages?messageId=123&phone=5511999998888&owner=true

---

## Response

### 204

No content

| Attributes | Type | Description |
| :-------- | :--- | :-------- |
|           |      |           |

Example 

```json
{}
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/delete-message.json" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
