---
id: remove-product-from-collection
title: Remover produtos da coleção
---

## Método

#### /catalogs/collection/remove-product

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/collection/remove-product

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Utilizando esse método você será capaz de remover produtos de uma coleção do seu catálogo.

:::warning Atenção
Ao adicionar ou remover produtos de uma **coleção**, o id da mesma é alterado pelo whatsapp. Isso quer dizer que, ao cadastrar um produto na coleção e tentar fazer qualquer outra operação utilizando o **id** "antigo" resultará em um não funcionamento da rota. Lembre-se então de utilizar o id retornado por essa mesma rota, o qual já é o id atualizado para as operações seguintes.
:::

---

## Atributos

### Obrigatórios

| Atributos    |  Tipo        | Descrição                                       |
| :----------- | :----------: | :---------------------------------------------- |
| collectionId | string       | Id da coleção                                   |
| productIds   | array string | Ids dos produtos que serão removidos da coleção |

## Request Body

```json
{
  "collectionId": "658387616418640",
  "productIds": ["6643149779134830", "6988917394481455"]
}
```

---

## Response

### 200

| Atributos      | Tipo    | Descrição                                           |
| :------------- | :------ | :-------------------------------------------------- |
| success        | boolean | true caso tenha dado certo e false em caso de falha |
| collectionId   | string  | Id atualizado da coleção                            |

Exemplo

```json
{
  "success": true,
  "collectionId": "1798362193933497"
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/remove-product-from-collection.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
