---
id: criar-instancia
sidebar_position: 1
title: Create instance (Partner API)
---
# Create Instance (on-demand)

Create a new on-demand instance for a customer through the Partner API.

## Endpoint

- **Method**: `POST`
- **URL**: `https://api.z-api.io/instances/integrator/on-demand`

> **Status:** as per the official product response, this route is used for creating on-demand instances and is available for production partners.

### Headers

| Header | Type | Required | Description |
|--------|------|----------|------------|
| Client-Token | string | Yes | Partner authentication token |
| Content-Type | string | Yes | Should be `application/json` |

## Request Body

### Required Parameters

| Field | Type | Required | Description |
|-------|------|----------|------------|
| `name` | string | Yes | Name of the instance to be created |
| `sessionName` | string | Yes | Instance session name |

### Optional Parameters

| Field                            | Type    | Required | Description                                                                      |
| -------------------------------- | ------- | -------- | -------------------------------------------------------------------------------- |
| `sessionName`                    | string  | No       | Attribute to change the session name on WhatsApp (on connected devices)          |
| `deliveryCallbackUrl`            | string  | No       | Webhook endpoint for delivered messages (delivery)                               |
| `receivedCallbackUrl`            | string  | No       | Webhook endpoint for received messages (receive)                                 |
| `receivedAndDeliveryCallbackUrl` | string  | No       | Webhook endpoint for messages received and sent by me (receive)                  |
| `presenceChatCallbackUrl`        | string  | No       | Webhook endpoint for chat status (PresenceChat)                                  |
| `disconnectedCallbackUrl`        | string  | No       | Webhook endpoint for disconnection or communication loss (disconnected)          |
| `connectedCallbackUrl`           | string  | No       | Webhook endpoint for connection (connected)                                      |
| `messageStatusCallbackUrl`       | string  | No       | Webhook endpoint for message status                                              |
| `callRejectAuto`                 | boolean | No       | If `true`, automatically rejects incoming calls                                  |
| `callRejectMessage`              | string  | No       | Message sent after automatically rejecting a call                                |
| `autoReadMessage`                | boolean | No       | Automatically marks messages as read                                             |
| `autoReadStatus`                 | boolean | No       | Automatically marks status as read                                               |
| `isDevice`                       | boolean | No       | Defines whether the instance will be mobile or web; if `true`, it will be mobile |
| `businessDevice`                 | boolean | No       | Choose between WhatsApp Business or regular version                              |
| `disableEnqueueWhenDisconnected` | boolean | No       | Enables/disables message queueing when the instance is disconnected              |

### Example of Request Body

```json
{
    "name": "Instancia Z-API - 9292812",
    "sessionName": "Testes testes",
    "deliveryCallbackUrl": "https://mywebhook.com/delivery",
    "receivedCallbackUrl": "https://mywebhook.com/receive",
    "receivedAndDeliveryCallbackUrl": "https://mywebhook.com/receivedanddelivery",
    "disconnectedCallbackUrl": "https://mywebhook.com/disconnected",
    "connectedCallbackUrl": "https://mywebhook.com/connected",
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

## Response

### 200 OK

The response includes the data of the created instance:

```json
{
  "id": "8823XWIE982KII99012K2L",
  "token": "8900LS009W0011000PPIPIP0091200LCKAOOOE009919",
  "due": "329000002121"
}
```

| Attributes | Type | Description |
|------------|------|------------|
| `id` | string | ID of the created instance |
| `token` | string | Token of the created instance |
| `due` | timestamp | Instance validity date |

### Common Errors

| Code | Reason | How to Resolve |
|------|--------|---------------|
| 400 | Invalid parameters | Check if `name` and `sessionName` are present |
| 401 | Invalid token | Check the header `Client-Token` |
| 409 | Instance already exists | Check if the `sessionName` is in use |
| 429 | Rate limit | Wait and try again |
| 5xx | Internal error | Try again; open support if persists |