---
id: update-community-description
title: Alterar descrição
---

## Método

#### /update-community-description

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-community-description

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método permite você alterar a descrição da comunidade.

:::caution Atenção

Atenção somente administradores podem alterar as preferências da comunidade.

:::

---

## Atributos

### Obrigatórios

| Atributos            |  Tipo  | Descrição                                       |
| :------------------- | :----: | :---------------------------------------------- |
| communityId          | string | ID/Fone do grupo                                |
| communityDescription | string | Atributo para alterar a descrição da comunidade |

---

#### Body

```json

  {
    "communityId": "120363019502650977",
    "communityDescription": "descrição da comunidade"
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-community-description.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
