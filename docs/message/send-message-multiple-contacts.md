---
id: send-message-multiple-contacts
title: Enviar varios contatos
---

## Método

#### /send-contacts

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-contacts

---

## Conceituação

Simples e objetivo este método permite você enviar varios contatos, você não precisa ter ele em seus contatos, basta preencher os atributos do metodo com informações do contato e enviar.

![image](../../img/send-message-contacts.jpeg)

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| contacts | array | Array dos contatos que serão enviados |

#### Atributos do Contato

| Atributos           |  Tipo  | Descrição                                  |
| :------------------ | :----: | :----------------------------------------- |
| name                | string | Nome do contato                            |
| phones              | array  | Números dos contatos                       |
| businessDescription | string | Breve descrição sobre o contato (opcional) |

### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| messageId | String | Atributo utilizado para responder uma mensagem do chat, basta adicionar o messageId da mensagem que queira responder neste atributo |
| delayMessage | number | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1~15 sec, significa quantos segundos ele vai esperar para enviar a próxima mensagem. (Ex "delayMessage": 5, ). O delay default caso não seja informado é de 1~3 sec |

---

## Request Body

```json
{
  "phone": "5544999999999",
  "contacts": [
    {
      "name": "Nome do contato",
      "phones": ["5544999999999", "5544999999999"]
    },
    {
      "name": "Nome do contato",
      "phones": ["5544999999999"]
    },
    {
      "name": "Nome do contato",
      "businessDescription": "Uma empresa do Grupo Irrah",
      "phones": ["5544999999999"]
    }
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

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-contato)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-contacts.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
