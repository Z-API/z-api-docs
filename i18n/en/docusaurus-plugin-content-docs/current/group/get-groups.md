---
id: get-groups
title: Fetch Groups
---

## Method  

#### /groups  

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/groups  

### Header  

|      Key       |            Value            |  
| :------------: |     :-----------------:     |  
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |  

---

## Concept  

This method is responsible for returning all groups.  

---

## Attributes  

### Required  

| Attributes |  Type   | Description  |  
| :-------- | :----: | :----------- |  
| page      | integer | Used for pagination; specify the page number of groups to fetch. |  
| pageSize  | integer | Specifies the number of groups returned per page. |  

### Optional  

| Attributes | Type | Description |  
| :-------- | :--: | :---------- |  
|           |      |             |  

---

## Request Params  

#### Example URL  

Method  

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/groups?page=1&pageSize=10

---

## Response  

### 200  

| Attributes        | Type    | Description  |  
| :--------------- | :------ | :----------- |  
| archived        | boolean | `true` or `false` indicating whether the chat is archived. |  
| pinned          | boolean | `true` or `false` indicating whether the chat is pinned. |  
| phone           | string  | Contact phone number. |  
| unread         | string  | Number of unread messages in a chat. |  
| name            | string  | **Name** assigned to the chat. If it is a group or broadcast list, it will return the respective IDs. |  
| lastMessageTime | string  | Timestamp of the last interaction with the chat. |  
| muteEndTime     | string  | Timestamp indicating when notifications will be reactivated (-1 means permanently muted). |  
| isMuted         | string  | `0` or `1` indicating whether this chat is muted. |  
| isMarkedSpam    | boolean | `true` or `false` indicating whether this chat was marked as spam. |  
| isGroup         | boolean | `true` or `false` indicating whether it is a group. |  
| messagesUnread  | integer | **Deprecated** |  

**Example**  

```json  
[
  {
    "isGroup": true,
    "name": "Test Group",
    "phone": "120263358412332916-group",
    "unread": "0",
    "lastMessageTime": "1730918668000",
    "isMuted": "0",
    "isMarkedSpam": "false",
    "archived": "false",
    "pinned": "false",
    "muteEndTime": null,
    "messagesUnread": "0"
  }
]
```

### 405  

In this case, ensure that you are correctly following the method specification, i.e., check if you are sending a POST or GET request as specified at the beginning of this topic.  

### 415  

If you receive a 415 error, make sure to add the correct "Content-Type" header in the request. In most cases, it should be `"application/json"`.  

---

## Code  

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-groups.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>  
