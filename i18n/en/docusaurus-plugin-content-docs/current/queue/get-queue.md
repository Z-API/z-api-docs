---
id: get-queue
title: Queue (Deprecated)
---

:::danger Deprecated endpoint

This endpoint is **deprecated**, as the pagination model has been updated to a **cursor-based approach (pagingState)**.
**Scheduled deprecation:** This endpoint will be discontinued on **04/30**.
We strongly recommend migrating all integrations to the new endpoint [**POST /queue**](./post-queue), which uses the updated pagination model.

:::

## Method

#### /queue

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/queue

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method returns all messages currently in the queue waiting to be processed.

---

## Attributes

### Required

| Attributes | Type    | Description |
| :--------- | :---:   | :---------- |
| page       | integer | **No longer has any effect** |
| pageSize   | integer | Defines the number of messages returned per page |

### Optional

| Attributes | Type   | Description |
| :--------- | :--:   | :---------- |
| count      | string | Used to return the number of messages in the queue |

---

## Request Params

#### Example URL

Method

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/queue?page=1&pageSize=100

or

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/queue/count

---

## Response

### 200

| Attributes | Type         | Description                     |
| :--------- | :----------- | :------------------------------ |
| messages   | array string | Array containing queue messages |

Messages Array

| Attributes   | Type     | Description |
| :----------- | :------- | :---------- |
| _id          | string   | Message ID in Z-API |
| DelayMessage | string   | Delay in seconds between message sends |
| Message      | string   | Message text |
| IsTrial      | boolean  | Indicates if the instance is using trial mode |
| InstanceId   | string   | Instance ID |
| Phone        | string   | Recipient phone number |
| ZaapId       | string   | Message ID in Z-API |
| DelayTyping  | string   | Duration of the "typing..." indicator |
| MessageId    | string   | Message ID |
| Created      | timestamp | Message timestamp |

Example

```json
{
  [
    {
      "_id": "39BB1684570F00E91090F6BBC7EE7646",
      "DelayMessage": -1,
      "Message": "Queue message 1",
      "IsTrial": false,
      "InstanceId": "3A5D07856DC26A1C9E2E08E691E63271",
      "Phone": "5511999999999",
      "ZaapId": "39BB1684570F00E91090F6BBC7EE7646",
      "DelayTyping": 0,
      "MessageId": "7AD29EAA5EF34C301F0B",
      "Created": 1624977905648
    },
    {
      "_id": "39BB1684570F00E91090F6BBC7EE7646",
      "DelayMessage": -1,
      "Message": "Queue message 2",
      "IsTrial": false,
      "InstanceId": "3A5D07856DC26A1C9E2E08E691E63271",
      "Phone": "5511999999999",
      "ZaapId": "39BB1684570F00E91090F6BBC7EE7646",
      "DelayTyping": 5,
      "MessageId": "7AD29EAA5EF34C301F0B",
      "Created": 1624977906907
    }
  ]
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-queue.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
