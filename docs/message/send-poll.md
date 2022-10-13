---
id: send-poll
title: Enviar enquete
---

## Método

#### /send-poll

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-poll

---

## Conceituação

Neste método você poderá enviar mensagens do tipo enquete.

<!-- ![image](../../img/send-poll.jpeg) -->

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| message | string | Texto a ser enviado na enquete |
| poll | PollItem | Lista de opções da enquete |

### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| delayMessage | number | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1~15 sec, significa quantos segundos ele vai esperar para enviar a próxima mensagem. (Ex "delayMessage": 5, ). O delay default caso não seja informado é de 1~3 sec |

### PollItem

| Atributos |  Tipo  | Descrição     |
| :-------- | :----: | :------------ |
| name      | string | Nome da opção |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "message": "Qual a melhor API para Whatsapp?",
  "poll": [
    {"name": "Z-API"},  
    {"name": "Outras"}
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

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-enquete)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-poll.json&targets=all" frameBorder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
