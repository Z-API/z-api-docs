---
id: rename-instance
title: Renaming the instance 
---

## Method

#### /update-name

`PUT` <https://api.z-api.io/instances/ID_INSTANCE/token/TOKEN_INSTANCE/update-name>

---

## Concept

Method used to rename an instance.

---

## Atributos

| Attributes |  Type   | Description                     |
| :-------- | :----:  | :----------------------------- |
| value     | string  | New name for an instance       |


---

## Request Body

**Method**

`PUT` <https://api.z-api.io/instances/ID_INSTANCE/token/TOKEN_INSTANCE/update-name>

**Example**

```json
Body 
{
  "value": "novo nome"
}
```

---

## Response

### 200

```json
Return
{
    "value": true
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or PUT as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/rename-instance.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
