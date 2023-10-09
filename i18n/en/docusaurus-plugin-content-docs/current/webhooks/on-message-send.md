---
id: on-message-send
title: When sending 
---

## Concept

This is the sent messages return webhook

:::caution Attention 

Z-API does not accept webhooks that aren’t HTTPS

:::

---

## Updating the webhook

To update the webhook route, you can do it through the API or through the admin panel.

### API

#### /update-webhook-delivery

`PUT` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-webhook-delivery

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[ACCOUNT SECURITY TOKEN](../security/client-token)** |

---

#### Request Body

```json
{
  "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/delivery"
}
```

---

### Painel Administrativo

![img](../../../../../img/sendMessage.png)

---

## Returns from webhooks 

The possible returns of the **on-message-send** webhook are registered below:


## Response

| Attributes| Type | Description |
| :-- | :-: | :-- |
| phone | string | Message phone number destination  |
| zaapId | string | Message identifier in the conversation. |
| type | string | Instance event type, in this case it will be "DeliveryCallback". |

---

### 200

```json
{
  "phone": "554499999999",
  "zaapId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "type": "DeliveryCallback",
  "instanceId": "instance.id"
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or PUT as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

<!-- ## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/on-message-send.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe> -->
