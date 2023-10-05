---
id: update-newsletter-description
title: Update Newsletter Description
---

## Method

#### /update-newsletter-description

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-newsletter-description

---

## Concept

This method is responsible for changing the description of an existing newsletter.

---

## Attributes

### Required

| Attributes  |  Type  | Description               |
| :--------- | :----: | :---------------------- |
| id         | string | Newsletter ID             |
| description | string | New newsletter description |


---

## Request Body

#### URL

Method

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-newsletter-description

#### Body

```json
{
  "id": "999999999999999999@newsletter",
  "description": "New newsletter description"
}
```

:::warning

The newsletter ID must always contain the suffix "@newsletter" as this is the standard used by WhatsApp itself.

:::

---

## Response

### 201

| Attributes | Type    | Description                                           |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true if successful, false in case of failure |

Example

```json
{
  "value": true
}
```

### 405

In this case, ensure that you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" to the headers of the request for the object you are sending, mostly "application/json."

---

## Webhook Response

Link to the response of the webhook (upon receiving)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-newsletter-description.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
