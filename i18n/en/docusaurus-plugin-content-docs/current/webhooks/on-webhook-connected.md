---
id: on-webhook-connected
title: When connecting
---

## Concept

This is the mobile connection return webhook with Z-api

This webhook is triggered when the Z-API is connected to Whatsapp, this can happen when reading the qr-code, when restarting the instance, etc.

:::caution Attention

Z-API does not accept webhooks that aren’t HTTPS

:::

---

## Updating the Webhook

To update the webhook route, you can do it through the API or through the admin panel.

### API

#### /update-webhook-connected

`PUT` <https://api.z-api.io/instances/id/{id}/token/{token}/update-webhook-connected>

#### Request Body

```json
{
  "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/status"
}
```

---

<!-- ### Painel Administrativo -->

<!-- ![img](../../../../../img/status.png) -->

<!-- --- -->

---

## Webhook’s returns

The possible returns of the **on-webhook-connected** webhook are registered below:

## Response

| Attributes | Type | Description |
| :-- | :-: | :-- |
| connected | boolean | Instance status |
| phone | string | Number connected |
| momment | string | Time when the instance was disconnected from the number. |
| type | string | Instance event type, in this case it will be "ConnectedCallback". |

---

### 200

```json
{

  "type": 'ConnectedCallback',
  "connected": true,
  "momment": 26151515154,
  "instanceId": instance.id,
  "phone": "número",,
  "instanceId": "instance.id"

}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or PUT as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

<!--
## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/on-whatsapp-message-status-changes.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe> -->
