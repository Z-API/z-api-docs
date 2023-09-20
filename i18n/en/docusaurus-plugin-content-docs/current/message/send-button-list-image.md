---
id: send-button-list-image
title: Send buttons with images
---

## Method

#### /send-button-list

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-button-list

---

:::danger Attention
Button shipments are currently unavailable. For more details, please access the topic [Button Functionality](https://developer.z-api.io/en/tips/button-status)
:::


## Concept

In this method, you can send images with options for action buttons. The button content, for example, 'YES / NO,' can be chosen by the user and will be used as a response to the message sent along with the buttons.

![image](../../../../../img/send-button-list-image.jpeg)

---

## Attributes

### Required

| Attributes   | Type   | Description |
| :-------   | :-------:  | :------   |
| phone        | string | Recipient (or group ID in case you want to send it to a group) telephone number in the format DDI DDD NUMERS Ex: 551199999999. IMPORTANT  only send numbers without formatting or a mask |
| message       | string | Text to be sent|
| buttonList | buttonList | Type button object |

:::important

The 'message' attribute cannot be sent empty!

:::

### Optionals

| Attributes   | Type   | Description |
| :---------   | :----: | :-------- |
| delayMessage | number | In this attribute a delay is added to the message. You can decide between a range of 1 - 15 secs (this is for how many seconds it will wait to send the next message EX: “delayMessage”:5,). The default delay is between 1 - 3 secs.|


### Button List

| Attributes   | Type   | Description |
| :-------- | :----: | :-----------------------------------     |
| image     | string | URL or Base64 of the image to be sent    |
| buttons   | button | "List of buttons to be sent             |

### Button

| Attributes   | Type   | Description |
| :-------- | :----: | :----------------- |
| label     | string | Text for the button |

### Opcionais Button

| Attributes   | Type   | Description |
| :-------- | :----: | :---------------- |
| id        | string | Button identifier |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "message": "Z-API is good?",
  "buttonList": {
    "image": "https://avatars.githubusercontent.com/u/60630101?s=280&v=4",
    "buttons": [
      {
        "id": "1",
        "label": "Great"
      },
      {
        "id": "2",
        "label": "Excellent"
      }
    ]
  }
}
```

---

## Response

### 200

| Attributes   | Type   | Description |
| :-------- | :----- | :------------- |
| zaapId    | string | id on z-api    |
| messageId | string | id on whatsapp |
| id        | string | Added for compatibility with Zapier, it has the same value as the messageId |

Example

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

---

## Webhook Response

Link for webhooks response (upon receiving)

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-texto-lista-de-botão)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-button-list-image.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
