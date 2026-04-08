---
id: post-queue
title: Queue
---

## Method

#### /queue

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/queue

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Overview

This method returns messages from the queue that are waiting to be processed.

---

## Body

### Optional

| Attributes   | Type    | Description |
| :----------- | :--:    | :---------- |
| pageSize     | integer | Number of messages returned per request. The default value is **20** |
| pagingState  | string  | Page cursor. If not provided, the first page will be returned |

---

## Request Body

### Example

**To fetch the first page:**

```json
{}
```

**To fetch the next page:**

```json
{
  "pageSize": 20,
  "pagingState": "eyJidWNrZXQiOjI5MzQsInBhZ2VTdGF0ZSI6IjAw..."
}
```

---

## Response

### 200

| Attributes  | Type    | Description |
| :---------- | :------ | :---------- |
| messages    | array   | List of queue messages |
| pagingState | string  | Cursor for the next page |
| hasMore     | boolean | Indicates if there are more pages available |

---

### Messages Array

| Attributes    | Type      | Description |
| :------------ | :-------- | :---------- |
| _id           | string    | Message ID in Z-API |
| DelayMessage  | integer   | Delay between messages (seconds) |
| Message       | string    | Message content |
| InstanceId    | string    | Instance ID |
| Phone         | string    | Recipient number or group |
| ZaapId        | string    | Message ID in Z-API |
| DelayTyping   | integer   | Typing indicator duration |
| MessageId     | string    | Message ID |
| Created       | timestamp | Message timestamp (epoch) |
| CreatedAt     | string    | Formatted message date |
| Beta          | boolean   | Indicates beta feature usage |
| IsTrial       | boolean   | Indicates if the instance is in trial mode |

---

## Example

```json
{
  "messages": [
    {
      "DelayMessage": -1,
      "Message": "Test message",
      "InstanceId": "3E98XXXXXXXXXXXXXXXXXXXF5DDF",
      "CreatedAt": "2026-03-31T14:40:31.776+00:00",
      "ZaapId": "019D44XXXXXXXXXXXXXXXXX68DA6",
      "DelayTyping": 0,
      "Created": 1774968031776,
      "Beta": false,
      "IsTrial": false,
      "Phone": "120XXXXXXXXXXX305-group",
      "_id": "019D44XXXXXXXXXXXXXXXXX68DA6",
      "MessageId": "ECFXXXXXXXXXXXXXX39"
    }
  ],
  "pagingState": "eyJi...",
  "hasMore": true
}
```

---

## Pagination

- If `pagingState` is not provided, the first page will be returned automatically
- If `pageSize` is not provided, the default value of **20 messages** will be used
- Use the returned `pagingState` to fetch the next pages
- When `hasMore` is `false`, there are no more messages available

---