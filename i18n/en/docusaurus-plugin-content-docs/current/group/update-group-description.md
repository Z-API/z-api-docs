---
id: update-group-description
title: Edit description 
---

## Method

#### /update-group-description

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-description

## Concept

This method allows you to change your group's description

:::caution Attention

Attention only admins can change group preferences.

:::

:::caution Attention

On November 4, 2021 whatsapp changed the format of creating new groups. before: "phone": "5511999999999-1623281429" now: "phone": "120363019502650977-group"

:::

---

## Attributes

### Mandatory

| Attributes       |  Type  | Description                                  |
| :--------------- | :----: | :----------------------------------------- |
| groupId          | string | Group ID-phone                           |
| groupDescription | string | Attribute to edit the group’s description |

---

#### Body

```json

Old way -
  {
    "groupId": "5511999999999-1623281429",
    "groupDescription": "descrição do grupo"
  }

----------------------------------------

New way -
  {
    "groupId": "120363019502650977-group",
    "groupDescription": "descrição do grupo"
  }

```

---

## Response

### 200

| Attributes| Type    | Description                                           |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true if it worked and false if it failed |

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-group-description.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
