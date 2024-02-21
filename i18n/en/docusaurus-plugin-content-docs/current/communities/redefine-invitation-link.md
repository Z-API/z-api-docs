---
id: redefine-invitation-link
title: Redefine community invitation link
---

## Method

#### /redefine-invitation-link/{communityId}

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/redefine-invitation-link/{communityId}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method allows you to redefine the invitation link of a community.

---

## Attributes

### Required

| Attributes |  Type  | Description        |
| :-------- | :----: | :--------------- |
| communityId   | string | Community ID/Phone |

---

## Request URL

#### URL

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/redefine-invitation-link/120363019502650977

---

## Response

### 200

| Attributes | Type    | Description                                           |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true if successful, false if failed |

**Example**

```json
{
  "value": true
}
```

### 405

In this case, make sure you are correctly sending the method specification, meaning check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers, mostly "application/json".

---

## Webhook Response

Link to the webhook response (upon receiving)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/redefine-community-invitation-link.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
