---
id: send-text-status
title: Sending text status 
---

## Method

#### /send-text-status

`POST` https://api.z-api.io/instances/YOUR_INSTANCIA/token/YOUR_TOKEN/send-text-status

---

## Concept

You can post texts in your status and this method is responsible for that, remember that statuses disappear after 24 hours.

---

## Attributes

### Mandatory 

| Attributes |  Type | Description                              |
| :-------- | :----: | :------------------------------------- |
| message   | String | Text to be sent to status  |

---

### Optionals 

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Body

#### URL

Method

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-text-status

#### Body

```json
{
  "message": "Your message status"
}
```

---

## Response

### 200

| Attributes | Type   | Description      |
| :-------- | :----- | :------------- |
| zaapId    | string | id on z-api    |
| messageId | string | id on whatsapp |

Example

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68"
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-text-status.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
