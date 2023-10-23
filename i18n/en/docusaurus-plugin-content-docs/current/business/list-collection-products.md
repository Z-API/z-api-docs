---
id: list-collection-products
title: List Collection Products
---

## Method

#### /catalogs/collection-products/{{catalog-owner-phone}}

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection-products/{{catalog-owner-phone}}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Using this method, you will be able to list the products that are part of a collection in your catalog.

---

## Attributes

### Required

| Attributes    |  Type   | Description                                 |
| :-----------  | :-----: | :------------------------------------------- |
| collectionId  | string  | Collection ID                               |

### Optional

| Attributes    |  Type   | Description                                 |
| :-----------  | :-----: | :------------------------------------------- |
| nextCursor    | string  | Token used for pagination of records          |

## Request Params

#### Example URL

Method

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection-products/{{catalog-owner-phone}}?collectionId=12312312312&nextCursor=CURSOR_VALUE

---

## Response

### 200

| Attributes      | Type           | Description                                       |
| :-------------  | :-------------  | :-----------------------------------------------   |
| nextCursor      | string or null | Token that defines the records of the next request |
| products        | array object   | List with product data                            |

Object (products)

| Attributes       |  Type     | Description                                   |
| :--------------  | :-----:   | :--------------------------------------------  |
| id              | string    | Product ID                                    |
| name            | string    | Product name                                  |
| description     | string    | Product description                           |
| url             | string    | Product URL                                   |
| price           | string    | Product price                                 |
| currency        | string    | Currency type                                 |
| isHidden        | boolean   | Hidden product                                |
| availability    | string    | Attribute to determine product availability   |
| retailerId      | string    | Retailer ID                                   |
| images          | string    | Product image link                            |
| quantity        | string    | Product quantity attribute                    |

Example

```json
{
  "nextCursor": null,
  "products": [
    {
      "id": "6988917394481455",
      "name": "Product Name",
      "description": "Product Description",
      "url": "http://site.com/product",
      "price": "10000",
      "currency": "BRL",
      "isHidden": false,
      "availability": "in stock",
      "retailerId": "123",
      "images": [
          "https://cdn.greatsoftwares.com.br/files/pages/10603-92bb9420b363835d05d41b96a45d8f4e.png"
      ],
      "quantity": "99"
    }
  ]
}
```

### 405

In this case, ensure that you are sending the method specification correctly, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers; in most cases, it should be "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/list-collection-products.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
