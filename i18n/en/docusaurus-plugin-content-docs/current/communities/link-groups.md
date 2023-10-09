---
id: link-groups
title: Link groups
---

## Method

#### /communities/link

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/communities/link

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

With this API, you can add other groups to a community. To do this, you will need the ID of your community and the phone numbers of the groups you want to add.

:::warning Attention

It's important to remember that you cannot link the same group to more than one community. If you provide 3 groups to add, and one of them is already part of another community, 2 will be added, and the one already in another community will be indicated in the response.

:::

## Attributes

### Required

| Attribute | Type | Description |
| :-------- | :--: | :---------- |
| communityId | string | The ID of the community to which the groups will be added |
| groupsPhones | array of strings | An array with the phone number(s) of the groups to be linked |

### Optinal

| Attribute | Type | Description |
| :-------- | :--: | :-------- |

## Request Body

#### URL

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/communities/link

#### Body

```json
{
  "communityId": "98372465382764532938",
  "groupsPhones": ["1345353454354354-group", "1203634230225498-group"]
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/link-groups.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
