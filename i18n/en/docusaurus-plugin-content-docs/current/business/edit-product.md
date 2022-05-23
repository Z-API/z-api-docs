---
id: edit-product
title: Criar/editar Produto
---

## Método

#### /products

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/products

---

## Conceituação

Nesse método você será capaz de cadastrar e atualizar um produto no seu catálogo

---

## Atributos

### Obrigatórios

| Atributos   |  Tipo   | Descrição                                      |
| :---------- | :-----: | :--------------------------------------------- |
| currency    | string  | Tipo da Moeda                                  |
| description | string  | Descrição do produto                           |
| images      | string  | Url da imagem do produto                       |
| isHidden    | boolean | Atributo para "esconder" o produto no catálogo |
| name        | string  | Nome do produto                                |
| price       | integer | Preço do produto                               |
| retailerId  | string  | Id do produto                                  |
| url         | string  | Url da rota do z-api                           |

## Request Body

```json
{
  "currency": "BRL",
  "description": "Uma descricao do produto",
  "images": ["https://avatars.githubusercontent.com/u/60630101?s=200&v=4"],
  "isHidden": false,
  "name": "Meu primeiro produto",
  "price": 20,
  "retailerId": "002",
  "url": "https://z-api.io"
}
```

---

## Response

### 200

| Atributos | Tipo   | Descrição     |
| :-------- | :----- | :------------ |
| id        | string | Id do produto |

Exemplo

```json
{
  "id": "4741575945866725"
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-produto)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/edit-product.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
