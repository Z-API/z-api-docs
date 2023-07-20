---
id: reject-participant
title: Reject Participant
---

## Method

#### /reject-participant

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reject-participant

## Concept

This method is responsible for rejecting the entry of participants into the group.

:::caution Atenção

On November 4, 2021, WhatsApp changed the format for creating new groups. Previously: "phone": "5511999999999-1623281429," and now: "phone": "120363019502650977-group"

:::

---

## Attributes

### Required

| Attributes |    Type      | Description |
| :--------  |    :--:      | :---------- |
| groupId    |    string    | ID/Fone do grupo |
| phones     | array string | Array com os numero(s) do(s) participante(s) a serem aceitos |

### Optionals

| Attributes | Type | Description |
| :--------  | :--: | :--------   |

---

## Request Body

#### URL

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reject-participant

#### Body

```json

Old format -
  {
    "groupId": "5511999999999-1623281429",
    "phones": ["5544999999999", "5544888888888"]
  }

  -------------------------------------------------

New format -
  {
    "groupId": "120363019502650977-group",
    "phones": ["5544999999999", "5544888888888"]
  }

```

---

## Response

### 200

| Attributes| Type    | Description                                         |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true if successful, and false if there is a failure.|

**Example**

```json
{
  "value": true
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Webhook Response

Link to webhook response (on receipt)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/reject-participant.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
