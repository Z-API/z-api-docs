---
id: captcha-confirm
title: Respond captcha
---

## Method

#### /mobile/respond-captcha

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/mobile/respond-captcha

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Method used to respond to the captcha necessary for sending the confirmation code. This method is only necessary if the **[request code API](./request-code.md)** responds with the "captcha" attribute, which in turn contains the base64 of the image with the captcha.

---

## Attributes

### Required

| Attributes | Type | Description |
| :-------- | :-: | :-- |
| captcha   | string | Captcha code for confirmation. This captcha is displayed in the image returned in the request for the confirmation code. |

---

## Request Body

```json
{
    "captcha": "123456"
}
```

---

## Response

### 200

| Attributes   | Type     | Description |
| :--------   | :------  | :-------- |
| success     | boolean  | Returns true if the captcha was answered correctly. Therefore, wait for the confirmation code to be received and use it in the **[confirm code API](./confirm-code.md)** |

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/captcha-confirm.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
