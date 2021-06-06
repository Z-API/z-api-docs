---
id: get-metadata-chat
title: Pega Metadata do Chat
---

## Método

#### /chat/{phone}

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chat/{phone}

---

## Conceituação

Este método é reponsavel por retornar as informações do metadata de um chat.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone do destinatário no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL exemplo

Método

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chat/5511999999999

---

## Response

### 200

| Atributos | Tipo | Descrição |
| :-- | :-- | :-- |
| phone | string | Phone do contato |
| unread | string | indica o numero de mensagens não lidas em um chat |
| lastMessageTime | string | Timestamp com a data e hora da ultima ingeração com o chat |
| isMuted | string | 0 ou 1 indica se você silênciou ou não este chat |
| isMarkedSpam | boolean | true ou false indica se você marcou este chat como spam |
| profileThumbnail | string | URL da foto do chat **o Whatsapp apaga após 48h** |
| messagesUnread | integer | **descontinuado** |

Exemplo

```json
{
  "phone": "5511999999999",
  "unread": "0",
  "lastMessageTime": "1619461666",
  "isMuted": "0",
  "isMarkedSpam": "false",
  "profileThumbnail": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
  "messagesUnread": 0
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-metada-chat.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
