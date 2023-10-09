---
id: unlink-groups
title: Unlink groups
---

## Method

#### /communities/unlink

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/communities/unlink

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

With this API, you can remove groups from a community. To do this, you will need the ID of your community and the phone numbers of the groups you want to remove.

:::warning Attention

A community must have at least 1 group linked to it, not including the announcement group. So, if your community only has one common group linked, it will not be possible to remove it.

:::

## Attributes

### Mandatory

| Attributes | Type | Description |
| :-- | :-: | :-- |
| communityId | string | ID of the community from which groups will be unlinked |
| groupsPhones | array string | Array with the phone number(s) of the groups to be unlinked |

### Optional

| Attributes | Type | Description |
| :-------- | :--: | :-------- |

## Request Body

#### URL

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/communities/unlink

#### Body

```json
{
  "communityId": "98372465382764532938",
  "groupsPhones": ["1345353454354354-group"]
}
```

---

## Response

### 200

| Attribute | Type    | Description                                        |
| :-------- | :------ | :------------------------------------------------- |
| success   | boolean | true if successful, false in case of failure      |

**Exemplo**

```json
{
  "success": true
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/unlink-groups.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
