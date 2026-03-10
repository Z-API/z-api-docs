---
id: criar-comunidade
title: Create community
---

## Method

### /communities

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities
```

### Header

| Key           | Value                                    |
| :------------ | :--------------------------------------- |
| Client-Token  | **[ID and Token](../security/id-e-token)** |

---

## Concept

Before using this feature, it is important to check if the WhatsApp app on your mobile already has compatibility with communities. If it is available, you can use this API to create new communities.

## Attributes

### Required

| Attributes | Type  | Description                           |
| :-------- | :----: | :---------------------------------- |
| name      | string | Name of the community you want to create |

### Optional

| Attributes   | Type  | Description               |
| :---------- | :----: | :---------------------- |
| description | string | Description of the community |

## Request Body

**Method**

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities
```

**Example**

```json
{
  "name": "Minha primeira Comunidade"
}
```

## Response

### 200

| Attributes | Type            | Description                  |
| :-------- | :-------------- | :------------------------- |
| id        | string          | ID of the created community    |
| subGroups | array[subgroup] | List of linked groups |

Example

```json
{
  "id": "98372465382764532938",
  "subGroups": [
    {
      "name": "Minha primeira Comunidade",
      "phone": "342532456234453-group",
      "isGroupAnnouncement": true
    }
  ]
}
```

### 405

In this case, ensure that you are sending the method specification correctly. That is, verify if you sent POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add "Content-Type" in the request headers for the object you are sending. In most cases, it will be "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/create-community.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>