---
id: request-code
title: Request registration code
---

## Method

#### /mobile/request-registration-code

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/mobile/request-registration-code

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Method used to request the confirmation code. To execute this method, it is necessary to **[verify if the number is available](./registration-available.md)** to be registered. Without making this verification first, it will not be possible to request the code.

:::tip Attention
Remember that the phone number you should send in this request is the same one you verified in the **[previous API](./registration-available.md)**. Because, remember, checking if the number is available is mandatory before requesting the confirmation code.
:::

---

## Attributes

### Required

| Attributes | Type | Description |
| :-------- | :-: | :-- |
| ddi       | string | DDI of the number |
| phone     | string | Phone number you want to register. Should include only the **number with area code** (E.g., 4499999999), without formatting or mask |
| method    | string | Defines the code sending method. SMS, voice call, or pop-up in the WhatsApp application. (sms, voice, wa_old) |

---

## Request Body

```json
{
    "ddi": "55",
    "phone": "4499999999",
    "method": "sms | voice | wa_old"
}
```

---

## Response

### 200

| Attributes   | Type     | Description |
| :--------   | :------  | :-------- |
| success     | boolean  | Returns true if the code request was successfully sent. Check if you received the code and use it in the **[confirm code](./confirm-code.md)** API |
| captcha     | string   | Base64 image with captcha code. In case of receiving this attribute, you need to confirm this code in the **[confirm captcha](./captcha-confirm.md)** API for the code to be sent. After confirming the captcha, it is not necessary to request the code again, just wait for its receipt. |
| blocked     | boolean  | Defines if the number is banned or not |
| retryAfter  | string | Time in seconds to wait for a new code request |
| smsWaitSeconds   | number | Time to wait for **sms** request. If the value is 0, it means that the request can already be sent to this method |
| voiceWaitSeconds | number | Time to wait for **voice call** request. Same purpose as **smsWaitSeconds** |
| waOldWaitSeconds | number | Time to wait for **pop-up in the cell phone app** request. Same purpose as **smsWaitSeconds**. **Attention**: do not use this method if you do not have access to the cell phone where the number is currently linked. This method is useful to speed up the code confirmation process without waiting for SMS or voice call reception, but it requires you to have the device in hand and with the WhatsApp application open. |
| method | string | Code sending method |


### Example

#### Success Case

```json
{
    "success": true,
    "retryAfter": 165,
    "smsWaitSeconds": 125,
    "voiceWaitSeconds": 125,
    "waOldWaitSeconds": 125,
    "method": "sms"
}
```

#### Banned Number Case

```json
{
    "success": false,
    "blocked": true
}
```

### 400

Invalid request. Check if the data you are sending is in accordance with the documentation above.

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending to the headers of the request, mostly "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/request-code.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
