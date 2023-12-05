---
id: edit-collection
title: Edit Collection
---

## Method

#### /catalogs/collection-edit/{{collection-id}}

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection-edit/{{collection-id}}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Using this method, you will be able to edit a product collection in your catalog.

---

## Attributes

### Required

| Attributes   |  Type        | Description                      |
| :---------- | :----------: | :-------------------------------- |
| name        | string       | New collection name               |

## Request Body

```json
{
  "name": "New collection name"
}
```

---

## Response

### 200

| Attributes      | Type    | Description                                     |
| :-------------   | :------ | :------------------------------------------------ |
| success          | boolean | true if successful, false in case of failure     |
| collectionId     | string  | Collection ID                                   |

Example

```json
{
  "success": true,
  "collectionId": "228078660281007"
}
```

### 405

In this case, ensure that you are sending the method specification correctly, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers, in most cases, it should be "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/edit-collection.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
