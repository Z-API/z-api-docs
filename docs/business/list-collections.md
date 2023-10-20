---
id: list-collections
title: Listar coleções
---

## Método

#### /catalogs/collection

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Utilizando esse método você será capaz de listar as coleções do seu catálogo.

---

## Atributos

### Opcional

| Atributos   |  Tipo   | Descrição                                    |
| :---------- | :-----: | :------------------------------------------- |
| nextCursor  | string  | Token utilizado para paginação dos registros |

## Request Params

#### URL exemplo

Método

`GET` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection?nextCursor=VALOR_DO_CURSOR

---

## Response

### 200

| Atributos      | Tipo           | Descrição                                           |
| :------------- | :------------- | :-------------------------------------------------- |
| collections    | array object   | Lista com dados da coleção                          |
| nextCursor     | string ou null | Token que define os registros da próxima requisição |

Object (collections)

| Atributos   |  Tipo     | Descrição                               |
| :---------- | :-----:   | :-------------------------------------- |
| id          | string    | Id da coleção                           |
| name        | string    | Nome da coleção                         |
| status      | string    | Status da coleção (PENDING, APPROVED)   |

Exemplo

```json
{
  "nextCursor": "AQHRi6eu3NyRTR30t5Sr2CtkURU7rMF_e2K7NPbELxJFAa-K_HI1I6v8_C3o2j6d4wve",
  "collections": [
    {
      "id": "1072603710847740",
      "name": "Nome da coleção",
      "status": "PENDING"
    },
    {
      "id": "902834786123343",
      "name": "Nome da coleção 2",
      "status": "APPROVED"
    }
  ]
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---retailerId

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/list-collections.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
