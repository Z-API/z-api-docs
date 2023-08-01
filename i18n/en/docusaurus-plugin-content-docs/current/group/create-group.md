---
id: create-group
title: Creating groups 
---

## Method 

#### /create-group

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-group

---

## Concept

This method is responsible for creating a group with its respective participants. Unfortunately it's not possible to create the group with an image, but you can right after the creation use the Update-group-photo method that is in this same session.

:::tip Tip

Just like WhatsApp you will need to add at least one contact to be able to create a group 

:::

:::warning Warning 

You should never let anyone have or know the number that's connected to Z-API and is  responsible for creating the group in the array of numbers that the group will be composed of.

:::

:::tip Novo atributo

WhatsApp has recently implemented a validation process to check if the phone number connected to the API has the client's contact saved. However, Z-API has developed a solution to bypass this validation by introducing a new attribute called "autoInvite." Now, when a request is made to add 10 clients to a group and only 5 of them are successfully added, the API sends private invitations to the remaining five clients who were not added. These invitations allow them to join the group even if their phone numbers are not saved as contacts.

:::
---

## Attributes

### Mandatory 

| Attributes |     Type     | Description                                      |
| :-------- | :----------: | :------------------------------------------------ |
| autoInvite|   boolean    | true ou false (Send the group invitation link privately.)   |  
| groupName |    string    | Name of group to be created                       |
| phones    | array string | Array with the numbers to be added to the group   |

### Optionals 

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Body

**Method**

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-group

**Example**

```json
{
  "autoInvite": true,
  "groupName": "Z-API group",
  "phones": ["5544999999999", "5544888888888"]
}
```

---

## Response

### 200

| Attributes    | Type   | Description                |
| :------------- | :----- | :------------------------ |
| phone          | string | Group ID/phone          |
| invitationLink | string | Link to join group |

**Exemplo**

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
