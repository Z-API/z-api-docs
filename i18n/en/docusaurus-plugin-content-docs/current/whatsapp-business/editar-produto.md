---
id: editar-produto
sidebar_position: 2
title: Create/Edit Product
---
## Method

### /products

```http
POST https://api.z-api.io/instances/{instanceId}/token/{instanceToken}/products
```

### Header

| Key           | Value                                    |
| :------------ | :--------------------------------------- |
| Client-Token  | **[ID E TOKEN](../security/id-e-token)** |

---

## Concept

In this method you will be able to register and update a product in your catalog.

---

## Attributes

### Required

| Attributes   | Type   | Description                                      |
| :----------  | :----- | :----------------------------------------------- |
| currency     | string | Currency type                                    |
| description  | string | Product description                              |
| images       | string | Product image URL                               |
| isHidden     | boolean | Attribute to "hide" the product in the catalog   |
| name         | string | Product name                                     |
| price        | integer | Product price                                    |
| salePrice    | integer | Sale price                                       |
| retailerId   | string | Product ID                                      |
| url          | string | URL of the z-api route                          |

## Request Body

```json
{
  "currency": "BRL",
  "description": "Uma descricao do produto",
  "images": ["https://avatars.githubusercontent.com/u/60630101?s=200&v=4"],
  "isHidden": false,
  "name": "Meu primeiro produto",
  "price": 20,
  "salePrice": 18,
  "retailerId": "002",
  "url": "https://z-api.io"
}
```

---

## Response

### 200

| Attributes | Type   | Description     |
| :--------  | :----- | :-------------- |
| id         | string | Product ID      |

Example

```json
{
  "id": "4741575945866725"
}
```

### 405

In this case make sure you are sending the correct method specification, that is, verify if you sent POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add in the request headers the "Content-Type" of the object you are sending, most commonly "application/json"

---

## Webhook Response

Link for the webhook response (upon receiving)

[Webhook](../webhooks/ao-receber#example-of-product-return)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/edit-product.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>