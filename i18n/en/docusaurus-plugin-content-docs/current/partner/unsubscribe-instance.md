---
id: unsubscribe-instance
title: Canceling an instance
---

## Method

#### /cancel

`POST` https://api.z-api.io/instances/{id}/token/{token}/integrator/on-demand/cancel

---

## Concept

Method used to cancel an instance 

:::caution Attention

From the moment you subscribe to an instance, it will be available for use for 30 days, even if you cancel it before this period.This means that if you cancel today but it expires in 10 days, it will be available for another 10 days .

:::

---

## Attributes

### Mandatory

| Attributes| Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

### Optionals

| Attributes| Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

**Method**

`POST` https://api.z-api.io/instances/{id}/token/{token}/integrator/on-demand/cancel

---

## Response

### 201

OK

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Webhook Response

Link to webhook response (on receipt)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/unsubscribe-instance.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
