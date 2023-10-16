---
id: available-categories
title: List Categories
---

## Method

#### /business/available-categories

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/available-categories

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Through this method, it is possible to list the available categories to assign to the company.

:::important Important
This method is only available for Business WhatsApp accounts.
:::

---

## Response

### 200

| Attributes   | Type    | Description                                                         |
| :--------   | :------ | :--------------------------------------------------               |
| displayName | string  | Name of the category to be displayed                               |
| label       | string  | Value to be sent in the request to assign categories to the company |

Example

```json
[
  {
    "displayName": "Other Companies",
    "label": "OTHER_COMPANIES"
  },
  {
    "displayName": "Automotive Service",
    "label": "AUTOMOTIVE_SERVICE"
  }
]
```

### 405

In this case, ensure that you are sending the method specification correctly, i.e., check if you sent the POST or PUT as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers, in most cases, it should be "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/available-categories.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
