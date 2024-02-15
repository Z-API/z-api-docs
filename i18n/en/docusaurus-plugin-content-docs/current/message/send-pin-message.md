---
id: send-pin-message
title: Pin / Unpin messages
---

## Method

#### /pin-message

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/pin-message

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

In this method you will be able to pin chat messages, whether private chats or groups.

![image](../../../../../img/pin-message.jpeg)

---

## Attributes

### Required 

| Attributes | Type | Description |
| :-- | :-: | :-- |
| phone | string | Recipient (or group ID in case you want to send it to a group) telephone number in the format DDI DDD NUMERS Ex: 551199999999. IMPORTANT  only send numbers without formatting or a mask |
| messageId | string | Message id that will be pinned or unpinned |
| messageAction | string | Action that will be executed to the message (pin, unpin) |
| pinMessageDuration | string | Duration that the message will stay pinned. Has no effects when action is unpin. |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "messageId": "77DF5293EBC176FFA6A88838E7A6AD83",
  "messageAction": "pin | unpin",
  "pinMessageDuration": "24_hours | 7_days | 30_days"
}
```

---

## Response

### 200

| Attributes| Type   | Description   |
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

Link to webhook response (on receipt)

[Webhook](../webhooks/on-message-received#pin-message-return-example)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-text.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
