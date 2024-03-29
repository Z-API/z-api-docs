---
id: forgot-security-code
title: Recovery PIN code
---

## Method

#### /mobile/recovery-pin-code

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/mobile/recovery-pin-code

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Method used to request an email for recovery of your account's PIN code. This method is only necessary if you have set up two-step verification on WhatsApp and no longer remember this code. This way, WhatsApp will send a link to reset the PIN code in the email that you linked to your WhatsApp account.

---

## Response

### 200

| Attributes   | Type    | Description |
| :--------   | :------  | :-------- |
| success     | boolean  | Returns true if the email for recovery has been sent |


### Example

```json
{
    "success": true
}
```

### 400

Invalid request. Check if the data you are sending is in accordance with the documentation above.

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending to the headers of the request, mostly "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/forgot-security-code.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
