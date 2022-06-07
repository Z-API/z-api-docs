---
id: get-queue
title: Queue 
---

## Method

#### /queue

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/queue

## Concept

This method is responsible for returning all messages that are in your queue waiting to be processed. 

---

## Attributes 

### Mandatory 

| Attributes | Type | Descrition |
| :-------- | :--: | :-------- |
|           |      |           |

### Optionals 

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL example 

Method 

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/queue

---

## Response

### 200

| Attributes | Type         | Description                       |
| :-------- | :----------- | :------------------------------ |
| size      | string       | Number of messages in queue    |
| messages  | array string | Array with queue messages|

Messages Array 

| Attributes | Type     | Description                   |
| :-------- | :------- | :-------------------------- |
| size      | string   | Number of messages in queue |
| Message   | string   | Text message                |
| Phone     | string   | Recipients phone            |
| ZaapId    | string   | Z-API message ID            |
| Created   | timetamp | Messages date               |
| MessageId | string   | Message ID                  |

Example 

```json
{
  "size": 2,
  "messages": [
    {
      "Message": "Message queue 1",
      "Phone": "5511999999999",
      "ZaapId": "39BB1684570F00E91090F6BBC7EE7646",
      "Created": 1624977905648,
      "MessageId": "7AD29EAA5EF34C301F0B"
    },
    {
      "Message": "Message queue  2",
      "Phone": "5511999999999",
      "ZaapId": "39BB1685172AB008542A7E0B862A54DF",
      "Created": 1624977906907,
      "MessageId": "517AEF0FDE834DADJJFC8"
    }
  ]
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-queue.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
