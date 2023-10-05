---
id: send-message-text
title: Enviar texto simples
---

## Método

#### /send-text

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](https://developer.z-api.io/security/client-token)** |
---

## Conceituação

Neste método você poderá enviar textos simples, mas você pode incrementá-los utilizando a formatação de texto e emojis, por exemplo. Caso você ainda não saiba como fazer isso, clique nos links abaixo e siga as instruções:

- Para saber como formatar fontes no Whatsapp [clique aqui]

- Você também pode utilizar **quebra de linhas** em suas mensagens, porém isso pode ser feito de formas diferentes, isso muda por fatores como a plataforma que sua aplicação está rodando e linguagem de programação utilizada. Até o momento, indentificamos as seguintes formas:

  > - \n
  > - \r
  > - \r\n
  > - %0a

  Verifique a que mais se adequa ao seu caso.

  **Se descobrir uma maneira nova de fazer quebra de linhas, por favor nos avise :)**

- Outro recurso que você pode explorar é a utilização de emojis. Se você precisar pegar alguns emojis use este [link].

[clique aqui]: https://faq.whatsapp.com/general/chats/how-to-format-your-messages/?lang=pt_br
[link]: https://fsymbols.com/pt/emoji/

:::tip Sobre emojis

Um emoji é um caracter ASCII normal, assim como existe a fonte Times New Roman por exemplo, existem fontes de emojis, pense que você pode criar sua própria galeria de emojis.

Para fazer o teste, basta copiar um emoji e colar em seu texto! Você pode utilizar este aqui 🤪 se quiser.

::: Exemplo no Whatsapp

![image](../../img/send-message-text.jpeg)

---

## Atributos

### Obrigatórios

| Atributos | Tipo   | Descrição |
| :------   | :----: | :------   |
| phone     | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NÚMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| message   | string | Texto a ser enviado |

### Opcionais

| Atributos    | Tipo   | Descrição |
| :---------   | :----: | :-------- |
| delayMessage | number | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1~15 seg, que significa quantos segundos ele vai esperar para enviar a próxima mensagem. (Ex.: "delayMessage": 5, ). O delay default caso não seja informado é de 1~3 sec |
| delayTyping  | number | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1~15 sec, significa quantos segundos ele vai ficar com o status "Digitando...". (Ex "delayTyping": 5, ). O delay default caso não seja informado é de 0|
| editMessageId | string | Esse atributo permite editar mensagens enviadas anteriormente no WhatsApp. Use o ID da mensagem e o novo conteúdo no JSON para fazer alterações. |

---

## Request Body

```json
{
  "phone": "5511999999999",
  "message": "Welcome to *Z-API*"
}
```

## Response

### 200

| Atributos | Tipo   | Descrição      |
| :-------- | :----- | :------------- |
| zaapId    | string | id no z-api    |
| messageId | string | id no whatsapp |
| id        | string | Adicionado para compatibilidade com zapier, ele tem o mesmo valor do messageId |


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

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-texto)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-text.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
