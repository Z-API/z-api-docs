---
id: remove-admin
title: Remove admin from group
---

## Method

#### /remove-admin

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/remove-admin

## Concept

This method is responsible for removing one or more admins from a group.

:::caution Attention

On November 4, 2021 whatsapp changed the format of creating new groups. before: "phone": "5511999999999-1623281429" now: "phone": "120363019502650977-group"

:::

---

## Attributes

### Mandatory

| Attributes| Type | Description |
| :-- | :-: | :-- |
| groupId | string | Group ID/phone |
| phones | array string | Array with the number(s) to be removed from the group administration |

### Optionals

| Attributes| Type | Description|
| :-------- | :--: | :-------- |

---

## Request Body

#### URL

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/remove-admin

#### Body

```json

Old way -
  {
    "groupId": "5511999999999-1623281429",
    "phones": ["5544999999999", "5544888888888"]
  }

  -------------------------------------------------

New way -
  {
    "groupId": "120363019502650977-group",
    "phones": ["5544999999999", "5544888888888"]
  }

```

````

---

## Response

### 200

| Attributes| Type    | Description                                         |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true if it worked and false if it failed |

**Example**

```json
{
  "value": true
}
````

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/remove-admin.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
