---
id: restore-session
title: Restoring session 
---

## Method 

#### /restore-session

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/restore-session

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method tries to restore your connection with WhatsApp based off of the information saved in the Z-API session.

---

## Response

### 200

```json
{
  "value": true
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code
