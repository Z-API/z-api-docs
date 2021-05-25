---
id: delete-message
title: Deletando mensagens
---

## Método

#### /send-audio

`DELETE` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/messages

---

## Conceituação

Método utilizado para apagar uma mensagem em um chat, você pode deletar tanto uma mensagem que enviou quanto uma mensagen enviada por um contato, para utilizar este recurso você só vai precisar do messageId da mensagem que quer apagar.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| messageId | string | id original da mensagem, no caso de mensagem enviada por você é o código que vem no seu reponse, caso seja uma mensagem enviada por um contato você vai receber este messageId pelo seu webhook de receive |
| phone | string | Telefone do destinatário/remetente no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| owner | boolean | Informe true caso você tenha enviado a mensagem ou false para casos onde seja uma mensagem recebida |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Body

```json
{
  "messageId": "3999984263738042930CD6ECDE9VDWSA",
  "phone": "5511999998888",
  "owner": true
}
```

---

## Response

### 200

| Atributos | Tipo | Descrição |
| :-------- | :--- | :-------- |
|           |      |           |

Exemplo

```json
{}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/delete-message.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
