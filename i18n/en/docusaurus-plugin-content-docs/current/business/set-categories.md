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

This method allows you to assign categories to a business/company.

:::important Important
This method is only available for WhatsApp Business accounts. 
:::

:::warning Warning
You can register up to 3 categories for the business, and at least one is required.
:::

---

## Attributes

### Mandatory

| Attributes  | Type         | Description                                                      |
| :---------- | :----------- | :--------------------------------------------------------------- |
| categories  | array string | ID or label of the category to be assigned. Can be obtained from the [List Categories](./available-categories) API |

## Request Body

```json
{
  "categories": ["RESTAURANT", "FINANCE", "629412378414563"]
}
```

:::important Important
The values sent in the "categories" attribute must be **identical** to those returned in the "[List Categories](./available-categories)" request, in the "id" or "label" property. The "id" property is useful when the "label" is not returned. Only this way can the desired category be identified for assignment.
:::

## Response

### 201

| Attributes | Type    | Description                          |
| :--------- | :------ | :----------------------------------- |
| success    | boolean | true if successful, false otherwise  |

Example

```json
{
  "success": true
}
```

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent POST or PUT as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" header to the request object you are sending, which in most cases is "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/company-categories.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
