---
id: responder-evento
title: Responder Evento
sidebar_position: 37
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# <Icon name="CheckCircle" size="lg" /> Responder Evento

Responda a um evento em um grupo. Use este método para confirmar presença (`GOING`) ou recusar (`NOT_GOING`) em um evento criado anteriormente.

---

:::tip Importante

Não é possível responder a um evento que você mesmo criou. Nesse caso, sua resposta sempre fica como "presença confirmada".

:::

---

## <Icon name="Lightbulb" size="md" /> Casos de Uso Comuns

- **Confirmação de Presença**: Confirmar participação em eventos e reuniões
- **Cancelamento de Participação**: Recusar participação em eventos
- **Gestão de Eventos**: Gerenciar respostas de participantes em eventos de grupo

---

## <Icon name="Wand2" size="md" /> Para Usuários No-Code {#para-usuarios-no-code}

Na sua ferramenta de automação (n8n, Make, Zapier), você preencherá os seguintes campos:

### Campos Obrigatórios

- **`phone`**: ID do grupo onde o evento foi criado. **IMPORTANTE**: Use o formato `{groupId}-group` (ex: `120363019502650977-group`). Este método está disponível **apenas para grupos**, não é possível responder a eventos de contatos individuais.

- **`eventMessageId`**: ID da mensagem original do evento ao qual você deseja responder. **IMPORTANTE**: Este é o `messageId` retornado quando o evento foi criado usando [Enviar Evento](/docs/messages/evento). Você pode obtê-lo através dos webhooks quando o evento é criado ou quando você recebe uma notificação do evento.

- **`eventResponse`**: Sua resposta ao evento (obrigatório). Use:
  - `"GOING"`: Para confirmar presença no evento
  - `"NOT_GOING"`: Para recusar participação no evento

### Exemplo Prático para No-Code

**Exemplo: Confirmar presença em evento:**

```json
{
  "phone": "120363019502650977-group",
  "eventMessageId": "D2D612289D9E8F62307D72409A8D9DC3",
  "eventResponse": "GOING"
}
```

**Exemplo: Recusar participação em evento:**

```json
{
  "phone": "120363019502650977-group",
  "eventMessageId": "D2D612289D9E8F62307D72409A8D9DC3",
  "eventResponse": "NOT_GOING"
}
```

**Dicas importantes:**

- **Apenas grupos**: Respostas a eventos só podem ser enviadas para grupos, não para contatos individuais. Use o ID do grupo no formato `{groupId}-group`.
- **Obter eventMessageId**: O `eventMessageId` é o `messageId` retornado quando o evento foi criado. Você pode obtê-lo através dos webhooks quando o evento é criado ou quando você recebe uma notificação do evento.
- **Tipos de resposta**: Use `"GOING"` para confirmar presença ou `"NOT_GOING"` para recusar. Estes são os únicos valores válidos.
- **Limitação importante**: Não é possível responder a um evento que você mesmo criou. Nesse caso, sua resposta sempre fica como "presença confirmada" automaticamente.
- **Response**: A resposta será um objeto com `zaapId`, `messageId` e `id` (para compatibilidade com Zapier). Use o `messageId` para rastrear a resposta através dos webhooks.

**Casos de uso comuns:**

- **Confirmação de Presença**: Confirmar participação em eventos e reuniões usando `"GOING"`
- **Cancelamento de Participação**: Recusar participação em eventos usando `"NOT_GOING"`
- **Gestão de Eventos**: Gerenciar respostas de participantes em eventos de grupo através de webhooks

**Fluxo recomendado:**

1. Um evento é criado em um grupo usando [Enviar Evento](/docs/messages/evento)
2. O `messageId` do evento é retornado e pode ser obtido via webhook
3. Quando um participante quiser responder, use este `messageId` como `eventMessageId`
4. Envie a resposta (`"GOING"` ou `"NOT_GOING"`)
5. Monitore os webhooks para confirmar que a resposta foi registrada

**Próximos passos:**

- [Enviar Evento](/docs/messages/evento) - Saiba como criar um evento
- [Editar Evento](/docs/messages/editar-evento) - Saiba como editar um evento existente
- [Grupos](/docs/groups/introducao) - Entenda como trabalhar com grupos
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks para receber notificações de respostas

---

## <Icon name="Code" size="md" /> Para Desenvolvedores

### <Icon name="Link" size="sm" /> Endpoint {#endpoint}

```http
POST /instances/{instanceId}/token/{token}/send-event-response
```

### <Icon name="Info" size="sm" /> Conceituação {#conceituacao}

Neste método você poderá enviar mensagens de resposta a um evento.

:::tip Importante

Não é possível responder a um evento que você mesmo criou. Nesse caso, sua resposta sempre fica como "presença confirmada".

:::

![Exemplo de resposta a evento](/img/SendingEventResponse.jpeg)

---

## <Icon name="Settings" size="md" /> Atributos {#atributos}

### Obrigatórios

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `phone` | string | ID do grupo no formato `{groupId}-group` (ex: `120363019502650977-group`). **IMPORTANTE**: Envie somente números, sem formatação ou máscara |
| `eventResponse` | string | Resposta ao evento. Valores válidos: `GOING` (confirmar presença) ou `NOT_GOING` (recusar participação) |
| `eventMessageId` | string | ID da mensagem original do evento que será respondido |

---

## <Icon name="Code" size="md" /> Exemplos {#exemplos}

### Confirmar Presença (GOING)

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

### Recusar Participação (NOT_GOING)

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

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `zaapId` | string | ID único da mensagem no sistema Z-API (para rastreamento interno) |
| `messageId` | string | ID único da mensagem no WhatsApp. **Guarde este ID!** Use-o para rastrear o status da resposta através dos webhooks |
| `id` | string | ID de compatibilidade com Zapier e sistemas legados. Tem o mesmo valor do `messageId` |

**Importante:**

- O `messageId` é o identificador principal que você deve usar para rastrear a resposta
- O `zaapId` é usado internamente pelo Z-API para processamento
- O `id` existe apenas para compatibilidade com integrações legadas (como Zapier)

**Rastreamento de Resposta:**

Para saber quando a resposta foi registrada ou se houve algum erro, configure um webhook e monitore os eventos. Veja mais sobre [webhooks de mensagens recebidas](../webhooks/ao-receber#exemplo-de-retorno-de-resposta-de-evento).

### Erros comuns {#erros-comuns}

| Código | Motivo | Como resolver |
|--------|-----------------------|----------------------------------------------------|
| 400 | Parâmetros inválidos | Verifique se todos os atributos obrigatórios foram enviados (`phone`, `eventMessageId`, `eventResponse`), se o `phone` está no formato correto (`{groupId}-group`), se o `eventMessageId` é válido, e se `eventResponse` é `"GOING"` ou `"NOT_GOING"` |
| 401 | Token inválido | Verifique o header `Client-Token` |
| 404 | Evento não encontrado | Verifique se o `eventMessageId` existe e é válido |
| 405 | Método incorreto | Certifique-se de estar usando o método `POST` |
| 415 | Content-Type incorreto | Adicione `Content-Type: application/json` nos headers da requisição |
| 429 | Rate limit | Aguarde e tente novamente |
| 5xx | Erro interno | Tente novamente; abra suporte se persistir |

---

## <Icon name="Webhook" size="md" /> Webhook Relacionado {#webhook}

Quando um participante responder a um evento, você receberá um webhook com a resposta. Veja mais detalhes em:

[Webhook ao receber mensagem - Resposta de evento](/docs/webhooks/ao-receber#exemplo-de-retorno-de-resposta-de-evento)

---

## <Icon name="Lightbulb" size="md" /> Dicas {#dicas}

- **Apenas Grupos**: Respostas a eventos só podem ser enviadas para grupos, não para contatos individuais
- **Tipos de Resposta**: Use `GOING` para confirmar presença ou `NOT_GOING` para recusar
- **ID do Evento**: Use o `messageId` do evento original para `eventMessageId`
- **Limitação**: Não é possível responder a um evento que você mesmo criou

---

## <Icon name="Rocket" size="md" /> Próximos Passos

- [Enviar Evento](/docs/messages/evento) - Saiba como criar um evento
- [Editar Evento](/docs/messages/editar-evento) - Saiba como editar um evento existente
- [Grupos](/docs/groups/introducao) - Entenda como trabalhar com grupos
- [Webhooks](/docs/webhooks/introducao) - Configure webhooks para receber notificações de respostas
