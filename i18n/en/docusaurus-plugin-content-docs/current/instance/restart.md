---
id: restart
title: Restarting instance
---

## Method 

#### /restart

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/restart

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

If you like every good dev, skipped the introduction and still doesn’t have a clear concept of instance. I strongly suggest that you take a step back and read this topic's introduction.

Okay, now that you know what an instance is, it’s much easier to explain :)

This method is basically a “restart” button for your operating system. Like every expert user, if everything goes wrong you can use CTRL+ALT+DEL.

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

---

:::note

No! You don’t need to read the QRCode if you restart your session.
