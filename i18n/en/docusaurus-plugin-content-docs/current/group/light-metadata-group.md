---
id: light-group-metadata

title: Group Metadata (light)
---

## Method  

#### /light-group-metadata  

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/light-group-metadata/{phone}  

### Header  

|      Key       |            Value            |  
| :------------: |     :-----------------:     |  
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |  

---

## Concept  

This method returns the group metadata with all group information and its participants, except for the group invite link.  

The only difference between this method and [Group Metadata](./metadata-group.md) is that this one does not return the group invite link, as retrieving this link can sometimes be costly and slightly time-consuming. Knowing this, we provide a "light" way to obtain group metadata.

If you want to use this method and later need the group invite link, you can get it from the API [Get group invitation link](./get-invitation-link.md).

---

## Attributes  

### Required  

| Attributes |  Type  | Description        |  
| :-------- | :----: | :--------------- |  
| groupId   | string | Group ID/Phone   |  

### Optional  

| Attributes | Type | Description |  
| :-------- | :--: | :-------- |  

---

## Request Params  

#### URL  

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/light-group-metadata/{phone}  

---

## Response  

### 200  

| Attributes            | Type         | Description                             |  
| :-------------------- | :---------- | :-------------------------------------- |  
| phone                | string       | Group ID/Phone                          |  
| description          | string       | Group description                        |  
| owner                | string       | Group creator's phone number            |  
| subject              | string       | Group name                               |  
| creation             | timestamp    | Timestamp of group creation date        |  
| communityId          | string       | Community ID                            |  
| adminOnlyMessage     | boolean      | Indicates if only Admins can send messages |  
| adminOnlySettings    | boolean      | Indicates if only Admins can change settings |  
| requireAdminApproval | boolean      | Indicates if admin approval is required to join the group |  
| isGroupAnnouncement  | boolean      | Indicates if it is an announcement group |  
| participants         | array string | List of participants                    |  

Array String (participants)  

| Attributes   | Type   | Description                                         |  
| :----------- | :----- | :------------------------------------------------ |  
| phone        | string | Participant's phone number                         |  
| isAdmin      | string | Indicates if the participant is a group admin      |  
| isSuperAdmin | string | Indicates if the participant is the group creator  |  

<!-- | short        | string | Participant's short name                        |  
| name         | string | Participant's full name                           | -->

**Example**  

```json  
{
  "phone": "120363019502650977-group",
  "description": "Z-API Group",
  "owner": "5511999999999",
  "subject": "My group on Z-API",
  "creation": 1588721491000,
  "invitationLink": null,
  "communityId": null,
  "adminOnlyMessage": false,
  "adminOnlySettings": false,
  "requireAdminApproval": false,
  "isGroupAnnouncement": false,
  "participants": [
    {
      "phone": "5511888888888",
      "isAdmin": false,
      "isSuperAdmin": false
    },
    {
      "phone": "5511777777777",
      "isAdmin": true,
      "isSuperAdmin": false,
      "short": "ZAPIs",
      "name": "ZAPIs Boys"
    }
  ],
  "subjectTime": 1617805323000,
  "subjectOwner": "554497050785"
}
```

### 405  

In this case, ensure that you are correctly following the method specification, i.e., check if you are sending a POST or GET request as specified at the beginning of this topic.  

### 415  

If you receive a 415 error, make sure to add the correct "Content-Type" header in the request. In most cases, it should be `"application/json"`.  

---

## Code  

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-light-group-metadata.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
