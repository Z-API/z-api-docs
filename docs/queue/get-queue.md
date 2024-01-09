---
id: get-queue
title: Fila
---

## Método

#### /queue

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/queue

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é reponsavel por retornar todas mensagens que estão em sua fila aguardando para ser processada.

---

## Atributos

### Obrigatórios

| Atributos | Tipo    | Descrição |
| :-------- | :---:   | :-------- |
| page      | integer | Utilizado para paginação você de informar aqui a pagina de mensagens que quer buscar |
| pageSize  | integer | Especifica o tamanho do retorno de mensagens por pagina |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
| count     | string | Atributo utilizado para retornar o número de mensagens na fila |

---

## Request Params

#### URL exemplo

Método

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/queue?page=1&pageSize=100

 ou

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/queue/count


---

## Response

### 200

| Atributos | Tipo         | Descrição                       |
| :-------- | :----------- | :------------------------------ |
| messages  | array string | Array com as menssagens da fila |

Array Messages

| Atributos    | Tipo     | Descrição                   |
| :----------  | :------- | :-------------------------- |
| _id          | string   | ID da mensagem no Z-API     |
| DelayMessage | string   | Tempo em segundos entre o envio das mensagens |
| Message      | string   | Texto da Mensagem           |
| IsTrial      | boolean  | Indica se a instância está utilizando trial   |
| InstanceId   | string   | ID da instância             |
| Phone        | string   | Número do destinatário      |
| ZaapId       | string   | ID da mensagem no Z-API     |
| DelayTyping  | string   | Duração do indicador do chat "digitando..."   |
| MessageId    | string   | ID da mensagem              |
| Created      | timetamp | Data da mensagem            |

Exemplo

```json
{
  [
    {
      "_id": "39BB1684570F00E91090F6BBC7EE7646",
      "DelayMessage": -1,
      "Message": "Mensagem da fila 1",
      "IsTrial": false,
      "InstanceId": "3A5D07856DC26A1C9E2E08E691E63271",
      "Phone": "5511999999999",
      "ZaapId": "39BB1684570F00E91090F6BBC7EE7646",
      "DelayTyping": 0,
      "MessageId": "7AD29EAA5EF34C301F0B",
      "Created": 1624977905648,
      
    },
    {
      "_id": "39BB1684570F00E91090F6BBC7EE7646",
      "DelayMessage": -1,
      "Message": "Mensagem da fila 2",
      "IsTrial": false,
      "InstanceId": "3A5D07856DC26A1C9E2E08E691E63271",
      "Phone": "5511999999999",
      "ZaapId": "39BB1684570F00E91090F6BBC7EE7646",
      "DelayTyping": 5,
      "MessageId": "7AD29EAA5EF34C301F0B",
      "Created": 1624977906907,
    }
  ]
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-queue.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
