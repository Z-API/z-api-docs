---
id: reply-message
title: Responder mensagem
---

## Método

#### /send-text

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Nesse tópico falaremos um pouco sobre como responder uma mensagem diretamente!

Quando você utiliza o método [send-text](send-message-text) existe um atributo opcional chamado **messageId**, esse é um atributo que recebe o Id de uma mensagem qualquer, quando esse atributo é passado, sua mensagem será diretamente relacionada a mensagem do Id informado.

:::tip

Caso tenha qualquer dúvida sobre como enviar uma mensagem de texto, você pode ler sobre isso no nosso tópico de [**Enviar texto simples**](send-message-text)

:::

![image](../../img/reply-message.jpeg)

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| message | string | Texto a ser enviado |
| messageId | string | id original da mensagem, no caso de mensagem enviada por você é o código que vem no seu reponse, caso seja uma mensagem enviada por um contato você vai receber este messageId pelo seu webhook de receive |

### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| delayMessage | number | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1~15 sec, significa quantos segundos ele vai esperar para enviar a próxima mensagem. (Ex "delayMessage": 5, ). O delay default caso não seja informado é de 1~3 sec |
| privateAnswer | boolean | No caso de uma mensagem de grupo, define se a resposta será enviada para o grupo ou no particular do remetente (não pode ser você mesmo). Se o remetente for você mesmo, o atributo "privateAnswer" será ignorado, enviando a resposta no próprio grupo. |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "message": "Welcome to *Z-API*",
  "messageId": "3999984263738042930CD6ECDE9VDWSA"
}
```

```json
{
  "phone": "342532456234453-group",
  "message": "Welcome to *Z-API*",
  "messageId": "3999984263738042930CD6ECDE9VDWSA",
  "privateAnswer": true
}
```

---

## Response

### 200

| Atributos | Tipo   | Descrição      |
| :-------- | :----- | :------------- |
| zaapId    | string | id no z-api    |
| messageId | string | id no whatsapp |
| id | string | Adicionado para compatibilidade com zapier, ele tem o mesmo valor do messageId |

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

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/reply-message.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
