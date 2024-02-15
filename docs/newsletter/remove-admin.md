---
id: newsletter-remove-admin
title: Remover admin do canal
---

## Método

#### /newsletter/remove-admin/{newsletterId}

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/newsletter/remove-admin/{newsletterId}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é responsável por remover um usuário da administração do canal.

## Atributos

### Obrigatórios

| Atributos | Tipo      | Descrição      |
| :-------- | :-------: | :------------- |
|  phone    |  string   | Telefone do usuário que será removido da administração do canal |

---

## Request Body

```json

{
  "phone": "5511999999999"
}
```

---


## Response

### 201

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/newsletter-remove-admin.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
