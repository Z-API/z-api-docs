---
id: set-security-code
title: Set PIN code
---

## Method

#### /security/two-fa-code

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/security/two-fa-code

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Method used to register a security PIN code on your WhatsApp account.

:::caution
This API is available only for mobile instances.
:::

---

## Attributes

### Required

| Attributes | Type | Description |
| :-------- | :--: | :-- |
| code      | string | Security PIN code to be registered on the account |

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
| success     | boolean  | Defines if the request was executed successfully |


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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/set-security-code.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
