---
id: registration-available
title: Registration is available
---

## Method

#### /mobile/registration-available

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/mobile/registration-available

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Method used to check the registration availability of a number. This method is **mandatory** before the method of requesting the code sending, as it not only searches for information about availability but also performs an onboarding setup of the number on WhatsApp. Through this API, you can also see the available methods for requesting the confirmation code, as well as whether the number is banned or not.

---

## Attributes

### Required

| Attributes | Type | Description |
| :-- | :-: | :-- |
| ddi | string | DDI of the number |
| phone | string | Phone number you want to register. Should include only the **number with area code** (E.g., 4499999999), without formatting or mask |

---

## Request Body

```json
{
    "ddi": "55",
    "phone": "4499999999"
}
```

---

## Response

### 200

| Attributes   | Type     | Description |
| :--------   | :------  | :-------- |
| available   | boolean  | Returns true if the number is available for registration. If the response is false, it will not be possible to proceed to the next step of registration |
| blocked     | boolean  | Defines if the number is banned or blocked for some other reason. If this is your case, use the **appealToken** attribute to request unbanning |
| appealToken | string | If the number is banned, this attribute will be returned containing a token for **[unbanning request](./request-unbanning)** |
| smsWaitSeconds   | number | Time to wait for **SMS** request. If the value is 0, it means that the request can already be sent to this method |
| voiceWaitSeconds | number | Time to wait for **voice call** request. Same purpose as **smsWaitSeconds** |
| waOldWaitSeconds | number | Time to wait for **pop-up in the cell phone app** request. Same purpose as **smsWaitSeconds**. **Attention**: do not use this method if you do not have access to the cell phone where the number is currently linked. This method is useful to speed up the code confirmation process without waiting for SMS or voice call reception, but it requires you to have the device in hand and with the WhatsApp application open. |
| waOldEligible | boolean | Defines if the method of requesting the code via **pop-up in the cell phone app** is available. |
| reason | string | In case of error, this attribute tells the reason for the error |


### Example

#### Available Number Case

```json
{
    "available": true,
    "smsWaitSeconds": 0,
    "voiceWaitSeconds": 0,
    "waOldWaitSeconds": 0,
    "waOldEligible": true
}
```

#### Banned Number Case

```json
{
    "available": false,
    "blocked": true,
    "appealToken": "Ae0B_6FfVfyB8on0v76ALf1RkWXFFsfvliOdh02JyXTFcbnlTAwO5_h5Ju4L5zfa-fhWKIzQhtXYhZTGRZxwYE3_iPgJ0nimuOkjrZLvnBOf-5Sitf2zmJJRs--1EJc5mvYRA1qJnHyktSBM7ZQWrsV9Lddyrj0TyCMKa_nXhvHwNfg8n5yz7tita5s"
}
```

:::warning Attention
There are some scenarios where the number is prevented from being connected even in the official WhatsApp application. In this case, the number availability check API is not able to identify this, and it returns that the number is blocked only when trying to request the code. Unfortunately, there is nothing we can do about it at the moment because, unlike the standard banning, there is no token (appealToken) available to request unbanning.
:::

### 400

Invalid request. Check if the data you are sending is in accordance with the documentation above.

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending to the headers of the request, mostly "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/registration-available.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
