---
id: remove-product-from-collection
title: Remove Products from Collection
---

## Method

#### /catalogs/collection/remove-product

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection/remove-product

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Using this method, you will be able to remove products from a collection in your catalog.

:::warning Attention
When adding or removing products from a **collection**, the ID of the collection is changed by WhatsApp. This means that when you register a product in the collection and try to perform any other operation using the "old" ID, it will result in a non-functional route. Remember to use the ID returned by this route, which is already updated for subsequent operations.
:::

---

## Attributes

### Required

| Attributes    |  Type        | Description                             |
| :-----------  | :----------: | :---------------------------------------- |
| collectionId | string       | Collection ID                            |
| productIds   | array string | IDs of the products to be removed from the collection |

## Request Body

```json
{
  "collectionId": "658387616418640",
  "productIds": ["6643149779134830", "6988917394481455"]
}
```

---

## Response

### 200

| Attributes      | Type    | Description                                       |
| :-------------  | :------ | :-----------------------------------------------   |
| success        | boolean | true if it was successful, false in case of failure |
| collectionId   | string  | Updated ID of the collection                        |

Example

```json
{
  "success": true,
  "collectionId": "1798362193933497"
}
```

### 405

In this case, ensure that you are sending the method specification correctly, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers; in most cases, it should be "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/remove-product-from-collection.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
