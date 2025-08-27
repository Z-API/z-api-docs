---
id: update-community-photo
title: Update community image 
---

## Method 

#### /update-community-photo

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-community-photo

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept 

This method is reponsibible for changing a community image that already exists

---

## Atributes

### Required

| Attributes    |  Type  | Description           |
| :------------ | :----: |:----------------------|
| communityId   | string | Community ID          |
| communityPhoto| string | Image's url or base64 |

### Optionals 

| Attributes| Type | Description|
| :-------- | :--: | :-------- |

---

## Request Body

#### URL

Method

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-community-photo

#### Body

```json
{
  "communityId": "string",
  "communityPhoto": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
}
```

::::tip Send Base64 image 

If you have doubts about how to send a Base64 image, access the "Send Image" message topic, there you will find everything you need to know about sending in this format.

::::

---

## Response

### 200

| Attributes| Type    | Description                                         |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true if it worked and false if it failed |

Example

```json
{
  "value": true
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers, mostly "application/json"

---

## Webhook Response

Link to webhook response (on receipt)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-community-photo.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>