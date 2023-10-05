---
id: list-communities
title: Listar comunidades
---

## Método

#### /communities

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é reponsavel por retornar todas as comunidades que você faz parte.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| page | integer | Utilizado para paginação você de informar aqui a pagina de comunidades que quer buscar |
| pageSize | integer | Especifica o tamanho do retorno de comunidades por pagina |

---

## Request Params

#### URL exemplo

Método

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities

---

## Response

### 200

| Atributos | Tipo   | Descrição                   |
| :-------- | :----- | :-------------------------- |
| name      | string | Nome da comunidade          |
| id        | string | Identificador da comunidade |

Exemplo

```json
[
  {
    "name": "Minha primeira Comunidade",
    "id": "98372465382764532938"
  }
]
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/list-communities.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
