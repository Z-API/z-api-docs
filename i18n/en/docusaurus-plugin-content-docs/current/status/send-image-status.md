---
id: send-image-status
title: Sending image status 
---

## Method

#### /send-image-status

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-image-status

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

## Concept

Method responsible for sending an image to your status, remember that statuses disappear after 24 hours.

---

## Attributes

### Required

| Attributes |  Type | Description                    |
| :-------- | :----: | :--------------------------- |
| image     | String | Images link or Base64 |

### Opcionais

| Attributes | Type | Description |
| :-------- | :----: | :-------- |
| caption   | string | Caption that will be sent along with the image in the status |

---

## Request Body

#### URL

Method

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-image-status

#### Body

```json
{
  "image": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg"
}

{
  "image": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg",
  "caption": "Caption text"
}
```

:::tip Send base64 image

If you have doubts about how to send a Base64 image, access the "Send Image" message topic, there you will find everything you need to know about sending in this format.

:::

---

## Response

### 200

| Attributos| Type   | Description      |
| :-------- | :----- | :------------- |
| zaapId    | string | id on z-api    |
| messageId | string | id on whatsapp |

Exemplo

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68"
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-image-status.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
