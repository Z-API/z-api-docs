---
id: remove-community-admin
title: Remover admin da comunidade
---

## Método

#### /remove-admin

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/remove-admin

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é reponsavel remover um ou mais admistradores de uma comunidade.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| communityId | string | id/fone da comunidade. Pode ser obtido na API de **[Listar comunidades](./list-communities.md)** |
| phones | array string | Array com os número(s) a ser(em) removido(s) da administração do grupo |

---

## Request Body

#### URL

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/remove-admin

#### Body

```json
  {
    "communityId": "120363019502650977",
    "phones": ["5544999999999", "5544888888888"]
  }
```

---

## Response

### 200

| Atributos | Tipo    | Descrição                                           |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true caso tenha dado certo e false em caso de falha |

**Exemplo**

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

## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/remove-community-admin.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
