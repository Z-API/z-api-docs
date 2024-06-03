---
id: accept-group-invite
title: Accept group invite
---

## Method

#### /accept-invite-group?url={{INVITATION_URL}}

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/accept-invite-group?url={{INVITATION_URL}}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method is responsible for accepting an invitation you received to join a group.

---

## Attributes

### Required

| Attributes |    Type      | Description |
| :--------  |    :--:      | :---------- |
| url        |    string    | Invitation URL of the group. Could be received on ([this webhook](../webhooks/on-message-received#text-return-example)) |

---

#### URL

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/accept-invite-group?url=https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112

---

## Response

### 200

| Attributes | Type    | Description                                           |
| :-------- | :------ | :-------------------------------------------------- |
| success     | boolean | true if successful, false otherwise |

**Example**

```json
{
  "success": true
}
```

### 405

Make sure you are correctly sending the method specification, i.e., check if you sent the GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers, mostly "application/json".

---

## Webhook Response

Link to the webhook response (upon receiving) invitation message

[Webhook](../webhooks/on-message-received#text-return-example)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/accept-group-invite.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
