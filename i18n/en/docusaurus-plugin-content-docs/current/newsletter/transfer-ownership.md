---
id: transfer-newsletter-ownership
title: Transfer Newsletter Ownership
---

## Method

#### /newsletter/transfer-ownership/{newsletterId}

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/newsletter/transfer-ownership/{newsletterId}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

## Concept

This method is responsible for transferring the ownership of a channel to another user, who is an administrator of that channel.

## Attributes

### Required

| Attributes | Type      | Description      |
| :-------- | :-------: | :------------- |
|  phone    |  string   | Phone number of the user who will be promoted to newsletter owner |

### Optional

| Attributes   | Type      | Description      |
| :---------- | :-------: | :------------- |
|  quitAdmin  |  boolean  | Defines whether you will cease to be an administrator of the channel after transferring ownership |

---

## Request Body

```json
{
  "phone": "5511999999999"
}
```

```json
{
  "phone": "5511999999999",
  "quitAdmin": true
}
```

---

## Response

### 200

| Attributes           | Type        | Description                                                    |
| :------------------  | :---------- | :----------------------------------------------------------- |
| value   | string     | Returns true if successful, false if failed  |
| message | string     | In case of error, may return a message with information about the error  |

**Example**

```json
  {
    "value": true
  }
```

### 405

In this case, make sure you are correctly sending the method specification, meaning check if you sent the POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, make sure to add the "Content-Type" of the object you are sending in the request headers, mostly "application/json".

---

## Webhook Response

Link to the webhook response (upon receiving)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/transfer-newsletter-ownership.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
