---
id: profile-picture
title: Atualizar imagem de perfil
---
## Conceituação

Este método é reponsavel alterar a sua imagem de perfil no Whatsapp

---

### Método

#### /profile-picture

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/profile-picture

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](https://developer.z-api.io/security/client-token)** |

---

## Atributos

### Obrigatórios

| Atributos  |  Tipo  | Descrição               |
| :--------- | :----: | :---------------------- |
|   value    | string |     URL da imagem       |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |

---

## Request Body

```json
{
  "value": "URL da imagem"
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



