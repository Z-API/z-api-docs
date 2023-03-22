---
id: unlink-groups
title: Desvincular grupos
---

## Método

#### /communities/unlink

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/unlink

---

## Conceituação

Com essa API você consegue remover grupos de uma comunidade, para isso você vai precisar do ID da sua comunidade e os telefones dos grupos que deseja remover.

:::warning Atenção

Uma comunidade deve ter no mínimo 1 grupo vinculado a ela, isso sem contar com o grupo de avisos, então caso sua comunidade só possua um grupo comum vinculado, não será possível remove-lo.

:::

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| communityId | string | ID da comunidade que será desvinculado os grupos |
| groupsPhones | array string | Array com os numero(s) dos grupos a serem desvinculados |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

## Request Body

#### URL

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/communities/unlink

#### Body

```json
{
  "communityId": "98372465382764532938",
  "groupsPhones": ["1345353454354354-group"]
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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/unlink-groups.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
