---
id: profile
title: Get business account data
---

## Method

#### /business/profile

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/profile?phone={phone}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method is responsible of returning the contact's business acount data

---

## Attributes

### Required

| Attributes | Type | Description |
| :-- | :-: | :-- |
| phone | string | Business account's phone number in the format DDI DDD NUMERS Ex: 551199999999. **IMPORTANT**  only send numbers without formatting or a mask  |

### Optionals

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL example

Métodos

**Método**

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/business/profile?phone=5511999999999

#### Query params

| key         |    value     | description |
| :---------- | :----------: | :---------- |
| phone       |     5511999999999       | Business account's phone number in the format DDI DDD NUMERS Ex: 551199999999. **IMPORTANT**  only send numbers without formatting or a mask |

---

## Response

### 200

| Attributes | Type | Description |
| :--------------- | :----------- | :-------------------------------------- |
| description      | string       | Company's **description**               |
| address          | string       | Company's **address**                   |
| email            | string       | Company's **email**                     |
| websites         | array string | Company's webites                       |
| categories       | array string | Categories data                         |
| businessHours    | array string | Business hours data                     |
| hasCoverPhoto    | boolean      | If company has cover photo              |

Array String (categories)

| Attributes         | Type   | Description                                 |
| :----------------- | :----- | :------------------------------------------ |
| displayName        | string | Category name                               |
| label              | string | Category label                              |
| id                 | string | Category id                                 |

Array String (businessHours)

| Attributes       | Type         | Description                             |
| :--------------- | :-----       | :-------------------------------------- |
| timezones        | string       | Timezone                                |
| days             | array string | Operating data for the days             |
| mode             | string       | Operating type                          |

Array String (days)

| Attributes       | Type   | Description                                   |
| :--------------- | :----- | :-------------------------------------------- |
| dayOfWeek        | string | Day of the week                               |
| openTime         | string | Opening time                                  |
| closeTime        | string | Closing time                                  |

Example

```json
{
    "description": "Z API - Asas para sua imaginação",
    "address": "Maringá",
    "email": "zapi@example.com",
    "websites": [
        "https://www.z-api.io"
    ],
    "categories": [
        {
            "displayName": "Outras empresas",
            "label": "OTHER_COMPANIES",
            "id": "629412378414563"
        }
    ],
    "businessHours": {
        "timezone": "America/Sao_Paulo",
        "days": [
            {
                "dayOfWeek": "MONDAY",
                "openTime": "08:00",
                "closeTime": "18:00"
            },
            {
                "dayOfWeek": "TUESDAY",
                "openTime": "08:00",
                "closeTime": "18:00"
            },
            {
                "dayOfWeek": "WEDNESDAY",
                "openTime": "08:00",
                "closeTime": "18:00"
            },
            {
                "dayOfWeek": "THURSDAY",
                "openTime": "08:00",
                "closeTime": "18:00"
            },
            {
                "dayOfWeek": "FRIDAY",
                "openTime": "08:00",
                "closeTime": "18:00"
            }
        ],
        "mode": "specificHours"
    },
    "hasCoverPhoto": false
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.
### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---