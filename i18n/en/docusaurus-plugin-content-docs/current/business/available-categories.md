---
id: available-categories
title: List Categories
---

## Method

#### /business/available-categories?query={{SEARCH_STRING (optional)}}

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/available-categories

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method allows you to list the available categories that can be assigned to a business/company.

:::important Important
This method is only available for WhatsApp Business accounts. 
:::

---

## Attributes

### Optional

| Attributes | Type   | Description                           |
| :--------- | :----: | :------------------------------------- |
| query      | string | Category search parameter. Example: "technology" |

---

## Request Params

#### Example URL

Method

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/business/available-categories?query=technology

## Response

### 200

| Attribute    | Type    | Description                                                                         |
| :----------- | :------ | :---------------------------------------------------------------------------------- |
| displayName  | string  | Category name to be displayed                                                       |
| id           | string  | Category identifier. Must be sent in the request to assign categories to the business |
| label        | (Optional) string  | Can also be provided in the request to assign categories to the business    |

Example

```json
[
  {
    "displayName": "Other Companies",
    "label": "OTHER_COMPANIES",
    "id": "629412378414563"
  },
  {
    "displayName": "Automotive Service",
    "id": "1223524174334504"
  }
]
```

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent POST or PUT as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" header to the request object you are sending, which in most cases is "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/available-categories.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
