---
id: reply-message
title: Responder mensagem
---

## Conceituação

Nesse tópico falaremos um pouco sobre como responder uma mensagem diretamente!

Quando você utiliza o método [send-text](send-message-text) existe um atributo opcional chamado **messageId**, esse é um atributo que recebe o Id de uma mensagem qualquer, quando esse atributo é passado, sua mensagem será diretamente relacionada a mensagem do Id informado.

:::tip

Caso tenha qualquer dúvida sobre como enviar uma mensagem de texto, você pode ler sobre isso no nosso tópico de [**Enviar texto simples**](send-message-text)

:::

---

## Atributos

### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| messageId | string | id original da mensagem, no caso de mensagem enviada por você é o código que vem no seu reponse, caso seja uma mensagem enviada por um contato você vai receber este messageId pelo seu webhook de receive |

---

## Request Body

```json
{
  "phone": "5511912341234",
  "message": "Welcome to *Z-API*",
  "messageId": "3999984263738042930CD6ECDE9VDWSA"
}
```

---

## Response

### 200

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68"
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/reply-message.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
