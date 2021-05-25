---
id: send-message-video
title: Enviar video
---

## Método

#### /send-audio

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/send-video

---

## Conceituação

Método responsavel por enviar audios para os seus chats, você pode trabalhar com as audios de 2 formas que são:

Por Link, onde você temum video hospedado em algum lugar da internet e envia apenas o link da mesmo.

Por Base64, se você optar por esta opção precisará ter em sua aplicação um método para converter o video em Base64.

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| phone | string | Telefone do destinatário no formato DDI DDD NUMERO Ex: 551199999999. **IMPORTANTE** Envie somente números, sem formatação ou máscara |
| video | string | Link do video ou seu Base64 |

### Opcionais

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| messageId | String | Atributo utilizado para responder uma mensagem do chat, basta adicionar o messageId da mensagem que queira responder neste atributo |

---

## Request Body

```json
{
  "phone": "5511912341234",
  "contactName": "Z-API Contato",
  "contactPhone": "554498398733",
  "contactBusinessDescription": "Z-API Asas para sua imaginação"
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

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/send-video.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
