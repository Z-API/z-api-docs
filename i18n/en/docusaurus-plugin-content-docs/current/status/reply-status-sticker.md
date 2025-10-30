---
id: reply-status-sticker  
title: Respond to Status with Sticker  
---

## Method

#### /reply-status-sticker

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/reply-status-sticker

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

Method responsible for sending a sticker response to a status.

---

## Attributes

### Required

| Attribute     |  Type  | Description                        |
| :------------ | :----: | :--------------------------------- |
| phone         | String | Phone number of the person who sent the status |
| sticker       | String | Link to the sticker or its Base64 |
| statusMessageId | String | Status message ID. It can be obtained from the received message webhook -> [webhook](../webhooks/on-message-received) |

---

## Request Body

#### URL

Method

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/reply-status-sticker

#### Body

```json
{
  "phone": "5544999999999",
  "sticker": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg",
  "statusMessageId": "1F606398F2ECAA4846269F659B6003A9"
}
```

---

## Response

### 200

| Attribute  |  Type   | Description                     |
| :--------- | :-----  | :------------------------------ |
| zaapId     | string  | id in z-api                      |
| messageId  | string  | id in WhatsApp                   |
| id         | string  | Added for compatibility with Zapier, it has the same value as messageId |

Example

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### 405

In this case, ensure you are sending the method specification correctly. Check if you sent POST or GET as specified at the beginning of this topic.

### 415

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/reply-status-sticker.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
