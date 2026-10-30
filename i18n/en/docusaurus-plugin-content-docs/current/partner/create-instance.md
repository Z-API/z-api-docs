---
id: create-instance
title: Creating an instance
---
## Método

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

### Required

| Attributes|  Type  | Description                    |
| :-------- | :----: | :----------------------------- |
| name      | string | Name of instance to be created|

### Optionals

| Attributes| Type | Description |
| :-- | :-: | :-- |
| sessionName                    | string  | Attribute to change the session name on the application (on connected devices) |
| deliveryCallbackUrl            | string  | Webhook endpoint for delivered messages - delivery |
| receivedCallbackUrl            | string  | Webhook endpoint for received messages - receive |
| receivedAndDeliveryCallbackUrl | string  | Webhook endpoint for received and sent messages - receive |
| presenceChatCallbackUrl        | string  | Webhook endpoint for chat status updates - presenceChat |
| disconnectedCallbackUrl        | string  | Webhook endpoint for disconnection or communication loss - disconnected |
| connectedCallbackUrl           | string  | Webhook endpoint for connection events - connected |
| messageStatusCallbackUrl       | string  | Webhook endpoint for message status updates - messageStatus |
| callRejectAuto                 | boolean | Automatically reject incoming calls - "true" or "false" |
| callRejectMessage              | string  | Message sent after automatically rejecting a call |
| autoReadMessage                | boolean | Automatically mark messages as read - "true" or "false" |
| autoReadStatus                 | boolean | Automatically mark status as read - "true" or "false" |
| isDevice                       | boolean | Defines whether the instance is mobile or web; if "true", it will be mobile |
| businessDevice                 | boolean | Choose between the Business application or regular application |
| disableEnqueueWhenDisconnected | boolean | Enable/disable message queueing when creating the instance |

---

## Request Body

**Method**

`POST` https://api.z-api.io/instances/integrator/on-demand

**Example**

```json
{
    "name": "Instancia Z-API - 9292812",
    "sessionName": "Testes testes",
    "deliveryCallbackUrl": "https://mywebhook.com/delivery",
    "receivedCallbackUrl": "https://mywebhook.com/receive",
    "receivedAndDeliveryCallbackUrl": "https://mywebhook.com/receivedanddelivery",
    "disconnectedCallbackUrl": "https://mywebhook.com/disconnected",
    "connectedCallbackUrl": "https://mywebhook.com/receive",
    "presenceChatCallbackUrl": "https://mywebhook.com/presencechat",
    "messageStatusCallbackUrl": "https://mywebhook.com/status",
    "callRejectAuto": false,
    "callRejectMessage": "Test message for rejected calls",
    "autoReadMessage": false,
    "autoReadStatus": false,
    "isDevice": false,
    "businessDevice": false,
    "disableEnqueueWhenDisconnected": true
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
