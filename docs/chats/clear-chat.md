---
id: clear-chat
title: Limpar chat
---

## Método

#### /modify-chat

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/modify-chat

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é responsável por limpar as mensagens dos seus chats.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | integer | Número de telefone que você deseja alterar no **SEU** chat |
| action | string | Atributo para limpar o chat (clear) |

---

## Request Body

Exemplo

```json
{
  "phone": "5544999999999",
  "action": "clear"
}
```

---

## Response

### 200

| Atributos | Tipo    | Descrição                       |
| :-------- | :------ | :------------------------------ |
| value     | boolean | Atributo de confirmação da ação |

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/clear-chat.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
