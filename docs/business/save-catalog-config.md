---
id: save-catalog-config
title: Configuração do catálogo
---

## Método

#### /catalogs/config

`POST` https://api.z-api.io/instances/{{instanceId}}/token/{{instanceToken}}/catalogs/config

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Utilizando esse método você será capaz de editar as configurações do seu catálogo.

---

## Atributos

### Obrigatórios

| Atributos    |  Tipo        | Descrição                       |
| :----------- | :----------: | :------------------------------ |
| cartEnabled  | string       | Ativar ou desativar o carrinho  |

## Request Body

```json
{
  "cartEnabled": true
}
```

---

## Response

### 200

| Atributos      | Tipo    | Descrição                                           |
| :------------- | :------ | :-------------------------------------------------- |
| success        | boolean | true caso tenha dado certo e false em caso de falha |

Exemplo

```json
{
  "success": true
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/save-catalog-config.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
