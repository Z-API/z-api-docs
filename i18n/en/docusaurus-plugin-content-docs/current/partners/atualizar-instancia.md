---
id: atualizar-instancia
title: Updating an instance's subscription
---

## Endpoint

- **Method**: `PUT`
- **URL**: `https://api.z-api.io/instances/{id}/token/{token}/integrator/on-demand/subscription/update`

## Concept

Method used to update an existing instance subscription to the model with voice call support.

## Attributes

### Required

| Attributes | Type    | Description                                                           |
| :--------- | :-----: | :-------------------------------------------------------------------- |
| withCalls  | boolean | Must be sent as "true" to enable voice calls on the instance          |

:::caution Warning

The **withCalls** attribute is required and only accepts the value **true**.
It is not possible to downgrade the subscription (remove calls). If you want to return to the model without calls, you must cancel the current subscription and create a new one.
This feature is only available for accounts with calls functionality enabled.

:::

## Request Params

**Method**

`PUT` https://api.z-api.io/instances/{id}/token/{token}/integrator/on-demand/subscription/update

## Request Body

```json
{
  "withCalls": true
}
```

### Response

### 201 

OK

### 405

In this case, make sure you are sending the request using the correct method, as specified at the beginning of this topic (POST, GET, or PUT).

### 415

If you receive a 415 error, make sure to include the correct Content-Type header in your request, usually application/json.

---