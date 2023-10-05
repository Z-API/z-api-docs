---
id: update-newsletter-name
title: Atualizar nome do canal
---

## Método

#### /update-newsletter-name

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-name

---

## Conceituação

Este método é responsável por alterar o nome de um canal já existente.

---

## Atributos

### Obrigatórios

| Atributos  |  Tipo  | Descrição               |
| :--------- | :----: | :---------------------- |
| id         | string | ID do canal             |
| name       | string | Novo nome do canal      |


---

## Request Body

#### URL

Método

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-newsletter-name

#### Body

```json
{
  "id": "999999999999999999@newsletter",
  "name": "Novo nome do canal"
}
```

:::warning

O id do canal sempre deve conter o sufixo "@newsletter", pois esse é o padrão utilizado pelo próprio Whatsapp.

:::

---

## Response

### 201

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

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#response)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-newsletter-name.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
