---
id: business-hours
title: Change Business Hours
---

## Method

#### /business/hours

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/hours

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

Through this method, it is possible to change the operating hours of the company.

:::important Important
This method is only available for Business WhatsApp accounts.
:::

---

## Attributes

### Required

| Attributes   |  Type     | Description                |
| :---------- | :-----:   | :--------------------------- |
| timezone    | string    | Timezone location           |

### Optional

| Attributes   |  Type     | Description                                     |
| :---------- | :-----:   | :--------------------------------------------- |
| mode        | string    | Operating mode (specificHours, open24h, appointmentOnly) |
| days        | array object  | Days of the week when the company operates |

Object (days)

| Attributes   |  Type     | Description                                      |
| :---------- | :-----:   | :------------------------------------------------ |
| dayOfWeek   | string    | Day of the week (SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY) |
| openTime    | string    | Opening time (hh:mm format)                       |
| closeTime   | string    | Closing time (hh:mm format)                       |

## Request Body

```json
{
  "timezone": "America/Sao_Paulo",
  "days": [
    {
      "dayOfWeek": "MONDAY",
      "openTime": "08:00",
      "closeTime": "12:00"
    },
    {
      "dayOfWeek": "MONDAY",
      "openTime": "14:00",
      "closeTime": "18:00"
    }
  ],
  "mode": "specificHours"
}
```

:::tip Tip
To set all days as "closed," simply send the "days" attribute as empty.
:::

---

## Response

### 201

| Attributes | Type    | Description                                  |
| :-------- | :------ | :------------------------------------------- |
| success   | boolean | true if successful, false in case of failure |

Example

```json
{
  "success": true
}
```

### 405

In this case, ensure that you are sending the method specification correctly, i.e., check if you sent the POST or PUT as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers, in most cases, it should be "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/business-hours.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
