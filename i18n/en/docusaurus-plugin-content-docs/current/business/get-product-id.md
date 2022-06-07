---
id: get-product-id
title: Get product (ID)
---

## Method

#### /products/product-ID

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/products/{{product-ID}}

---

## Concept

In this method you will be able to get any product by its ID

## Response

### 200

| Attributes   | Type    | Description                                      |
| :----------- | :------ | :----------------------------------------------- |
| cartEnabled  | boolean | Attribute to know if your cart is active         |
| availability | string  | Attribute to know product availability           |
| id           | string  | Product ID                                       |
| retailerId   | boolean | Retailer ID                                      |
| price        | string  | Product price                                    |
| currency     | string  | Currency type                                    |
| name         | string  | Product type                                     |
| quantity     | boolean | Product quantity attribute                       |
| images       | string  | Product image link                               |

Example

```json
{
  "cartEnabled": true,
  "catalogId": "99999999999999999",
  "product": {
    "availability": "in stock",
    "id": "99999999999999",
    "retailerId": null,
    "price": "20000",
    "currency": "BRL",
    "name": "My first product",
    "images": ["https://"]
  }
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-product-id.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
