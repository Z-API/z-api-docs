---
id: tags
title: Search for labels.
---

## Method

#### /tags

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/tags

---

## Concept

In this method, you retrieve all your registered labels in your WhatsApp Business.

:::important Importante
This method is only available for devices connected to the Multi-Devices version of WhatsApp.
:::

## Response

### 200

| Attributes | Type    | Description            |
| :--------- | :------ | :--------------------  |
|  id        | string  | Label ID               |
| name       | string  | Label Name             |
| color      | string  | Label Color Identifier |


Exemplo

```json
[
    {
        "id": "1",
        "name": "New customer",
        "color": 1
    },
    {
        "id": "2",
        "name": "New order",
        "color": 2
    },
    {
        "id": "3",
        "name": "Payment pending",
        "color": 0
    },
    {
        "id": "4",
        "name": "Paid",
        "color": 3
    },
    {
        "id": "5",
        "name": "Order completed",
        "color": 5
    }
]
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a PUT or POST as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---
