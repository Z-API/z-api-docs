---
id: delete-queue-id
title: Deleting a text queue
---

## Method

#### /queue/{zaapid}

`DELETE` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/queue/{zaapid}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

This method is responsible for deleting a single message inside of the queue waiting to be processed 

---

## Attributes

### Required 

| Attributes| Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

### Optionals 

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL exemplo

Method

`DELETE` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/queue/{zaapid}

---

## Response

### 200

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/delete-queue-id.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
