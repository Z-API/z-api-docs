---
id: responder-evento
sidebar_position: 37
title: Respond to Event
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckCircle" size="lg" /> Respond Event

Respond to an event in a group. Use this method to confirm attendance (`GOING`) or reject (`NOT_GOING`) an event previously created.

---

:::tip Important

It is not possible to respond to an event that you have created yourself. In this case, your response will always be "confirmed attendance".

:::

---

## <Icon name="Lightbulb" size="md" /> Common Use Cases

- **Confirm Attendance**: Confirm participation in events and meetings
- **Cancel Participation**: Reject participation in events
- **Event Management**: Manage participant responses to group events

---

## <Icon name="Wand2" size="md" /> For No-Code Users {#para-usuarios-no-code}

In your automation tool (n8n, Make, Zapier), you will fill in the following fields:

### Required Fields

- **`phone`**: ID of the group where the event was created. **IMPORTANT**: Use the format `{groupId}-group` (ex: `120363019502650977-group`). This method is **only for groups**, it is not possible to respond to events of individual contacts.

- **`eventMessageId`**: ID of the original event message you want to respond to. **IMPORTANT**: This is the `messageId` returned when the event was created using [Send Event](/docs/messages/evento). You can obtain it through webhooks when the event is created or when you receive a notification of the event.

- **`eventResponse`**: Your response to the event (required). Use:
  - `"GOING"`: To confirm attendance at the event
  - `"NOT_GOING"`: To reject participation in the event

### Practical Example for No-Code

**Example: Confirm Attendance to Event:**

```json
{
  "phone": "120363019502650977-group",
  "eventMessageId": "D2D612289D9E8F62307D72409A8D9DC3",
  "eventResponse": "GOING"
}
```

**Example: Reject Participation in Event:**

```json
{
  "phone": "120363019502650977-group",
  "eventMessageId": "D2D612289D9E8F62307D72409A8D9DC3",
  "eventResponse": "NOT_GOING"
}
```

**Important Tips:**

- **Only Groups**: Responses to events can only be sent to groups, not individual contacts. Use the group ID in the format `{groupId}-group`.
- **Get eventMessageId**: The `eventMessageId` is the `messageId` returned when the event was created. You can obtain it through webhooks when the event is created or when you receive a notification of the event.
- **Types of Response**: Use `"GOING"` to confirm attendance or `"NOT_GOING"` to reject. These are the only valid values.
- **Important Limitation**: It is not possible to respond to an event that you have created yourself. In this case, your response will always be "confirmed attendance" automatically.
- **Response**: The response will be an object with `zaapId`, `messageId` and `id` (for compatibility with Zapier). Use the `messageId` to track the response through webhooks.

**Common Use Cases:**

- **Confirm Attendance**: Confirm participation in events and meetings using `"GOING"`
- **Cancel Participation**: Reject participation in events using `"NOT_GOING"`
- **Event Management**: Manage participant responses to group events through webhooks

**Recommended Flow:**

1. An event is created in a group using [Send Event](/docs/messages/evento)
2. The `messageId` of the event is returned and can be obtained via webhook
3. When a participant wants to respond, use this `messageId` as `eventMessageId`
4. Send the response (`"GOING"` or `"NOT_GOING"`)
5. Monitor webhooks to confirm that the response was recorded

**Next Steps:**

- [Send Event](/docs/messages/evento) - Learn how to create an event
- [Edit Event](/docs/messages/editar-evento) - Learn how to edit an existing event
- [Groups](/docs/groups/introducao) - Understand how to work with groups
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks to receive response notifications

---

## <Icon name="Code" size="md" /> For Developers

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/send-event-response
```

### <Icon name="Info" size="sm" /> Conceptualization {#conceituacao}

In this method, you can send response messages to an event.

:::tip Important

It is not possible to respond to an event that you have created yourself. In this case, your response will always be "confirmed attendance".

:::

![Example of responding to an event](/img/SendingEventResponse.jpeg)

---

## <Icon name="Settings" size="md" /> Attributes {#atributos}

### Required

| Attribute | Type | Description |
|-----------|------|-------------|
| `phone` | string | Group ID in the format `{groupId}-group` (ex: `120363019502650977-group`). **IMPORTANT**: Send only numbers, without formatting or mask |
| `eventResponse` | string | Response to the event. Valid values: `GOING` (confirm attendance) or `NOT_GOING` (reject participation) |
| `eventMessageId` | string | ID of the original event message that will be responded to |

---

## <Icon name="Code" size="md" /> Examples {#exemplos}

### Confirm Attendance (GOING)

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCIA';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'seu-token-de-seguranca';

// Validar ID do grupo (formato: {groupId}-group)
function validateGroupId(groupId) {
  const groupIdRegex = /^\d+-group$/;
  if (!groupIdRegex.test(groupId)) {
    throw new Error('ID do grupo inválido. Use o formato: {groupId}-group');
  }
  return groupId;
}

// Validar eventResponse
function validateEventResponse(eventResponse) {
  const validResponses = ['GOING', 'NOT_GOING'];
  if (!validResponses.includes(eventResponse)) {
    throw new Error('eventResponse inválido. Use: GOING ou NOT_GOING');
  }
  return eventResponse;
}

// Responder a evento
async function respondToEvent(phone, eventMessageId, eventResponse) {
  try {
    // ⚠️ VALIDAÇÃO: Validar entrada
    const validatedGroupId = validateGroupId(phone);
    if (!eventMessageId || typeof eventMessageId !== 'string' || eventMessageId.trim() === '') {
      throw new Error('eventMessageId é obrigatório');
    }
    const validatedEventResponse = validateEventResponse(eventResponse);

    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-event-response`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify({
        phone: validatedGroupId,
        eventMessageId: eventMessageId.trim(),
        eventResponse: validatedEventResponse,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Erro HTTP ${response.status}: ${errorData.message || response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Resposta ao evento enviada com sucesso');
    return result;
  } catch (error) {
    console.error('Erro ao responder evento:', error.message);
    throw error;
  }
}

// Executar
respondToEvent(
  '120363019502650977-group',
  'D2D612289D9E8F62307D72409A8D9DC3',
  'GOING'
)
  .then((result) => {
    console.log('Resultado:', result);
  })
  .catch((error) => {
    console.error('Erro:', error.message);
  });
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST \
  "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-event-response" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "120363019502650977-group",
    "eventMessageId": "D2D612289D9E8F62307D72409A8D9DC3",
    "eventResponse": "GOING"
  }'
```

</TabItem>
</Tabs>

### Reject Participation (NOT_GOING)

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// Responder NOT_GOING
respondToEvent(
  '120363019502650977-group',
  'D2D612289D9E8F62307D72409A8D9DC3',
  'NOT_GOING'
)
  .then((result) => {
    console.log('Resposta enviada:', result);
  })
  .catch((error) => {
    console.error('Erro:', error.message);
  });
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
curl -X POST \
  "https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-event-response" \
  -H "Content-Type: application/json" \
  -H "Client-Token: seu-token-de-seguranca" \
  -d '{
    "phone": "120363019502650977-group",
    "eventMessageId": "D2D612289D9E8F62307D72409A8D9DC3",
    "eventResponse": "NOT_GOING"
  }'
```

</TabItem>
</Tabs>

---

## <Icon name="CheckCircle" size="md" /> Response {#response}

### 200 OK {#200-ok}

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `zaapId` | string | Unique message ID in the Z-API system (for internal tracking) |
| `messageId` | string | Unique message ID in WhatsApp. **Save this ID!** Use it to track the response status through webhooks |
| `id` | string | Compatibility ID with Zapier and legacy systems. Has the same value as `messageId` |

**Important:**

- The `messageId` is the primary identifier you should use to track the response
- The `zaapId` is used internally by Z-API for processing
- The `id` exists only for compatibility with legacy integrations (like Zapier)

**Tracking Response:**

To know when the response was recorded or if there was an error, configure a webhook and monitor the events. See more about [message received webhooks](../webhooks/ao-receber#exemplo-de-retorno-de-resposta-de-evento).

### Common Errors {#erros-comuns}

| Code | Reason | How to Solve |
|------|-----------------------|----------------------------------------------------|
| 400 | Invalid parameters | Check if all required attributes were sent (`phone`, `eventMessageId`, `eventResponse`), if the `phone` is in the correct format (`{groupId}-group`), if the `eventMessageId` is valid, and if `eventResponse` is `"GOING"` or `"NOT_GOING"` |
| 401 | Invalid token | Check the header `Client-Token` |
| 404 | Event not found | Check if the `eventMessageId` exists and is valid |
| 405 | Incorrect method | Make sure you are using the method `POST` |
| 415 | Incorrect Content-Type | Add `Content-Type: application/json` to the request headers |
| 429 | Rate limit | Wait and try again |
| 5xx | Internal error | Try again; open support if it persists |

---

## <Icon name="Webhook" size="md" /> Related Webhook {#webhook}

When a participant responds to an event, you will receive a webhook with the response. See more details in:

[Webhook for receiving message - Event response](/docs/webhooks/ao-receber#exemplo-de-retorno-de-resposta-de-evento)

---

## <Icon name="Lightbulb" size="md" /> Tips {#dicas}

- **Only Groups**: Responses to events can only be sent to groups, not individual contacts
- **Types of Response**: Use `GOING` for confirm attendance or `NOT_GOING` for reject
- **Event Message ID**: Use the original event's `messageId` as `eventMessageId`
- **Limitation**: It is not possible to respond to an event that you have created yourself

---

## <Icon name="Rocket" size="md" /> Next Steps

- [Send Event](/docs/messages/evento) - Learn how to create an event
- [Edit Event](/docs/messages/editar-evento) - Learn how to edit an existing event
- [Groups](/docs/groups/introducao) - Understand how to work with groups
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks to receive response notifications