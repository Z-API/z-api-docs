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

| Field | Type | Required | Description |
|-------|------|----------|------------|
| `deliveryCallbackUrl` | string | No | Callback URL for message delivery notifications |
| `receivedCallbackUrl` | string | No | Callback URL for message receipt notifications |
| `receivedAndDeliveryCallbackUrl` | string | No | Unified callback URL for received and delivered messages |
| `disconnectedCallbackUrl` | string | No | Callback URL for disconnection notifications |
| `connectedCallbackUrl` | string | No | Callback URL for connection notifications |
| `messageStatusCallbackUrl` | string | No | Callback URL for message status updates |
| `callRejectAuto` | boolean | No | If `true`, automatically rejects incoming calls |
| `isDevice` | boolean | No | Indicates if the instance is a physical device |
| `businessDevice` | boolean | No | Indicates if the instance is a business device (WhatsApp Business) |
| `disableEnqueueWhenDisconnected` | boolean | No | This parameter enables /desabilita message queuing when creating the instance. |

### Example of Request Body

```json
{
  "name": "Meu cliente X",
  "sessionName": "cliente-x-session",
  "deliveryCallbackUrl": "https://meuservidor.com/webhooks/delivery",
  "receivedCallbackUrl": "https://meuservidor.com/webhooks/received",
  "receivedAndDeliveryCallbackUrl": "https://meuservidor.com/webhooks/unified",
  "disconnectedCallbackUrl": "https://meuservidor.com/webhooks/disconnected",
  "connectedCallbackUrl": "https://meuservidor.com/webhooks/connected",
  "messageStatusCallbackUrl": "https://meuservidor.com/webhooks/status",
  "callRejectAuto": false,
  "isDevice": false,
  "businessDevice": true
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