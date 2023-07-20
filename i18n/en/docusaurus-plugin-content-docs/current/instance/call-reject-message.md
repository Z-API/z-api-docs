---
id: update-call-reject-message
title:  Call message
---

## Concept

Through this method, you define the message that will be sent after rejecting a voice call received through the API.

:::important Importante
That's correct. In order for the message to be sent, the previous method (Rejecting calls) needs to be active or enabled. When a voice call is rejected through the API, the defined message will be automatically sent as a response.
:::
---
### Method

#### /update-call-reject-message

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-call-reject-message

#### Request Body

```json
{
  "value": "Reply message"
}
```

---

### Admin Panel

![img](../../../../../img/call-reject-message.jpeg)

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