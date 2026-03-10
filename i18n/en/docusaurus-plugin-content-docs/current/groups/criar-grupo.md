---
id: criar-grupo
title: Creating groups
---
## Method

### /create-group

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-group
```

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ID and Token](../security/id-e-token)** |
---

## Conceptualization

This method is responsible for creating a group with its respective participants. Unfortunately it's not possible to create the group with an image, but you can immediately after creation use the Update-group-photo method that is in this same session.

:::tip Tip

Just like in WhatsApp Web, you will need to add at least one contact to be able to create a group.

:::

:::warning <Icon name="AlertTriangle" size="sm" /> Connected Number
 You should not pass the connected number to Z-API that is responsible for creating the group in the array of numbers that will compose the group.

:::

:::tip New attribute

Recently, WhatsApp implemented a validation to check if the phone number connected to the API has the client's contact saved. However, Z-API developed a solution to bypass this validation, introducing a new feature called **"autoInvite"**. Now, when a request is sent to add 10 customers to a group and only 5 of them are added successfully, the API sends private invites to the five customers who were not added. These invites allow them to join the group, even if their phone numbers are not saved as contacts.

:::
---

## Attributes

### Required

| Attributes |     Type     | Description                                         |
| :-------- | :----------: | :------------------------------------------------ |
| autoInvite|   boolean    | true or false (Sends group invite link privately) |  
| groupName |    string    | Name of the group to be created                        |
| phones    | array string | Array with the numbers to be added to the group |

### Optional

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Body

**Method**

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-group
```

**Example**

```json
{
  "autoInvite": true,
  "groupName": "Grupo Z-API",
  "phones": ["5544999999999", "5544888888888"]
}
```

---

## Response

### 200

| Attributes      | Type   | Description                 |
| :------------- | :----- | :------------------------ |
| phone          | string | ID/Fone of the group          |
| invitationLink | string | link to join the group |

**Example**

```json

Forma antiga -
  {
    "phone": "5511999999999-1623281429",
    "invitationLink": "https://chat.whatsapp.com/DCaqftVlS6dHWtlvfd3hUa"
  }

------------------------------------------------

Forma nova
  {
    "phone": "120363019502650977-group",
    "invitationLink": "https://chat.whatsapp.com/GONwbGGDkLe8BifUWwLgct"
  }

```

### 405

In this case make sure you are sending the correct method specification, that is verify if you sent POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add in the request headers the "Content-Type" of the object you are sending, mostly "application/json"

---

## Webhook Response

Link to the webhook response (on receiving)

[Webhook](../webhooks/ao-receber#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/create-group.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>