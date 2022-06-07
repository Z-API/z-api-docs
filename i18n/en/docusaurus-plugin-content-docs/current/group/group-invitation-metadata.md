---
id:id: group-invitation-metadata

title: Group Metadata by invite
---

## Method 

#### /group-invitation-metadata

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/group-invitation-metadata?url={ URL }

## Concept

This method returns the group metadata with all information about the group and its participants.

:::caution Attention 

On November 4, 2021 whatsapp changed the format of creating new groups. before: "phone": "5511999999999-1623281429" now: "phone": "120363019502650977-group"

:::

---

## Response

### 200

| Attributes   | Type         | Description                           |
| :----------- | :----------- | :------------------------------------ |
| phone        | string       | Group ID/phone                        |
| owner        | string       | Group creators number                 |
| subject      | string       | Group’s name                          |
| creation     | timestamp    | Group creation date timestamp         |  
| participants | array string | with participant data                 |

Array String (participants)

| Attributes   | Type   | Description                                      |
| :----------- | :----- | :------------------------------------------------ |
| phone        | string | Participants phone                                |
| isAdmin      | string | Indicates if the participant is the group’s admin |
| isSuperAdmin | string | Indicates whether you are the creator of the group|
| short        | string | Participant’s short name                          |
| name         | string | Participant’s name                                |


**Example **

```json

Old way -
  {
    "phone": "5511999999999-1623281429",
    "owner": "5511999999999",
    "subject": "My group on Whatsapp",
    "creation": 1588721491000,
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

  ------------------------------------

  New way -
  {
  "phone": "120363019502650977-group",
  "owner": "5511999999999",
  "subject": "My group on whatsapp",
  "creation": 1588721491000,
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

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-group-invitation-metadata.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
