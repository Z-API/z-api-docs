---
id: send-button-otp
title: Send OTP Button
---

## Method

#### /send-button-otp

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-button-otp

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

:::caution Warning
Button sending is currently available, but there are some decisive factors for operation. For more details visit the [Button Status](https://developer.z-api.io/en/tips/button-status) topic.
:::

## Concept

This method allows you to send text messages with a button to copy a value.

![image](../../../../../img/SendButtonOtp.jpeg)

---

## Attributes

### Required

| Attributes   | Type          | Description |
| :----------: | :-----------: | :-------- |
| phone         | string        | Phone number (or group ID in the case of group sending) of the recipient in the format DDI DDD NUMBER e.g., 551199999999. **IMPORTANT** Send only numbers, without formatting or masking |
| message       | string        | Text to be sent  |
| code          | string        | Value to be copied when the button is clicked  |


### Optional
| Attributes  | Type          | Description |
| :----------:| :-----------: | :-------- |
| image       | string        | URL or Base64 of the image that will be sent with button |

---

## Request Body

```json
{
  "phone": "551199999999",
  "message": "Message text",
  "code": "Value to be copied"
}

{
  "phone": "551199999999",
  "message": "Message text",
  "code": "Value to be copied",
  "image": "Image URL"
}
```

---

## Response

### 200

| Attributes | Type   | Description      |
| :--------- | :----- | :--------------- |
| zaapId     | string | ID on Z-API      |
| messageId  | string | ID on WhatsApp   |
| id         | string | Added for compatibility with Zapier, it has the same value as messageId |

Example

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### 405

In this case, ensure that you are correctly sending the method specification, i.e., verify if you sent POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, ensure to add the "Content-Type" header to the request object you are sending, which in most cases is "application/json".

---

## Webhook Response

Link to the webhook response (upon receiving)

[Webhook](../webhooks/on-message-received#template-otp-button-return-example)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-button-otp.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
