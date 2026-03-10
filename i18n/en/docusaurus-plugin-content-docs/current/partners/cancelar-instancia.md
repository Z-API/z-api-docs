---
id: cancelar-instancia
sidebar_position: 3
title: Cancel instance
---

# Cancelar instância

Cancel the subscription of a managed instance via Partner API.

:::warning Attention
Once you subscribe to an instance, it will remain available for use for 30 days even if you cancel it before this period ends. For example, if you cancel today but its expiration is in 10 days, it will remain available for another 30 days until the cancellation process is complete.
:::

## Endpoint

- **Method**: `POST`
- **URL**: `https://api.z-api.io/instances/{id}/token/{token}/integrator/on-demand/cancel`

> **Status:** The instance cancellation endpoint is available in production and uses the **POST** method (not `DELETE`).

## Request Body

The request body should identify the instance whose subscription will be canceled (for example, via `instanceId`). See the [**Partners API**](/docs/partners/cancelar-instancia) section for the full schema.

## Response

The response indicates whether the subscription cancellation was successful and returns the updated instance data. Refer to this documentation for field details and examples.