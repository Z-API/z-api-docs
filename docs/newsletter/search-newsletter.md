---
id: search-newsletter
title: Encontrar canais
---

## Método

#### /search-newsletter

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/search-newsletter

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método retorna uma lista com dados de canais, de acordo com a busca realizada através de filtros passados no body da requisição.

---

## Atributos

### Obrigatórios

| Atributos   |  Tipo  | Descrição                            |
| :---------  | :----: | :----------------------------------- |
| limit       | number | Limit de registros a serem listados  |
| filters     | object | Objeto com filtros a serem aplicados |

Object (filters)

| Atributos     |  Tipo        | Descrição                                                       |
| :---------    | :----------: | :-------------------------------------------------------------- |
| countryCodes  | array string | Array com codigo de países (https://www.iban.com/country-codes) |

### Opcionais

| Atributos    |  Tipo        | Descrição                                                    |
| :----------- | :----------: | :----------------------------------------------------------- |
| view         | string       | Filtro de visualização (RECOMMENDED, TRENDING, POPULAR, NEW) |
| searchText   | string       | Filtragem por texto                                          |

---

## Request Body

#### URL

Método

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/search-newsletter

#### Body

```json
  {
    "limit": 50,
    "view": "TRENDING",
    "filters": { 
      "countryCodes": ["BR", "AF", "CA"]
    },
    "searchText": "Z-API"
  }
```

---

## Response

### 200

| Atributos          | Tipo        | Descrição                                                    |
| :----------------- | :---------- | :----------------------------------------------------------- |
| id                 | string      | ID do canal                                                  |
| name               | string      | Nome do canal                                                |
| description        | string      | Descrição do canal                                           |
| subscribersCount   | string      | Contagem do número de seguidores do canal                    |
| picture            | string      | Url da imagem do canal                                       |


**Exemplo**

```json
  {
    "cursor": null,
    "data": [
      {
        "id": "999999999999999999@newsletter",
        "name": "Z-API",
        "description": "Canal oficial Z-API",
        "subscribersCount": "123",
        "picture": "https://mmg.whatsapp.net/v/t61.24694-24/345237462_968463277797373_5339431038113115975_n.jpg?stp=dst-jpg_s192x192&ccb=11-4&oh=01_AdTMyhA5kdwCdSqV0v784czJ1dHP_nkNhJ8TdgnANHro7Q&oe=651E6909&_nc_sid=000000&_nc_cat=109"
      },
      {
        "id": "999999999999999999@newsletter",
        "name": "Canal Exemplo",
        "description": "Exemplo",
        "subscribersCount": "0",
        "picture": null
      }
    ]
  }
```

:::tip Atributo "cursor" no objeto de resposta

A api do WhatsApp fornece o atributo "limit" para realizar a busca dos canais, o que significa que existe paginação dos resultados. Porém, na resposta não existe a indicação do "cursor" dos registros. Sendo assim, por enquanto, o atributo "cursor" sempre será "null", até que o WhatsApp implemente essa funcionalidade.

:::

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

<!-- 
## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#response) -->

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/search-newsletter.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
