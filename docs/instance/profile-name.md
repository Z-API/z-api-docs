---
id: profile-name
title: Atualizar nome do perfil
---

## Método

#### /profile-name

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/profile-name

---

## Conceituação

Este método é responsável por alterar o seu nome de perfil no WhatsApp


---

## Atributos

### Obrigatórios

| Atributos  |  Tipo  | Descrição             |
| :--------- | :----: | :-------------------- |
|   value    | string |     Nome do perfil    |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

---

## Request Body

#### Body

```json
{
  "value": "Nome do perfil"
}
```

---

## Response

### 200

| Atributos | Tipo    | Descrição                                           |
| :-------- | :------ | :-------------------------------------------------- |
| value     | boolean | true caso tenha dado certo e false em caso de falha |

Exemplo

```json
{
  "value": true
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou PUT conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---
