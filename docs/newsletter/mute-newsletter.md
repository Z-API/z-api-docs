---
id: mute-newsletter
title: Mutar canal
---

## Método

#### /mute-newsletter

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é responsável por mutar um canal.

---

## Atributos

### Obrigatórios

| Atributos   |  Tipo  | Descrição   |
| :---------  | :----: | :---------- |
| id          | string | ID do canal |


---

## Request Body

#### URL

Método

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/mute-newsletter

#### Body

```json
{
  "id": "999999999999999999@newsletter"
}
```

:::warning

O id do canal sempre deve conter o sufixo "@newsletter", pois esse é o padrão utilizado pelo próprio WhatsApp.

:::

---

## Response

### 200

| Atributos | Tipo    | Descrição                                           |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true caso tenha dado certo e false em caso de falha |

Exemplo

```json
{
  "value": true
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST, PUT ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

<!-- --- -->
<!-- 
## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#response) -->

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/mute-newsletter.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
