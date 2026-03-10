---
id:id: update-webhook-delivery
title: Delivery
---

## Method

#### /update-webhook-delivery

`PUT` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-webhook-delivery

## Concept

This method is responsible for updating/adding your Endpoint for the **delivery** webhook via API, i.e., without needing to access the Z-API admin panel.

:::caution Attention

Z-API does not accept webhooks that are not HTTPS

:::

---

## Examples

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

`PUT` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-webhook-delivery

#### Body

```json
{
  "value": "https://address-of-your-system.com.br/instance/YOUR_INSTANCE/delivery"
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-webhook-delivery.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>