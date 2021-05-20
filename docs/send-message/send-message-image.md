---
id: send-message-image
title: Enviar imagem
---

## Método

#### /send-image

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-image

---

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

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone do destinatário no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| image | string | Link da imagem ou seu Base64 |

### Opcionais

| Atributos |  Tipo  | Descrição            |
| :-------- | :----: | :------------------- |
| caption   | string | Titulo da sua imagem |

---

## Response

### 200

| Atributos | Tipo   | Descrição      |
| :-------- | :----- | :------------- |
| zaapId    | string | id no z-api    |
| messageId | string | id no whatsapp |

Exemplo

```json
{
  "zaapId": "3999984263738042930CD6ECDE9VDWSA",
  "messageId": "D241XXXX732339502B68"
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-image.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>

---
