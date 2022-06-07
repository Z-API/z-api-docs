---
id: edit-product
title: Create/edit product 
---

## Method

#### /products

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/products

---

## Concept

In this method you will be able to register and update a product in your catalog 

---

## Attributes

### Mandatory 

| Attributes   |  Type   | Description                                     |
| :---------- | :-----: | :--------------------------------------------- |
| currency    | string  | Currency type                                 |
| description | string  | Product description                            |
| images      | string  | Product’s image Url                       |
| isHidden    | boolean | Attribute to “hide” the product in the catalog|
| name        | string  | Product name                                |
| price       | integer | Product price                               |
| retailerId  | string  | Product ID                                  |
| url         | string  | Z-APIs Url route                           |

## Request Body

```json
{
  "currency": "BRL",
  "description": "A product description",
  "images": ["https://avatars.githubusercontent.com/u/60630101?s=200&v=4"],
  "isHidden": false,
  "name": "My first product",
  "price": 20,
  "retailerId": "002",
  "url": "https://z-api.io"
}
```

---

## Response

### 200

| Attributes | Type   | Description     |
| :-------- | :----- | :------------ |
| id        | string | Product ID  |

Example

```json
{
  "id": "4741575945866725"
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Webhook Response

Link to webhook response (on receipt)

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-produto)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/edit-product.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
