---
id: profile-description
title: Atualizar descrição do perfil
---

## Método

#### /profile-description

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/profile-description

---

## Conceituação

Este método é reponsavel alterar a sua descrição de perfil no Whatsapp


---

## Atributos

### Obrigatórios

| Atributos  |  Tipo  | Descrição              |
| :--------- | :----: | :--------------------- |
|   value    | string |   Descrição do perfil  |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

---

## Request Body

#### Body

```json
{
  "value": "Descrição do perfil"
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
