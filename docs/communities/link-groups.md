---
id: link-groups
title: Vincular grupos
---

## Método

#### /communities/link

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/link

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](https://developer.z-api.io/security/client-token)** |
---

## Conceituação

Com essa API você consegue adicionar outros grupos a uma comunidade, para isso você vai precisar do ID da sua comunidade e os telefones dos grupos que deseja adicionar.

:::warning Atenção

É importante lembrar que não é possível vincular o mesmo grupo em mais de uma comunidade, caso você informe 3 grupos para adicionar onde 1 já esteja em uma comunidade, 2 serão adicionados e o outro retornará na resposta que já faz parte de outra comunidade.

:::

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| communityId | string | ID da comunidade que será adicionado os grupos |
| groupsPhones | array string | Array com os número(s) dos grupos a serem vinculados |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

## Request Body

#### URL

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/link

#### Body

```json
{
  "communityId": "98372465382764532938",
  "groupsPhones": ["1345353454354354-group", "1203634230225498-group"]
}
```

---

## Response

### 200

| Atributos | Tipo    | Descrição                                           |
| :-------- | :------ | :-------------------------------------------------- |
| success   | boolean | true caso tenha dado certo e false em caso de falha |

**Exemplo**

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/link-groups.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
