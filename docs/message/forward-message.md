---
id: forward-message
title: Reencaminhar mensagem
---

## Método

#### /forward-message


`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/forward-message

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |

---

## Conceituação

Simples e objetivo, neste método você poderá reencaminhar as mensagens através da api precisando apenas do messageId da mensagem que deseja encaminhar, e o phone do chat onde esse messageId se encontra.


![image](../../img/reencaminhar.jpeg)

---

## Atributos

### Obrigatórios

| Atributos    | Tipo   | Descrição |
| :-------     | :----: | :------   |
| phone        | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| messageId    | string | ID da mensagem que vai ser reencaminhada    |
| messagePhone | string | Número do chat onde o messageId se encontra |

### Opcionais

| Atributos    | Tipo   | Descrição |
| :---------   | :----: | :-------- |
| delayMessage | number | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1~15 sec, significa quantos segundos ele vai esperar para enviar a próxima mensagem. (Ex "delayMessage": 5, ). O delay default caso não seja informado é de 1~3 sec |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "messageId": "3999984263738042930CD6ECDE9VDWSA",
  "messagePhone": "5511888888888"
}
```

---

## Response

### 200

| Atributos | Tipo   | Descrição      |
| :-------- | :----- | :------------- |
| zaapId    | string | id no z-api    |

Exemplo

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA"
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-texto)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/forward-message.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
