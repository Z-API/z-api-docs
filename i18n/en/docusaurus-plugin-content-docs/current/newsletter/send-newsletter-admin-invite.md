---
id: send-newsletter-admin-invite
title: Send newsletter admin invitation
---

## Method

#### /send-newsletter-admin-invite

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-newsletter-admin-invite

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

In this method, you can send messages inviting people to become administrators of your newsletter on WhatsApp.

![image](../../../../../img/NewsletterAdminInvite.jpeg)

---

## Attributes

### Mandatory

| Attributes | Type   | Description |
| :------   | :----: | :------   |
| phone     | string | Recipient's phone number in the format DDI DDD NUMBER E.g., 551199999999. **IMPORTANT** Send only numbers, without formatting or mask |
| adminInviteMessage | object | Object with the necessary data for sending the invitation message |

Object (adminInviteMessage)

| Attributes | Type   | Description |
| :------   | :----: | :------   |
| newsletterId       | string | Id of the newsletter to which the invitation belongs. E.g., 999999999999999999@newsletter. |
| caption  | object | Invitation message text |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "adminInviteMessage": { 
    "newsletterId": "120363166555745933@newsletter",
    "caption": "I want to invite you to be an admin of my channel on WhatsApp."
  }
}
```

## Response

### 200

| Attributes | Type   | Description      |
| :-------- | :----- | :------------- |
| zaapId    | string | id in z-api    |
| messageId | string | id in WhatsApp |
| id        | string | Added for compatibility with Zapier, it has the same value as messageId |


Example

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending to the headers of the request, mostly "application/json."

---

## Webhook Response

Link to the webhook response (upon receipt)

[Webhook](../webhooks/on-message-received#newsletter-admin-invitation-return-example)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-newsletter-admin-invite.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
