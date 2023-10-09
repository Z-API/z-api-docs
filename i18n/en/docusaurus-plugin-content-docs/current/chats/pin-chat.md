---
id: pin-chat
title: Pin chats
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

This method is responsible for pinning and unpinning your chats.

## Attributes

### Required

| Attribute | Type | Description |
| :-- | :-: | :-- |
| phone | integer | Phone number you want to change in **YOUR** chat |
| action | string | Attribute to pin and unpin the chat |

---

## Request Body

Example

```json
{
  "phone": "5544999999999",
  "action": "pin" or "unpin"
}
```

---

## Response

### 200

| Attributes | Type    | Description                    |
| :--------  | :------ | :----------------------------- |
|  value     | boolean | Action confirmation attribute  |

Example 

```json
{
  "value": true
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/pin-chat.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
