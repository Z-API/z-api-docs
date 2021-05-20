---
id: send-message-image
title: Enviar imagem
---

## Método

#### /send-image

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-image

## Conceituação

Método responsavel por enviar imagens para os seus chats você pode trabalhar com as imagens de 2 formas que são:

- Por Link, onde você tem uma imagem hospedada em algum lugar da internet e envia apenas o link da mesma.

- Por Base64, se você optar por esta opção precisará ter em sua aplicação um método para converter a imagem em Base64, para ter certeza que sua conversão funcionou copie o Base64 gerado e cole na barra de endereço do seu navegador, caso seja uma imagem válida seu navegador vai conseguir renderiza-la, caso o navegador não consiga, revise seu método :).

Você pode fazer um teste com este tipo de envio utilizando um [conversor online] de imagens para Base64.

[conversor online]: https://www.base64-image.de/

:::caution Tamanho de imagens

O Whatsapp bloqueia o envio de imagens grandes, para melhor performance da sua aplicação evite enviar arquivos com mais de 3mb.

:::

---

## Atributos

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone do destinatário no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| image | string | Link da imagem ou seu Base64 |

### Opcionais

| Atributos |  Tipo  | Descrição            |
| :-------- | :----: | :------------------- |
| customID  | string |                      |
| caption   | string | Titulo da sua imagem |

---

## Code

---

## Response
