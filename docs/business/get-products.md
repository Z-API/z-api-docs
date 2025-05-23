---
id: get-products
title: Pegar Produtos
---

## Método

#### /catalogs

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Nesse método você será capaz de pegar os produtos de um catálogo do whatsapp Business

## Response

### 200

| Atributos    | Tipo    | Descrição                                        |
| :----------- | :------ | :----------------------------------------------- |
| cartEnabled  | boolean | Atributo para saber se o carrinho está ativo     |
| availability | string  | Atributo para saber a disponibilidade do produto |
| id           | string  | Id do produto                                    |
| retailerId   | boolean | ID do varejista                                  |
| description  | string  | Descricao do produto                             |
| price        | string  | Preço do produto                                 |
| salePrice    | string  | Preço promocional                                |
| currency     | string  | Tipo da moeda                                    |
| name         | string  | Nome do produto                                  |
| quantity     | boolean | Atributo de quantidade de produto                |
| images       | string  | Link da imagem do produto                        |

Exemplo

```json
{
  "cartEnabled": true,
  "products": [
    {
      "availability": "in stock",
      "id": "999999999999999",
      "retailerId": null,
      "description": "Descriçao do mouse",
      "price": "100000",
      "salePrice": "90000",
      "currency": "BRL",
      "name": "Mouse",
      "quantity": null,
      "images": ["https://"]
    }
  ]
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-products.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
