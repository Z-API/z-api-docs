---
id: create-collection
title: Create Collection
---

## Method

#### /catalogs/collection

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Using this method, you will be able to create a collection of products in your catalog.

---

## Attributes

### Required

| Attributes   |  Type        | Description                            |
| :---------- | :----------: | :-------------------------------------- |
| name        | string       | Name of the collection                   |
| productIds  | array string | IDs of the products that will be part of the collection |

## Request Body

```json
{
    "name": "Collection Name",
    "productIds": ["121212121212", "232323232323"]
}
```

---

## Response

### 200

| Attributes      | Type   | Description  |
| :------------- | :----- | :----------   |
| collectionId   | string | Collection ID |

Example

```json
{
  "collectionId": "123456789123"
}
```

### 405

In this case, ensure that you are sending the method specification correctly, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers, in most cases, it should be "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/create-collection.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
