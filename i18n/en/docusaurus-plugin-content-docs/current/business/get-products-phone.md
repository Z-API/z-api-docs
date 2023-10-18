---
id: get-products-phone
title: Get Products (Phone)
---

## Method

#### /catalogs/Phone-Number

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/{{Phone-Number}}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

In this method, you will be able to get products from a WhatsApp Business catalog of any phone number, whether it's your catalog or someone else's.

## Attributes

### Optional

| Attributes   |  Type   | Description                                    |
| :---------- | :-----: | :------------------------------------------- |
| nextCursor  | string  | Token used for pagination of records          |

---

## Request Params

#### URL example

Method

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/{{Phone-Number}}?nextCursor=CURSOR_VALUE

---

## Response

### 200

| Attributes    | Type    | Description                                            |
| :----------- | :------ | :---------------------------------------------------   |
| cartEnabled  | boolean | Attribute to know if the cart is active               |
| nextCursor   | string  | Token that defines the records of the next request    |
| availability | string  | Attribute to know the product's availability           |
| id           | string  | Product ID                                             |
| retailerId   | boolean | Retailer ID                                           |
| price        | string  | Product price                                         |
| currency     | string  | Currency type                                         |
| name         | string  | Product name                                         |
| quantity     | boolean | Product quantity attribute                             |
| images       | string  | Product image link                                    |

Example

```json
{
  "cartEnabled": true,
  "products": [
    {
      "availability": "in stock",
      "id": "99999999999999999",
      "retailerId": null,
      "price": "100000",
      "currency": "BRL",
      "name": "Mouse",
      "quantity": null,
      "images": ["https://"]
    }
  ]
}
```

### 405

In this case, ensure that you are sending the method specification correctly, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers, in most cases, it should be "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-products-phone.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
