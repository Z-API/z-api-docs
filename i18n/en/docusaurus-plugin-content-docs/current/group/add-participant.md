---
id: add-participant
title: Adding partocipants
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

This method is responsible for adding new members to the group 

:::caution Attention

On November 4, 2021 whatsapp changed the format of creating new groups. before: "phone": "5511999999999-1623281429" now: "phone": "120363019502650977-group"

:::

:::tip Novo atributo

WhatsApp has recently implemented a validation process to check if the phone number connected to the API has the client's contact saved. However, Z-API has developed a solution to bypass this validation by introducing a new attribute called "autoInvite." Now, when a request is made to add 10 clients to a group and only 5 of them are successfully added, the API sends private invitations to the remaining five clients who were not added. These invitations allow them to join the group even if their phone numbers are not saved as contacts.

:::

---

## Attributes

### Required

| Attributes| Type|  Description |
| :-- | :-: | :-- |
| autoInvite|   boolean    | true ou false (Send the group invitation link privately.)  |  
| groupId   |   string     | Group ID/phone |
| phones    | array string | Array with the number(s) of the participant(s) to be added |

### Optionals

| Attributes| Type | Description|
| :-------- | :--: | :-------- |

---

## Request Body

#### URL

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/add-participant

#### Body

```json

Old way -
  {
    "autoInvite": true,
    "groupId": "5511999999999-1623281429",
    "phones": ["5544999999999", "5544888888888"]
  }

  -------------------------------------------------

New way -
  {
    "autoInvite": true,
    "groupId": "120363019502650977-group",
    "phones": ["5544999999999", "5544888888888"]
  }

```

---

## Response

### 200

| Attributes| Type    | Description                                         |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true if it worked and false if it failed            |

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/add-participant.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
