---
id: search-newsletter
title: Search Newsletters
---

## Method

#### /search-newsletter

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/search-newsletter

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method returns a list of newsletter data based on the search performed using filters provided in the request body.

---

## Attributes

### Required

| Attributes   |  Type  | Description                            |
| :---------  | :----: | :----------------------------------- |
| limit       | number | Limit of records to be listed        |
| filters     | object | Object with filters to be applied    |

Object (filters)

| Attributes     |  Type        | Description                                   |
| :---------    | :----------: | :-------------------------------------------- |
| countryCodes  | array string | Array with country codes (https://www.iban.com/country-codes) |

### Optional

| Attributes    |  Type        | Description                    |
| :----------- | :----------: | :---------------------------   |
| view         | string       | View filter (RECOMMENDED, TRENDING, POPULAR, NEW) |
| searchText   | string       | Text filtering                |

---

## Request Body

#### URL

Method

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/search-newsletter

#### Body

```json
  {
    "limit": 50,
    "view": "TRENDING",
    "filters": { 
      "countryCodes": ["BR", "AF", "CA"]
    },
    "searchText": "Z-API"
  }
```

---

## Response

### 200

| Attributes          | Type        | Description                    |
| :----------------- | :---------- | :---------------------------   |
| id                 | string      | Newsletter ID                     |
| name               | string      | Newsletter name                   |
| description        | string      | Newsletter description            |
| subscribersCount   | string      | Number of newsletter followers    |
| picture            | string      | Newsletter's image URL            |


**Example**

```json
  {
    "cursor": null,
    "data": [
      {
        "id": "999999999999999999@newsletter",
        "name": "Z-API",
        "description": "Official Z-API Newsletter",
        "subscribersCount": "123",
        "picture": "https://mmg.whatsapp.net/v/t61.24694-24/345237462_968463277797373_5339431038113115975_n.jpg?stp=dst-jpg_s192x192&ccb=11-4&oh=01_AdTMyhA5kdwCdSqV0v784czJ1dHP_nkNhJ8TdgnANHro7Q&oe=651E6909&_nc_sid=000000&_nc_cat=109"
      },
      {
        "id": "999999999999999999@newsletter",
        "name": "Example Newsletter",
        "description": "Example",
        "subscribersCount": "0",
        "picture": null
      }
    ]
  }
```

:::tip Attribute "cursor" in the response object

The WhatsApp API provides the "limit" attribute to perform newsletter searches, which means there is pagination of results. However, the response does not indicate the "cursor" of the records. Therefore, for now, the "cursor" attribute will always be "null" until WhatsApp implements this functionality.

:::

### 405

In this case, ensure that you are correctly sending the method specification, i.e., check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" to the headers of the request for the object you are sending, mostly "application/json."

<!-- 
## Webhook Response

Link to the response of the webhook (upon receiving)

[Webhook](../webhooks/on-message-received#response) -->

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/search-newsletter.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>