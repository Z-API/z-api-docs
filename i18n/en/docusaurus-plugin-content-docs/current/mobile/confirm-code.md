---
id: confirm-code
title: Confirm code
---

## Method

#### /mobile/confirm-registration-code

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/mobile/confirm-registration-code

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Method used to confirm the code you received. To use this method, you need to complete the previous registration steps, which involve checking the availability of registering the number and requesting the confirmation code. After receiving the code, you can use this route to confirm and connect the number to the mobile instance.

---

## Attributes

### Required

| Attributes | Type | Description |
| :-------- | :--: | :-- |
| code      | string | Confirmation code |

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

| Attributes           | Type     | Description |
| :------------------- | :------  | :---------- |
| success              | boolean  | Returns true if the code was confirmed correctly. Once done, the instance will be connected |
| confirmSecurityCode  | boolean  | Returns true if require a confirmation of two-step verification code |


### Example

```json
{
    "success": true
}
```

```json
{
    "success": false,
    "confirmSecurityCode": true
}
```

### 400

Invalid request. Check if the data you are sending is in accordance with the documentation above.

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending to the headers of the request, mostly "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/confirm-code.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
