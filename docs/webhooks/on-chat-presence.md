---
id: on-chat-presence
title: Status do chat
---

## Método

#### `POST` on-chat-presence

## Conceituação

Esse é o webhook de retorno status do chat

:::caution Atenção

O Z-API não aceita webhooks que não sejam HTTPS

:::

---

![img](../../img/chatPresence.png)

---

## Atributos

### Obrigatórios

| Atributos | Tipo | Descrição |
| :-- | :-: | :-- |
| type | string | Tipo do evento da instância, nesse caso será "DeliveryCallback". |
| phone | string | Número de telefone de destino da mensagem. |
| status | string | Identificador do status do chat ex: (Digitando...) status pode conter ( UNAVAILABLE, AVAILABLE, COMPOSING, RECORDING) |
| lastSeen | timestamp | Identificador da ultima vez presente do usuário. |

---

## Response

### 200

### Fora do chat

```json
{
  "type": "PresenceChatCallback",
  "phone": "5544999999999",
  "status": "UNAVAILABLE",
  "lastSeen": null
}
```

### Dentro do chat

```json
{
  "type": "PresenceChatCallback",
  "phone": "5544999999999",
  "status": "AVAILABLE",
  "lastSeen": null
}
```

### Digitando no chat

```json
{
  "type": "PresenceChatCallback",
  "phone": "5544999999999",
  "status": "COMPOSING",
  "lastSeen": null
}
```

### Parou de digitar ou apagou o que estava digitando

```json
{
  "type": "PresenceChatCallback",
  "phone": "5544999999999",
  "status": "PAUSED",
  "lastSeen": null
}
```

:::tip Aviso

**Observação:**

Após receber um composing ou um recording, um **PAUSED** será retornado quando o evento parar

O stauts **PAUSED** apenas é retornado se estiver usando o beta multi-devices

:::

### Gravando áudio no chat

```json
{
  "type": "PresenceChatCallback",
  "phone": "5544999999999",
  "status": "RECORDING",
  "lastSeen": null
}
```

:::tip Aviso

O stauts **RECORDING** apenas é retornado se estiver usando o beta multi-devices

:::

### 405

Neste caso certifique que esteja enviando o corretamente a especificação do método, ou seja verifique se você enviou o POST ou GET conforme especificado no inicio deste tópico.

### 415

Caso você receba um erro 415, certifique de adicionar na headers da requisição o "Content-Type" do objeto que você está enviando, em sua grande maioria "application/json"

---

## Code

<iframe src="//api.apiembed.com/?source=https://raw.githubusercontent.com/Z-API/z-api-docs/main/json-examples/on-chat-presence.json&targets=all" frameborder="0" scrolling="no" width="100%" height="500px" seamless></iframe>
