---
id: create-instance
title: Creating an instance
---
## Method

#### /on-demand

`POST` https://api.z-api.io/instances/integrator/on-demand

---

## Concept

Method used to create an instance linked to your account.

:::tip Tip

You don't necessarily need to subscribe to the instance at this point as you have 2 days to use it as a trial.

:::

:::caution Attention 

**Deleting an instance**

If you do not subscribe within 2 days, our devops will automatically delete the machine connected to the instance. So in cases of no signatures you don't have to worry :)

:::

---

## Attributes

### Mandatory

| Attributes|  Type  | Description                    |
| :-------- | :----: | :----------------------------- |
| name      | string | Name of instance to be created|

### Optionals

| Attributes| Type | Description |
| :-- | :-: | :-- |
| sessionName | string | Attribute to change session name in whatsapp (on connected devices) |
| deliveryCallbackUrl | string | Delivered Messages Webhook EndPoint - delivery |
| receivedCallbackUrl | string | Incoming Messages Webhook EndPoint - receive |
| disconnectedCallbackUrl | string | Webhook EndPoint disconnected or lost communication - disconnected |
| connectedCallbackUrl | string | Connection webhook endpoint - connected |
| messageStatusCallbackUrl | string | Status webhook endpoint |

---

## Request Body

**Method**

`POST` https://api.z-api.io/instances/integrator/on-demand

**Example**

```json
{
  "name": "Instance Z-API - 9292812",
  "sessionName": "Tests tests",
  "deliveryCallbackUrl": "https://mywebhook.com.br/delivery",
  "receivedCallbackUrl": "https://mywebhook.com.br/receive",
  "disconnectedCallbackUrl": "https://mywebhook.com.br/disconnected",
  "connectedCallbackUrl": "https://mywebhook.com.br/connected",
  "messageStatusCallbackUrl": "https://mywebhook.com.br/status"
}
```

---

## Response

### 200

| Attributes| Type      | Description                   |
| :-------- | :-------- | :---------------------------- |
| id        | string    | Created instance ID           |
| token     | string    | TOKEN of the created instance |
| due       | timestamp | Instance expiration date      |

**Example**

```json
{
    "id": "8823XWIE982KII99012K2L"
    "token": "8900LS009W0011OOOPPIPIP00912OOLCKAOOOE009919"
    "due": "329000002121"
}
```

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/create-instance.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
