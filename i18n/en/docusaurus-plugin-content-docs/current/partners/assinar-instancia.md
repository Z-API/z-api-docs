---
id: assinar-instancia
sidebar_position: 2
title: Sign instance
---

# Subscribe Instance

Activate the subscription of an instance created via Partner API.

## Endpoint

- **Method**: `POST`
- **URL**: `https://api.z-api.io/instances/{id}/token/{token}/integrator/on-demand/subscription`

> **Status:** the instance subscription route is in production and should be used as specified in this documentation.

## Request Body

### Optional Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `withCalls` | boolean | No | Defines whether the instance will be created with call support |

:::caution Attention

The **withCalls** attribute is optional. If not provided, the request will still work normally with the default behavior. This feature is only available for accounts that have calling functionality enabled.

:::

### Request Body Example

```json
{
    "withCalls": true
}
```

## Response

Returns a `200 OK` status code indicating that the request was successfully processed. No content is returned in the response body.