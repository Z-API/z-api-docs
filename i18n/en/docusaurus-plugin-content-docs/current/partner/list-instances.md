---
id: list-instances
title: Listing instances 
---

## Method 

#### /instances

`GET` <https://api.z-api.io/instances>

---

## Concept

This method is used to list every instance created 

---

## Attributes
### Required 

| Attributes| Type | Description |
| :-- | :-: | :-- |
| page | integer | Used for pagination, you must inform here the page of chats you want to search |
| pageSize | integer | Specifies the size of the return chats per page|

### Optionals

| Attributes|  Type  | Description                         |
| :-------- | :----: | :--------------------------------   |
| query     | number | Search by instance name and id      |

---

## Request Body

**Method**

`GET` <https://api.z-api.io/instances/>

**Example**

#### Query params

| key      |    value     | description |
| :------- | :----------: | :---------- |
| query    | 999999999999 |             |
| pageSize |      1       |             |
| page     |      1       |             |

---

## Response

### 201

| Attributes| Type      | Description                   |
| :-------- | :-------- | :---------------------------- |
| id        | string    | Created instance’s ID         |
| token     | string    | TOKEN of the created instance |
| due       | timestamp | Instance expiration date      |

**Example**

```json
{
  "total": 1,
  "totalPage": 1,
  "pageSize": 1,
  "page": 1,
  "content": [
    {
      "token": "",
      "tenant": "",
      "created": "",
      "due": 1648565999675,
      "paymentStatus": "",
      "deliveryCallbackUrl": "",
      "receivedCallbackUrl": "",
      "disconnectedCallbackUrl": "",
      "messageStatusCallbackUrl": "",
      "receivedAndDeliveryCallbackUrl": "",
      "presenceChatCallbackUrl": "",
      "connectedCallbackUrl": "",
      "receivedStatusCallbackUrl": "",
      "phoneConnected": false,
      "whatsappConnected": false,
      "name": "",
      "id": ""
    }
  ]
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Webhook Response

Link to webhook response (on receipt)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/list-instances.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
