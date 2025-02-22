---
id: get-chats
title: Pegar chats
---

## Método

#### /chats

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Este método é responsável por retornar todos os chats.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| page | integer | Utilizado para paginação você de informar aqui a pagina de chats que quer buscar |
| pageSize | integer | Especifica o tamanho do retorno de chats por pagina |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL exemplo

Método

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats

---

## Response

### 200

| Atributos | Tipo | Descrição |
| :-- | :-- | :-- |
| archived  | boolean | true ou false indica se o chat está arquivado   |
| pinned    | boolean | true ou false indica se o chat está fixado      |
| phone     | string  | Phone do contato |
| unread    | string  | indica o numero de mensagens não lidas em um chat |
| name      | string  | **Nome ** atribudo ao chat, lembrando que se for um grupo ou lista de transmissão deve retorar os respectivos IDs |
| lastMessageTime | string | Timestamp com a data e hora da última interação com o chat |
| muteEndTime | string | Timestamp com a data e hora que a notificação vai ser reativada (-1 é para sempre) |
| isMuted     | string  | 0 ou 1 indica se você silênciou ou não este chat |
| isMarkedSpam | boolean | true ou false indica se você marcou este chat como spam |
| messagesUnread | integer | **descontinuado** |

Exemplo

```json
[
  {
    "archived": "false",
    "pinned": "true",
    "messagesUnread": 0,
    "phone": "5511999999999",
    "unread": "0",
    "name": "Z-API SUPORTE",
    "lastMessageTime": "1622991687",
    "isMuted": "0",
    "isMarkedSpam": "false"
  },
  {
    "archived": "false",
    "pinned": "true",
    "messagesUnread": 0,
    "phone": "5511999999999",
    "unread": "0",
    "name": "Z-api - Team",
    "lastMessageTime": "1622990503",
    "muteEndTime": 1655953774000,
    "isMuted": "0",
    "isMarkedSpam": "false"
  }
]
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-chats.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
