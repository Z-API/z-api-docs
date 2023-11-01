---
id: mute-chat
title: Mute Chats
---

## Method

#### /modify-chat

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/modify-chat

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method is responsible for muting and unmuting your chats.

---

## Attributes

### Required

| Attribute | Type | Description |
| :-- | :-: | :-- |
| phone | integer | Phone number you want to mute or unmute in **YOUR** chat |
| action | string | Attribute for muting and unmuting the chat (mute or unmute) |

---

## Request Body

Example

```json
{
  "phone": "5544999999999",
  "action": "mute" or "unmute"
}
```

---

## Response

### 200

| Attribute | Type    | Description                       |
| :-------- | :------ | :------------------------------ |
| value     | boolean | Action confirmation attribute |

Example

```json
{
  "value": true
}
```

### 405

In this case, make sure you are sending the method specification correctly, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" header to the request for the object you are sending, most commonly "application/json."

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/mute-chat.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
