---
id: reply-status-sticker
title: Responder status com sticker
---

## Método

#### /reply-status-sticker

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-sticker

### Header

|      Key       |            Value            |
| :------------: |     :-----------------:     |
|  Client-Token  | **[TOKEN DE SEGURANÇA DA CONTA](../security/client-token)** |
---

## Conceituação

Método responsavel por enviar uma resposta em texto a um status.

---

## Atributos

### Obrigatórios

| Atributos |  Tipo  | Descrição                    |
| :-------- | :----: | :--------------------------- |
| phone     | String | Numero de quem enviou o status |
| sticker   | String | Link do sticker ou seu Base64 |
| statusMessageId    | String | Id da mensagem do status. Pode ser obtido no webhook de mensagem recebida -> [webhook](../webhooks/on-message-received)  |

---

## Request Body

#### URL

Método

`POST` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/reply-status-sticker

#### Body

```json
{
  "phone": "5544999999999",
  "sticker": "https://www.z-api.io/wp-content/themes/z-api/dist/images/logo.svg",
  "statusMessageId": "1F606398F2ECAA4846269F659B6003A9"
}
```

---

## Response

### 200

| Atributos | Tipo   | Descrição      |
| :-------- | :----- | :------------- |
| zaapId | string | id no z-api |
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

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/reply-status-sticker.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
