---
id: get-iswhatsapp
title: Number with WhatsApp ? 
---

## Method

#### /phone-exists

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/phone-exists

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method returns whether or not the number has WhatsApp.

:::important Important

 Z-API is not designed to spread spam to contacts you don't know, however we recommend that if you are not sure whether the number you are going to send messages to has WhatsApp you can and should use this method to make sure.

:::

---

## Attributes

### Required

| Attributes | Type | Description |
| :-- | :-: | :-- |
| phone | string | Telephone number in the format DDI DDD NUMERS Ex: 551199999999. **IMPORTANT**  only send numbers without formatting or a mask  |

### Optionals 

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL example

Method

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/phone-exists/5511999999999

---

## Response

### 200

| Attributes | Type | Description |
| :-- | :-- | :-- |
| exists | boolean | True for if it exists and false for cases where the number does not have WhatsApp |
| phone  | string  | Number formatted according to the WhatsApp response|
| lid | string  | A unique and private identifier created by WhatsApp to represent contacts without directly exposing their phone number|

Example

```json
[
  {
    "exists": "true ou false",
    "phone": "5544999999999",
    "lid": "999999999@lid" // It will be null if "exists" is false
  }
]
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”


---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-iswhatsapp.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
