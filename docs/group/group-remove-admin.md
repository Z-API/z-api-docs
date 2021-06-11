---
id: group-remove-admin
title: Remove um administrador do grupo
---

## Método

#### /remove-admin

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/remove-admin

## Conceituação

Este método é reponsavel remover um ou mais admistradores de um grupo.

---

## Atributos

### Obrigatórios

| Atributos |     Tipo     | Descrição                                       |
| :-------- | :----------: | :---------------------------------------------- |
| groupId   |    string    | id/fone do grupo                                |
| phones    | array string | Array com os numeros a serem removidos do grupo |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

---

## Request Params

#### URL exemplo

Método

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/remove-admin

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

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/remove-admin.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
