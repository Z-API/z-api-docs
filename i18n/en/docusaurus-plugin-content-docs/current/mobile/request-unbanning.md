---
id: request-unbanning
title: Request unbanning
---

## Method

#### /mobile/request-unbanning

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/mobile/request-unbanning

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Method used to request the unbanning of a number.

---

## Attributes

### Required

| Attributes | Type | Description |
| :-- | :-: | :-- |
| appealToken | string | Token for unbanning a specific number |
| description | string | Description to be sent for WhatsApp analysis   |

---

## Request Body

```json
{
    "appealToken": "Ae1CIGl4Mq7kQ09OQzUnnCx2mTPHxZCjPesdRc8Z1lNFV9d6gvtd5LDW0r7ukVAgtMOP2AxckQM6QeyVp7bL0RbbVac6GQUtMd4tYAZsPOwSIQKlVIoTZs2akgcRd-jvhLKh32roOd0KFPg7hAaYURpIuDXhkaZ_gLJLhmzADNp3lxUNdsIg10q92w",
    "description": "I was chatting normally and got banned"
}
```

---

## Response

### 200

| Attributes   | Type     | Description |
| :--------   | :------  | :-------- |
| success     | boolean  | Returns true if the request was successful |
| status      | string   | Status of the unbanning request (IN_REVIEW, UNBANNED) |

### Example

```json
{
    "success": true,
    "status": "IN_REVIEW | UNBANNED"
}
```

### 400

Invalid request. Check if the data you are sending is in accordance with the documentation above.

### 405

In this case, make sure you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending to the headers of the request, mostly "application/json"


## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/request-unbanning.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
