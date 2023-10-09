---
id: create-community
title: Create community
---

## Method

#### /create-group

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/communities

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

Before using this feature, it's important to check if the WhatsApp application on your mobile phone already supports communities. If it's available, you can use this API to create new communities.

## Attributes

### Required

| Attribute |  Type  | Description                            |
| :-------- | :----: | :------------------------------------- |
| name      | string | Name of the community you want to create |

### Optional

| Attribute   |  Type  | Description           |
| :---------- | :----: | :---------------------- |
| description | string | Description of the community |

## Request Body

**Method**

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/communities

**Example**

```json
{
  "name": "My first community"
}
```

## Response

### 200

| Attribute | Type            | Description              |
| :-------- | :-------------- | :------------------------- |
| id        | string          | ID of the created community |
| subGroups | array[subgroup] | List of linked groups     |

Exemplo

```json
{
  "id": "98372465382764532938",
  "subGroups": [
    {
      "name": "My first community",
      "phone": "342532456234453-group",
      "isGroupAnnouncement": true
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/create-community.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
