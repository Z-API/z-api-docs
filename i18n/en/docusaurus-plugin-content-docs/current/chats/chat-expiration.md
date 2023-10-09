---
id: send-chat-expiration
title: Chat expiration
---

## Method

#### POST /send-chat-expiration

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-chat-expiration

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method is responsible for sending chat expiration.

## Attributes

### Required

| Attribute | Type | Description |
| :-- | :-: | :-- |
| phone | integer | Phone number you want to set chat expiration for in **YOUR** chat |
| chatExpiration | string | Attribute to send chat expiration |

---

## Request Body

Example

```json
{
  "phone": "554497050785",
  "chatExpiration": "90_DAYS"
}
```

**Options of chatExpiration**: "24_HOURS", "7_DAYS", "90_DAYS", "OFF"

---

## Response

### 200

| Attributes | Type    | Description                       |
| :-------- | :------ | :------------------------------ |
| value     | boolean | Action confirmation attribute |

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/modify-chat.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
