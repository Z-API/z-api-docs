---
id: conversation
title: Conversar com a Meta AI
---

## Método

`/send-text`

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-text

#### Header
|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |

## Conceituação

Este método permite a interação direta com a Meta AI no WhatsApp através da Z-API, facilitando o envio de mensagens de texto para obter respostas automatizadas e contextuais.
Com ele, é possível enviar perguntas e comandos à Meta AI em conversas privadas, direcionando as mensagens ao número exclusivo 13135550002, ou incluir a IA em grupos utilizando o ID do grupo como destinatário.

## Como Usar

Para começar a usar a Meta AI com a Z-API basta enviar uma mensagem de texto ao número da Meta AI *`13135550002`* utilizando o endpoint [`/send-text`](../message/send-message-text)

:::warning Atenção
Atualmente, a Meta AI na Z-API suporta apenas mensagens em texto. Isso significa que áudio, documentos, imagens e outros arquivos multimídia não são compatíveis nesta integração. Portanto, é necessário que apenas mensagens de texto sejam enviadas para garantir o funcionamento correto.

Além disso, esse recurso está disponível apenas para contas pessoais do WhatsApp, ou seja, não é acessível para contas business.
:::

## Atributos

### Obrigatórios

| Atributos | Tipo   | Descrição |
| :------   | :----: | :------   |
| phone     | string | Para chat privado com a IA, use **13135550002**; para grupo, use o ID do grupo.|
| message   | string | Texto a ser enviado | Cas|

### Opcionais

| Atributos    | Tipo   | Descrição |
| :---------   | :----: | :-------- |
| delayMessage | number | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1~15 seg, que significa quantos segundos ele vai esperar para enviar a próxima mensagem. (Ex.: "delayMessage": 5, ). O delay default caso não seja informado é de 1~3 sec |
| delayTyping  | number | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1~15 sec, significa quantos segundos ele vai ficar com o status "Digitando...". (Ex "delayTyping": 5, ). O delay default caso não seja informado é de 0        |
| mentioned    | array  | Necessário passar o número 13135550002 caso deseje acionar a Meta AI em um grupo. |

## Request Body

### Conversar no chat privado

```json
{
  "phone": "13135550002",
  "message": "Olá, Meta AI! Gostaria de saber sobre..."
}
```

### Conversar em grupos

```json
{
  "phone": "5511999999999-group",
  "message": "@13135550002 Olá, Meta AI! Gostaria de saber sobre...",
  "mentioned": [13135550002]
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


## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-texto)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-text.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>