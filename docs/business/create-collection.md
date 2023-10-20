---
id: create-collection
title: Criar coleção
---

## Método

#### /catalogs/collection

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Utilizando esse método você será capaz de criar uma coleção de produtos no seu catálogo.

---

## Atributos

### Obrigatórios

| Atributos   |  Tipo        | Descrição                                   |
| :---------- | :----------: | :------------------------------------------ |
| name        | string       | Nome da coleção                             |
| productIds  | array string | Ids dos produtos que farão parte da coleção |

## Request Body

```json
{
    "name": "Nome da coleção",
    "productIds": ["121212121212", "232323232323"]
}
```

---

## Response

### 201

| Atributos      | Tipo   | Descrição     |
| :------------- | :----- | :------------ |
| collectionId   | string | Id da coleção |

Exemplo

```json
{
  "collectionId": "123456789123"
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/create-collection.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
