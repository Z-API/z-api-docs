---
id: unfollow-newsletter
title: Unfollow Newsletter
---

## Method

#### /unfollow-newsletter

`PUT` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/unfollow-newsletter

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method is responsible for unfollowing a newsletter.

---

## Attributes

### Required

| Attributes   |  Type  | Description                            |
| :---------  | :----: | :----------------------------------- |
| id          | string | Newsletter ID |


---

## Request Body

#### URL

Method

`PUT` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/unfollow-newsletter

#### Body

```json
{
  "id": "999999999999999999@newsletter"
}
```

:::warning

The newsletter ID must always contain the suffix "@newsletter" as this is the standard used by WhatsApp itself.

:::

---

## Response

### 200

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

In this case, ensure that you are correctly sending the method specification, i.e., check if you sent the POST, PUT, or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" to the headers of the request for the object you are sending, mostly "application/json."

<!-- --- -->
<!-- 
## Webhook Response

Link to the response of the webhook (upon receiving)

[Webhook](../webhooks/on-message-received#response) -->

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/unfollow-newsletter.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
