---
id: set-account-email
title: Set account email
---

## Method

#### /security/email

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/security/email

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Method used to register an email on your WhatsApp account. This email could be used later to recovery the security PIN code of your account.

:::caution
This API is available only for mobile instances.
:::

---

## Attributes

### Required

| Attributes | Type | Description |
| :-------- | :--: | :-- |
| email     | string | Email to be registered on your WhatsApp account |

---

## Request Body

```json
{
    "email": "example@email.com"
}
```

---

## Response

### 200

| Attributes   | Type     | Description |
| :--------   | :------  | :-------- |
| success     | boolean  | Defines if the request was executed successfully |
| message     | string   | In case of success, it may request email verification (VERIFY_EMAIL). This way, an email will be sent to the address provided in the request, containing a code that must be used in the **[verify email](./verify-email.md)** API to complete the registration. In case of failure, it returns a message regarding the error |

### Example

```json
{
    "success": true,
    "message": "VERIFY_EMAIL"
}
```

### 400

Invalid request. Check if the data you are sending is in accordance with the documentation above.

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending to the headers of the request, mostly "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/set-account-email.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
