---
id: get-iswhatsapp-batch
title: Batch Validate Numbers
---

## Method

#### /phone-exists-batch

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/phone-exists-batch

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Unlike the previous method that individually validates whether a number has WhatsApp through a GET request, this API provides batch verification.

:::caution Attention
Batch Validation Limit: The maximum number of batch validations per request is 50,000 numbers.
:::

:::important Important
This method remains the ideal choice when you need to check if a number has WhatsApp, especially useful for form validation. However, it is crucial to note that it is not recommended to use this API to verify the existence of the number before sending a message. The Z-API automatically performs this validation with every message sent, and duplicate use of this method can lead to issues.
:::

---

## Attributes

### Required

| Atributos | Tipo  | Descrição |
| :------   | :-:   | :------   |
|  phones   | array | Phone numbers to be validated should be in the format: Country Code Area Code Number, for example, 551199999999. *IMPORTANT* Send only numbers without formatting or masks. |

---

## Request Params

#### URL example

Method

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/phone-exists-batch


```json
{
  "phones": ["554499999999","554488888888"]
}
```

---

## Response

### 200

| Attributes   | Type    | Description |
| :------     | :----   | :------   |
| exists      | boolean | true if it exists, false for cases where the number doesn't have WhatsApp |
| inputPhone  | string  | Number sent in the request, may or may not include the ninth digit.|
| outputPhone | string  | Formatted number according to the WhatsApp response, reflecting the WhatsApp registration and including the ninth digit if applicable. |
| lid | string  | A unique and private identifier created by WhatsApp to represent contacts without directly exposing their phone number |
 
Example

```json
[
    {
        "exists": true,
        "inputPhone": "554499999999",
        "outputPhone": "554499999999",
        "lid": "999999999999999@lid"
    },
    {
        "exists": false,
        "inputPhone": "554488888888",
        "outputPhone": "554488888888",
        "lid": null
    }
]
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-iswhatsapp-batch.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
