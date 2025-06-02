---
id: update-notify-sent-by-me
title: Update notify sent by me
---

## Concept

This endpoint serves for you to activate the option of receiving messages sent by you through the webhook.

:::caution Caution

In order for it to work you will need to have a webhook for the event [Upon receiving](./on-message-received.md) configured.

:::

---

## Updating the webhook

### API

#### /update-notify-sent-by-me

`PUT` <https://api.z-api.io/instances/{id}/token/{token}/update-notify-sent-by-me>

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

### Request Body

#### Required

| Atributos               |  Tipo  | Descrição                      |
| :--------               | :----: | :----------------------------- |
| notifySentByMe | boolean | Activate webhook for messages received and sent by me |

```json
{
  "notifySentByMe": true
}
```

## Endpoint's return

### 200

```json
{
    "value": boolean
}
```