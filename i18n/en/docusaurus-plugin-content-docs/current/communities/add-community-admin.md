---
id: add-community-admin
title: Promote community admin
---

## Method

#### /add-admin

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/add-admin

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method is responsible for promoting community participants to administrators. You can promote one or more participants to administrator.

---

## Attributes

### Required

| Attributes | Type | Description |
| :-- | :-: | :-- |
| communityId | string | Community ID/Phone. Can be obtained in the **[List Communities](./list-communities.md)** API |
| phones | array string | Array with the number(s) of the participant(s) to be promoted |

## Request Body

#### URL

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/add-admin

#### Body

```json
{
  "communityId": "120363186053925765",
  "phones": ["5544999999999", "5544888888888"]
}
```

---

## Response

### 200

| Attributes | Type    | Description                                           |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true if successful, false if failed                  |

**Example**

```json
{
  "value": true
}
```

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending to the headers of the request, mostly "application/json"

---

## Webhook Response

Link to the webhook response (upon receiving)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/add-community-admin.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
