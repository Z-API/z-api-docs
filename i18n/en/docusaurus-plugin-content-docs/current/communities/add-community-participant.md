---
id: add-community-participant
title: Add participants
---

## Method

#### /add-participant

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/add-participant

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method is responsible for adding new participants to the community.

:::tip New Attribute

Recently, WhatsApp implemented a validation to check if the phone number connected to the API has the client's contact saved. However, Z-API has developed a solution to bypass this validation by introducing a new feature called **"autoInvite"**. Now, when a request is sent to add 10 clients to a group and only 5 of them are successfully added, the API sends private invites to the five clients who were not added. These invites allow them to join the community, even if their phone numbers are not saved as contacts.

:::

---

## Attributes

### Required

| Attributes  | Type    | Description |
| :---------- | :------ | :-- |
| autoInvite  | boolean | Sends community invite link privately |
| communityId | string  | Community ID/Phone. Can be obtained from the **[List Communities API](./list-communities.md)** |
| phones      | string array | Array with the phone number(s) of the participant(s) to be added |

---

## Request Body

#### URL

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/add-participant

#### Body

```json
{
  "autoInvite": true,
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/add-community-participant.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
