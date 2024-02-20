---
id: remove-account-email
title: Remove account email
---

## Method

#### /security/email/remove

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/security/email/remove

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Method used to remove the email configured on your WhatsApp account.

:::caution
This API is available only for mobile instances.
:::

---

## Response

### 200

| Attributes  | Type     | Description |
| :--------   | :------  | :---------- |
| success     | boolean  | Defines if the request was executed successfully |
| message     | string   | In case of failure, it returns a message regarding the error. In case of success, it may return a confirmation |

### Example

```json
{
    "success": true,
    "message": "REMOVED"
}
```

### 400

Invalid request. Check if the data you are sending is in accordance with the documentation above.

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending to the headers of the request, mostly "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/remove-account-email.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
