---
id: redefine-invitation-link
title: Redefine group invitation link
---

## Method

#### /redefine-invitation-link/{groupId}

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/redefine-invitation-link/{groupId}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method allows you to redefine the invitation link of a group.

:::caution Attention

On November 4, 2021, WhatsApp changed the format for creating new groups, previously: "phone": "5511999999999-1623281429" now: "phone": "120363019502650977-group"

:::

---

## Attributes

### Required

| Attributes |  Type  | Description        |
| :-------- | :----: | :--------------- |
| groupId   | string | Group ID/Phone |

---

## Request URL

#### URL

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/redefine-invitation-link/120363019502650977-group

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/redefine-invitation-link.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
