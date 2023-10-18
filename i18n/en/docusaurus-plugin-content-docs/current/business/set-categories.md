---
id: company-categories
title: Assign Categories
---

## Method

#### /business/categories

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/categories

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Through this method, it is possible to assign categories to the company.

:::important Important
This method is only available for Business WhatsApp accounts.
:::

:::warning Attention
It is possible to register a maximum of 3 categories for the company, and at least one is required.
:::

---

## Attributes

### Required

| Attributes   | Type          | Description                        |
| :--------   | :------------ | :---------------------------------- |
| categories  | array string  | Label of the category to be assigned |

## Request Body

```json
{
  "categories": ["RESTAURANT", "FINANCE", "EDUCATION"]
}
```

:::important Important
The values sent in the "categories" attribute must be **identical** to those returned in the "[List Categories](./available-categories)" request, under the "label" property. Only in this way is it possible to identify the desired category to be assigned.
:::

## Response

### 201

| Attributes | Type    | Description                                      |
| :-------- | :------ | :----------------------------------------------- |
| success   | boolean | true if successful, false in case of failure   |

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/company-categories.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
