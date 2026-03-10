---
id: ao-enviar
sidebar_position: 1
title: 'Webhook: On sending'
---

# Webhook: When sending

Receives notifications when a message is sent by your Z-API instance. Use this webhook to confirm that your messages have been processed and sent.

## Event {#event}

The webhook sends a JSON payload with the event `DeliveryCallback` when a message is sent.

### Payload

```json
{
  "phone": "554499999999",
  "zaapId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "type": "DeliveryCallback",
  "instanceId": "instance.id",
  "momment": 1768854685097
}
```

### Fields of the Payload

| Attributes | Type | Description |
|------------|------|-------------|
| `phone` | string | Destination phone number for the message. |
| `zaapId` | string | Message identifier in the conversation. |
| `messageId` | string | Unique message identifier (usually equal to zaapId). |
| `type` | string | Instance event type, in this case will be "DeliveryCallback". |
| `instanceId` | string | Identifier of the instance that sent the message. |
| `momment` | number | Timestamp of the send moment (in milliseconds). |

## Example of processing {#example-of-processing}

```javascript
function handleMessageSent(payload) {
  // Validar se é o evento correto
  if (payload.type === 'DeliveryCallback') {
    const { phone, zaapId, messageId, instanceId, momment } = payload;
    
    console.log(`Mensagem enviada!`);
    console.log(`Instância: ${instanceId}`);
    console.log(`Para: ${phone}`);
    console.log(`ID: ${messageId} / ${zaapId}`);
    console.log(`Momento: ${momment}`);
    
    // Atualizar banco de dados confirmando envio
    markMessageAsSent(zaapId);
  }
}

function markMessageAsSent(messageId) {
  console.log(`Mensagem ${messageId} marcada como enviada no banco de dados.`);
}
```

## Errors and considerations {#errors-and-considerations}

- **Security validation**: Always validate the security header (e.g., `x-token`) before processing the payload
- **Idempotence**: Multiple notifications may be sent for the same message; implement verification of `messageId` or `zaapId`
- **Asynchronous processing**: For better performance, process notifications asynchronously
- **Tracking**: Use this webhook to track the lifecycle of sent messages

## Notes {#notes}

- This webhook is called immediately after the message is processed by the API
- To know when the message was delivered or read, check the specific delivery status webhooks