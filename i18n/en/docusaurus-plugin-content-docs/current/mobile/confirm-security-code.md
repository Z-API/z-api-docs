---
id: confirm-security-code
title: Confirm PIN code
---

## Method

#### /mobile/confirm-pin-code

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/mobile/confirm-pin-code

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Method used to confirm your account's PIN code. This method is only necessary if you have set up two-step verification on WhatsApp. If this is your case, you need to confirm this PIN code, otherwise, it will not be possible to connect the number to a mobile instance.

---

## Attributes

### Required

| Attributes | Type | Description |
| :-------- | :--: | :-- |
| code      | string | Two-step verification PIN code |

---

## Request Body

```json
{
    "code": "123456"
}
```

---

## Response

### 200

| Attributes   | Type     | Description |
| :--------   | :------  | :-------- |
| success     | boolean  | Returns true if the code was confirmed correctly. Once done, the instance will be connected |


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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/confirm-security-code.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
