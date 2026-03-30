---
id: call-token
title: Generate Call Token
---

## Method

#### /call-token

`GET` https://api.z-api.io/instances/{id}/token/{token}/call-token

## Overview

This endpoint generates an ephemeral token for authenticating the Z-API call SDK.

The token is temporary and valid for a single connection only. If the application is restarted, a new token must be generated.

## SDK Integration

This endpoint is designed to be used with the official call SDK:  

https://www.npmjs.com/package/@z-api/call  

For a practical example of generating and using the token in a backend environment, see the "Node.js Backend Example" section in the SDK documentation.

:::caution Warning

This endpoint should be used in the **backend**, not in the frontend where the SDK is instantiated.  
Keeping the request in the backend prevents exposure of the client-token and avoids potential security risks or token leaks.

:::

## Request Params

**Method**

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/{YOUR_TOKEN}/call-token

## Request Body

This endpoint does not require a request body.

## Response

### 200

Returns an ephemeral token for SDK authentication.

| Attribute | Type   | Description                        |
| :-------- | :----: | :-------------------------------- |
| token     | string | Generated ephemeral token          |

**Example**

```json
{
  "token": "ek-gKrx0dpG27s1YyoU3i3AEwF1d0JiTcq1_GKc1TsyEmY"
}
```

### 405

Ensure that you are using the correct method (GET) as specified above.

### 415

If you receive a 415 error, make sure to include the correct Content-Type header, usually application/json.

---