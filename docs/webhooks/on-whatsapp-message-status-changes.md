---
id: on-whatsapp-message-status-changes
title: Status da mensagem
---

## Conceituação

Esse é o webhook de retorno do status da mensagem

:::caution Atenção

O Z-API não aceita webhooks que não sejam HTTPS

:::

---

## Atualizando Webhook

Para atualizar a rota do webhook é possível fazer isso pela API ou pelo painel administrativo.

### API

#### /update-webhook-status

`PUT` https://api.z-api.io/instances/SUA_INSTANCIA/token/SEU_TOKEN/update-webhook-message-status

#### Request Body

```json
{
  "value": "https://endereco-do-seu-sistema.com.br/instancia/SUA_INSTANCIA/status"
}
```

---

### Painel Administrativo

![img](../../img/status.png)

---

## Retornos dos webhooks

Os possíveis retornos do webhook **on-whatsapp-message-status-changes** estão cadastrado logo abaixo:

## Response

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| status | string | Status da mensagem (SENT - se foi enviada, RECEIVED - se foi recebida, READ - se foi lida, READ-SELF - confirmação de leitura inativa, PLAYED - se foi ouvida ) |
| id | string | Identificador(es) da(s) mensagem(ns). |
| momment | integer | Momento em que a instância foi desconectada do número. |
| phoneDevice | integer | Indica o dispositivo que ocorreu o evento (0 - Celular)|
| phone | string | Número de telefone de destino da mensagem. |
| type  | string | Tipo do evento da instância, nesse caso será "MessageStatusCallback". |
| isGroup  | boolean | Indica se o chat é um grupo|
---

### 200

```json
{
  "instanceId": "instance.id"
  "status": "SENT",
  "ids": ["999999999999999999999"],
  "momment": 1632234645000,
  "phoneDevice": 0,
  "phone": "5544999999999",
  "type": "MessageStatusCallback",
  "isGroup": false
}
{
  "instanceId": "instance.id"
  "status": "RECEIVED",
  "ids": ["999999999999999999999"],
  "momment": 1632234645000,
  "phoneDevice": 0,
  "phone": "5544999999999",
  "type": "MessageStatusCallback",
  "isGroup": false
}
{
  "instanceId": "instance.id"
  "status": "READ",
  "ids": ["999999999999999999999"],
  "momment": 1632234645000,
  "phoneDevice": 0,
  "phone": "5544999999999",
  "type": "MessageStatusCallback",
  "isGroup": false
}
{
  "instanceId": "instance.id"
  "status": "READ-SELF",
  "ids": ["999999999999999999999"],
  "momment": 1632234645000,
  "phoneDevice": 0,
  "phone": "5544999999999",
  "type": "MessageStatusCallback",
  "isGroup": false
}
{
  "instanceId": "instance.id"
  "status": "PLAYED",
  "ids": ["999999999999999999999"],
  "momment": 1632234645000,
  "phoneDevice": 0,
  "phone": "5544999999999",
  "type": "MessageStatusCallback",
  "isGroup": false
}
```

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

<!--
## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/on-whatsapp-message-status-changes.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe> -->
