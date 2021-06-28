---
id: get-message-chats
title: Pegar mensagens do chat
---

## Método

#### /chat-messages/{phone}

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chat-messages/{phone}

---

## Conceituação

Este método é reponsavel por retornar todas conversas de um chat.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone do destinatário no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| amount | integer | Quantidade de mensagens que deseja buscar, é recomendado que você busque de 10 em 10 mensagens para que sua aplicação não fique muito lenta. |
| lastMessageId | string | messageId da ultima mensagem que você buscou |

### Opcionais

| Atributos | Tipo | Descrição |
| :-------- | :--: | :-------- |
|           |      |           |

---

## Request Params

#### URL exemplo

Método

`GET` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/chat-messages/{phone}

---

## Response

### 200

| Atributos | Tipo | Descrição |
| :-------- | :--- | :-------- |

Cada tipo de mensagem tem um tipo de atributo diferente no exemplo abaixo vamos mostrar alguns deles.

Exemplo

Segue Json conforme sequência abaixo:

- Texto Simples
- Imagem
- Documento
- Contato
- Emoji
- Link

```json
[
  {
    "instanceId": "399793F5C962B0F227576EA28507E212",
    "messageId": "3EB02A5A36C0103F231A",
    "phone": "5511999999999",
    "fromMe": false,
    "momment": 1623008318000,
    "status": "RECEIVED",
    "chatName": "Z-API Suporte",
    "senderPhoto": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "senderName": "5511999999999",
    "participantPhone": null,
    "photo": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "broadcast": false,
    "text": {
      "message": "Uma mensagem de texto simples"
    }
  },
  {
    "instanceId": "399793F5C962B0F227576EA28507E212",
    "messageId": "3EB09E1F42DCBF393D27",
    "phone": "5511999999999",
    "fromMe": false,
    "momment": 1623008355000,
    "status": "RECEIVED",
    "chatName": "Z-API Suporte",
    "senderPhoto": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "senderName": "Z-API Suporte",
    "participantPhone": null,
    "photo": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "broadcast": false,
    "image": {
      "mimeType": "image/jpeg",
      "imageUrl": "https://storage.z-api.io/instances/399793F5C962B0F227576EA28507E212/3EB09E1F42DCBF393D27.jpeg",
      "thumbnailUrl": "https://storage.z-api.io/instances/399793F5C962B0F227576EA28507E212/3EB09E1F42DCBF393D27.jpeg",
      "caption": "Uma imagem com texto"
    }
  },
  {
    "instanceId": "399793F5C962B0F227576EA28507E212",
    "messageId": "3EB0282CF7A8FE6E3404",
    "phone": "5511999999999",
    "fromMe": false,
    "momment": 1623008445000,
    "status": "RECEIVED",
    "chatName": "Z-API Suporte",
    "senderPhoto": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "senderName": "Z-API Suporte",
    "participantPhone": null,
    "photo": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "broadcast": false,
    "document": {
      "documentUrl": "https://storage.z-api.io/instances/399793F5C962B0F227576EA28507E212/3EB0282CF7A8FE6E3404.pdf",
      "mimeType": "application/pdf",
      "title": "Personalidade “Virtuoso” (ISTP-A _ ISTP-T) _ 16Personalities.pdf",
      "pageCount": 5,
      "fileName": "Personalidade “Virtuoso” (ISTP-A _ ISTP-T) _ 16Personalities.pdf"
    }
  },
  {
    "instanceId": "399793F5C962B0F227576EA28507E212",
    "messageId": "3EB0026521003277F45C",
    "phone": "5511999999999",
    "fromMe": false,
    "momment": 1623008464000,
    "status": "RECEIVED",
    "chatName": "Z-API Suporte",
    "senderPhoto": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "senderName": "Z-API Suporte",
    "participantPhone": null,
    "photo": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "broadcast": false,
    "contact": {
      "displayName": "Z-api - Atendimento",
      "vCard": "BEGIN:VCARD\nVERSION:3.0\nN:;Z-api - Atendimento;;;\nFN:Z-api - Atendimento\nTEL;type=CELL;waid=554498398733:+55 44 9839-8733\nX-WA-BIZ-NAME:Z-api - Atendimento\nX-WA-BIZ-DESCRIPTION:Whatsapp para programadores!\nEND:VCARD",
      "phones": ["554498398733"]
    }
  },
  {
    "instanceId": "399793F5C962B0F227576EA28507E212",
    "messageId": "3EB0A813A6589892EFA4",
    "phone": "5511999999999",
    "fromMe": false,
    "momment": 1623008479000,
    "status": "RECEIVED",
    "chatName": "Z-API Suporte",
    "senderPhoto": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "senderName": "Z-API Suporte",
    "participantPhone": null,
    "photo": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "broadcast": false,
    "text": {
      "message": "🚀"
    }
  },
  {
    "instanceId": "399793F5C962B0F227576EA28507E212",
    "messageId": "3EB030C85D53F100A660",
    "phone": "5511999999999",
    "fromMe": false,
    "momment": 1623008501000,
    "status": "RECEIVED",
    "chatName": "Z-API Suporte",
    "senderPhoto": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "senderName": "Z-API Suporte",
    "participantPhone": null,
    "photo": "https://pps.whatsapp.net/v/t61.24694-24/170931400_212202650511993_3423338295209291992_n.jpg?ccb=11-4&oh=4b96b3bf7114122667f80d021b194f2c&oe=60C179E2",
    "broadcast": false,
    "text": {
      "message": "https://www.z-api.io/",
      "url": "https://www.z-api.io/",
      "urlDescription": null,
      "urlTitle": "Whatsapp API: Integre sua empresa | Z-API",
      "isCatalog": false
    }
  }
]
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/get-message-chat.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
