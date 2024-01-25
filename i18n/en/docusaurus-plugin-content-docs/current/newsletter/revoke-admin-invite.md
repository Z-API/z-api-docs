---
id: newsletter-revoke-admin-invite
title: Revoke newsletter admin invitation
---

## Method

#### /newsletter/revoke-admin-invite/{newsletterId}

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/newsletter/revoke-admin-invite/{newsletterId}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method is responsible for revoking an invitation for newsletter administrator.

## Attributes

### Mandatory

| Attributes | Type      | Description      |
| :-------- | :-------: | :------------- |
|  phone    |  string   | User's phone number for whom the invitation will be revoked |

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/newsletter-revoke-admin-invite.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
