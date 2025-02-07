---
id: send-message-sticker
title: Enviar sticker
---

## Método

#### /send-sticker

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-sticker

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Método responsavel por enviar imagens para os seus chats você pode trabalhar com as imagens de 2 formas que são:

- Por Link, onde você tem um sticker hospedada em algum lugar da internet e envia apenas o link da mesma.

- Por Base64, se você optar por esta opção precisará ter em sua aplicação um método para converter o sticker em Base64, para ter certeza que sua conversão funcionou copie o Base64 gerado e cole na barra de endereço do seu navegador, caso seja um sticker válida seu navegador vai conseguir renderiza-la, caso o navegador não consiga, revise seu método :).

  **_ IMPORTANTE _** se optar por base64 antes do binário você precisa adicionar a seguinte expressão ** data:image/png;base64, \*_ seu codigo base64 _\* **

Você pode fazer um teste com este tipo de envio utilizando um conversor online de imagens para Base64.

Exemplos:

[conversor 1]

[conversor 2]

[conversor 1]: https://www.base64-image.de/
[conversor 2]: https://base64.guru/converter/encode/image

### Tamanho e formatos

O WhatsApp limita o tamanho de arquivos e sua politica muda constantemente, por isso sempre recomendamos a verificação direto no site do próprio WhatsApp.

Neste [link] você encontra tudo que precisa saber sobre formatos e tamanhos de arquivos.

[link]: https://developers.facebook.com/docs/whatsapp/api/media

![image](../../img/send-message-sticker.jpeg)

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| sticker | string | Link do sticker ou seu Base64 |

### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| messageId | String | Atributo utilizado para responder uma mensagem do chat, basta adicionar o messageId da mensagem que queira responder neste atributo |
| delayMessage | number | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1~15 sec, significa quantos segundos ele vai esperar para enviar a próxima mensagem. (Ex "delayMessage": 5, ). O delay default caso não seja informado é de 1~3 sec |
| stickerAuthor | string | Nome do autor do sticker |

---

## Request Body


**Envio por URL**
```json
{
  "phone": "5511999999999",
  "sticker": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg",
  "stickerAuthor": "Z-API"
}
```

**Envio por Base64**
```json
{
  "phone": "5511999999999",
  "sticker": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAMgCAIAAABUEpE/",
  "stickerAuthor": "Z-API"
}
```

---

## Response

### 200

| Atributos | Tipo   | Descrição      |
| :-------- | :----- | :------------- |
| zaapId    | string | id no z-api    |
| messageId | string | id no whatsapp |
| id | string | Adicionado para compatibilidade com zapier, ele tem o mesmo valor do messageId |
Exemplo

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68",
  "id": "D241XXXX732339502B68"
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-sticker)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-sticker.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
