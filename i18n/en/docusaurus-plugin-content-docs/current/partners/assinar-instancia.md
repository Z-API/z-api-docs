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

The accepted fields (such as instance identifier, plan, billing cycle) must follow exactly the schema described on this page. See the section [**Partners API**](/docs/partners/assinar-instancia) for details.

## Response

The response confirms the activation of the subscription for the instance and returns the updated data (plan, status, start dates/fim, etc.). Refer to this documentation for the full format and usage examples.