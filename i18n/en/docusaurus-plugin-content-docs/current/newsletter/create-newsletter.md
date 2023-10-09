---
id: create-newsletter
title: Creating Newsletter
---

## Method

#### /create-newsletter

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/create-newsletter

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method is responsible for creating a newsletter. Unfortunately, it's not possible to create the channel with an image, but you can use the `update-newsletter-picture` method right after creation, which is in the same section.

## Attributes

### Required

| Attributes | Type    | Description    |
| :--------- | :-----: | :------------- |
| name       | string  | Newsletter name    |

### Optional

| Attributes   | Type   | Description       |
| :----------- | :----: | :---------------- |
| description | string | Newsletter description |

---


## Request Body

**Method**

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/create-newsletter

**Example**

```json
{
  "name": "Newsletter Name",
  "description": "Newsletter Description"
}
```

---


## Response

### 201

| Attributes   | Type   | Description             |
| :----------- | :----: | :------------------------ |
| id           | string | Newsletter ID          |

**Example**

```json
{
  "id": "999999999999999999@newsletter"
}
```

:::tip

The returned ID will always include the "@newsletter" suffix, which is the standard used by WhatsApp itself. It should be used in the same format in requests that require the ID as a parameter.

:::

### 405

In this case, ensure that you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" to the headers of the request for the object you are sending, mostly "application/json."

---

## Webhook Response

Link to the webhook response (upon receiving)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/create-newsletter.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
