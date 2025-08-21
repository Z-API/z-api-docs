---
id: update-community-description
title: Edit description 
---

## Method

#### /update-community-description

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-community-description

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method allows you to change your community's description

:::caution Attention

Attention only admins can change community preferences.

:::

---

## Attributes

### Required

| Attributes       |  Type  | Description                                    |
| :--------------- | :----: | :-----------------------------------------     |
| communityId      | string | Community ID.                                  |
| communityDescription | string | Attribute to edit the community’s description  |

---

#### Body

```json

  {
    "communityId": "120363019502650977",
    "communityDescription": "descrição da comunidade"
  }

```

---

## Response

### 200

| Attributes| Type    | Description                                           |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true if it worked and false if it failed |

**Example**

```json
{
  "value": true
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Webhook Response

Link to webhook response (on receipt)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-community-description.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
