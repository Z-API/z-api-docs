---
id: send-poll-vote
title: Respond to a poll
---

## Method

#### /send-poll

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-poll-vote

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

In this method, you can vote in a specific poll.

<!-- ![image](../../img/send-poll.jpeg) -->

---

## Attributes

### Required

| Attribute | Type | Description |
| :-- | :-: | :-- |
| phone | string | Recipient's phone number (or group ID for group sending) in the format DDI DDD NUMBER. Example: 551199999999. **IMPORTANT:** Send only numbers, without formatting or masks. |
| pollMessageId | string | ID of the poll message. **IMPORTANT:** This is the messageId received when sending a poll or receiving it from another contact. |
| pollVote | pollVote | List of options to vote for. **IMPORTANT:** You can vote for more than one option. |


### PollVote

| Attribute | Type   | Description   |
| :-------- | :----: | :------------ |
| name      | string | Option name    |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "pollMessageId": "Poll message ID",
  "pollVote": [
    {"name": "Z-API"}
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

[Webhook](../webhooks/on-message-received#example-of-poll-response-message)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-poll-vote.json&targets=all" frameBorder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
