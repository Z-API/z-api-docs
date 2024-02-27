---
id: remove-community-participant
title: Remove Participants
---

## Method

#### /remove-participant

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/remove-participant

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method is responsible for removing participants from the community.

---

## Attributes

### Required

| Attributes | Type | Description |
| :-- | :-: | :-- |
| communityId | string | Community ID/Phone. Can be obtained from the **[List Communities API](./list-communities.md)** |
| phones | string array | Array with the phone number(s) of the participant(s) to be removed |

---

## Request Body

#### URL

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/remove-participant

#### Body

```json
{
  "communityId": "5511999999999",
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/remove-community-participant.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
