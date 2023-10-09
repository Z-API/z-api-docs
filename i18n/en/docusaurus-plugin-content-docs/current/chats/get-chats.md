---
id: get-chats
title: Get chats
---

## Method

#### /chats

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/chats

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method is responsible for returning all of your chats

---

## Attributes

### Required

| Attributes | Type | Description |
| :-- | :-: | :-- |
| page | integer | Used for pagination, you must inform the page of chats you want to search. |
| pageSize | integer | Specifies the size of the return chats  per page |

### Opcionais

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL example

Method 

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/chats

---

## Response

### 200

| Attributes | Type | Description |
| :-- | :-- | :-- |
| name | string | **Name** assigned to the chat, remembering that if it is a group or a broadcast list, you must return the respective IDs |
| phone | string | Contact’s phone |
| unread | string | Indicates the number of messages that haven’t been read in a chat |
| lastMessageTime | string | Timestamp with date and time of your last interaction with that chat  |
| isMuted | string | 0 or 1 indicates if you have silenced or not a certain chat |
| isMarkedSpam | boolean | True or false indicates if you have marked a chat as spam |
| profileThumbnail | string | Chat photo URL that **Whatsapp deletes after 48h** |
| messagesUnread | integer | **discontinued** |

Example

```json
[
  {
    "name": "Z-API SUPORTE",
    "phone": "5511999999999",
    "unread": "0",
    "lastMessageTime": "1622991687",
    "isMuted": "0",
    "isMarkedSpam": "false",
    "profileThumbnail": null,
    "messagesUnread": 0
  },
  {
    "name": "Z-api - Team",
    "phone": "5511999999999",
    "unread": "0",
    "lastMessageTime": "1622990503",
    "isMuted": "0",
    "isMarkedSpam": "false",
    "profileThumbnail": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "messagesUnread": 0
  }
]
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-chats.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
