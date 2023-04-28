---
id: get-products-phone
title: Pegar Produtos (Telefone)
---

## Método

#### /catalogs/Numero-de-telefone

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/{{Numero-de-telefone}}

---

## Conceituação

Nesse método você será capaz de pegar os produtos de um catálogo do whatsapp Business de qualquer número, sendo o seu catáçogo ou de outra pessoa

## Response

### 200

| Atributos    | Tipo    | Descrição                                        |
| :----------- | :------ | :----------------------------------------------- |
| cartEnabled  | boolean | Atributo para saber se o carrinho está ativo     |
| availability | string  | Atributo para saber a disponibilidade do produto |
| id           | string  | Id do produto                                    |
| retailerId   | boolean | ID do varejista                                  |
| price        | string  | Preço do produto                                 |
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
      "id": "99999999999999999",
      "retailerId": null,
      "price": "100000",
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-products-phone.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
