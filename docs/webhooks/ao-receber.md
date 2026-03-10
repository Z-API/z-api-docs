---
id: ao-receber
title: 'Evento: Ao Receber Mensagem'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Webhook: Ao Receber uma Mensagem

Este é o webhook mais importante para criar automações interativas. Ele é acionado **toda vez que sua instância recebe uma nova mensagem** de um contato.

Use este evento para acionar chatbots, sistemas de suporte, salvar informações em CRMs, enviar respostas automáticas e muito mais.

:::info Prazo de Validade dos Arquivos

Todos os arquivos de mídia recebidos do Z-API através do seu webhook têm o prazo de expiração de **30 dias**. Após esse período todos os arquivos, seja áudio, PDF, imagem, etc, serão excluídos do storage.

:::

:::caution Atenção

O Z-API não aceita webhooks que não sejam HTTPS.

:::

---

## Atualizando Webhook {#atualizando-webhook}

Para atualizar a rota do webhook é possível fazer isso pela API ou pelo painel administrativo.

:::tip Dica

É possível alterar todos os webhooks de uma vez para a mesma URL. Veja o endpoint [Atualizar Todos os Webhooks](/docs/webhooks/atualizar-todos).

:::

### API

#### `/update-webhook-received`

```http
PUT https://api.z-api.io/instances/{instanceId}/token/{token}/update-webhook-received
```

Também é possível atualizar a rota com a opção "enviadas por mim" habilitada:

#### `/update-webhook-received-delivery`

```http
PUT https://api.z-api.io/instances/{instanceId}/token/{token}/update-webhook-received-delivery
```

### Headers

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `Client-Token` | string | Sim | [Token de segurança da conta](/docs/security/token-seguranca) |
| `Content-Type` | string | Sim | Deve ser `application/json` |

### Request Body

```json
{
  "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/receive"
}
```

### Painel Administrativo

Você também pode atualizar o webhook através do painel administrativo do Z-API nas configurações da instância.

---

## Os 3 Campos Essenciais

Quando você recebe uma nova mensagem, o webhook envia um pacote de dados (payload) em formato JSON. Para a maioria das automações, você se concentrará nestes três campos principais:

1. `phone`: O número de telefone de **quem enviou** a mensagem.
2. `message`: O **conteúdo** da mensagem.
3. `type`: O **tipo** de mensagem (texto, imagem, áudio, etc.).

Com essas três informações, você pode decidir como sua automação deve reagir.

---

## Para Usuários No-Code

Em sua ferramenta de automação (n8n, Make, etc.), o nó de gatilho de webhook receberá os dados da mensagem. O caminho para acessar o texto da mensagem, por exemplo, geralmente será algo como:

`{{ $json.data.message.text }}`

Você pode usar este valor para criar lógicas e respostas.

**Exemplo de fluxo simples:**

1. **Gatilho (Webhook):** Recebe a mensagem.
2. **Nó "IF" (Condicional):**
 - **Se** o campo `text` da mensagem contiver a palavra "ajuda",
 - **Então** envie uma mensagem de texto com o menu de opções.
3. **Nó "Google Sheets":**
 - Pegue os valores de `phone` e `text` do gatilho e os adicione a uma nova linha em uma planilha para registrar o contato.

---

## Para Desenvolvedores

O evento disparado é o `message`. Abaixo está a estrutura do payload que seu endpoint receberá.

### Estrutura do Payload

O objeto `data` contém todas as informações sobre a mensagem recebida.

```json
{
 "event": "message",
 "instanceId": "3C3F8E5F4A2B1C9D",
 "data": {
 "messageId": "3EB0C767F26A",
 "phone": "5511999999999",
 "fromMe": false,
 "message": {
 "text": "Olá! Gostaria de mais informações.",
 "type": "text"
 },
 "timestamp": 1704110400
 }
}
```

#### O Objeto `data`

| Campo | Tipo | Descrição |
|:---------- |:------ |:----------------------------------------------------------------------- |
| `messageId` | string | O ID único da mensagem recebida. |
| `phone` | string | O número de telefone do remetente. |
| `fromMe` | boolean | Será `false` para mensagens recebidas. Use para ignorar ecos. |
| `message` | object | O objeto que contém o conteúdo e o tipo da mensagem. |
| `timestamp` | number | O timestamp (em segundos) de quando a mensagem foi recebida. |

---

## Retornos dos Webhooks {#retornos-dos-webhooks}

O webhook `on-message-received` pode retornar atributos adicionais além dos campos básicos. Abaixo está a tabela completa de atributos possíveis:

### Atributos do Payload `data`

A tabela abaixo lista todos os atributos possíveis retornados pelo webhook `on-message-received`:

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `isStatusReply` | boolean | Identifica se a mensagem recebida é uma resposta de status |
| `senderLid` | string | ID do contato no WhatsApp |
| `connectedPhone` | string | Número de telefone conectado à API |
| `waitingMessage` | boolean | Identifica se a sua mensagem está com status de "Aguardando a mensagem" |
| `isEdit` | boolean | Identifica se a mensagem recebida foi editada |
| `isGroup` | boolean | Indica se o chat é um grupo |
| `isNewsletter` | boolean | Indica se o chat é um canal |
| `phone` | string | Número de telefone, ou do grupo que enviou a mensagem |
| `fromMe` | boolean | Indica se a mensagem enviada partiu do número conectado a API |
| `participantPhone` | string | Número de telefone do membro do grupo que enviou a mensagem |
| `participantLid` | string | ID do contato no WhatsApp, do participante que enviou a mensagem dentro de um grupo |
| `messageId` | string | Identificador da mensagem na conversa |
| `status` | string | Status que a mensagem se encontra no momento do envio (PENDING, SENT, RECEIVED, READ ou PLAYED) |
| `referenceMessageId` | string | Referência a mensagem que foi respondida para o caso da mensagem recebida ser uma resposta a uma mensagem da conversa |
| `momment` | integer | Momento em que a mensagem foi recebida ou do erro |
| `messageExpirationSeconds` | integer | Tempo das mensagens temporárias |
| `requestMethod` | string | Identificador do método de solicitação de entrada (invite_link ou non_admin_add) |
| `type` | string | Tipo do evento da instância, nesse caso será "ReceivedCallBack" |
| `photo` | string | Url da foto do usuário que enviou a mensagem |
| `chatName` | string | Nome do chat |
| `chatLid` | string | ID do chat no formato LID (Linked ID) |
| `senderPhoto` | string | URL da foto do remetente |
| `senderName` | string | Nome do remetente |
| `broadcast` | boolean | Indica se a mensagem foi enviada em broadcast |
| `forwarded` | boolean | Indica se a mensagem foi reencaminhada |
| `fromApi` | boolean | Indica se a mensagem foi enviada pela API |
| `viewOnce` | boolean | Indica se a mensagem é de visualização única |
| `expiresAt` | integer \| null | Timestamp de expiração da mensagem (se aplicável) |
| `code` | string \| null | Código relacionado à notificação (se aplicável) |
| `callId` | string \| null | ID da chamada (se aplicável) |
| `notification` | string | Tipo de notificação (se aplicável) |
| `notificationParameters` | array | Parâmetros da notificação (se aplicável) |
| `profileName` | string | Nome do perfil atualizado (quando `notification` é `PROFILE_NAME_UPDATED`) |
| `updatedPhoto` | string | URL da foto atualizada (quando `notification` é `PROFILE_PICTURE_UPDATED`) |
| `text.message` | string | Texto da mensagem |
| `text.description` | string | Descrição opcional da mensagem |
| `text.title` | string | Título opcional da mensagem |
| `text.url` | string | URL opcional ligada à mensagem |
| `text.thumbnailUrl` | string | URL da thumbnail opcional |
| `image.caption` | string | Legenda da foto |
| `image.imageUrl` | string | URL da foto |
| `image.thumbnailUrl` | string | URL da thumbnail da foto |
| `image.mimeType` | string | MimeType da imagem |
| `image.width` | integer | Largura da imagem |
| `image.height` | integer | Altura da imagem |
| `image.viewOnce` | boolean | Indica se a imagem é de visualização única |
| `audio.mimeType` | string | MimeType do áudio |
| `audio.audioUrl` | string | URL do áudio |
| `audio.ptt` | boolean | Indica se é uma mensagem de voz (push-to-talk) |
| `audio.seconds` | integer | Duração do áudio em segundos |
| `audio.viewOnce` | boolean | Indica se o áudio é de visualização única |
| `video.caption` | string | Legenda do vídeo |
| `video.videoUrl` | string | URL do vídeo |
| `video.mimeType` | string | MimeType do vídeo |
| `video.seconds` | integer | Duração do vídeo em segundos |
| `video.width` | integer | Largura do vídeo |
| `video.height` | integer | Altura do vídeo |
| `video.viewOnce` | boolean | Indica se o vídeo é de visualização única |
| `contact.displayName` | string | Nome do contato |
| `contact.vCard` | string | VCard contendo as informações do contato |
| `contact.phones` | array | Array de números de telefone do contato |
| `document.mimeType` | string | MimeType do documento |
| `document.fileName` | string | Nome do documento |
| `document.title` | string | Título do documento |
| `document.pageCount` | string | Número de páginas do documento |
| `document.thumbnailUrl` | string | URL da thumbnail do documento |
| `document.documentUrl` | string | URL do documento |
| `location.thumbnailUrl` | string | URL da thumbnail da localização |
| `location.longitude` | float | Longitude da localização |
| `location.latitude` | float | Latitude da localização |
| `location.url` | string | URL da localização |
| `location.name` | string | Nome da localização |
| `location.address` | string | Endereço da localização |
| `sticker.mimeType` | string | MimeType do sticker |
| `sticker.stickerUrl` | string | URL do sticker |
| `reaction.value` | string | Emoji da reação |
| `reaction.time` | integer | Timestamp da reação |
| `reaction.reactionBy` | string | Número de quem reagiu |
| `reaction.referencedMessage` | object | Mensagem referenciada pela reação |
| `buttonsResponseMessage.buttonId` | string | ID do botão clicado |
| `buttonsResponseMessage.message` | string | Texto do botão clicado |
| `listResponseMessage.message` | string | Mensagem da lista |
| `listResponseMessage.title` | string | Título da lista |
| `listResponseMessage.selectedRowId` | string | ID da linha selecionada |
| `carouselMessage.text` | string | Texto do carrossel |
| `carouselMessage.cards` | array | Array de cards do carrossel |
| `hydratedTemplate.header` | object | Cabeçalho do template (pode conter image, video, document, location) |
| `hydratedTemplate.message` | string | Mensagem do template |
| `hydratedTemplate.footer` | string | Rodapé do template |
| `hydratedTemplate.title` | string | Título do template |
| `hydratedTemplate.templateId` | string | ID do template |
| `hydratedTemplate.hydratedButtons` | array | Array de botões do template |
| `pixKeyMessage.currency` | string | Moeda (ex: "BRL") |
| `pixKeyMessage.referenceId` | string | ID de referência |
| `pixKeyMessage.key` | string | Chave PIX |
| `pixKeyMessage.keyType` | string | Tipo da chave PIX (ex: "EVP") |
| `pixKeyMessage.merchantName` | string | Nome do comerciante |
| `buttonsMessage.imageUrl` | string | URL da imagem (se aplicável) |
| `buttonsMessage.videoUrl` | string | URL do vídeo (se aplicável) |
| `buttonsMessage.message` | string | Texto da mensagem |
| `buttonsMessage.buttons` | array | Array de botões |
| `poll.question` | string | Pergunta da enquete |
| `poll.pollMaxOptions` | integer | Número máximo de opções por pessoa |
| `poll.options` | array | Array de opções da enquete |
| `pollVote.pollMessageId` | string | ID da mensagem de enquete que foi respondida |
| `pollVote.options` | array | Array de opções selecionadas |
| `product.productImage` | string | URL da imagem do produto |
| `product.businessOwnerJid` | string | JID do dono do negócio |
| `product.currencyCode` | string | Código da moeda |
| `product.productId` | string | ID do produto |
| `product.description` | string | Descrição do produto |
| `product.productImageCount` | integer | Número de imagens do produto |
| `product.price` | integer | Preço do produto |
| `product.url` | string | URL do produto |
| `product.retailerId` | string | ID do varejista |
| `product.firstImageId` | string | ID da primeira imagem |
| `product.title` | string | Título do produto |
| `order.itemCount` | integer | Número de itens no pedido |
| `order.orderId` | string | ID do pedido |
| `order.message` | string | Mensagem do pedido |
| `order.orderTitle` | string | Título do pedido |
| `order.sellerJid` | string | JID do vendedor |
| `order.thumbnailUrl` | string | URL da thumbnail |
| `order.token` | string | Token do pedido |
| `order.currency` | string | Moeda |
| `order.total` | integer | Total do pedido |
| `order.subTotal` | integer | Subtotal do pedido |
| `order.products` | array | Array de produtos do pedido |
| `reviewAndPay.type` | string | Tipo de pedido (ex: "physical-goods") |
| `reviewAndPay.currency` | string | Moeda |
| `reviewAndPay.referenceId` | string | ID de referência |
| `reviewAndPay.orderRequestId` | string | ID da solicitação de pedido |
| `reviewAndPay.orderStatus` | string | Status do pedido |
| `reviewAndPay.paymentStatus` | string | Status do pagamento |
| `reviewAndPay.total` | integer | Total |
| `reviewAndPay.subTotal` | integer | Subtotal |
| `reviewAndPay.discount` | integer | Desconto |
| `reviewAndPay.shipping` | integer | Frete |
| `reviewAndPay.tax` | integer | Imposto |
| `reviewAndPay.products` | array | Array de produtos |
| `reviewOrder.currency` | string | Moeda |
| `reviewOrder.referenceId` | string | ID de referência |
| `reviewOrder.orderRequestId` | string | ID da solicitação de pedido |
| `reviewOrder.orderStatus` | string | Status do pedido |
| `reviewOrder.paymentStatus` | string | Status do pagamento |
| `reviewOrder.total` | integer | Total |
| `reviewOrder.subTotal` | integer | Subtotal |
| `reviewOrder.discount` | integer | Desconto |
| `reviewOrder.shipping` | integer | Frete |
| `reviewOrder.tax` | integer | Imposto |
| `reviewOrder.products` | array | Array de produtos |
| `newsletterAdminInvite.newsletterId` | string | ID do canal |
| `newsletterAdminInvite.newsletterName` | string | Nome do canal |
| `newsletterAdminInvite.text` | string | Texto do convite |
| `newsletterAdminInvite.inviteExpiration` | integer | Timestamp de expiração do convite |
| `pinMessage.action` | string | Ação (ex: "pin") |
| `pinMessage.pinDurationInSecs` | integer | Duração do fixamento em segundos |
| `pinMessage.referencedMessage` | object | Mensagem referenciada |
| `event.name` | string | Nome do evento |
| `event.description` | string | Descrição do evento |
| `event.canceled` | boolean | Indica se o evento foi cancelado |
| `event.joinLink` | string | Link para participar do evento |
| `event.scheduleTime` | integer | Timestamp agendado do evento |
| `event.location` | object | Localização do evento |
| `eventResponse.response` | string | Resposta (ex: "GOING", "NOT_GOING", "MAYBE") |
| `eventResponse.responseFrom` | string | Número de quem respondeu |
| `eventResponse.time` | integer | Timestamp da resposta |
| `eventResponse.referencedMessage` | object | Mensagem referenciada |
| `externalAdReply.title` | string | Título do anúncio |
| `externalAdReply.body` | string | Corpo do anúncio |
| `externalAdReply.mediaType` | integer | Tipo de mídia |
| `externalAdReply.thumbnailUrl` | string | URL da thumbnail |
| `externalAdReply.sourceType` | string | Tipo de fonte |
| `externalAdReply.sourceId` | string | ID da fonte |
| `externalAdReply.ctwaClid` | string | CTWA Client ID |
| `externalAdReply.sourceUrl` | string | URL da fonte |
| `externalAdReply.containsAutoReply` | boolean | Indica se contém resposta automática |
| `externalAdReply.renderLargerThumbnail` | boolean | Indica se deve renderizar thumbnail maior |
| `externalAdReply.showAdAttribution` | boolean | Indica se deve mostrar atribuição do anúncio |
| `requestPayment.value` | integer | Valor do pagamento |
| `requestPayment.currencyCode` | string | Código da moeda |
| `requestPayment.expiration` | integer | Timestamp de expiração |
| `requestPayment.requestPhone` | string | Número que solicitou o pagamento |
| `requestPayment.paymentInfo` | object | Informações do pagamento |
| `sendPayment.paymentInfo` | object | Informações do pagamento enviado |
| `statusImage.imageUrl` | string | URL da imagem do status |
| `statusImage.thumbnailUrl` | string | URL da thumbnail do status |
| `statusImage.caption` | string | Legenda |
| `statusImage.mimetype` | string | MimeType |
| `statusImage.viewOnce` | boolean | Indica se é de visualização única |
| `statusImage.width` | integer | Largura |
| `statusImage.height` | integer | Altura |

### Exemplo de Payload Completo

Abaixo está um exemplo completo de payload JSON com todos os atributos possíveis:

```json
{
  "event": "message",
  "instanceId": "3C3F8E5F4A2B1C9D",
  "data": {
    "messageId": "3EB0C767F26A",
    "phone": "5511999999999",
    "fromMe": false,
    "message": {
      "text": "Olá! Gostaria de mais informações.",
      "type": "text"
    },
    "timestamp": 1704110400,
    "isStatusReply": false,
    "senderLid": "12036312345678901234",
    "connectedPhone": "5511888888888",
    "waitingMessage": false,
    "isEdit": false,
    "isGroup": false,
    "isNewsletter": false,
    "participantPhone": null
  }
}
```

### Exemplo de Payload em Grupo

Quando a mensagem é recebida em um grupo, o payload inclui informações adicionais:

```json
{
  "event": "message",
  "instanceId": "3C3F8E5F4A2B1C9D",
  "data": {
    "messageId": "3EB0C767F26A",
    "phone": "12036312345678901234@g.us",
    "fromMe": false,
    "message": {
      "text": "Mensagem do grupo",
      "type": "text"
    },
    "timestamp": 1704110400,
    "isStatusReply": false,
    "senderLid": "12036312345678901234",
    "connectedPhone": "5511888888888",
    "waitingMessage": false,
    "isEdit": false,
    "isGroup": true,
    "isNewsletter": false,
    "participantPhone": "5511999999999"
  }
}
```

:::tip Dica

- Use `isGroup` para identificar se precisa processar a mensagem de forma diferente (ex: mencionar o participante em grupos)
- O campo `participantPhone` só estará presente quando `isGroup` for `true`
- Use `fromMe` para filtrar mensagens que você mesmo enviou e evitar loops de processamento
- O campo `isEdit` pode ser útil para rastrear quando mensagens foram modificadas após o envio

:::

### O Objeto `message`

O conteúdo do objeto `message` varia de acordo com o `type` da mensagem.

<Tabs>
<TabItem value="text" label="Texto" default>

```json
{
 "message": {
 "type": "text",
 "text": "Este é o conteúdo da mensagem."
 }
}
```

</TabItem>
<TabItem value="image" label="Imagem">

```json
{
 "message": {
 "type": "image",
 "url": "https://url.da.imagem/aqui.jpg",
 "caption": "Esta é a legenda da imagem."
 }
}
```
:::tip Dica
A `url` da mídia é temporária. Faça o download do arquivo imediatamente se precisar armazená-lo.
:::

</TabItem>
<TabItem value="button" label="Resposta de Botão">

```json
{
 "message": {
 "type": "buttons_response",
 "buttonId": "id_do_botao_clicado",
 "buttonText": "Texto do Botão Clicado"
 }
}
```

</TabItem>
<TabItem value="list" label="Resposta de Lista">

```json
{
 "message": {
 "type": "list_response",
 "selectedRowId": "id_da_linha_selecionada"
 }
}
```

</TabItem>
</Tabs>

---

## Exemplos de Retorno por Tipo de Mensagem {#exemplos-de-retorno-por-tipo}

Abaixo estão exemplos completos de payloads JSON retornados pelo webhook `on-message-received` para diferentes tipos de mensagens. Estes exemplos mostram a estrutura completa do payload conforme retornado pela API Z-API.

### Exemplo de Retorno de Texto

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
    "message": "teste",
    "descritpion": "(opcional) em caso da mensagem possuir uma descrição inserida pelo WhatsApp",
    "title": "(opcional) em caso da mensagem possuir um título inserido pelo WhatsApp",
    "url": "(opcional) caso a mensagem possua um link ligado a ela. Exemplo: mensagem de catálogo possui um botão 'Ver catálogo'",
    "thumbnailUrl": "(opcional) caso a mensagem possua uma imagem de thumbnail ligada a ela. Exemplo: mensagem de convite de grupo possui a imagem do grupo"
  }
}
```

### Exemplo de Retorno de Template de Texto

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "702CC5F7E0A6BF4421",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1708457193876,
  "status": "RECEIVED",
  "chatName": "Test Number",
  "senderPhoto": null,
  "senderName": "5544999999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "hydratedTemplate": {
    "header": {},
    "message": "texto da mensagem",
    "footer": "rodapé da mensagem",
    "title": "título da mensagem",
    "templateId": "790118069824606",
    "hydratedButtons": []
  }
}
```

### Exemplo de Retorno de Reação

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
  }
}
```

### Exemplo de Retorno de Texto (Lista de Botão)

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
  }
}
```

### Exemplo de Retorno de Template de Botão OTP

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "9D968A5FA2880508C4",
  "phone": "554499999999",
  "fromMe": false,
  "momment": 1708455444850,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "554499999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "hydratedTemplate": {
    "header": {},
    "message": "texto da mensagem",
    "footer": "",
    "title": "",
    "templateId": "",
    "hydratedButtons": [
      {
        "urlButton": {
          "displayText": "Copiar código",
          "url": "https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=otp123"
        },
        "index": 0
      }
    ]
  }
}
```

### Exemplo de Retorno de Botão de Chave PIX

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "9D968A5FA2880508C4",
  "phone": "554499999999",
  "fromMe": false,
  "momment": 1708455444850,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "554499999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "pixKeyMessage": {
    "currency": "BRL",
    "referenceId": "4PXRAHSIRDA",
    "key": "pixkey",
    "keyType": "EVP",
    "merchantName": "Pix"
  }
}
```

### Exemplo de Retorno de Botão com Imagem

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "9D968A5FA2880508C4",
  "phone": "554499999999",
  "fromMe": false,
  "momment": 1708455444850,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "554499999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "buttonsMessage": {
    "imageUrl": "URL da imagem",
    "videoUrl": null,
    "message": "Texto da mensagem",
    "buttons": [
      {
        "buttonId": "1",
        "type": 1,
        "buttonText": {
          "displayText": "Texto do botão 1"
        }
      },
      {
        "buttonId": "2",
        "type": 1,
        "buttonText": {
          "displayText": "Texto do botão 2"
        }
      }
    ]
  }
}
```

### Exemplo de Retorno de Botão com Vídeo

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "9D968A5FA2880508C4",
  "phone": "554499999999",
  "fromMe": false,
  "momment": 1708455444850,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "554499999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "buttonsMessage": {
    "imageUrl": null,
    "videoUrl": "URL do video",
    "message": "Texto da mensagem",
    "buttons": [
      {
        "buttonId": "1",
        "type": 1,
        "buttonText": {
          "displayText": "Texto do botão 1"
        }
      },
      {
        "buttonId": "2",
        "type": 1,
        "buttonText": {
          "displayText": "Texto do botão 2"
        }
      }
    ]
  }
}
```

### Exemplo de Retorno de Texto (Lista de Opção)

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
  }
}
```

### Exemplo de Retorno de Carrossel

```json
{
  "isStatusReply": false,
  "chatLid": null,
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "554499999999",
  "fromMe": true,
  "momment": 1739368022130,
  "status": "SENT",
  "chatName": "Nome",
  "senderPhoto": null,
  "senderName": "Nome",
  "photo": "https://",
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": true,
  "carouselMessage": {
    "text": "Texto da mensagem",
    "cards": [
      {
        "header": {
          "image": {
            "imageUrl": "https://",
            "thumbnailUrl": "https://",
            "caption": "",
            "mimeType": "image/jpeg",
            "viewOnce": false,
            "width": 0,
            "height": 0
          }
        },
        "message": "Mensagem do cartão do carrosel",
        "footer": "",
        "title": "",
        "hydratedButtons": [
          {
            "index": 0,
            "urlButton": {
              "displayText": "Texto do botão",
              "url": "https://"
            }
          },
          {
            "index": 1,
            "quickReplyButton": {
              "displayText": "Texto do botão",
              "id": "2"
            }
          }
        ]
      }
    ]
  }
}
```

### Exemplo de Retorno de Texto Vindo de Anúncio

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
  "momment": 1657209752000,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "name",
  "photo": null,
  "broadcast": false,
  "externalAdReply": {
    "title": "Titulo",
    "body": "texto do anuncio",
    "mediaType": 1,
    "thumbnailUrl": "https://",
    "sourceType": "ad",
    "sourceId": "23722824350495506",
    "ctwaClid": "Aff-niaAw7V94N8LGd79Vjr43TlJD4UnoBdpZJQ3LzABitbbG6wgKBSVOth4EN0IDr9glsKWjm2LBaFrJG3Nb0ILxP49ZtossVBNzlS8cFXBvv2ow7gNw",
    "sourceUrl": "https://",
    "containsAutoReply": false,
    "renderLargerThumbnail": true,
    "showAdAttribution": true
  },
  "messageExpirationSeconds": 0,
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

### Exemplo de Retorno de Imagem

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
    "caption": "",
    "width": 600,
    "height": 315,
    "viewOnce": true
  }
}
```

### Exemplo de Retorno de Template de Imagem

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "885FF934BF100D579E",
  "phone": "554499999999",
  "fromMe": false,
  "momment": 1708454725028,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "554499999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "hydratedTemplate": {
    "header": {
      "image": {
        "imageUrl": "https://example.jpeg",
        "thumbnailUrl": "https://example.jpeg",
        "caption": "",
        "mimeType": "image/jpeg",
        "viewOnce": false,
        "width": 1600,
        "height": 926
      }
    },
    "message": "texto da mensagem",
    "footer": "rodapé da mensagem",
    "title": "título da mensagem",
    "templateId": "674504507982622",
    "hydratedButtons": []
  }
}
```

### Exemplo de Retorno de Áudio

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
    "ptt": true,
    "seconds": 10,
    "audioUrl": "https://",
    "mimeType": "audio/ogg; codecs=opus",
    "viewOnce": true
  }
}
```

### Exemplo de Retorno de Vídeo

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
    "mimeType": "video/mp4",
    "seconds": 13,
    "viewOnce": true
  }
}
```

### Exemplo de Retorno de Template de Vídeo

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "0E4AD761B62E3D5EF9",
  "phone": "5544999999999",
  "fromMe": false,
  "momment": 1708456287181,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "5544999999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "hydratedTemplate": {
    "header": {
      "video": {
        "videoUrl": "https://example.mp4",
        "caption": "",
        "mimeType": "video/mp4",
        "width": 0,
        "height": 0,
        "seconds": 0,
        "viewOnce": false
      }
    },
    "message": "texto da mensagem",
    "footer": "rodapé da mensagem",
    "title": "título da mensagem",
    "templateId": "938481574354947",
    "hydratedButtons": []
  }
}
```

### Exemplo de Retorno de PTV

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

### Exemplo de Retorno de Contato

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
    "vCard": "BEGIN:VCARD\\nVERSION:3.0\\nN:;nome;;;\\nFN:nome\\nTEL;type=CELL;type=VOICE;waid=5544999999999:+55 44 9999-9999\\nEND:VCARD",
    "phones": ["5544999999999"]
  }
}
```

### Exemplo de Retorno de Documento

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
  }
}
```

### Exemplo de Retorno de Template de Documento

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "9D968A5FA2880508C4",
  "phone": "554499999999",
  "fromMe": false,
  "momment": 1708455444850,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "554499999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "hydratedTemplate": {
    "header": {
      "document": {
        "caption": null,
        "documentUrl": "https://example.pdf",
        "mimeType": "application/pdf",
        "title": "",
        "pageCount": 0,
        "fileName": ""
      }
    },
    "message": "texto da mensagem",
    "footer": "rodapé da mensagem",
    "title": "título da mensagem",
    "templateId": "811492407484976",
    "hydratedButtons": []
  }
}
```

### Exemplo de Retorno de Localização

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
  }
}
```

### Exemplo de Retorno de Template de Localização

```json
{
  "isStatusReply": false,
  "chatLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "3C67AB641C8AA0412F6A2242B4E23AC7",
  "messageId": "27BBF23E0185D363D9",
  "phone": "554499999999",
  "fromMe": false,
  "momment": 1708456969808,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": null,
  "senderName": "554499999999",
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "hydratedTemplate": {
    "header": {
      "location": {
        "longitude": -46.6388,
        "latitude": -23.5489,
        "name": "nome do lugar",
        "address": "nome do enderço",
        "url": ""
      }
    },
    "message": "texto da mensagem",
    "footer": "rodapé da mensagem",
    "title": "título da mensagem",
    "templateId": "1143940003434066",
    "hydratedButtons": []
  }
}
```

### Exemplo de Retorno de Sticker

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
  }
}
```

### Exemplo de Retorno de GIF

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
  }
}
```

### Exemplo de Retorno de Pagamento Feito

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
  }
}
```

### Exemplo de Retorno de Pedido de Pagamento

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

### Exemplo de Retorno de Recebimento de Pagamento

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
  }
}
```

### Exemplo de Retorno de Ligação Recebida

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

### Exemplo de Retorno de Ligação Perdida

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

### Exemplo de Solicitação de Entrada em Grupo através de Link de Convite

```json
{
  "isGroup": true,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999-group",
  "connectedPhone": "5544999999999",
  "fromMe": false,
  "momment": 1682017970000,
  "expiresAt": null,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
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
  "callId": null,
  "code": null,
  "requestMethod": "invite_link"
}
```

### Exemplo de Solicitação de Entrada em Grupo Revogada pelo Usuário

```json
{
  "isGroup": true,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999-group",
  "connectedPhone": "5544999999999",
  "fromMe": false,
  "momment": 1682017970000,
  "expiresAt": null,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
  "senderName": "name",
  "photo": null,
  "broadcast": false,
  "participantPhone": "5544999999999",
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "REVOKED_MEMBERSHIP_REQUESTS",
  "notificationParameters": [
    "5544999999999"
  ],
  "callId": null,
  "code": null
}
```

### Exemplo de Solicitação de Entrada em Grupo Adicionado por Participante

```json
{
  "isGroup": true,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999-group",
  "connectedPhone": "5544999999999",
  "fromMe": false,
  "momment": 1682017970000,
  "expiresAt": null,
  "status": "RECEIVED",
  "chatName": "name",
  "senderPhoto": "https://",
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
    "5544999999999",
    "5544888888888"
  ],
  "callId": null,
  "code": null,
  "requestMethod": "non_admin_add"
}
```

### Exemplo de Admin Promovido a um Canal

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
  "phone": "5544999999999@newsletter",
  "fromMe": false,
  "momment": 1682017970000,
  "status": "RECEIVED",
  "chatName": "nome do canal",
  "senderPhoto": null,
  "senderName": "",
  "photo": null,
  "broadcast": false,
  "participantPhone": "5544999999999",
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "NEWSLETTER_ADMIN_PROMOTE",
  "notificationParameters": ["5544999999999", "ADMIN"],
  "callId": null
}
```

### Exemplo de Admin Removido de um Canal

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
  "phone": "5544999999999@newsletter",
  "fromMe": false,
  "momment": 1682017970000,
  "status": "RECEIVED",
  "chatName": "nome do canal",
  "senderPhoto": null,
  "senderName": "",
  "photo": null,
  "broadcast": false,
  "participantPhone": "5544999999999",
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "NEWSLETTER_ADMIN_DEMOTE",
  "notificationParameters": ["5544999999999", "SUBSCRIBER"],
  "callId": null
}
```

### Exemplo de Retorno de Produto

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
  }
}
```

### Exemplo de Retorno de Carrinho

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

### Exemplo de Retorno de Enquete

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
    "question": "Qual a melhor API de WhatsApp?",
    "pollMaxOptions": 0,
    "options": [
      {
        "name": "Z-API"
      },
      {
        "name": "Outras"
      }
    ]
  }
}
```

### Exemplo de Retorno de Resposta de Enquete

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
  }
}
```

### Exemplo de Retorno de Envio de Pedido

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
  "reviewAndPay": {
    "type": "physical-goods",
    "currency": "BRL",
    "referenceId": "4N9AVI38VOB",
    "orderRequestId": "4N9AVI38VYZ",
    "orderStatus": "pending",
    "paymentStatus": "pending",
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
        "productId": "custom-item-4N9AVI38WI1",
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
```

### Exemplo de Retorno de Atualização de Pedido

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
  "reviewOrder": {
    "currency": "BRL",
    "referenceId": "4N9AVI38VOB",
    "orderRequestId": "4N9AVI38VYZ",
    "orderStatus": "processing",
    "paymentStatus": "pending",
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
        "productId": "custom-item-4N9AVI38WI1",
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
```

### Exemplo de Retorno de Convite Admin de Canal

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
  "newsletterAdminInvite": {
    "newsletterId": "120363166555745933@newsletter",
    "newsletterName": "Teste",
    "text": "Quero convidar vocÃª para ser admin do meu canal no WhatsApp.",
    "inviteExpiration": 1706809668
  }
}
```

### Exemplo de Retorno de Fixar Mensagem

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
  "pinMessage": {
    "action": "pin",
    "pinDurationInSecs": 604800,
    "referencedMessage": {
      "messageId": "3EB0796DC6B777C0C7CD",
      "fromMe": true,
      "phone": "554499999999",
      "participant": null
    }
  }
}
```

### Exemplo de Retorno de Evento

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": true,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "120363019502650977-group",
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
  "event": {
    "name": "Nome do evento",
    "description": "Descrição do evento",
    "canceled": false,
    "joinLink": "https://call.whatsapp.com/video/v9123XNFG50L6iO79NddXNvKQr6bb3",
    "scheduleTime": 1716915653,
    "location": {}
  }
}
```

### Exemplo de Retorno de Resposta de Evento

```json
{
  "isStatusReply": false,
  "senderLid": "81896604192873@lid",
  "connectedPhone": "554499999999",
  "waitingMessage": false,
  "isEdit": false,
  "isGroup": true,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "120363019502650977-group",
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
  "eventResponse": {
    "response": "GOING",
    "responseFrom": "554499999999",
    "time": 1714423417000,
    "referencedMessage": {
      "messageId": "D2D612289D9E8F62307D72409A8D9DC3",
      "fromMe": false,
      "phone": "120363239161320697-group",
      "participant": "554499999988"
    }
  }
}
```

### Exemplo de Retorno de "Aguardando Mensagem"

```json
{
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "messageId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "momment": 1736797729000,
  "status": "RECEIVED",
  "fromMe": true,
  "phone": "5544999999999",
  "chatName": "chat",
  "senderName": "name",
  "senderPhoto": null,
  "photo": null,
  "broadcast": false,
  "participantLid": null,
  "type": "ReceivedCallback",
  "waitingMessage": true,
  "viewOnce": true
}
```

### Exemplo de Retorno de Alteração do Nome do WhatsApp Conectado

```json
{
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "connectedPhone": "5544999999999",
  "fromMe": true,
  "momment": 1736797729000,
  "expiresAt": null,
  "status": "RECEIVED",
  "chatName": null,
  "senderPhoto": "https://",
  "senderName": "nome",
  "photo": "https://",
  "broadcast": false,
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "PROFILE_NAME_UPDATED",
  "callId": null,
  "code": null,
  "profileName": "nome atualizado"
}
```

### Exemplo de Retorno de Alteração da Foto do WhatsApp Conectado

```json
{
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "connectedPhone": "5544999999999",
  "fromMe": true,
  "momment": 1736797729000,
  "expiresAt": null,
  "status": "RECEIVED",
  "chatName": null,
  "senderPhoto": "https://",
  "senderName": "nome",
  "photo": "https://",
  "broadcast": false,
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "PROFILE_PICTURE_UPDATED",
  "callId": null,
  "code": null,
  "updatedPhoto": "https://"
}
```

### Exemplo de Retorno de Alteração de Etiquetas de um Chat

```json
{
  "isGroup": false,
  "isNewsletter": false,
  "instanceId": "A20DA9C0183A2D35A260F53F5D2B9244",
  "phone": "5544999999999",
  "connectedPhone": "5544999999999",
  "fromMe": true,
  "momment": 1736797729000,
  "expiresAt": null,
  "status": "RECEIVED",
  "chatName": null,
  "senderPhoto": null,
  "senderName": "name",
  "photo": null,
  "broadcast": false,
  "referenceMessageId": null,
  "externalAdReply": null,
  "forwarded": false,
  "type": "ReceivedCallback",
  "notification": "CHAT_LABEL_ASSOCIATION",
  "notificationParameters": [
    {
      "phone": "5544977777777",
      "label": "1",
      "assigned": true
    },
    {
      "phone": "5544988888888",
      "label": "2",
      "assigned": false
    }
  ],
  "callId": null,
  "code": null
}
```

### Exemplo de Retorno de Resposta de Status

```json
{
  "isStatusReply": true,
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
  "photo": "https://",
  "broadcast": false,
  "referenceMessageId": "3EB054C12BAAC70228AAB6",
  "messageExpirationSeconds": 0,
  "forwarded": false,
  "type": "ReceivedCallback",
  "fromApi": false,
  "text": {
    "message": "teste"
  },
  "statusImage": {
    "imageUrl": "https://",
    "thumbnailUrl": "https://",
    "caption": "",
    "mimetype": "image/jpeg",
    "viewOnce": false,
    "width": 1080,
    "height": 1920
  }
}
```

:::info Importante

Todos os arquivos de mídia recebidos do Z-API através do seu webhook têm o prazo de expiração de **30 dias**. Após esse período todos os arquivos, seja áudio, PDF, imagem, etc, serão excluídos do storage.

:::

---

## Códigos de Erro HTTP {#codigos-de-erro-http}

### 405 - Método Não Permitido

Neste caso certifique que esteja enviando corretamente a especificação do método, ou seja verifique se você enviou o `POST` ou `PUT` conforme especificado no início deste tópico.

### 415 - Tipo de Mídia Não Suportado

Caso você receba um erro 415, certifique de adicionar na headers da requisição o `Content-Type` do objeto que você está enviando, em sua grande maioria `application/json`.

---

## Notification Response {#notification-response}

### Conceituação

As notificações são mensagens de WhatsApp que se baseiam em modelos de mensagens prévias do WhatsApp. Quando o webhook retorna um payload com o campo `notification`, isso indica que a mensagem é uma notificação do sistema e não uma mensagem de usuário tradicional.

Posto dessa forma, aqui estão documentadas as notificações que recebemos. Caso não queira processar essas notificações, é necessário ignorar a mensagem quando ela chegar com o atributo `notification`.

### Tipos de Notificações

O campo `notification` pode conter os seguintes valores:

| Notificação | Descrição |
|-------------|-----------|
| `MEMBERSHIP_APPROVAL_REQUEST` | Participante solicitou participar do grupo |
| `REVOKED_MEMBERSHIP_REQUESTS` | Solicitação de entrada em grupo foi revogada pelo usuário |
| `GROUP_PARTICIPANT_LEAVE` | Participante saiu do grupo |
| `GROUP_CREATE` | Grupo foi criado |
| `GROUP_PARTICIPANT_ADD` | Participante foi adicionado ao grupo |
| `GROUP_PARTICIPANT_REMOVE` | Participante foi removido do grupo |
| `CALL_VOICE` | Chamada de voz recebida |
| `CALL_MISSED_VOICE` | Chamada de voz perdida |
| `CALL_MISSED_VIDEO` | Chamada de vídeo perdida |
| `E2E_ENCRYPTED` | As mensagens são protegidas com a criptografia |
| `CIPHERTEXT` | As mensagens são protegidas com a criptografia de ponta |
| `BLUE_MSG_SELF_PREMISE_UNVERIFIED` | Você está conversando com uma conta comercial, mas ainda não foi confirmada pelo WhatsApp |
| `BLUE_MSG_SELF_PREMISE_VERIFIED` | Você está conversando com uma conta comercial verificada pelo WhatsApp |
| `BIZ_MOVE_TO_CONSUMER_APP` | Esta conta comercial agora está registrada como uma conta pessoal e pode não mais pertencer a uma empresa |
| `REVOKE` | Mensagem foi apagada |
| `NEWSLETTER_ADMIN_PROMOTE` | Admin foi promovido a um canal |
| `NEWSLETTER_ADMIN_DEMOTE` | Admin foi removido de um canal |
| `PROFILE_NAME_UPDATED` | Nome do perfil do WhatsApp conectado foi alterado |
| `PROFILE_PICTURE_UPDATED` | Foto do perfil do WhatsApp conectado foi alterada |
| `CHAT_LABEL_ASSOCIATION` | Etiquetas de um chat foram alteradas |
| `PAYMENT_ACTION_REQUEST_DECLINED` | Pedido de pagamento foi recusado |

### Exemplos de Processamento de Notificações

Abaixo estão exemplos de como processar diferentes tipos de notificações:

```javascript
function handleNotification(notification, notificationParameters) {
  switch (notification) {
    case 'MEMBERSHIP_APPROVAL_REQUEST':
      const participant = notificationParameters[0];
      console.log(`Participante ${participant} solicitou participar do grupo`);
      // Implementar lógica de aprovação/rejeição
      break;
      
    case 'GROUP_PARTICIPANT_LEAVE':
      const leftParticipant = notificationParameters[0];
      console.log(`Participante ${leftParticipant} saiu do grupo`);
      break;
      
    case 'CALL_MISSED_VOICE':
      console.log('Chamada de voz perdida!');
      // Implementar lógica de notificação
      break;
      
    case 'CALL_MISSED_VIDEO':
      console.log('Chamada de vídeo perdida!');
      // Implementar lógica de notificação
      break;
      
    case 'GROUP_CREATE':
      const groupName = notificationParameters[0];
      console.log(`Criou o grupo '${groupName}'`);
      break;
      
    case 'GROUP_PARTICIPANT_ADD':
      const addedParticipant = notificationParameters[0];
      console.log(`Participante ${addedParticipant} adicionado`);
      break;
      
    case 'GROUP_PARTICIPANT_REMOVE':
      const removedParticipant = notificationParameters[0];
      console.log(`Participante ${removedParticipant} foi removido`);
      break;
      
    case 'E2E_ENCRYPTED':
      console.log('As mensagens são protegidas com a criptografia');
      break;
      
    case 'CIPHERTEXT':
      console.log('As mensagens são protegidas com a criptografia de ponta');
      break;
      
    case 'BLUE_MSG_SELF_PREMISE_UNVERIFIED':
      console.log('Você está conversando com uma conta comercial, mas ainda não foi confirmada pelo WhatsApp');
      break;
      
    case 'BLUE_MSG_SELF_PREMISE_VERIFIED':
      console.log('Você está conversando com uma conta comercial verificada pelo WhatsApp');
      break;
      
    case 'BIZ_MOVE_TO_CONSUMER_APP':
      console.log('Esta conta comercial agora está registrada como uma conta pessoal');
      break;
      
    case 'REVOKE':
      console.log('Mensagem foi apagada');
      break;
      
    case 'NEWSLETTER_ADMIN_PROMOTE':
      const promotedAdmin = notificationParameters[0];
      const newRole = notificationParameters[1];
      console.log(`Admin ${promotedAdmin} promovido para ${newRole}`);
      break;
      
    case 'NEWSLETTER_ADMIN_DEMOTE':
      const demotedAdmin = notificationParameters[0];
      const oldRole = notificationParameters[1];
      console.log(`Admin ${demotedAdmin} removido de ${oldRole}`);
      break;
      
    case 'PROFILE_NAME_UPDATED':
      console.log('Nome do perfil foi atualizado');
      break;
      
    case 'PROFILE_PICTURE_UPDATED':
      console.log('Foto do perfil foi atualizada');
      break;
      
    case 'CHAT_LABEL_ASSOCIATION':
      console.log('Etiquetas do chat foram alteradas');
      // notificationParameters contém array de objetos com phone, label, assigned
      break;
      
    default:
      console.log(`Notificação desconhecida: ${notification}`);
  }
}
```

:::tip Dica

- Use o campo `notification` para identificar quando uma mensagem é uma notificação do sistema
- O campo `notificationParameters` contém informações adicionais sobre a notificação
- Você pode ignorar notificações que não são relevantes para sua aplicação
- Algumas notificações podem ser úteis para atualizar o estado da sua aplicação (ex: quando um participante sai de um grupo)

:::

---

## Exemplos de Código

<Tabs>
<TabItem value="javascript" label="JavaScript (Fetch)" default>

```javascript
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
// Nunca commite tokens no código-fonte
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_TOKEN_DE_SEGURANCA';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

// Processar webhook e enviar resposta
async function handleWebhook(request) {
  try {
    // ⚠️ SEGURANÇA: Validar token do webhook
    const receivedToken = request.headers.get('x-token');
    if (receivedToken !== webhookToken) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { event, data } = await request.json();

    // Verificar se é um evento de mensagem e não é nossa
    if (event === 'message' && data && !data.fromMe) {
      const senderPhone = validatePhoneNumber(data.phone);

      // O objeto 'data' contém o payload bruto (texto, imagem, áudio, etc.)
      // Implemente aqui a lógica específica baseada nos campos disponíveis
      
      // ⚠️ SEGURANÇA: Não logue dados sensíveis
      console.log(`Mensagem recebida de ${senderPhone}`);

      // Exemplo: Respondendo apenas se a mensagem contiver texto
      if (data.message && data.message.text) {
        const receivedText = data.message.text;
        const responseMessage = `Você disse: "${receivedText}"`;
        await sendTextMessage(senderPhone, responseMessage);
      }
    }

    // Sempre responda rápido para não bloquear o Z-API
    return new Response('OK', { status: 200 });
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao processar webhook:', error.message);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Enviar mensagem de texto
async function sendTextMessage(phone, message) {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify({ phone, message }),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Resposta enviada. MessageId:', result.messageId);
  } catch (error) {
    console.error('Erro ao enviar resposta:', error.message);
  }
}

// Exemplo de uso (Cloudflare Workers, Vercel, etc.)
export default {
  async fetch(request) {
    if (request.method === 'POST' && request.url.endsWith('/webhook')) {
      return handleWebhook(request);
    }
    return new Response('Not Found', { status: 404 });
  },
};
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// Tipos para melhor type safety
interface WebhookPayload {
  event: string;
  instanceId: string;
  data: {
    messageId: string;
    phone: string;
    fromMe: boolean;
    message: {
      type: string;
      text?: string;
    };
  };
}

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId: string = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken: string = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken: string = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';
const webhookToken: string = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_TOKEN_DE_SEGURANCA';

// Validação de entrada (segurança)
function validatePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido');
  }
  return cleaned;
}

// Processar webhook
async function handleWebhook(request: Request): Promise<Response> {
  try {
    // ⚠️ SEGURANÇA: Validar token do webhook
    const receivedToken = request.headers.get('x-token');
    if (receivedToken !== webhookToken) {
      return new Response('Unauthorized', { status: 401 });
    }

    const payload: WebhookPayload = await request.json();

    // Verificar se é um evento de mensagem e não é nossa
    if (payload.event === 'message' && payload.data && !payload.data.fromMe) {
      const senderPhone = validatePhoneNumber(payload.data.phone);

      // O objeto 'data' contém o payload bruto (texto, imagem, áudio, etc.)
      // Implemente aqui a lógica específica baseada nos campos disponíveis
      
      // ⚠️ SEGURANÇA: Não logue dados sensíveis
      console.log(`Mensagem recebida de ${senderPhone}`);

      // Exemplo: Respondendo apenas se a mensagem contiver texto
      if (payload.data.message && payload.data.message.text) {
        const receivedText = payload.data.message.text;
        const responseMessage = `Você disse: "${receivedText}"`;
        await sendTextMessage(senderPhone, responseMessage);
      }
    }

    // Sempre responda rápido para não bloquear o Z-API
    return new Response('OK', { status: 200 });
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao processar webhook:', error instanceof Error ? error.message : 'Erro desconhecido');
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Enviar mensagem de texto
async function sendTextMessage(phone: string, message: string): Promise<void> {
  try {
    // ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
    const url = `https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': clientToken,
      },
      body: JSON.stringify({ phone, message }),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }

    const result = await response.json();
    // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
    console.log('Resposta enviada. MessageId:', result.messageId);
  } catch (error) {
    console.error('Erro ao enviar resposta:', error instanceof Error ? error.message : 'Erro desconhecido');
  }
}
```

</TabItem>
<TabItem value="python" label="Python (Requests)">

```python
import os
from flask import Flask, request, jsonify
import requests

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
instance_id = os.getenv('ZAPI_INSTANCE_ID', 'SUA_INSTANCE_ID')
instance_token = os.getenv('ZAPI_INSTANCE_TOKEN', 'SEU_INSTANCE_TOKEN')
client_token = os.getenv('ZAPI_CLIENT_TOKEN', 'SEU_CLIENT_TOKEN')
webhook_token = os.getenv('ZAPI_WEBHOOK_TOKEN', 'SEU_TOKEN_DE_SEGURANCA')

app = Flask(__name__)

# Validação de entrada (segurança)
def validate_phone_number(phone: str) -> str:
    cleaned = ''.join(filter(str.isdigit, phone))
    if len(cleaned) < 10 or len(cleaned) > 15:
        raise ValueError('Número de telefone inválido. Use formato: DDI + DDD + Número')
    return cleaned

@app.route('/webhook', methods=['POST'])
def webhook():
    try:
        # ⚠️ SEGURANÇA: Validar token do webhook
        received_token = request.headers.get('x-token')
        if received_token != webhook_token:
            return jsonify({'error': 'Unauthorized'}), 401

        payload = request.json
        event = payload.get('event')
        data = payload.get('data')

        # Verificar se é um evento de mensagem e não é nossa
        if event == 'message' and data and not data.get('fromMe'):
            sender_phone = validate_phone_number(data.get('phone'))

            # O objeto 'data' contém o payload bruto (texto, imagem, áudio, etc.)
            # Implemente aqui a lógica específica baseada nos campos disponíveis
            
            # ⚠️ SEGURANÇA: Não logue dados sensíveis
            print(f'Mensagem recebida de {sender_phone}')

            # Exemplo: Respondendo apenas se a mensagem contiver texto
            message_obj = data.get('message', {})
            if message_obj.get('text'):
                received_text = message_obj.get('text')
                response_message = f'Você disse: "{received_text}"'
                send_text_message(sender_phone, response_message)

        # Sempre responda rápido para não bloquear o Z-API
        return jsonify({'status': 'OK'}), 200
    except Exception as e:
        # ⚠️ SEGURANÇA: Tratamento genérico de erro
        print(f'Erro ao processar webhook: {str(e)}')
        return jsonify({'error': 'Internal Server Error'}), 500

def send_text_message(phone: str, message: str):
    try:
        # ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
        url = f'https://api.z-api.io/instances/{instance_id}/token/{instance_token}/send-text'
        
        headers = {
            'Content-Type': 'application/json',
            'Client-Token': client_token,
        }
        
        response = requests.post(
            url,
            json={'phone': phone, 'message': message},
            headers=headers,
            timeout=30,
            verify=True,  # ⚠️ SEGURANÇA: Verificar certificados SSL
        )
        
        response.raise_for_status()
        result = response.json()
        # ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        print(f'Resposta enviada. MessageId: {result.get("messageId")}')
    except Exception as e:
        print(f'Erro ao enviar resposta: {str(e)}')

if __name__ == '__main__':
    app.run(port=3000)
```

</TabItem>
<TabItem value="curl" label="cURL">

```bash
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
# Configure via: export ZAPI_WEBHOOK_TOKEN="seu-token"
WEBHOOK_TOKEN="${ZAPI_WEBHOOK_TOKEN:-SEU_TOKEN_DE_SEGURANCA}"

# Exemplo de teste do webhook (simulando requisição do Z-API)
# ⚠️ SEGURANÇA: Sempre use HTTPS (nunca HTTP)
curl -X POST "https://seu-servidor.com/webhook" \
  -H "Content-Type: application/json" \
  -H "x-token: ${WEBHOOK_TOKEN}" \
  -d '{
    "event": "message",
    "instanceId": "instance.id",
    "data": {
      "messageId": "3EB0C767F26A",
      "phone": "5511999999999",
      "fromMe": false,
      "message": {
        "type": "text",
        "text": "Olá! Gostaria de mais informações."
      }
    }
  }' \
  --fail-with-body \
  --max-time 30

# ⚠️ SEGURANÇA: Limpe variáveis sensíveis após uso (opcional)
unset WEBHOOK_TOKEN
```

</TabItem>
<TabItem value="nodejs" label="Node.js (Native HTTPS)">

```javascript
const http = require('http');
const https = require('https');
const { URL } = require('url');
const crypto = require('crypto');

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_TOKEN_DE_SEGURANCA';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

function sendTextMessage(phone, message) {
  const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`);
  const postData = JSON.stringify({ phone, message });

  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
      'Content-Length': Buffer.byteLength(postData),
    },
    timeout: 30000,
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const result = JSON.parse(data);
        console.log('Resposta enviada. MessageId:', result.messageId);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Erro ao enviar resposta:', error.message);
  });

  req.write(postData);
  req.end();
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        // ⚠️ SEGURANÇA: Validar token do webhook (usando timing-safe comparison)
        const providedToken = req.headers['x-token'];
        if (!providedToken || !crypto.timingSafeEqual(
          Buffer.from(providedToken),
          Buffer.from(webhookToken)
        )) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Unauthorized' }));
          return;
        }

        const payload = JSON.parse(body);
        const { event, data } = payload;

        // Verificar se é um evento de mensagem e não é nossa
        if (event === 'message' && data && !data.fromMe) {
          const senderPhone = validatePhoneNumber(data.phone);

          // O objeto 'data' contém o payload bruto (texto, imagem, áudio, etc.)
          // Implemente aqui a lógica específica baseada nos campos disponíveis
          
          // ⚠️ SEGURANÇA: Não logue dados sensíveis
          console.log(`Mensagem recebida de ${senderPhone}`);

          // Exemplo: Respondendo apenas se a mensagem contiver texto
          if (data.message && data.message.text) {
            const receivedText = data.message.text;
            const responseMessage = `Você disse: "${receivedText}"`;
            sendTextMessage(senderPhone, responseMessage);
          }
        }

        // Sempre responda rápido para não bloquear o Z-API
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'OK' }));
      } catch (error) {
        // ⚠️ SEGURANÇA: Tratamento genérico de erro
        console.error('Erro ao processar webhook:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('Servidor de webhook rodando na porta 3000');
});
```

</TabItem>
<TabItem value="nodejs-express" label="Node.js (Express)">

```javascript
const express = require('express');
const https = require('https');
const { URL } = require('url');

const app = express();
app.use(express.json());

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_TOKEN_DE_SEGURANCA';

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

app.post('/webhook', (req, res) => {
  try {
    // ⚠️ SEGURANÇA: Validar token do webhook
    const receivedToken = req.headers['x-token'];
    if (receivedToken !== webhookToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { event, data } = req.body;

    // Verificar se é um evento de mensagem e não é nossa
    if (event === 'message' && data && !data.fromMe) {
      const senderPhone = validatePhoneNumber(data.phone);

      // O objeto 'data' contém o payload bruto (texto, imagem, áudio, etc.)
      // Implemente aqui a lógica específica baseada nos campos disponíveis
      
      // ⚠️ SEGURANÇA: Não logue dados sensíveis
      console.log(`Mensagem recebida de ${senderPhone}`);

      // Exemplo: Respondendo apenas se a mensagem contiver texto
      if (data.message && data.message.text) {
        const receivedText = data.message.text;
        const responseMessage = `Você disse: "${receivedText}"`;
        sendTextMessage(senderPhone, responseMessage);
      }
    }

    // Sempre responda rápido para não bloquear o Z-API
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    console.error('Erro ao processar webhook:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function sendTextMessage(phone, message) {
  const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`);
  const postData = JSON.stringify({ phone, message });

  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
      'Content-Length': Buffer.byteLength(postData),
    },
    timeout: 30000,
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const result = JSON.parse(data);
        console.log('Resposta enviada. MessageId:', result.messageId);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Erro ao enviar resposta:', error.message);
  });

  req.write(postData);
  req.end();
}

app.listen(3000, () => {
  console.log('Servidor de webhook rodando na porta 3000');
});
```

</TabItem>
<TabItem value="nodejs-koa" label="Node.js (Koa)">

```javascript
const Koa = require('koa');
const Router = require('@koa/router');
const https = require('https');
const { URL } = require('url');

const app = new Koa();
const router = new Router();

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
const instanceId = process.env.ZAPI_INSTANCE_ID || 'SUA_INSTANCE_ID';
const instanceToken = process.env.ZAPI_INSTANCE_TOKEN || 'SEU_INSTANCE_TOKEN';
const clientToken = process.env.ZAPI_CLIENT_TOKEN || 'SEU_CLIENT_TOKEN';
const webhookToken = process.env.ZAPI_WEBHOOK_TOKEN || 'SEU_TOKEN_DE_SEGURANCA';

// Middleware para parsing JSON
app.use(require('koa-bodyparser')());

// Validação de entrada (segurança)
function validatePhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido. Use formato: DDI + DDD + Número');
  }
  return cleaned;
}

// Rota para receber webhook
router.post('/webhook', async (ctx) => {
  try {
    // ⚠️ SEGURANÇA: Validar token do webhook
    const receivedToken = ctx.request.headers['x-token'];
    if (receivedToken !== webhookToken) {
      ctx.status = 401;
      ctx.body = { error: 'Unauthorized' };
      return;
    }

    const { event, data } = ctx.request.body;

    // Verificar se é um evento de mensagem e não é nossa
    if (event === 'message' && data && !data.fromMe) {
      const senderPhone = validatePhoneNumber(data.phone);

      // O objeto 'data' contém o payload bruto (texto, imagem, áudio, etc.)
      // Implemente aqui a lógica específica baseada nos campos disponíveis
      
      // ⚠️ SEGURANÇA: Não logue dados sensíveis
      console.log(`Mensagem recebida de ${senderPhone}`);

      // Exemplo: Respondendo apenas se a mensagem contiver texto
      if (data.message && data.message.text) {
        const receivedText = data.message.text;
        const responseMessage = `Você disse: "${receivedText}"`;
        sendTextMessage(senderPhone, responseMessage);
      }
    }

    // Sempre responda rápido para não bloquear o Z-API
    ctx.status = 200;
    ctx.body = { status: 'OK' };
  } catch (error) {
    // ⚠️ SEGURANÇA: Tratamento genérico de erro
    ctx.app.emit('error', error, ctx);
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

function sendTextMessage(phone, message) {
  const url = new URL(`https://api.z-api.io/instances/${encodeURIComponent(instanceId)}/token/${encodeURIComponent(instanceToken)}/send-text`);
  const postData = JSON.stringify({ phone, message });

  const options = {
    hostname: url.hostname,
    path: url.pathname,
 method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Token': clientToken,
      'Content-Length': Buffer.byteLength(postData),
    },
    timeout: 30000,
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const result = JSON.parse(data);
        // ⚠️ SEGURANÇA: Não logue tokens ou dados sensíveis
        console.log('Resposta enviada. MessageId:', result.messageId);
      } else {
        // ⚠️ SEGURANÇA: Não exponha detalhes sensíveis em logs
        console.error(`Erro HTTP ${res.statusCode}: Requisição falhou`);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Erro ao enviar resposta:', error.message);
  });

  req.write(postData);
  req.end();
}

app.use(router.routes());
app.use(router.allowedMethods());

// Error handler
app.on('error', (err, ctx) => {
  console.error('Erro ao processar webhook:', err.message);
});

app.listen(3000, () => {
  console.log('Servidor de webhook rodando na porta 3000');
});
```

</TabItem>
<TabItem value="java" label="Java">

```java
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.*;
import java.net.InetSocketAddress;
import java.net.URL;
import java.net.HttpURLConnection;
import java.nio.charset.StandardCharsets;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
class MessageWebhookHandler implements HttpHandler {
    private static final String INSTANCE_ID = System.getenv("ZAPI_INSTANCE_ID") != null 
        ? System.getenv("ZAPI_INSTANCE_ID") : "SUA_INSTANCE_ID";
    private static final String INSTANCE_TOKEN = System.getenv("ZAPI_INSTANCE_TOKEN") != null 
        ? System.getenv("ZAPI_INSTANCE_TOKEN") : "SEU_INSTANCE_TOKEN";
    private static final String CLIENT_TOKEN = System.getenv("ZAPI_CLIENT_TOKEN") != null 
        ? System.getenv("ZAPI_CLIENT_TOKEN") : "SEU_CLIENT_TOKEN";
    private static final String WEBHOOK_TOKEN = System.getenv("ZAPI_WEBHOOK_TOKEN") != null 
        ? System.getenv("ZAPI_WEBHOOK_TOKEN") : "SEU_TOKEN_DE_SEGURANCA";
    private static final Gson gson = new Gson();

    // Validação de entrada (segurança)
    private String validatePhoneNumber(String phone) {
        String cleaned = phone.replaceAll("\\D", "");
        if (cleaned.length() < 10 || cleaned.length() > 15) {
            throw new IllegalArgumentException("Número de telefone inválido");
        }
        return cleaned;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (!"POST".equals(exchange.getRequestMethod())) {
            sendResponse(exchange, 405, "{\"error\":\"Método não permitido\"}");
            return;
        }

        try {
            // ⚠️ SEGURANÇA: Validar token do webhook
            String receivedToken = exchange.getRequestHeaders().getFirst("x-token");
            if (receivedToken == null || !receivedToken.equals(WEBHOOK_TOKEN)) {
                sendResponse(exchange, 401, "{\"error\":\"Unauthorized\"}");
                return;
            }

            // Ler payload
            String requestBody = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            JsonObject payload = gson.fromJson(requestBody, JsonObject.class);

            String event = payload.get("event").getAsString();
            JsonObject data = payload.getAsJsonObject("data");

            // Verificar se é um evento de mensagem e não é nossa
            if ("message".equals(event) && data != null && !data.get("fromMe").getAsBoolean()) {
                String senderPhone = validatePhoneNumber(data.get("phone").getAsString());

                // O objeto 'data' contém o payload bruto (texto, imagem, áudio, etc.)
                // Implemente aqui a lógica específica baseada nos campos disponíveis
                
                System.out.println("Mensagem recebida de " + senderPhone);

                // Exemplo: Respondendo apenas se a mensagem contiver texto
                JsonObject message = data.getAsJsonObject("message");
                if (message != null && message.has("text")) {
                    String receivedText = message.get("text").getAsString();
                    String responseMessage = "Você disse: \"" + receivedText + "\"";
                    sendTextMessage(senderPhone, responseMessage);
                }
            }

            // Sempre responda rápido para não bloquear o Z-API
            sendResponse(exchange, 200, "{\"status\":\"OK\"}");
        } catch (Exception e) {
            System.err.println("Erro ao processar webhook: " + e.getMessage());
            sendResponse(exchange, 500, "{\"error\":\"Internal Server Error\"}");
        }
    }

    private void sendTextMessage(String phone, String message) {
        try {
            String urlString = String.format(
                "https://api.z-api.io/instances/%s/token/%s/send-text",
                java.net.URLEncoder.encode(INSTANCE_ID, StandardCharsets.UTF_8),
                java.net.URLEncoder.encode(INSTANCE_TOKEN, StandardCharsets.UTF_8)
            );

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Client-Token", CLIENT_TOKEN);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);

            String jsonInputString = String.format("{\"phone\":\"%s\",\"message\":\"%s\"}",
                phone.replace("\"", "\\\""), message.replace("\"", "\\\""));

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            int responseCode = conn.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) {
                try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    JsonObject result = gson.fromJson(response.toString(), JsonObject.class);
                    System.out.println("Resposta enviada. MessageId: " + result.get("messageId").getAsString());
                }
            }
        } catch (Exception e) {
            System.err.println("Erro ao enviar resposta: " + e.getMessage());
        }
    }

    private void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, response.getBytes().length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }
}

public class WebhookServer {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(3000), 0);
        server.createContext("/webhook", new MessageWebhookHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("Servidor de webhook rodando na porta 3000");
    }
}
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
public class MessageWebhookHandler
{
    private static readonly string InstanceId = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_ID") 
        ?? "SUA_INSTANCE_ID";
    private static readonly string InstanceToken = Environment.GetEnvironmentVariable("ZAPI_INSTANCE_TOKEN") 
        ?? "SEU_INSTANCE_TOKEN";
    private static readonly string ClientToken = Environment.GetEnvironmentVariable("ZAPI_CLIENT_TOKEN") 
        ?? "SEU_CLIENT_TOKEN";
    private static readonly string WebhookToken = Environment.GetEnvironmentVariable("ZAPI_WEBHOOK_TOKEN") 
        ?? "SEU_TOKEN_DE_SEGURANCA";

    // Validação de entrada (segurança)
    private static string ValidatePhoneNumber(string phone)
    {
        string cleaned = System.Text.RegularExpressions.Regex.Replace(phone, @"\D", "");
        if (cleaned.Length < 10 || cleaned.Length > 15)
        {
            throw new ArgumentException("Número de telefone inválido");
        }
        return cleaned;
    }

    public static async Task HandleRequest(HttpListenerContext context)
    {
        var request = context.Request;
        var response = context.Response;

        if (request.HttpMethod != "POST")
        {
            SendResponse(response, 405, "{\"error\":\"Método não permitido\"}");
            return;
        }

        try
        {
            // ⚠️ SEGURANÇA: Validar token do webhook
            string receivedToken = request.Headers["x-token"];
            if (string.IsNullOrEmpty(receivedToken) || receivedToken != WebhookToken)
            {
                SendResponse(response, 401, "{\"error\":\"Unauthorized\"}");
                return;
            }

            // Ler payload
            string requestBody;
            using (var reader = new StreamReader(request.InputStream, Encoding.UTF8))
            {
                requestBody = await reader.ReadToEndAsync();
            }

            JObject payload = JObject.Parse(requestBody);
            string eventType = payload["event"].ToString();
            JObject data = payload["data"] as JObject;

            // Verificar se é um evento de mensagem e não é nossa
            if (eventType == "message" && data != null && !data["fromMe"].Value<bool>())
            {
                string senderPhone = ValidatePhoneNumber(data["phone"].ToString());

                // O objeto 'data' contém o payload bruto (texto, imagem, áudio, etc.)
                // Implemente aqui a lógica específica baseada nos campos disponíveis
                
                Console.WriteLine($"Mensagem recebida de {senderPhone}");

                // Exemplo: Respondendo apenas se a mensagem contiver texto
                JObject message = data["message"] as JObject;
                if (message != null && message["text"] != null)
                {
                    string receivedText = message["text"].ToString();
                    string responseMessage = $"Você disse: \"{receivedText}\"";
                    await SendTextMessage(senderPhone, responseMessage);
                }
            }

            // Sempre responda rápido para não bloquear o Z-API
            SendResponse(response, 200, "{\"status\":\"OK\"}");
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Erro ao processar webhook: {ex.Message}");
            SendResponse(response, 500, "{\"error\":\"Internal Server Error\"}");
        }
    }

    private static async Task SendTextMessage(string phone, string message)
    {
        try
        {
            string url = $"https://api.z-api.io/instances/{Uri.EscapeDataString(InstanceId)}/token/{Uri.EscapeDataString(InstanceToken)}/send-text";

            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("Client-Token", ClientToken);

                var json = JsonConvert.SerializeObject(new { phone, message });
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    JObject resultObj = JObject.Parse(result);
                    Console.WriteLine($"Resposta enviada. MessageId: {resultObj["messageId"]}");
                }
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Erro ao enviar resposta: {ex.Message}");
        }
    }

    private static void SendResponse(HttpListenerResponse response, int statusCode, string body)
    {
        response.StatusCode = statusCode;
        response.ContentType = "application/json";
        byte[] buffer = Encoding.UTF8.GetBytes(body);
        response.ContentLength64 = buffer.Length;
        response.OutputStream.Write(buffer, 0, buffer.Length);
        response.Close();
    }
}

// Exemplo de uso com HttpListener
class Program
{
    static void Main()
    {
        HttpListener listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:3000/webhook/");
        listener.Start();
        Console.WriteLine("Servidor de webhook rodando na porta 3000");

        while (true)
        {
            HttpListenerContext context = listener.GetContext();
            Task.Run(() => MessageWebhookHandler.HandleRequest(context));
        }
    }
}
```

</TabItem>
<TabItem value="go" label="Go">

```go
package main

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "os"
    "regexp"
    "strings"
    "time"
)

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
var instanceID = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID")
var instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN")
var clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN")
var webhookToken = getEnv("ZAPI_WEBHOOK_TOKEN", "SEU_TOKEN_DE_SEGURANCA")

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

// Estruturas do payload
type WebhookPayload struct {
    Event      string `json:"event"`
    InstanceID string `json:"instanceId"`
    Data       struct {
        MessageID string `json:"messageId"`
        Phone     string `json:"phone"`
        FromMe    bool   `json:"fromMe"`
        Message   struct {
            Type string `json:"type"`
            Text string `json:"text"`
        } `json:"message"`
    } `json:"data"`
}

// Validação de entrada (segurança)
func validatePhoneNumber(phone string) (string, error) {
    re := regexp.MustCompile(`\D`)
    cleaned := re.ReplaceAllString(phone, "")
    if len(cleaned) < 10 || len(cleaned) > 15 {
        return "", fmt.Errorf("número de telefone inválido")
    }
    return cleaned, nil
}

func sendTextMessage(phone, message string) {
    url := fmt.Sprintf("https://api.z-api.io/instances/%s/token/%s/send-text", instanceID, instanceToken)
    
    requestData := map[string]string{
        "phone":   phone,
        "message": message,
    }
    
    jsonData, _ := json.Marshal(requestData)
    
    req, _ := http.NewRequest("POST", url, strings.NewReader(string(jsonData)))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Client-Token", clientToken)
    
    client := &http.Client{Timeout: 30 * time.Second}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Erro ao enviar resposta: %v\n", err)
        return
    }
    defer resp.Body.Close()
    
    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        var result map[string]interface{}
        json.NewDecoder(resp.Body).Decode(&result)
        fmt.Printf("Resposta enviada. MessageId: %v\n", result["messageId"])
    }
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
        return
    }

    // ⚠️ SEGURANÇA: Validar token do webhook
    receivedToken := r.Header.Get("x-token")
    if receivedToken != webhookToken {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    body, err := io.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "Erro ao ler payload", http.StatusBadRequest)
        return
    }
    defer r.Body.Close()

    var payload WebhookPayload
    if err := json.Unmarshal(body, &payload); err != nil {
        http.Error(w, "Erro ao processar JSON", http.StatusBadRequest)
        return
    }

    // Verificar se é um evento de mensagem e não é nossa
    if payload.Event == "message" && !payload.Data.FromMe {
        senderPhone, err := validatePhoneNumber(payload.Data.Phone)
        if err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }

        // O objeto 'data' contém o payload bruto (texto, imagem, áudio, etc.)
        // Implemente aqui a lógica específica baseada nos campos disponíveis
        
        fmt.Printf("Mensagem recebida de %s\n", senderPhone)

        // Exemplo: Respondendo apenas se a mensagem contiver texto
        if payload.Data.Message.Text != "" {
            receivedText := payload.Data.Message.Text
            responseMessage := fmt.Sprintf("Você disse: \"%s\"", receivedText)
            sendTextMessage(senderPhone, responseMessage)
        }
    }

    // Sempre responda rápido para não bloquear o Z-API
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{"status": "OK"})
}

func main() {
    http.HandleFunc("/webhook", webhookHandler)
    fmt.Println("Servidor de webhook rodando na porta 3000")
    http.ListenAndServe(":3000", nil)
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = getenv('ZAPI_INSTANCE_ID') ?: 'SUA_INSTANCE_ID';
$instanceToken = getenv('ZAPI_INSTANCE_TOKEN') ?: 'SEU_INSTANCE_TOKEN';
$clientToken = getenv('ZAPI_CLIENT_TOKEN') ?: 'SEU_CLIENT_TOKEN';
$webhookToken = getenv('ZAPI_WEBHOOK_TOKEN') ?: 'SEU_TOKEN_DE_SEGURANCA';

// Validação de entrada (segurança)
function validatePhoneNumber($phone) {
    $cleaned = preg_replace('/\D/', '', $phone);
    if (strlen($cleaned) < 10 || strlen($cleaned) > 15) {
        throw new Exception('Número de telefone inválido. Use formato: DDI + DDD + Número');
    }
    return $cleaned;
}

// Processar webhook
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // ⚠️ SEGURANÇA: Validar token do webhook
        $receivedToken = $_SERVER['HTTP_X_TOKEN'] ?? '';
        if ($receivedToken !== $webhookToken) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            exit;
        }

        // Ler payload
        $payload = json_decode(file_get_contents('php://input'), true);
        
        $event = $payload['event'] ?? '';
        $data = $payload['data'] ?? [];

        // Verificar se é um evento de mensagem e não é nossa
        if ($event === 'message' && !empty($data) && !($data['fromMe'] ?? false)) {
            $senderPhone = validatePhoneNumber($data['phone']);

            // O objeto 'data' contém o payload bruto (texto, imagem, áudio, etc.)
            // Implemente aqui a lógica específica baseada nos campos disponíveis
            
            // ⚠️ SEGURANÇA: Não logue dados sensíveis
            error_log("Mensagem recebida de {$senderPhone}");

            // Exemplo: Respondendo apenas se a mensagem contiver texto
            $message = $data['message'] ?? [];
            if (!empty($message['text'])) {
                $receivedText = $message['text'];
                $responseMessage = "Você disse: \"{$receivedText}\"";
                sendTextMessage($senderPhone, $responseMessage);
            }
        }

        // Sempre responda rápido para não bloquear o Z-API
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode(['status' => 'OK']);
    } catch (Exception $e) {
        // ⚠️ SEGURANÇA: Tratamento genérico de erro
        error_log("Erro ao processar webhook: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Internal Server Error']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
}

function sendTextMessage($phone, $message) {
    global $instanceId, $instanceToken, $clientToken;
    
    try {
        $url = "https://api.z-api.io/instances/" . urlencode($instanceId) . "/token/" . urlencode($instanceToken) . "/send-text";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['phone' => $phone, 'message' => $message]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Client-Token: ' . $clientToken,
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode >= 200 && $httpCode < 300) {
            $result = json_decode($response, true);
            error_log("Resposta enviada. MessageId: " . ($result['messageId'] ?? ''));
        }
    } catch (Exception $e) {
        error_log("Erro ao enviar resposta: " . $e->getMessage());
    }
}
?>
```

</TabItem>
<TabItem value="ruby" label="Ruby">

```ruby
require 'sinatra'
require 'json'
require 'net/http'
require 'uri'

# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
INSTANCE_ID = ENV['ZAPI_INSTANCE_ID'] || 'SUA_INSTANCE_ID'
INSTANCE_TOKEN = ENV['ZAPI_INSTANCE_TOKEN'] || 'SEU_INSTANCE_TOKEN'
CLIENT_TOKEN = ENV['ZAPI_CLIENT_TOKEN'] || 'SEU_CLIENT_TOKEN'
WEBHOOK_TOKEN = ENV['ZAPI_WEBHOOK_TOKEN'] || 'SEU_TOKEN_DE_SEGURANCA'

# Validação de entrada (segurança)
def validate_phone_number(phone)
  cleaned = phone.gsub(/\D/, '')
  if cleaned.length < 10 || cleaned.length > 15
    raise ArgumentError, 'Número de telefone inválido. Use formato: DDI + DDD + Número'
  end
  cleaned
end

def send_text_message(phone, message)
  url = URI("https://api.z-api.io/instances/#{URI.encode_www_form_component(INSTANCE_ID)}/token/#{URI.encode_www_form_component(INSTANCE_TOKEN)}/send-text")
  
  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.read_timeout = 30

  request = Net::HTTP::Post.new(url.path)
  request['Content-Type'] = 'application/json'
  request['Client-Token'] = CLIENT_TOKEN
  request.body = { phone: phone, message: message }.to_json

  response = http.request(request)

  if response.code.to_i >= 200 && response.code.to_i < 300
    result = JSON.parse(response.body)
    puts "Resposta enviada. MessageId: #{result['messageId']}"
  end
rescue => e
  puts "Erro ao enviar resposta: #{e.message}"
end

post '/webhook' do
  begin
    # ⚠️ SEGURANÇA: Validar token do webhook
    received_token = request.env['HTTP_X_TOKEN']
    if received_token != WEBHOOK_TOKEN
      status 401
      return { error: 'Unauthorized' }.to_json
    end

    payload = JSON.parse(request.body.read)
    event = payload['event']
    data = payload['data']

    # Verificar se é um evento de mensagem e não é nossa
    if event == 'message' && data && !data['fromMe']
      sender_phone = validate_phone_number(data['phone'])

      # O objeto 'data' contém o payload bruto (texto, imagem, áudio, etc.)
      # Implemente aqui a lógica específica baseada nos campos disponíveis
      
      # ⚠️ SEGURANÇA: Não logue dados sensíveis
      puts "Mensagem recebida de #{sender_phone}"

      # Exemplo: Respondendo apenas se a mensagem contiver texto
      message_obj = data['message'] || {}
      if message_obj['text']
        received_text = message_obj['text']
        response_message = "Você disse: \"#{received_text}\""
        send_text_message(sender_phone, response_message)
      end
    end

    # Sempre responda rápido para não bloquear o Z-API
    status 200
    { status: 'OK' }.to_json
  rescue => e
    # ⚠️ SEGURANÇA: Tratamento genérico de erro
    puts "Erro ao processar webhook: #{e.message}"
    status 500
    { error: 'Internal Server Error' }.to_json
  end
end

# Iniciar servidor
set :port, 3000
```

</TabItem>
<TabItem value="swift" label="Swift">

```swift
import Foundation
import Vapor

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
let instanceId = Environment.get("ZAPI_INSTANCE_ID") ?? "SUA_INSTANCE_ID"
let instanceToken = Environment.get("ZAPI_INSTANCE_TOKEN") ?? "SEU_INSTANCE_TOKEN"
let clientToken = Environment.get("ZAPI_CLIENT_TOKEN") ?? "SEU_CLIENT_TOKEN"
let webhookToken = Environment.get("ZAPI_WEBHOOK_TOKEN") ?? "SEU_TOKEN_DE_SEGURANCA"

// Estruturas do payload
struct WebhookPayload: Content {
    let event: String
    let instanceId: String
    let data: MessageData
}

struct MessageData: Content {
    let messageId: String
    let phone: String
    let fromMe: Bool
    let message: MessageContent
}

struct MessageContent: Content {
    let type: String
    let text: String?
}

// Validação de entrada (segurança)
func validatePhoneNumber(_ phone: String) throws -> String {
    let cleaned = phone.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
    if cleaned.count < 10 || cleaned.count > 15 {
        throw Abort(.badRequest, reason: "Número de telefone inválido")
    }
    return cleaned
}

func sendTextMessage(_ phone: String, _ message: String, on app: Application) {
    let url = "https://api.z-api.io/instances/\(instanceId)/token/\(instanceToken)/send-text"
    
    let body: [String: String] = ["phone": phone, "message": message]
    
    app.client.post(URI(string: url)) { req in
        try req.content.encode(body, as: .json)
        req.headers.add(name: "Client-Token", value: clientToken)
    }.whenComplete { result in
        switch result {
        case .success(let response):
            if let result = try? response.content.decode([String: String].self) {
                app.logger.info("Resposta enviada. MessageId: \(result["messageId"] ?? "")")
            }
        case .failure(let error):
            app.logger.error("Erro ao enviar resposta: \(error.localizedDescription)")
        }
    }
}

// Configurar rota
func configure(_ app: Application) throws {
    app.post("webhook") { req -> EventLoopFuture<Response> in
        // ⚠️ SEGURANÇA: Validar token do webhook
        guard let receivedToken = req.headers["x-token"].first,
              receivedToken == webhookToken else {
            throw Abort(.unauthorized, reason: "Token de segurança inválido")
        }

        return req.content.decode(WebhookPayload.self).flatMap { payload in
            // Verificar se é um evento de mensagem e não é nossa
            if payload.event == "message" && !payload.data.fromMe {
                do {
                    let senderPhone = try validatePhoneNumber(payload.data.phone)

                    // O objeto 'data' contém o payload bruto (texto, imagem, áudio, etc.)
                    // Implemente aqui a lógica específica baseada nos campos disponíveis
                    
                    app.logger.info("Mensagem recebida de \(senderPhone)")

                    // Exemplo: Respondendo apenas se a mensagem contiver texto
                    if let text = payload.data.message.text {
                        let receivedText = text
                        let responseMessage = "Você disse: \"\(receivedText)\""
                        sendTextMessage(senderPhone, responseMessage, on: app)
                    }
                } catch {
                    app.logger.error("Erro de validação: \(error)")
                }
            }

            // Sempre responda rápido para não bloquear o Z-API
            return req.eventLoop.makeSucceededFuture(Response(status: .ok, body: .init(string: "{\"status\":\"OK\"}")))
        }
    }
}
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
# ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
$instanceId = if ($env:ZAPI_INSTANCE_ID) { $env:ZAPI_INSTANCE_ID } else { "SUA_INSTANCE_ID" }
$instanceToken = if ($env:ZAPI_INSTANCE_TOKEN) { $env:ZAPI_INSTANCE_TOKEN } else { "SEU_INSTANCE_TOKEN" }
$clientToken = if ($env:ZAPI_CLIENT_TOKEN) { $env:ZAPI_CLIENT_TOKEN } else { "SEU_CLIENT_TOKEN" }
$webhookToken = if ($env:ZAPI_WEBHOOK_TOKEN) { $env:ZAPI_WEBHOOK_TOKEN } else { "SEU_TOKEN_DE_SEGURANCA" }

# Validação de entrada (segurança)
function Validate-PhoneNumber {
    param($phone)
    $cleaned = $phone -replace '\D', ''
    if ($cleaned.Length -lt 10 -or $cleaned.Length -gt 15) {
        throw "Número de telefone inválido. Use formato: DDI + DDD + Número"
    }
    return $cleaned
}

function Send-TextMessage {
    param($phone, $message)
    
    try {
        $url = "https://api.z-api.io/instances/$([System.Web.HttpUtility]::UrlEncode($instanceId))/token/$([System.Web.HttpUtility]::UrlEncode($instanceToken))/send-text"
        
        $headers = @{
            "Content-Type" = "application/json"
            "Client-Token" = $clientToken
        }
        
        $body = @{
            phone = $phone
            message = $message
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -TimeoutSec 30 -ErrorAction Stop
        Write-Host "Resposta enviada. MessageId: $($response.messageId)"
    } catch {
        Write-Host "Erro ao enviar resposta: $($_.Exception.Message)"
    }
}

# Criar listener HTTP
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:3000/webhook/")
$listener.Start()

Write-Host "Servidor de webhook rodando na porta 3000"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    try {
        if ($request.HttpMethod -ne "POST") {
            $response.StatusCode = 405
            $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"error":"Método não permitido"}')
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        # ⚠️ SEGURANÇA: Validar token do webhook
        $receivedToken = $request.Headers["x-token"]
        if ($receivedToken -ne $webhookToken) {
            $response.StatusCode = 401
            $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"error":"Unauthorized"}')
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        # Ler payload
        $reader = New-Object System.IO.StreamReader($request.InputStream)
        $body = $reader.ReadToEnd()
        $payload = $body | ConvertFrom-Json

        # Verificar se é um evento de mensagem e não é nossa
        if ($payload.event -eq "message" -and $payload.data -and -not $payload.data.fromMe) {
            $senderPhone = Validate-PhoneNumber -phone $payload.data.phone

            # O objeto 'data' contém o payload bruto (texto, imagem, áudio, etc.)
            # Implemente aqui a lógica específica baseada nos campos disponíveis
            
            Write-Host "Mensagem recebida de $senderPhone"

            # Exemplo: Respondendo apenas se a mensagem contiver texto
            $message = $payload.data.message
            if ($message.text) {
                $receivedText = $message.text
                $responseMessage = "Você disse: `"$receivedText`""
                Send-TextMessage -phone $senderPhone -message $responseMessage
            }
        }

        # Sempre responda rápido para não bloquear o Z-API
        $response.StatusCode = 200
        $response.ContentType = "application/json"
        $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"status":"OK"}')
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } catch {
        Write-Host "Erro ao processar webhook: $($_.Exception.Message)"
        $response.StatusCode = 500
        $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"error":"Internal Server Error"}')
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } finally {
        $response.Close()
    }
}
```

</TabItem>
<TabItem value="http" label="HTTP (Raw)">

```http
POST /webhook HTTP/1.1
Host: seu-servidor.com
Content-Type: application/json
x-token: SEU_TOKEN_DE_SEGURANCA
Content-Length: 245

{
  "event": "message",
  "instanceId": "instance.id",
  "data": {
    "messageId": "3EB0C767F26A",
    "phone": "5511999999999",
    "fromMe": false,
    "message": {
      "type": "text",
      "text": "Olá! Gostaria de mais informações."
    }
  }
}
```

**Nota:** Este é um exemplo de requisição HTTP raw que o Z-API envia para seu webhook. Em produção:
- ⚠️ **SEGURANÇA:** Valide sempre o header `x-token` antes de processar o payload
- ⚠️ **SEGURANÇA:** Sempre use HTTPS (não HTTP)
- ⚠️ **Validação:** Valide o payload (event, data, phone, message) antes de processar
- ⚠️ **Performance:** Responda com `200 OK` rapidamente para não bloquear o Z-API

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <curl/curl.h>
#include <json/json.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
std::string getEnv(const char* key, const std::string& defaultValue) {
    const char* value = std::getenv(key);
    return value ? std::string(value) : defaultValue;
}

std::string instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
std::string instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN");
std::string clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");
std::string webhookToken = getEnv("ZAPI_WEBHOOK_TOKEN", "SEU_TOKEN_DE_SEGURANCA");

// Validação de entrada (segurança)
std::string validatePhoneNumber(const std::string& phone) {
    std::regex nonDigit("\\D");
    std::string cleaned = std::regex_replace(phone, nonDigit, "");
    if (cleaned.length() < 10 || cleaned.length() > 15) {
        throw std::invalid_argument("Número de telefone inválido");
    }
    return cleaned;
}

// Exemplo de processamento (usando libmicrohttpd ou similar)
// Este é um exemplo simplificado - em produção use uma biblioteca HTTP adequada
int main() {
    // Implementação do servidor HTTP aqui
    // Exemplo usando libmicrohttpd ou outra biblioteca
    
    std::cout << "Servidor de webhook rodando na porta 3000" << std::endl;
    return 0;
}
```

**Compilação:**
```bash
# Requer libcurl-dev, libjsoncpp-dev e libmicrohttpd-dev
g++ -o webhook_server webhook_server.cpp -lcurl -ljsoncpp -lmicrohttpd
```

</TabItem>
<TabItem value="c" label="C">

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>

// ⚠️ SEGURANÇA: Use variáveis de ambiente para credenciais
char* getEnv(const char* key, const char* defaultValue) {
    char* value = getenv(key);
    return value ? value : (char*)defaultValue;
}

char* instanceId = getEnv("ZAPI_INSTANCE_ID", "SUA_INSTANCE_ID");
char* instanceToken = getEnv("ZAPI_INSTANCE_TOKEN", "SEU_INSTANCE_TOKEN");
char* clientToken = getEnv("ZAPI_CLIENT_TOKEN", "SEU_CLIENT_TOKEN");
char* webhookToken = getEnv("ZAPI_WEBHOOK_TOKEN", "SEU_TOKEN_DE_SEGURANCA");

// Exemplo de processamento (usando libmicrohttpd ou similar)
// Este é um exemplo simplificado - em produção use uma biblioteca HTTP adequada
int main() {
    // Implementação do servidor HTTP aqui
    // Exemplo usando libmicrohttpd ou outra biblioteca
    
    printf("Servidor de webhook rodando na porta 3000\n");
    return 0;
}
```

**Compilação:**
```bash
# Requer libcurl-dev e libmicrohttpd-dev
gcc -o webhook_server webhook_server.c -lcurl -lmicrohttpd
```

</TabItem>
</Tabs>

