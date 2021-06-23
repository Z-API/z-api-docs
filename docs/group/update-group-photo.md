---
id: update-group-photo
title: Atualiza a imagem de um grupo
---

## Método

#### /update-group-photo

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-photo

---

## Conceituação

Este método é reponsavel alterar a imagem de um grupo existente.

---

## Atributos

### Obrigatórios

| Atributos  |  Tipo  | Descrição               |
| :--------- | :----: | :---------------------- |
| groupId    | string | id do grupo             |
| groupPhoto | string | Url ou Base64 da imagem |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

---

## Request Params

#### URL exemplo

Método

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-group-photo

---

## Response

```json
{
  "value": true
}
```

### 200

| Atributos | Tipo | Descrição |
| :-- | :-- | :-- |
| value | boolean | true caso tenha tenha dado certo e false em caso de falha |

Exemplo

```json
[
  {
    "value": true
  }
]
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-group-photo.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
