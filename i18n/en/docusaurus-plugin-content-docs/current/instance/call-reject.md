---
id: update-call-reject-auto
title: Rejecting calls
---

## Concept

This method activates the option of automatic call rejection in your API. When enabled, all incoming voice calls received by the number connected to the API will be automatically rejected.

---
### Method

#### /update-call-reject-auto

`PUT` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-call-reject-auto

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

#### Request Body

```json
{
"value": true or false
}
```

---

### Admin Panel

![img](../../../../../img/call-reject.jpeg)

---

## Response

### 200

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