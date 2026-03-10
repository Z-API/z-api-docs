---
id:id: update-webhook-disconnected
title: Disconnected
---
## Method

#### /update-webhook-disconnected

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-webhook-disconnected

## Conception

The Z-API provides within the instance settings in the admin panel the ability to point webhooks so that it can notify you about interactions with your chats/contatos. This method is responsible for updating/adicionar this information via API, with it you can configure the webhooks without the need to access the Z-API admin.

:::caution Attention

The Z-API does not accept webhooks that are not HTTPS

:::

---

## Attributes

### Required

| Attributes | Type | Description                         |
| :-------- | :--: | :--------------------------------- |
| value     | string | Webhook/EndPoint of your application |

### Optional

| Attributes | Type | Description |
| :-------- | :--: | :--------- |

---

## Request Body

#### URL

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-webhook-disconnected

#### Body

```json
{
  "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/disconnected"
}
```

---

## Response

### 200

### 405

In this case, make sure you are sending the correct method specification, that is, verify if you sent POST or PUT as specified at the beginning of this topic.

### 415

If you receive a 415 error, ensure to add in the request headers the "Content-Type" of the object you are sending, in most cases "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-webhook-disconnected.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>