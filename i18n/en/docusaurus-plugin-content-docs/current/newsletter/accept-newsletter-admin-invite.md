---
id: accept-newsletter-admin-invite
title: Accept newsletter admin invitation
---

## Method

#### /newsletter/accept-admin-invite/{newsletterId}

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/newsletter/accept-admin-invite/{newsletterId}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method is responsible for accepting an invitation to become an administrator of a newsletter. This invitation is a message that you can both **[send](../newsletter/send-newsletter-admin-invite.md)** and receive through the **[received message webhook](../webhooks/on-message-received#newsletter-admin-invitation-return-example)**.

## Attributes

### Mandatory

| Attributes | Type      | Description      |
| :-------- | :-------: | :------------- |
|  newsletterId     |  string   | Id of the newsletter to which the invitation belongs |

---


## Request

**Example**

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/newsletter/accept-admin-invite/120363166555745933@newsletter

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/accept-newsletter-admin-invite.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
