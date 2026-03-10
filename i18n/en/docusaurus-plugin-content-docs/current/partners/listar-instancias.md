---
id: listar-instancias
sidebar_position: 4
title: List instances
---
# List Instances

List all instances managed by your partner account.

## Endpoint

- **Method**: `GET`
- **URL**: `https://api.z-api.io/instances`

> **Status:** the instance listing route is in production and query parameters (filters, pagination) should be used as described in this documentation.

### Headers

| Header | Type | Required | Description |
|--------|------|----------|------------|
| Client-Token | string | Yes | Partner authentication token |

## Required Query Parameters

| Attributes | Type | Description |
|-----------|------|------------|
| `page` | integer | Used for pagination. Specify the page of instances you want to search here. |
| `pageSize` | integer | Specifies the number of instance results per page. |

## Optional Query Parameters

| Attributes | Type | Description |
|-----------|------|------------|
| `query` | number | Search by instance name and ID. |
| `middleware` | string | Search by instance type: `web` or `mobile`. If this parameter is not sent, all instances are returned. |

### Example Request

```http
GET https://api.z-api.io/instances?page=1&pageSize=10
```

## Response

### 200 OK

The response returns a collection of instances with their metadata:

```json
{
  "total": 1,
  "totalPage": 1,
  "pageSize": 1,
  "page": 1,
  "content": [
    {
      "token": "a1b2c3d4e5",
      "tenant": "client-tenant-id",
      "created": "2024-01-15T10:30:00Z",
      "due": 1705323600000,
      "paymentStatus": "paid",
      "deliveryCallbackUrl": "https://webhook.site/...",
      "receivedCallbackUrl": "https://webhook.site/...",
      "disconnectedCallbackUrl": "https://webhook.site/...",
      "messageStatusCallbackUrl": "https://webhook.site/...",
      "receivedAndDeliveryCallbackUrl": "https://webhook.site/...",
      "presenceChatCallbackUrl": "https://webhook.site/...",
      "connectedCallbackUrl": "https://webhook.site/...",
      "receivedStatusCallbackUrl": "https://webhook.site/...",
      "phoneConnected": false,
      "whatsappConnected": false,
      "middleware": "web",
      "name": "Minha Instância",
      "id": "3C3F8E5F4A2B1C9D"
    }
  ]
}
```

### Fields in the Response

#### Pagination and Totals

| Field | Type | Description |
|-------|------|------------|
| `total` | number | Total instances found |
| `totalPage` | number | Total available pages |
| `pageSize` | number | Number of results per page |
| `page` | number | Current page |
| `content` | array | List of instances on the current page |

#### Object `content` (Instance)

| Field | Type | Description |
|-------|------|------------|
| `id` | string | Unique instance ID |
| `name` | string | Instance name |
| `token` | string | Instance security token |
| `middleware` | string | Instance type (`web` or `mobile`) |
| `created` | string | Creation date |
| `due` | number | Timestamp of expiration date |
| `paymentStatus` | string | Payment status |
| `phoneConnected` | boolean | Indicates if the phone is connected |
| `whatsappConnected` | boolean | Indicates if WhatsApp session is connected |
| `tenant` | string | Tenant identifier |
| `*CallbackUrl` | string | Configured callback URLs (webhook) |

### Common Errors

| Code | Reason | How to Resolve |
|------|--------|---------------|
| 401 | Invalid token | Check the header `Client-Token` |
| 400 | Invalid parameters | Check query parameters |
| 429 | Rate limit | Wait and try again |
| 5xx | Internal error | Try again; open support if persists |