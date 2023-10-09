---
id: profile-picture
title: Update profile picture
---

## Method

#### /profile-picture

`PUT` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/profile-picture

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method is responsible for changing your profile picture on WhatsApp.

---

## Attributes

### Obrigatórios

| Attributes |  Type  | Description   |
| :--------- | :----: | :------------ |
|   value    | string |   image URL   |

### Opcionais

| Attributes | Type | Description |
| :--------  | :--: | :--------   |

---

## Request Body

#### Body

```json
{
  "value": "image URL"
}
```

---

## Response

### 200

| Attributes | Type   | Description                                         |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true if successful, and false if there is a failure |

Example

```json
{
  "value": true
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a PUT or POST as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---



