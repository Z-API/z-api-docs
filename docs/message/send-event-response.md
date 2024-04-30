---
id: send-event-response
title: Responder evento
---

## Método

#### /send-event-response

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-event-response

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Neste método você poderá enviar mensagens de resposta a um evento.

:::tip
Não é possível responder a um evento que você mesmo criou. Nesse caso, sua resposta sempre fica como presença confirmada
:::

![image](../../img/SendingEventResponse.jpeg)

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| eventResponse  | string | Resposta ao evento (GOING, NOT_GOING) |
| eventMessageId | string | Id da mensagem original do evento |

---

## Request Body

```json
{
  "phone": "120363019502650977-group",
  "eventMessageId": "D2D612289D9E8F62307D72409A8D9DC3",
  "eventResponse": "GOING"
}
```

---

## Response

### 200

| Atributos | Tipo | Descrição |
| :-- | :-- | :-- |
| zaapId | string | id no z-api |
| messageId | string | id no whatsapp |
| id | string | Adicionado para compatibilidade com zapier, ele tem o mesmo valor do messageId |

Exemplo

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-resposta-de-evento)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-event-response.json&targets=all" frameBorder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
