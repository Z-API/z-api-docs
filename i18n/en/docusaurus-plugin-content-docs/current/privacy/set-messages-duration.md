---
id: set-messages-duration
title: Message Duration
---

## Method

#### /privacy/messages-duration

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/messages-duration?value=DURATION_VALUE

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Through this method, it is possible to configure temporary messages for **new individual conversations**, setting a duration. It does not affect existing conversations.

---

## Attributes

### Required

| Attributes |  Type   | Description                                                     |
| :-------- | :-----: | :-------------------------------------------------------------- |
| value     | string  | Message duration time (days90, days7, hours24, disable) |

String (value) accepted values:
 - days90 (Sets the message duration to 90 days)
 - days7 (Sets the message duration to 7 days)
 - hours24 (Sets the message duration to 24 hours)
 - disable (Disables message expiration)

---

## Request Params

#### URL example

**Method**

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/privacy/messages-duration?value=days90

---

## Response

### 200

| Attributes | Type    | Description                            |
| :-------- | :------ | :-------------------------------------------------- |
| success   | boolean | true if successful, false in case of failure |

Example

```json
{
    "success": true
}
```

### 405

In this case, ensure that you are sending the method specification correctly, i.e., check if you sent the POST or PUT as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers, in most cases, it should be "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/privacy-set-messages-duration.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
