---
id: company-email
title: Change Company Email
---

## Method

#### /business/company-email

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/company-email

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Through this method, it is possible to change the contact email of the company.

:::important Important
This method is only available for Business WhatsApp accounts.
:::

---

## Attributes

### Optional

| Attributes  |  Type   | Description                |
| :---------- | :-----: | :--------------------------- |
| value       | string  | Company's email              |

## Request Body

```json
{
  "value": "email@example.com"
}
```

:::important Email format
Please note that the field you send must be in a valid email format. Filling this value with text that is not in the email format will result in an error.
:::

:::tip Tip
To remove the email, simply send the "value" attribute as empty.
:::

---

## Response

### 201

| Attributes | Type    | Description                                  |
| :-------- | :------ | :------------------------------------------- |
| success   | boolean | true if successful, false in case of failure |

Example

```json
{
  "success": true
}
```

### 405

In this case, ensure that you are sending the method specification correctly, i.e., check if you sent the POST or PUT as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers, in most cases, it should be "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/company-email.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
