---
id: block-contact
title: Block Contact
---

## Method

#### /contacts/modify-blocked

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/contacts/modify-blocked

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method is responsible for blocking or unblocking a contact.

---

## Attributes

### Required

| Attribute | Type | Description |
| :-- | :-: | :-- |
| phone | integer | Phone number you want to block or unblock in **YOUR** chat |
| action | string | Attribute for blocking or unblocking the contact (block or unblock) |

---

## Request Body

Example

```json
{
  "phone": "5544999999999",
  "action": "block" or "unblock"
}
```

---

## Response

### 200

| Attribute | Type    | Description                       |
| :-------- | :------ | :------------------------------ |
| value     | boolean | Action confirmation attribute |

Example

```json
{
  "value": true
}
```

### 405

In this case, make sure you are sending the method specification correctly, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" header to the request for the object you are sending, most commonly "application/json."

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/block-contact.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
