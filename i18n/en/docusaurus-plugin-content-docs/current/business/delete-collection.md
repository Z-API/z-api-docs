---
id: delete-collection
title: Delete Collection
---

## Method

#### /catalogs/collection/{{collection-id}}

`DELETE` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection/{{collection-id}}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Using this method, you will be able to delete a collection of products from your catalog.

---

## Response

### 200

| Attributes | Type    | Description                                           |
| :-------- | :------ | :-------------------------------------------------- |
| success   | boolean | true if it was successful, false in case of failure |

Example

```json
{
  "success": true
}
```

### 405

In this case, ensure that you are sending the method specification correctly, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers; in most cases, it should be "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/delete-collection.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
