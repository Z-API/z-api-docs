---
id: get-account-email
title: Get account email
---

## Method

#### /security/email

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/security/email

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

Method used to retrieve the email configured in the WhatsApp account.

:::caution
This API is available only for mobile instances.
:::

---

## Response

### 200

| Attributes  | Type     | Description |
| :--------   | :------  | :-------- |
| success     | boolean  | Defines if the request was executed successfully |
| hasEmail    | boolean  | Defines if the account has an email configured |
| email       | string   | Email configured in the account |
| verified    | boolean  | Defines if the email has been verified |

### Example

```json
{
    "success": true,
    "hasEmail": true,
    "email": "example@email.com",
    "verified": true
}
```

### 400

Invalid request. Check if the data you are sending is in accordance with the documentation above.

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending to the headers of the request, mostly "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-account-email.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
