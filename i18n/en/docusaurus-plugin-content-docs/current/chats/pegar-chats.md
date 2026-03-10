---
id: pegar-chats
title: Get chats
---
## Method

### /chats

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats
```

### Header

| Key           | Value                                    |
| :------------ | :--------------------------------------- |
| Client-Token  | **[ID AND TOKEN](../security/id-e-token)** |

---

## Conceptualization

This method is responsible for returning all chats.

---

## Attributes

### Required

| Attributes | Type     | Description                                                                     |
| :-------- | :------- | :---------------------------------------------------------------------------- |
| page      | integer  | Used for pagination, you need to inform here the chat page you want to search |
| pageSize  | integer  | Specifies the size of the chat return per page                               |

### Optional

| Attributes | Type | Description |
| :-------- | :--- | :-------- |
|           |      |           |

---

## Request Params

### URL example

Method

```http
GET https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats
```

---

## Response

### 200

| Attributes            | Type          | Description                                                                     |
| :------------------- | :------------ | :---------------------------------------------------------------------------- |
| archived             | boolean       | true or false indicates if the chat is archived                               |
| pinned               | boolean       | true or false indicates if the chat is pinned                                 |
| phone                | string        | Phone of the contact                                                           |
| unread               | string        | indicates the number of unread messages in a chat                             |
| name                 | string        | **Name** assigned to the chat, remembering that if it's a group or broadcast list, it should return the respective IDs |
| lastMessageTime      | string        | Timestamp with the date and time of the last interaction with the chat         |
| muteEndTime          | string        | Timestamp with the date and time when the notification will be reactivated (-1 is for always) |
| isMuted              | string        | 0 or 1 indicates if you have muted this chat                                  |
| isMarkedSpam         | boolean       | true or false indicates if you marked this chat as spam                       |
| profileThumbnail     | string        | URL of the chat photo **WhatsApp deletes after 48h**                          |
| isGroupAnnouncement  | boolean       | true or false indicates if the chat is a group announcement                   |
| isGroup              | boolean       | true or false indicates if the chat is a group                                |
| notes                | object (Note) | Notes assigned to the chat **(only whatsapp business)**                       |
| messagesUnread       | integer       | **discontinued**                                                               |

Object (Note)

| Attributes     | Type   | Description                                    |
| :------------ | :----- | :------------------------------------------- |
| id            | string | Id of the note                               |
| content       | string | Note text                                   |
| createdAt     | number | Timestamp of the note creation               |
| lastUpdateAt  | number | Timestamp of the last update of the note      |

Example

```json
[
  {
    "archived": "false",
    "pinned": "true",
    "messagesUnread": 0,
    "phone": "5511999999999",
    "unread": "0",
    "name": "Z-API SUPORTE",
    "lastMessageTime": "1622991687",
    "isMuted": "0",
    "isMarkedSpam": "false",
    "isGroupAnnouncement": false,
    "isGroup": false,
  },
  {
    "archived": "false",
    "pinned": "true",
    "messagesUnread": 0,
    "phone": "5511999999999",
    "unread": "0",
    "name": "Z-api - Team",
    "lastMessageTime": "1622990503",
    "muteEndTime": 1655953774000,
    "isMuted": "0",
    "isMarkedSpam": "false",
    "isGroupAnnouncement": false,
    "isGroup": false,
    "notes": {
      "id": "KlesU6f4f/Qd5d6VuAbvOMi31rg/F92owVe/xDYad1C=",
      "content": "texto da anotação",
      "createdAt": 1655953774000,
      "lastUpdateAt": 1655953774000
    }
  }
]
```

### 405

In this case, make sure you are sending the correct method specification, that is, check if you sent POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add in the request headers the "Content-Type" of the object you are sending, mostly "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-chats.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>