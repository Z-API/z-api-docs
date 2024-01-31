---
id: update-group-settings
title: Group configuration 
---

## Method 

#### /update-group-settings

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-group-settings

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method allows you to change the groups preferences.

:::caution Attention

Attention only admins can change group preferences.

:::

:::caution Attention

On November 4, 2021 whatsapp changed the format of creating new groups. before: "phone": "5511999999999-1623281429" now: "phone": "120363019502650977-group"

:::

---

## Attributes

### Required

| Attributes| Type | Description |
| :-- | :-: | :-- |
| phone | string | Group ID/phone |
| adminOnlyMessage | boolean | Only the groups admin can send messages to the group  |
| adminOnlySettings | boolean | Attribute that allows only admins to edit the group |
| requireAdminApproval | boolean | Defines whether approval from an admin will be required to join the group |
| adminOnlyAddMember | boolean | Only administrators can add people to the group |

---

## Request Body

```json

Old way -
  {
    "phone": "5511999999999-1623281429",
    "adminOnlyMessage": true,
    "adminOnlySettings": true,
    "requireAdminApproval": false,
    "adminOnlyAddMember": true
  }

----------------------------------------

New way -
  {
    "phone": "120363019502650977-group",
    "adminOnlyMessage": true,
    "adminOnlySettings": true,
    "requireAdminApproval": false,
    "adminOnlyAddMember": true
  }

```

---

## Response

### 200

| Attributes | Type   | Description                                         |
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-group-settings.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
