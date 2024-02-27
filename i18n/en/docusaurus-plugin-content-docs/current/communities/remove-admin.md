---
id: remove-community-admin
title: Remove Community Admin
---

## Method

#### /remove-admin

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/remove-admin

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method is responsible for removing one or more administrators from a community.

---

## Attributes

### Required

| Attributes | Type    | Description |
| :-- | :-: | :-- |
| communityId | string | Community ID/Phone. Can be obtained from the **[List Communities API](./list-communities.md)** |
| phones | string array | Array with the phone number(s) to be removed from the group administration |

---

## Request Body

#### URL

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/remove-admin

#### Body

```json
{
  "communityId": "120363019502650977",
  "phones": ["5544999999999", "5544888888888"]
}
```

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/remove-community-admin.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
