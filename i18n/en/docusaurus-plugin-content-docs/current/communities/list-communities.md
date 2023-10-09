---
id: list-communities
title: List communities
---

## Method

#### /create-group

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/communities

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method is responsible for returning all the communities you are a part of.

---

## Attributes

### Required

| Attribute | Type | Description |
| :-------- | :--: | :-------- |

### Optional

| Attribute | Type | Description |
| :-------- | :--: | :-------- |
| page | integer | Used for pagination; you can specify the page of communities you want to retrieve |
| pageSize | integer | Specifies the size of the community return per page |

---

## Request Params

#### Example URL

Method

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/communities

---

## Response

### 200

| Attribute | Type   | Description              |
| :-------- | :----- | :----------------------- |
| name      | string | Name of the community    |
| id        | string | Community identifier     |

Example

```json
[
  {
    "name": "my first community",
    "id": "98372465382764532938"
  }
]
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/list-communities.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
