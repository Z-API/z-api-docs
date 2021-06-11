---
id: read-message
title: Ler mensagens
---

## Método

#### /read-message

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/read-message

---

## Conceituação

Método utilizado para marcar uma mensagem em um chat como lida.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário/remetente no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| messageId | string | id original da mensagem, no caso de mensagem enviada por você é o código que vem no seu reponse, caso seja uma mensagem enviada por um contato você vai receber este messageId pelo seu webhook de receive |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Body

```json
{
  "phone": "5511999998888",
  "messageId": "3999984263738042930CD6ECDE9VDWSA"
}
```

---

## Response

### 204

No content

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/read-message.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
