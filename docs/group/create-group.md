---
id: create-group
title: Criando grupos
---

## Método

#### /send-text

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-group

---

## Conceituação

Este método é reponsavel por criar um grupo com sua imagem e participantes.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| groupName | string | Nome do grupo a ser criado |
| phones | array<string> | Array com os numeros a serem adicionados no grupo |

### Opcionais

| Atributos    |  Tipo  | Descrição                 |
| :----------- | :----: | :------------------------ |
| profileImage | string | url da imagem ou o base64 |

---

## Request Params

#### URL exemplo

Método

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/create-group

---

## Response

{ "phone": "5511999999999-1623281429", "invitationLink": "https://chat.whatsapp.com/DCayftVlS6zHWtlvfd3hUa" }

### 200

| Atributos      | Tipo   | Descrição                 |
| :------------- | :----- | :------------------------ |
| phone          | string | id/fone do grupo          |
| invitationLink | string | link para entrar no grupo |

Exemplo

```json
[
  {
    "groupName": "Meu grupo no Z-API",
    "phones": ["5511999999999"]
  }
]
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/creat-group.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
