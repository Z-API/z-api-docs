---
id: company-address
title: Change Company Address
---

## Method

#### /business/company-address

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/company-address

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Through this method, it is possible to change the company's commercial address.

:::important Important
This method is only available for Business WhatsApp accounts.
:::

---

## Attributes

### Optional

| Attributes  |  Type   | Description                |
| :---------- | :-----: | :--------------------------- |
| value       | string  | Company's address           |

## Request Body

```json
{
  "value": "Company address"
}
```

:::tip Tip
To remove the address, simply send the "value" attribute as empty.
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/company-address.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
