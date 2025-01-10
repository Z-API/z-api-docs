---
id: update-every-webhooks
title: Update every webhooks
---

## Concept

This endpoint is for you if you want to change all webhooks to the same URL at once.

:::caution Attention

Z-API does not accept webhooks that aren’t HTTPS

:::

---

## Updating Webhooks

### API

#### /update-every-webhooks

`PUT` <https://api.z-api.io/instances/{id}/token/{token}/update-every-webhooks>

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |
---

### Request Body

#### Required

| Atributos |  Tipo  | Descrição                      |
| :-------- | :----: | :----------------------------- |
| value      | string | Webhook endpoint |

#### Optionals

| Atributos               |  Tipo  | Descrição                      |
| :--------               | :----: | :----------------------------- |
| notifySentByMe | boolean | Activate webhook for messages received and sent by me |

```json
{
  "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/status",
  "notifySentByMe": true
}
```

---

## Endpoint's return

### 200

```json
{
  "value": boolean
}
```
