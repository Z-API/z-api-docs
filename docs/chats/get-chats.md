---
id: get-chats
title: Pegar chats
---

## Método

#### /chats

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chats

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
| name | string | **Nome ** atribudo ao chat, lembrando que se for um grupo ou lista de transmissão deve retorar os respectivos IDs |
| phone | string | Phone do contato |
| unread | string | indica o numero de mensagens não lidas em um chat |
| lastMessageTime | string | Timestamp com a data e hora da última interação com o chat |
| isMuted | string | 0 ou 1 indica se você silênciou ou não este chat |
| isMarkedSpam | boolean | true ou false indica se você marcou este chat como spam |
| profileThumbnail | string | URL da foto do chat **o Whatsapp apaga após 48h** |
| messagesUnread | integer | **descontinuado** |

Exemplo

```json
[
  {
    "name": "Z-API SUPORTE",
    "phone": "5511999999999",
    "unread": "0",
    "lastMessageTime": "1622991687",
    "isMuted": "0",
    "isMarkedSpam": "false",
    "profileThumbnail": null,
    "messagesUnread": 0
  },
  {
    "name": "Z-api - Team",
    "phone": "5511999999999",
    "unread": "0",
    "lastMessageTime": "1622990503",
    "isMuted": "0",
    "isMarkedSpam": "false",
    "profileThumbnail": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "messagesUnread": 0
  }
]
```

### 405

Neste caso certifique que esteja enviando corretamente a especificação do método, ou seja, verifique se você enviou o POST ou GET conforme especificado no início deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-chats.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
