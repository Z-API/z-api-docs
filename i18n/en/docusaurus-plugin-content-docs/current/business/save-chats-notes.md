---
id: chats-notes  
title: Assign Notes to a Chat  
---

## Method

#### /chats/{phone}/notes

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/chats/{phone}/notes

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method allows you to assign notes to a chat in WhatsApp Business.

:::important Important
This method is only available for devices connected to the Multi-Device version of WhatsApp.
:::

## Attributes

### Required

| Attributes |  Type  | Description          |
| :--------- | :----: | :------------------- |
| notes      | string | Text of the note     |

## Request Body

```json
{
  "notes": "note"
}
```

## Response

### 200

| Attributes | Type    | Description                                           |
| :--------- | :------ | :---------------------------------------------------- |
| success    | boolean | true if successful, false if failed                   |

Example

```json
{
  "success": true
}
```

### 405

In this case, ensure that you are correctly following the method specification, i.e., check if you are sending a POST or PUT request as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" header in your request, which is usually "application/json" for most objects you are sending.

---