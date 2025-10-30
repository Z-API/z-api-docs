---
id: remove-contacts
title: Remove Contacts
---

## Method

#### /contacts/remove

`DELETE` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/contacts/remove

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method is responsible for removing WhatsApp contacts from your contact list on your phone.

---

:::caution About This Feature
The method for removing contacts from the WhatsApp list will only work for accounts that have already received the necessary update. Ensure that your **WhatsApp** account has received this update before using this feature. Otherwise, the operation will not be completed successfully.
:::

---

## Request Body

```json
[
  "554499999999",
  "554499998888"
]
```

## Response

### 200

| Atributos | Tipo  | Descrição |
| :-- | :-- | :--   |
| success | boolean |  |
| errors  | array   |  |

Example

```json
{
    "success": true,
    "errors": []
}
```

### 405

In this case, make sure you are sending the method specification correctly, meaning check if you sent POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, ensure you add the "Content-Type" of the object you are sending in the request headers, which is mostly "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/remove-contacts.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
