---
id: accept-group-invite
title: Aceitar convite do grupo
---

## Método

#### /accept-invite-group?url={{URL_DE_CONVITE}}

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/accept-invite-group?url={{URL_DE_CONVITE}}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é reponsável por aceitar um convite que você recebeu para participar de um grupo.

---

## Atributos

### Obrigatórios

| Atributos  |    Tipo      | Descrição   |
| :--------  |    :--:      | :---------- |
| url        |    string    | Url recebida de convite do grupo. Pode ser obtida [nesse webhook](../webhooks/on-message-received#exemplo-de-retorno-de-texto) |

---

#### URL

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/accept-invite-group?url=https://chat.whatsapp.com/bh8XyNrIUj84YZoy5xcaa112

---

## Response

### 200

| Atributos | Tipo    | Descrição                                           |
| :-------- | :------ | :-------------------------------------------------- |
| success     | boolean | true caso tenha dado certo e false em caso de falha |

**Exemplo**

```json
{
  "success": true
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Webhook Response

Link para a response do webhook (ao receber) mensagem de convite

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-texto)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/accept-group-invite.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
