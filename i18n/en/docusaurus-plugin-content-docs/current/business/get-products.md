---
id: get-products
title: Get products 
---

## Method

#### /catalogs

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

With this method you will be able to get the products from an application Business catalog 

## Attributes

### Optional

| Attributes   |  Type   | Description                                    |
| :---------- | :-----: | :------------------------------------------- |
| nextCursor  | string  | Token used for pagination of records          |

:::tip 414 URI Too Large

In some cases, sending the nextCursor may cause a 414 "URI Too Large" error. To resolve this issue, we implemented a V2 for this API route that accepts POST requests so you can send the nextCursor in the request body.
To learn how to use it, access the route documentation [Get Products V2](/business/get-products-v2)

:::

---

## Response

### 200

| Attributes   | Type    | Description                                      |
| :----------- | :------ | :----------------------------------------------- |
| cartEnabled  | boolean | Attribute to know if your cart is active         |
| availability | string  | Attribute to know product availability           |
| id           | string  | Product ID                                       |
| retailerId   | boolean | Retailer ID                                      |
| description  | string  | Product description                              |
| price        | string  | Product price                                    |
| salePrice    | string  | Sale price                                       |
| currency     | string  | Currency type                                    |
| name         | string  | Product type                                     |
| quantity     | boolean | Product quantity attribute                       |
| images       | string  | Product image link                               |

Example 

```json
{
  "cartEnabled": true,
  "products": [
    {
      "availability": "in stock",
      "id": "999999999999999",
      "retailerId": null,
      "description": "mouse description",
      "price": "100000",
      "salePrice": "90000",
      "currency": "BRL",
      "name": "Mouse",
      "quantity": null,
      "images": ["https://"]
    }
  ]
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-products.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
