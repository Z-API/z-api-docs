---
id: ao-enviar
title: "Webhook: Ao enviar"
sidebar_position: 1
---

# Webhook: Ao enviar

Receba notificações quando uma mensagem é enviada pela sua instância do Z-API. Use este webhook para confirmar que suas mensagens foram processadas e enviadas.

## Evento {#evento}

O webhook envia um payload JSON com o evento `DeliveryCallback` quando uma mensagem é enviada.

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

### Campos do Payload

| Atributos | Tipo | Descrição |
|-----------|------|-----------|
| `phone` | string | Número de telefone de destino da mensagem. |
| `zaapId` | string | Identificador da mensagem na conversa. |
| `messageId` | string | Identificador único da mensagem (geralmente igual ao zaapId). |
| `type` | string | Tipo do evento da instância, nesse caso será "DeliveryCallback". |
| `instanceId` | string | Identificador da instância que enviou a mensagem. |
| `momment` | number | Timestamp do momento do envio (em milissegundos). |

## Exemplo de processamento {#exemplo-de-processamento}

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

## Erros e considerações {#erros-e-consideracoes}

- **Validação de segurança**: Sempre valide o header de segurança (ex.: `x-token`) antes de processar o payload
- **Idempotência**: Múltiplas notificações podem ser enviadas para a mesma mensagem; implemente verificação de `messageId` ou `zaapId`
- **Processamento assíncrono**: Para melhor performance, processe notificações de forma assíncrona
- **Rastreamento**: Use este webhook para rastrear o ciclo de vida das mensagens enviadas

## Notas {#notas}

- Este webhook é chamado imediatamente após a mensagem ser processada pela API
- Para saber quando a mensagem foi entregue ou lida, consulte os webhooks específicos de status de entrega

