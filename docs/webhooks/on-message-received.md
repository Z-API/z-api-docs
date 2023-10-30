---
id: on-message-received
title: Ao receber
---

## Conceituação

Esse é o webhook de retorno de mensagens recebidas, também é executada quando a sua instância está configurada para notificar também mensagens enviadas por você mesmo.

:::caution Qual o prazo de validade dos arquivos do z-api?

Todos os arquivos de midia recebidos do z-api através do seu webhook tem o prazo de expiração de **30 dias**. Após esse período todos os arquivos, seja audio, pdf, imagem, etc, serão excluídos do storage.

:::

:::caution Atenção

O Z-API não aceita webhooks que não sejam HTTPS

:::

---

## Atualizando Webhook

Para atualizar a rota do webhook é possível fazer isso pela API ou pelo painel administrativo.

### API

#### /update-webhook-received

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-webhook-received

#### Ou

Também é possível atualizar a rota com a opção "enviadas por mim" habilitada.

#### /update-webhook-received-delivery

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-webhook-received-delivery

![img](../../img/SendFromMe.jpeg)

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

#### Request Body

```json
{
  "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/receive"
}
```

---

### Painel Administrativo

![img](../../img/received.png)

---

## Retornos dos webhooks

Os possíveis retornos do webhook **on-message-received** estão cadastrado logo abaixo:

## Response

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| isStatusReply | boolean | Identifica se a mensagem recebida é uma resposta de status |
| senderLid | string | ID do contato no whatsapp |
| connectedPhone | string | Número de telefone conectado à API |
| waitingMessage | boolean | Identifica se a sua mensagem está com status de "Aguardando a mensagem" |
| isEdit | boolean | Identifica se a mensagem recebida foi editada |
| isGroup | boolean | Indica se o chat é um grupo |
| isNewsletter | boolean | Indica se o chat é um canal |
| phone | string | Número de telefone, ou do grupo que enviou a mensagem. |
| fromMe| boolean | Indica se a mensagem enviada partiu do número conectado a API |
| participantPhone | string | Número de telefone do membro do grupo que enviou a mensagem. |
| participantLid | string | ID do contado no whatsapp, do participante que enviou a mensagem dentro de um grupo|
| messageId | string | Idetificador da mensagem na conversa. |
| status | string | Status que a mensagem se encontra no momento do envio (PENDING, SENT, RECEIVED, READ ou PLAYED). |
| referenceMessageId | string | Referência a mensagem que foi respondida para o caso da mensagem recebida ser uma resposta a uma mensagem da conversa. |
| momment | integer | Momento em que a mensagem foi recebida ou do erro. |
| messageExpirationSeconds | integer | Tempo das mensagens temporárias |
| type | string | Tipo do evento da instância, nesse caso será "ReceivedCallBack". |
| photo | string | Url da foto do usuário que enviou a mensagem. |
| text.message | string | Texto da mensagem. |
| image.caption | string | Leganda da foto. |
| image.imageUrl | string | Url da foto. |
| image.thumbnailUrl | string | Url da thumbnail da foto. |
| image.mimeType | string | MimeType da imagem. |
| audio.mimeType | string | MimeType do áudio. |
| audio.audioUrl | string | Url do áudio. |
| video.caption | string | Legenda do vídeo. |
| video.videoUrl | string | Url do vídeo. |
| video.mimeType | string | MimeType do vídeo. |
| contact.displayName | string | Nome do contato. |
| contact.vCard | string | VCard contendo as informações do contato. |
| document.mimeType | string | MimeType do documento. |
| document.fileName | string | Nome do documento. |
| document.title | string | Título do documento. |
| document.pageCount | string | Número de páginas do documento. |
| document.thumbnailUrl | string | Url da thumbnail do documento. |
| document.documentUrl | string | Url do documento. |
| location.thumbnailUrl | string | Url da thumbnail da localização. |
| location.longitude | float | Longitude da localização. |
| location.latitude | float | Latitude da localização. |
| location.url | string | Url da localização. |
| location.name | string | Nome da localização. |
| location.address | string | Endereço da localização. |
| sticker.mimeType | string | MimeType do sticker. |
| sticker.stickerUrl | string | Url do sticker. |

---

### 200

### Exemplo de retorno de texto

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228638000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "text": {
    "message": "teste"
  },
}
```

### Exemplo de retorno de reação

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228955000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "reaction": {
    "value": "❤️",
    "time": 1651878681150,
    "reactionBy": "554499999999",
    "referencedMessage": {
      "messageId": "3EB0796DC6B777C0C7CD",
      "fromMe": true,
      "phone": "5544999999999",
      "participant": null
    }
  },
}
```

### Exemplo de retorno de texto (Lista de Botão)

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1634645380000,
  "status": "RECEIVED",
  "chatName": "Nome",
  "senderPhoto": "https://",
  "senderName": "Nome",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "referenceMessageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "forwarded": false,
  "type": "ReceivedCallback",
  "buttonsResponseMessage": {
    "buttonId": "1",
    "message": "Ótimo"
  },
}
```

### Exemplo de retorno de texto (Lista de Opcão)

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1634645683000,
  "status": "RECEIVED",
  "chatName": "Nome",
  "senderPhoto": "https://",
  "senderName": "Nome",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "referenceMessageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "forwarded": false,
  "type": "ReceivedCallback",
  "listResponseMessage": {
    "message": "Z-API Asas para sua imaginação",
    "title": "Z-API",
    "selectedRowId": "1"
  },
}
```

### Exemplo de retorno de texto vindos de anúncio

```json
{
    "isStatusReply": false,
    "senderLid": "81896604192873@lid",
    "connectedPhone": "554499999999",
    "waitingMessage": false,
    "isGroup": false,
    "isEdit": false,
    "isNewsletter": false,
    "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
    "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
    "phone": "5544999999999",
    "fromMe": false,
    "momment": NumberLong(1657209752000),
    "status": "RECEIVED",
    "chatName": "name",
    "senderPhoto": null,
    "senderName": "name",
    "photo": null,
    "broadcast": false,
    "externalAdReply": {
        "title": "Titulo",
        "body": "texto do anuncio",
        "mediaType": NumberInt(1),
        "thumbnailUrl": "https://",
        "sourceType": "ad",
        "sourceId": "23722824350495506",
        "sourceUrl": "https://",
        "containsAutoReply": false,
        "renderLargerThumbnail": true,
        "showAdAttribution": true
    },
    "messageExpirationSeconds": NumberInt(0),
    "forwarded": false,
    "type": "ReceivedCallback",
    "text": {
        "message": "mensagem recebida",
        "description": "texto do anuncio",
        "title": "titulo",
        "url": "https://",
        "thumbnailUrl": "https://"
    }
}
```

### Exemplo de retorno de foto

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228828000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "image": {
    "mimeType": "image/jpeg",
    "imageUrl": "https://",
    "thumbnailUrl": "https://",
    "caption": ""
  },
}
```

### Exemplo de retorno de áudio

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228849000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "audio": {
    "audioUrl": "https://",
    "mimeType": "audio/ogg; codecs=opus"
  },
}
```

### Exemplo de retorno de vídeo

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228889000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "video": {
    "videoUrl": "https://",
    "caption": "",
    "mimeType": "video/mp4"
  },
}
```

### Exemplo de retorno de PTV

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": true,
  "momment": 1688496074000,
  "status": "RECEIVED",
  "chatName": "eu",
  "senderPhoto": "https://",
  "senderName": "name",
  "photo": "https://",
  "broadcast": false,
  "participantPhone": "5544999999999",
  "messageExpirationSeconds": 0,
  "forwarded": true,
  "type": "ReceivedCallback",
  "video": {
    "videoUrl": "https://",
    "caption": "",
    "mimeType": "video/mp4"
  }
}
```

### Exemplo de retorno de contato

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228925000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "contact": {
    "displayName": "Cesar Baleco",
    "vCard": "BEGIN:VCARD\nVERSION:3.0\nN:;nome;;;\nFN:nome\nTEL;type=CELL;type=VOICE;waid=5544999999999:+55 44 9999-9999\nEND:VCARD",
    "phones": ["5544999999999"]
  },
}
```

### Exemplo de retorno de documento

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228955000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "document": {
    "documentUrl": "https://",
    "mimeType": "application/pdf",
    "title": "nome",
    "pageCount": 1,
    "fileName": "nome.pdf"
  },
}
```

### Exemplo de retorno de localização

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228970000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "location": {
    "longitude": -99.999999999999999,
    "latitude": -99.9999999999999999,
    "address": "",
    "url": ""
  },
}
```

### Exemplo de retorno de sticker

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228982000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "sticker": {
    "stickerUrl": "https://",
    "mimeType": "image/webp"
  },
}
```

### Exemplo de retorno de GIF

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228889000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "video": {
    "videoUrl": "https://",
    "caption": "",
    "mimeType": "video/mp4"
  },
}
```

### Exemplo de retorno de pagamento feito

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632229683000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "requestPayment": {
    "value": 1,
    "currencyCode": "BRL",
    "expiration": 1632834482000,
    "requestPhone": "5544999999999",
    "paymentInfo": {
      "receiverPhone": "5544999999999",
      "value": 1,
      "currencyCode": "BRL",
      "status": "WAITING",
      "transactionStatus": "COLLECT_SUCCESS"
    }
  },
}
```

### Exemplo de retorno de pedido de pagamento

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": true,
  "momment": 1632230332000,
  "status": "MESSAGE_RECEIVED",
  "chatName": "name",
  "senderName": "name",
  "participantPhone": "5544999999999",
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "notification": "PAYMENT_ACTION_REQUEST_DECLINED",
  "notificationParameters": ["5544999999999", "BRL", "1000"]
}
```

### Exemplo de retorno de recebimento de pagamento

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632230512000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "sendPayment": {
    "paymentInfo": {
      "receiverPhone": "5544999999999",
      "value": 1,
      "currencyCode": "BRL",
      "status": "COMPLETE",
      "transactionStatus": "SUCCESS"
    }
  },
}
```

### Exemplo de retorno de ligação recebida

```json
{  
    "isStatusReply": false,
    "senderLid": "81896604192873@lid",
    "connectedPhone": "554499999999",
    "waitingMessage": false,
    "isGroup": false,
    "isNewsletter": false,
    "isEdit": false,
    "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
    "messageId": "1679655074-84",
    "phone": "5544999999999",
    "fromMe": false,
    "momment": 1679661190000,
    "status": "RECEIVED",
    "chatName": "name",
    "senderPhoto": "https://",
    "senderName": "name",
    "photo": "https://",
    "broadcast": false,
    "referenceMessageId": null,
    "externalAdReply": null,
    "forwarded": false,
    "type": "ReceivedCallback",
    "notification": "CALL_VOICE",
    "notificationParameters": [],
    "callId": "F44E0E2011E7C784BB9A4AC11749C436"
}
```

### Exemplo de retorno de ligação perdida

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "1679655074-103",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1679661194000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "",
  "photo": "https://",
  "broadcast": false,
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "CALL_MISSED_VOICE",
  "notificationParameters": [],
  "callId": "F44E0E2011E7C784BB9A4AC11749C436"
}
```

### Exemplo de solicitação de entrada em grupo

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "464201093",
  "phone": "5544999999999-group",
  "fromMe": false,
  "momment": 1682017970000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "name",
  "photo": null,
  "broadcast": false,
  "participantPhone": "5544999999999",
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "MEMBERSHIP_APPROVAL_REQUEST",
  "notificationParameters": [
    "5544999999999"
  ],
  "callId": null
}
```

### Exemplo de retorno de produto

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632233527000,
  "status": "RECEIVED",
  "senderPhoto": "https://",
  "senderName": "5544999999999",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "product": {
    "productImage": "https://",
    "businessOwnerJid": "5544999999999",
    "currencyCode": "BRL",
    "productId": "99999999999999999999",
    "description": "",
    "productImageCount": 1,
    "price": 1,
    "url": "",
    "retailerId": "",
    "firstImageId": "",
    "title": "name"
  },
}
```

##

### Exemplo de retorno de carrinho

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632233527000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "name",
  "photo": "https://",
  "broadcast": false,
  "forwarded": false,
  "type": "ReceivedCallback",
  "order": {
    "itemCount": 1,
    "orderId": "422508169684569",
    "message": "",
    "orderTitle": "name",
    "sellerJid": "5544999999999",
    "thumbnailUrl": "https://",
    "token": "AR5d4yUr+DmSzeCR2kUtPEeMfS+eG0O+S/T/17B+oY1mfA==",
    "currency": "BRL",
    "total": 2000,
    "subTotal": 2000,
    "products": [
      {
        "quantity": 1,
        "name": "nameProduct",
        "productId": "5338924696127051",
        "retailerId": "1242",
        "price": 2000,
        "currencyCode": "BRL"
      }
    ]
  }
}
```

### Exemplo de retorno de enquete

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228638000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "poll": {
    "question": "Qual a melhor API de Whatsapp?",
    "options": [
      {
        "name": "Z-API"
      },
      {
        "name": "Outras"
      }
    ]
  },
 
}
```

### Exemplo de retorno de resposta de enquete

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228638000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": "se for grupo esse será o participante que respondeu",
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "pollVote": {
    "pollMessageId": "ID da mensagem de enquete que foi respondida",
    "options": [
      {
        "name": "Z-API"
      }
    ]
  },
}
```

### Exemplo de retorno de pedido

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1632228925000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "participantPhone": null,
  "participantLid": null,
  "photo": "https://",
  "broadcast": false,
  "type": "ReceivedCallback",
  "orders": [
    {
      "name": "review_order",
      "order": {
        "currency": "BRL",
        "referenceId": "4N8FCTW1WM6",
        "orderRequestId": "4N8FCTW22W4",
        "orderStatus": "processing",
        "paymentStatus": "paid",
        "total": 605,
        "subTotal": 600,
        "discount": 10,
        "shipping": 5,
        "tax": 10,
        "products": [
          {
            "name": "order 1",
            "quantity": 2,
            "isCustomItem": true,
            "productId": "custom-item-4N8FCTW23N7",
            "value": 150
          },
          {
            "name": "order 2",
            "quantity": 2,
            "isCustomItem": false,
            "productId": "23940797548900636",
            "value": 150
          }
        ]
      }
    }
  ]
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou PUT conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Notification Response

### Conceituação

As notificações são mensagens de WhatsApp que se baseiam em modelos de mensagens prévias do WhatsApp.

Posto dessa forma, aqui estão documentadas as notificações que recebemos, caso não queira receber essas notificações é necessário ignorar a mensagem quando ela chegar com o atributo notification.

### Exemplos

```json
case 'MEMBERSHIP_APPROVAL_REQUEST':
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Participante " + valor2.notificationparameters + " solicitou participar do grupo<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case 'GROUP_PARTICIPANT_LEAVE':
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Participante " + valor2.notificationparameters + " saiu do grupo!<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case 'E2E_ENCRYPTED':
// code block
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>As mensagens são protegidas com a criptografia<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case 'GROUP_CREATE':
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Criou o grupo \'" + valor2.notificationparameters + "\'<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case 'GROUP_PARTICIPANT_ADD':
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Participante " + valor2.notificationparameters + " adicionado.<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case "CALL_MISSED_VOICE":
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Chamada de voz perdida!<br><br></span>" + campohora + "</div></div>"
break
```

```json
case "CALL_MISSED_VIDEO":
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Chamada de vídeo perdida!<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case 'GROUP_PARTICIPANT_REMOVE':
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Participante " + valor2.notificationparameters + " foi removido.<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case "CIPHERTEXT":
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>As mensagens são protegidas com a criptografia de ponta.<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case "BLUE_MSG_SELF_PREMISE_UNVERIFIED":
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Você está conversando com uma conta comercial, mas ainda não foi confirmada pelo WhatsApp.<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case "BLUE_MSG_SELF_PREMISE_VERIFIED":
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Você está conversando com uma conta comercial verificada pelo WhatsApp.<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case "BIZ_MOVE_TO_CONSUMER_APP":
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Esta conta comercial agora está registrada como uma conta pessoal e pode não mais pertencer a uma empresa.<br><br></span>" + campohora + "</div></div>"
break;
```

```json
case "REVOKE":
campo_html = "<div align='center'><div class='alert alert-primary' role='alert'><span>Apagou uma mensagem.<br><br></span>" + campohora + "</div></div>"
break;
```

<!-- ## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/on-message-received.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe> -->
