---
id: send-poll-vote
title: Enviar voto para enquete
---

## Método

#### /send-poll

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll-vote

---

## Conceituação

Neste método você poderá votar em uma determinada enquete.

<!-- ![image](../../img/send-poll.jpeg) -->

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| pollMessageId | string | ID da mensagem da enquete. **IMPORTANTE** Esse é o messageId recebido ao enviar uma enquete ou ao receber de outro contato. |
| pollVote | pollVote | Lista de opções que compõem. **IMPORTANTE** Você pode votar em mais de uma opção. |


### PollVote

| Atributos |  Tipo  | Descrição     |
| :-------- | :----: | :------------ |
| name      | string | Nome da opção |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "pollMessageId": "id da mensagem de enquete",
  "pollVote": [
    {"name": "Z-API"}
  ]
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

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-resposta-de-enquete)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-poll-vote.json&targets=all" frameBorder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
