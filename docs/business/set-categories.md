---
id: company-categories
title: Atribuir categorias
---

## Método

#### /business/categories

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/business/categories

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Através deste método, é possível atribuir categorias a empresa / compania.

:::important Importante
Este método está disponível apenas para contas Business do whatsapp. 
:::

:::warning Atenção
É possível cadastrar no máximo 3 categorias para a empresa, e é necessário que tenha no minímo uma.
:::

---

## Atributos

### Obrigatório

| Atributos   | Tipo          | Descrição                           |
| :--------   | :------------ | :---------------------------------- |
| categories  | array string  | Id ou label da categoria a ser atribuída. Pode ser obtido na API de [Listar categorias](./available-categories) |

## Request Body

```json
{
  "categories": ["RESTAURANT", "FINANCE", "629412378414563"]
}
```

:::important Importante
Os valores enviados no atributo "categories" devem ser **iguais** aos retornados na requisição de "[Listar categorias](./available-categories)", na propriedade "id" ou "label". A propriedade "id" é útil quando a "label" não for retornada. Somente dessa forma é possível identificar a categoria desejada para ser atribuída.
:::

## Response

### 201

| Atributos | Tipo    | Descrição                                           |
| :-------- | :------ | :-------------------------------------------------- |
| success   | boolean | true caso tenha dado certo e false em caso de falha |

Exemplo

```json
{
  "success": true
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou PUT conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/company-categories.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
