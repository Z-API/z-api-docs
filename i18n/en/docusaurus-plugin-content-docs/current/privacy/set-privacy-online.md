---
id: set-privacy-online
title: Online Visibility
---

## Method

#### /privacy/online

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/privacy/online

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Through this method, you can configure who can see when you are online.

---

## Attributes

### Required

| Attributes            |  Type   | Description                                                      |
| :------------------- | :-----: | :-------------------------------------------------------------- |
| visualizationType    | string  | Visibility scope (ALL, SAME_LAST_SEEN) |

String (visualizationType)

Visibility scope. Accepted values:
 - ALL (Everyone can see)
 - SAME_LAST_SEEN (Same configuration as "last seen")

## Request Body

**Method**

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/privacy/online

**Example**

```json
{
    "visualizationType": "ALL"
}
```

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/privacy-online.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
