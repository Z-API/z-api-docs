---
id: conversation
title: Chat with Meta AI
---

## Método

`/send-text`

`POST` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-text
#### Header
|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

## Concept

This method allows direct interaction with Meta AI on WhatsApp through the Z-API, facilitating the sending of text messages to obtain automated and contextual responses. With it, you can send questions and commands to Meta AI in private conversations by directing messages to the exclusive number 13135550002, or include the AI in groups by using the group ID as the recipient.

## How to Use

To start using Meta AI with the Z-API, simply send a text message to the Meta AI number *`13135550002`* using the endpoint.[`/send-text`](../message/send-message-text)

:::warning Atenção
Currently, Meta AI on the Z-API only supports text messages. This means that audio, documents, images, and other multimedia files are not compatible with this integration. Therefore, it is necessary to send only text messages to ensure proper functionality.

Furthermore, this feature is only available for personal WhatsApp accounts, meaning it is not accessible for business accounts.
:::

## Attributes

### Required

| Attributes | Type   | Description |
| :------    | :----: | :------     |
| phone      | string | For private chat with the AI, use **13135550002**; for group, use the group ID. |
| message    | string | Text to be sent |

### Optional

| Attributes     | Type   | Description |
| :---------     | :----: | :--------  |
| delayMessage   | number | This attribute adds a delay to the message. You can choose a range of 1-15 seconds, indicating how many seconds it will wait before sending the next message. (Ex.: "delayMessage": 5). The default delay, if not specified, is 1-3 seconds. |
| delayTyping    | number | This attribute adds a delay to the message. You can choose a range of 1-15 seconds, indicating how many seconds it will display the "Typing..." status. (Ex.: "delayTyping": 5). The default delay, if not specified, is 0. |
| mentioned      | array  | You need to pass the number 13135550002 if you wish to activate Meta AI in a group. |

## Request Body

### Chat in Private

```json
{
  "phone": "13135550002",
  "message": "Hello, Meta AI! I would like to know about..."
}
```

### Chat in Groups

```json
{
  "phone": "5511999999999-group",
  "message": "@13135550002 Hello, Meta AI! I would like to know about...",
  "mentioned": [13135550002]
}
```
---


## Response

### 200

| Attributes | Type   | Description      |
| :--------  | :----- | :-------------   |
| zaapId     | string | ID in Z-API      |
| messageId  | string | ID in WhatsApp   |
| id         | string | Added for compatibility with Zapier, it has the same value as messageId |

Example

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### 405

In this case, make sure you are sending the method specification correctly, meaning check if you sent POST or GET as specified at the beginning of this topic.

### 415

If you receive a 415 error, ensure you add the "Content-Type" of the object you are sending in the request headers, which is mostly "application/json".

## Webhook Response

Link to the webhook response (upon receiving)

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-texto)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-text.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>