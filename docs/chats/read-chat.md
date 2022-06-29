---
id: read-chat
title: Ler chats
---

## Método

#### /modify-chat

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat

---

## Conceituação

Este método é reponsavel por realizar a ação de ler um chat como um todo, ou também marcar um chat como não lido

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | integer | Número de telefone que você deseja alterar no **SEU** chat |
| action | string | Atributo para marcar o chat (read ou unread)|

---

## Request Body

Exemplo

```json
{
  "phone": "5544999999999",
  "action": "read" ou "unread"
}
```

---

## Response

### 200

| Atributos | Tipo    | Descrição                       |
| :-------- | :------ | :------------------------------ |
| value     | boolean | Atributo de confirmaçaõ da ação |

Exemplo

```json
{
  "value": true
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/read-chat.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
