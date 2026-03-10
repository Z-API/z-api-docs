---
id: enviar-texto-status
title: Sending status text
---
## Method

### /send-text-status

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text-status
```

### Header

| Key           | Value                                    |
| :------------ | :--------------------------------------- |
| Client-Token  | **[ID and Token](../security/id-e-token)** |

---

## Conception

You can post texts in your status, and this method is responsible for that. Remember that statuses disappear after 24 hours.

---

## Attributes

### Required

| Attributes | Type   | Description                              |
| :-------- | :----: | :------------------------------------- |
| message   | String | Message to be sent to your status |

---

### Optional

| Attributes | Type | Description |
| :-------- | :--: | :-------- |
|           |      |            |

---

## Request Body

### URL

```http
POST https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text-status
```

### Body

```json
{
  "message": "Sua mensagem para status"
}
```

---

## Response

### 200

| Attributes | Type   | Description      |
| :-------- | :----- | :------------- |
| zaapId    | string | id in z-api     |
| messageId | string | id in whatsapp  |

Example

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68"
}
```

### 405

In this case, make sure you are sending the method specification correctly. That is, verify if you sent POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, ensure that you add "Content-Type" in the request headers for the object you are sending. In most cases, it is "application/json".

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-text-status.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>