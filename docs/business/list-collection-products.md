---
id: list-collection-products
title: Listar produtos de uma coleção
---

## Método

#### /catalogs/collection-products/{{telefone-dono-catalogo}}

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection-products/{{telefone-dono-catalogo}}

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Utilizando esse método você será capaz de listar os produtos que fazem parte de uma coleção do seu catálogo.

---

## Atributos

### Obrigatório

| Atributos    |  Tipo   | Descrição                                    |
| :----------- | :-----: | :------------------------------------------- |
| collectionId | string  | Id da coleção                                |

### Opcional

| Atributos    |  Tipo   | Descrição                                    |
| :----------- | :-----: | :------------------------------------------- |
| nextCursor   | string  | Token utilizado para paginação dos registros |

## Request Params

#### URL exemplo

Método

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection-products/{{numero-de-telefone-dono-catalogo}}?collectionId=12312312312&nextCursor=VALOR_DO_CURSOR

---

## Response

### 200

| Atributos      | Tipo           | Descrição                                           |
| :------------- | :------------- | :-------------------------------------------------- |
| nextCursor     | string ou null | Token que define os registros da próxima requisição |
| products       | array object   | Lista com dados dos produtos                        |

Object (products)

| Atributos       |  Tipo     | Descrição                                         |
| :-------------- | :-----:   | :------------------------------------------------ |
| id              | string    | Id do produto                                     |
| name            | string    | Nome do produto                                   |
| description     | string    | Descrição do produto                              |
| url             | string    | Url do produto                                    |
| price           | string    | Preço do produto                                  |
| currency        | string    | Tipo da moeda                                     |
| isHidden        | boolean   | Produto ocultado                                  |
| availability    | string    | Atributo para saber a disponibilidade do produto  |
| retailerId      | string    | ID do varejista                                   |
| images          | string    | Link da imagem do produto                         |
| quantity        | string    | Atributo de quantidade de produto                 |

Exemplo

```json
{
  "nextCursor": null,
  "products": [
    {
      "id": "6988917394481455",
      "name": "Nome do produto",
      "description": "Descrição do produto",
      "url": "http://site.com/produto",
      "price": "10000",
      "currency": "BRL",
      "isHidden": false,
      "availability": "in stock",
      "retailerId": "123",
      "images": [
          "https://cdn.greatsoftwares.com.br/arquivos/paginas/10603-92bb9420b363835d05d41b96a45d8f4e.png"
      ],
      "quantity": "99"
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/list-collection-products.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
