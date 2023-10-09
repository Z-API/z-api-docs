---
id: send-button-actions
title: Send text with action buttons
---

## Method

#### /send-button-actions

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-button-actions

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

:::danger Attention
Button shipments are currently unavailable. For more details, please access the topic [Button Functionality](https://developer.z-api.io/en/tips/button-status)
:::

## Concept

In this method, you will be able to send text messages with action buttons. You can redirect to links, make calls, and also provide standard responses

---

## Attributes

### Required

| Attributes   | Type   | Description |
| :-------     | :-:    | :-------    |
| phone        | string | Recipient (or group ID in case you want to send it to a group) telephone number in the format DDI DDD NUMERS Ex: 551199999999. IMPORTANT  only send numbers without formatting or a mask |
| message       | string | Text to be sent|
| buttonActions | buttonActions | Type button object |

### button Actions

| Attributes   | Type   | Description |
| :-------- | :----: | :---------------------------- |
| type      | string | Types of buttons to be sent (CALL, URL, REPLY) |
| phone     | string | Number assigned to the button if it is of type CALL |
| url       | string | Link assigned to the button if it is of type URL.   |
| label     | string | Text for the button |

:::tip Dica:
The WhatsApp has a specific link for copying texts. By using this link in the 'url' attribute, your button becomes a copy button (https://www.whatsapp.com/otp/copy/yourtext)
:::

### Optional buttons

| Attributes| Type   | Description |
| :-------- | :----: | :---------------------       |
| id        | string | Button identifier            |
| title     | string | If you want to send a title  |
| footer    | string | If you want to send a footer |

### Optional
| Attributes   | Type   | Description |
| :---------   | :----: | :--------   |
| delayMessage | number | In this attribute a delay is added to the message. You can decide between a range of 1 - 15 secs (this is for how many seconds it will wait to send the next message EX: “delayMessage”:5,). The default delay is between 1 - 3 secs |

---

## Request Body

```json
{
    "phone": "551199999999",
    "message": "A message",
    "title": "If you want to link a title",
    "footer": "If you want to link a top footer",
    "buttonActions": [
        {
            "id": "1",
            "type": "CALL",
            "phone": "554498398733",
            "label": "Contact us"
        },
        {
            "id": "2",
            "type": "URL",
            "url": "https://z-api.io",
            "label": "Visit our website"
        },
        {
            "id": "3",
            "type": "REPLY",
            "label": "Speak to an agent"
        }
    ]
}
```

---

## Response

### 200

| Attributes| Type   | Description    |
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-button-actions.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>


