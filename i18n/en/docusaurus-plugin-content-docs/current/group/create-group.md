---
id: create-group
title: Creating groups 
---

## Method 

#### /create-group

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/create-group

---

## Concept

This method is responsible for creating a group with its respective participants. Unfortunately it's not possible to create the group with an image, but you can right after the creation use the Update-group-photo method that is in this same session.

:::tip Tip

Just like WhatsApp you will need to add at least one contact to be able to create a group 

:::

:::caution Attention

On November 4, 2021 whatsapp changed the format of creating new groups. before: "phone": "5511999999999-1623281429" now: "phone": "120363019502650977-group"

:::

:::warning Warning 

You should never let anyone have or know the number that's connected to Z-API and is  responsible for creating the group in the array of numbers that the group will be composed of.

:::

---

## Attributes

### Mandatory 

| Attributes |     Type     | Description                                         |
| :-------- | :----------: | :------------------------------------------------ |
| groupName |    string    | Name of group to be created                       |
| phones    | array string | Array with the numbers to be added to the group |

### Optionals 

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Body

**Method**

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/create-group

**Example**

```json
{
  "groupName": "My group on Z-API",
  "phones": ["5511999999999", "5511888888888"]
}
```

---

## Response

### 200

| Attributes    | Type   | Description                |
| :------------- | :----- | :------------------------ |
| phone          | string | Group ID/phone          |
| invitationLink | string | Link to join group |

**Example**

```json

Old way -
  {
    "phone": "5511999999999-1623281429",
    "invitationLink": "https://chat.whatsapp.com/DCaqftVlS6dHWtlvfd3hUa"
  }

------------------------------------------------

New way
  {
    "phone": "120363019502650977-group",
    "invitationLink": "https://chat.whatsapp.com/GONwbGGDkLe8BifUWwLgct"
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/create-group.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
