---
id: sign-instance
title: Subscribing to an instance 
---

## Method

#### /subscription

`POST` https://api.z-api.io/instances/{id}/token/{token}/integrator/on-demand/subscription

---

## Concept

Method used to subscribe to an instance 

:::caution Attention 

You will only be able to subscribe to instances created via API with this method

:::

---

## Attributes

### Mandatory 

| Attributes| Type | Description|
| :-------- | :--: | :-------- |
|           |      |           |

### Optionals

| Attributes| Type | Description|
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

**Method**

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/{YOUR_TOKEN}/integrator/on-demand/subscription

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/sign-instance.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
