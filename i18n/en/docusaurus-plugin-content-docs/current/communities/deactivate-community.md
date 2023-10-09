---
id: deactivate-community
title: Deactivate Community
---

**Method**

#### /queue

`DELETE` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/communities/{communityId}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method is responsible for deactivating a community.

When a community is deactivated, it will result in the disconnection of all groups related to it. It is important to note that deactivating the Community will not delete its groups but will remove them from the Community in question.

---

## Attributes

### Mandatory

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |            |

### Optional

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |            |

---

## Request Params

#### Example URL

Method

`DELETE` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/communities/{CommunityID}

---

## Response

### 200

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/deactivate-community.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
