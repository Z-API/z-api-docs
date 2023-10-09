---
id: community-metadata
title: Community Metadata
---

## Método

#### /communities-metadata/{communityId}

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/communities-metadata/{communityId}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method returns the metadata of the community, such as its name, description, and the groups linked to it.

---

## Attributes

### Mandatory

| Attribute | Type | Description |
| :-------- | :--: | :-------- |

### Optional

| Attribute | Type | Description |
| :-------- | :--: | :-------- |

---

## Request Params

#### URL

`GET` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/communities-metadata/{communityId}

---

## Response

### 200

| Attributes   | Type           | Description            |
| :---------- | :-------------  | :--------------------  |
| name        | string          | Name of the community  |
| id          | string          | ID of the community    |
| description | string          | Community description  |
| subGroups   | array subgroup  | List of linked groups  |

Array (subGroups)

| Attributes          | Type    | Description                               |
| :------------------ | :------ | :---------------------------------------  |
| name                | string  | Subgroup name                             |
| phone               | string  | Subgroup phone number                     |
| isGroupAnnouncement | boolean | Indicates whether it is an announcement group or regular group |

---

**Example**

```json
{
  "name": "My First Community",
  "id": "98372465382764532938",
  "description": "A community description",
  "subGroups": [
    {
      "name": "My First Community",
      "phone": "342532456234453-group",
      "isGroupAnnouncement": true
    },
    {
      "name": "Another group",
      "phone": "1203634230225498-group",
      "isGroupAnnouncement": false
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/community-metadata.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
