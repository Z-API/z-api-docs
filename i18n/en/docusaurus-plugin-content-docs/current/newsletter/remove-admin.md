---
id: newsletter-remove-admin
title: Remove newsletter admin
---

## Method

#### /newsletter/remove-admin/{newsletterId}

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/newsletter/remove-admin/{newsletterId}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method is responsible for removing a user from the administration of the newsletter.

## Attributes

### Mandatory

| Attributes | Type      | Description      |
| :-------- | :-------: | :------------- |
|  phone    |  string   | User's phone number to be removed from the newsletter administration |

---

## Request Body

```json
{
  "phone": "5511999999999"
}
```

---


## Response

### 201

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending to the headers of the request, mostly "application/json"

---

## Webhook Response

Link to the webhook response (upon receipt)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/newsletter-remove-admin.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
