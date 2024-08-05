---
id: community-settings
title: Community settings
---

## Method

#### /communities/settings

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/communities/settings

### Header

|     Key      |                         Value                          |
| :----------: | :----------------------------------------------------: |
| Client-Token | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

With this API, you can change the settings of a community.

## Attributes

### Required

| Attributes | Type | Description |
| :-- | :-: | :-- |
| communityId | string | ID of the community whose settings will be changed |
| whoCanAddNewGroups | string ("admins" or "all") | Configuration for who can add new groups to this community. Only admins or everyone |

## Request Body

#### URL

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/communities/settings

#### Body

```json
{
  "communityId": "98372465382764532938",
  "whoCanAddNewGroups": "admins" | "all"
}
```

---

## Response

### 200

| Attributes | Type    | Description                         |
| :--------- | :------ | :---------------------------------- |
| success    | boolean | true if successful, false if failed |

**Example**

```json
{
  "success": true
}
```

### 405

In this case, ensure that you are correctly sending the method specification, i.e., verify if you sent POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, ensure to add the "Content-Type" header to the request object you are sending, which in most cases is "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/community-settings.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
