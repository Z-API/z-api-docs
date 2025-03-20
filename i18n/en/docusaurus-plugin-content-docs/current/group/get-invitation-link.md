---
id: get-invitation-link  
title: Get Group Invitation Link  
---

## Method  

#### /group-invitation-link/{groupId}  

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/group-invitation-link/{groupId}  

### Header  

|      Key       |            Value            |  
| :------------: |     :-----------------:     |  
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |  

---

## Concept  

This method allows you to obtain a group's invitation link.  

---

## Attributes  

### Required  

| Attributes |  Type  | Description       |  
| :-------- | :----: | :-------------- |  
| groupId   | string | Group ID/Phone   |  

---

## Request URL  

#### URL  

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/group-invitation-link/120363019502650977-group  

---

## Response  

### 200  

| Attributes     | Type   | Description                         |  
| :------------ | :----- | :-------------------------------- |  
| invitationLink | string | New invitation link               |  

**Example**  

```json  
{
  "phone": "120363019502650977-group",
  "invitationLink": "https://chat.whatsapp.com/C1adgkdEGki7554BWDdMkd"
}
```

### 405  

In this case, ensure that you are correctly following the method specification, i.e., check if you are sending a POST or GET request as specified at the beginning of this topic.  

### 415  

If you receive a 415 error, make sure to add the correct "Content-Type" header in the request. In most cases, it should be `"application/json"`.  

---

## Webhook Response  

Link to the webhook response (upon receiving)  

[Webhook](../webhooks/on-message-received#response)  

---

## Code  

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/group-invitation-link.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
