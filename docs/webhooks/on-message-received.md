---
id: on-message-received
title: Ao rececer
---

## Método

#### /

`PUT` https://

## Conceituação

:::caution Atenção

O Z-API não aceita webhooks que não sejam HTTPS

:::

---

## Exemplos

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Número de telefone, ou do grupo que enviou a mensagem. |
| participantPhone | string | Número de telefone do membro do grupo que enviou a mensagem. |
| messageId | string | Idetificador da mensagem na conversa. |
| status | string | Status que a mensagem se encontra no momento do envio (PENDING, SENT, RECEIVED, READ ou PLAYED). |
| referenceMessageId | string | Referência a mensagem que foi respondida para o caso da mensagem recebida ser uma resposta a uma mensagem da conversa. |
| momment | integer | Momento em que a mensagem foi recebida ou do erro. |
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

## Request Body

#### URL

`PUT` https://

#### Body

```json
{}
```

---

## Response

### 200

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/update-webhook-delivery.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
