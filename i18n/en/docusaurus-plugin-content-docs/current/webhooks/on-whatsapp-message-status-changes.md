---
id: on-whatsapp-message-status-changes
title: Message status 
---

## Concept

This is the message status return webhook

:::caution Attention

Z-API does not accept webhooks that aren’t HTTPS

:::

---

## Updating the Webhook

To update the webhook route, you can do it through the API or through the admin panel.

### API

#### /update-webhook-status

`PUT` https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/update-webhook-message-status

#### Request Body

```json
{
  "value": "https://your-systems-address.com.br/instancia/YOUR_INSTANCE/status"
}
```

---

### Administrative panel 

![img](../../../../../img/status.png)

---

## Webhook’s returns 

The possible returns of the **on-whatsapp-message-status-changes**  webhook are registered below:

## Response

| Attributes| Type| Description |
| :-- | :-: | :-- |
| status | string | Message status (SENT - if sent, RECEIVED - if received, READ - if read, READ-SELF - read confirmation inactive, PLAYED - if heard) |
| id | string | Identifier’s of the message |
| phone | string | Message destination phone number. |
| momment | string | Time when the instance was disconnected from the number. |
| type | string | Instance event type, in this case it will be "MessageStatusCallback". |

---

### 200

```json
{
  "status": "SENT",
  "ids": ["999999999999999999999"],
  "momment": 1632234645000,
  "phone": "5544999999999",
  "type": "MessageStatusCallback",
  "instanceId": "instance.id"
}
{
  "status": "RECEIVED",
  "ids": ["999999999999999999999"],
  "momment": 1632234645000,
  "phone": "5544999999999",
  "type": "MessageStatusCallback",
  "instanceId": "instance.id"
}
{
  "status": "READ",
  "ids": ["999999999999999999999"],
  "momment": 1632234645000,
  "phone": "5544999999999",
  "type": "MessageStatusCallback",
  "instanceId": "instance.id"
}
{
  "status": "READ-SELF",
  "ids": ["999999999999999999999"],
  "momment": 1632234645000,
  "phone": "5544999999999",
  "type": "MessageStatusCallback",
  "instanceId": "instance.id"
}
{
  "status": "PLAYED",
  "ids": ["999999999999999999999"],
  "momment": 1632234645000,
  "phone": "5544999999999",
  "type": "MessageStatusCallback",
  "instanceId": "instance.id"
}
```

### 405

In this case certify that you are sending the correct specification of the method. This means, verify if you sent a POST or GET as specified at the beginning of this topic.

### 415

In case you receive 415 error, make sure to add the “Content-Type” of the object you are sending in the request headers, mostly “application/json”

<!--
## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/on-whatsapp-message-status-changes.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe> -->
