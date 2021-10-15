---
id: send-message-location
title: Enviar localização
---

## Método

#### /send-location

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-location

---

## Conceituação

Método responsavel por enviar uma localização fixa aos seus contatos, muito utilizado para enviar a localização de um endereços.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone (ou ID do grupo para casos de envio para grupos) do destinatário no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| title | string | Titulo para sua localização ex: Minha casa |
| address | string | Endereço da localização que esta enviando composto por logradouro, numero, bairro, cidade, UF e CEP, tudo separado por virgula |
| latitude | string | Latitude da localização enviada |
| longitude | string | Longitude da localização enviada |

### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| messageId | String | Atributo utilizado para responder uma mensagem do chat, basta adicionar o messageId da mensagem que queira responder neste atributo |
| delayMessage | number | Nesse atributo um delay é adicionado na mensagem. Você pode decidir entre um range de 1~15 sec, significa quantos segundos ele vai esperar para enviar a próxima mensagem. (Ex "delayMessage": 5, ). O delay default caso não seja informado é de 1~3 sec |

---

## Request Body

```json
{
  "phone": "5511999998888",
  "title": "Google Brasil",
  "address": "Av. Brg. Faria Lima, 3477 - Itaim Bibi, São Paulo - SP, 04538-133",
  "latitude": "-23.0696347",
  "longitude": "-50.4357913"
}
```

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

## Webhook Response

Link para a response do webhook (ao receber)

[Webhook](../webhooks/on-message-received#exemplo-de-retorno-de-localização)

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-location.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
