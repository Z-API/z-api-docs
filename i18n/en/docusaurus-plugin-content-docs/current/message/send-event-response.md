---
id: send-event-response
title: Send Event Response
---

## Method

#### /send-event-response

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-event-response

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

In this method, you can send responses to an event.

:::tip
It is not possible to respond to an event that you created yourself. In this case, your response is always set as "going."
:::

![image](../../../../../img/SendingEventResponse.jpeg)

---

## Attributes

### Required

| Attributes | Type | Description |
| :-- | :-: | :-- |
| phone | string | Recipient's phone number (or group ID for group messages) in the format CC DDD NUMBER. **IMPORTANT** Send only numbers, without formatting or masks. |
| eventResponse  | string | Event response (GOING, NOT_GOING) |
| eventMessageId | string | Original event message id |

---

## Request Body

```json
{
  "phone": "120363019502650977-group",
  "eventMessageId": "D2D612289D9E8F62307D72409A8D9DC3",
  "eventResponse": "GOING"
}
```

---

## Response

### 200

| Attributes | Type | Description |
| :-- | :-- | :-- |
| zaapId | string | Z-api id |
| messageId | string | WhatsApp id |
| id | string | Added for compatibility with Zapier, it has the same value as messageId |

Example

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### 405

In this case, make sure you are correctly sending the method specification, meaning check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers, mostly "application/json".

---

## Webhook Response

Link to the webhook response (upon receiving)

[Webhook](../webhooks/on-message-received#event-response-return-example)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-event-response.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
