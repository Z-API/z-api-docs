---
id: delete-product
title: Deleting a product 
---

## Method 

#### /products/id-do-produto

`DELETE` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/products/{{id-do-produto}}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

In this method you will be able to delete a product by its ID 

## Response

### 200

| Attributes| Type    | Description             |
| :-------- | :------ | :---------------------- |
| success   | boolean | confirmation attribute  |

Example

```json
{
  "success": true
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/delete-product.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
