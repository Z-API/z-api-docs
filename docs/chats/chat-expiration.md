---
id: send-chat-expiration
title: Expiração do chats
---

## Método

#### POST /send-chat-expiration

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-chat-expiration

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é responsável por enviar expiração do chat.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | integer | Número de telefone que você deseja inserir o tempo de expiração do **SEU** chat |
| chatExpiration | string | Atributo para enviar expiração do chat |

---

## Request Body

Exemplo

```json
{
  "phone": "554497050785",
  "chatExpiration": "90_DAYS"
}
```

**Opcões do chatExpiration**: "24_HOURS", "7_DAYS", "90_DAYS", "OFF"

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

Neste caso certifique que esteja enviando corretamente a especificação do método, ou seja, verifique se você enviou o POST ou GET conforme especificado no início deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/modify-chat.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
