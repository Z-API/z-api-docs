---
id: send-pin-message
title: Fixar / Desafixar mensagens
---

## Método

#### /pin-message

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/pin-message

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Neste método você poderá fixar mensagens de uma conversa, seja chats privados ou grupos.

![image](../../img/pin-message.jpeg)

---

## Atributos

### Obrigatórios

| Atributos | Tipo   | Descrição |
| :------   | :----: | :------   |
| phone     | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| messageId | string | Id da mensagem que será fixada ou desafixada |
| messageAction | string | Ação que será executada para a mensagem: fixada ou desafixada (pin, unpin) |
| pinMessageDuration | string | Tempo em que a mensagem ficará fixada. Não tem efeito no caso de desafixar uma mensagem. |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "messageId": "77DF5293EBC176FFA6A88838E7A6AD83",
  "messageAction": "pin | unpin",
  "pinMessageDuration": "24_hours | 7_days | 30_days"
}
```

## Response

### 200

| Atributos | Tipo   | Descrição      |
| :-------- | :----- | :------------- |
| zaapId    | string | id no z-api    |
| messageId | string | id no whatsapp |
| id        | string | Adicionado para compatibilidade com zapier, ele tem o mesmo valor do messageId |


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

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-fixar-mensagem)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/pin-message.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
