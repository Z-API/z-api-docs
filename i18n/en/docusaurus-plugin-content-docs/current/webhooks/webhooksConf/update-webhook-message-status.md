---
id:id: update-webhook-message-status
title: Status
---

## Method

### Update webhook

#### /update-webhook-status

`PUT` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-webhook-message-status

## Concept

This method is responsible for updating/adding your Endpoint for the status webhook via API, i.e., without needing to access the Z-API admin panel.

:::caution Attention

Z-API does not accept webhooks that are not HTTPS

:::

---

## Attributes

### Required

| Attributes |  Type  | Description                         |
| :-------- | :----: | :-------------------------------- |
| value     | string | Webhook/Endpoint of your application |

### Optional

| Attributes | Type | Description |
| :-------- | :--: | :-------- |

---

## Request Body

#### URL

`PUT` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-webhook-message-status

#### Body

```json
{
  "value": "https://address-of-your-system.com.br/instance/YOUR_INSTANCE/status"
}
```

---

## Response

### 200

### 405

In this case, make sure you are sending the method specification correctly, i.e., check if you sent POST or PUT as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" header of the object you are sending, in most cases "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-webhook-message-status.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>