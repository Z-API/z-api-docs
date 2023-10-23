---
id: list-collections
title: List Collections
---

## Method

#### /catalogs/collection

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Using this method, you will be able to list the collections in your catalog.

---

## Attributes

### Optional

| Attributes   |  Type   | Description                                      |
| :---------- | :-----: | :-------------------------------------------    |
| nextCursor  | string  | Token used for pagination of records              |

## Request Params

#### Example URL

Method

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection?nextCursor=CURSOR_VALUE

---

## Response

### 200

| Attributes      | Type           | Description                                       |
| :-------------  | :-------------  | :-----------------------------------------------   |
| collections    | array object   | List with collection data                          |
| nextCursor     | string or null | Token that defines the records of the next request |

Object (collections)

| Attributes   |  Type     | Description                               |
| :----------  | :-----:   | :------------------------------------------ |
| id          | string    | Collection ID                             |
| name        | string    | Collection name                           |
| status      | string    | Collection status (PENDING, APPROVED)     |

Example

```json
{
  "nextCursor": "AQHRi6eu3NyRTR30t5Sr2CtkURU7rMF_e2K7NPbELxJFAa-K_HI1I6v8_C3o2j6d4wve",
  "collections": [
    {
      "id": "1072603710847740",
      "name": "Collection Name",
      "status": "PENDING"
    },
    {
      "id": "902834786123343",
      "name": "Collection Name 2",
      "status": "APPROVED"
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/list-collections.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
